import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Copy,
  HelpCircle,
  Quote,
  Layers,
  FileText
} from 'lucide-react';

export const BiographyActivities: React.FC = () => {
  // Timeline milestone selector
  const [activeMilestone, setActiveMilestone] = useState<'1911' | 'univ' | '1952' | 'trilogy' | '1988' | '2006'>('1911');

  // Flashcards state
  const [revealedCard, setRevealedCard] = useState<number | null>(null);

  // 4 Core Questions Tab
  const [activeQuestionTab, setActiveQuestionTab] = useState<'who' | 'when_where' | 'what' | 'why'>('who');

  // Guided Biography Composer State
  const [personName, setPersonName] = useState('Naguib Mahfouz');
  const [introText, setIntroText] = useState('Naguib Mahfouz is an Egyptian writer, born in Cairo in 1911.');
  const [earlyLifeText, setEarlyLifeText] = useState('He studied philosophy at Cairo University and developed a deep interest in literature.');
  const [achievementsText, setAchievementsText] = useState('In 1952, he started writing novels about Egyptian society. His most famous work is the Cairo Trilogy. In 1988, he won the Nobel Prize for Literature, the first Arab writer to receive it.');
  const [laterLifeText, setLaterLifeText] = useState('He died in 2006, but his books are still read around the world.');
  const [copiedBio, setCopiedBio] = useState(false);

  const handleCopyBio = () => {
    const full = `${personName}\n\n${introText}\n\n${earlyLifeText}\n\n${achievementsText}\n\n${laterLifeText}`.trim();
    if (!full) return;
    navigator.clipboard.writeText(full);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const handleLoadNaguibMahfouz = () => {
    setPersonName('Naguib Mahfouz');
    setIntroText('Naguib Mahfouz is an Egyptian writer, born in Cairo in 1911.');
    setEarlyLifeText('He studied philosophy at Cairo University and developed a deep interest in literature.');
    setAchievementsText('In 1952, he started writing novels about Egyptian society. His most famous work is the Cairo Trilogy. In 1988, he won the Nobel Prize for Literature, the first Arab writer to receive it.');
    setLaterLifeText('He died in 2006, but his books are still read around the world.');
  };

  const handleLoadAhmedZewail = () => {
    setPersonName('Dr. Ahmed Zewail');
    setIntroText('Dr. Ahmed Zewail was a world-renowned Egyptian-American chemist and Nobel laureate.');
    setEarlyLifeText('He was born in Damanhour in 1946 and graduated from the Faculty of Science at Alexandria University with top honors.');
    setAchievementsText('In 1999, he was awarded the Nobel Prize in Chemistry for developing femtochemistry, using ultrafast lasers to photograph chemical reactions in real time.');
    setLaterLifeText('He passed away in 2016, leaving an extraordinary legacy including Zewail City of Science and Technology in Egypt.');
  };

  const handleLoadMagdiYacoub = () => {
    setPersonName('Sir Magdi Yacoub');
    setIntroText('Dr. Magdi Yacoub is a legendary Egyptian-British cardiothoracic surgeon celebrated globally for pioneering heart transplantation.');
    setEarlyLifeText('He was born in Bilbeis, Sharqia, in 1935 and graduated from the Faculty of Medicine at Cairo University in 1957.');
    setAchievementsText('During his career, he performed thousands of groundbreaking heart transplants and founded the international charity Chain of Hope to treat vulnerable children.');
    setLaterLifeText('Today, through the Aswan Heart Centre, his humanitarian dedication continues to provide free first-class cardiac care to thousands of patients.');
  };

  const milestonesData = {
    '1911': {
      year: '1911',
      title: 'Birth in Cairo (الميلاد والنشأة)',
      snippet: 'Naguib Mahfouz is an Egyptian writer, born in Cairo in 1911.',
      detail: 'ولد نجيب محفوظ في حي الجمالية العريق بالقاهرة في 11 ديسمبر 1911، وكان لأزقة القاهرة القديمة أثر عميق في بناء عوالمه الروائية.'
    },
    'univ': {
      year: 'Education',
      title: 'Philosophy at Cairo University (التعليم الجامعي)',
      snippet: 'He studied philosophy at Cairo University.',
      detail: 'التحق بجامعة القاهرة عام 1930 ودرس الفلسفة، مما منحه رؤية فكرية وأخلاقية عميقة انعكست على جميع شخصياته وأعماله الأدبية.'
    },
    '1952': {
      year: '1952',
      title: 'Novels About Egyptian Society (الانطلاقة الروائية)',
      snippet: 'In 1952, he started writing novels about Egyptian society.',
      detail: 'بدأ مرحلة الواقعية الاجتماعية عام 1952، مصوراً التحولات التاريخية والاجتماعية التي مر بها الشعب المصري بدقة مذهلة.'
    },
    'trilogy': {
      year: 'Masterpiece',
      title: 'The Cairo Trilogy (ثلاثية القاهرة الخالدة)',
      snippet: 'His most famous work is the Cairo Trilogy.',
      detail: 'تعد "ثلاثية القاهرة" (بين القصرين، قصر الشوق، السكرية) أعظم أعماله، وتتناول مسيرة أجيال عائلة السيد أحمد عبد الجواد عبر عقود.'
    },
    '1988': {
      year: '1988',
      title: 'Nobel Prize for Literature (جائزة نوبل العالمية)',
      snippet: 'In 1988, he won the Nobel Prize for Literature, the first Arab writer to receive it.',
      detail: 'أصبح أول أديب عربي ينال جائزة نوبل في الأدب، تقديراً لأعماله التي شكلت فناً سردياً عربياً يتمتع بقيمة إنسانية عالمية.'
    },
    '2006': {
      year: '2006',
      title: 'Death & Enduring Legacy (الوفاة والتراث الخالد)',
      snippet: 'He died in 2006, but his books are still read around the world.',
      detail: 'توفي في 30 أغسطس 2006 عن عمر يناهز 94 عاماً، وما زالت مؤلفاته المترجمة إلى عشرات اللغات تُقرأ وتُدرس في مختلف أنحاء العالم.'
    }
  };

  const flashcards = [
    {
      q: 'When and where was Naguib Mahfouz born?',
      a: 'He was born in Cairo in 1911.',
      ar: 'متى وأين وُلد نجيب محفوظ؟ -> ولد في القاهرة عام 1911.'
    },
    {
      q: 'What subject did he study at Cairo University?',
      a: 'He studied philosophy at Cairo University.',
      ar: 'ما المادة التي درسها بجامعة القاهرة؟ -> درس الفلسفة.'
    },
    {
      q: 'What significant event happened in 1952?',
      a: 'In 1952, he started writing novels about Egyptian society.',
      ar: 'ما الحدث الهام عام 1952؟ -> بدأ في كتابة روايات عن المجتمع المصري.'
    },
    {
      q: 'What is recognized as his most famous literary work?',
      a: 'His most famous work is the Cairo Trilogy.',
      ar: 'ما هو أشهر أعماله الأدبية؟ -> ثلاثية القاهرة (The Cairo Trilogy).'
    },
    {
      q: 'Why is 1988 a historic landmark in Arab literature?',
      a: 'In 1988, he won the Nobel Prize for Literature, becoming the first Arab writer to receive it.',
      ar: 'لماذا يعد عام 1988 محطة تاريخية؟ -> نال جائزة نوبل في الأدب كأول كاتب عربي يفوز بها.'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>أنشطة كتاب الوزارة الرسمية • صفحة 89 (Lesson 5: Writing a Biography)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              استوديو كتابة السيرة الذاتية التفاعلي (Biography Workshop Studio)
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm mt-1 max-w-2xl">
              تعلم أصول كتابة السير الذاتية للشخصيات الخالدة: الهيكل الخماسي، الأسئلة الأربعة المحورية، الخط الزمني لنجيب محفوظ، ومحرر السيرة الذاتية الذكي!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-xs text-indigo-100 block">الهيكل المعتمد</span>
            <span className="text-2xl font-black font-en">5 مراحل</span>
          </div>
        </div>
      </div>

      {/* ACTIVITY 1: Naguib Mahfouz Model Biography & Timeline Explorer */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
              1
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                نموذج السيرة الذاتية لنجيب محفوظ والخط الزمني (Model Biography Timeline)
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                كتاب الوزارة صفحة 89 • انقر على المحطات الزمنية لاستكشاف مسيرة أديب نوبل
              </span>
            </div>
          </div>
        </div>

        {/* The Model Text Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50 mb-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-teal-800 dark:text-teal-300 mb-3">
            <Quote className="w-4 h-4 text-teal-600" />
            <span>Official Model Biography (Page 89) • نص السيرة الذاتية الرسمي</span>
          </div>
          <p className="font-en text-base sm:text-lg text-slate-900 dark:text-white leading-relaxed font-semibold">
            “Naguib Mahfouz is an Egyptian writer, born in Cairo in 1911. He studied philosophy at Cairo University. In 1952, he started writing novels about Egyptian society. His most famous work is the Cairo Trilogy. In 1988, he won the Nobel Prize for Literature, the first Arab writer to receive it. He died in 2006, but his books are still read around the world.”
          </p>
        </div>

        {/* Milestone Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {(['1911', 'univ', '1952', 'trilogy', '1988', '2006'] as const).map(key => (
            <button
              key={key}
              onClick={() => setActiveMilestone(key)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMilestone === key
                  ? 'bg-teal-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/50'
              }`}
            >
              {milestonesData[key].year}
            </button>
          ))}
        </div>

        {/* Active Milestone Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <h5 className="text-base font-black text-slate-900 dark:text-white">
              {milestonesData[activeMilestone].title}
            </h5>
          </div>
          <blockquote className="font-en text-sm sm:text-base font-bold text-teal-700 dark:text-teal-300 mb-2 italic">
            "{milestonesData[activeMilestone].snippet}"
          </blockquote>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-ar">
            💡 {milestonesData[activeMilestone].detail}
          </p>
        </div>

        {/* Interactive Q&A Flashcards */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-4">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>Textbook Reading Comprehension Questions • أسئلة الفهم على النموذج (ص 89)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {flashcards.map((fc, idx) => {
              const isOpen = revealedCard === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setRevealedCard(isOpen ? null : idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none active:scale-98 ${
                    isOpen
                      ? 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 font-en">Q{idx + 1}</span>
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                      {isOpen ? 'إخفاء الإجابة ▲' : 'انقر لكشف الإجابة ▼'}
                    </span>
                  </div>
                  <p className="font-en font-bold text-sm text-slate-900 dark:text-white mb-2">
                    {fc.q}
                  </p>
                  {isOpen ? (
                    <div className="pt-2 border-t border-teal-200 dark:border-teal-800/60 animate-in fade-in duration-200">
                      <p className="font-en font-bold text-sm text-teal-800 dark:text-teal-200 mb-1">
                        ✓ {fc.a}
                      </p>
                      <p className="font-ar text-xs text-slate-600 dark:text-slate-400">
                        {fc.ar}
                      </p>
                    </div>
                  ) : (
                    <p className="font-ar text-xs text-slate-500">
                      انقر لرؤية الإجابة النموذجية من النص...
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ACTIVITY 2: The 4 Core Questions of a Biography */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            2
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              الأسئلة الأربعة الذهبية للسيرة الذاتية (The 4 Core Questions)
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              كتاب الوزارة صفحة 89: كل سيرة ذاتية ناجحة تجيب عن هذه الأسئلة الأربعة
            </span>
          </div>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveQuestionTab('who')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border text-center ${
              activeQuestionTab === 'who'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            1. Who? (مَن؟)
          </button>
          <button
            onClick={() => setActiveQuestionTab('when_where')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border text-center ${
              activeQuestionTab === 'when_where'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            2. When & Where? (متى وأين؟)
          </button>
          <button
            onClick={() => setActiveQuestionTab('what')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border text-center ${
              activeQuestionTab === 'what'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            3. What? (ماذا أنجز؟)
          </button>
          <button
            onClick={() => setActiveQuestionTab('why')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border text-center ${
              activeQuestionTab === 'why'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            4. Why important? (سر الأهمية)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50">
          {activeQuestionTab === 'who' && (
            <div className="space-y-3">
              <h5 className="font-black text-lg text-indigo-950 dark:text-indigo-200">
                • Who? (Basic Information: Name, Birth, Death if Relevant)
              </h5>
              <p className="font-ar text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                يقدم الكاتب في السطر الأول الاسم الكامل للشخصية، مجال شهرتها، وجنسيتها، وما إذا كانت على قيد الحياة أم رحلت.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-en font-semibold text-slate-800 dark:text-slate-200">
                Example: “Naguib Mahfouz is an Egyptian writer, born in Cairo in 1911.”
              </div>
            </div>
          )}

          {activeQuestionTab === 'when_where' && (
            <div className="space-y-3">
              <h5 className="font-black text-lg text-indigo-950 dark:text-indigo-200">
                • When and Where? (Date & Place of Birth, Childhood, Education)
              </h5>
              <p className="font-ar text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                تحديد زمان ومكان المولد والنشأة الأسرية والجامعة التي تخرج فيها والتخصص الذي درسه.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-en font-semibold text-slate-800 dark:text-slate-200">
                Example: “He studied philosophy at Cairo University.”
              </div>
            </div>
          )}

          {activeQuestionTab === 'what' && (
            <div className="space-y-3">
              <h5 className="font-black text-lg text-indigo-950 dark:text-indigo-200">
                • What? (Important Events, Achievements, Difficulties)
              </h5>
              <p className="font-ar text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                سرد المحطات الكبرى والإنجازات الفارقة في مسيرته، والجوائز المرموقة، والتحديات التي تغلب عليها.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-en font-semibold text-slate-800 dark:text-slate-200">
                Example: “In 1952, he started writing novels... His most famous work is the Cairo Trilogy. In 1988, he won the Nobel Prize for Literature.”
              </div>
            </div>
          )}

          {activeQuestionTab === 'why' && (
            <div className="space-y-3">
              <h5 className="font-black text-lg text-indigo-950 dark:text-indigo-200">
                • Why Are They Important? (Their Influence & Enduring Legacy)
              </h5>
              <p className="font-ar text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                بيان أثرهم الباقي في المجتمع والعالم، ولماذا خلد التاريخ ذكراهم، وكيف تلهم أعمالهم الأجيال الحالية والقادمة.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-en font-semibold text-slate-800 dark:text-slate-200">
                Example: “He died in 2006, but his books are still read around the world.”
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ACTIVITY 3: Language Focus Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            3
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              القواعد اللغوية المميزة للسيرة الذاتية (Language Focus & Verbs)
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              قواعد صفحة 89: أفعال الماضي البسيط، أدوات الربط، تعبيرات التواريخ، وضمائر الغائب
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Past Tense */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase">
              <Clock className="w-4 h-4" />
              <span>Past Tense Verbs (زمن الماضي)</span>
            </div>
            <p className="font-en text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              was, were, studied, worked, wrote, won, died
            </p>
            <p className="font-ar text-xs text-slate-600 dark:text-slate-400">
              تُروى أحداث السيرة الذاتية دائماً بصيغة الماضي البسيط لأنها تسرد وقائع تاريخية تحققت بالفعل.
            </p>
          </div>

          {/* Card 2: Linking Words */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase">
              <Layers className="w-4 h-4" />
              <span>Linking Words (أدوات الربط)</span>
            </div>
            <p className="font-en text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              first, then, later, finally, because, however, although
            </p>
            <p className="font-ar text-xs text-slate-600 dark:text-slate-400">
              تربط بين محطات حياة الشخصية بتسلسل زمني ومنطقي سلس ومترابط.
            </p>
          </div>

          {/* Card 3: Time Expressions & Third Person */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase">
              <Calendar className="w-4 h-4" />
              <span>Time Expressions & 3rd Person</span>
            </div>
            <p className="font-en text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              in 1995, at the age of 20, He / She / They
            </p>
            <p className="font-ar text-xs text-slate-600 dark:text-slate-400">
              تحديد التواريخ الدقيقة واستخدام ضمائر الغائب لأنك تكتب عن قصة شخص آخر.
            </p>
          </div>
        </div>
      </div>

      {/* ACTIVITY 4: Guided Interactive Biography Composer */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
              4
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                مُنظّم ومحرر كتابة السيرة الذاتية الذكي (Biography Composer)
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                قوالب استرشادية جاهزة للشخصيات الملهمة • عاين وانسخ بضغطة زر
              </span>
            </div>
          </div>

          {/* Template loader buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleLoadNaguibMahfouz}
              className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors"
            >
              📚 نجيب محفوظ (ص 89)
            </button>
            <button
              onClick={handleLoadAhmedZewail}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              🔬 د. أحمد زويل
            </button>
            <button
              onClick={handleLoadMagdiYacoub}
              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              ❤️ د. مجدي يعقوب
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                1. Name & Introduction (اسم الشخصية والمقدمة - Who is the person?):
              </label>
              <textarea
                value={introText}
                onChange={e => setIntroText(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-en text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                2. Early Life & Education (النشأة والتعليم الجامعي - When & Where?):
              </label>
              <textarea
                value={earlyLifeText}
                onChange={e => setEarlyLifeText(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-en text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                3. Major Achievements (أبرز الإنجازات والجوائز - What did they achieve?):
              </label>
              <textarea
                value={achievementsText}
                onChange={e => setAchievementsText(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-en text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                4. Later Life & Enduring Legacy (المرحلة المتأخرة والأثر الباقي):
              </label>
              <textarea
                value={laterLifeText}
                onChange={e => setLaterLifeText(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-en text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>
          </div>

          {/* Live Preview & Action Box */}
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 dark:from-slate-800/80 dark:to-teal-950/20 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">
                    Live Biography Preview • المعاينة الفورية
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-en">
                  {personName}
                </span>
              </div>

              <div className="space-y-3 font-en text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-white">
                  {introText}
                </p>
                <p>
                  {earlyLifeText}
                </p>
                <p>
                  {achievementsText}
                </p>
                <p className="italic text-teal-700 dark:text-teal-300 font-semibold">
                  {laterLifeText}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-ar">
                جاهز للطباعة أو المشاركة الصفية
              </span>
              <button
                onClick={handleCopyBio}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  copiedBio
                    ? 'bg-emerald-600 text-white'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {copiedBio ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تم النسخ بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ السيرة الذاتية</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
