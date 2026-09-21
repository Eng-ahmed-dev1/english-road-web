import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import type { VocabWord } from '../types';

interface VocabListProps {
  keyWords: VocabWord[];
  additionalWords: VocabWord[];
}

export const VocabList: React.FC<VocabListProps> = ({
  keyWords,
  additionalWords
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'key' | 'reading_listening'>('all');

  const allWords = [...keyWords, ...additionalWords];

  const filteredWords = allWords.filter(w => {
    if (activeCategory === 'key' && w.category !== 'key') return false;
    if (activeCategory === 'reading_listening' && w.category !== 'reading_listening') return false;

    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      w.word.toLowerCase().includes(q) ||
      w.arabicMeaning.includes(q) ||
      (w.definition && w.definition.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-8">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-5 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن كلمة بالإنجليزي أو العربي..."
              className="w-full pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl text-xs sm:text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {[
              { id: 'all', label: `الكل (${allWords.length})` },
              { id: 'key', label: `المفردات الرئيسية (${keyWords.length})` },
              { id: 'reading_listening', label: `القراءة والاستماع (${additionalWords.length})` },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all touch-manipulation shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Words Grid - 4 Columns on Large Smartboards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {filteredWords.map(word => {
          return (
            <div
              key={word.id}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-150 flex flex-col justify-between bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2.5 mb-2 sm:mb-2.5">
                  <h3 className="text-lg sm:text-2xl font-black font-en text-slate-950 dark:text-white capitalize tracking-tight">
                    {word.word}
                  </h3>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg font-bold border border-slate-200 dark:border-slate-700 shrink-0">
                    {word.partOfSpeech}
                  </span>
                </div>

                <p className="text-sm sm:text-lg font-black text-blue-600 dark:text-blue-400 mb-1.5 sm:mb-2">
                  {word.arabicMeaning}
                </p>

                {word.definition && (
                  <p className="text-xs sm:text-sm font-en text-slate-600 dark:text-slate-300 italic line-clamp-3 leading-relaxed" dir="ltr">
                    "{word.definition}"
                  </p>
                )}
              </div>

              {word.category === 'key' && (
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 sm:px-2.5 py-0.5 rounded-md font-bold text-[11px] sm:text-xs">
                    مفردات رئيسية (Key Vocab)
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 dark:text-slate-300 text-base">لا توجد كلمات مطابقة للبحث</h4>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">جرّب البحث باسم كلمة أخرى.</p>
        </div>
      )}
    </div>
  );
};
