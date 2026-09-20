import { useState, useEffect, useCallback } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import type { SentencePuzzle } from '../types';

interface SentenceBuilderGameProps {
  puzzles: SentencePuzzle[];
  showPoints?: boolean;
  onAddPoints?: (points: number) => void;
  compactMode?: boolean;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  puzzles,
  showPoints = false,
  onAddPoints,
  compactMode = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableChunks, setAvailableChunks] = useState<{ id: number; text: string; used: boolean }[]>([]);
  const [selectedChunks, setSelectedChunks] = useState<{ id: number; text: string }[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentPuzzle = puzzles[currentIndex] || puzzles[0];

  const initPuzzle = useCallback((puzzle: SentencePuzzle) => {
    const chunksWithId = puzzle.chunks.map((chunk, index) => ({
      id: index,
      text: chunk,
      used: false
    }));

    // Shuffle chunks
    const shuffled = [...chunksWithId].sort(() => Math.random() - 0.5);
    setAvailableChunks(shuffled);
    setSelectedChunks([]);
    setIsCorrect(false);
  }, []);

  useEffect(() => {
    if (currentPuzzle) {
      initPuzzle(currentPuzzle);
    }
  }, [currentPuzzle, initPuzzle]);

  const handleSelectChunk = (chunk: { id: number; text: string; used: boolean }) => {
    if (chunk.used || isCorrect) return;

    const nextSelected = [...selectedChunks, { id: chunk.id, text: chunk.text }];
    setSelectedChunks(nextSelected);
    setAvailableChunks(prev => prev.map(c => c.id === chunk.id ? { ...c, used: true } : c));

    // Check if full sentence is assembled
    if (nextSelected.length === currentPuzzle.chunks.length) {
      const assembled = nextSelected.map(c => c.text).join(' ').trim();
      const target = currentPuzzle.chunks.join(' ').trim();

      if (assembled === target) {
        setIsCorrect(true);
        setScore(s => s + 1);
        if (showPoints && onAddPoints) {
          onAddPoints(20);
        }
      }
    }
  };

  const handleRemoveChunk = (indexToRemove: number) => {
    if (isCorrect) return;

    const removed = selectedChunks[indexToRemove];
    setSelectedChunks(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setAvailableChunks(prev => prev.map(c => c.id === removed.id ? { ...c, used: false } : c));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % puzzles.length);
  };

  const handleReset = () => {
    initPuzzle(currentPuzzle);
  };

  return (
    <div className={compactMode ? 'w-full p-2' : 'max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!compactMode && <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 font-en">
              جملة {currentIndex + 1} من {puzzles.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {showPoints && (
              <span className="text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 font-en">
                الدرجة: {score}
              </span>
            )}
            <button
              onClick={handleReset}
              disabled={selectedChunks.length === 0 || isCorrect}
              className="p-2.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 active:scale-95 touch-manipulation transition-all"
              title="إعادة الترتيب"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
        {/* Arabic Translation Target */}
        <div className="mb-8 space-y-2">
          <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">معنى الجملة المطلوب تكوينها:</span>
          <h3 className={`${compactMode ? 'text-xl' : 'text-2xl sm:text-3xl lg:text-4xl'} font-black text-slate-900 dark:text-white leading-snug`}>
            {currentPuzzle.arabicTranslation}
          </h3>
        </div>

        {/* Selected chunks slot / assembled sentence */}
        <div className="p-5 sm:p-8 min-h-24 sm:min-h-32 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8" dir="ltr">
          {selectedChunks.length === 0 ? (
            <span className="text-sm sm:text-base text-slate-400 font-en">
              Click the word blocks below in order to build the sentence on the whiteboard...
            </span>
          ) : (
            selectedChunks.map((chunk, idx) => (
              <button
                key={idx}
                onClick={() => handleRemoveChunk(idx)}
                disabled={isCorrect}
                className="px-5 py-3 sm:px-7 sm:py-4 bg-slate-900 dark:bg-blue-600 text-white font-en font-black text-base sm:text-xl lg:text-2xl rounded-2xl hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-md active:scale-95 touch-manipulation"
              >
                {chunk.text}
              </button>
            ))
          )}
        </div>

        {/* Correct status */}
        {isCorrect && (
          <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex items-center justify-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-sm sm:text-base font-bold animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>ترتيب نحوي صحيح وسليم 100%! أحسنت 👏</span>
          </div>
        )}

        {/* Available chunks - Big Touch Friendly Blocks for Whiteboard */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10" dir="ltr">
          {availableChunks.map(chunk => (
            <button
              key={chunk.id}
              onClick={() => handleSelectChunk(chunk)}
              disabled={chunk.used || isCorrect}
              className={`px-5 py-3 sm:px-7 sm:py-4 rounded-2xl font-en font-black text-base sm:text-xl lg:text-2xl transition-all select-none touch-manipulation ${
                chunk.used
                  ? 'opacity-20 bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-750 border-2 border-slate-300 dark:border-slate-600 shadow-sm hover:scale-105 active:scale-90 active:bg-blue-50'
              }`}
            >
              {chunk.text}
            </button>
          ))}
        </div>

        {/* Next sentence button */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleNext}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base sm:text-lg transition-all shadow-md active:scale-95 touch-manipulation min-h-[52px]"
          >
            <span>الجملة التالية</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
