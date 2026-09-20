import React, { useState } from 'react';
import {
  Music,
  Eye,
  Ear,
  Heart,
  Copy,
  CheckCircle2,
  Feather
} from 'lucide-react';

export const PoemActivities: React.FC = () => {
  // Wordsworth Rhyme Highlighter State
  const [activeRhymePair, setActiveRhymePair] = useState<'pair1' | 'pair2' | 'pair3' | null>('pair1');

  // Short Poem Composer State
  const [line1, setLine1] = useState('Golden flowers,');
  const [line2, setLine2] = useState('Dancing by the lake,');
  const [line3, setLine3] = useState('Whispering trees,');
  const [line4, setLine4] = useState('Clouds above the hills.');
  const [copiedPoem, setCopiedPoem] = useState(false);

  // Sensory helper tab
  const [sensoryTab, setSensoryTab] = useState<'see' | 'hear' | 'feel'>('see');

  const handleCopyPoem = () => {
    const full = `${line1}\n${line2}\n${line3}\n${line4}`.trim();
    if (!full) return;
    navigator.clipboard.writeText(full);
    setCopiedPoem(true);
    setTimeout(() => setCopiedPoem(false), 2000);
  };

  const handleLoadTextbookShortPoem = () => {
    setLine1('Golden flowers,');
    setLine2('Dancing by the lake,');
    setLine3('Whispering trees,');
    setLine4('Clouds above the hills.');
  };

  const handleLoadSpringSong = () => {
    setLine1('Soft spring breeze,');
    setLine2('Blowing light and free,');
    setLine3('Dancing golden petals,');
    setLine4('Underneath the tree.');
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>أنشطة كتاب الوزارة الرسمية • صفحة 78 (Lesson 5: My First Poem)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              استوديو نظم الشعر التفاعلي (Poetry Workshop Studio)
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
              تعلم كيف تنظم قصيدتك الأولى خطوة بخطوة: استكشف روائع وردزورث، معمل التشبيهات والصور الحسية، كاشف القوافي، ومحرر الأسطر القصيرة الموزونة!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-xs text-amber-100 block">خطوات نظم القصيدة</span>
            <span className="text-2xl font-black font-en">5 / 5 خطوات</span>
          </div>
        </div>
      </div>

      {/* ACTIVITY 1: Wordsworth Excerpt & Interactive Rhyme Inspector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
              1
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                تحليل قصيدة وردزورث الشهيرة واكتشاف القوافي (Wordsworth Rhyme Inspector)
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                “I Wandered Lonely as a Cloud” • انقر على أزواج القوافي لتسليط الضوء على الأبيات المتناغمة
              </span>
            </div>
          </div>

          {/* Rhyme pair selector buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveRhymePair('pair1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRhymePair === 'pair1'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              cloud ↔ crowd
            </button>
            <button
              onClick={() => setActiveRhymePair('pair2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRhymePair === 'pair2'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              hills ↔ daffodils
            </button>
            <button
              onClick={() => setActiveRhymePair('pair3')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRhymePair === 'pair3'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              trees ↔ breeze
            </button>
          </div>
        </div>

        {/* Poem Verse Card */}
        <div className="p-6 sm:p-8 bg-amber-50/40 dark:bg-slate-850 rounded-3xl border border-amber-200/80 dark:border-slate-800 max-w-2xl mx-auto shadow-inner">
          <div className="space-y-3 font-en text-base sm:text-lg font-semibold leading-relaxed text-slate-800 dark:text-slate-200 text-center italic" dir="ltr">
            {/* Line 1 */}
            <div className={`p-2.5 rounded-xl transition-all ${
              activeRhymePair === 'pair1'
                ? 'bg-amber-100 dark:bg-amber-950/60 font-bold text-amber-900 dark:text-amber-200 scale-102 ring-1 ring-amber-400'
                : ''
            }`}>
              I wandered lonely as a <strong className="underline underline-offset-4 text-amber-600 dark:text-amber-400">cloud</strong>
            </div>

            {/* Line 2 */}
            <div className={`p-2.5 rounded-xl transition-all ${
              activeRhymePair === 'pair2'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-200 scale-102 ring-1 ring-emerald-400'
                : ''
            }`}>
              That floats on high o’er vales and <strong className="underline underline-offset-4 text-emerald-600 dark:text-emerald-400">hills</strong>,
            </div>

            {/* Line 3 */}
            <div className={`p-2.5 rounded-xl transition-all ${
              activeRhymePair === 'pair1'
                ? 'bg-amber-100 dark:bg-amber-950/60 font-bold text-amber-900 dark:text-amber-200 scale-102 ring-1 ring-amber-400'
                : ''
            }`}>
              When all at once I saw a <strong className="underline underline-offset-4 text-amber-600 dark:text-amber-400">crowd</strong>,
            </div>

            {/* Line 4 */}
            <div className={`p-2.5 rounded-xl transition-all ${
              activeRhymePair === 'pair2'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-200 scale-102 ring-1 ring-emerald-400'
                : ''
            }`}>
              A host of golden <strong className="underline underline-offset-4 text-emerald-600 dark:text-emerald-400">daffodils</strong>;
            </div>

            {/* Line 5 */}
            <div className={`p-2.5 rounded-xl transition-all ${
              activeRhymePair === 'pair3'
                ? 'bg-purple-100 dark:bg-purple-950/60 font-bold text-purple-900 dark:text-purple-200 scale-102 ring-1 ring-purple-400'
                : ''
            }`}>
              Beside the lake, beneath the <strong className="underline underline-offset-4 text-purple-600 dark:text-purple-400">trees</strong>,
            </div>

            {/* Line 6 */}
            <div className={`p-2.5 rounded-xl transition-all ${
              activeRhymePair === 'pair3'
                ? 'bg-purple-100 dark:bg-purple-950/60 font-bold text-purple-900 dark:text-purple-200 scale-102 ring-1 ring-purple-400'
                : ''
            }`}>
              Fluttering and dancing in the <strong className="underline underline-offset-4 text-purple-600 dark:text-purple-400">breeze</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVITY 2: Sensory Question Explorer (What do you see? Hear? Feel?) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            2
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              استكشاف الحواس والمشاعر (What do you see? Hear? Feel?)
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              الخطوة 2 في كتاب الوزارة: كيف تحول المشاهد اليومية إلى مشاعر وصور شعرية ساحرة
            </span>
          </div>
        </div>

        {/* Sensory Nav Switcher */}
        <div className="flex items-center gap-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl max-w-md">
          <button
            onClick={() => setSensoryTab('see')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              sensoryTab === 'see' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Eye className="w-4 h-4 text-indigo-500" />
            <span>ماذا ترى؟ (See)</span>
          </button>
          <button
            onClick={() => setSensoryTab('hear')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              sensoryTab === 'hear' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Ear className="w-4 h-4 text-purple-500" />
            <span>ماذا تسمع؟ (Hear)</span>
          </button>
          <button
            onClick={() => setSensoryTab('feel')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              sensoryTab === 'feel' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>ماذا تشعر؟ (Feel)</span>
          </button>
        </div>

        {/* Sensory Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sensoryTab === 'see' && (
            <>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">صورة بصرية 1:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  A high white cloud drifting lazily over quiet green hills.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">سحابة بيضاء هائمة فوق التلال الخضراء</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">صورة بصرية 2:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  A sparkling host of ten thousand golden daffodils.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">حشد متلألئ من أزهار النرجس الذهبية البراقة</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">صورة بصرية 3:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  Crystal water ripples shimmering in the early morning sunlight.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">موجات ماء نقية تتلألأ تحت أشعة شمس الصباح</span>
              </div>
            </>
          )}

          {sensoryTab === 'hear' && (
            <>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">صوت مسموع 1:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  The gentle whispering of leaves moving softly in the breeze.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">حفيف أوراق الشجر يهمس برفق في النسيم</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">صوت مسموع 2:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  Cheerful morning birds singing melodious tunes from high branches.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">عصافير الصباح تغرد بألحان عذبة مبهجة</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">صوت مسموع 3:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  The tranquil silence of the lake reflecting the vast sky.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">سكون البحيرة الهادئ وهي تعكس صفحة السماء</span>
              </div>
            </>
          )}

          {sensoryTab === 'feel' && (
            <>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">شعور وجداني 1:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  Wandering alone, feeling quiet solitude and distant sadness.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">الهيام وحيداً والشعور بالعزلة الهادئة</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">شعور وجداني 2:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  Sudden awe and joyful surprise at discovering golden blossoms.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">دهشة وفرحة غامرة عند اكتشاف شريط الزهور الذهبية</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">شعور وجداني 3:</span>
                <p className="font-en text-sm font-semibold text-slate-900 dark:text-white" dir="ltr">
                  Lasting inner peace and enduring strength stored in memory.
                </p>
                <span className="text-xs text-slate-500 mt-1 block">سكينة باطنية وطمأنينة دائمة تحفظها الذاكرة</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ACTIVITY 3: Similes & Comparison Forge */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            3
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              معمل التشبيهات والصفات البلاغية (Adjectives & Comparisons Forge)
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              الخطوة 3: Use adjectives and comparisons (bright, quiet, as tall as a tree / lonely as a cloud)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">تشبيه 1 (وردزورث):</span>
            <strong className="font-en text-base block text-slate-900 dark:text-white">“lonely as a cloud”</strong>
            <p className="text-xs text-slate-500 mt-1">وحيد كالسحابة الهائمة في السماء العالية</p>
          </div>
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">تشبيه 2 (تشخيص الطبيعة):</span>
            <strong className="font-en text-base block text-slate-900 dark:text-white">“dancing like people”</strong>
            <p className="text-xs text-slate-500 mt-1">الأزهار تتمايل وترقص كالأصدقاء المحتفلين</p>
          </div>
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">تشبيه 3 (من أمثلة الكتاب):</span>
            <strong className="font-en text-base block text-slate-900 dark:text-white">“as tall as a tree”</strong>
            <p className="text-xs text-slate-500 mt-1">شامخ ومهيب كشجرة سنديان عتيقة</p>
          </div>
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">تشبيه 4 (صفات النور والهدوء):</span>
            <strong className="font-en text-base block text-slate-900 dark:text-white">“as quiet as a whisper”</strong>
            <p className="text-xs text-slate-500 mt-1">هادئ ولطيف كهمسة نسيم عابر</p>
          </div>
        </div>
      </div>

      {/* ACTIVITY 4: 4-Line Short Poem Composer */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
              4
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                مُنظّم الأبيات الشعرية القصيرة (4-Line Short Poem Composer)
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                الخطوة 4: Keep lines short (poems don’t need full sentences)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadTextbookShortPoem}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
            >
              📖 نموذج كتاب الوزارة
            </button>
            <button
              onClick={handleLoadSpringSong}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors"
            >
              🌸 نموذج أنشودة الربيع
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                السطر 1 (المشهد / العنصر الأساسي):
              </label>
              <input
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="e.g., Golden flowers,"
                dir="ltr"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-en font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                السطر 2 (الحركة والتفاعل):
              </label>
              <input
                type="text"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                placeholder="e.g., Dancing by the lake,"
                dir="ltr"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-en font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                السطر 3 (عنصر الطبيعة أو الصوت):
              </label>
              <input
                type="text"
                value={line3}
                onChange={(e) => setLine3(e.target.value)}
                placeholder="e.g., Whispering trees,"
                dir="ltr"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-en font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                السطر 4 (الخاتمة أو المشهد الأخير):
              </label>
              <input
                type="text"
                value={line4}
                onChange={(e) => setLine4(e.target.value)}
                placeholder="e.g., Clouds above the hills."
                dir="ltr"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-en font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
              />
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-rose-50 to-amber-50/60 dark:from-slate-850 dark:to-slate-800 p-6 rounded-3xl border border-rose-200/80 dark:border-slate-700 shadow-inner flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                  <Music className="w-4 h-4" />
                  <span>معاينة القصيدة المكتملة</span>
                </span>
                <span className="text-[11px] font-en font-bold text-slate-500 bg-white/80 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  4 Short Lines
                </span>
              </div>

              <div className="font-en text-lg sm:text-xl font-bold text-slate-900 dark:text-white space-y-1.5 italic" dir="ltr">
                <p>“{line1 || '......'}</p>
                <p>{line2 || '......'}</p>
                <p>{line3 || '......'}</p>
                <p>{line4 || '......'}”</p>
              </div>
            </div>

            <button
              onClick={handleCopyPoem}
              className="mt-6 flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
            >
              {copiedPoem ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPoem ? 'تم نسخ الأبيات بنجاح!' : 'نسخ الأبيات الشعرية'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
