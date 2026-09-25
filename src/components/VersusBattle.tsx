import { useState } from 'react';
import { Swords, Trophy, Edit3, Check, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordMatchGame } from './WordMatchGame';
import { SpellingGame } from './SpellingGame';
import { SpeedQuiz } from './SpeedQuiz';
import { CollocationsGame } from './CollocationsGame';
import { FillBlankGame } from './FillBlankGame';
import { SentenceBuilderGame } from './SentenceBuilderGame';
import type { UnitData } from '../types';

interface VersusBattleProps {
  unit: UnitData;
}

export type BattleGameType = 'match' | 'spelling' | 'collocations' | 'fill' | 'sentences' | 'quiz';

const BATTLE_GAMES: { id: BattleGameType; title: string; icon: string; description: string; pointsNote: string }[] = [
  {
    id: 'match',
    title: 'Word Match',
    icon: '⚡',
    description: 'Match English words with Arabic meanings with speed and accuracy',
    pointsNote: '+10 pts / pair'
  },
  {
    id: 'spelling',
    title: 'Spelling Challenge',
    icon: '🔤',
    description: 'Arrange scrambled letters in the correct spelling order',
    pointsNote: '+15 pts / word'
  },
  {
    id: 'collocations',
    title: 'Collocations & Prepositions',
    icon: '🔗',
    description: 'Choose the correct preposition or expression',
    pointsNote: '+15 pts / answer'
  },
  {
    id: 'fill',
    title: 'Fill in Blanks',
    icon: '✏️',
    description: 'Select the contextual word completing the sentence',
    pointsNote: '+15 pts / sentence'
  },
  {
    id: 'sentences',
    title: 'Sentence Builder',
    icon: '🧩',
    description: 'Arrange word blocks to assemble correct sentences',
    pointsNote: '+20 pts / sentence'
  },
  {
    id: 'quiz',
    title: 'Definitions Quiz',
    icon: '📝',
    description: 'Identify the word matching the official definition',
    pointsNote: '+20 pts / answer'
  }
];

