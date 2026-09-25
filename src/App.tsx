import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoryReader } from './components/StoryReader';
import { WordMatchGame } from './components/WordMatchGame';
import { SpellingGame } from './components/SpellingGame';
import { CollocationsGame } from './components/CollocationsGame';
import { FillBlankGame } from './components/FillBlankGame';
import { SentenceBuilderGame } from './components/SentenceBuilderGame';
import { SpeedQuiz } from './components/SpeedQuiz';
import { VocabList } from './components/VocabList';
import { VersusBattle } from './components/VersusBattle';
import { WritingWorkshop } from './components/WritingWorkshop';
import { useProgress } from './hooks/useProgress';
import { UNITS_DATA } from './data/units';
import { BookOpen } from 'lucide-react';

export function App() {
  const [activeUnitId, setActiveUnitId] = useState('unit-1');
  const [activeTab, setActiveTab] = useState('story');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme_mode');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to <html> tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_mode', 'light');
    }
  }, [isDarkMode]);

  const {
    currentUnitProgress,
    markReadingDone,
    markMatchDone,
    markSpellingDone,
    recordQuizScore,
    notification
  } = useProgress(activeUnitId);

  const currentUnit = UNITS_DATA.find(u => u.id === activeUnitId) || UNITS_DATA[0];

  const handleSelectUnit = (unitId: string) => {
    setActiveUnitId(unitId);
    const selected = UNITS_DATA.find(u => u.id === unitId);
    if (unitId.includes('lesson-5') || selected?.writingLesson) {
      setActiveTab('writing');
    } else if (activeTab === 'writing') {
      setActiveTab('story');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <Navbar
        units={UNITS_DATA}
        currentUnit={currentUnit}
        onSelectUnit={handleSelectUnit}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notification={notification}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'story' && (
          <StoryReader
            passage={currentUnit.readingPassage}
            keyVocabulary={[...currentUnit.keyVocabulary, ...currentUnit.additionalVocabulary]}
            phrasesAndExpressions={currentUnit.phrasesAndExpressions}
            onCompleteReading={markReadingDone}
            isCompleted={currentUnitProgress.readingCompleted}
            unitNumber={currentUnit.unitNumber}
            partNumber={currentUnit.partNumber}
            lessonName={currentUnit.lessonName}
          />
        )}

        {activeTab === 'match' && (
          <WordMatchGame
            words={currentUnit.keyVocabulary}
            onComplete={markMatchDone}
            isCompleted={currentUnitProgress.matchCompleted}
            showPoints={false}
            hasTimer={false}
          />
        )}

        {activeTab === 'spelling' && (
          <SpellingGame
            words={currentUnit.keyVocabulary}
            onComplete={markSpellingDone}
            isCompleted={currentUnitProgress.spellingCompleted}
            showPoints={false}
          />
        )}

        {activeTab === 'collocations' && (
          <CollocationsGame
            questions={currentUnit.collocationsQuiz}
            phrases={currentUnit.phrasesAndExpressions}
            showPoints={false}
            hasTimer={false}
          />
        )}

        {activeTab === 'fill' && (
          <FillBlankGame
            questions={currentUnit.fillInBlanksQuiz}
            showPoints={false}
            hasTimer={false}
          />
        )}

        {activeTab === 'sentences' && (
          <SentenceBuilderGame
            puzzles={currentUnit.sentencePuzzles}
            showPoints={false}
          />
        )}

        {activeTab === 'quiz' && (
          <SpeedQuiz
            questions={currentUnit.definitionsQuiz}
            onRecordScore={recordQuizScore}
            showPoints={false}
            hasTimer={false}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabList
            keyWords={currentUnit.keyVocabulary}
            additionalWords={currentUnit.additionalVocabulary}
            unitNumber={currentUnit.unitNumber}
            unitTitle={currentUnit.title}
          />
        )}

        {activeTab === 'writing' && currentUnit.writingLesson && (
          <WritingWorkshop writingData={currentUnit.writingLesson} />
        )}

        {activeTab === 'versus' && (
          <VersusBattle unit={currentUnit} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 mt-auto transition-colors duration-200">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-slate-700 dark:text-slate-200">English Road</span>
              <span>•</span>
              <span>منهج اللغة الإنجليزية الشامل للثانوية العامة</span>
            </div>

            <div className="text-slate-400 text-right">
              <span>جاهز للشرح التفاعلي على السبورة الذكية (Smart Whiteboard Ready)</span>
            </div>
          </div>

          {/* Copyright & Creator Credit in small font */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 font-en" dir="ltr">
              <span>© {new Date().getFullYear()}</span>
              <span className="font-semibold text-slate-600 dark:text-slate-300">Eng. Ahmed Alaa</span>
              <span>• All Rights Reserved</span>
            </div>
            <div>
              <span>منصة تفاعلية مجهزة للشرح الذكي للثانوية العامة</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
