import type { WritingData } from '../types';

export const UNIT_2_WRITING_LESSON: WritingData = {
  lessonNumber: 5,
  lessonTitle: 'For or Against? (Argumentative Essay)',
  lessonTitleArabic: 'المقال الجدلي: مع أم ضد؟ (Argumentative Essay)',
  definition: 'An argumentative essay is a type of writing where you give your claim on a topic and support it with reasons and evidence. You also mention the opposite claim and explain why you think your claim is stronger.',
  definitionArabic: 'المقال الجدلي هو نوع من المقالات تقدم فيه ادعاءك/رأيك الواضح (claim) حول موضوع محدد، وتدعمه بالأسباب والأدلة (reasons and evidence). كما تذكر الرأي المعارض (opposite claim) وتفنده وتوضح لماذا حجتك هي الأقوى.',
  characteristics: [
    {
      en: 'Clear Claim (Thesis): Stating your firm stance or position in the introduction.',
      ar: 'إعلان ادعاء وموقف واضح: تحديد موقفك المباشر (مع أو ضد) في المقدمة دون تردد.'
    },
    {
      en: 'Supporting Reasons & Evidence: Backing up your arguments with facts, data, and examples.',
      ar: 'أسباب وأدلة داعمة: دعم كل حجة بحقائق واقعية وشواهد وأمثلة مقنعة.'
    },
    {
      en: 'Addressing the Opposing View: Mentioning the counter-claim fairly and objectively.',
      ar: 'عرض الرأي المعارض (Counter-claim): إبراز حجة الطرف الآخر لنفي التحيز وإظهار الموضوعية.'
    },
    {
      en: 'Effective Refutation (Rebuttal): Explaining why the opposing view is weak or flawed.',
      ar: 'التفنيد الذكي (Refutation): الرد على حجة المعارضين وتوضيح جوانب الضعف أو القصور فيها.'
    },
    {
      en: 'Balanced & Persuasive Conclusion: Restating your main claim and summarizing your arguments.',
      ar: 'خاتمة تأكيدية موجزة: إعادة تأكيد موقفك الأساسي وتلخيص أهم الحجج بأسلوب إقناعي قوي.'
    }
  ],
  structureSteps: [
    {
      stepNumber: 1,
      partName: '1. Introduction',
      partNameArabic: 'المقدمة: التمهيد وإعلان الموقف (State your claim)',
      purpose: 'Introduce the topic, give background, and state your claim (thesis).',
      purposeArabic: 'تقديم موضوع المقال، إعطاء خلفية عامة موجزة، وإعلان موقفك ورأيك المباشر (Thesis & Claim).',
      examples: [
        'I believe that students should not use phones in class.',
        'In my opinion, automated machines and artificial intelligence will enhance human skills rather than replace them.',
        'I think it is clear that renewable clean energy should completely replace fossil fuels.'
      ],
      tips: 'استخدم عبارات إعلان الموقف (Stating your claim): "I believe that...", "In my opinion,...", "I think it is clear that...".'
    },
    {
      stepNumber: 2,
      partName: '2. Body Paragraph 1',
      partNameArabic: 'الفقرة الأولى من صلب المقال: الحجة الأولى والأدلة (Reason 1)',
      purpose: 'Present your first strong reason and give concrete examples or evidence.',
      purposeArabic: 'طرح حجتك الأولى الداعمة لموقفك مع تقديم أمثلة واقعية أو إحصائيات تؤيدها.',
      examples: [
        'Firstly, phones can distract students from the teacher and lead to lower exam performance.',
        'To begin with, automated factory robots produce items much faster and eliminate dangerous manual tasks.'
      ],
      tips: 'استخدم عبارات دعم الحجة (Supporting your claim): "Firstly,...", "To begin with,...", "For example,...".'
    },
    {
      stepNumber: 3,
      partName: '3. Body Paragraph 2',
      partNameArabic: 'الفقرة الثانية من صلب المقال: الحجة الثانية والمزيد من الحقائق (Reason 2)',
      purpose: 'Provide your second reason with more examples, facts, or observations.',
      purposeArabic: 'تقديم سبب إضافي قوي مدعوماً بمزيد من الأمثلة أو الحقائق والتجارب الواقعية.',
      examples: [
        'Another reason is that relying constantly on digital tools impairs students\' independent spelling and calculation skills.',
        'Furthermore, smart technology enhances industrial productivity and creates high-skilled engineering jobs.'
      ],
      tips: 'استخدم روابط الإضافة: "Another reason is...", "Furthermore,...", "In addition,...".'
    },
    {
      stepNumber: 4,
      partName: '4. Opposing View & Refutation',
      partNameArabic: 'الرأي المعارض والتفنيد (Counter-claim & Refutation)',
      purpose: 'Mention the opposite side and say why you disagree or why their argument is not strong enough.',
      purposeArabic: 'ذكر وجهة نظر الطرف المعارض بحيادية، ثم تفنيدها وتوضيح سبب عدم كفايتها أو ضعفها.',
      examples: [
        'On the other hand, some people think phones are useful for learning. However, I disagree because unsupervised browsing often leads to social media distractions.',
        'Some people say that robots will take all jobs. This may be true for routine chores, but human creativity and empathy can never be automated.'
      ],
      tips: 'قدم الرأي الآخر بـ (Introducing the other side): "Some people say that...", "On the other hand,...", ثم فنّده بـ (Refuting): "However, I disagree because...", "This may be true, but...".'
    },
    {
      stepNumber: 5,
      partName: '5. Conclusion',
      partNameArabic: 'الخاتمة: إعادة تأكيد الموقف وتلخيص الحجج (Restate claim)',
      purpose: 'Restate your claim and summarize your main points without introducing new arguments.',
      purposeArabic: 'إعادة صياغة موقفك الأساسي وتلخيص أهم النقاط بأسلوب موجز يترك أثراً قوياً لدى القارئ.',
      examples: [
        'In conclusion, phones can be helpful but are often a major distraction. That’s why I believe schools should enforce a strict ban during lessons.',
        'To sum up, technology should serve us, not rule us. That’s why we must remain in control of our devices.'
      ],
      tips: 'استخدم عبارات الخاتمة (Concluding): "In conclusion,...", "To sum up,...", "That’s why I believe...".'
    }
  ],
  examQuestions: [
    {
      id: 'wr2-q1',
      type: 'multiple-choice',
      question: 'Which of the following sentence starters is used to STATE A CLAIM in an argumentative essay?',
      options: [
        'I believe that students should not use phones in class.',
        'Firstly, phones can distract students from the teacher.',
        'On the other hand, some people think phones are useful.',
        'In conclusion, phones can be helpful but are a distraction.'
      ],
      correctAnswer: 'I believe that students should not use phones in class.',
      explanation: 'From Textbook Exercise 2: "I believe that..." is used for Stating your claim (تحديد الموقف/الادعاء).'
    },
    {
      id: 'wr2-q2',
      type: 'multiple-choice',
      question: 'Which of the following sentence starters is used to GIVE A REASON supporting a claim?',
      options: [
        'Firstly, phones can distract students from the teacher.',
        'I believe that students should not use phones in class.',
        'In conclusion, phones can be helpful but are a distraction.',
        'On the other hand, some people think phones are useful.'
      ],
      correctAnswer: 'Firstly, phones can distract students from the teacher.',
      explanation: 'From Textbook Exercise 2: "Firstly,..." is used for Giving a reason (تقديم سبب/حجة).'
    },
    {
      id: 'wr2-q3',
      type: 'multiple-choice',
      question: 'Which sentence starter is used for OPPOSING AN IDEA (introducing the other side)?',
      options: [
        'On the other hand, some people think phones are useful for learning.',
        'I believe that students should not use phones in class.',
        'Firstly, phones can distract students from the teacher.',
        'In conclusion, phones can be helpful but are often a distraction.'
      ],
      correctAnswer: 'On the other hand, some people think phones are useful for learning.',
      explanation: 'From Textbook Exercise 2: "On the other hand, some people think..." is used for Opposing an idea (عرض الرأي المعارض).'
    },
    {
      id: 'wr2-q4',
      type: 'multiple-choice',
      question: 'Which sentence starter is used for CONCLUDING an argumentative essay?',
      options: [
        'In conclusion, phones can be helpful but are often a distraction.',
        'I believe that students should not use phones in class.',
        'Firstly, phones can distract students from the teacher.',
        'On the other hand, some people think phones are useful for learning.'
      ],
      correctAnswer: 'In conclusion, phones can be helpful but are often a distraction.',
      explanation: 'From Textbook Exercise 2: "In conclusion,..." is used for Concluding (الخاتمة وتلخيص الموقف).'
    },
    {
      id: 'wr2-q5',
      type: 'multiple-choice',
      question: 'What is the main definition and purpose of an ARGUMENTATIVE ESSAY?',
      options: [
        'To give your claim on a topic, support it with reasons/evidence, and mention/refute the opposite claim',
        'To narrate an imaginary fiction story with poetic descriptions and dialogue',
        'To write a short informal personal message to a friend about a holiday',
        'To list dictionary definitions without expressing any personal stance'
      ],
      correctAnswer: 'To give your claim on a topic, support it with reasons/evidence, and mention/refute the opposite claim',
      explanation: 'Official Writing Tip: An argumentative essay gives your claim on a topic, supports it with reasons and evidence, and mentions and refutes the opposite claim.'
    },
    {
      id: 'wr2-q6',
      type: 'multiple-choice',
      question: 'Which of the following phrases is used specifically to REFUTE the other side in an argumentative essay?',
      options: [
        'However, I disagree because...',
        'In my opinion,...',
        'Firstly, to begin with...',
        'To sum up, in conclusion...'
      ],
      correctAnswer: 'However, I disagree because...',
      explanation: 'From the Writing Tip Box: Phrases for "Refuting the other side" include "However, I disagree because...", "This may be true, but...", and "I believe this is not strong enough because...".'
    },
    {
      id: 'wr2-q7',
      type: 'multiple-choice',
      question: 'In which part of the argumentative essay should you restate your claim and summarize your main points?',
      options: [
        'In the conclusion',
        'In Body Paragraph 1',
        'In the title only',
        'In the opposing view only'
      ],
      correctAnswer: 'In the conclusion',
      explanation: 'Step 5 in the textbook: In the Conclusion, you restate your claim and summarize your main points.'
    }
  ],
  task: {
    title: 'Write an Argumentative Essay (For or Against)',
    titleArabic: 'اكتب مقالاً جدلياً: مع أم ضد؟ (التاسك التطبيقي)',
    prompt: 'Write an argumentative essay (120 - 150 words) stating your clear claim on a modern technology topic, supporting it with reasons and evidence, and addressing the opposing view.',
    promptArabic: 'اكتب مقالاً جدلياً متكاملاً (من 120 إلى 150 كلمة): عنوان يطرح القضية، مقدمة تحدد موقفك بوضوح (Claim)، فقرتان لصلب المقال بالأسباب والأدلة، فقرة لعرض الرأي المعارض وتفنيده (Refutation)، وخاتمة تلخص حججك.',
    suggestedTopics: [
      {
        id: 'u2-wt1',
        title: '📱 Mobile Phones in Classrooms (مع أو ضد الهواتف في المدرسة)',
        hint: 'اذكر رأيك في حظر الهواتف بالفصول، وادعمه بأسباب مثل التشتيت، وفنّد حجة استخدامها في البحث.'
      },
      {
        id: 'u2-wt2',
        title: '🤖 Will AI & Robots Replace Human Workers? (الذكاء الاصطناعي والوظائف)',
        hint: 'ناقش هل الآلات تهدد العمالة البشرية أم أنها أدوات تعزز الإنتاجية وتخلق مهناً جديدة.'
      },
      {
        id: 'u2-wt3',
        title: '🚗 Automated Self-Driving Cars (السيارات ذاتية القيادة)',
        hint: 'اطرح موقفك حول أمان السيارات الآلية ومستقبل النقل والمواصلات في المدن الذكية.'
      }
    ],
    checklist: [
      'Title presenting the central debate question',
      'Introduction with background and a clear claim/thesis (e.g., I believe that...)',
      'Body Paragraph 1 with first strong reason and evidence (Firstly,...)',
      'Body Paragraph 2 with second reason and real-life examples (Another reason is...)',
      'Opposing View & Refutation (On the other hand,... However, I disagree because...)',
      'Conclusion restating the claim and summarizing points (In conclusion,... That’s why I believe...)'
    ],
    minWords: 90,
    modelBlogPost: {
      headline: 'Should Mobile Phones Be Banned in School Classrooms?',
      intro: 'In recent years, smartphones have become an essential part of our daily routines. However, whether students should be permitted to use phones during lessons has sparked widespread debate. In my opinion, students should not be allowed to use mobile phones in classrooms because they cause severe distraction and undermine academic performance.',
      body: [
        'Firstly, mobile phones are a continuous source of distraction for teenagers. When phones are accessible on desks, incoming social media notifications and games tempt students to lose focus on the teacher’s explanation. Recent educational studies demonstrate that students who keep phones stored away achieve noticeably higher exam marks.',
        'Another reason is that relying excessively on digital devices harms fundamental thinking skills. Students frequently depend on automated spellcheck and digital calculators rather than exercising their own memory and problem-solving abilities.',
        'On the other hand, some people argue that smartphones are helpful tools for instant online research. This may be true under close supervision, but in reality, unsupervised access often leads to chatting and off-task behavior during valuable class time.'
      ],
      conclusion: 'In conclusion, while smartphones provide great convenience, they do more harm than good inside the learning room. That’s why I firmly believe schools should enforce a strict ban on phone use during lessons to help students stay on the right track.',
      arabicTranslation: 'نموذج إرشادي لمقال جدلي نموذجي يطبق الخطوات الخمس لكتاب الوزارة: 1. عنوان بصيغة تساؤل، 2. مقدمة تحدد الموقف بوضوح (Claim)، 3. صلب المقال بالأسباب والأدلة (Firstly, Another reason is...)، 4. عرض الرأي المعارض وتفنيده (On the other hand,... This may be true, but...)، 5. خاتمة قوية تلخص الموقف (In conclusion,... That’s why I believe...).'
    }
  }
};
