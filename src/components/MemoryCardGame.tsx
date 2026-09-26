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
  // IDs of cards currently face-up because user clicked them
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  // vocabIds of pairs that have been successfully matched
  const [matchedVocabIds, setMatchedVocabIds] = useState<string[]>([]);
  // IDs of 2 mismatched cards temporarily highlighted in red
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]);

  const [gameState, setGameState] = useState<'preview' | 'playing' | 'won'>('preview');
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [roundOffset, setRoundOffset] = useState(0);

  const mismatchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Available unique words in this unit
  const validWords = words.filter(w => w && w.word && w.arabicMeaning);
  const totalRounds = Math.max(1, Math.ceil(validWords.length / 4));
  const currentRoundIndex = Math.min(totalRounds, Math.floor(roundOffset / 4) + 1);

  // Clear any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (mismatchTimeoutRef.current) clearTimeout(mismatchTimeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initialize a round of 4 words (8 cards) in PREVIEW mode:
  // Top row: 4 English cards
  // Bottom row: 4 Arabic cards matching them
  const setupDeck = useCallback((offset: number) => {
    if (validWords.length === 0) return;

    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    // Pick 4 words starting from offset
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
  // "المفروض الاول يبقا ال 8 معمولين على وشهم اول م ادوس start يتقلبوا على ضهرهم و يتشقلبوا"
  const handleStartGame = () => {
    soundEffects.playClick();

    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    // Shuffle the 8 cards thoroughly and flip them face down
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setFlippedIds([]);
    setMatchedVocabIds([]);
    setMismatchedIds([]);
    setMoves(0);
    setSecondsElapsed(0);
    setGameState('playing');
  };

  // Card click handler
  const handleCardClick = (card: MemoryCard) => {
    // In preview state: pronounce English words if tapped
    if (gameState === 'preview') {
      if (card.type === 'en') {
        try {
          speakEnglish(card.text);
        } catch {
          // ignore
        }
      }
      return;
    }

    // In playing mode:
    // If card is already matched, ignore
    if (matchedVocabIds.includes(card.vocabId)) return;

    // If card is already one of the flipped cards, ignore
    if (flippedIds.includes(card.id)) return;

    // If 2 cards are currently flipped and waiting for mismatch flip-back, ignore clicks
    if (flippedIds.length >= 2) return;

    soundEffects.playClick();

    // Pronounce English card if applicable
    if (card.type === 'en') {
      try {
        speakEnglish(card.text);
      } catch {
        // ignore
      }
    }

    // First card flipped
    if (flippedIds.length === 0) {
      setFlippedIds([card.id]);
      return;
    }

    // Second card flipped:
    if (flippedIds.length === 1) {
      const firstCardId = flippedIds[0];
      const firstCard = cards.find(c => c.id === firstCardId);

      if (!firstCard) {
        setFlippedIds([card.id]);
        return;
      }

      setMoves(m => m + 1);
      setFlippedIds([firstCardId, card.id]);

      // Check match: same vocabId and different types ('en' vs 'ar')
      const isMatch = firstCard.vocabId === card.vocabId && firstCard.type !== card.type;

      if (isMatch) {
        // Correct match!
        soundEffects.playCorrect();
        const nextMatched = [...matchedVocabIds, card.vocabId];
        setMatchedVocabIds(nextMatched);
        setFlippedIds([]);

        // Check if all 4 pairs are matched
        if (nextMatched.length === 4) {
          setGameState('won');
          soundEffects.playWin();
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch {
            // fallback
          }
        }
      } else {
        // Mismatch!
        // "لو اختارنا غلط كلهم يتقلبوا تانى بس بدون شقلبة"
        soundEffects.playWrong();
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
    soundEffects.playClick();
    const nextOffset = (roundOffset + 4) >= validWords.length ? 0 : roundOffset + 4;
    setRoundOffset(nextOffset);
    setupDeck(nextOffset);
  };

  // Replay current 4 words
  const handleReplayCurrent = () => {
    soundEffects.playClick();
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

        {/* Start Game Action Banner (prominent, centered) */}
        {gameState === 'preview' && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl p-3 sm:p-4 border border-blue-200/60 dark:border-blue-800/60">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-950 dark:text-blue-200 font-medium">
              <span className="text-2xl animate-bounce">👇</span>
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold sm:inline sm:mr-1">
                  الـ 8 كروت مفتوحة على وشها للحفظ!
                </strong>
                <span>اضغط على الزر ليتم قلب الكروت على ضهرها وشقلبتها لبدء اللعب:</span>
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
              <span>اقلب كارتين لمطابقة الكلمة الإنجليزية بمعناها بالعربي!</span>
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
        First 4 cards: Row 1
        Second 4 cards: Row 2
        Identical aspect ratio so every card has the EXACT same size.
      */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-5">
        {cards.map((card) => {
          const isMatched = matchedVocabIds.includes(card.vocabId);
          // Face up if preview mode, or matched, or currently clicked/flipped
          const isFaceUp = gameState === 'preview' || isMatched || flippedIds.includes(card.id);
          const isMismatched = mismatchedIds.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl transition-all duration-200 select-none cursor-pointer focus:outline-none touch-manipulation active:scale-95 ${
                isMatched ? 'cursor-default opacity-90' : 'hover:scale-[1.02]'
              }`}
            >
              {isFaceUp ? (
                /* 
                  FRONT OF CARD (Face-up):
                  Shows the word, meaning, badge, and match status
                */
                <div
                  className={`w-full h-full rounded-xl sm:rounded-2xl border-2 sm:border-[3px] flex flex-col justify-between p-1.5 sm:p-3 text-center shadow-md transition-all ${
                    isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 dark:border-emerald-400 ring-2 sm:ring-4 ring-emerald-400/40'
                      : isMismatched
                      ? 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 ring-2 ring-rose-400/50 animate-pulse'
                      : gameState === 'preview'
                      ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-700/80 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-blue-500 shadow-md ring-2 ring-blue-300 dark:ring-blue-600'
                  }`}
                >
                  {/* Card Corner Tag & Audio Button */}
                  <div className="w-full flex items-center justify-between leading-none">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(card.text);
                        }}
                        className="p-0.5 sm:p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Pronounce word"
                      >
                        <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    )}
                  </div>

                  {/* Card Center: Text */}
                  <div className="my-auto px-0.5 flex flex-col items-center justify-center">
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
                  <div className="w-full flex justify-center items-center min-h-[14px] sm:min-h-[18px] leading-none">
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
              ) : (
                /* 
                  BACK OF CARD (Face-down):
                  Luxury playing card back design with ER monogram 
                */
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-[3px] border-amber-400/80 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-amber-300 flex flex-col items-center justify-between p-1.5 sm:p-3 shadow-md hover:shadow-lg transition-all">
                  {/* Playing card background texture */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
                      backgroundSize: '10px 10px'
                    }}
                  />

                  {/* Top Suits */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-bold font-mono text-amber-400/80 z-10 leading-none">
                    <span>♠</span>
                    <span>♦</span>
                  </div>

                  {/* Center ER Monogram Seal */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400/90 bg-gradient-to-b from-amber-400/20 to-transparent flex items-center justify-center shadow-inner">
                      <span className="font-en font-black text-amber-300 text-xs sm:text-base tracking-wider">ER</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-amber-200/90 tracking-widest uppercase mt-0.5 sm:mt-1">
                      FLIP
                    </span>
                  </div>

                  {/* Bottom Suits */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-bold font-mono text-amber-400/80 z-10 leading-none">
                    <span>♣</span>
                    <span>♥</span>
                  </div>
                </div>
              )}
            </button>
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
