import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Volume2, 
  X, 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Gauge, 
  Headphones 
} from 'lucide-react';
import type { ReadingPassage, VocabWord, PhraseExpression } from '../types';
import { StoryHook } from './StoryHook';
import { 
  speakEnglish, 
  cleanTextForSpeech, 
  stopSpeech, 
  pauseSpeech, 
  resumeSpeech, 
  getBestEnglishVoice, 
  isSpeechSynthesisSupported 
} from '../utils/audio';

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

  // Comprehensive irregular verbs dictionary for secondary school curriculum reading passages
  const IRREGULAR_VERBS: Record<string, string> = {
    laid: 'lay',
    took: 'take',
    taken: 'take',
    built: 'build',
    made: 'make',
    began: 'begin',
    begun: 'begin',
    came: 'come',
    ran: 'run',
    saw: 'see',
    seen: 'see',
    went: 'go',
    gone: 'go',
    knew: 'know',
    known: 'know',
    spoke: 'speak',
    spoken: 'speak',
    wrote: 'write',
    written: 'write',
    drove: 'drive',
    driven: 'drive',
    chose: 'choose',
    chosen: 'choose',
    held: 'hold',
    kept: 'keep',
    left: 'leave',
    lost: 'lose',
    meant: 'mean',
    met: 'meet',
    paid: 'pay',
    said: 'say',
    sold: 'sell',
    sent: 'send',
    spent: 'spend',
    stood: 'stand',
    told: 'tell',
    thought: 'think',
    understood: 'understand',
    won: 'win',
    became: 'become',
    fell: 'fall',
    fallen: 'fall',
    broke: 'break',
    broken: 'break',
    froze: 'freeze',
    frozen: 'freeze',
    woke: 'wake',
    woken: 'wake',
    hid: 'hide',
    hidden: 'hide',
    ate: 'eat',
    eaten: 'eat',
    bit: 'bite',
    bitten: 'bite',
    blew: 'blow',
    blown: 'blow',
    flew: 'fly',
    flown: 'fly',
    grew: 'grow',
    grown: 'grow',
    threw: 'throw',
    thrown: 'throw',
    drew: 'draw',
    drawn: 'draw'
  };

  // Helper to generate candidate stems (handles plurals, inflections, compound nouns, phrasal verbs)
  const getCandidateStems = (str: string): string[] => {
    const s = str.toLowerCase().trim();
    const candidates = new Set<string>();
    candidates.add(s);

    // Remove surrounding punctuation and quotation marks
    const stripped = s.replace(/^[“"'‘\s]+|[”"'’,\.\!\?\s]+$/g, '').trim();
    candidates.add(stripped);

    // Single-word irregular verbs
    if (IRREGULAR_VERBS[stripped]) {
      candidates.add(IRREGULAR_VERBS[stripped]);
    }

    // Multi-word phrase processing
    const words = stripped.split(/\s+/);
    if (words.length > 1) {
      const first = words[0];
      const last = words[words.length - 1];
      const restAfterFirst = words.slice(1).join(' ');
      const restBeforeLast = words.slice(0, words.length - 1).join(' ');

      // 1. Un-inflect the first word (phrasal verbs, e.g. "charges full steam ahead", "took over", "laid the groundwork")
      const uninflectedFirst: string[] = [];
      if (IRREGULAR_VERBS[first]) uninflectedFirst.push(IRREGULAR_VERBS[first]);
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
      uninflectedFirst.forEach(uf => candidates.add(`${uf} ${restAfterFirst}`));

      // 2. Un-inflect the last word (compound nouns, e.g. "Cotton gins" -> "cotton gin", "human skills" -> "human skill")
      const uninflectedLast: string[] = [];
      if (last.endsWith('ies')) uninflectedLast.push(last.slice(0, -3) + 'y');
      if (last.endsWith('es')) uninflectedLast.push(last.slice(0, -2));
      if (last.endsWith('s')) uninflectedLast.push(last.slice(0, -1));
      if (last.endsWith('ed')) {
        uninflectedLast.push(last.slice(0, -2));
        uninflectedLast.push(last.slice(0, -1));
      }
      if (last.endsWith('ing')) {
        uninflectedLast.push(last.slice(0, -3));
        uninflectedLast.push(last.slice(0, -3) + 'e');
      }
      uninflectedLast.forEach(ul => candidates.add(`${restBeforeLast} ${ul}`));

      // 3. Middle adverb stripping (e.g. "relied heavily on" -> "relied on", "rely on")
      const commonAdverbs = new Set(['heavily', 'deeply', 'greatly', 'completely', 'entirely', 'rapidly', 'gradually', 'firmly', 'strongly']);
      const nonAdverbWords = words.filter(w => !commonAdverbs.has(w));
      if (nonAdverbWords.length !== words.length) {
        const strippedAdverbPhrase = nonAdverbWords.join(' ');
        candidates.add(strippedAdverbPhrase);
        const firstNonAdv = nonAdverbWords[0];
        const restNonAdv = nonAdverbWords.slice(1).join(' ');
        if (IRREGULAR_VERBS[firstNonAdv]) candidates.add(`${IRREGULAR_VERBS[firstNonAdv]} ${restNonAdv}`);
        if (firstNonAdv.endsWith('ed')) {
          candidates.add(`${firstNonAdv.slice(0, -2)} ${restNonAdv}`);
          candidates.add(`${firstNonAdv.slice(0, -1)} ${restNonAdv}`);
        }
        if (firstNonAdv.endsWith('s')) candidates.add(`${firstNonAdv.slice(0, -1)} ${restNonAdv}`);
      }
    }

    // Single-word inflection variants
    [s, stripped].forEach(word => {
      if (IRREGULAR_VERBS[word]) {
        candidates.add(IRREGULAR_VERBS[word]);
      }
      if (word.endsWith('ies')) {
        candidates.add(word.slice(0, -3) + 'y');
      }
      if (word.endsWith('ves')) {
        candidates.add(word.slice(0, -3) + 'f');
        candidates.add(word.slice(0, -3) + 'fe');
      }
      if (word.endsWith('es')) {
        candidates.add(word.slice(0, -2));
      }
      if (word.endsWith('s')) {
        candidates.add(word.slice(0, -1));
      }
      if (word.endsWith('ed')) {
        candidates.add(word.slice(0, -2));
        candidates.add(word.slice(0, -1));
      }
      if (word.endsWith('ing')) {
        candidates.add(word.slice(0, -3));
        candidates.add(word.slice(0, -3) + 'e');
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
            definition: foundPhrase.definition || `An authentic ${foundPhrase.type} from this unit's curriculum.`,
            exampleSentence: foundPhrase.exampleSentence || `From text: "${wordStr}"`,
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
            ? 'Idiom'
            : p.type === 'preposition'
            ? 'Preposition'
            : 'Expression';
          return {
            word: p.phrase,
            partOfSpeech: typeLabel,
            arabicMeaning: p.arabicMeaning,
            definition: p.definition || `An authentic ${p.type} from this unit's curriculum.`,
            exampleSentence: p.exampleSentence || `From text: "${wordStr}"`,
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
      partOfSpeech: 'Curriculum Highlight',
      arabicMeaning: 'Click to listen to native English audio pronunciation',
      definition: 'A highlighted key phrase or expression from the official curriculum passage.',
      exampleSentence: `From text: “${cleanDisplayWord}”`,
      type: 'expression'
    };
  };

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.95);

  const readingRef = useRef<{
    isPlaying: boolean;
    isPaused: boolean;
    currentIndex: number;
    speed: number;
  }>({
    isPlaying: false,
    isPaused: false,
    currentIndex: 0,
    speed: 0.95
  });

  useEffect(() => {
    readingRef.current.speed = playbackSpeed;
  }, [playbackSpeed]);

  const stopReading = useCallback(() => {
    stopSpeech();
    readingRef.current.isPlaying = false;
    readingRef.current.isPaused = false;
    readingRef.current.currentIndex = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setActiveParagraphIndex(null);
  }, []);

  const readParagraphByIndex = useCallback((index: number) => {
    if (!passage.paragraphs[index]) {
      stopReading();
      return;
    }

    if (!isSpeechSynthesisSupported()) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }

    stopSpeech();

    readingRef.current.isPlaying = true;
    readingRef.current.isPaused = false;
    readingRef.current.currentIndex = index;
    setIsPlaying(true);
    setIsPaused(false);
    setActiveParagraphIndex(index);

    const cleanText = cleanTextForSpeech(passage.paragraphs[index]);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = readingRef.current.speed;
    utterance.pitch = 1.0;

    const voice = getBestEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      if (!readingRef.current.isPlaying || readingRef.current.isPaused) return;

      const nextIdx = index + 1;
      if (nextIdx < passage.paragraphs.length) {
        setTimeout(() => {
          if (readingRef.current.isPlaying && !readingRef.current.isPaused) {
            readParagraphByIndex(nextIdx);
          }
        }, 400);
      } else {
        stopReading();
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e);
        stopReading();
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [passage.paragraphs, stopReading]);

  const togglePlayPause = () => {
    if (!isPlaying) {
      const startIndex = activeParagraphIndex ?? 0;
      readParagraphByIndex(startIndex);
    } else if (isPaused) {
      readingRef.current.isPaused = false;
      setIsPaused(false);
      resumeSpeech();
    } else {
      readingRef.current.isPaused = true;
      setIsPaused(true);
      pauseSpeech();
    }
  };

  const handleNextParagraph = () => {
    const cur = activeParagraphIndex ?? 0;
    if (cur + 1 < passage.paragraphs.length) {
      readParagraphByIndex(cur + 1);
    }
  };

  const handlePrevParagraph = () => {
    const cur = activeParagraphIndex ?? 0;
    if (cur - 1 >= 0) {
      readParagraphByIndex(cur - 1);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    readingRef.current.speed = speed;
    if (isPlaying && !isPaused && activeParagraphIndex !== null) {
      readParagraphByIndex(activeParagraphIndex);
    }
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [passage]);

  const handleWordClick = (wordText: string) => {
    const item = findItem(wordText);
    setSelectedWord(item);
    // Optional instant voice pronunciation on click
    speakEnglish(item.word);
  };

  const cleanTitle = passage.title.replace(/^[“"'‘\s]+|[”"'’\s]+$/g, '');

  const renderParagraph = (paragraph: string, pIndex: number) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    const isCurrentParagraphPlaying = isPlaying && activeParagraphIndex === pIndex;

    return (
      <div
        key={pIndex}
        className={`group/p relative transition-all duration-300 rounded-2xl mb-6 p-3 sm:p-4.5 ${
          isCurrentParagraphPlaying
            ? 'bg-blue-50/90 dark:bg-blue-950/40 ring-2 ring-blue-500 dark:ring-blue-400 shadow-xs'
            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
        }`}
      >
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              Paragraph {pIndex + 1}
            </span>
            {isCurrentParagraphPlaying && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 animate-pulse font-en">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 inline-block animate-ping"></span>
                Now Playing...
              </span>
            )}
          </div>

          <button
            onClick={() => readParagraphByIndex(pIndex)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all active:scale-95 touch-manipulation cursor-pointer ${
              isCurrentParagraphPlaying
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/60'
            }`}
            title="Listen to this paragraph"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCurrentParagraphPlaying ? 'Replay' : 'Listen'}</span>
          </button>
        </div>

        <p className="text-slate-800 dark:text-slate-200 leading-relaxed sm:leading-loose text-base sm:text-lg lg:text-xl text-left sm:text-justify font-en font-normal">
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const rawWord = part.slice(2, -2);

              return (
                <span
                  key={index}
                  onClick={() => handleWordClick(rawWord)}
                  className="cursor-pointer inline-block px-1.5 sm:px-2.5 py-0.5 my-0.5 mx-0.5 sm:mx-1 rounded-md sm:rounded-lg font-bold transition-all duration-150 bg-blue-100 dark:bg-blue-950/70 text-blue-950 dark:text-blue-200 border-b-2 border-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 active:scale-95 touch-manipulation shadow-2xs hover:shadow-xs"
                  title="Click to view meaning, definition, and hear audio pronunciation"
                >
                  {rawWord}
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Top Breadcrumb & Title Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
              <span>Unit {unitNumber}</span>
              <span>•</span>
              <span>{lessonName || `Part ${partNumber}`}</span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400">Reading & Listening Text</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-en tracking-tight break-words">
              {cleanTitle}
            </h1>
          </div>

          <div className="self-stretch sm:self-auto">
            <button
              onClick={onCompleteReading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-base transition-all border min-h-[44px] sm:min-h-[50px] shadow-xs active:scale-95 touch-manipulation cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Text Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
          {/* Animated Interactive Story Hook */}
          <div className="mb-6 sm:mb-8">
            <StoryHook
              unitNumber={unitNumber}
              partNumber={partNumber}
              title={cleanTitle}
            />
          </div>

          {/* Interactive Audio Passage Player */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-cyan-50/90 dark:from-slate-850 dark:via-blue-950/30 dark:to-slate-850 border border-blue-200/90 dark:border-blue-900/60 shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Player Title & Current Status */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-600 text-white shadow-xs shrink-0">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-en">
                      Interactive Audio Player
                    </h3>
                    {isPlaying && !isPaused && (
                      <span className="flex gap-0.5 items-end h-3.5">
                        <span className="w-1 bg-blue-600 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 bg-blue-600 rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 bg-blue-600 rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-en">
                    {isPlaying
                      ? `Reading paragraph ${(activeParagraphIndex ?? 0) + 1} of ${passage.paragraphs.length}`
                      : 'Listen to the full text with synchronized highlighting and native English audio'}
                  </p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
                {/* Prev Paragraph */}
                <button
                  onClick={handlePrevParagraph}
                  disabled={!isPlaying || activeParagraphIndex === 0}
                  className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
                  title="Previous paragraph"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Main Play / Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-xs active:scale-95 transition-all touch-manipulation cursor-pointer"
                >
                  {isPlaying && !isPaused ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>{isPaused ? 'Resume Reading' : 'Play Full Text'}</span>
                    </>
                  )}
                </button>

                {/* Stop Button */}
                {isPlaying && (
                  <button
                    onClick={stopReading}
                    className="p-2 sm:p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-900/60 shadow-2xs transition-colors cursor-pointer"
                    title="Stop reading"
                  >
                    <Square className="w-4 h-4 fill-current" />
                  </button>
                )}

                {/* Next Paragraph */}
                <button
                  onClick={handleNextParagraph}
                  disabled={!isPlaying || activeParagraphIndex === passage.paragraphs.length - 1}
                  className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
                  title="Next paragraph"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Speed Selector */}
                <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold shadow-2xs">
                  <Gauge className="w-3.5 h-3.5 text-slate-400 mr-1 ml-0.5" />
                  {[
                    { label: '0.75x', val: 0.75 },
                    { label: '1.0x', val: 0.95 },
                    { label: '1.25x', val: 1.25 }
                  ].map(s => (
                    <button
                      key={s.label}
                      onClick={() => handleSpeedChange(s.val)}
                      className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                        playbackSpeed === s.val
                          ? 'bg-blue-600 text-white font-black'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={`Reading Speed: ${s.label}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reading Paragraphs */}
          <div dir="ltr">
            {passage.paragraphs.map((p, idx) => renderParagraph(p, idx))}
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Study Tip: Click on any highlighted word or phrase to listen to its audio pronunciation and view its meaning and definition.</span>
          </div>
        </div>

        {/* Word Details Sidebar (Visible on Desktop) */}
        <div className="hidden lg:block">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs sticky top-24">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Word Details & Meaning
              </span>
              {selectedWord && (
                <button
                  onClick={() => speakEnglish(selectedWord.word)}
                  className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors shadow-2xs cursor-pointer"
                  title="Listen to pronunciation"
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
                    className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs shrink-0 active:scale-95 cursor-pointer"
                    title="Pronounce word"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Arabic Meaning:</span>
                  <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-ar">{selectedWord.arabicMeaning}</p>
                </div>

                {selectedWord.definition && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700" dir="ltr">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">English Definition:</span>
                    <p className="text-sm sm:text-base font-en text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                      "{selectedWord.definition}"
                    </p>
                  </div>
                )}

                {selectedWord.exampleSentence && (
                  <div className="p-4 bg-blue-50/50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-800/50" dir="ltr">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block mb-1">Example in text:</span>
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
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1.5 font-en">Click on Any Highlighted Word</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-en">
                  Select any vocabulary term in the reading passage to hear its native pronunciation and view its complete definition and Arabic translation here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Word Details Bottom Sheet Drawer (Visible on Mobile / Tablet) */}
      {selectedWord && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setSelectedWord(null)}
          />
          
          {/* Slide-Up Drawer */}
          <div className="relative z-10 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 shadow-2xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Pull Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black font-en text-slate-950 dark:text-white capitalize tracking-tight truncate">
                    {selectedWord.word}
                  </h3>
                  <button
                    onClick={() => speakEnglish(selectedWord.word)}
                    className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors shadow-2xs shrink-0 cursor-pointer"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="inline-block mt-1 text-xs font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800">
                  {selectedWord.partOfSpeech}
                </span>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Arabic Meaning:</span>
                <p className="text-xl font-black text-blue-600 dark:text-blue-400 font-ar">{selectedWord.arabicMeaning}</p>
              </div>

              {selectedWord.definition && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700" dir="ltr">
                  <span className="text-[11px] font-bold text-slate-400 block mb-0.5">English Definition:</span>
                  <p className="text-sm font-en text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    "{selectedWord.definition}"
                  </p>
                </div>
              )}

              {selectedWord.exampleSentence && (
                <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-800/50" dir="ltr">
                  <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 block mb-0.5">Example in text:</span>
                  <p className="text-xs font-en text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{selectedWord.exampleSentence}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