export const VersusBattle: React.FC<VersusBattleProps> = ({ unit }) => {
  const [teamAName, setTeamAName] = useState('Team A (Falcons)');
  const [teamBName, setTeamBName] = useState('Team B (Stars)');
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  const [isEditingA, setIsEditingA] = useState(false);
  const [isEditingB, setIsEditingB] = useState(false);

  const [teamAGame, setTeamAGame] = useState<BattleGameType | null>(null);
  const [teamBGame, setTeamBGame] = useState<BattleGameType | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [winner, setWinner] = useState<{ name: string; score: number; opponentScore: number; isTie?: boolean } | null>(null);

  const handleStartBattle = () => {
    if (teamAGame && teamBGame) {
      setIsPlaying(true);
    }
  };

  const handleFinishMatch = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    if (teamAScore > teamBScore) {
      setWinner({ name: teamAName, score: teamAScore, opponentScore: teamBScore });
    } else if (teamBScore > teamAScore) {
      setWinner({ name: teamBName, score: teamBScore, opponentScore: teamAScore });
    } else {
      setWinner({ name: 'Tie Game', score: teamAScore, opponentScore: teamBScore, isTie: true });
    }
  };

  const handleReset = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setWinner(null);
    setIsPlaying(false);
    setTeamAGame(null);
    setTeamBGame(null);
  };

  const bothSelected = teamAGame !== null && teamBGame !== null;

  return (
    <div className="max-w-7xl 2xl:max-w-[1650px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Top Scoreboard Bar - Super Visible from the Back of Classroom */}
      <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl mb-4 sm:mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Team A Header */}
          <div className="flex items-center gap-3 sm:gap-5 w-full lg:w-1/3 justify-start">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-blue-600 flex items-center justify-center font-black text-xl sm:text-3xl shadow-lg shadow-blue-500/40 shrink-0 font-en">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingA ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={teamAName}
                      onChange={(e) => setTeamAName(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-xs sm:text-sm px-2.5 py-1 rounded-xl text-white font-bold max-w-[160px]"
                      autoFocus
                    />
                    <button onClick={() => setIsEditingA(false)} className="p-1 text-emerald-400 hover:text-emerald-300">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer" onClick={() => setIsEditingA(true)}>
                    <span className="font-black text-sm sm:text-xl text-blue-300">{teamAName}</span>
                    <Edit3 className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
                  </div>
                )}
              </div>
              <div className="text-3xl sm:text-6xl lg:text-7xl font-black font-en text-white mt-0.5 sm:mt-1 tracking-tight">
                {teamAScore} <span className="text-xs sm:text-sm font-normal text-slate-400">pts</span>
              </div>
            </div>
          </div>

          {/* Center Match Controls */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 text-center w-full lg:w-1/3">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 bg-slate-800 rounded-full border border-slate-700 text-amber-400 text-xs sm:text-sm font-black">
              <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Classroom Arena • 2-Player Versus Battle</span>
            </div>

            {isPlaying && (
              <div className="flex items-center gap-2 sm:gap-3 mt-1">
                <button
                  onClick={handleFinishMatch}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-lg transition-all flex items-center gap-1.5 sm:gap-2 active:scale-95 touch-manipulation min-h-[44px] sm:min-h-[48px]"
                >
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Declare Winner 🏆</span>
                </button>

                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl border border-slate-700 transition-colors active:scale-95 touch-manipulation min-h-[44px] sm:min-h-[48px]"
                  title="Change selected games"
                >
                  Change Games
                </button>
              </div>
            )}
          </div>

          {/* Team B Header */}
          <div className="flex items-center gap-3 sm:gap-5 w-full lg:w-1/3 justify-end text-left lg:text-right">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
                {isEditingB ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={teamBName}
                      onChange={(e) => setTeamBName(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-xs sm:text-sm px-2.5 py-1 rounded-xl text-white font-bold max-w-[160px]"
                      autoFocus
                    />
                    <button onClick={() => setIsEditingB(false)} className="p-1 text-emerald-400 hover:text-emerald-300">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer" onClick={() => setIsEditingB(true)}>
                    <span className="font-black text-sm sm:text-xl text-rose-300">{teamBName}</span>
                    <Edit3 className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
                  </div>
                )}
              </div>
              <div className="text-3xl sm:text-6xl lg:text-7xl font-black font-en text-white mt-0.5 sm:mt-1 tracking-tight">
                {teamBScore} <span className="text-xs sm:text-sm font-normal text-slate-400">pts</span>
              </div>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-rose-600 flex items-center justify-center font-black text-xl sm:text-3xl shadow-lg shadow-rose-500/40 shrink-0 font-en">
              B
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 1: SELECTION PHASE */}
      {!isPlaying && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          {/* Instructions and START Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2">
              Game Selection Stage (6 Interactive Activities)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Choose an activity for each team below, then press START to begin on the whiteboard!
            </p>

            {/* Central START Button - Launcher */}
            <div className="mt-4 sm:mt-6 flex items-center justify-center">
              {bothSelected ? (
                <button
                  onClick={handleStartBattle}
                  className="px-6 py-3.5 sm:px-12 sm:py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-black text-base sm:text-2xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-500/40 animate-pulse hover:scale-105 active:scale-95 transition-all flex items-center gap-2 sm:gap-3.5 tracking-wider font-en touch-manipulation min-h-[50px] sm:min-h-[64px]"
                >
                  <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-white" />
                  <span>START • Begin Battle Now!</span>
                </button>
              ) : (
                <div className="px-5 py-3 sm:px-8 sm:py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-2 sm:gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span>
                    {!teamAGame && !teamBGame
                      ? 'Waiting for both teams to choose their games...'
                      : !teamAGame
                      ? `Waiting for ${teamAName} to choose...`
                      : `Waiting for ${teamBName} to choose...`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Split Screen Selection Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Team A Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-blue-200 dark:border-blue-900/60 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-blue-100 dark:border-blue-900/50 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-600" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Choose game for: <span className="text-blue-600 dark:text-blue-400">{teamAName}</span>
                  </h4>
                </div>
                {teamAGame && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected ✓
                  </span>
                )}
              </div>

              <div className="space-y-2 sm:space-y-2.5 flex-1">
                {BATTLE_GAMES.map((game) => {
                  const isSelected = teamAGame === game.id;

                  return (
                    <div
                      key={game.id}
                      onClick={() => setTeamAGame(game.id)}
                      className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-150 flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-sm ring-2 ring-blue-200 dark:ring-blue-900'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-xl sm:text-2xl">{game.icon}</span>
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {game.title}
                          </h5>
                          <span className="inline-block text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 px-1.5 py-0.2 sm:px-2 rounded-md mt-0.5">
                            {game.pointsNote}
                          </span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team B Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-rose-200 dark:border-rose-900/60 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-rose-100 dark:border-rose-900/50 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-600" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Choose game for: <span className="text-rose-600 dark:text-rose-400">{teamBName}</span>
                  </h4>
                </div>
                {teamBGame && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected ✓
                  </span>
                )}
              </div>

              <div className="space-y-2 sm:space-y-2.5 flex-1">
                {BATTLE_GAMES.map((game) => {
                  const isSelected = teamBGame === game.id;

                  return (
                    <div
                      key={game.id}
                      onClick={() => setTeamBGame(game.id)}
                      className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-150 flex items-center justify-between ${
                        isSelected
                          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 dark:border-rose-500 shadow-sm ring-2 ring-rose-200 dark:ring-rose-900'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-xl sm:text-2xl">{game.icon}</span>
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {game.title}
                          </h5>
                          <span className="inline-block text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-900/40 px-1.5 py-0.2 sm:px-2 rounded-md mt-0.5">
                            {game.pointsNote}
                          </span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: ACTIVE MATCH PLAYING */}
      {isPlaying && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in">
          {/* Team A Arena */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-2 border-blue-200 dark:border-blue-900/60 flex flex-col shadow-xs">
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-blue-100 dark:border-blue-900/50 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="font-bold text-sm sm:text-lg text-blue-900 dark:text-blue-300">
                  {teamAName}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                {BATTLE_GAMES.find(g => g.id === teamAGame)?.title}
              </span>
            </div>

            <div className="flex-1">
              {teamAGame === 'match' && (
                <WordMatchGame
                  words={unit.keyVocabulary}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamAScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
              {teamAGame === 'spelling' && (
                <SpellingGame
                  words={unit.keyVocabulary}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamAScore(s => s + pts)}
                  compactMode={true}
                />
              )}
              {teamAGame === 'collocations' && (
                <CollocationsGame
                  questions={unit.collocationsQuiz}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamAScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
              {teamAGame === 'fill' && (
                <FillBlankGame
                  questions={unit.fillInBlanksQuiz}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamAScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
              {teamAGame === 'sentences' && (
                <SentenceBuilderGame
                  puzzles={unit.sentencePuzzles}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamAScore(s => s + pts)}
                  compactMode={true}
                />
              )}
              {teamAGame === 'quiz' && (
                <SpeedQuiz
                  questions={unit.definitionsQuiz}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamAScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
            </div>
          </div>

          {/* Team B Arena */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-2 border-rose-200 dark:border-rose-900/60 flex flex-col shadow-xs">
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-rose-100 dark:border-rose-900/50 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="font-bold text-sm sm:text-lg text-rose-900 dark:text-rose-300">
                  {teamBName}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                {BATTLE_GAMES.find(g => g.id === teamBGame)?.title}
              </span>
            </div>

            <div className="flex-1">
              {teamBGame === 'match' && (
                <WordMatchGame
                  words={unit.keyVocabulary}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamBScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
              {teamBGame === 'spelling' && (
                <SpellingGame
                  words={unit.keyVocabulary}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamBScore(s => s + pts)}
                  compactMode={true}
                />
              )}
              {teamBGame === 'collocations' && (
                <CollocationsGame
                  questions={unit.collocationsQuiz}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamBScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
              {teamBGame === 'fill' && (
                <FillBlankGame
                  questions={unit.fillInBlanksQuiz}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamBScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
              {teamBGame === 'sentences' && (
                <SentenceBuilderGame
                  puzzles={unit.sentencePuzzles}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamBScore(s => s + pts)}
                  compactMode={true}
                />
              )}
              {teamBGame === 'quiz' && (
                <SpeedQuiz
                  questions={unit.definitionsQuiz}
                  showPoints={true}
                  onAddPoints={(pts) => setTeamBScore(s => s + pts)}
                  compactMode={true}
                  hasTimer={true}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Winner Celebration Modal */}
      {winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 dark:bg-amber-950/60 text-amber-500 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-amber-300 dark:border-amber-700 animate-bounce">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2">
              {winner.isTie ? "It's a Tie! 🤝" : `Congratulations ${winner.name}! 🏆`}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 sm:mb-6">
              Outstanding performance by both teams in mastering unit vocabulary and activities!
            </p>

            <div className="flex items-center justify-center gap-4 sm:gap-6 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 mb-4 sm:mb-6">
              <div>
                <span className="text-[11px] sm:text-xs text-slate-400 block mb-0.5">{teamAName}</span>
                <span className="text-xl sm:text-2xl font-black font-en text-blue-600 dark:text-blue-400">{teamAScore}</span>
              </div>
              <span className="text-slate-400 font-bold text-xs sm:text-base">VS</span>
              <div>
                <span className="text-[11px] sm:text-xs text-slate-400 block mb-0.5">{teamBName}</span>
                <span className="text-xl sm:text-2xl font-black font-en text-rose-600 dark:text-rose-400">{teamBScore}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setWinner(null);
                  handleReset();
                }}
                className="flex-1 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs sm:text-sm transition-all"
              >
                New Match
              </button>

              <button
                onClick={() => setWinner(null)}
                className="flex-1 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all"
              >
                Continue Playing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
