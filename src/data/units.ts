import type { UnitData, WritingData } from '../types';
import { UNIT_2_DATA } from './unit2';
import { UNIT_2_LESSONS_3_4_DATA } from './unit2Lessons34';
import { UNIT_2_WRITING_LESSON } from './unit2Writing';
import { UNIT_3_DATA } from './unit3';
import { UNIT_3_LESSONS_3_4_DATA } from './unit3Lessons34';
import { UNIT_3_WRITING_LESSON } from './unit3Writing';
import { UNIT_4_DATA } from './unit4';
import { UNIT_4_LESSONS_3_4_DATA } from './unit4Lessons34';
import { UNIT_4_WRITING_LESSON } from './unit4Writing';
import { UNIT_5_DATA } from './unit5';
import { UNIT_5_LESSONS_3_4_DATA } from './unit5Lessons34';
import { UNIT_5_WRITING_LESSON } from './unit5Writing';
import { UNIT_6_DATA } from './unit6';
import { UNIT_6_LESSONS_3_4_DATA } from './unit6Lessons34';
import { UNIT_6_WRITING_LESSON } from './unit6Writing';
import { UNIT_7_DATA } from './unit7';
import { UNIT_7_LESSONS_3_4_DATA } from './unit7Lessons34';
import { UNIT_7_WRITING_LESSON } from './unit7Writing';
import { UNIT_8_DATA } from './unit8';
import { UNIT_8_LESSONS_3_4_DATA } from './unit8Lessons34';
import { UNIT_8_WRITING_LESSON } from './unit8Writing';
import { UNIT_9_DATA } from './unit9';
import { UNIT_9_LESSONS_3_4_DATA } from './unit9Lessons34';
import { UNIT_9_WRITING_LESSON } from './unit9Writing';
import { UNIT_10_DATA } from './unit10';
import { UNIT_10_LESSONS_3_4_DATA } from './unit10Lessons34';
import { UNIT_10_WRITING_LESSON } from './unit10Writing';
import { UNIT_11_DATA } from './unit11';
import { UNIT_11_LESSONS_3_4_DATA } from './unit11Lessons34';
import { UNIT_11_WRITING_LESSON } from './unit11Writing';
import { UNIT_12_DATA } from './unit12';
import { UNIT_12_LESSONS_3_4_DATA } from './unit12Lessons34';
import { UNIT_12_WRITING_LESSON } from './unit12Writing';

export const UNIT_1_WRITING_LESSON: WritingData = {
  lessonNumber: 5,
  lessonTitle: 'My Blog Post',
  lessonTitleArabic: 'كتابة تدوينة للمدونة (Blog Post)',
  definition: 'A blog post is an article or a piece of writing published on a blog (an online journal or website).',
  definitionArabic: 'تدوينة المدونة هي مقال أو قطعة كتابية تُنشر على مدونة إلكترونية (موقع أو يوميات على الإنترنت).',
  characteristics: [
    {
      en: 'Informal or semi-formal: Like talking to a friend, but maybe a bit more organized.',
      ar: 'غير رسمية أو شبه رسمية: كأنك تتحدث مع صديق، ولكن بأسلوب منظم ومريح.'
    },
    {
      en: 'Engaging: They want to catch the reader\'s attention.',
      ar: 'جذابة ومثيرة: تهدف لجذب انتباه القارئ وإثارة اهتمامه منذ اللحظة الأولى.'
    },
    {
      en: 'About a specific topic: They share information, opinions, or personal experiences.',
      ar: 'حول موضوع محدد: تشارك معلومات أو آراء أو تجارب ومواقف شخصية واقعية.'
    },
    {
      en: 'Not too long: Easy to read online.',
      ar: 'ليست طويلة جداً: سهلة وسريعة القراءة ومناسبة للتصفح الرقمي عبر الشاشات.'
    }
  ],
  structureSteps: [
    {
      stepNumber: 1,
      partName: 'Catchy Title (Headline)',
      partNameArabic: 'العنوان الجذاب (Headline)',
      purpose: 'To make people want to click and read!',
      purposeArabic: 'لجعل القراء يرغبون في النقر على الرابط وقراءة التدوينة فوراً!',
      examples: [
        '5 Amazing Places to Visit in Summer',
        'My First Time Trying Sushi (and Why I Loved It!)',
        'Is Learning English Hard? My Opinion'
      ],
      tips: 'استخدم صيغ التساؤل أو الأرقام أو عبارات الفضول والتجربة الشخصية لجذب القارئ.'
    },
    {
      stepNumber: 2,
      partName: 'Introduction (1-2 paragraphs)',
      partNameArabic: 'المقدمة (Introduction)',
      purpose: 'To introduce your topic and hook the reader.',
      purposeArabic: 'لتقديم فكرة موضوعك وخطف انتباه القارئ بسؤال أو فكرة ملفتة (Hook).',
      examples: [
        'Have you ever dreamed of traveling the world? For me, visiting new countries has always been a passion. Today, I want to share my recent trip to Japan and some amazing discoveries I made there.'
      ],
      tips: 'ابدأ بسؤال تفاعلي موجه للقارئ (Have you ever...?) أو جملة مثيرة لمشاعره.'
    },
    {
      stepNumber: 3,
      partName: 'Main Body (2-4 paragraphs)',
      partNameArabic: 'صلب التدوينة (Main Body)',
      purpose: 'To develop your ideas, provide details, and explain your points.',
      purposeArabic: 'لتطوير أفكارك وسرد تفاصيل مشوقة وشرح نقاطك مدعومة بأمثلة وتجارب.',
      examples: [
        'Paragraph 1 (Food): One of the best parts of my trip was the food. I tried sushi, ramen, and tempura. The ramen was especially delicious because...',
        'Paragraph 2 (Culture): Apart from food, I was fascinated by the traditional culture. I visited several temples and saw a tea ceremony...'
      ],
      tips: 'قسّم صلب المقال لفقرات قصيرة يركز كل منها على فكرة واحدة (طعام، ثقافة، مشاعر، إلخ).'
    },
    {
      stepNumber: 4,
      partName: 'Conclusion (1-2 paragraphs)',
      partNameArabic: 'الخاتمة (Conclusion)',
      purpose: 'To summarize your main points and give a final thought or question.',
      purposeArabic: 'لتلخيص أهم النقاط وتقديم رأي ختامي ودعوة القراء للتفاعل والتعليق.',
      examples: [
        'Overall, my trip to Japan was an unforgettable experience. I highly recommend visiting this amazing country if you get the chance. Have you ever been to Japan? What was your favorite part?'
      ],
      tips: 'اختم دائماً بسؤال تفاعلي موجه للقراء لتحفيزهم على ترك تعليقاتهم بالمدونة.'
    }
  ],
  examQuestions: [
    {
      id: 'wr-q1',
      type: 'multiple-choice',
      question: 'Which tone is most appropriate for writing a typical blog post?',
      options: ['Strictly formal and academic', 'Informal or semi-formal', 'Legal and official', 'Archaic and poetic'],
      correctAnswer: 'Informal or semi-formal',
      explanation: 'Blog posts are written for online readers and are usually informal or semi-formal, like talking to a friend in an organized manner.'
    },
    {
      id: 'wr-q2',
      type: 'multiple-choice',
      question: 'What is the main purpose of a blog post headline (Catchy Title)?',
      options: [
        'To summarize all paragraphs in detail',
        'To make people want to click and read',
        'To list reference sources',
        'To conclude the blog post'
      ],
      correctAnswer: 'To make people want to click and read',
      explanation: 'A catchy headline grabs attention and creates curiosity so people click and read online.'
    },
    {
      id: 'wr-q3',
      type: 'multiple-choice',
      question: 'Which of the following would make the BEST catchy title for a travel blog post?',
      options: [
        'A Travel Report',
        '3 Hidden Gems in Aswan You Must Visit!',
        'A Document Concerning Tourism in Egypt',
        'Travel Information'
      ],
      correctAnswer: '3 Hidden Gems in Aswan You Must Visit!',
      explanation: '"3 Hidden Gems in Aswan You Must Visit!" is catchy, intriguing, uses numbers, and addresses the reader directly.'
    },
    {
      id: 'wr-q4',
      type: 'multiple-choice',
      question: 'How should a writer effectively conclude a blog post to engage readers?',
      options: [
        'By abruptly ending without any final words',
        'By asking readers an engaging question to comment on',
        'By copying the first sentence word for word',
        'By introducing a completely new, unrelated topic'
      ],
      correctAnswer: 'By asking readers an engaging question to comment on',
      explanation: 'Ending with an interactive question (e.g. "Have you ever tried this? Tell me in the comments!") encourages reader participation.'
    },
    {
      id: 'wr-q5',
      type: 'multiple-choice',
      question: 'Which opening sentence is the most effective "hook" for a blog post about volunteering?',
      options: [
        'Volunteering is defined in dictionaries as unpaid work.',
        'Have you ever wondered how one hour of your time can change someone\'s life?',
        'This blog is written by me on Friday morning.',
        'Many people do things in their life.'
      ],
      correctAnswer: 'Have you ever wondered how one hour of your time can change someone\'s life?',
      explanation: 'Rhetorical and engaging questions create an emotional hook that invites the reader into the story.'
    }
  ],
  task: {
    title: 'Write Your Own Blog Post',
    titleArabic: 'اكتب تدوينتك الخاصة (التاسك التطبيقي)',
    prompt: 'Write an engaging blog post (60 - 90 words) about an inspiring experience, volunteering, or a memorable day.',
    promptArabic: 'اكتب تدوينة جذابة (من 60 إلى 90 كلمة) متضمنة: عنواناً جذاباً، مقدمة بخاطف (Hook)، صلب الموضوع بتفاصيل شخصية، وخاتمة بسؤال تفاعلي للقراء.',
    suggestedTopics: [
      {
        id: 't1',
        title: '🏥 A Day in the Shoes of a Nurse (مستوحى من درس الوحدة)',
        hint: 'شارك انطباعك عن تضحيات الممرضين وما تعلمته عن العمل الجماعي في الطوارئ.'
      },
      {
        id: 't2',
        title: '🌍 My Most Unforgettable Trip (رحلة لا تُنسى)',
        hint: 'اكتب عن مكان زرته، وجبة مميزة تذوقتها، وموقف رائع حدث معك.'
      },
      {
        id: 't3',
        title: '💡 How I Conquered My Fear of English (تجربة شخصية)',
        hint: 'شارك تجربتك ونصائحك للطلاب الآخرين لتخطي الصعوبات في المذاكرة.'
      }
    ],
    checklist: [
      'Catchy Title (Headline) that makes people want to click',
      'Hook in the introduction (e.g., rhetorical question)',
      'Body paragraph with personal details and clear descriptions',
      'Conclusion with final thought + engaging question to readers',
      'Friendly, semi-formal conversational tone'
    ],
    minWords: 60,
    modelBlogPost: {
      headline: 'Why A Day at the Hospital Changed My Entire Life!',
      intro: 'Have you ever walked into a hospital and truly paid attention to what nurses do? Last week, I volunteered for a single afternoon at our city clinic, and it completely opened my eyes.',
      body: [
        'At first, I expected it to be calm, but it was buzzing with non-stop urgency. I watched Nurse Sarah handle critical emergencies while remaining incredibly calm. She administered medication, comforted frightened patients, and worked seamlessly with her team.',
        'What touched me most was her compassion. Even during exhausting 12-hour shifts, she never lost her warm smile. It proved to me that teamwork truly makes the dream work.'
      ],
      conclusion: 'Overall, it was a deeply rewarding experience that taught me the real meaning of dedication. Have you ever volunteered in healthcare? Would you consider a career in nursing? Let me know in the comments below!',
      arabicTranslation: 'نموذج إرشادي متكامل يطبق جميع خطوات الدرس: عنوان جذاب بصيغة تعجبية، مقدمة بسؤال مشوق وخاطف، فقرات صلب الموضوع غنية بالمفردات والتفاصيل الشخصية، وخاتمة تنتهي بأسئلة تفاعلية للمتابعين.'
    }
  }
};

