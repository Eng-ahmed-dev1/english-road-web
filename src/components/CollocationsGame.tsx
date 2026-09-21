import { useState, useEffect, useMemo } from 'react';
import {
  Timer,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Link2,
  BookOpen,
  Search,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import type { QuizQuestion, PhraseExpression } from '../types';

interface CollocationsGameProps {
  questions: QuizQuestion[];
  phrases?: PhraseExpression[];
  showPoints?: boolean;
  onAddPoints?: (points: number) => void;
  compactMode?: boolean;
  hasTimer?: boolean;
}

export const CollocationsGame: React.FC<CollocationsGameProps> = ({
  questions,
  phrases = [],
  showPoints = false,
  onAddPoints,
  compactMode = false,
  hasTimer = false
}) => {
  // Navigation mode: 'study' table or 'quiz' interactive challenge
  // Compact mode (Versus Battle) always uses 'quiz' directly
  const [activeSubTab, setActiveSubTab] = useState<'study' | 'quiz'>('study');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'preposition' | 'expression' | 'idiom'>('all');

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  useEffect(() => {
    if (!hasTimer || isFinished || selectedOption !== null || (!compactMode && activeSubTab !== 'quiz')) return;

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
  }, [currentIndex, selectedOption, isFinished, hasTimer, compactMode, activeSubTab]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    if (currentQ && option.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
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

  // Filtered phrases for study view
  const filteredPhrases = useMemo(() => {
    return phrases.filter(item => {
      const matchQuery =
        item.phrase.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.arabicMeaning.includes(searchQuery.trim());
      const matchType = selectedType === 'all' || item.type === selectedType;
      return matchQuery && matchType;
    });
  }, [phrases, searchQuery, selectedType]);

  const getTypeBadge = (type: PhraseExpression['type']) => {
    switch (type) {
      case 'preposition':
        return (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            حرف جر Preposition
          </span>
        );
      case 'expression':
        return (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            تعبير Expression
          </span>
        );
      case 'idiom':
        return (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            مثل / مصطلح Idiom
          </span>
        );
    }
  };

  // 1. Quiz Completion Screen
  if (isFinished) {
    return (
      <div className={compactMode ? 'w-full p-2' : 'max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8'}>
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-blue-200 dark:border-blue-800">
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
            اكتمل تدريب حروف الجر والمتلازمات!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
            تمت مراجعة جميع حروف الجر والتعبيرات الاصطلاحية الـ {questions.length} المقررة بنجاح.
          </p>

          {showPoints && (
            <div className="my-3 sm:my-4 inline-flex items-center gap-3 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400">النتيجة:</span>
              <span className="text-xl sm:text-2xl font-black font-en text-blue-600 dark:text-blue-400">{score} / {questions.length}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>إعادة التدريب</span>
            </button>
            {!compactMode && (
              <button
                onClick={() => {
                  handleRestart();
                  setActiveSubTab('study');
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs sm:text-sm transition-all border border-slate-200 dark:border-slate-700"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>عرض جدول المتلازمات</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Compact Mode for Versus Battle (Only Quiz)
  if (compactMode) {
    return (
      <div className="w-full p-2">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-en">
              {currentIndex + 1} / {questions.length}
            </span>
            {hasTimer && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold font-en ${
                timeLeft < 8
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}>
                <Timer className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h4 className="text-sm sm:text-base font-semibold font-en text-slate-900 dark:text-white leading-relaxed mb-4" dir="ltr">
            {currentQ.question}
          </h4>

          <div className="grid grid-cols-2 gap-2" dir="ltr">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option.toLowerCase() === currentQ.correctAnswer.toLowerCase();
              const showFeedback = selectedOption !== null;

              let buttonStyle = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
              if (showFeedback) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold';
                } else if (isSelected) {
                  buttonStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-300';
                } else {
                  buttonStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-40';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                  className={`p-2.5 rounded-xl border font-en text-xs sm:text-sm flex items-center justify-between transition-colors ${buttonStyle}`}
                >
                  <span className="font-bold">{option}</span>
                  {showFeedback && isCorrectAnswer && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                  {showFeedback && isSelected && !isCorrectAnswer && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800" dir="rtl">
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-en mb-3">
                {currentQ.explanation}
              </p>
              <button
                onClick={handleNext}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1 text-xs"
              >
                <span>{currentIndex + 1 === questions.length ? 'إنهاء' : 'التالي'}</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Normal Full Mode (Teacher & Student Friendly)
  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Top Header & Subtab Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                حروف الجر والمتلازمات اللفظية
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              قائمة وحروف الجر والتعبيرات الاصطلاحية (Collocations, Idioms & Prepositions) المقررة في الوحدة.
            </p>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveSubTab('study')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSubTab === 'study'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>جدول التعبيرات ({phrases.length || 24})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('quiz')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSubTab === 'quiz'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>التدريب التفاعلي ({questions.length})</span>
            </button>
          </div>
        </div>

        {/* Study Mode Filter & Search Bar */}
        {activeSubTab === 'study' && (
          <div className="pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالإنجليزية أو العربية..."
                className="w-full pr-10 pl-4 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
              {(
                [
                  { id: 'all', label: 'الكل' },
                  { id: 'preposition', label: 'حروف جر' },
                  { id: 'expression', label: 'تعبيرات' },
                  { id: 'idiom', label: 'مصطلحات' }
                ] as const
              ).map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all ${
                    selectedType === type.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtab Content: 1. STUDY VIEW */}
      {activeSubTab === 'study' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
              عرض {filteredPhrases.length} من أصل {phrases.length} تعبير ومصطلح
            </span>
            <button
              onClick={() => setActiveSubTab('quiz')}
              className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>بدء اختبار التحدي التفاعلي</span>
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Cards Grid for Prepositions & Collocations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredPhrases.map((item, index) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-en text-xs font-bold text-slate-500">
                      {index + 1}
                    </span>
                    {getTypeBadge(item.type)}
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black font-en text-slate-900 dark:text-white tracking-tight mb-1 sm:mb-2" dir="ltr">
                    {item.phrase}
                  </h3>
                </div>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-sm sm:text-lg font-black text-blue-600 dark:text-blue-400">
                    {item.arabicMeaning}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPhrases.length === 0 && (
            <div className="text-center py-12 sm:py-16 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-base font-bold">
                لم يتم العثور على أي تعبير يطابق بحثك.
              </p>
            </div>
          )}

          {/* Bottom Banner to Start Quiz */}
          <div className="bg-gradient-to-l from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-md shadow-blue-500/10 mt-6 sm:mt-8">
            <div>
              <h3 className="text-lg sm:text-2xl font-black mb-1">
                هل أنت جاهز لاختبار فهمك لحروف الجر؟
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                تدرب على أسئلة الاختيار من متعدد مطابقة لنمط امتحانات الثانوية العامة مع شروحات فورية.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('quiz')}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-blue-700 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base shadow-sm hover:bg-blue-50 transition-all shrink-0 active:scale-95 touch-manipulation text-center"
            >
              بدء التدريب التفاعلي الآن
            </button>
          </div>
        </div>
      )}

      {/* Subtab Content: 2. QUIZ VIEW */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Progress Header */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 font-en">
                  سؤال {currentIndex + 1} من {questions.length}
                </span>
                <button
                  onClick={() => setActiveSubTab('study')}
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-bold px-1.5 py-1"
                >
                  العودة للجدول
                </button>
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
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-2 sm:mb-3 uppercase tracking-wider">اختر التعبير أو حرف الجر الصحيح:</span>
            <h3 className="text-base sm:text-2xl lg:text-3xl font-bold font-en text-slate-900 dark:text-white leading-relaxed mb-6 sm:mb-8" dir="ltr">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4" dir="ltr">
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
                    className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 font-en text-sm sm:text-xl font-bold flex items-center justify-between transition-all min-h-[50px] sm:min-h-[64px] active:scale-[0.98] touch-manipulation shadow-2xs ${buttonStyle}`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs sm:text-base font-black text-slate-600 dark:text-slate-300 shadow-2xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-bold font-en text-sm sm:text-xl">{option}</span>
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
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800" dir="rtl">
                <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                    💡 القاعدة والتوضيح:
                  </span>
                  <p className="text-xs sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 font-en leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-lg shadow-md active:scale-95 touch-manipulation min-h-[46px] sm:min-h-[54px]"
                >
                  <span>{currentIndex + 1 === questions.length ? 'إنهاء التدريب' : 'السؤال التالي'}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
