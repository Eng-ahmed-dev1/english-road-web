import { useState } from 'react';
import { CheckCircle2, BookOpen, Layers } from 'lucide-react';
import type { ReadingPassage, VocabWord } from '../types';
import { StoryHook } from './StoryHook';

interface StoryReaderProps {
  passage: ReadingPassage;
  keyVocabulary: VocabWord[];
  onCompleteReading: () => void;
  isCompleted: boolean;
  unitNumber?: number;
  partNumber?: number;
  lessonName?: string;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  passage,
  keyVocabulary,
  onCompleteReading,
  isCompleted,
  unitNumber = 1,
  partNumber = 1,
  lessonName
}) => {
  const [selectedWord, setSelectedWord] = useState<VocabWord | null>(null);

  const findVocab = (wordStr: string): VocabWord | undefined => {
    const clean = wordStr.toLowerCase().replace(/[^a-z-]/g, '');
    return keyVocabulary.find(v => {
      const vClean = v.word.toLowerCase();
      if (vClean === clean) return true;
      if (clean.startsWith(vClean) || vClean.startsWith(clean)) return true;
      const baseClean = clean.replace(/(ing|ed|es|s)$/, '');
      const baseV = vClean.replace(/(ing|ed|es|s)$/, '');
      return baseClean === baseV || clean.includes(baseV) || vClean.includes(baseClean);
    });
  };

  const handleWordClick = (wordText: string) => {
    const vocab = findVocab(wordText);
    if (vocab) {
      setSelectedWord(vocab);
    }
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
                className="cursor-pointer inline-block px-2.5 py-0.5 mx-1 rounded-lg font-bold transition-all duration-150 bg-blue-100 dark:bg-blue-950/70 text-blue-950 dark:text-blue-200 border-b-2 border-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 active:scale-95 touch-manipulation shadow-2xs"
                title="اضغط لعرض المعنى والتعريف"
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
          {/* Animated Interactive Story Hook - replaces static illustrations */}
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
            <span>نصيحة للمذاكرة والشرح: اضغط على أي كلمة مظللة على السبورة لعرض ترجمتها وتعريفها ومثالها في اللوحة الجانبية.</span>
          </div>
        </div>

        {/* Word Details Sidebar */}
        <div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs sticky top-24">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                معلومات الكلمة المحددة
              </span>
            </div>

            {selectedWord ? (
              <div className="space-y-5">
                <div>
                  <h3 className="text-3xl font-black font-en text-slate-950 dark:text-white capitalize tracking-tight">
                    {selectedWord.word}
                  </h3>
                  <span className="inline-block mt-1.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {selectedWord.partOfSpeech}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">المعنى بالعربية:</span>
                  <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">{selectedWord.arabicMeaning}</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700" dir="ltr">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1 text-right">English Definition:</span>
                  <p className="text-sm sm:text-base font-en text-slate-800 dark:text-slate-200 leading-relaxed">
                    "{selectedWord.definition}"
                  </p>
                </div>

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
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1.5">انقر على أي كلمة مظللة</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  اضغط على أي كلمة في النص لعرض تفاصيل معناها وتعريفها النموذجي هنا بوضوح تام على الشاشة.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
