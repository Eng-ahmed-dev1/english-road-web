import React, { useState } from 'react';
import {
  RotateCw,
  Smile,
  Star,
  CheckCircle2,
  Copy,
  Sparkles,
  Trophy
} from 'lucide-react';

export const DiaryActivities: React.FC = () => {
  // Activity 1: 3-Sentence Day
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [s3, setS3] = useState('');
  const [copiedA1, setCopiedA1] = useState(false);

  // Activity 2: Emojis
  const emojiList = [
    { emoji: '😊', name: 'Happy', ar: 'سعيد' },
    { emoji: '😥', name: 'Sad', ar: 'حزين / قلق' },
    { emoji: '😲', name: 'Surprised', ar: 'متفاجئ' },
    { emoji: '😡', name: 'Angry', ar: 'غاضب' },
    { emoji: '😴', name: 'Tired', ar: 'مرهق' },
    { emoji: '🤩', name: 'Excited', ar: 'متحمس' },
    { emoji: '🥳', name: 'Proud', ar: 'فخور' }
  ];
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>(['😊', '😥', '😲']);
  const [emojiSentence, setEmojiSentence] = useState('I was happy, then sad, then surprised when I got a gift!');

  // Activity 3: Feelings Wheel
  const feelings = [
    { name: 'Happy', ar: 'سعيد', color: 'bg-emerald-500 text-white', border: 'border-emerald-500', prompt: 'Write about a time you won a game or spent joyful moments with friends.' },
    { name: 'Angry', ar: 'غاضب', color: 'bg-rose-500 text-white', border: 'border-rose-500', prompt: 'Write about a time someone was unfair or broke a promise, and how you calmed down.' },
    { name: 'Tired', ar: 'متعب / مرهق', color: 'bg-indigo-500 text-white', border: 'border-indigo-500', prompt: 'Write about an exhausting day of exams or heavy sports practice.' },
    { name: 'Excited', ar: 'متحمس', color: 'bg-amber-500 text-white', border: 'border-amber-500', prompt: 'Write about an upcoming trip, school party, or awaiting a surprise.' }
  ];
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<typeof feelings[0] | null>(null);
  const [wheelWriting, setWheelWriting] = useState('');

  // Activity 4: Picture / Describe
  const [pictureTheme, setPictureTheme] = useState('⚽ Playing Football at Break');
  const [pictureSentences, setPictureSentences] = useState('');

  // Activity 5: 7-Day Habit Tracker
  const [weekDays, setWeekDays] = useState<boolean[]>([true, true, true, false, false, false, false]);

  const handleCopyA1 = () => {
    const text = `${s1} ${s2} ${s3}`.trim();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedA1(true);
    setTimeout(() => setCopiedA1(false), 2000);
  };

  const handleLoadA1Example = () => {
    setS1('Today I played football at break.');
    setS2('My team won!');
    setS3('I felt very proud.');
  };

  const toggleEmoji = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(prev => prev.filter(e => e !== emoji));
    } else {
      if (selectedEmojis.length < 5) {
        setSelectedEmojis(prev => [...prev, emoji]);
      }
    }
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const extraTurns = 5 + Math.floor(Math.random() * 5); // 5 to 9 full turns
    const randomSector = Math.floor(Math.random() * 4);
    const sectorAngle = 90;
    const targetDeg = rotation + (extraTurns * 360) + (randomSector * sectorAngle) + 45;
    
    setRotation(targetDeg);
    
    setTimeout(() => {
      setIsSpinning(false);
      // Determine which sector landed on top
      const normalized = (targetDeg % 360);
      // Index mapping based on rotation
      const index = Math.floor((360 - normalized) / 90) % 4;
      setWheelResult(feelings[index] || feelings[0]);
    }, 2600);
  };

  const toggleDay = (idx: number) => {
    setWeekDays(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const completedDaysCount = weekDays.filter(Boolean).length;

  return (
    <div className="space-y-10">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ministry Textbook Activities • Page 66 (Lesson 5: A Diary)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Interactive Diary Writing Activities (5 Activities)
            </h3>
            <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Practice the 5 curriculum-approved diary activities step-by-step: 3-Sentence Day, Emoji Expressions, Feelings Wheel Spinner, Picture Your Day, and 7-Day Habit Tracker!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-xs text-teal-100 block">Activities Progress</span>
            <span className="text-2xl font-black font-en">5 / 5 Ready</span>
          </div>
        </div>
      </div>

      {/* ACTIVITY 1: 3-Sentence Day Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
              1
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Activity 1: 3 Sentences About Your Day
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                1- Write just 3 sentences about your day. (Action → Outcome → Feeling)
              </span>
            </div>
          </div>
          <button
            onClick={handleLoadA1Example}
            className="text-xs font-bold px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors self-start sm:self-auto"
          >
            💡 Load Textbook Example
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Sentence 1: What did you do today? (Action)
            </label>
            <input
              type="text"
              value={s1}
              onChange={(e) => setS1(e.target.value)}
              placeholder="e.g., Today I played football at break."
              dir="ltr"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-en text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Sentence 2: What was the outcome? (Result)
            </label>
            <input
              type="text"
              value={s2}
              onChange={(e) => setS2(e.target.value)}
              placeholder="e.g., My team won!"
              dir="ltr"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-en text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Sentence 3: How did you feel? (Emotion)
            </label>
            <input
              type="text"
              value={s3}
              onChange={(e) => setS3(e.target.value)}
              placeholder="e.g., I felt very proud."
              dir="ltr"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-en text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Live Preview Card */}
        {(s1 || s2 || s3) && (
          <div className="p-5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 block mb-1">
                📖 Completed 3-Sentence Entry Preview:
              </span>
              <p className="font-en text-sm sm:text-base font-semibold text-slate-900 dark:text-white" dir="ltr">
                {s1} {s2} {s3}
              </p>
            </div>
            <button
              onClick={handleCopyA1}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold hover:shadow-xs transition-all shrink-0"
            >
              {copiedA1 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedA1 ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ACTIVITY 2: Emojis & Emotion Progression */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            2
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Activity 2: Draw Emojis & Explain
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              2- Draw emojis to show how you felt that day. Then write one sentence to explain.
            </span>
          </div>
        </div>

        {/* Emoji Selector */}
        <div className="mb-5">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-2.5">
            Select emojis representing your emotional progression today:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {emojiList.map((item) => {
              const active = selectedEmojis.includes(item.emoji);
              return (
                <button
                  key={item.name}
                  onClick={() => toggleEmoji(item.emoji)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 transition-all touch-manipulation ${
                    active
                      ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 shadow-xs scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-bold font-en text-slate-800 dark:text-slate-200">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Flow */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">Your feeling progression:</span>
          <div className="flex items-center gap-2 text-2xl">
            {selectedEmojis.map((e, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>{e}</span>
                {idx < selectedEmojis.length - 1 && <span className="text-slate-400 text-sm font-bold">➔</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Sentence explanation input */}
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
            Write a sentence explaining this sequence of feelings:
          </label>
          <input
            type="text"
            value={emojiSentence}
            onChange={(e) => setEmojiSentence(e.target.value)}
            placeholder="e.g., I was happy, then sad, then surprised when I got a gift!"
            dir="ltr"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-en text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* ACTIVITY 3: Interactive Feelings Wheel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            3
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Activity 3: Interactive Feelings Wheel Spinner
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              3- Make a wheel with feelings (happy, angry, tired, excited). Spin it and write about a time you felt that way.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Wheel Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Pointer indicator */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-x-8 border-x-transparent border-t-[18px] border-t-rose-600 drop-shadow-md" />

              {/* Rotating Wheel */}
              <div
                className="w-full h-full rounded-full border-4 border-slate-800 shadow-xl overflow-hidden relative transition-transform duration-[2500ms] ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Quadrants */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="bg-emerald-500 flex items-center justify-center font-en font-black text-white text-base sm:text-lg border-r border-b border-white/40">
                    <span className="-rotate-45 drop-shadow-xs">😊 Happy</span>
                  </div>
                  <div className="bg-rose-500 flex items-center justify-center font-en font-black text-white text-base sm:text-lg border-l border-b border-white/40">
                    <span className="rotate-45 drop-shadow-xs">😡 Angry</span>
                  </div>
                  <div className="bg-indigo-500 flex items-center justify-center font-en font-black text-white text-base sm:text-lg border-r border-t border-white/40">
                    <span className="-rotate-[135deg] drop-shadow-xs">😴 Tired</span>
                  </div>
                  <div className="bg-amber-500 flex items-center justify-center font-en font-black text-white text-base sm:text-lg border-l border-t border-white/40">
                    <span className="rotate-[135deg] drop-shadow-xs">🤩 Excited</span>
                  </div>
                </div>

                {/* Center Hub */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg z-10">
                  <RotateCw className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold rounded-2xl text-sm sm:text-base flex items-center gap-2 shadow-md transition-all active:scale-95 touch-manipulation"
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Spinning the wheel...' : '🎡 Spin the Feelings Wheel'}</span>
            </button>
          </div>

          {/* Wheel Prompt & Writing Box */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            {wheelResult ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-xl font-en font-black text-sm ${wheelResult.color}`}>
                    {wheelResult.name} <span className="font-ar">({wheelResult.ar})</span>
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    The wheel landed on this feeling!
                  </span>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                    🎯 Diary prompt for this feeling:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {wheelResult.prompt}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Write in your diary about a time you felt ({wheelResult.name}):
                  </label>
                  <textarea
                    rows={3}
                    value={wheelWriting}
                    onChange={(e) => setWheelWriting(e.target.value)}
                    placeholder={`I felt ${wheelResult.name.toLowerCase()} when...`}
                    dir="ltr"
                    className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-en text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Smile className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
                <h5 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Click the Spin button to pick a random feeling!
                </h5>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  The wheel features the 4 feelings from Activity 3 in the student book: (happy, angry, tired, excited).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVITY 4: Draw / Picture Your Day */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <span className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
            4
          </span>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Activity 4: Picture Your Day & Write 2–3 Sentences
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              4- Draw a picture of your day, then write 2–3 sentences about it.
            </span>
          </div>
        </div>

        {/* Theme presets */}
        <div className="mb-4">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-2">
            Choose an imagined scene:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              '⚽ Playing Football at Break',
              '☕ Welcoming Guests with Mint Tea',
              '📚 Reading in the School Library',
              '🚲 Fixing a Bicycle with a Neighbor'
            ].map(theme => (
              <button
                key={theme}
                onClick={() => setPictureTheme(theme)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-en border transition-all ${
                  pictureTheme === theme
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
            Write 2 to 3 sentences describing this scene:
          </label>
          <textarea
            rows={3}
            value={pictureSentences}
            onChange={(e) => setPictureSentences(e.target.value)}
            placeholder="In this picture, I am playing football with my classmates. The sun is shining brightly, and everyone is cheering loudly."
            dir="ltr"
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-en text-slate-900 dark:text-white focus:outline-hidden focus:border-purple-500"
          />
        </div>
      </div>

      {/* ACTIVITY 5: 7-Day Diary Habit Challenge */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black font-en text-sm shadow-xs">
              5
            </span>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Activity 5: 7-Day Diary Habit Challenge
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                5- Try writing every day for 7 days. Put a sticker on your calendar each day you write!
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-xl border border-amber-200 dark:border-amber-800 text-xs font-bold self-start sm:self-auto">
            <Trophy className="w-4 h-4" />
            <span>Challenge Progress: {completedDaysCount} / 7 Days</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Click on each day of the week to place a golden star sticker ⭐ after writing your daily entry:
        </p>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
            const hasSticker = weekDays[idx];
            return (
              <button
                key={day}
                onClick={() => toggleDay(idx)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all touch-manipulation min-h-[110px] ${
                  hasSticker
                    ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-en">
                  Day 0{idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-en">{day}</span>
                {hasSticker ? (
                  <div className="flex items-center justify-center animate-bounce">
                    <Star className="w-7 h-7 text-amber-500 fill-amber-400 drop-shadow-xs" />
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-600 rounded-full px-2 py-0.5 font-en">
                    + Add Sticker
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {completedDaysCount === 7 && (
          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
            <Trophy className="w-6 h-6 shrink-0 text-emerald-600" />
            <span className="text-xs sm:text-sm font-bold">
              🎉 Fantastic! You completed the 7-day challenge and built an impressive daily diary journaling habit!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
