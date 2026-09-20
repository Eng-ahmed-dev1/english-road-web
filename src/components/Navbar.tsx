import { CheckCircle2, ChevronDown, Sun, Moon, Swords } from 'lucide-react';
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
}

export const Navbar: React.FC<NavbarProps> = ({
  units,
  currentUnit,
  onSelectUnit,
  activeTab,
  setActiveTab,
  notification,
  isDarkMode,
  onToggleDarkMode
}) => {
  const practiceTabs = [
    { id: 'match', label: 'مطابقة الكلمات', icon: '⚡' },
    { id: 'spelling', label: 'تحدي التهجئة', icon: '🔤' },
    { id: 'collocations', label: 'حروف الجر والمتلازمات', icon: '🔗' },
    { id: 'fill', label: 'إكمال الجمل', icon: '✏️' },
    { id: 'sentences', label: 'ترتيب الجمل', icon: '🧩' },
    { id: 'quiz', label: 'كويز التعريفات', icon: '📝' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Header Row - Bigger, Spacious & Elegant */}
        <div className="flex flex-wrap items-center justify-between min-h-20 py-3 gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 font-en font-black text-lg tracking-tight">
              ER
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl font-en tracking-tight text-slate-900 dark:text-white">
                English Road
              </span>
              <span className="block text-[11px] text-slate-400 font-medium">
                منصة تعليمية شاملة للمنهج المدرسي
              </span>
            </div>
          </div>

          {/* Controls: Unit Dropdown + Dark Mode Toggle */}
          <div className="flex items-center gap-3">
            {/* Unit Selector Dropdown - Bigger & Clearer */}
            <div className="relative">
              <select
                value={currentUnit.id}
                onChange={(e) => onSelectUnit(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold rounded-xl pl-9 pr-4 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-2xs"
              >
                {units.map((u) => (
                  <option 
                    key={u.id} 
                    value={u.id} 
                    disabled={!u.isAvailable}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1.5"
                  >
                    {u.title} {!u.isAvailable ? '(قريباً)' : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
              title={isDarkMode ? 'التبديل إلى الوضع الفاتح (Light Mode)' : 'التبديل إلى الوضع الداكن (Dark Mode)'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Full Width, Flex-Wrap (NO SCROLL!) */}
        <div className="py-3 border-t border-slate-200 dark:border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-semibold">
          {/* Main Lessons & Vocabulary */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'story'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <span>📖</span>
              <span>نص الدرس (Reading)</span>
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'vocab'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-855'
              }`}
            >
              <span>📚</span>
              <span>بنك المفردات الكامل</span>
            </button>

            {currentUnit.writingLesson && (
              <button
                onClick={() => setActiveTab('writing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'writing'
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                <span>✍️</span>
                <span>{currentUnit.writingLesson.lessonTitleArabic || 'مهارات الكتابة (Blog Post)'}</span>
              </button>
            )}
          </div>

          {/* Interactive Practice Games */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/70 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {practiceTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Standout Versus Battle Tab */}
          <div>
            <button
              onClick={() => setActiveTab('versus')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all shadow-xs ${
                activeTab === 'versus'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 ring-2 ring-amber-400'
                  : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/60'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>الوضع التنافسي ⚔️</span>
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
