import { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Play, Shuffle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VocabWord } from '../types';
import { soundEffects, speakEnglish } from '../utils/audio';

interface MemoryCardGameProps {
  words: VocabWord[];
  unitTitle?: string;
}

interface MemoryCard {
  id: string;
  vocabId: string;
  text: string;
  type: 'en' | 'ar';
  partOfSpeech?: string;
  isMatched: boolean;
}

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({
  words,
  unitTitle = 'Current Unit'
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [mismatchedCardIds, setMismatchedCardIds] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'ready' | 'peeking' | 'playing' | 'won'>('ready');
  const [peekCountdown, setPeekCountdown] = useState(2);
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [roundOffset, setRoundOffset] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Available unique words in this unit
  const validWords = words.filter(w => w && w.word && w.arabicMeaning);
  const totalRounds = Math.max(1, Math.ceil(validWords.length / 4));
  const currentRoundIndex = Math.min(totalRounds, Math.floor(roundOffset / 4) + 1);

  // Initialize or deal a round of 4 words (8 cards)
  const setupDeck = useCallback((offset: number) => {
    if (validWords.length === 0) return;

    // Pick 4 words starting from offset, wrapping around if needed
    const pickedWords: VocabWord[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = (offset + i) % validWords.length;
      pickedWords.push(validWords[idx]);
    }

    const enCards: MemoryCard[] = pickedWords.map((w, idx) => ({
      id: `en-${w.id || idx}`,
      vocabId: w.id || `word-${idx}`,
      text: w.word,
      type: 'en',
      partOfSpeech: w.partOfSpeech,
      isMatched: false
    }));

    const arCards: MemoryCard[] = pickedWords.map((w, idx) => ({
      id: `ar-${w.id || idx}`,
      vocabId: w.id || `word-${idx}`,
      text: w.arabicMeaning.split('/')[0].split('(')[0].trim(),
      type: 'ar',
      partOfSpeech: w.partOfSpeech,
      isMatched: false
    }));

    // Shuffle the 8 cards
    const shuffledDeck = [...enCards, ...arCards].sort(() => Math.random() - 0.5);

    setCards(shuffledDeck);
    setFlippedCardIds([]);
    setMismatchedCardIds([]);
    setMoves(0);
    setSecondsElapsed(0);
    setIsProcessing(false);
    setGameState('ready');
  }, [validWords]);

  // Initial load
  useEffect(() => {
    setupDeck(roundOffset);
  }, [setupDeck, roundOffset]);

  // Timer loop when playing
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setSecondsElapsed(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Start Game: 2-second peek preview then flip face down
  const handleStartGame = () => {
    soundEffects.playClick();
    setGameState('peeking');
    setPeekCountdown(2);

    // Flip all cards up for the preview
    setFlippedCardIds(cards.map(c => c.id));

    const countdownInterval = setInterval(() => {
      setPeekCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Turn cards face down and begin play
          setFlippedCardIds([]);
          setGameState('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Card click handler
  const handleCardClick = (card: MemoryCard) => {
    // Prevent clicking if not playing, already matched, currently processing, or clicking same card
    if (
      gameState !== 'playing' ||
      card.isMatched ||
      isProcessing ||
      flippedCardIds.includes(card.id)
    ) {
      return;
    }

    soundEffects.playClick();

    // If English card, pronounce it
    if (card.type === 'en') {
      speakEnglish(card.text);
    }

    const newFlipped = [...flippedCardIds, card.id];
    setFlippedCardIds(newFlipped);

    // If this is the second card flipped in the turn
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsProcessing(true);

      const firstCard = cards.find(c => c.id === newFlipped[0]);
      const secondCard = card;

      if (!firstCard) {
        setIsProcessing(false);
        return;
      }

      // Check match: same vocabId and opposite types (en vs ar)
      const isMatch = firstCard.vocabId === secondCard.vocabId && firstCard.type !== secondCard.type;

      if (isMatch) {
        // Correct match!
        setTimeout(() => {
          soundEffects.playCorrect();

          setCards(prev =>
            prev.map(c =>
              c.vocabId === firstCard.vocabId ? { ...c, isMatched: true } : c
            )
          );

          setFlippedCardIds([]);
          setIsProcessing(false);

          // Check if all 8 cards matched
          setCards(latestCards => {
            const allMatched = latestCards.every(c => c.vocabId === firstCard.vocabId || c.isMatched);
            if (allMatched) {
              setGameState('won');
              soundEffects.playWin();
              try {
                confetti({
                  particleCount: 120,
                  spread: 80,
                  origin: { y: 0.6 }
                });
              } catch {
                // confetti fallback
              }
            }
            return latestCards;
          });
        }, 300);
      } else {
        // Mismatch
        setTimeout(() => {
          soundEffects.playWrong();
          setMismatchedCardIds([firstCard.id, secondCard.id]);

          setTimeout(() => {
            setFlippedCardIds([]);
            setMismatchedCardIds([]);
            setIsProcessing(false);
          }, 800);
        }, 500);
      }
    }
  };

  // Next Deck / Round
  const handleNextDeck = () => {
    soundEffects.playClick();
    const nextOffset = (roundOffset + 4) >= validWords.length ? 0 : roundOffset + 4;
    setRoundOffset(nextOffset);
    setupDeck(nextOffset);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // Star calculation based on moves (minimum moves = 4)
  const getStars = () => {
    if (moves <= 5) return '⭐⭐⭐';
    if (moves <= 8) return '⭐⭐';
    return '⭐';
  };

  const matchedPairsCount = cards.filter(c => c.isMatched).length / 2;

  return (
    <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <span>🃏</span>
                <span>8-Card Memory Flip</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Deck {currentRoundIndex} of {totalRounds}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
              Playing Cards Match
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {unitTitle} • Flip the cards to match each English word with its Arabic translation!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Pairs progress */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold">
              <span className="text-slate-500 dark:text-slate-400">Pairs:</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">{matchedPairsCount} / 4</span>
            </div>

            {/* Moves count */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold">
              <span className="text-slate-500 dark:text-slate-400">Moves:</span>
              <span className="text-purple-600 dark:text-purple-400 font-black">{moves}</span>
            </div>

            {/* Stopwatch */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold font-mono">
              <span className="text-slate-500 dark:text-slate-400">Time:</span>
              <span className="text-slate-800 dark:text-slate-200">{formatTime(secondsElapsed)}</span>
            </div>

            {/* Restart / Shuffle */}
            <button
              onClick={() => setupDeck(roundOffset)}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors active:scale-95 cursor-pointer"
              title="Reshuffle Deck"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Start Game Prompt Overlay / Banner when state is 'ready' */}
        {gameState === 'ready' && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-2xl p-3.5">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-900 dark:text-blue-200 font-medium">
              <span className="text-xl">🎴</span>
              <span>Cards are set! Click <strong>Start Game</strong> to peek for 2 seconds, shuffle face-down, and begin!</span>
            </div>
            <button
              onClick={handleStartGame}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {/* Peeking Countdown Banner */}
        {gameState === 'peeking' && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-3 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Memorize the cards! Flipping in {peekCountdown}s...</span>
          </div>
        )}
      </div>

      {/* 8-Card Playing Grid: 4 columns x 2 rows (fits mobile screens perfectly) */}
      <div className="grid grid-cols-2 xs:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        {cards.map((card) => {
          const isFlipped = flippedCardIds.includes(card.id) || card.isMatched;
          const isMismatched = mismatchedCardIds.includes(card.id);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="w-full aspect-[4/5] sm:aspect-[3/4] perspective-1000 select-none cursor-pointer group touch-manipulation"
            >
              {/* Flip Container with 3D transform */}
              <div
                className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 rounded-2xl sm:rounded-3xl shadow-sm ${
                  isFlipped ? 'rotate-y-180' : ''
                } ${isMismatched ? 'ring-4 ring-rose-500 animate-pulse' : ''}`}
              >
                {/* BACK OF CARD: Classic Luxury Playing Card Style */}
                <div className="absolute inset-0 backface-hidden rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-[3px] border-amber-400/70 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-amber-300 flex flex-col items-center justify-between p-2.5 sm:p-4 shadow-md group-hover:shadow-lg group-hover:scale-[1.02] transition-transform">
                  {/* Subtle Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
                      backgroundSize: '12px 12px'
                    }}
                  />

                  {/* Corner Suit Badges */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-bold font-mono text-amber-400/80 z-10">
                    <span>♠</span>
                    <span>♦</span>
                  </div>

                  {/* Center Playing Card Emblem */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-amber-400/90 bg-gradient-to-b from-amber-400/20 to-transparent flex items-center justify-center shadow-inner">
                      <span className="font-en font-black text-amber-300 text-sm sm:text-lg tracking-wider">ER</span>
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-bold text-amber-200/90 tracking-widest uppercase mt-1">
                      {gameState === 'ready' ? 'READY' : 'FLIP'}
                    </span>
                  </div>

                  {/* Bottom Suit Badges */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-bold font-mono text-amber-400/80 z-10">
                    <span>♣</span>
                    <span>♥</span>
                  </div>
                </div>

                {/* FRONT OF CARD: English Word or Arabic Meaning */}
                <div
                  className={`absolute inset-0 rotate-y-180 backface-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-[3px] flex flex-col justify-between p-2.5 sm:p-4 text-center shadow-md transition-all ${
                    card.isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 ring-2 sm:ring-4 ring-emerald-400/30'
                      : isMismatched
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 dark:border-rose-500'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {/* Card Header: Corner Tag & Audio Button */}
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`text-[9px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-md ${
                        card.type === 'en'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                      }`}
                    >
                      {card.type === 'en' ? 'EN 🇬🇧' : 'AR 🇪🇬'}
                    </span>

                    {/* Pronunciation button for English cards */}
                    {card.type === 'en' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(card.text);
                        }}
                        className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        title="Pronounce word"
                      >
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>

                  {/* Card Center: Large Word */}
                  <div className="my-auto px-1">
                    <div
                      className={`font-black tracking-tight leading-tight ${
                        card.type === 'en'
                          ? 'font-en text-slate-900 dark:text-white text-xs sm:text-base md:text-lg break-words'
                          : 'font-ar text-blue-700 dark:text-blue-300 text-xs sm:text-base md:text-lg break-words'
                      }`}
                    >
                      {card.text}
                    </div>

                    {/* Part of Speech Pill if English */}
                    {card.type === 'en' && card.partOfSpeech && (
                      <span className="inline-block text-[9px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-medium italic mt-1">
                        {card.partOfSpeech}
                      </span>
                    )}
                  </div>

                  {/* Card Footer: Match Indicator */}
                  <div className="w-full flex justify-center items-center min-h-[18px]">
                    {card.isMatched && (
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Matched</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Won Celebration Modal */}
      {gameState === 'won' && (
        <div className="mt-6 sm:mt-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-emerald-300 dark:border-emerald-800 shadow-xl text-center animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl sm:text-4xl">
            🏆
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            Excellent Memory! 🎉
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
            You matched all 4 vocabulary pairs in {moves} moves!
          </p>

          {/* Performance Rating */}
          <div className="flex items-center justify-center gap-6 my-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl max-w-sm mx-auto border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Rating</div>
              <div className="text-xl sm:text-2xl mt-0.5">{getStars()}</div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</div>
              <div className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {formatTime(secondsElapsed)}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Moves</div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {moves}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button
              onClick={handleNextDeck}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Next Words Deck</span>
            </button>
            <button
              onClick={() => setupDeck(roundOffset)}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Instructions Footer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Tip: Listen to the pronunciation when flipping English cards to practice your accent!</span>
      </div>
    </div>
  );
};
