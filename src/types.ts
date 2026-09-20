export interface VocabWord {
  id: string;
  word: string;
  partOfSpeech: string;
  arabicMeaning: string;
  definition: string;
  exampleSentence?: string;
  category: 'key' | 'reading_listening';
}

export interface PhraseExpression {
  id: string;
  phrase: string;
  arabicMeaning: string;
  type: 'preposition' | 'expression' | 'idiom';
}

export interface ReadingPassage {
  title: string;
  paragraphs: string[];
  keyVocabHighlightIds: string[];
  imageUrl?: string;
  imageCaption?: string;
  imageAlt?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'definition' | 'fill-in';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SentencePuzzle {
  id: string;
  fullSentence: string;
  chunks: string[];
  arabicTranslation: string;
}

export interface BlogPostSection {
  stepNumber: number;
  partName: string;
  partNameArabic: string;
  purpose: string;
  purposeArabic: string;
  examples: string[];
  tips?: string;
}

export interface WritingTaskData {
  title: string;
  titleArabic: string;
  prompt: string;
  promptArabic: string;
  suggestedTopics: { id: string; title: string; hint: string }[];
  modelBlogPost: {
    headline: string;
    intro: string;
    body: string[];
    conclusion: string;
    arabicTranslation: string;
  };
  checklist: string[];
  minWords: number;
}

export interface WritingData {
  lessonNumber: number;
  lessonTitle: string;
  lessonTitleArabic: string;
  definition: string;
  definitionArabic: string;
  characteristics: { en: string; ar: string }[];
  structureSteps: BlogPostSection[];
  examQuestions: QuizQuestion[];
  task: WritingTaskData;
}

export interface UnitData {
  id: string;
  unitNumber: number;
  partNumber: number;
  lessonName?: string;
  title: string;
  subtitle: string;
  isAvailable: boolean;
  readingPassage: ReadingPassage;
  keyVocabulary: VocabWord[];
  additionalVocabulary: VocabWord[];
  phrasesAndExpressions: PhraseExpression[];
  definitionsQuiz: QuizQuestion[];
  collocationsQuiz: QuizQuestion[];
  fillInBlanksQuiz: QuizQuestion[];
  sentencePuzzles: SentencePuzzle[];
  writingLesson?: WritingData;
}

export interface UnitProgress {
  readingCompleted: boolean;
  matchCompleted: boolean;
  spellingCompleted: boolean;
  quizBestScore: number;
}

export interface StudentProgress {
  units: Record<string, UnitProgress>;
}
