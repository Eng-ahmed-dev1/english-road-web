import { useState, useEffect } from 'react';
import { Timer, CheckCircle, XCircle, ArrowRight, RotateCcw, CheckCircle2, FileText } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface FillBlankGameProps {
  questions: QuizQuestion[];
  showPoints?: boolean;
  onAddPoints?: (points: number) => void;
  compactMode?: boolean;
  hasTimer?: boolean;
}

export const FillBlankGame: React.FC<FillBlankGameProps> = ({
  questions,
  showPoints = false,
  onAddPoints,
  compactMode = false,
  hasTimer = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  useEffect(() => {
    if (!hasTimer || isFinished || selectedOption !== null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setSelectedOption('__TIMEOUT__');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, selectedOption, isFinished, hasTimer]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    if (option.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
      setScore(s => s + 1);
      if (showPoints && onAddPoints) {
        onAddPoints(15);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setTimeLeft(25);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(25);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className={compactMode ? 'w-full p-2' : 'max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8'}>
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-200 dark:border-blue-800">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
            Contextual Fill-in-the-Blanks Completed!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
            Successfully practiced vocabulary usage in real context sentences.
          </p>

          {showPoints && (
            <div className="my-3 sm:my-4 inline-flex items-center gap-3 sm:gap-4 px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400">Score:</span>
              <span className="text-xl font-black font-en text-blue-600 dark:text-blue-400">{score} / {questions.length}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Practice</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={compactMode ? 'w-full p-2' : 'max-w-5xl 2xl:max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8'}>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {!compactMode && <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />}
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 font-en">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {hasTimer && (
            <div className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold font-en ${
              timeLeft < 8 
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800 animate-pulse' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}>
              <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-3.5 sm:mt-5">
          <div 
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-2 sm:mb-3 uppercase tracking-wider">Choose the word that best completes the sentence:</span>
        <h3 className={`${compactMode ? 'text-sm sm:text-base' : 'text-base sm:text-2xl lg:text-3xl'} font-bold font-en text-slate-900 dark:text-white leading-relaxed mb-6 sm:mb-8`} dir="ltr">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5 sm:space-y-3.5" dir="ltr">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectAnswer = option.toLowerCase() === currentQ.correctAnswer.toLowerCase();
            const showFeedback = selectedOption !== null;

            let buttonStyle = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white';
            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-black ring-2 ring-emerald-400';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-300 font-bold';
              } else {
                buttonStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-40';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                disabled={showFeedback}
                className={`w-full p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 font-en text-sm sm:text-lg lg:text-xl font-bold flex items-center justify-between transition-all min-h-[50px] sm:min-h-[64px] active:scale-[0.98] touch-manipulation shadow-2xs ${buttonStyle}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs sm:text-base font-black text-slate-600 dark:text-slate-300 shadow-2xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="capitalize tracking-wide">{option}</span>
                </div>

                {showFeedback && isCorrectAnswer && (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {showFeedback && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        {selectedOption !== null && (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">💡 Explanation & Context:</span>
              <p className="text-xs sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 font-en leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-lg shadow-md active:scale-95 touch-manipulation min-h-[46px] sm:min-h-[54px]"
            >
              <span>{currentIndex + 1 === questions.length ? 'Finish Practice' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
