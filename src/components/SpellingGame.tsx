import { useState, useEffect, useCallback } from 'react';
import { RotateCcw, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import type { VocabWord } from '../types';

interface SpellingGameProps {
  words: VocabWord[];
  onComplete?: () => void;
  isCompleted?: boolean;
  showPoints?: boolean;
  onAddPoints?: (points: number) => void;
  compactMode?: boolean;
}

export const SpellingGame: React.FC<SpellingGameProps> = ({
  words,
  onComplete,
  isCompleted,
  showPoints = false,
  onAddPoints,
  compactMode = false
}) => {
  const eligibleWords = words.filter(w => /^[a-zA-Z]{4,12}$/.test(w.word));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState<{ id: number; char: string; used: boolean }[]>([]);
  const [userLetters, setUserLetters] = useState<{ id: number; char: string }[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [hintShown, setHintShown] = useState(false);

  const currentWord = eligibleWords[currentIndex] || eligibleWords[0];
  const targetWordUpper = currentWord ? currentWord.word.toUpperCase() : '';

  const initWord = useCallback((wordObj: VocabWord) => {
    const letters = wordObj.word.toUpperCase().split('').map((char, index) => ({
      id: index,
      char,
      used: false
    }));

    let shuffled = [...letters].sort(() => Math.random() - 0.5);
    if (shuffled.map(s => s.char).join('') === wordObj.word.toUpperCase() && letters.length > 2) {
      shuffled = shuffled.reverse();
    }

    setScrambledLetters(shuffled);
    setUserLetters([]);
    setIsCorrect(false);
    setHintShown(false);
  }, []);

  useEffect(() => {
    if (currentWord) {
      initWord(currentWord);
    }
  }, [currentWord, initWord]);

  const handleSelectLetter = (item: { id: number; char: string; used: boolean }) => {
    if (item.used || isCorrect) return;

    const nextUserLetters = [...userLetters, { id: item.id, char: item.char }];
    setUserLetters(nextUserLetters);
    setScrambledLetters(prev => prev.map(l => l.id === item.id ? { ...l, used: true } : l));

    if (nextUserLetters.length === targetWordUpper.length) {
      const spelled = nextUserLetters.map(l => l.char).join('');
      if (spelled === targetWordUpper) {
        setIsCorrect(true);
        const newCount = completedCount + 1;
        setCompletedCount(newCount);
        
        if (showPoints && onAddPoints) {
          onAddPoints(15);
        }

        if (newCount >= 5 && onComplete) {
          onComplete();
        }
      }
    }
  };

  const handleRemoveLetter = (indexToRemove: number) => {
    if (isCorrect) return;

    const removed = userLetters[indexToRemove];
    setUserLetters(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setScrambledLetters(prev => prev.map(l => l.id === removed.id ? { ...l, used: false } : l));
  };

  const handleHint = () => {
    setHintShown(true);
  };

  const handleNextWord = () => {
    setCurrentIndex(prev => (prev + 1) % eligibleWords.length);
  };

  const handleReset = () => {
    initWord(currentWord);
  };

  return (
    <div className={compactMode ? 'w-full p-2' : 'max-w-5xl 2xl:max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8'}>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            {!compactMode && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">تدريب تفاعلي للسبورة الذكية</span>
                {isCompleted && (
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    مكتمل ✓
                  </span>
                )}
              </div>
            )}
            <h2 className={`${compactMode ? 'text-lg' : 'text-xl sm:text-3xl'} font-black text-slate-900 dark:text-white`}>
              تحدي ترتيب حروف الكلمة
            </h2>
            {!compactMode && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                اقرأ المعنى والتعريف ثم اضغط على الحروف على الشاشة بالترتيب الإملائي الصحيح.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
            <span className="text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700">
              أنجزت: <strong className="text-blue-600 dark:text-blue-400 font-en text-sm sm:text-base">{completedCount}</strong> / 5
            </span>

            <button
              onClick={handleHint}
              disabled={hintShown || isCorrect}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 active:scale-95 touch-manipulation"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span>تلميح</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
        {/* Arabic Meaning & Definition */}
        <div className="mb-6 sm:mb-8 space-y-2">
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">المعنى المطلوب:</span>
          <h3 className={`${compactMode ? 'text-lg' : 'text-xl sm:text-3xl lg:text-4xl'} font-black text-slate-900 dark:text-white`}>
            {currentWord.arabicMeaning}
          </h3>
          <p className="text-xs sm:text-base lg:text-lg font-en text-slate-600 dark:text-slate-300 italic max-w-2xl mx-auto leading-relaxed" dir="ltr">
            "{currentWord.definition}"
          </p>
          {hintShown && (
            <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/60 py-1 px-3 sm:py-1.5 sm:px-4 rounded-xl inline-block mt-2 sm:mt-3 border border-blue-200 dark:border-blue-800">
              💡 تلميح: تبدأ الكلمة بحرف ({targetWordUpper[0]})
            </div>
          )}
        </div>

        {/* Selected Letter Slots */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3.5 my-4 sm:my-8 min-h-12 sm:min-h-16" dir="ltr">
          {Array.from({ length: targetWordUpper.length }).map((_, idx) => {
            const letterObj = userLetters[idx];
            return (
              <button
                key={idx}
                onClick={() => letterObj && handleRemoveLetter(idx)}
                disabled={isCorrect || !letterObj}
                className={`${
                  compactMode 
                    ? 'w-8 h-10 text-base' 
                    : 'w-8 h-10 sm:w-12 sm:h-14 lg:w-16 lg:h-18 text-base sm:text-2xl lg:text-3xl'
                } rounded-xl sm:rounded-2xl font-en font-black flex items-center justify-center transition-all touch-manipulation active:scale-95 ${
                  isCorrect
                    ? 'bg-emerald-600 text-white border-2 border-emerald-500 shadow-md shadow-emerald-500/20'
                    : letterObj
                    ? 'bg-slate-900 dark:bg-blue-600 text-white border-2 border-slate-900 dark:border-blue-500 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 text-transparent'
                }`}
              >
                {letterObj ? letterObj.char : ''}
              </button>
            );
          })}
        </div>

        {/* Correct feedback */}
        {isCorrect && (
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs sm:text-base font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
            <span>تهجئة صحيحة ومطابقة للمنهج الدراسي! أحسنت 🌟</span>
          </div>
        )}

        {/* Scrambled Available Letters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3.5 mb-6 sm:mb-10" dir="ltr">
          {scrambledLetters.map(item => (
            <button
              key={item.id}
              onClick={() => handleSelectLetter(item)}
              disabled={item.used || isCorrect}
              className={`${
                compactMode 
                  ? 'w-8 h-10 text-base' 
                  : 'w-8 h-10 sm:w-12 sm:h-14 lg:w-16 lg:h-18 text-base sm:text-2xl lg:text-3xl'
              } rounded-xl sm:rounded-2xl font-en font-black transition-all touch-manipulation select-none ${
                item.used
                  ? 'opacity-20 bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-750 border-2 border-slate-300 dark:border-slate-600 shadow-sm hover:scale-105 active:scale-90 active:bg-blue-50'
              }`}
            >
              {item.char}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={handleReset}
            disabled={isCorrect || userLetters.length === 0}
            className="flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold transition-all disabled:opacity-40 min-h-[44px] sm:min-h-[50px] active:scale-95 touch-manipulation"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>مسح الحروف</span>
          </button>

          <button
            onClick={handleNextWord}
            className="flex items-center gap-1.5 sm:gap-2.5 px-5 py-2.5 sm:px-8 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold transition-all shadow-md active:scale-95 touch-manipulation min-h-[44px] sm:min-h-[50px]"
          >
            <span>الكلمة التالية</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
