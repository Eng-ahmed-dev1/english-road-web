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
}

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({
  words,
  unitTitle = 'Current Unit'
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  // IDs of cards currently flipped face-up in the current turn (up to 2)
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  // vocabIds of pairs that have been matched
  const [matchedVocabIds, setMatchedVocabIds] = useState<string[]>([]);
  // IDs of mismatched pair (temporarily showing red border)
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]);

  const [gameState, setGameState] = useState<'preview' | 'playing' | 'won'>('preview');
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [roundOffset, setRoundOffset] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const mismatchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Filter valid words
  const validWords = words.filter(w => w && w.word && w.arabicMeaning);
  const totalRounds = Math.max(1, Math.ceil(validWords.length / 4));
  const currentRoundIndex = Math.min(totalRounds, Math.floor(roundOffset / 4) + 1);

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (mismatchTimeoutRef.current) clearTimeout(mismatchTimeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initialize a round of 4 words (8 cards) in PREVIEW mode:
  // Row 1: 4 English cards
  // Row 2: 4 Arabic cards matching them
  const setupDeck = useCallback((offset: number) => {
    if (validWords.length === 0) return;

    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    const pickedWords: VocabWord[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = (offset + i) % validWords.length;
      pickedWords.push(validWords[idx]);
    }

    const enCards: MemoryCard[] = pickedWords.map((w, idx) => ({
      id: `en-${w.id || idx}-${idx}`,
      vocabId: w.id || `word-${idx}`,
      text: w.word.trim(),
      type: 'en',
      partOfSpeech: w.partOfSpeech
    }));

    const arCards: MemoryCard[] = pickedWords.map((w, idx) => ({
      id: `ar-${w.id || idx}-${idx}`,
      vocabId: w.id || `word-${idx}`,
      text: w.arabicMeaning.split('/')[0].split('(')[0].trim(),
      type: 'ar',
      partOfSpeech: w.partOfSpeech
    }));

    // In preview: top 4 English, bottom 4 Arabic
    setCards([...enCards, ...arCards]);
    setFlippedIds([]);
    setMatchedVocabIds([]);
    setMismatchedIds([]);
    setMoves(0);
    setSecondsElapsed(0);
    setIsShuffling(false);
    setGameState('preview');
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
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // START & SHUFFLE GAME:
  // "اول م ادوس start يتقلبوا على ضهرهم و يتشقلبوا"
  const handleStartGame = () => {
    try {
      soundEffects.playClick();
    } catch {
      // ignore
    }

    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    setIsShuffling(true);

    // Trigger visual shuffle animation, then shuffle cards and flip face-down
    setTimeout(() => {
      setCards(prev => [...prev].sort(() => Math.random() - 0.5));
      setFlippedIds([]);
      setMatchedVocabIds([]);
      setMismatchedIds([]);
      setMoves(0);
      setSecondsElapsed(0);
      setIsShuffling(false);
      setGameState('playing');
    }, 250);
  };

  // Card click handler
  const handleCardClick = (card: MemoryCard) => {
    // If user clicks ANY card during preview mode, automatically START the game!
    // That way cards NEVER stay frozen/static if the user taps directly on them!
    if (gameState === 'preview') {
      handleStartGame();
      return;
    }

    // In playing mode:
    // If card is already matched, ignore
    if (matchedVocabIds.includes(card.vocabId)) return;

    // If card is already flipped in current turn, ignore
    if (flippedIds.includes(card.id)) return;

    // If 2 cards are currently flipped and waiting for mismatch flip-back, ignore clicks
    if (flippedIds.length >= 2) return;

    try {
      soundEffects.playClick();
    } catch {
      // ignore
    }

    // Pronounce English word if English card
    if (card.type === 'en') {
      try {
        speakEnglish(card.text);
      } catch {
        // ignore
      }
    }

    // First card flipped in this turn
    if (flippedIds.length === 0) {
      setFlippedIds([card.id]);
      return;
    }

    // Second card flipped in this turn
    if (flippedIds.length === 1) {
      const firstCardId = flippedIds[0];
      const firstCard = cards.find(c => c.id === firstCardId);

      if (!firstCard) {
        setFlippedIds([card.id]);
        return;
      }

      setMoves(m => m + 1);
      setFlippedIds([firstCardId, card.id]);

      // Check match: same vocabId and opposite types ('en' vs 'ar')
      const isMatch = firstCard.vocabId === card.vocabId && firstCard.type !== card.type;

      if (isMatch) {
        // CORRECT MATCH!
        try {
          soundEffects.playCorrect();
        } catch {
          // ignore
        }

        const nextMatched = [...matchedVocabIds, card.vocabId];
        setMatchedVocabIds(nextMatched);
        setFlippedIds([]);

        // Check if all 4 pairs are matched
        if (nextMatched.length === 4) {
          setGameState('won');
          try {
            soundEffects.playWin();
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch {
            // ignore
          }
        }
      } else {
        // MISMATCH!
        // "لو اختارنا غلط كلهم يتقلبوا تانى بس بدون شقلبة فاهم"
        try {
          soundEffects.playWrong();
        } catch {
          // ignore
        }

        setMismatchedIds([firstCardId, card.id]);

        mismatchTimeoutRef.current = setTimeout(() => {
          setFlippedIds([]);
          setMismatchedIds([]);
          mismatchTimeoutRef.current = null;
        }, 700);
      }
    }
  };

  // Next Deck / Round (Next 4 words)
  const handleNextDeck = () => {
    try {
      soundEffects.playClick();
    } catch {
      // ignore
    }
    const nextOffset = (roundOffset + 4) >= validWords.length ? 0 : roundOffset + 4;
    setRoundOffset(nextOffset);
    setupDeck(nextOffset);
  };

  // Replay current 4 words
  const handleReplayCurrent = () => {
    try {
      soundEffects.playClick();
    } catch {
      // ignore
    }
    setupDeck(roundOffset);
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

  const matchedPairsCount = matchedVocabIds.length;

  return (
    <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs mb-3 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <span>🃏</span>
                <span>8-Card Memory Match</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Deck {currentRoundIndex} of {totalRounds}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
              Playing Cards Match (لعبة كروت الكوتشينة)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {unitTitle} • 4 English words on top row & 4 Arabic meanings on bottom row.
            </p>
          </div>

          {/* Stats & Restart */}
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

            {/* Reset */}
            <button
              onClick={handleReplayCurrent}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors active:scale-95 cursor-pointer"
              title="Reset & Preview"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Start Game Action Banner */}
        {gameState === 'preview' && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl p-3 sm:p-4 border border-blue-200/60 dark:border-blue-800/60">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-950 dark:text-blue-200 font-medium">
              <span className="text-2xl animate-bounce">👇</span>
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold sm:inline sm:mr-1">
                  الـ 8 كروت مفتوحة على وشها للحفظ!
                </strong>
                <span>اضغط على الزر (أو اضغط على أي كارت) ليتم قلب الكروت على ضهرها وشقلبتها لبدء اللعب:</span>
              </div>
            </div>

            <button
              onClick={handleStartGame}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0 animate-pulse"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              <span>ابدأ واقلب الكروت (Start &amp; Shuffle)</span>
            </button>
          </div>
        )}

        {/* Playing mode hint */}
        {gameState === 'playing' && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>اضغط على أي كارت لقلبه ومطابقة الكلمة الإنجليزية بمعناها بالعربي!</span>
            </span>
            <button
              onClick={handleStartGame}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>إعادة اللخبطة (Reshuffle)</span>
            </button>
          </div>
        )}
      </div>

      {/* 
        GRID LAYOUT: STRICTLY 2 ROWS (4 cards on top row, 4 cards on bottom row)
        grid-cols-4 on ALL screen sizes!
        First 4 cards: Row 1 (top row)
        Second 4 cards: Row 2 (bottom row)
        Identical aspect ratio so every card has the EXACT same size.
      */}
      <div className={`grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 transition-transform duration-300 ${isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        {cards.map((card) => {
          const isMatched = matchedVocabIds.includes(card.vocabId);
          // Face up if preview mode, or matched, or currently clicked/flipped in this turn
          const isFaceUp = gameState === 'preview' || isMatched || flippedIds.includes(card.id);
          const isMismatched = mismatchedIds.includes(card.id);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] cursor-pointer select-none touch-manipulation group"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Flip Card Container */}
              <div
                className={`relative w-full h-full rounded-xl sm:rounded-2xl transition-transform duration-500 shadow-sm ${
                  isMismatched ? 'ring-4 ring-rose-500 animate-pulse' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  transform: isFaceUp ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* 
                  BACK OF CARD (Shown when face-down):
                  Luxury playing card back design with ER monogram 
                */}
                <div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-[3px] border-amber-400/80 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-amber-300 flex flex-col items-center justify-between p-1.5 sm:p-3 shadow-md group-hover:shadow-lg transition-all"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  {/* Playing card background texture */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
                      backgroundSize: '10px 10px'
                    }}
                  />

                  {/* Top Suits */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-bold font-mono text-amber-400/80 z-10 leading-none pointer-events-none">
                    <span>♠</span>
                    <span>♦</span>
                  </div>

                  {/* Center ER Monogram Seal */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400/90 bg-gradient-to-b from-amber-400/20 to-transparent flex items-center justify-center shadow-inner">
                      <span className="font-en font-black text-amber-300 text-xs sm:text-base tracking-wider">ER</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-amber-200/90 tracking-widest uppercase mt-0.5 sm:mt-1">
                      FLIP
                    </span>
                  </div>

                  {/* Bottom Suits */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-bold font-mono text-amber-400/80 z-10 leading-none pointer-events-none">
                    <span>♣</span>
                    <span>♥</span>
                  </div>
                </div>

                {/* 
                  FRONT OF CARD (Shown when face-up):
                  Shows the word, meaning, badge, and match status
                */}
                <div
                  className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 sm:border-[3px] flex flex-col justify-between p-1.5 sm:p-3 text-center shadow-md transition-colors ${
                    isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 dark:border-emerald-400 ring-2 sm:ring-4 ring-emerald-400/40'
                      : isMismatched
                      ? 'bg-rose-50 dark:bg-rose-950/70 border-rose-500'
                      : gameState === 'preview'
                      ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-700/80'
                      : 'bg-white dark:bg-slate-900 border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-300 dark:ring-blue-600'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Card Corner Tag & Audio Button */}
                  <div className="w-full flex items-center justify-between leading-none pointer-events-none">
                    <span
                      className={`text-[8px] sm:text-[11px] font-black px-1 sm:px-1.5 py-0.5 rounded ${
                        card.type === 'en'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                      }`}
                    >
                      {card.type === 'en' ? 'EN' : 'AR'}
                    </span>

                    {/* Pronunciation button for English cards */}
                    {card.type === 'en' && (
                      <span
                        className="p-0.5 sm:p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pointer-events-auto cursor-pointer"
                        title="Pronounce word"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(card.text);
                        }}
                      >
                        <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    )}
                  </div>

                  {/* Card Center: Text */}
                  <div className="my-auto px-0.5 flex flex-col items-center justify-center pointer-events-none">
                    <div
                      className={`font-black tracking-tight leading-tight line-clamp-3 ${
                        card.type === 'en'
                          ? 'font-en text-slate-900 dark:text-white text-[11px] sm:text-base md:text-lg break-words'
                          : 'font-ar text-blue-700 dark:text-blue-300 text-[11px] sm:text-base md:text-lg break-words'
                      }`}
                    >
                      {card.text}
                    </div>

                    {/* Part of Speech Pill if English */}
                    {card.type === 'en' && card.partOfSpeech && (
                      <span className="hidden xs:inline-block text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-medium italic mt-0.5 sm:mt-1">
                        {card.partOfSpeech}
                      </span>
                    )}
                  </div>

                  {/* Card Footer: Match Status */}
                  <div className="w-full flex justify-center items-center min-h-[14px] sm:min-h-[18px] leading-none pointer-events-none">
                    {isMatched && (
                      <span className="text-[9px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 sm:gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        <span>Matched</span>
                      </span>
                    )}
                    {!isMatched && gameState === 'preview' && (
                      <span className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
                        {card.type === 'en' ? 'Row 1 (English)' : 'Row 2 (Arabic)'}
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
        <div className="mt-5 sm:mt-8 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-10 border border-emerald-300 dark:border-emerald-800 shadow-xl text-center animate-fade-in">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl sm:text-4xl">
            🏆
          </div>

          <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            Excellent Memory! 🎉 (أحسنت! فوز رائع)
          </h3>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mb-4">
            وصلت جميع الأزواج بنجاح في {moves} حركات فقط!
          </p>

          {/* Performance Rating */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-3 sm:my-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl max-w-sm mx-auto border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">Rating</div>
              <div className="text-lg sm:text-2xl mt-0.5">{getStars()}</div>
            </div>
            <div className="h-7 sm:h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">Time</div>
              <div className="text-sm sm:text-lg font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {formatTime(secondsElapsed)}
              </div>
            </div>
            <div className="h-7 sm:h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">Moves</div>
              <div className="text-sm sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {moves}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mt-5">
            <button
              onClick={handleNextDeck}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Next 4 Words (الـ 4 كلمات التالية)</span>
            </button>
            <button
              onClick={handleReplayCurrent}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again (العب تاني)</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 text-center">
        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
        <span>صفين بس: 4 كروت فوق و 4 كروت تحت بنفس المقاس تماماً.</span>
      </div>
    </div>
  );
};