export const UNITS_DATA: UnitData[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    partNumber: 1,
    lessonName: 'Lessons 1 & 2',
    title: 'Unit 1: Lessons 1 & 2',
    subtitle: 'A Day in the Life of a Hospital Nurse - يوم في حياة ممرضة مستشفى',
    isAvailable: true,
    readingPassage: {
      title: '“A Day in the Life of a Hospital Nurse”',
      paragraphs: [
        `Every morning, Nurse Sarah **kicks off** her day with a strong cup of coffee before her 12-hour **shift** begins. She is always preparing herself mentally for the challenges ahead. As soon as she arrives, she checks patients' charts and reviews updates from the night shift. The hospital is **buzzing** with activity—doctors rushing, monitors **beeping**, and patients waiting.`,
        `Sarah's first task is **administering** medication to her patients. Some have been waiting anxiously, while others are resting quietly. She has cared for many patients over the years, but each day brings new surprises. One elderly patient, Mr. Ramy, has been recovering from surgery and needs extra **attention**. Sarah makes sure he is comfortable before moving on.`,
        `By midday, **emergencies** arise—a car accident **victim** is rushed in, and the team springs into action. Sarah assists the doctors, ensuring everything runs smoothly. Despite the **chaos**, she remains calm and focuses on her duties. "**Teamwork makes the dream work**," she often says, relying on her colleagues for support.`,
        `By evening, Sarah has checked on all her patients and has documented their progress. She feels exhausted but fulfilled. As she heads home, she reflects on the day—some moments were **heartbreaking**, but many were **rewarding**. Nursing is a never-ending **rollercoaster**, but Sarah wouldn't trade it for anything.`
      ],
      keyVocabHighlightIds: [
        'kicks-off', 'shift', 'buzzing', 'beeping', 'administering',
        'attention', 'emergencies', 'victim', 'chaos',
        'heartbreaking', 'rewarding', 'rollercoaster'
      ]
    },
    keyVocabulary: [
      {
        id: 'administer',
        word: 'administer',
        partOfSpeech: 'v (ed)',
        arabicMeaning: 'يدير / يعطي دواء',
        definition: 'to give medicine or treatment to someone',
        exampleSentence: "Sarah's first task is administering medication to her patients.",
        category: 'key'
      },
      {
        id: 'attention',
        word: 'attention',
        partOfSpeech: 'n',
        arabicMeaning: 'انتباه / اهتمام',
        definition: 'care or notice given to someone or something',
        exampleSentence: 'Mr. Ramy has been recovering from surgery and needs extra attention.',
        category: 'key'
      },
      {
        id: 'beep',
        word: 'beep',
        partOfSpeech: 'n / v',
        arabicMeaning: 'صوت صفير / صفارة',
        definition: 'a short, high-pitched sound made by electronic equipment',
        exampleSentence: 'The monitors were beeping constantly in the intensive care unit.',
        category: 'key'
      },
      {
        id: 'buzz',
        word: 'buzz',
        partOfSpeech: 'n / v',
        arabicMeaning: 'صوت طنين / ضجيج / نشاط صاخب',
        definition: 'the sound of many people talking or machines working',
        exampleSentence: 'The hospital was buzzing with activity all morning.',
        category: 'key'
      },
      {
        id: 'career',
        word: 'career',
        partOfSpeech: 'n',
        arabicMeaning: 'وظيفة / مهنة / مسار مهني',
        definition: 'a job or profession that you have been trained for and intend to do for your life',
        exampleSentence: 'She chose nursing as a lifelong career to help people in need.',
        category: 'key'
      },
      {
        id: 'chaos',
        word: 'chaos',
        partOfSpeech: 'n',
        arabicMeaning: 'فوضى عارمة',
        definition: 'a state of complete confusion and disorder',
        exampleSentence: 'Despite the chaos in the ER, she remained calm and focused.',
        category: 'key'
      },
      {
        id: 'chest',
        word: 'chest',
        partOfSpeech: 'n',
        arabicMeaning: 'صدر',
        definition: 'the front part of the body between the neck and the stomach',
        exampleSentence: 'He felt a sharp pain in his chest and was rushed to the hospital.',
        category: 'key'
      },
      {
        id: 'collapse',
        word: 'collapse',
        partOfSpeech: 'n / v (d)',
        arabicMeaning: 'انهيار / ينهار فجأة',
        definition: 'fall down suddenly, usually because of illness or weakness',
        exampleSentence: 'The exhausted worker collapsed on the floor due to severe dehydration.',
        category: 'key'
      },
      {
        id: 'consciousness',
        word: 'consciousness',
        partOfSpeech: 'n',
        arabicMeaning: 'وعي / إدراك',
        definition: 'the state of being awake and aware of what is happening around you',
        exampleSentence: 'The injured patient regained consciousness after the operation.',
        category: 'key'
      },
      {
        id: 'cpr',
        word: 'CPR',
        partOfSpeech: 'n',
        arabicMeaning: 'إنعاش قلبي رئوي',
        definition: 'an emergency procedure that uses chest compressions to help someone whose heart has stopped',
        exampleSentence: 'The paramedic performed CPR immediately to revive the victim.',
        category: 'key'
      },
      {
        id: 'emergency',
        word: 'emergency',
        partOfSpeech: 'n',
        arabicMeaning: 'طوارئ / حالة طارئة',
        definition: 'a serious, unexpected, and often dangerous situation requiring immediate action',
        exampleSentence: 'In case of medical emergency, call an ambulance immediately.',
        category: 'key'
      },
      {
        id: 'grab',
        word: 'grab',
        partOfSpeech: 'v (bed)',
        arabicMeaning: 'يمسك بقوة / ينتزع / يخطف',
        definition: 'take or hold something quickly and strongly',
        exampleSentence: 'The doctor quickly grabbed the first aid kit and ran to help.',
        category: 'key'
      },
      {
        id: 'heartbreaking',
        word: 'heartbreaking',
        partOfSpeech: 'adj',
        arabicMeaning: 'محزن / مفجع للغاية',
        definition: 'very sad or upsetting',
        exampleSentence: 'Seeing patients suffer was heartbreaking, but it made her stronger.',
        category: 'key'
      },
      {
        id: 'kick-off',
        word: 'kick off',
        partOfSpeech: 'v (ed)',
        arabicMeaning: 'يبدأ / ينطلق',
        definition: 'to start or begin something',
        exampleSentence: 'Nurse Sarah kicks off her day with a strong cup of coffee.',
        category: 'key'
      },
      {
        id: 'medication',
        word: 'medication',
        partOfSpeech: 'n',
        arabicMeaning: 'دواء / علاج طبي',
        definition: 'medicine, or a set of medicines or drugs used to treat illness',
        exampleSentence: 'Patients must take their prescribed medication on time.',
        category: 'key'
      },
      {
        id: 'paramedic',
        word: 'paramedic',
        partOfSpeech: 'n',
        arabicMeaning: 'مسعف',
        definition: 'medical professionals who give emergency care and take people to hospital by ambulance',
        exampleSentence: 'Paramedics arrived at the crash scene within four minutes.',
        category: 'key'
      },
      {
        id: 'pulse',
        word: 'pulse',
        partOfSpeech: 'n',
        arabicMeaning: 'نبض',
        definition: 'the regular beating of the heart that you can feel on your wrist or neck',
        exampleSentence: 'The nurse gently pressed her fingers on his wrist to check his pulse.',
        category: 'key'
      },
      {
        id: 'rewarding',
        word: 'rewarding',
        partOfSpeech: 'adj',
        arabicMeaning: 'مجزٍ / مرضٍ / مشبع للنفس',
        definition: 'giving a feeling of satisfaction or pleasure because you helped someone or achieved something good',
        exampleSentence: 'Saving a person’s life is one of the most rewarding feelings in the world.',
        category: 'key'
      },
      {
        id: 'rollercoaster',
        word: 'rollercoaster',
        partOfSpeech: 'n',
        arabicMeaning: 'الأفعوانية / تقلبات ومواقف متغيرة',
        definition: 'a situation or experience with many ups and downs, often emotional',
        exampleSentence: 'Working in the emergency room is an emotional rollercoaster.',
        category: 'key'
      },
      {
        id: 'shift',
        word: 'shift',
        partOfSpeech: 'n / v (ed)',
        arabicMeaning: 'مناوبة عمل / وردية / يحوّل',
        definition: 'a set period of time that a person works (especially in hospitals, factories, etc.)',
        exampleSentence: 'Sarah works a challenging 12-hour shift at the city general hospital.',
        category: 'key'
      },
      {
        id: 'victim',
        word: 'victim',
        partOfSpeech: 'n',
        arabicMeaning: 'ضحية',
        definition: 'a person who has been hurt, killed, or affected by something bad like an accident or a crime',
        exampleSentence: 'A car accident victim was quickly transferred to the surgical room.',
        category: 'key'
      }
    ],
    additionalVocabulary: [
      { id: 'activity', word: 'activity', partOfSpeech: 'n', arabicMeaning: 'نشاط', definition: 'a situation in which a lot of things are happening', category: 'reading_listening' },
      { id: 'affect', word: 'affect', partOfSpeech: 'v (ed)', arabicMeaning: 'يؤثر على', definition: 'to have an influence on someone or something', category: 'reading_listening' },
      { id: 'alarm', word: 'alarm', partOfSpeech: 'n', arabicMeaning: 'إنذار / منبه', definition: 'a warning sound or device', category: 'reading_listening' },
      { id: 'anxiously', word: 'anxiously', partOfSpeech: 'adv', arabicMeaning: 'بشكل متوتر / بقلق', definition: 'in a manner resulting from anxiety or distress', category: 'reading_listening' },
      { id: 'arise', word: 'arise', partOfSpeech: 'v', arabicMeaning: 'ينشأ / يظهر', definition: 'to happen or begin to exist', category: 'reading_listening' },
      { id: 'assist', word: 'assist', partOfSpeech: 'v (ed)', arabicMeaning: 'يساعد / يعاون', definition: 'to help someone typically by doing a share of the work', category: 'reading_listening' },
      { id: 'career-rl', word: 'career', partOfSpeech: 'n', arabicMeaning: 'مهنة', definition: 'a profession or occupation chosen as one\'s life\'s work', category: 'reading_listening' },
      { id: 'challenge', word: 'challenge', partOfSpeech: 'n / v (d)', arabicMeaning: 'تحدٍ / يتحدى', definition: 'something needing great mental or physical effort', category: 'reading_listening' },
      { id: 'chart', word: 'chart', partOfSpeech: 'n', arabicMeaning: 'مخطط / سجل مريض', definition: 'a medical record containing patient history and notes', category: 'reading_listening' },
      { id: 'check', word: 'check', partOfSpeech: 'v (ed)', arabicMeaning: 'يتحقق / يفحص', definition: 'to examine something to see if it is correct', category: 'reading_listening' },
      { id: 'colleague', word: 'colleague', partOfSpeech: 'n', arabicMeaning: 'زميل عمل', definition: 'a person with whom one works in a profession or business', category: 'reading_listening' },
      { id: 'compression', word: 'compression', partOfSpeech: 'n', arabicMeaning: 'ضغط', definition: 'the action of pressing or squeezing something', category: 'reading_listening' },
      { id: 'complain', word: 'complain', partOfSpeech: 'v (ed)', arabicMeaning: 'يشكو / يتذمر', definition: 'to express dissatisfaction or annoyance', category: 'reading_listening' },
      { id: 'condition', word: 'condition', partOfSpeech: 'n', arabicMeaning: 'حالة صحية / شرط', definition: 'the state of health or state of being', category: 'reading_listening' },
      { id: 'confusion', word: 'confusion', partOfSpeech: 'n', arabicMeaning: 'ارتباك / تشوش', definition: 'uncertainty or lack of clear understanding', category: 'reading_listening' },
      { id: 'crime', word: 'crime', partOfSpeech: 'n', arabicMeaning: 'جريمة', definition: 'an illegal act for which someone can be punished by law', category: 'reading_listening' },
      { id: 'critical', word: 'critical', partOfSpeech: 'adj', arabicMeaning: 'حرج / خطير / حيوي', definition: 'extremely important, serious, or dangerous', category: 'reading_listening' },
      { id: 'details', word: 'details', partOfSpeech: 'n', arabicMeaning: 'تفاصيل', definition: 'individual features, facts, or items', category: 'reading_listening' },
      { id: 'disorder', word: 'disorder', partOfSpeech: 'n', arabicMeaning: 'اضطراب', definition: 'a state of confusion or an illness disrupting normal body functions', category: 'reading_listening' },
      { id: 'dizzy', word: 'dizzy', partOfSpeech: 'adj', arabicMeaning: 'شاعر بدوار / مشوش', definition: 'feeling as if everything is turning around and unable to balance', category: 'reading_listening' },
      { id: 'document', word: 'document', partOfSpeech: 'n / v (ed)', arabicMeaning: 'وثيقة / يوثق', definition: 'to record details of something in writing', category: 'reading_listening' },
      { id: 'duty', word: 'duty', partOfSpeech: 'n', arabicMeaning: 'واجب / دوام عمل', definition: 'a moral or legal obligation; a task required by a job', category: 'reading_listening' },
      { id: 'emotional', word: 'emotional', partOfSpeech: 'adj', arabicMeaning: 'عاطفي', definition: 'having or expressing strong feelings', category: 'reading_listening' },
      { id: 'ensure', word: 'ensure', partOfSpeech: 'v (d)', arabicMeaning: 'يتأكد / يضمن', definition: 'to make certain that something will occur', category: 'reading_listening' },
      { id: 'experience', word: 'experience', partOfSpeech: 'n', arabicMeaning: 'خبرة / تجربة', definition: 'practical contact with and observation of facts or events', category: 'reading_listening' },
      { id: 'first-aid', word: 'first aid', partOfSpeech: 'n', arabicMeaning: 'إسعافات أولية', definition: 'help given to a sick or injured person before regular medical aid can be obtained', category: 'reading_listening' },
      { id: 'fulfilled', word: 'fulfilled', partOfSpeech: 'adj', arabicMeaning: 'راضٍ / مكتفٍ / شاعر بالإنجاز', definition: 'feeling happy and satisfied with one\'s achievements', category: 'reading_listening' },
      { id: 'handle', word: 'handle', partOfSpeech: 'v (d)', arabicMeaning: 'يتعامل مع / يدير', definition: 'to manage, deal with, or be responsible for', category: 'reading_listening' },
      { id: 'head', word: 'head', partOfSpeech: 'v (ed)', arabicMeaning: 'يتوجه / يغادر إلى', definition: 'to move or travel in a specific direction', category: 'reading_listening' },
      { id: 'hold-on', word: 'hold on', partOfSpeech: 'v', arabicMeaning: 'ينتظر', definition: 'to wait for a short period of time', category: 'reading_listening' },
      { id: 'lifeguard', word: 'lifeguard', partOfSpeech: 'n', arabicMeaning: 'منقذ شاطئ أو مسبح', definition: 'an expert swimmer employed to rescue bathers in difficulty', category: 'reading_listening' },
      { id: 'medical', word: 'medical', partOfSpeech: 'adj', arabicMeaning: 'طبي', definition: 'relating to the science of medicine or treatment of illness', category: 'reading_listening' },
      { id: 'mentally', word: 'mentally', partOfSpeech: 'adv', arabicMeaning: 'عقلي / ذهنياً', definition: 'in a manner relating to the mind', category: 'reading_listening' },
      { id: 'monitor', word: 'monitor', partOfSpeech: 'n / v (ed)', arabicMeaning: 'شاشة / مراقبة / يراقب', definition: 'to observe and check the progress or quality of something', category: 'reading_listening' },
      { id: 'neighborhood', word: 'neighborhood', partOfSpeech: 'n', arabicMeaning: 'جيرة / حي', definition: 'a district or community within a town or city', category: 'reading_listening' },
      { id: 'never-ending', word: 'never-ending', partOfSpeech: 'adj', arabicMeaning: 'مستمر / غير منتهٍ', definition: 'having or seeming to have no end', category: 'reading_listening' },
      { id: 'nursing', word: 'nursing', partOfSpeech: 'n', arabicMeaning: 'التمريض', definition: 'the profession or practice of providing care for the sick and infirm', category: 'reading_listening' },
      { id: 'operator', word: 'operator', partOfSpeech: 'n', arabicMeaning: 'عامل تشغيل', definition: 'a person who operates equipment or telephone switchboards', category: 'reading_listening' },
      { id: 'pain', word: 'pain', partOfSpeech: 'n', arabicMeaning: 'ألم / وجع', definition: 'physical suffering or discomfort caused by illness or injury', category: 'reading_listening' },
      { id: 'perform', word: 'perform', partOfSpeech: 'v (ed)', arabicMeaning: 'يؤدي', definition: 'to carry out, accomplish, or fulfill a task or action', category: 'reading_listening' },
      { id: 'pleasure', word: 'pleasure', partOfSpeech: 'n', arabicMeaning: 'سرور / بهجة / متعة', definition: 'a feeling of happy satisfaction and enjoyment', category: 'reading_listening' },
      { id: 'preparation', word: 'preparation', partOfSpeech: 'n', arabicMeaning: 'تحضير', definition: 'the action or process of making ready or being made ready', category: 'reading_listening' },
      { id: 'press', word: 'press', partOfSpeech: 'n / v (ed)', arabicMeaning: 'ضغط / يضغط', definition: 'to apply continuous physical force against something', category: 'reading_listening' },
      { id: 'procedure', word: 'procedure', partOfSpeech: 'n', arabicMeaning: 'إجراء طبي أو إداري', definition: 'an established or official way of doing something', category: 'reading_listening' },
      { id: 'progress', word: 'progress', partOfSpeech: 'n / v (ed)', arabicMeaning: 'تقدم / يتقدم', definition: 'development towards an improved or more advanced condition', category: 'reading_listening' },
      { id: 'quality', word: 'quality', partOfSpeech: 'n', arabicMeaning: 'ميزة / خاصية / جودة', definition: 'a distinctive attribute or characteristic possessed by someone or something', category: 'reading_listening' },
      { id: 'randomly', word: 'randomly', partOfSpeech: 'adv', arabicMeaning: 'بشكل عشوائي', definition: 'without a determined reason, pattern, or method', category: 'reading_listening' },
      { id: 'recover', word: 'recover', partOfSpeech: 'v (ed)', arabicMeaning: 'يتعافى / يشفى', definition: 'to return to a normal state of health, mind, or strength', category: 'reading_listening' },
      { id: 'regain', word: 'regain', partOfSpeech: 'v (ed)', arabicMeaning: 'يستعيد', definition: 'to get back or recover something lost or taken', category: 'reading_listening' },
      { id: 'regular', word: 'regular', partOfSpeech: 'adj', arabicMeaning: 'منتظم', definition: 'done or happening frequently and at uniform intervals', category: 'reading_listening' },
      { id: 'relieve', word: 'relieve', partOfSpeech: 'v (d)', arabicMeaning: 'يخفف / يسكن الألم', definition: 'to reduce or cause pain to become less severe', category: 'reading_listening' },
      { id: 'rescue', word: 'rescue', partOfSpeech: 'n / v (d)', arabicMeaning: 'إنقاذ / ينقذ', definition: 'to save someone from a dangerous or distressing situation', category: 'reading_listening' },
      { id: 'rest', word: 'rest', partOfSpeech: 'n / v (ed)', arabicMeaning: 'راحة / يرتاح', definition: 'to cease work or movement in order to relax and recover strength', category: 'reading_listening' },
      { id: 'review', word: 'review', partOfSpeech: 'n / v (ed)', arabicMeaning: 'مراجعة / يراجع', definition: 'a formal assessment of something with the intention of instituting change', category: 'reading_listening' },
      { id: 'run', word: 'run', partOfSpeech: 'v', arabicMeaning: 'يدير / يعمل', definition: 'to manage, direct, or operate a business, service, or machine', category: 'reading_listening' },
      { id: 'rush', word: 'rush', partOfSpeech: 'n / v (ed)', arabicMeaning: 'اندفاع / يندفع', definition: 'to move or act with urgent haste', category: 'reading_listening' },
      { id: 'satisfaction', word: 'satisfaction', partOfSpeech: 'n', arabicMeaning: 'رضا / قناعة', definition: 'fulfillment of one\'s wishes, expectations, or needs', category: 'reading_listening' },
      { id: 'situation', word: 'situation', partOfSpeech: 'n', arabicMeaning: 'موقف / وضع', definition: 'a set of circumstances in which one finds oneself', category: 'reading_listening' },
      { id: 'state', word: 'state', partOfSpeech: 'n', arabicMeaning: 'حالة', definition: 'the particular condition that someone or something is in', category: 'reading_listening' },
      { id: 'sudden', word: 'sudden', partOfSpeech: 'adj', arabicMeaning: 'مفاجئ', definition: 'occurring or done quickly and without warning', category: 'reading_listening' },
      { id: 'support', word: 'support', partOfSpeech: 'n / v (ed)', arabicMeaning: 'دعم / يدعم', definition: 'to give assistance, encouragement, or approval to', category: 'reading_listening' },
      { id: 'surgery', word: 'surgery', partOfSpeech: 'n', arabicMeaning: 'عملية جراحية', definition: 'medical treatment involving an operation by cutting into the body', category: 'reading_listening' },
      { id: 'task', word: 'task', partOfSpeech: 'n', arabicMeaning: 'مهمة', definition: 'a piece of work to be done or undertaken', category: 'reading_listening' },
      { id: 'trade', word: 'trade', partOfSpeech: 'n / v (d)', arabicMeaning: 'تجارة / تبادل / يبادل', definition: 'the action of buying and selling goods, or exchanging', category: 'reading_listening' },
      { id: 'treatment', word: 'treatment', partOfSpeech: 'n', arabicMeaning: 'علاج / مداواة', definition: 'medical care given to a patient for an illness or injury', category: 'reading_listening' },
      { id: 'typical', word: 'typical', partOfSpeech: 'adj', arabicMeaning: 'نموذجي / تقليدي', definition: 'having the distinctive qualities of a particular type of person or thing', category: 'reading_listening' },
      { id: 'updates', word: 'updates', partOfSpeech: 'n', arabicMeaning: 'تحديثات', definition: 'the latest information or reports about a situation', category: 'reading_listening' },
      { id: 'witness', word: 'witness', partOfSpeech: 'n / v (ed)', arabicMeaning: 'شاهد / يشهد على حدث', definition: 'a person who sees an event, typically a crime or accident, take place', category: 'reading_listening' },
      { id: 'wrist', word: 'wrist', partOfSpeech: 'n', arabicMeaning: 'معصم اليد', definition: 'the joint connecting the hand with the forearm', category: 'reading_listening' }
    ],
    phrasesAndExpressions: [
      { id: 'p-1', phrase: 'be rushed in', arabicMeaning: 'يُدفع للداخل / يُنقل على عجل إلى', type: 'expression' },
      { id: 'p-2', phrase: 'call for an ambulance', arabicMeaning: 'يتصل بالإسعاف / يطلب سيارة إسعاف', type: 'expression' },
      { id: 'p-3', phrase: 'give emergency care', arabicMeaning: 'يقدم الرعاية الطارئة والإسعافية', type: 'expression' },
      { id: 'p-4', phrase: 'go the extra mile', arabicMeaning: 'يبذل جهداً إضافياً / يتفانى في العطاء', type: 'idiom' },
      { id: 'p-5', phrase: 'administer ... to', arabicMeaning: 'يعطي دواءً / رعاية لـ', type: 'preposition' },
      { id: 'p-6', phrase: 'aware of', arabicMeaning: 'على علم بـ / مدرك لـ', type: 'preposition' },
      { id: 'p-7', phrase: 'break out', arabicMeaning: 'تندلع (حرب أو حريق) / يشب فجأة', type: 'preposition' },
      { id: 'p-8', phrase: 'buzz with', arabicMeaning: 'يمتلئ بـ / يعج بالنشاط والحركة', type: 'preposition' },
      { id: 'p-9', phrase: 'have a sharp pain', arabicMeaning: 'يشعر بألم حاد ومفاجئ', type: 'expression' },
      { id: 'p-10', phrase: 'make sure', arabicMeaning: 'يتأكد من / يتحقق', type: 'expression' },
      { id: 'p-11', phrase: 'No pain, no gain', arabicMeaning: 'لا ألم، لا ربح / لا نجاح بلا تعب', type: 'idiom' },
      { id: 'p-12', phrase: 'prepare for challenges ahead', arabicMeaning: 'يستعد للتحديات والصعوبات المقبلة', type: 'expression' },
      { id: 'p-13', phrase: 'care for', arabicMeaning: 'يعتني بـ / يهتم بـ', type: 'preposition' },
      { id: 'p-14', phrase: 'fall down', arabicMeaning: 'يسقط / يقع أرضاً', type: 'preposition' },
      { id: 'p-15', phrase: 'feeling of', arabicMeaning: 'شعور بـ / إحساس بـ', type: 'preposition' },
      { id: 'p-16', phrase: 'focus on', arabicMeaning: 'يركز على / يوجه انتباهه نحو', type: 'preposition' },
      { id: 'p-17', phrase: 'remain calm', arabicMeaning: 'يحافظ على الهدوء والاتزان', type: 'expression' },
      { id: 'p-18', phrase: 'a set period of time', arabicMeaning: 'فترة زمنية محددة', type: 'expression' },
      { id: 'p-19', phrase: 'spring into action', arabicMeaning: 'يبدأ التدخل فوراً / يهب للعمل', type: 'idiom' },
      { id: 'p-20', phrase: 'teamwork makes the dream work', arabicMeaning: 'العمل الجماعي يحقق الحلم والنجاح', type: 'idiom' },
      { id: 'p-21', phrase: 'move on', arabicMeaning: 'يمضي قُدُماً / ينتقل للمرحلة التالية', type: 'preposition' },
      { id: 'p-22', phrase: 'recover from', arabicMeaning: 'يتعافى من (مرض أو جراحة)', type: 'preposition' },
      { id: 'p-23', phrase: 'reflect on', arabicMeaning: 'يُفَكِّر في / يتأمل في أحداث', type: 'preposition' },
      { id: 'p-24', phrase: 'rely on', arabicMeaning: 'يعتمد على / يثق في', type: 'preposition' }
    ],
    definitionsQuiz: [
      {
        id: 'q1',
        type: 'definition',
        question: 'What word means: "to give medicine or treatment to someone"?',
        options: ['administer', 'collapse', 'relieve', 'grab'],
        correctAnswer: 'administer',
        explanation: '"administer" means to give medicine or treatment to a patient (يدير أو يعطي دواء).'
      },
      {
        id: 'q2',
        type: 'definition',
        question: 'Which word means: "a state of complete confusion and disorder"?',
        options: ['shift', 'chaos', 'pulse', 'career'],
        correctAnswer: 'chaos',
        explanation: '"chaos" refers to a complete state of disorder and confusion (فوضى عارمة).'
      },
      {
        id: 'q3',
        type: 'definition',
        question: 'Which term means: "an emergency procedure that uses chest compressions to help someone whose heart has stopped"?',
        options: ['First Aid', 'Surgery', 'CPR', 'Shift'],
        correctAnswer: 'CPR',
        explanation: 'CPR (cardiopulmonary resuscitation) is the emergency procedure using chest compressions (إنعاش قلبي رئوي).'
      },
      {
        id: 'q4',
        type: 'definition',
        question: 'What is: "the regular beating of the heart that you can feel on your wrist or neck"?',
        options: ['pulse', 'buzz', 'beep', 'consciousness'],
        correctAnswer: 'pulse',
        explanation: '"pulse" is the regular heartbeat felt on the wrist or neck (النبض).'
      },
      {
        id: 'q5',
        type: 'definition',
        question: 'Which word means: "giving a feeling of satisfaction or pleasure because you helped someone or achieved something good"?',
        options: ['heartbreaking', 'rewarding', 'critical', 'anxious'],
        correctAnswer: 'rewarding',
        explanation: '"rewarding" describes something that brings deep satisfaction or fulfillment (مجزٍ أو ممتع).'
      },
      {
        id: 'q6',
        type: 'definition',
        question: 'What is: "a set period of time that a person works (especially in hospitals, factories, etc.)"?',
        options: ['shift', 'career', 'duty', 'rollercoaster'],
        correctAnswer: 'shift',
        explanation: '"shift" refers to a scheduled work period, like Nurse Sarah\'s 12-hour shift (مناوبة عمل أو وردية).'
      },
      {
        id: 'q7',
        type: 'definition',
        question: 'Who are: "medical professionals who give emergency care and take people to hospital by ambulance"?',
        options: ['surgeons', 'paramedics', 'lifeguards', 'operators'],
        correctAnswer: 'paramedics',
        explanation: '"paramedics" are emergency medical specialists on ambulances (مسعفون).'
      },
      {
        id: 'q8',
        type: 'definition',
        question: 'Which adjective means: "very sad or upsetting"?',
        options: ['heartbreaking', 'rewarding', 'fulfilled', 'typical'],
        correctAnswer: 'heartbreaking',
        explanation: '"heartbreaking" describes extremely sad or distressing situations (محزن أو مفجع).'
      },
      {
        id: 'q9',
        type: 'definition',
        question: 'What does it mean to: "fall down suddenly, usually because of illness or weakness"?',
        options: ['relieve', 'collapse', 'administer', 'regain'],
        correctAnswer: 'collapse',
        explanation: '"collapse" means to fall down suddenly due to faintness, illness, or weakness (ينهار).'
      },
      {
        id: 'q10',
        type: 'definition',
        question: 'Which word represents: "the state of being awake and aware of what is happening around you"?',
        options: ['consciousness', 'satisfaction', 'confusion', 'condition'],
        correctAnswer: 'consciousness',
        explanation: '"consciousness" is awareness of one\'s surroundings and self (الوعي والإدراك).'
      },
      {
        id: 'q11',
        type: 'definition',
        question: 'What word means: "care or notice given to someone or something"?',
        options: ['attention', 'procedure', 'progress', 'quality'],
        correctAnswer: 'attention',
        explanation: '"attention" means giving care, notice, or mental focus to someone (انتباه / اهتمام).'
      },
      {
        id: 'q12',
        type: 'definition',
        question: 'Which term means: "the sound of many people talking or machines working"?',
        options: ['buzz', 'alarm', 'beep', 'disorder'],
        correctAnswer: 'buzz',
        explanation: '"buzz" is the continuous sound of bustling activity, voices, or equipment (صوت طنين / ضجيج النشاط).'
      },
      {
        id: 'q13',
        type: 'definition',
        question: 'What is: "the front part of the body between the neck and the stomach"?',
        options: ['chest', 'wrist', 'pulse', 'chart'],
        correctAnswer: 'chest',
        explanation: '"chest" is the anatomical area between the neck and the stomach (صدر).'
      },
      {
        id: 'q14',
        type: 'definition',
        question: 'Which verb means to: "take or hold something quickly and strongly"?',
        options: ['grab', 'relieve', 'administer', 'perform'],
        correctAnswer: 'grab',
        explanation: '"grab" means to seize or hold something abruptly with force (يمسك بقوة / ينتزع / يخطف).'
      },
      {
        id: 'q15',
        type: 'definition',
        question: 'What is: "a situation or experience with many ups and downs, often emotional"?',
        options: ['rollercoaster', 'shift', 'career', 'situation'],
        correctAnswer: 'rollercoaster',
        explanation: '"rollercoaster" metaphorically represents volatile periods of positive and negative emotions (الأفعوانية / تقلبات ومواقف متغيرة).'
      },
      {
        id: 'q16',
        type: 'definition',
        question: 'What term defines: "a person who has been hurt, killed, or affected by something bad like an accident or a crime"?',
        options: ['victim', 'paramedic', 'lifeguard', 'colleague'],
        correctAnswer: 'victim',
        explanation: '"victim" is an individual suffering injury, harm, or death due to an accident or crime (ضحية).'
      }
    ],
    collocationsQuiz: [
      {
        id: 'col-1',
        type: 'multiple-choice',
        question: 'When the car accident occurred, the victim was _______ to the emergency department.',
        options: ['rushed in', 'kicked off', 'broken out', 'fallen down'],
        correctAnswer: 'rushed in',
        explanation: '"be rushed in" means to be brought quickly to an emergency department (يُنقل على عجل إلى).'
      },
      {
        id: 'col-2',
        type: 'multiple-choice',
        question: 'When the pedestrian collapsed on the street, someone immediately called _______ an ambulance.',
        options: ['for', 'to', 'at', 'with'],
        correctAnswer: 'for',
        explanation: '"call for an ambulance" means to request an emergency ambulance (يتصل بالإسعاف / يطلب سيارة إسعاف).'
      },
      {
        id: 'col-3',
        type: 'multiple-choice',
        question: 'Paramedics are specially trained to give emergency _______ before reaching the hospital.',
        options: ['care', 'pain', 'shift', 'period'],
        correctAnswer: 'care',
        explanation: '"give emergency care" means to provide immediate medical assistance (يقدم الرعاية الطارئة).'
      },
      {
        id: 'col-4',
        type: 'multiple-choice',
        question: 'Sarah is such a devoted nurse; she always goes the extra _______ to comfort her patients.',
        options: ['mile', 'hour', 'way', 'step'],
        correctAnswer: 'mile',
        explanation: '"go the extra mile" is an idiom meaning to make a special extra effort (يبذل جهداً إضافياً ويتفانى).'
      },
      {
        id: 'col-5',
        type: 'multiple-choice',
        question: 'The head nurse had to administer the prescription medication _______ the elderly patient.',
        options: ['to', 'with', 'for', 'about'],
        correctAnswer: 'to',
        explanation: '"administer (something) to (someone)" is the correct preposition pattern (يعطي دواءً لـ).'
      },
      {
        id: 'col-6',
        type: 'multiple-choice',
        question: 'Doctors and nurses must always be fully aware _______ potential medication side effects.',
        options: ['of', 'about', 'with', 'at'],
        correctAnswer: 'of',
        explanation: '"aware of" means having knowledge or conscious perception of something (على علم بـ / مدرك لـ).'
      },
      {
        id: 'col-7',
        type: 'multiple-choice',
        question: 'Fire alarms started ringing loudly after a small fire broke _______ in the basement.',
        options: ['out', 'in', 'up', 'down'],
        correctAnswer: 'out',
        explanation: '"break out" means to start suddenly, especially a war or fire (تندلع حرب أو حريق).'
      },
      {
        id: 'col-8',
        type: 'multiple-choice',
        question: 'The emergency ward was buzzing _______ nonstop medical activity all night long.',
        options: ['with', 'by', 'from', 'in'],
        correctAnswer: 'with',
        explanation: '"buzz with" means full of noise, excitement, or activity (يمتلئ بـ / يعج بالنشاط والحركة).'
      },
      {
        id: 'col-9',
        type: 'multiple-choice',
        question: 'The patient complained that he had a sharp _______ in his lower back.',
        options: ['pain', 'ache', 'wound', 'hurt'],
        correctAnswer: 'pain',
        explanation: '"have a sharp pain" is the standard medical collocation for acute discomfort (يشعر بألم حاد).'
      },
      {
        id: 'col-10',
        type: 'multiple-choice',
        question: 'Before leaving the ward, Sarah made _______ that all intravenous drips were properly set.',
        options: ['sure', 'certainly', 'safe', 'clear'],
        correctAnswer: 'sure',
        explanation: '"make sure" means to verify or ensure something is correct (يتأكد من / يتحقق).'
      },
      {
        id: 'col-11',
        type: 'multiple-choice',
        question: 'Physical therapy is hard, but as the old saying goes: "No _______, no gain."',
        options: ['pain', 'work', 'sweat', 'loss'],
        correctAnswer: 'pain',
        explanation: '"No pain, no gain" is a famous proverb meaning suffering is necessary for progress (لا ألم، لا ربح).'
      },
      {
        id: 'col-12',
        type: 'multiple-choice',
        question: 'During their final school year, students prepare _______ the tough academic challenges ahead.',
        options: ['for', 'to', 'about', 'from'],
        correctAnswer: 'for',
        explanation: '"prepare for (challenges ahead)" means to get ready for upcoming obstacles (يستعد للتحديات المقبلة).'
      },
      {
        id: 'col-13',
        type: 'multiple-choice',
        question: 'Sarah chose nursing because she has always had a passion to care _______ sick people.',
        options: ['for', 'about', 'after', 'with'],
        correctAnswer: 'for',
        explanation: '"care for" means to look after and attend to the needs of someone (يعتني بـ / يهتم بـ).'
      },
      {
        id: 'col-14',
        type: 'multiple-choice',
        question: 'The elderly gentleman felt dizzy and started to fall _______ on the slippery floor.',
        options: ['down', 'off', 'out', 'away'],
        correctAnswer: 'down',
        explanation: '"fall down" means to collapse or drop to the ground (يسقط أو يقع أرضاً).'
      },
      {
        id: 'col-15',
        type: 'multiple-choice',
        question: 'After the critical surgery was successful, the team experienced a deep feeling _______ relief.',
        options: ['of', 'about', 'from', 'with'],
        correctAnswer: 'of',
        explanation: '"feeling of" is the standard preposition combination for emotions and sensations (شعور بـ / إحساس بـ).'
      },
      {
        id: 'col-16',
        type: 'multiple-choice',
        question: 'During intensive operations, surgeons must strictly focus _______ every single detail.',
        options: ['on', 'in', 'at', 'with'],
        correctAnswer: 'on',
        explanation: '"focus on" means to concentrate attention or effort on something (يركز على).'
      },
      {
        id: 'col-17',
        type: 'multiple-choice',
        question: 'Even during the most stressful emergencies, good nurses remain _______ and composed.',
        options: ['calm', 'quietly', 'silence', 'peace'],
        correctAnswer: 'calm',
        explanation: '"remain calm" is a collocation meaning to stay peaceful and not panic (يحافظ على الهدوء والاتزان).'
      },
      {
        id: 'col-18',
        type: 'multiple-choice',
        question: 'The antibiotic treatment must be taken over a _______ period of time to be effective.',
        options: ['set', 'fix', 'placed', 'put'],
        correctAnswer: 'set',
        explanation: '"a set period of time" means a predetermined or fixed duration (فترة زمنية محددة).'
      },
      {
        id: 'col-19',
        type: 'multiple-choice',
        question: 'As soon as the trauma alarm rang, the whole medical team sprang _______ action.',
        options: ['into', 'for', 'onto', 'over'],
        correctAnswer: 'into',
        explanation: '"spring into action" is an idiom meaning to quickly begin doing what is required (يبدأ التدخل فوراً / يهب للعمل).'
      },
      {
        id: 'col-20',
        type: 'multiple-choice',
        question: 'Working together in the ICU proves that "teamwork makes the _______ work."',
        options: ['dream', 'shift', 'goal', 'plan'],
        correctAnswer: 'dream',
        explanation: '"Teamwork makes the dream work" is a popular idiom celebrating collaboration (العمل الجماعي يحقق الحلم).'
      },
      {
        id: 'col-21',
        type: 'multiple-choice',
        question: 'Once Sarah verified the patient was comfortable, she was ready to move _______ to the next room.',
        options: ['on', 'off', 'out', 'up'],
        correctAnswer: 'on',
        explanation: '"move on" means to proceed to the next activity, person, or location (يمضي قُدُماً / ينتقل للمرحلة التالية).'
      },
      {
        id: 'col-22',
        type: 'multiple-choice',
        question: 'Mr. Ramy is gradually recovering _______ the complex surgical operation.',
        options: ['from', 'of', 'with', 'about'],
        correctAnswer: 'from',
        explanation: '"recover from" is the preposition used for getting better after illness or surgery (يتعافى من).'
      },
      {
        id: 'col-23',
        type: 'multiple-choice',
        question: 'On her way home after a 12-hour shift, Sarah likes to reflect _______ everything that happened.',
        options: ['on', 'at', 'in', 'of'],
        correctAnswer: 'on',
        explanation: '"reflect on" means to think deeply or carefully about something (يُفَكِّر في / يتأمل في أحداث).'
      },
      {
        id: 'col-24',
        type: 'multiple-choice',
        question: 'In high-pressure hospital wards, doctors and nurses heavily rely _______ each other.',
        options: ['on', 'to', 'for', 'by'],
        correctAnswer: 'on',
        explanation: '"rely on" means to depend upon someone with confidence and trust (يعتمد على / يثق في).'
      }
    ],
    fillInBlanksQuiz: [
      {
        id: 'fb-1',
        type: 'fill-in',
        question: 'Despite the severe _______ in the emergency ward, the doctors remained calm.',
        options: ['chaos', 'pulse', 'career', 'first aid'],
        correctAnswer: 'chaos',
        explanation: '"chaos" (فوضى عارمة) fits the context of confusion and disorder in an emergency.'
      },
      {
        id: 'fb-2',
        type: 'fill-in',
        question: 'Sarah\'s main morning duty is _______ medication to all registered patients.',
        options: ['administering', 'collapsing', 'buzzing', 'beeping'],
        correctAnswer: 'administering',
        explanation: '"administering medication" (إعطاء الدواء) is the medical duty of nurses.'
      },
      {
        id: 'fb-3',
        type: 'fill-in',
        question: 'A car crash _______ was immediately taken to the ICU for urgent care.',
        options: ['victim', 'paramedic', 'lifeguard', 'operator'],
        correctAnswer: 'victim',
        explanation: '"victim" (ضحية) refers to a person injured in an accident.'
      },
      {
        id: 'fb-4',
        type: 'fill-in',
        question: 'The medical monitors started _______ rapidly to alert the team.',
        options: ['beeping', 'resting', 'grabbing', 'shifting'],
        correctAnswer: 'beeping',
        explanation: '"beeping" (إطلاق صفير) describes the sound medical electronic monitors make.'
      },
      {
        id: 'fb-5',
        type: 'fill-in',
        question: 'The paramedic quickly pressed his fingers to check the unconscious man\'s _______.',
        options: ['pulse', 'career', 'procedure', 'detail'],
        correctAnswer: 'pulse',
        explanation: '"pulse" (النبض) is checked to see if the heart is still beating.'
      },
      {
        id: 'fb-6',
        type: 'fill-in',
        question: 'Seeing the patient recover and smile was a deeply _______ moment for Sarah.',
        options: ['rewarding', 'heartbreaking', 'critical', 'anxious'],
        correctAnswer: 'rewarding',
        explanation: '"rewarding" (مجزٍ ومُرضٍ) describes a fulfilling and positive experience.'
      }
    ],
    sentencePuzzles: [
      {
        id: 'sp-1',
        fullSentence: 'Teamwork makes the dream work.',
        chunks: ['Teamwork', 'makes', 'the dream', 'work.'],
        arabicTranslation: 'العمل الجماعي يحقق النجاح.'
      },
      {
        id: 'sp-2',
        fullSentence: 'Nurse Sarah kicks off her day with strong coffee.',
        chunks: ['Nurse Sarah', 'kicks off', 'her day', 'with strong coffee.'],
        arabicTranslation: 'تبدأ الممرضة سارة يومها بفنجان قهوة مركز.'
      },
      {
        id: 'sp-3',
        fullSentence: 'Sarah assists doctors and administers medication to patients.',
        chunks: ['Sarah assists doctors', 'and administers', 'medication', 'to patients.'],
        arabicTranslation: 'تساعد سارة الأطباء وتعطي الدواء للمرضى.'
      },
      {
        id: 'sp-4',
        fullSentence: 'One elderly patient has been recovering from surgery.',
        chunks: ['One elderly patient', 'has been', 'recovering', 'from surgery.'],
        arabicTranslation: 'يتعافى مريض مسن من عملية جراحية.'
      },
      {
        id: 'sp-5',
        fullSentence: 'Nursing is a never-ending emotional rollercoaster.',
        chunks: ['Nursing is', 'a never-ending', 'emotional', 'rollercoaster.'],
        arabicTranslation: 'التمريض تقلبات ومواقف مشاعر مستمرة.'
      }
    ],
    writingLesson: UNIT_1_WRITING_LESSON
  },
  {
    id: 'unit-1-lessons-3-4',
    unitNumber: 1,
    partNumber: 2,
    lessonName: 'Lessons 3 & 4',
    title: 'Unit 1: Lessons 3 & 4',
    subtitle: 'A Night Shift in the ER - نوبة طوارئ ليلية في المستشفى',
    isAvailable: true,
    readingPassage: {
      title: '“A Night Shift in the Emergency Room”',
      paragraphs: [
        `Last night, paramedics rushed in with a man injured in a car crash. He had broken his leg before arrival, and his face was covered in blood. Nurses quickly took him for X-rays while Dr. Maha prepared to **stitch** a deep cut on his **forehead**. “Teamwork saved him,” said the emergency room "ER" director proudly.`,
        `Outside, it was **raining cats and dogs** as Dr. Basem ran into the hospital, soaked to the skin. Inside, the emergency room was in full chaos—patients **groaning**, nurses hurrying, and machines beeping non-stop. In one corner, a teenager with a broken arm **moaned** quietly. A construction worker, pale as a ghost, **clutched** his bleeding hand, trying not to cry out.`,
        `Nurse Noura, calm under pressure, gave clear and confident instructions. “Prepare the sterile equipment and state its condition before use”, she ordered.`,
        `Suddenly, the ER doors flew open. A panicked mother rushed in, holding her toddler. “He’s not responding!”, she shouted. The child had **swallowed** a coin. Without hesitation, the team jumped into action. Using a flexible **scope**, they carefully removed the coin. Moments later, the child opened his eyes. The mother wept with relief and gratitude. Around her, staff members smiled—some hiding their own tears.`,
        `As the sun began to rise, calm slowly returned. Dr. Basem sat down, exhausted. Around him, the team cleaned up and checked medical charts. Another night filled with fear, **urgency**, and life-saving teamwork had come to an end.`
      ],
      keyVocabHighlightIds: [
        'stitch', 'forehead', 'raining-cats-and-dogs', 'groaning',
        'moaned', 'clutched', 'swallowed', 'scope', 'urgency'
      ]
    },
    keyVocabulary: [
      {
        id: 'clutch',
        word: 'clutch',
        partOfSpeech: 'v (ed)',
        arabicMeaning: 'يقبض / يمسك بقوة',
        definition: 'to hold something tightly because you do not want to lose it',
        exampleSentence: 'A construction worker, pale as a ghost, clutched his bleeding hand.',
        category: 'key'
      },
      {
        id: 'forehead',
        word: 'forehead',
        partOfSpeech: 'n',
        arabicMeaning: 'جبهة / جبين',
        definition: 'the part of your face above your eyes and below your hair',
        exampleSentence: 'Dr. Maha prepared to stitch a deep cut on his forehead.',
        category: 'key'
      },
      {
        id: 'groan',
        word: 'groan',
        partOfSpeech: 'n / v (ed)',
        arabicMeaning: 'أنين / يئن / يتألم',
        definition: 'to make a long deep sound because you are in pain, upset, or disappointed',
        exampleSentence: 'Patients were groaning in pain after the severe accident.',
        category: 'key'
      },
      {
        id: 'moan',
        word: 'moan',
        partOfSpeech: 'v (ed)',
        arabicMeaning: 'يتأوه / يتألم / يتذمر',
        definition: 'to make a long deep sound, usually because you are unhappy or suffering',
        exampleSentence: 'In one corner, a teenager with a broken arm moaned quietly.',
        category: 'key'
      },
      {
        id: 'scope',
        word: 'scope',
        partOfSpeech: 'n',
        arabicMeaning: 'منظار طبي / مجال',
        definition: 'an instrument for looking through or watching something with',
        exampleSentence: 'Using a flexible scope, the doctors carefully removed the swallowed coin.',
        category: 'key'
      },
      {
        id: 'stitch',
        word: 'stitch',
        partOfSpeech: 'n / v (ed)',
        arabicMeaning: 'غرزة / يخيط (جرحاً)',
        definition: 'a piece of special thread which has been used to sew the edges of a wound together',
        exampleSentence: 'The surgeon had to stitch the deep cut to allow it to heal.',
        category: 'key'
      },
      {
        id: 'swallow',
        word: 'swallow',
        partOfSpeech: 'n / v (ed)',
        arabicMeaning: 'ابتلاع / يبتلع',
        definition: 'to make food or drink go down your throat and towards your stomach',
        exampleSentence: 'The toddler had swallowed a small metal coin and could not breathe easily.',
        category: 'key'
      },
      {
        id: 'urgency',
        word: 'urgency',
        partOfSpeech: 'n',
        arabicMeaning: 'إلحاح / حالة طارئة',
        definition: 'the need to deal with something immediately because it is very important',
        exampleSentence: 'Another night filled with fear, urgency, and life-saving teamwork had come to an end.',
        category: 'key'
      }
    ],
    additionalVocabulary: [
      { id: 'appointment', word: 'appointment', partOfSpeech: 'n', arabicMeaning: 'موعد', definition: 'an arrangement to meet someone at a particular time and place', category: 'reading_listening' },
      { id: 'atmosphere', word: 'atmosphere', partOfSpeech: 'n', arabicMeaning: 'الغلاف الجوي / الجو العام', definition: 'the overall tone, mood, or environment in a place', category: 'reading_listening' },
      { id: 'blood', word: 'blood', partOfSpeech: 'n', arabicMeaning: 'دم', definition: 'the red liquid that circulates in the arteries and veins', category: 'reading_listening' },
      { id: 'choking', word: 'choking', partOfSpeech: 'n', arabicMeaning: 'اختناق / خانق', definition: 'severe difficulty in breathing because of a constricted throat', category: 'reading_listening' },
      { id: 'clinic', word: 'clinic', partOfSpeech: 'n', arabicMeaning: 'عيادة', definition: 'an establishment or hospital department where outpatients are given medical treatment', category: 'reading_listening' },
      { id: 'coin', word: 'coin', partOfSpeech: 'n', arabicMeaning: 'عملة معدنية', definition: 'a flat, typically round piece of metal with an official stamp, used as money', category: 'reading_listening' },
      { id: 'comment', word: 'comment', partOfSpeech: 'n', arabicMeaning: 'تعليق', definition: 'a verbal or written remark expressing an opinion or reaction', category: 'reading_listening' },
      { id: 'comfort', word: 'comfort', partOfSpeech: 'n / v (ed)', arabicMeaning: 'راحة / يريح', definition: 'a state of physical ease and freedom from pain or constraint', category: 'reading_listening' },
      { id: 'compassion', word: 'compassion', partOfSpeech: 'n', arabicMeaning: 'شفقة / رحمة', definition: 'sympathetic pity and concern for the sufferings or misfortunes of others', category: 'reading_listening' },
      { id: 'confident', word: 'confident', partOfSpeech: 'adj', arabicMeaning: 'واثق', definition: 'feeling or showing certainty about something', category: 'reading_listening' },
      { id: 'construction', word: 'construction', partOfSpeech: 'n', arabicMeaning: 'تشييد / بناء', definition: 'the building of something, typically a large structure', category: 'reading_listening' },
      { id: 'cough', word: 'cough', partOfSpeech: 'n / v (ed)', arabicMeaning: 'سعال / يسعل', definition: 'expel air from the lungs with a sudden sharp sound', category: 'reading_listening' },
      { id: 'crowded', word: 'crowded', partOfSpeech: 'adj', arabicMeaning: 'مزدحم', definition: 'full of people, leaving little or no room for movement', category: 'reading_listening' },
      { id: 'culture', word: 'culture', partOfSpeech: 'n', arabicMeaning: 'ثقافة', definition: 'the arts and other manifestations of human intellectual achievement', category: 'reading_listening' },
      { id: 'dedication', word: 'dedication', partOfSpeech: 'n', arabicMeaning: 'تفانٍ / إخلاص', definition: 'the quality of being committed to a task or purpose', category: 'reading_listening' },
      { id: 'director', word: 'director', partOfSpeech: 'n', arabicMeaning: 'مدير / مخرج', definition: 'a person in charge of an organization, department, or medical facility', category: 'reading_listening' },
      { id: 'emotion', word: 'emotion', partOfSpeech: 'n', arabicMeaning: 'عاطفة', definition: 'a strong feeling deriving from one\'s circumstances or relationships', category: 'reading_listening' },
      { id: 'equipment', word: 'equipment', partOfSpeech: 'n', arabicMeaning: 'معدات', definition: 'the necessary items for a particular purpose or medical procedure', category: 'reading_listening' },
      { id: 'exhausted', word: 'exhausted', partOfSpeech: 'adj', arabicMeaning: 'مرهق', definition: 'completely drained of physical or mental energy', category: 'reading_listening' },
      { id: 'flexible', word: 'flexible', partOfSpeech: 'adj', arabicMeaning: 'مرن', definition: 'capable of bending easily without breaking', category: 'reading_listening' },
      { id: 'gratitude', word: 'gratitude', partOfSpeech: 'n', arabicMeaning: 'امتنان / اعتراف بالجميل', definition: 'the quality of being thankful; readiness to show appreciation', category: 'reading_listening' },
      { id: 'hesitation', word: 'hesitation', partOfSpeech: 'n', arabicMeaning: 'تردد', definition: 'the action of pausing before saying or doing something', category: 'reading_listening' },
      { id: 'hurry', word: 'hurry', partOfSpeech: 'v (ied)', arabicMeaning: 'يسرع', definition: 'move or act with great haste', category: 'reading_listening' },
      { id: 'ignore', word: 'ignore', partOfSpeech: 'v (d)', arabicMeaning: 'يتجاهل', definition: 'refuse to take notice of or acknowledge', category: 'reading_listening' },
      { id: 'instructions', word: 'instructions', partOfSpeech: 'n', arabicMeaning: 'تعليمات', definition: 'detailed information telling how something should be done or used', category: 'reading_listening' },
      { id: 'life-saving', word: 'life-saving', partOfSpeech: 'adj', arabicMeaning: 'منقذ للحياة', definition: 'acting or capable of saving a person\'s life', category: 'reading_listening' },
      { id: 'miserable', word: 'miserable', partOfSpeech: 'adj', arabicMeaning: 'بائس', definition: 'wretchedly unhappy or uncomfortable', category: 'reading_listening' },
      { id: 'non-stop', word: 'non-stop', partOfSpeech: 'adv', arabicMeaning: 'بدون توقف', definition: 'continuing without pause or interruption', category: 'reading_listening' },
      { id: 'panicked', word: 'panicked', partOfSpeech: 'adj', arabicMeaning: 'مذعور', definition: 'feeling sudden uncontrollable fear or anxiety', category: 'reading_listening' },
      { id: 'passion', word: 'passion', partOfSpeech: 'n', arabicMeaning: 'شغف', definition: 'an intense enthusiasm or desire for something', category: 'reading_listening' },
      { id: 'prescription', word: 'prescription', partOfSpeech: 'n', arabicMeaning: 'وصفة طبية', definition: 'an instruction written by a medical practitioner authorizing medicine', category: 'reading_listening' },
      { id: 'pressure', word: 'pressure', partOfSpeech: 'n', arabicMeaning: 'ضغط', definition: 'continuous physical force or stressful demands upon someone', category: 'reading_listening' },
      { id: 'relief', word: 'relief', partOfSpeech: 'n', arabicMeaning: 'راحة / طمأنينة', definition: 'a feeling of reassurance and relaxation following release from anxiety', category: 'reading_listening' },
      { id: 'remind', word: 'remind', partOfSpeech: 'v (ed)', arabicMeaning: 'يُذكّر', definition: 'cause someone to remember someone or something', category: 'reading_listening' },
      { id: 'remove', word: 'remove', partOfSpeech: 'v (d)', arabicMeaning: 'يزيل', definition: 'take off or take away from the position occupied', category: 'reading_listening' },
      { id: 'respond', word: 'respond', partOfSpeech: 'v (ed)', arabicMeaning: 'يستجيب', definition: 'say something in reply or react favorably to medical treatment', category: 'reading_listening' },
      { id: 'sacrifice', word: 'sacrifice', partOfSpeech: 'n / v (d)', arabicMeaning: 'تضحية / يضحي', definition: 'an act of giving up something valued for the sake of something else', category: 'reading_listening' },
      { id: 'session', word: 'session', partOfSpeech: 'n', arabicMeaning: 'جلسة', definition: 'a period devoted to a particular activity or medical treatment', category: 'reading_listening' },
      { id: 'sore-throat', word: 'sore throat', partOfSpeech: 'n', arabicMeaning: 'التهاب الحلق', definition: 'a condition marked by pain in the throat, typically caused by inflammation', category: 'reading_listening' },
      { id: 'staff', word: 'staff', partOfSpeech: 'n', arabicMeaning: 'طاقم عمل', definition: 'all the people employed by a particular organization or hospital', category: 'reading_listening' },
      { id: 'state', word: 'state', partOfSpeech: 'v (d)', arabicMeaning: 'يوضح', definition: 'express, declare, or specify clearly', category: 'reading_listening' },
      { id: 'sterile', word: 'sterile', partOfSpeech: 'adj', arabicMeaning: 'معقم', definition: 'free from bacteria or other living microorganisms; totally clean', category: 'reading_listening' },
      { id: 'stethoscope', word: 'stethoscope', partOfSpeech: 'n', arabicMeaning: 'سماعة طبية', definition: 'a medical instrument for listening to the action of someone\'s heart or breathing', category: 'reading_listening' },
      { id: 'symptoms', word: 'symptoms', partOfSpeech: 'n', arabicMeaning: 'أعراض (مرض)', definition: 'physical or mental features indicating a condition of disease', category: 'reading_listening' },
      { id: 'teenager', word: 'teenager', partOfSpeech: 'n', arabicMeaning: 'مراهق', definition: 'a person aged between 13 and 19 years', category: 'reading_listening' },
      { id: 'temperature', word: 'temperature', partOfSpeech: 'n', arabicMeaning: 'درجة حرارة', definition: 'the degree of internal heat of a person\'s body', category: 'reading_listening' },
      { id: 'toddler', word: 'toddler', partOfSpeech: 'n', arabicMeaning: 'طفل صغير', definition: 'a young child who is just beginning to walk', category: 'reading_listening' },
      { id: 'unresponsive', word: 'unresponsive', partOfSpeech: 'adj', arabicMeaning: 'غير مستجيب', definition: 'not responding to stimuli, treatment, or questions', category: 'reading_listening' },
      { id: 'unwelcome', word: 'unwelcome', partOfSpeech: 'adj', arabicMeaning: 'غير مرغوب فيه', definition: 'not wanted or desirable; unpleasant', category: 'reading_listening' },
      { id: 'weep', word: 'weep', partOfSpeech: 'v', arabicMeaning: 'يبكي', definition: 'shed tears, typically because of grief, sadness, or overwhelming relief', category: 'reading_listening' },
      { id: 'wound', word: 'wound', partOfSpeech: 'n', arabicMeaning: 'جرح / إصابة', definition: 'an injury to living tissue caused by a cut, blow, or impact', category: 'reading_listening' },
      { id: 'x-ray', word: 'X-ray', partOfSpeech: 'n', arabicMeaning: 'الأشعة السينية', definition: 'a photographic or digital image of the internal composition of a part of the body', category: 'reading_listening' }
    ],
    phrasesAndExpressions: [
      { id: 'p2-1', phrase: 'at the same time', arabicMeaning: 'في نفس الوقت', type: 'expression' },
      { id: 'p2-2', phrase: 'bring hope and healing', arabicMeaning: 'يجلب الأمل والشفاء', type: 'expression' },
      { id: 'p2-3', phrase: 'fly open', arabicMeaning: 'يفتح بشدة بشكل مفاجئ', type: 'expression' },
      { id: 'p2-4', phrase: 'have a severe viral cold', arabicMeaning: 'يُصاب بنزلة برد فيروسية شديدة', type: 'expression' },
      { id: 'p2-5', phrase: 'It rained cats and dogs', arabicMeaning: 'أمطرت بشدة وغزارة', type: 'idiom' },
      { id: 'p2-6', phrase: 'angry at', arabicMeaning: 'غاضب من (شخص)', type: 'preposition' },
      { id: 'p2-7', phrase: 'covered in', arabicMeaning: 'مغطى بـ', type: 'preposition' },
      { id: 'p2-8', phrase: 'jump into action', arabicMeaning: 'ينطلق للعمل فوراً', type: 'idiom' },
      { id: 'p2-9', phrase: 'make an appointment', arabicMeaning: 'يحجز موعداً', type: 'expression' },
      { id: 'p2-10', phrase: 'make quick decisions', arabicMeaning: 'يتخذ قرارات سريعة', type: 'expression' },
      { id: 'p2-11', phrase: 'miss meals or sleep', arabicMeaning: 'يفوت الوجبات أو النوم', type: 'expression' },
      { id: 'p2-12', phrase: 'pale as a ghost', arabicMeaning: 'شاحب كالشبح (شاحب للغاية)', type: 'idiom' },
      { id: 'p2-13', phrase: 'cry out', arabicMeaning: 'يصرخ بصوت عالٍ', type: 'preposition' },
      { id: 'p2-14', phrase: 'dream of', arabicMeaning: 'يحلم بـ', type: 'preposition' },
      { id: 'p2-15', phrase: 'save lives', arabicMeaning: 'ينقذ الأرواح', type: 'expression' },
      { id: 'p2-16', phrase: 'soaked to the skin', arabicMeaning: 'مبلل كلياً', type: 'idiom' },
      { id: 'p2-17', phrase: 'try their best', arabicMeaning: 'يبذل قصارى جهده', type: 'expression' },
      { id: 'p2-18', phrase: 'weep with relief', arabicMeaning: 'يبكي من الفرحة والارتياح', type: 'expression' },
      { id: 'p2-19', phrase: 'fascinated by', arabicMeaning: 'مفتون بـ / معجب بـ', type: 'preposition' },
      { id: 'p2-20', phrase: 'in pain', arabicMeaning: 'في ألم ومعاناة', type: 'preposition' },
      { id: 'p2-21', phrase: 'take over', arabicMeaning: 'يتولى مسئولية أو قيادة', type: 'preposition' }
    ],
    definitionsQuiz: [
      {
        id: 'u2-q1',
        type: 'definition',
        question: 'What is: "a piece of special thread which has been used to sew the edges of a wound together"?',
        options: ['stitch', 'scope', 'forehead', 'bandage'],
        correctAnswer: 'stitch',
        explanation: '"stitch" is the medical thread used by surgeons to close wounds (غرزة طبية).'
      },
      {
        id: 'u2-q2',
        type: 'definition',
        question: 'Which anatomical term means: "the part of your face above your eyes and below your hair"?',
        options: ['forehead', 'wrist', 'chest', 'throat'],
        correctAnswer: 'forehead',
        explanation: '"forehead" is the upper facial area between the eyes and hairline (جبهة / جبين).'
      },
      {
        id: 'u2-q3',
        type: 'definition',
        question: 'What verb means: "to make a long deep sound because you are in pain, upset, or disappointed"?',
        options: ['groan', 'cough', 'swallow', 'clutch'],
        correctAnswer: 'groan',
        explanation: '"groan" means to utter a low deep moan of pain or grief (يئن / يتألم).'
      },
      {
        id: 'u2-q4',
        type: 'definition',
        question: 'Which word means: "to make a long deep sound, usually because you are unhappy or suffering"?',
        options: ['moan', 'clutch', 'stitch', 'state'],
        correctAnswer: 'moan',
        explanation: '"moan" is a sound of suffering, discomfort, or complaint (يتأوه / يتألم).'
      },
      {
        id: 'u2-q5',
        type: 'definition',
        question: 'What does it mean: "to hold something tightly because you do not want to lose it"?',
        options: ['clutch', 'swallow', 'weep', 'respond'],
        correctAnswer: 'clutch',
        explanation: '"clutch" means to grasp or hold tightly with hand or fingers (يقبض / يمسك بقوة).'
      },
      {
        id: 'u2-q6',
        type: 'definition',
        question: 'Which verb is defined as: "to make food or drink go down your throat and towards your stomach"?',
        options: ['swallow', 'choke', 'cough', 'breathe'],
        correctAnswer: 'swallow',
        explanation: '"swallow" is the action of ingesting food or liquid down the throat (يبتلع).'
      },
      {
        id: 'u2-q7',
        type: 'definition',
        question: 'What instrument is: "an instrument for looking through or watching something with"?',
        options: ['scope', 'stethoscope', 'needle', 'thermometer'],
        correctAnswer: 'scope',
        explanation: '"scope" is an optical medical instrument used to view internal organs (منظار طبي).'
      },
      {
        id: 'u2-q8',
        type: 'definition',
        question: 'Which word means: "the need to deal with something immediately because it is very important"?',
        options: ['urgency', 'compassion', 'hesitation', 'dedication'],
        correctAnswer: 'urgency',
        explanation: '"urgency" refers to critical importance requiring immediate rapid action (إلحاح / حالة طارئة).'
      }
    ],
    collocationsQuiz: [
      {
        id: 'u2-col-1',
        type: 'multiple-choice',
        question: 'Outside the hospital, it was raining cats and _______ as the doctor arrived.',
        options: ['dogs', 'birds', 'frogs', 'rats'],
        correctAnswer: 'dogs',
        explanation: '"rain cats and dogs" is an idiom meaning to rain heavily (تمطر بغزارة شديدة).'
      },
      {
        id: 'u2-col-2',
        type: 'multiple-choice',
        question: 'When the emergency call came through, the rescue squad immediately jumped _______ action.',
        options: ['into', 'at', 'for', 'over'],
        correctAnswer: 'into',
        explanation: '"jump into action" means to quickly begin work or intervention (ينطلق للعمل فوراً).'
      },
      {
        id: 'u2-col-3',
        type: 'multiple-choice',
        question: 'The construction worker was pale as a _______ after losing so much blood.',
        options: ['ghost', 'sheet', 'cloud', 'wall'],
        correctAnswer: 'ghost',
        explanation: '"pale as a ghost" means looking extremely white or sickly from shock/fear (شاحب كالشبح).'
      },
      {
        id: 'u2-col-4',
        type: 'multiple-choice',
        question: 'Because of the thunderstorm, Dr. Basem arrived at the hospital soaked to the _______.',
        options: ['skin', 'bone', 'feet', 'coat'],
        correctAnswer: 'skin',
        explanation: '"soaked to the skin" means completely wet all through one\'s clothes (مبلل كلياً حتى الجلد).'
      },
      {
        id: 'u2-col-5',
        type: 'multiple-choice',
        question: 'When the child finally regained consciousness, his mother wept _______ relief.',
        options: ['with', 'of', 'from', 'in'],
        correctAnswer: 'with',
        explanation: '"weep with relief" is the collocation for crying tears of happiness or comfort (يبكي من شدة الفرح والارتياح).'
      },
      {
        id: 'u2-col-6',
        type: 'multiple-choice',
        question: 'His face and clothes were covered _______ blood following the collision.',
        options: ['in', 'at', 'to', 'for'],
        correctAnswer: 'in',
        explanation: '"covered in (blood/dust)" is the proper preposition combination (مغطى بـ).'
      },
      {
        id: 'u2-col-7',
        type: 'multiple-choice',
        question: 'The injured patient was screaming and clutching his chest _______ severe pain.',
        options: ['in', 'on', 'under', 'at'],
        correctAnswer: 'in',
        explanation: '"in pain" is the standard phrase for experiencing physical suffering (في ألم ومعاناة).'
      },
      {
        id: 'u2-col-8',
        type: 'multiple-choice',
        question: 'Young medical students are deeply fascinated _______ the complex workings of the human body.',
        options: ['by', 'with', 'about', 'to'],
        correctAnswer: 'by',
        explanation: '"fascinated by" indicates being extremely interested or attracted (مفتون بـ / معجب بـ).'
      },
      {
        id: 'u2-col-9',
        type: 'multiple-choice',
        question: 'When the senior surgeon retired, Dr. Basem was appointed to take _______ the department.',
        options: ['over', 'up', 'in', 'off'],
        correctAnswer: 'over',
        explanation: '"take over" means to assume control or leadership of a position (يتولى مسؤولية أو قيادة).'
      },
      {
        id: 'u2-col-10',
        type: 'multiple-choice',
        question: 'Suddenly, the heavy doors of the emergency room flew _______ as paramedics arrived.',
        options: ['open', 'away', 'out', 'up'],
        correctAnswer: 'open',
        explanation: '"fly open" means to open abruptly and widely (يفتح بشدة وبشكل مفاجئ).'
      },
      {
        id: 'u2-col-11',
        type: 'multiple-choice',
        question: 'The injured man tried not to cry _______ despite the sharp wound on his arm.',
        options: ['out', 'down', 'away', 'off'],
        correctAnswer: 'out',
        explanation: '"cry out" means to shout or scream loudly in pain (يصرخ بصوت عالٍ).'
      },
      {
        id: 'u2-col-12',
        type: 'multiple-choice',
        question: 'Every nurse dreams _______ making a lasting difference in patients\' lives.',
        options: ['of', 'for', 'to', 'with'],
        correctAnswer: 'of',
        explanation: '"dream of" is the standard preposition when imagining future goals (يحلم بـ).'
      },
      {
        id: 'u2-col-13',
        type: 'multiple-choice',
        question: 'Doctors often have to make quick _______ under intense hospital pressure.',
        options: ['decisions', 'questions', 'symptoms', 'instructions'],
        correctAnswer: 'decisions',
        explanation: '"make quick decisions" is the natural collocation in medicine (يتخذ قرارات سريعة).'
      },
      {
        id: 'u2-col-14',
        type: 'multiple-choice',
        question: 'The supervisor was angry _______ the staff member who neglected safety rules.',
        options: ['at', 'on', 'with', 'to'],
        correctAnswer: 'at',
        explanation: '"angry at (a person)" is the correct preposition in this context (غاضب من شخص).'
      },
      {
        id: 'u2-col-15',
        type: 'multiple-choice',
        question: 'Emergency hospital staff always try their _______ to save every single patient.',
        options: ['best', 'good', 'better', 'all'],
        correctAnswer: 'best',
        explanation: '"try their best" means to exert maximum effort (يبذل قصارى جهده).'
      },
      {
        id: 'u2-col-16',
        type: 'multiple-choice',
        question: 'During 24-hour shifts, busy medical workers often miss _______ or sleep.',
        options: ['meals', 'charts', 'scopes', 'wounds'],
        correctAnswer: 'meals',
        explanation: '"miss meals or sleep" is the phrase for skipping eating and resting (يفوت الوجبات أو النوم).'
      },
      {
        id: 'u2-col-17',
        type: 'multiple-choice',
        question: 'Compassionate nurses bring hope and _______ to people during critical times.',
        options: ['healing', 'chaos', 'urgency', 'blood'],
        correctAnswer: 'healing',
        explanation: '"bring hope and healing" is a warm phrase meaning offering comfort and cure (يجلب الأمل والشفاء).'
      },
      {
        id: 'u2-col-18',
        type: 'multiple-choice',
        question: 'Before seeing the doctor at the clinic, you must make an _______ with the receptionist.',
        options: ['appointment', 'atmosphere', 'emotion', 'X-ray'],
        correctAnswer: 'appointment',
        explanation: '"make an appointment" means to schedule a visit in advance (يحجز موعداً).'
      },
      {
        id: 'u2-col-19',
        type: 'multiple-choice',
        question: 'The patient stayed home because he had a severe viral _______.',
        options: ['cold', 'scope', 'temperature', 'wound'],
        correctAnswer: 'cold',
        explanation: '"have a severe viral cold" describes suffering from an acute flu/cold (يُصاب بنزلة برد فيروسية شديدة).'
      },
      {
        id: 'u2-col-20',
        type: 'multiple-choice',
        question: 'Paramedics and ER trauma doctors work tirelessly to save _______.',
        options: ['lives', 'appointments', 'coins', 'stitches'],
        correctAnswer: 'lives',
        explanation: '"save lives" is the primary collocation for emergency medical personnel (ينقذ الأرواح).'
      },
      {
        id: 'u2-col-21',
        type: 'multiple-choice',
        question: 'In modern hospitals, monitors track pulse and oxygen levels at the _______ time.',
        options: ['same', 'equal', 'exact', 'single'],
        correctAnswer: 'same',
        explanation: '"at the same time" means simultaneously (في نفس الوقت).'
      }
    ],
    fillInBlanksQuiz: [
      {
        id: 'u2-fb-1',
        type: 'fill-in',
        question: 'Dr. Maha quickly prepared to _______ the deep cut on the man\'s face.',
        options: ['stitch', 'swallow', 'groan', 'clutch'],
        correctAnswer: 'stitch',
        explanation: '"stitch" (يخيط جرحاً) is required to close a deep laceration.'
      },
      {
        id: 'u2-fb-2',
        type: 'fill-in',
        question: 'The child accidentally _______ a coin, causing severe choking.',
        options: ['swallowed', 'stitched', 'clutched', 'moaned'],
        correctAnswer: 'swallowed',
        explanation: '"swallowed" (ابتلع) caused the coin to get lodged in the child\'s throat.'
      },
      {
        id: 'u2-fb-3',
        type: 'fill-in',
        question: 'Doctors used a long, flexible _______ to look inside and retrieve the object.',
        options: ['scope', 'forehead', 'temperature', 'appointment'],
        correctAnswer: 'scope',
        explanation: '"scope" (منظار طبي) is used to inspect and extract internal foreign objects.'
      },
      {
        id: 'u2-fb-4',
        type: 'fill-in',
        question: 'The injured worker was pale as a ghost and _______ his bleeding hand in agony.',
        options: ['clutched', 'swallowed', 'stitched', 'reminded'],
        correctAnswer: 'clutched',
        explanation: '"clutched" (قبض وأمسك بقوة) indicates holding the injured hand tightly.'
      },
      {
        id: 'u2-fb-5',
        type: 'fill-in',
        question: 'In the trauma center, another night of fear, _______, and life-saving teamwork had passed.',
        options: ['urgency', 'gratitude', 'forehead', 'clinic'],
        correctAnswer: 'urgency',
        explanation: '"urgency" (إلحاح وحالة طارئة) describes the high-stakes emergency environment.'
      },
      {
        id: 'u2-fb-6',
        type: 'fill-in',
        question: 'The injured teenager lay on the stretcher and _______ quietly from his broken arm.',
        options: ['moaned', 'swallowed', 'stitched', 'scoped'],
        correctAnswer: 'moaned',
        explanation: '"moaned" (تأوه وتألم) fits the sound made by someone with a painful fracture.'
      }
    ],
    sentencePuzzles: [
      {
        id: 'u2-sp-1',
        fullSentence: 'Dr. Maha prepared to stitch a deep cut on his forehead.',
        chunks: ['Dr. Maha', 'prepared to stitch', 'a deep cut', 'on his forehead.'],
        arabicTranslation: 'استعدت الدكتورة مها لخياطة جرح عميق في جبينه.'
      },
      {
        id: 'u2-sp-2',
        fullSentence: 'Outside, it was raining cats and dogs as Dr. Basem arrived.',
        chunks: ['Outside,', 'it was raining cats and dogs', 'as Dr. Basem', 'arrived.'],
        arabicTranslation: 'في الخارج، كانت السماء تمطر بغزارة شديدة عندما وصل د. باسم.'
      },
      {
        id: 'u2-sp-3',
        fullSentence: 'Using a flexible scope, they carefully removed the coin.',
        chunks: ['Using a flexible scope,', 'they carefully', 'removed', 'the coin.'],
        arabicTranslation: 'باستخدام منظار مرن، أزالوا العملة المعدنية بحذر.'
      },
      {
        id: 'u2-sp-4',
        fullSentence: 'The mother wept with relief and gratitude.',
        chunks: ['The mother', 'wept with relief', 'and', 'gratitude.'],
        arabicTranslation: 'بكت الأم من شدة الفرح والامتنان.'
      },
      {
        id: 'u2-sp-5',
        fullSentence: 'Nurse Noura, calm under pressure, gave clear instructions.',
        chunks: ['Nurse Noura,', 'calm under pressure,', 'gave clear', 'instructions.'],
        arabicTranslation: 'الممرضة نورا، هادئة تحت الضغط، أعطت تعليمات واضحة.'
      }
    ],
    writingLesson: UNIT_1_WRITING_LESSON
  },
  {
    id: 'unit-1-lesson-5',
    unitNumber: 1,
    partNumber: 3,
    lessonName: 'Lesson 5',
    title: 'Unit 1: Lesson 5 (Writing: My Blog Post)',
    subtitle: 'Structure of a Blog Post - هيكل وطريقة كتابة تدوينة المدونة',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: My Blog Post”',
      paragraphs: [
        'A blog post is an article or a piece of writing published on a blog (an online journal or website). Blog posts are usually informal or semi-formal, engaging, about a specific topic, and not too long.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_1_WRITING_LESSON
  },
  UNIT_2_DATA,
  UNIT_2_LESSONS_3_4_DATA,
  {
    id: 'unit-2-lesson-5',
    unitNumber: 2,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 2: Lesson 5 (Writing: For or Against?)',
    subtitle: 'Argumentative Essay: Structure, Stating Claims & Refutation - كتابة المقال الجدلي والتفنيد',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: For or Against? (Argumentative Essay)”',
      paragraphs: [
        'An argumentative essay is a type of writing where you give your claim on a topic and support it with reasons and evidence. You also mention the opposite claim and explain why you think your claim is stronger.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_2_WRITING_LESSON
  },
  UNIT_3_DATA,
  UNIT_3_LESSONS_3_4_DATA,
  {
    id: 'unit-3-lesson-5',
    unitNumber: 3,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 3: Lesson 5 (Writing: How to Help Our Environment)',
    subtitle: 'Persuasive Writing: Rhetorical Questions, Emotional Appeal & Call to Action - الكتابة الإقناعية والدعوة للتحرك',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: How to Help Our Environment (Persuasive Writing)”',
      paragraphs: [
        'Persuasive writing is a type of writing used to convince the reader to take action and share your opinion supported with reasons, evidence, emotional appeal, persuasive language, and a strong call to action.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_3_WRITING_LESSON
  },
  UNIT_4_DATA,
  UNIT_4_LESSONS_3_4_DATA,
  {
    id: 'unit-4-lesson-5',
    unitNumber: 4,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 4: Lesson 5 (Writing: Ocean Legends and Storytelling)',
    subtitle: 'Short Story Writing: 3-Part Structure, Compound Adjectives & Dialogue - فن كتابة القصة وسرد الأساطير',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: Ocean Legends and Storytelling (Short Story Writing)”',
      paragraphs: [
        'Storytelling (Short Story Writing) is the art of narrating a fictional, legendary, or real-life event using a classic 3-part structure (Beginning, Middle, Ending), rich characters, defined setting, rising tension, emotional descriptions, and dialogue.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_4_WRITING_LESSON
  },
  UNIT_5_DATA,
  UNIT_5_LESSONS_3_4_DATA,
  {
    id: 'unit-5-lesson-5',
    unitNumber: 5,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 5: Lesson 5 (Writing: Life in the Year 2050)',
    subtitle: 'Narrative Writing: 7 Key Characteristics, AI Assistants & Human Reflection - فن الكتابة السردية',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: Life in the Year 2050 - My AI Assistant (Narrative Writing)”',
      paragraphs: [
        'Narrative writing is a type of writing that tells a story. It can be real (personal experience) or imagined (fiction), and it usually follows a clear sequence of events.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_5_WRITING_LESSON
  },
  UNIT_6_DATA,
  UNIT_6_LESSONS_3_4_DATA,
  {
    id: 'unit-6-lesson-5',
    unitNumber: 6,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 6: Lesson 5 (Writing: Tell the World What You Saw!)',
    subtitle: 'Review Writing: 4 Key Stages, Informing, Persuading & Recommending - فن كتابة المراجعة والتقييم',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: Tell the World What You Saw! (Writing a Review)”',
      paragraphs: [
        'A review is a written opinion about something you have experienced, like a movie, a book, a restaurant, a product, or a place. The main purpose of a review is to inform and persuade your readers.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_6_WRITING_LESSON
  },
  UNIT_7_DATA,
  UNIT_7_LESSONS_3_4_DATA,
  {
    id: 'unit-7-lesson-5',
    unitNumber: 7,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 7: Lesson 5 (Writing: An Expository Essay)',
    subtitle: 'Expository Writing: Structure, Clear Explanations & Trip Preparation - فن المقال التفسيري والتوضيحي',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: How to Prepare for a Trip (An Expository Essay)”',
      paragraphs: [
        'An expository essay is a type of essay where you explain a topic. Think of it like a teacher or a tour guide. You are the expert, and your job is to share information clearly and simply. The goal is to inform the reader, not to tell a story or give your opinion.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_7_WRITING_LESSON
  },
  UNIT_8_DATA,
  UNIT_8_LESSONS_3_4_DATA,
  {
    id: 'unit-8-lesson-5',
    unitNumber: 8,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 8: Lesson 5 (Writing: A Descriptive Essay)',
    subtitle: 'Descriptive Writing: Sensory Details, Vivid Language, Similes & Metaphors - فن المقال الوصفي والحواس الخمس',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: A Beach at Sunset (A Descriptive Essay)”',
      paragraphs: [
        'A descriptive essay is a type of writing that uses vivid language to describe a person, place, object, or experience. The goal is to make the reader feel like they are right there, seeing, hearing, and feeling what you are describing. Think of it as painting a picture with words. You want to use your five senses: sight, sound, smell, taste, and touch.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_8_WRITING_LESSON
  },
  UNIT_9_DATA,
  UNIT_9_LESSONS_3_4_DATA,
  {
    id: 'unit-9-lesson-5',
    unitNumber: 9,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 9: Lesson 5 (Writing: A Mystery Story)',
    subtitle: 'Mystery Story Writing: The Detective, Real Clues & Red Herrings - فن كتابة قصة الغموض والتحري',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: The Case of the Missing Lunchbox (A Mystery Story)”',
      paragraphs: [
        'A mystery story is a short tale about a puzzle or crime that needs to be solved—like a missing object, a secret message, or a strange event. The main character (the detective) follows clues to find the answer.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_9_WRITING_LESSON
  },
  UNIT_10_DATA,
  UNIT_10_LESSONS_3_4_DATA,
  {
    id: 'unit-10-lesson-5',
    unitNumber: 10,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 10: Lesson 5 (Writing: A Diary)',
    subtitle: 'A Diary: Daily Life, Thoughts & Feelings, Emojis, and the Feelings Wheel - فن كتابة اليوميات والمذكرات الشخصية',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: Writing a Diary (Structure, Tips & Activities)”',
      paragraphs: [
        'A diary is a personal record of daily life, thoughts, and feelings. It is an honest, private space to reflect on events, express emotions, and end the day with positive hopes for tomorrow.',
        'Writing a diary follows five essential elements: 1. Date & Day at the top (e.g., Monday, 29th September 2025). 2. A warm greeting ("Dear diary,"). 3. An opening line introducing feelings or main thoughts. 4. Chronological body describing events and emotions. 5. A positive closing reflection ("I hope tomorrow will be even better").'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_10_WRITING_LESSON
  },
  UNIT_11_DATA,
  UNIT_11_LESSONS_3_4_DATA,
  {
    id: 'unit-11-lesson-5',
    unitNumber: 11,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 11: Lesson 5 (Writing: My First Poem)',
    subtitle: 'My First Poem: Nature, Imagery, Short Lines, and Rhyme - فن كتابة الشعر: نظم قصيدتك الأولى ومحاكاة روائع وردزورث',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: My First Poem (How to Write a Simple Poem)”',
      paragraphs: [
        'A poem is a type of writing that expresses feelings and ideas through images and rhythm. Writing a simple poem follows five clear steps: 1. Choose a topic (nature, friendship, dreams, school, family). 2. Think of feelings and images (What do you see? Hear? Feel?). 3. Use adjectives and comparisons (bright, quiet, as tall as a tree, lonely as a cloud). 4. Keep lines short (poems do not need full sentences). 5. Use rhyme (cat/hat, sing/wing, trees/breeze) — though rhyme is optional.',
        'William Wordsworth applied these steps in “I Wandered Lonely as a Cloud”, celebrating golden daffodils dancing beside the lake in the spring breeze, showing how ordinary moments turn into lasting joy.'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_11_WRITING_LESSON
  },
  UNIT_12_DATA,
  UNIT_12_LESSONS_3_4_DATA,
  {
    id: 'unit-12-lesson-5',
    unitNumber: 12,
    partNumber: 3,
    lessonName: 'Lesson 5 (Writing)',
    title: 'Unit 12: Lesson 5 (Writing: Writing a Biography)',
    subtitle: 'Writing a Biography: Structure, Language Focus & Naguib Mahfouz - كتابة السيرة الذاتية: الهيكل، القواعد، وأدب نجيب محفوظ',
    isAvailable: true,
    readingPassage: {
      title: '“Lesson 5: Writing a Biography (The Life and Legacy of Naguib Mahfouz)”',
      paragraphs: [
        'A biography is a piece of writing about someone’s life, written by another person. It answers four core questions: 1. Who? (basic information: name, birth, death if relevant). 2. When and where? (date and place of birth, childhood, education). 3. What? (important events, achievements, difficulties). 4. Why are they important? (their influence, legacy).',
        'A biography follows a clear five-part chronological structure: 1. Introduction (Who is the person? Why are they important?). 2. Early life (Birth, family, childhood, education). 3. Major achievements (Career, discoveries, awards, contributions). 4. Later life (Old age, retirement, death if applicable). 5. Conclusion (Summary of why this person is remembered). In language, writers use past tense verbs (was, were, studied, worked, wrote), linking words (first, then, later, finally, because, however, although), dates and time expressions (in 1911, in 1988, at the age of 20, during his career), and third-person pronouns (He / She / They).'
      ],
      keyVocabHighlightIds: []
    },
    keyVocabulary: [],
    additionalVocabulary: [],
    phrasesAndExpressions: [],
    definitionsQuiz: [],
    collocationsQuiz: [],
    fillInBlanksQuiz: [],
    sentencePuzzles: [],
    writingLesson: UNIT_12_WRITING_LESSON
  }
];
