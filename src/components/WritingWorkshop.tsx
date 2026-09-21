import { useState, useMemo } from 'react';
import {
  PenTool,
  BookOpen,
  CheckCircle2,
  CheckCircle,
  XCircle,
  Sparkles,
  Lightbulb,
  Copy,
  RotateCcw,
  Eye,
  EyeOff,
  HelpCircle,
  Award
} from 'lucide-react';
import type { WritingData } from '../types';
import { DiaryActivities } from './DiaryActivities';
import { PoemActivities } from './PoemActivities';
import { BiographyActivities } from './BiographyActivities';

interface WritingWorkshopProps {
  writingData: WritingData;
}

export const WritingWorkshop: React.FC<WritingWorkshopProps> = ({ writingData }) => {
  const isDiaryLesson = writingData.lessonTitle.toLowerCase().includes('diary');
  const isPoemLesson = writingData.lessonTitle.toLowerCase().includes('poem');
  const isBiographyLesson = writingData.lessonTitle.toLowerCase().includes('biography');
  const hasSpecialActivities = isDiaryLesson || isPoemLesson || isBiographyLesson;
  const [activeTab, setActiveTab] = useState<'structure' | 'practice' | 'activities' | 'task'>('structure');

  // MCQ State
  const [mcqIndex, setMcqIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqFinished, setMcqFinished] = useState(false);

  // Practical Task State
  const [selectedTopicId, setSelectedTopicId] = useState(writingData.task.suggestedTopics[0]?.id || '');
  const [headline, setHeadline] = useState('');
  const [intro, setIntro] = useState('');
  const [body, setBody] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  // Word count computation
  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const totalWords = useMemo(() => {
    return countWords(headline) + countWords(intro) + countWords(body) + countWords(conclusion);
  }, [headline, intro, body, conclusion]);

  const currentQ = writingData.examQuestions[mcqIndex] || writingData.examQuestions[0];

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === currentQ.correctAnswer) {
      setMcqScore(s => s + 1);
    }
  };

  const handleNextMCQ = () => {
    setSelectedOption(null);
    if (mcqIndex + 1 < writingData.examQuestions.length) {
      setMcqIndex(prev => prev + 1);
    } else {
      setMcqFinished(true);
    }
  };

  const handleRestartMCQ = () => {
    setMcqIndex(0);
    setSelectedOption(null);
    setMcqScore(0);
    setMcqFinished(false);
  };

  const handleCopyBlogPost = () => {
    const fullPost = `Title: ${headline}\n\n${intro}\n\n${body}\n\n${conclusion}`;
    navigator.clipboard.writeText(fullPost.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearTask = () => {
    setHeadline('');
    setIntro('');
    setBody('');
    setConclusion('');
  };

  const currentTopic = writingData.task.suggestedTopics.find(t => t.id === selectedTopicId) || writingData.task.suggestedTopics[0];

  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-4 sm:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs shrink-0">
              <PenTool className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] sm:text-sm font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-en">
                  Lesson {writingData.lessonNumber} • Writing Skills
                </span>
              </div>
              <h2 className="text-xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {writingData.lessonTitleArabic}
              </h2>
              <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 font-en">
                {writingData.lessonTitle} • Structure, Exam Practice & Practical Workshop
              </p>
            </div>
          </div>

          {/* Nav Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 w-full md:w-auto overflow-x-auto scrollbar-none gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab('structure')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                activeTab === 'structure'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>هيكل الكتابة</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                activeTab === 'practice'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>أسئلة الامتحانات ({writingData.examQuestions.length})</span>
            </button>

            {hasSpecialActivities && (
              <button
                onClick={() => setActiveTab('activities')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                  activeTab === 'activities'
                    ? isPoemLesson
                      ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs ring-1 ring-rose-500/30'
                      : isBiographyLesson
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs ring-1 ring-indigo-500/30'
                        : 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs ring-1 ring-teal-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPoemLesson ? 'text-rose-500' : isBiographyLesson ? 'text-indigo-500' : 'text-teal-500'}`} />
                <span>{isPoemLesson ? 'استوديو نظم الشعر' : isBiographyLesson ? 'استوديو السيرة الذاتية' : 'أنشطة الكتاب (5 أنشطة)'}</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('task')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                activeTab === 'task'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>التاسك التطبيقي</span>
            </button>
          </div>
        </div>

        {/* Definition Bar from Image */}
        <div className="mt-6 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <p className="text-xs sm:text-base text-slate-700 dark:text-slate-200 font-medium">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 font-en">Writing Tip: </span>
              {writingData.definitionArabic}
            </p>
          </div>
          <span className="text-xs font-en font-bold text-slate-500 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
            3rd Secondary Exam Skill
          </span>
        </div>
      </div>

      {/* TAB 1: STRUCTURE & CHARACTERISTICS */}
      {activeTab === 'structure' && (
        <div className="space-y-8">
          {/* Characteristics Grid */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>الخصائص والمواصفات الأساسية ({writingData.lessonTitle})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {writingData.characteristics.map((char, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 font-en">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-en text-slate-900 dark:text-white mb-1">
                      {char.en.split(':')[0]}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-1 leading-relaxed">
                      {char.ar}
                    </p>
                    <p className="text-[11px] text-slate-400 font-en">
                      {char.en.split(':')[1] || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structure Steps */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>هيكل وخطوات الكتابة خطوة بخطوة ({writingData.lessonTitle})</span>
            </h3>

            <div className="space-y-4">
              {writingData.structureSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-en font-black text-sm">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold font-en text-slate-900 dark:text-white">
                          {step.partName}
                        </h4>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                          {step.partNameArabic}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">الهدف (Purpose): </span>
                      {step.purposeArabic}
                    </div>
                  </div>

                  {/* Examples from Textbook */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 block mb-1.5">أمثلة تطبيقية من كتاب الوزارة:</span>
                    {step.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-en text-slate-800 dark:text-slate-200 leading-relaxed"
                        dir="ltr"
                      >
                        {ex}
                      </div>
                    ))}
                  </div>

                  {step.tips && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span>{step.tips}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA to start task */}
          <div className="bg-gradient-to-l from-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-indigo-500/10">
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-1">
                جاهز لتطبيق ما تعلمته في كتابة {writingData.lessonTitleArabic || 'موضوعك'}؟
              </h4>
              <p className="text-xs sm:text-sm text-indigo-100">
                انتقل الآن إلى ورشة العمل التفاعلية وجرب الكتابة والتطبيق العملي مع عداد الكلمات ونموذج الإجابة الاسترشادي.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('task')}
              className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-indigo-50 transition-all shrink-0"
            >
              بدء التاسك التطبيقي الآن
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: EXAM MCQ PRACTICE */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {mcqFinished ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xs text-center max-w-xl mx-auto">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-200 dark:border-indigo-800">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                اكتمل تدريب أسئلة مهارات الكتابة!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                أحسنت! أصبحت مطلعاً على نمط أسئلة امتحانات الثانوية العامة في مهارات الكتابة ({writingData.lessonTitle}).
              </p>

              <div className="my-4 inline-flex items-center gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">النتيجة:</span>
                <span className="text-2xl font-black font-en text-indigo-600 dark:text-indigo-400">
                  {mcqScore} / {writingData.examQuestions.length}
                </span>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={handleRestartMCQ}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الأسئلة</span>
                </button>
                <button
                  onClick={() => setActiveTab('task')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs sm:text-sm transition-all"
                >
                  <span>الانتقال للتاسك العملي</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Header */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-en">
                    سؤال {mcqIndex + 1} من {writingData.examQuestions.length}
                  </span>
                  <span className="text-xs text-slate-400">نماذج أسئلة الثانوية العامة (MCQ)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full transition-all duration-300"
                    style={{ width: `${((mcqIndex + 1) / writingData.examQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-2 sm:mb-3 uppercase tracking-wider">اختر الإجابة الصحيحة طبقاً للمنهج:</span>
                <h3 className="text-base sm:text-2xl lg:text-3xl font-bold font-en text-slate-900 dark:text-white leading-relaxed mb-6 sm:mb-8" dir="ltr">
                  {currentQ.question}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4" dir="ltr">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQ.correctAnswer;
                    const showFeedback = selectedOption !== null;

                    let btnStyle = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white';
                    if (showFeedback) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-black ring-2 ring-emerald-400';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-300 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={showFeedback}
                        className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 font-en text-sm sm:text-lg lg:text-xl font-bold flex items-center justify-between transition-all text-left min-h-[50px] sm:min-h-[64px] active:scale-[0.98] touch-manipulation shadow-2xs ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs sm:text-base font-black text-slate-600 dark:text-slate-300 shrink-0 shadow-2xs">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="font-semibold">{option}</span>
                        </div>
                        {showFeedback && isCorrect && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 dark:text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {selectedOption !== null && (
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl mb-4 sm:mb-6" dir="rtl">
                      <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                        💡 توضيح الإجابة الصحيحة:
                      </span>
                      <p className="text-xs sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 font-en leading-relaxed" dir="ltr">
                        {currentQ.explanation}
                      </p>
                    </div>

                    <button
                      onClick={handleNextMCQ}
                      className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-lg shadow-md active:scale-95 touch-manipulation min-h-[46px] sm:min-h-[54px]"
                    >
                      <span>{mcqIndex + 1 === writingData.examQuestions.length ? 'عرض النتيجة' : 'السؤال التالي'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: TEXTBOOK DIARY / POEM / BIOGRAPHY ACTIVITIES */}
      {activeTab === 'activities' && isDiaryLesson && (
        <DiaryActivities />
      )}
      {activeTab === 'activities' && isPoemLesson && (
        <PoemActivities />
      )}
      {activeTab === 'activities' && isBiographyLesson && (
        <BiographyActivities />
      )}

      {/* TAB 3: PRACTICAL INTERACTIVE WRITING TASK */}
      {activeTab === 'task' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Task Instructions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 mb-4 sm:mb-6">
              <div>
                <span className="text-[11px] sm:text-sm font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-1.5 sm:mb-2 inline-block">
                  تاسك تطبيقي عملي
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {writingData.task.titleArabic}
                </h3>
              </div>

              {/* Word Count Live Badge */}
              <div className={`px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl border flex items-center gap-2 text-xs sm:text-sm font-bold font-en ${
                totalWords >= writingData.task.minWords
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}>
                <span>{totalWords} / {writingData.task.minWords} words</span>
                {totalWords >= writingData.task.minWords && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />}
              </div>
            </div>

            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-5 leading-relaxed">
              {writingData.task.promptArabic}
            </p>

            {/* Suggested Topic Buttons */}
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 block mb-2 sm:mb-3">اختر موضوعاً للكتابة:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {writingData.task.suggestedTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-right transition-all flex flex-col justify-between touch-manipulation min-h-[75px] sm:min-h-[85px] ${
                      selectedTopicId === topic.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-md ring-2 ring-indigo-200 dark:ring-indigo-900'
                        : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-xs sm:text-base font-black text-slate-900 dark:text-white mb-1">
                      {topic.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                      {topic.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Blog Post Editor */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 sm:space-y-6">
            {currentTopic && (
              <div className="pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1.5 sm:gap-2">
                <span className="text-slate-500">الموضوع المختار: <strong className="text-indigo-600 dark:text-indigo-400 text-xs sm:text-base">{currentTopic.title}</strong></span>
                <span className="text-[11px] sm:text-xs text-slate-400">{currentTopic.hint}</span>
              </div>
            )}

            {/* Step 1: Headline */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="text-xs sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-en font-black">1</span>
                  <span>العنوان الجذاب (Catchy Title / Headline):</span>
                </label>
                <span className="text-[11px] sm:text-xs text-slate-400 font-en font-bold">{countWords(headline)} words</span>
              </div>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g.: 5 Secrets of Hospital Nurses You Never Knew!"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-en text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Step 2: Introduction & Hook */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="text-xs sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-en font-black">2</span>
                  <span>المقدمة والخاطف (Introduction & Hook):</span>
                </label>
                <span className="text-[11px] sm:text-xs text-slate-400 font-en font-bold">{countWords(intro)} words</span>
              </div>
              <textarea
                rows={2}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="e.g.: Have you ever wondered what happens behind the closed doors of an emergency room? Today, I want to share..."
                className="w-full p-3 sm:p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-en text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 resize-y leading-relaxed"
                dir="ltr"
              />
            </div>

            {/* Step 3: Main Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="text-xs sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-en font-black">3</span>
                  <span>صلب التدوينة والتفاصيل (Main Body):</span>
                </label>
                <span className="text-[11px] sm:text-xs text-slate-400 font-en font-bold">{countWords(body)} words</span>
              </div>
              <textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="e.g.: During my visit, I witnessed incredible teamwork. Paramedics rushed in with injured patients, while doctors and nurses remained calm under pressure..."
                className="w-full p-3 sm:p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-en text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 resize-y leading-relaxed"
                dir="ltr"
              />
            </div>

            {/* Step 4: Conclusion */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="text-xs sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-en font-black">4</span>
                  <span>الخاتمة وسؤال التفاعل (Conclusion & Question):</span>
                </label>
                <span className="text-[11px] sm:text-xs text-slate-400 font-en font-bold">{countWords(conclusion)} words</span>
              </div>
              <textarea
                rows={2}
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                placeholder="e.g.: Overall, it was an eye-opening experience. What do you admire most about healthcare workers? Let me know in the comments below!"
                className="w-full p-3 sm:p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-en text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 resize-y leading-relaxed"
                dir="ltr"
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={handleCopyBlogPost}
                  disabled={totalWords === 0}
                  className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl sm:rounded-2xl text-xs sm:text-base transition-all shadow-md active:scale-95 touch-manipulation min-h-[44px] sm:min-h-[50px]"
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ النص كاملاً'}</span>
                </button>

                <button
                  onClick={handleClearTask}
                  disabled={totalWords === 0}
                  className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors active:scale-95 touch-manipulation"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>تفريغ الحقول</span>
                </button>
              </div>

              {/* Toggle Model Answer */}
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl sm:rounded-2xl text-xs sm:text-base transition-all border border-slate-200 dark:border-slate-700 active:scale-95 touch-manipulation min-h-[44px] sm:min-h-[50px]"
              >
                {showModelAnswer ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span>{showModelAnswer ? 'إخفاء النموذج المثالي' : 'عرض النموذج المثالي الإرشادي'}</span>
              </button>
            </div>
          </div>

          {/* Model Answer Preview Card */}
          {showModelAnswer && (
            <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/70 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 dark:border-indigo-800 shadow-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-200 dark:border-indigo-800 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    النموذج الإرشادي المثالي (Model Answer)
                  </h4>
                </div>
                <span className="text-[11px] font-en font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  Full Score Example
                </span>
              </div>

              <div className="space-y-4 font-en text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed" dir="ltr">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Headline:</span>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    {writingData.task.modelBlogPost.headline}
                  </h3>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Introduction (Hook):</span>
                  <p>{writingData.task.modelBlogPost.intro}</p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Main Body:</span>
                  {writingData.task.modelBlogPost.body.map((para, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">{para}</p>
                  ))}
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Conclusion & Question:</span>
                  <p>{writingData.task.modelBlogPost.conclusion}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-200 dark:border-indigo-800 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">تحليل النموذج: </span>
                {writingData.task.modelBlogPost.arabicTranslation}
              </div>
            </div>
          )}

          {/* Self-Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>قائمة التحقق الذاتي قبل التسليم (Checklist):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {writingData.task.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-en">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
