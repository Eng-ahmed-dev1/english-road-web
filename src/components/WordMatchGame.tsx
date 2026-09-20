import { useState, useEffect, useCallback } from 'react';
import { Timer, RotateCcw, CheckCircle2 } from 'lucide-react';
import type { VocabWord } from '../types';

interface WordMatchGameProps {
  words: VocabWord[];
  onComplete?: () => void;
  isCompleted?: boolean;
  showPoints?: boolean;
  onAddPoints?: (points: number) => void;
  compactMode?: boolean;
  hasTimer?: boolean;
}

interface MatchCard {
  id: string;
  vocabId: string;
  text: string;
  type: 'en' | 'ar';
  isMatched: boolean;
}

export const WordMatchGame: React.FC<WordMatchGameProps> = ({
  words,
  onComplete,
  isCompleted,
  showPoints = false,
  onAddPoints,
  compactMode = false,
  hasTimer = false
}) => {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');

  // Start new round
  const startNewGame = useCallback(() => {
    const pairCount = compactMode ? 4 : 6;
    const shuffledPool = [...words].sort(() => Math.random() - 0.5).slice(0, pairCount);

    const enCards: MatchCard[] = shuffledPool.map(w => ({
      id: `en-${w.id}`,
      vocabId: w.id,
      text: w.word,
      type: 'en',
      isMatched: false
    }));

    const arCards: MatchCard[] = shuffledPool.map(w => ({
      id: `ar-${w.id}`,
      vocabId: w.id,
      text: w.arabicMeaning.split('/')[0].trim(),
      type: 'ar',
      isMatched: false
    }));

    const allCards = [...enCards, ...arCards].sort(() => Math.random() - 0.5);

    setCards(allCards);
    setSelectedCards([]);
    setTimeLeft(60);
    setGameState('playing');
  }, [words, compactMode]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Timer countdown (only if hasTimer is enabled)
  useEffect(() => {
    if (!hasTimer || gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, hasTimer]);

  const handleCardClick = (card: MatchCard) => {
    if (card.isMatched || selectedCards.length === 2 || selectedCards.find(c => c.id === card.id)) {
      return;
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      
      // Check match
      if (first.vocabId === second.vocabId && first.type !== second.type) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.vocabId === first.vocabId ? { ...c, isMatched: true } : c));
          setSelectedCards([]);
          
          if (showPoints && onAddPoints) {
            onAddPoints(10);
          }

          // Check if all matched
          setCards(latestCards => {
            const allDone = latestCards.every(c => c.vocabId === first.vocabId || c.isMatched);
            if (allDone) {
              setGameState('won');
              if (onComplete) onComplete();
            }
            return latestCards;
          });
        }, 250);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 600);
      }
    }
  };

  const matchedPairsCount = cards.filter(c => c.isMatched).length / 2;
  const totalPairsCount = cards.length / 2;

  return (
    <div className={compactMode ? 'w-full p-2' : 'max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            {!compactMode && (
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">نشاط تفاعلي على السبورة الذكية</span>
                {isCompleted && (
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    مكتمل ✓
                  </span>
                )}
              </div>
            )}
            <h2 className={`${compactMode ? 'text-lg' : 'text-2xl sm:text-3xl'} font-black text-slate-900 dark:text-white`}>
              مطابقة الكلمات والمفردات
            </h2>
            {!compactMode && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                اختر الكلمة بالإنجليزية ثم اختر معناها الصحيح بالعربية لإتمام أزواج الكلمات على الشاشة.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Pairs progress */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold font-en">
              <span>الأزواج:</span>
              <span className="text-blue-600 dark:text-blue-400 text-sm sm:text-base font-black">{matchedPairsCount} / {totalPairsCount}</span>
            </div>

            {/* Timer (Only shown when hasTimer is true) */}
            {hasTimer && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold font-en ${
                timeLeft < 15 
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800 animate-pulse' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}>
                <Timer className="w-4 h-4" />
                <span>{timeLeft} ثانية</span>
              </div>
            )}

            {/* Restart */}
            <button
              onClick={startNewGame}
              className="p-2.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors border border-slate-200 dark:border-slate-700 active:scale-95 touch-manipulation"
              title="إعادة بدء جولة جديدة"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cards - Optimized for Finger & Stylus Touch on Whiteboards */}
      <div className={`grid ${compactMode ? 'grid-cols-2 gap-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'}`}>
        {cards.map(card => {
          const isSelected = selectedCards.some(c => c.id === card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || gameState !== 'playing'}
              className={`${
                compactMode 
                  ? 'min-h-[85px] p-3' 
                  : 'min-h-[110px] sm:min-h-[125px] lg:min-h-[140px] p-5 sm:p-6'
              } rounded-2xl sm:rounded-3xl font-semibold transition-all duration-150 flex flex-col items-center justify-center text-center select-none border-2 touch-manipulation active:scale-95 ${
                card.isMatched
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 opacity-60 cursor-default'
                  : isSelected
                  ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-400 shadow-lg scale-102 ring-4 ring-blue-300 dark:ring-blue-500'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md'
              }`}
            >
              <span className={`${compactMode ? 'text-sm sm:text-base' : 'text-base sm:text-xl lg:text-2xl'} ${card.type === 'en' ? 'font-en font-black capitalize tracking-wide' : 'font-black'}`}>
                {card.text}
              </span>

              {card.isMatched && (
                <span className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 mt-2 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> متطابق
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Won Notice */}
      {gameState === 'won' && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-emerald-300 dark:border-emerald-800 shadow-sm text-center">
          <CheckCircle2 className="w-14 h-14 mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">أحسنت! تم إكمال المطابقة بنجاح 👏</h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5">
            تمت مطابقة جميع مفردات الجولة بنجاح تام.
          </p>
          <button
            onClick={startNewGame}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg rounded-2xl transition-all shadow-md active:scale-95 touch-manipulation"
          >
            جولة جديدة
          </button>
        </div>
      )}

      {/* Lost Notice (Only if hasTimer is true) */}
      {hasTimer && gameState === 'lost' && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">انتهى الوقت المخصص للجولة</h3>
          <button
            onClick={startNewGame}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-2xl transition-all active:scale-95 touch-manipulation"
          >
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
};
