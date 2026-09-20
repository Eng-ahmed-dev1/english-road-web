import type { WritingData } from '../types';

export const UNIT_9_WRITING_LESSON: WritingData = {
  lessonNumber: 5,
  lessonTitle: 'A Mystery Story: How to Write a Mystery',
  lessonTitleArabic: 'كتابة قصة غموض وتحري: المحقق، الأدلة، وحل الألغاز (A Mystery Story)',
  definition: 'A mystery story is a short tale about a puzzle or crime that needs to be solved—like a missing object, a secret message, or a strange event. The main character (the detective) follows clues to find the answer.',
  definitionArabic: 'قصة الغموض (Mystery Story) هي قصة تشويقية قصيرة تدور حول لغز محير أو حادثة غامضة تحتاج إلى حل—مثل اختفاء شيء ثمين، أو رسالة سرية مشفرة، أو حدث غريب غير مفسر. وتعتمد القصة على شخصية رئيسية (المحقق Detective) الذي يجمع الأدلة ويتتبع الخيوط ليكشف الحقيقة في النهاية.',
  characteristics: [
    {
      en: '1. Central Mystery or Puzzle (لغز أو حادثة مشوقة): The plot begins with an intriguing question or event that demands an answer (e.g., "Who took the cookies?", "Why did the school clock stop?").',
      ar: '1. لغز محير وجذاب في البداية: تبدأ القصة بحادثة غامضة أو سؤال مشوق يستفز فضول القارئ ويدفعه للبحث عن الحقيقة.'
    },
    {
      en: '2. The Observant Detective (شخصية المحقق المتيقظ): A distinctive protagonist (a student, pet, robot, or detective) equipped with a unique personality and a special skill, such as noticing tiny details.',
      ar: '2. شخصية المحقق النبيه: بطل مميز (طالب، حيوان أليف، أو روبوت) يمتلك مهارة فذة في ملاحظة التفاصيل الصغيرة وأدوات استقصاء (مثل العدسة المكبرة ودفتر الملاحظات).'
    },
    {
      en: '3. Real Clues vs. Red Herrings (الأدلة الحقيقية مقابل الأدلة المضللة): Uses 2–3 genuine clues that guide the investigation, along with 1 "Red Herring" (a fake clue or false suspect) that confuses the detective and adds suspense.',
      ar: '3. التوازن بين الأدلة والتمويه (Red Herring): دمج 2 إلى 3 أدلة حقيقية تقود للحل، مع دليل مضلل واحد (Red Herring) يثير الشكوك في شخص بريء لزيادة الإثارة والتشويق.'
    },
    {
      en: '4. Logical & Satisfying Resolution (حل منطقي ومتناسق مع الأدلة): In the climax, the detective connects all clues, dismisses the red herring, and reveals a clear, sensible explanation that fits all facts.',
      ar: '4. كشف منطقي للحقيقة: يقوم المحقق في النهاية بربط الخيوط معاً وتفنيد الشبهات ليكشف الحقيقة بأسلوب منطقي ومقنع يطابق الأدلة المعروضة.'
    },
    {
      en: '5. Suspenseful Transitions (روابط وتراكيب تشويقية): Employs narrative connectors (suddenly, upon closer inspection, curiously, at last) to build anticipation and keep readers guessing.',
      ar: '5. لغة تشويقية وروابط سردية سلسة: توظيف تعبيرات مشوقة تجعل القارئ يشارك في التفكير والتحري حتى آخر سطر.'
    }
  ],
  structureSteps: [
    {
      stepNumber: 1,
      partName: '1. Think of a Mystery: The Hook Question',
      partNameArabic: 'المقدمة: تحديد اللغز وطرح سؤال التحري المشوق (The Mystery Question)',
      purpose: 'Start with a simple, intriguing question about a missing object, strange event, or sudden puzzle.',
      purposeArabic: 'بدء القصة بسؤال أو واقعة غامضة مشوقة وممتعة تثير الفضول فوراً وتحدد محور التحقيق.',
      examples: [
        'Who took Karim’s prized golden lunchbox from the cafeteria table during recess?',
        'Why did the school clock stop suddenly at 3:00 p.m. on a stormy Tuesday afternoon?',
        'Where did the mysterious encoded map hidden inside the old astronomy library book come from?'
      ],
      tips: 'اختر لغزاً بسيطاً وممتعاً (Keep it simple and fun) مثل اختفاء شيء أو توقف ساعة المدرسة فجأة.'
    },
    {
      stepNumber: 2,
      partName: '2. Create a Detective: Name, Personality & Special Skill',
      partNameArabic: 'الفقرة الأولى: ابتكار شخصية المحقق وأدواته ومهاراته (The Detective)',
      purpose: 'Introduce the person or character who solves the mystery (student, pet, robot) with their personality (brave, smart, funny) and special tools.',
      purposeArabic: 'التعريف بشخصية المحقق (طالب، حيوان أليف، أو روبوت)، وسماته (شجاع، ذكي، فكاهي)، وأدواته كالمكبرة والدفتر.',
      examples: [
        'Detective Sami was a quiet eighth-grader with an incredible talent for noticing details nobody else saw.',
        'Pulling out his vintage brass magnifying glass and a yellow spiral notebook, Sami began scanning the scene.',
        'Leo the classroom pet parrot squawked from his perch, acting as Sami’s feathered assistant.'
      ],
      tips: 'امنح المحقق اسماً مميزاً وأداة يستخدمها (مثل العدسة المكبرة أو دفتر الملاحظات) ومهارة خاصة (noticing small details).'
    },
    {
      stepNumber: 3,
      partName: '3. Add Clues and Red Herrings: The Investigation',
      partNameArabic: 'الفقرة الثانية: جمع الأدلة الحقيقية وتفنيد الدليل المضلل (Clues & Red Herrings)',
      purpose: 'Uncover 2–3 genuine clues that lead toward the truth, while introducing 1 misleading clue (Red Herring) that temporarily confuses the case.',
      purposeArabic: 'اكتشاف 2 إلى 3 أدلة حقيقية تقود للحل، وتقديم دليل مضلل (Red Herring) يوجه الشكوك نحو شخص بريء قبل تبرئته.',
      examples: [
        'Clue 1: A trail of sweet strawberry jam crumbs led away from the table toward the library window.',
        'Clue 2: A blue ribbon matching the school mascot was dropped near the curtain.',
        'Red Herring: Omar looked guilty because he was sweating near the backpacks, but he was only worried about his lost ruler!'
      ],
      tips: 'وظف مصطلح كتاب الوزارة (Red Herring): دليل خادع يوهم القارئ بأن مشتبهاً به هو الفاعل، بينما هو بريء تماماً.'
    },
    {
      stepNumber: 4,
      partName: '4. Solve the Mystery: Connecting Clues & The Truth',
      partNameArabic: 'الخاتمة: حل اللغز وربط الأدلة وكشف الفاعل الحقيقي (The Resolution)',
      purpose: 'The detective brings everyone together, puts the clues logically in place, and reveals the sensible truth.',
      purposeArabic: 'جمع الخيوط وتفسير كيف أدت الأدلة الحقيقية إلى الحل مع التأكد من أن التفسير منطقي ومقنع تماماً.',
      examples: [
        'At last, Sami smiled as he pulled back the curtain to reveal Oliver the school cat happily napping beside the open lunchbox.',
        'Putting the crumbs, the ribbon, and the paw prints together, the truth became delightfully clear to everyone.',
        'The mystery was solved, and the classroom erupted into cheerful laughter and relief.'
      ],
      tips: 'احرص على أن تكون النهاية منطقية تماماً (makes sense and fits the clues) وتربط كل الأدلة المعروضة سابقاً.'
    }
  ],
  examQuestions: [
    {
      id: 'wr9-q1',
      type: 'multiple-choice',
      question: 'According to the textbook Writing Tip, what is the definition of a "Mystery Story"?',
      options: [
        'A short tale about a puzzle or crime that needs to be solved, where a detective follows clues to find the answer',
        'A scientific textbook outlining mathematical calculations of black hole singularities',
        'A poetic description of ocean waves and sandy beaches using sensory adjectives',
        'A formal business email demanding a refund for an airline ticket'
      ],
      correctAnswer: 'A short tale about a puzzle or crime that needs to be solved, where a detective follows clues to find the answer',
      explanation: 'نص كتاب الوزارة الحرفي: A mystery story is a short tale about a puzzle or crime that needs to be solved—like a missing object, a secret message, or a strange event. The main character (the detective) follows clues to find the answer.'
    },
    {
      id: 'wr9-q2',
      type: 'multiple-choice',
      question: 'What is a "Red Herring" in the context of writing a mystery story?',
      options: [
        'A fake clue that confuses the detective and distracts from the real culprit',
        'A genuine photographic image captured by a space telescope',
        'A type of seafood served in a coastal beach café at sunset',
        'The name of the main detective’s trusty magnifying glass'
      ],
      correctAnswer: 'A fake clue that confuses the detective and distracts from the real culprit',
      explanation: 'تعريف كتاب الوزارة: Red Herrings are fake clues that confuse the detective (e.g., a suspect who looks guilty but didn’t do it).'
    },
    {
      id: 'wr9-q3',
      type: 'multiple-choice',
      question: 'What is the recommended balance of clues suggested in the textbook guide?',
      options: [
        'Use 2–3 real clues and 1 red herring',
        'Use 20 red herrings and zero real clues',
        'Use only 1 clue and never reveal the ending',
        'Use 10 suspects who are all guilty at the same time'
      ],
      correctAnswer: 'Use 2–3 real clues and 1 red herring',
      explanation: 'نصيحة كتاب الوزارة: Use 2–3 real clues and 1 red herring.'
    },
    {
      id: 'wr9-q4',
      type: 'multiple-choice',
      question: 'According to Step 2, who can play the role of the detective in your mystery story?',
      options: [
        'A student, a pet, a robot, or even a talking cat',
        'Only a police officer with a uniform and a badge',
        'An ancient Egyptian pharaoh from 4,000 years ago',
        'A supermassive black hole at the center of the galaxy'
      ],
      correctAnswer: 'A student, a pet, a robot, or even a talking cat',
      explanation: 'يذكر كتاب الوزارة: The detective could be: A student, A pet, A robot, Or even a talking cat!'
    },
    {
      id: 'wr9-q5',
      type: 'multiple-choice',
      question: 'In Step 1 (Think of a Mystery), what advice does the textbook give for student writers?',
      options: [
        '"Keep it simple and fun!"',
        '"Make it as violent and terrifying as possible!"',
        '"Never tell anyone what the question is until the sequel!"',
        '"Write in complicated ancient hieroglyphics!"'
      ],
      correctAnswer: '"Keep it simple and fun!"',
      explanation: 'نصيحة كتاب الوزارة الحرفية في الخطوة 1: Tip: Keep it simple and fun!'
    },
    {
      id: 'wr9-q6',
      type: 'multiple-choice',
      question: 'Which of the following is an example of a "Red Herring" from Activity 1?',
      options: [
        'The school clock stopped at 3:00—the exact same time as lunch!',
        'Oil found directly on the floor beneath the clock tower',
        'A wrench left on the stairs next to the broken gears',
        'A technician who admitted he repaired the machine'
      ],
      correctAnswer: 'The school clock stopped at 3:00—the exact same time as lunch!',
      explanation: 'في تمرين Activity 1 بالكتاب: 1 misleading clue: (e.g., the clock stopped at 3:00—same time as lunch!). هذا تطابق بالصدفة يشتت التحقيق.'
    },
    {
      id: 'wr9-q7',
      type: 'multiple-choice',
      question: 'What special attribute should you give your detective character according to Step 2?',
      options: [
        'A name and a special skill, such as noticing small details',
        'A magical spaceship that travels faster than light',
        'Ten million dollars in cash and an army of warriors',
        'An invisible cloak that never works'
      ],
      correctAnswer: 'A name and a special skill, such as noticing small details',
      explanation: 'كتاب الوزارة: Give your detective a name and a special skill (like noticing small details).'
    },
    {
      id: 'wr9-q8',
      type: 'multiple-choice',
      question: 'In Activity 2, which three questions help you develop your detective character?',
      options: [
        'What’s your detective’s name? Are they brave, smart, or funny? What tool do they use?',
        'Where were they born? What is their blood type? How much money do they earn?',
        'What is their favorite movie? Do they eat pizza? Can they fly to the moon?',
        'How old is their grandfather? What brand is their watch? Do they like winter?'
      ],
      correctAnswer: 'What’s your detective’s name? Are they brave, smart, or funny? What tool do they use?',
      explanation: 'أسئلة Activity 2 في كتاب الوزارة هي: 1. What’s your detective’s name? 2. Are they brave, smart, or funny? 3. What tool do they use?'
    },
    {
      id: 'wr9-q9',
      type: 'multiple-choice',
      question: 'What is the crucial requirement for the final resolution in Step 4 (Solve the Mystery)?',
      options: [
        'Make sure the answer makes sense and fits all the clues',
        'End the story abruptly in the middle of a sentence',
        'Accuse a completely random person without any evidence',
        'Change the detective’s identity into an alien at the last second'
      ],
      correctAnswer: 'Make sure the answer makes sense and fits all the clues',
      explanation: 'كتاب الوزارة: Make sure the answer makes sense and fits the clues!'
    },
    {
      id: 'wr9-q10',
      type: 'multiple-choice',
      question: 'Which of the following would serve as a realistic, tangible clue in a school mystery?',
      options: [
        'A muddy footprint, a dropped note, or breadcrumbs near a desk',
        'A telepathic message received from a distant galaxy',
        'A rumor heard on social media with zero facts',
        'An imaginary dragon flying over the playground'
      ],
      correctAnswer: 'A muddy footprint, a dropped note, or breadcrumbs near a desk',
      explanation: 'أمثلة الأدلة الواقعية من كتاب الوزارة: Clues help solve the mystery (e.g., a muddy footprint, a note).'
    }
  ],
  task: {
    title: 'Write a Mystery Story: "The Case of the Stolen Lunchbox"',
    titleArabic: 'اكتب قصة غموض وتحري: "لغز اختفاء صندوق الغداء المفقود (The Mystery Story)"',
    prompt: 'Write an engaging mystery story of about 150-200 words following the textbook steps. Create a question, introduce a clever detective with a special skill, include 2-3 genuine clues, insert 1 misleading red herring, and deliver a logical solution that fits all evidence.',
    promptArabic: 'اكتب قصة غموض مشوقة من 150 إلى 200 كلمة وفق خطوات كتاب الوزارة. ابدأ بلغز محير وسؤال مشوق، وقدم شخصية محقق نبيه يمتلك مهارة خاصة وأداة بحث، واحبك 2 إلى 3 أدلة حقيقية مع دليل مضلل (Red Herring) يشتت الشكوك، واختم بحل منطقي ومقنع يطابق الأدلة.',
    suggestedTopics: [
      {
        id: 'u9-wt1',
        title: '🥪 The Case of the Stolen Lunchbox (Textbook Activity 3)',
        hint: 'A missing lunchbox, strawberry jam crumbs, a dropped bookmark, a false suspect looking nervous, and a mischievous pet cat.'
      },
      {
        id: 'u9-wt2',
        title: '🕰️ The Mystery of the Stopped School Clock (Textbook Activity 1)',
        hint: 'A school clock freezes at 3:00 p.m., an oil puddle, a dropped wrench, a student eating lunch nearby, and an accidental loose wire.'
      },
      {
        id: 'u9-wt3',
        title: '🔭 The Mystery of the Vanished Observatory Lens',
        hint: 'An astronomy club lens goes missing before stargazing night, a locked door, a dropped lens cap, and a student who cleaned the shelf.'
      }
    ],
    checklist: [
      'Step 1: Start with a simple and fun mystery question (e.g., "Who took the lunchbox?")',
      'Step 2: Introduce a memorable detective with a name, personality, and special skill (noticing small details)',
      'Step 3: Provide 2–3 genuine clues (e.g., crumbs, dropped bookmark, paw prints)',
      'Step 3: Include 1 Red Herring (a misleading clue or suspect who looks guilty but is innocent)',
      'Step 4: Solve the mystery logically so the explanation makes sense and fits all clues',
      'Use transition words (suddenly, upon closer inspection, curiously, at last) to build suspense',
      'Maintain an entertaining, positive tone suitable for school storytelling',
      'Word count maintained between 150 and 200 words'
    ],
    minWords: 150,
    modelBlogPost: {
      headline: 'The Case of the Missing Golden Lunchbox: Detective Sami Solves the Mystery',
      intro: 'It was a sunny Tuesday morning at Green Valley School when a panicked cry echoed across the cafeteria: Karim’s prized golden lunchbox had completely vanished from his desk! Inside was his homemade sandwich and his lucky pass for the upcoming astronomy planetarium trip. Who could have taken the lunchbox, and where did it go?',
      body: [
        'Enter Detective Sami, a smart eighth-grader famous for noticing small details that everyone else missed. Pulling his trusty brass magnifying glass and yellow pocket notebook from his bag, Sami immediately surveyed the scene. His sharp eyes spotted Clue Number One: a faint trail of sweet strawberry jam crumbs leading away from the empty desk toward the hallway.',
        'Sami followed the crumbs and uncovered Clue Number Two: a bright blue silk bookmark dropped near the corridor lockers. Suddenly, several classmates accused Omar of being the thief because he was standing nervously near the lockers, sweating and looking guilty. However, Sami soon realized Omar was a classic Red Herring—he was simply nervous because he had lost his math ruler and had never touched the lunchbox!',
        'Continuing his search, Sami discovered Clue Number Three: faint scratching sounds and tiny dusty paw prints leading behind the heavy velvet library curtain.'
      ],
      conclusion: 'Putting the clues together, Detective Sami smiled and pulled back the curtain to reveal Oliver, the mischievous school cat, happily purring beside the safely opened lunchbox after snatching a dropped tuna cracker! Karim’s planetarium ticket was completely undamaged. The mystery was solved, and the classroom erupted into delighted laughter as justice and friendship were restored.',
      arabicTranslation: 'نموذج قصة الغموض الكاملة وفق كتاب الوزارة: يتضمن طرح اللغز وسؤال البداية، وتقديم المحقق "سامي" بعدسته وملاحظته للتفاصيل الصغيرة، واستعراض 3 أدلة حقيقية (فتات المربى، علامة الكتاب، وآثار أقدام القطة)، ودليل مضلل Red Herring (الشك في الزميل عمر)، وحلاً منطقياً طريفاً يطابق كافة الأدلة.'
    }
  }
};
