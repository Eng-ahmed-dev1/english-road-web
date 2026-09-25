import { CheckCircle2, ChevronDown, Sun, Moon, Swords, Printer } from 'lucide-react';
import type { UnitData } from '../types';

interface NavbarProps {
  units: UnitData[];
  currentUnit: UnitData;
  onSelectUnit: (unitId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notification: string | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenExamGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  units,
  currentUnit,
  onSelectUnit,
  activeTab,
  setActiveTab,
  notification,
  isDarkMode,
  onToggleDarkMode,
  onOpenExamGenerator
}) => {
  const practiceTabs = [
    { id: 'match', label: 'Word Match', icon: '⚡' },
    { id: 'spelling', label: 'Spelling Quiz', icon: '🔤' },
    { id: 'collocations', label: 'Collocations', icon: '🔗' },
    { id: 'fill', label: 'Fill in Blanks', icon: '✏️' },
    { id: 'sentences', label: 'Sentence Builder', icon: '🧩' },
    { id: 'quiz', label: 'Definitions Quiz', icon: '📝' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-12">
        {/* Top Header Row - Single Clean Row on all screens */}
        <div className="flex items-center justify-between h-14 sm:h-20 py-2 sm:py-3 gap-2 sm:gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 font-en font-black text-sm sm:text-lg tracking-tight shrink-0">
              ER
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-2xl font-en tracking-tight text-slate-900 dark:text-white block leading-tight">
                English Road
              </span>
              <span className="hidden sm:block text-[11px] text-slate-400 font-medium">
                Interactive Secondary Curriculum Platform
              </span>
            </div>
          </div>

          {/* Controls: Unit Dropdown + Exam Maker Button + Dark Mode Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Unit Selector Dropdown - Clean & Responsive */}
            <div className="relative">
              <select
                value={currentUnit.id}
                onChange={(e) => onSelectUnit(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold rounded-xl pr-7 sm:pr-9 pl-2.5 sm:pl-4 py-1.5 sm:py-2.5 max-w-[130px] xs:max-w-[190px] sm:max-w-[300px] truncate cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-2xs"
              >
                {units.map((u) => (
                  <option 
                    key={u.id} 
                    value={u.id} 
                    disabled={!u.isAvailable}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1.5"
                  >
                    {u.title} {!u.isAvailable ? '(Coming Soon)' : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Teacher's Exam & Worksheet Generator Button */}
            <button
              onClick={onOpenExamGenerator}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 touch-manipulation shrink-0 cursor-pointer"
              title="Create Printable Exam / Worksheet (A4 PDF)"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Exam Maker</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs shrink-0 cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Clean Swipeable Bar on Mobile / Structured on Desktop */}
        <div className="py-1.5 sm:py-2.5 border-t border-slate-200 dark:border-slate-800/90">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none flex-nowrap scroll-smooth text-xs sm:text-sm font-semibold pb-1 lg:pb-0 touch-pan-x [-webkit-overflow-scrolling:touch]">
            {/* Core Study Tabs */}
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap shrink-0 transition-all touch-manipulation cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <span>📖</span>
              <span>Reading Passage</span>
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap shrink-0 transition-all touch-manipulation cursor-pointer ${
                activeTab === 'vocab'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <span>📚</span>
              <span>Vocabulary Bank</span>
            </button>

            {currentUnit.writingLesson && (
              <button
                onClick={() => setActiveTab('writing')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap shrink-0 transition-all touch-manipulation cursor-pointer ${
                  activeTab === 'writing'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                <span>✍️</span>
                <span>{currentUnit.writingLesson.lessonTitle || 'Writing Studio'}</span>
              </button>
            )}

            {/* Separator on wider screens */}
            <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 shrink-0" />

            {/* Practice Tabs */}
            {practiceTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 transition-all touch-manipulation cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}

            {/* Separator on wider screens */}
            <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 shrink-0" />

            {/* Versus Battle Tab */}
            <button
              onClick={() => setActiveTab('versus')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap shrink-0 font-bold transition-all shadow-xs touch-manipulation cursor-pointer ${
                activeTab === 'versus'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm ring-2 ring-amber-400'
                  : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/60'
              }`}
            >
              <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Versus Battle ⚔️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-slate-900 dark:bg-slate-800 text-white px-5 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        </div>
      )}
    </header>
  );
};
