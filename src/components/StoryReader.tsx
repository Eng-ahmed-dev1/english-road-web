import { useState } from 'react';
import { CheckCircle2, BookOpen, Layers, Volume2 } from 'lucide-react';
import type { ReadingPassage, VocabWord, PhraseExpression } from '../types';
import { StoryHook } from './StoryHook';
import { speakEnglish } from '../utils/audio';

export interface SelectedWordInfo {
  word: string;
  partOfSpeech: string;
  arabicMeaning: string;
  definition?: string;
  exampleSentence?: string;
  type?: string;
}

interface StoryReaderProps {
  passage: ReadingPassage;
  keyVocabulary: VocabWord[];
  phrasesAndExpressions?: PhraseExpression[];
  onCompleteReading: () => void;
  isCompleted: boolean;
  unitNumber?: number;
  partNumber?: number;
  lessonName?: string;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  passage,
  keyVocabulary,
  phrasesAndExpressions = [],
  onCompleteReading,
  isCompleted,
  unitNumber = 1,
  partNumber = 1,
  lessonName
}) => {
  const [selectedWord, setSelectedWord] = useState<SelectedWordInfo | null>(null);

  // Helper to generate candidate stems (handles plurals, inflections, phrasal verbs)
  const getCandidateStems = (str: string): string[] => {
    const s = str.toLowerCase().trim();
    const candidates = new Set<string>();
    candidates.add(s);

    // Remove surrounding punctuation and quotation marks
    const stripped = s.replace(/^[“"'‘\s]+|[”"'’,\.\!\?\s]+$/g, '').trim();
    candidates.add(stripped);

    // Check if multi-word phrase or phrasal verb (e.g., "kicks off", "wrapped up like mummies")
    const words = stripped.split(/\s+/);
    if (words.length > 1) {
      // Un-inflect the first word of a phrasal verb (e.g., "kicks off" -> "kick off")
      const first = words[0];
      const rest = words.slice(1).join(' ');
      const uninflectedFirst: string[] = [];

      if (first.endsWith('ies')) uninflectedFirst.push(first.slice(0, -3) + 'y');
      if (first.endsWith('es')) uninflectedFirst.push(first.slice(0, -2));
      if (first.endsWith('s')) uninflectedFirst.push(first.slice(0, -1));
      if (first.endsWith('ed')) {
        uninflectedFirst.push(first.slice(0, -2));
        uninflectedFirst.push(first.slice(0, -1));
      }
      if (first.endsWith('ing')) {
        uninflectedFirst.push(first.slice(0, -3));
        uninflectedFirst.push(first.slice(0, -3) + 'e');
      }

      uninflectedFirst.forEach(uf => candidates.add(`${uf} ${rest}`));
    }

    // Single-word inflection variants
    [s, stripped].forEach(word => {
      // Plural -ies -> -y (emergencies -> emergency, facilities -> facility, difficulties -> difficulty)
      if (word.endsWith('ies')) {
        candidates.add(word.slice(0, -3) + 'y');
      }
      // Plural -ves -> -f or -fe (lives -> life)
      if (word.endsWith('ves')) {
        candidates.add(word.slice(0, -3) + 'f');
        candidates.add(word.slice(0, -3) + 'fe');
      }
      // Plural -es
      if (word.endsWith('es')) {
        candidates.add(word.slice(0, -2));
      }
      // Plural / 3rd person -s
      if (word.endsWith('s')) {
        candidates.add(word.slice(0, -1));
      }
      // Past tense -ed
      if (word.endsWith('ed')) {
        candidates.add(word.slice(0, -2));
        candidates.add(word.slice(0, -1)); // e.g., fascinated -> fascinate
      }
      // Continuous -ing
      if (word.endsWith('ing')) {
        candidates.add(word.slice(0, -3));
        candidates.add(word.slice(0, -3) + 'e'); // e.g., managing -> manage
      }
    });

    return Array.from(candidates);
  };

  const findItem = (wordStr: string): SelectedWordInfo => {
    const rawClean = wordStr.toLowerCase().replace(/^[“"'‘\s]+|[”"'’,\.\!\?\s]+$/g, '').trim();
    const stems = getCandidateStems(rawClean);

    // 1. Direct Search in keyVocabulary (includes both Key Vocab & Additional Reading/Listening Vocab)
    for (const stem of stems) {
      const found = keyVocabulary.find(v => {
        const vWord = v.word.toLowerCase().trim();
        return vWord === stem;
      });
      if (found) {
        return {
          word: found.word,
          partOfSpeech: found.partOfSpeech,
          arabicMeaning: found.arabicMeaning,
          definition: found.definition,
          exampleSentence: found.exampleSentence || `From text: "${wordStr}"`,
          type: 'word'
        };
      }
    }

    // 2. Search in phrasesAndExpressions (includes Idioms & Prepositions e.g. "teamwork makes the dream work", "raining cats and dogs", "kicks off")
    if (phrasesAndExpressions && phrasesAndExpressions.length > 0) {
      for (const stem of stems) {
        const foundPhrase = phrasesAndExpressions.find(p => {
          const pPhrase = p.phrase.toLowerCase().trim();
          return pPhrase === stem || stem === pPhrase || stem.includes(pPhrase) || pPhrase.includes(stem);
        });
        if (foundPhrase) {
          const typeLabel = foundPhrase.type === 'idiom'
            ? 'تعبير اصطلاحي (Idiom)'
            : foundPhrase.type === 'preposition'
            ? 'حرف جر وتعبير (Preposition)'
            : 'تعبير لغوي (Expression)';
          return {
            word: foundPhrase.phrase,
            partOfSpeech: typeLabel,
            arabicMeaning: foundPhrase.arabicMeaning,
            definition: `An authentic ${foundPhrase.type} from this unit's curriculum.`,
            exampleSentence: `From text: "${wordStr}"`,
            type: foundPhrase.type
          };
        }
      }

      // Advanced phrase normalization and word overlap (e.g., "raining cats and dogs" -> "rain cats and dogs")
      const normalizePhrase = (p: string) =>
        p.toLowerCase()
          .replace(/^(it\s+|to\s+)/, '')
          .replace(/^(is|was|were|are)\s+/, '')
          .replace(/(ing|ed|es|s)\b/g, '')
          .replace(/[^a-z0-9\s]/g, '')
          .trim();

      const normTarget = normalizePhrase(rawClean);
      for (const p of phrasesAndExpressions) {
        const normP = normalizePhrase(p.phrase);
        const stopwords = new Set(['a', 'an', 'the', 'to', 'in', 'of', 'for', 'with', 'and', 'it', 'was', 'is', 'on', 'at', 'their', 'his', 'her']);
        const wordsA = normTarget.split(/\s+/).filter(w => !stopwords.has(w) && w.length > 1);
        const wordsB = normP.split(/\s+/).filter(w => !stopwords.has(w) && w.length > 1);
        const common = wordsA.filter(w => wordsB.includes(w));

        if (
          normTarget === normP ||
          normTarget.includes(normP) ||
          normP.includes(normTarget) ||
          (wordsA.length >= 2 && wordsB.length >= 2 && common.length >= 2) ||
          (common.length >= 1 && (wordsA.length <= 2 || wordsB.length <= 2))
        ) {
          const typeLabel = p.type === 'idiom'
            ? 'تعبير اصطلاحي (Idiom)'
            : p.type === 'preposition'
            ? 'حرف جر وتعبير (Preposition)'
            : 'تعبير لغوي (Expression)';
          return {
            word: p.phrase,
            partOfSpeech: typeLabel,
            arabicMeaning: p.arabicMeaning,
            definition: `An authentic ${p.type} from this unit's curriculum.`,
            exampleSentence: `From text: "${wordStr}"`,
            type: p.type
          };
        }
      }
    }

    // 3. Fallback: Fuzzy / Substring match in vocabulary
    for (const stem of stems) {
      const fuzzy = keyVocabulary.find(v => {
        const vWord = v.word.toLowerCase().trim();
        return vWord.includes(stem) || stem.includes(vWord);
      });
      if (fuzzy) {
        return {
          word: fuzzy.word,
          partOfSpeech: fuzzy.partOfSpeech,
          arabicMeaning: fuzzy.arabicMeaning,
          definition: fuzzy.definition,
          exampleSentence: fuzzy.exampleSentence || `From text: "${wordStr}"`,
          type: 'word'
        };
      }
    }

    // 4. Default Safe Fallback: Always display card with Audio & English text
    const cleanDisplayWord = wordStr.replace(/^[“"'‘\s]+|[”"'’,\.\!\?\s]+$/g, '').trim();
    return {
      word: cleanDisplayWord,
      partOfSpeech: 'تعبير / مصطلح مميز في الدرس',
      arabicMeaning: 'انقر للاستماع للنطق الصوتي بلكنة إنجليزية واضحة',
      definition: 'A highlighted key phrase or expression from the official curriculum passage.',
      exampleSentence: `From text: “${cleanDisplayWord}”`,
      type: 'expression'
    };
  };

  const handleWordClick = (wordText: string) => {
    const item = findItem(wordText);
    setSelectedWord(item);
    // Optional instant voice pronunciation on click
    speakEnglish(item.word);
  };

  const renderParagraph = (paragraph: string, pIndex: number) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={pIndex} className="text-slate-800 dark:text-slate-200 leading-relaxed sm:leading-loose text-lg sm:text-xl lg:text-2xl mb-8 text-justify font-en font-normal">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const rawWord = part.slice(2, -2);

            return (
              <span
                key={index}
                onClick={() => handleWordClick(rawWord)}
                className="cursor-pointer inline-block px-2.5 py-0.5 mx-1 rounded-lg font-bold transition-all duration-150 bg-blue-100 dark:bg-blue-950/70 text-blue-950 dark:text-blue-200 border-b-2 border-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 active:scale-95 touch-manipulation shadow-2xs hover:shadow-xs"
                title="اضغط لعرض المعنى والتعريف والاستماع للنطق"
              >
                {rawWord}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Title Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
              <span>Unit {unitNumber}</span>
              <span>•</span>
              <span>{lessonName || `Part ${partNumber}`}</span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400">Reading & Listening Text</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-en tracking-tight">
              {passage.title}
            </h1>
          </div>

          <div>
            <button
              onClick={onCompleteReading}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all border min-h-[50px] shadow-xs active:scale-95 touch-manipulation ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isCompleted ? 'تمت القراءة والاستيعاب ✓' : 'تحديد الدرس كمكتمل'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Text Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
          {/* Animated Interactive Story Hook */}
          <div className="mb-8">
            <StoryHook
              unitNumber={unitNumber}
              partNumber={partNumber}
              title={passage.title}
            />
          </div>

          {/* Reading Paragraphs */}
          <div dir="ltr">
            {passage.paragraphs.map((p, idx) => renderParagraph(p, idx))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>نصيحة للمذاكرة والشرح: اضغط على أي كلمة أو تعبير مظلل لسماع النطق الصوتي المباشر ورؤية المعنى والتعريف.</span>
          </div>
        </div>

        {/* Word Details Sidebar */}
        <div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs sticky top-24">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                معلومات الكلمة أو التعبير
              </span>
              {selectedWord && (
                <button
                  onClick={() => speakEnglish(selectedWord.word)}
                  className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors shadow-2xs"
                  title="استمع للنطق الصوتي"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {selectedWord ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-en text-slate-950 dark:text-white capitalize tracking-tight leading-snug">
                      {selectedWord.word}
                    </h3>
                    <span className="inline-block mt-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
                      {selectedWord.partOfSpeech}
                    </span>
                  </div>

                  <button
                    onClick={() => speakEnglish(selectedWord.word)}
                    className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs shrink-0 active:scale-95"
                    title="نطق الكلمة صوتياً"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">المعنى بالعربية:</span>
                  <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-ar">{selectedWord.arabicMeaning}</p>
                </div>

                {selectedWord.definition && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700" dir="ltr">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1 text-right">English Definition:</span>
                    <p className="text-sm sm:text-base font-en text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                      "{selectedWord.definition}"
                    </p>
                  </div>
                )}

                {selectedWord.exampleSentence && (
                  <div className="p-4 bg-blue-50/50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-800/50" dir="ltr">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block mb-1 text-right">Example in text:</span>
                    <p className="text-xs sm:text-sm font-en text-slate-700 dark:text-slate-300 leading-relaxed">
                      "{selectedWord.exampleSentence}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1.5 font-ar">انقر على أي كلمة أو تعبير</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-ar">
                  اضغط على أي كلمة أو مصطلح في النص لسماع نطقها بالإنجليزية وعرض تفاصيل معناها وتعريفها هنا بوضوح.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
