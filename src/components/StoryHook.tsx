import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  Flame, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  BrainCircuit
} from 'lucide-react';

export interface HookData {
  badge: string;
  badgeArabic: string;
  theme: string;
  themeArabic: string;
  hookQuestionEn: string;
  hookQuestionAr: string;
  discussionPoints: { en: string; ar: string }[];
  funFactEn: string;
  funFactAr: string;
  keywords: string[];
  gradient: string;
  glowColor: string;
}

interface StoryHookProps {
  unitNumber: number;
  partNumber: number;
  title?: string;
}

export const getHookDataForUnit = (unitNumber: number, partNumber: number): HookData => {
  // Unit 1 L12: Nurse Sarah in Hospital Ward
  if (unitNumber === 1 && partNumber === 1) {
    return {
      badge: 'Emergency Ward Dilemma',
      badgeArabic: 'مأزق عنبر الطوارئ',
      theme: 'Calmness Under Pressure & Healthcare Heroes',
      themeArabic: 'الهدوء تحت الضغط وأبطال الرعاية الصحية',
      hookQuestionEn: 'If an emergency occurred right now where every single second counted, what would save the day: staying completely calm or moving with frantic speed?',
      hookQuestionAr: 'لو وقع موقف طوارئ حرج الآن وكل ثانية لها ثمن، ما الذي سينقذ الموقف: الهدوء التام أم الحركة السريعة المضطربة؟',
      discussionPoints: [
        {
          en: 'Why does sudden panic often cause more medical and human errors than the actual crisis?',
          ar: 'لماذا يتسبب الذعر المفاجئ في أخطاء بشرية أكبر من حجم الأزمة نفسها؟'
        },
        {
          en: 'In healthcare, how does treating patients with empathy improve their physical recovery?',
          ar: 'في مجال الرعاية الصحية، كيف يسرع التعامل الإنساني الرحيم من شفاء المريض؟'
        }
      ],
      funFactEn: 'Medical studies confirm that medical teams practicing synchronous calm breathing decrease diagnostic errors by over 38%.',
      funFactAr: 'تؤكد الدراسات الطبية أن فرق الطوارئ التي تحافظ على هدوء تنفسها تقلل الأخطاء التشخيصية بنسبة تتجاوز 38%.',
      keywords: ['emergency', 'calm under pressure', 'teamwork', 'vital signs'],
      gradient: 'from-blue-600 via-cyan-600 to-teal-600',
      glowColor: 'rgba(6, 182, 212, 0.35)'
    };
  }

  // Unit 1 L34: Night Shift in ER
  if (unitNumber === 1 && partNumber === 2) {
    return {
      badge: 'Life-Saving Coordination',
      badgeArabic: 'التنسيق المنقذ للحياة',
      theme: 'Urgency, Crisis Communication & Gratitude',
      themeArabic: 'الاستجابة الطارئة، التواصل في الأزمات والامتنان',
      hookQuestionEn: 'Imagine having only 60 seconds to coordinate with three strangers to save a life: How do you communicate without shouting or chaotic confusion?',
      hookQuestionAr: 'تخيل أن لديك 60 ثانية فقط للتنسيق مع 3 أشخاص لإنقاذ حياة إنسان: كيف تتواصل معهم بفعالية دون صراخ أو ارتباك؟',
      discussionPoints: [
        {
          en: 'Why does "Teamwork makes the dream work" become a literal matter of life and death in the ER?',
          ar: 'لماذا تصبح مقولة "العمل الجماعي يصنع المعجزات" مسألة حياة أو موت حقيقية في غرف الطوارئ؟'
        },
        {
          en: 'How do healthcare workers process overwhelming emotions after the danger has passed?',
          ar: 'كيف يتعامل الأطباء والممرضون مع مشاعرهم الفياضة بعد انتهاء الخطر بنجاح؟'
        }
      ],
      funFactEn: 'During acute emergency rushes, the human subconscious mind processes vital sensory data in under 150 milliseconds.',
      funFactAr: 'أثناء طوارئ الإنقاذ، يعالج العقل البشري اللاواعي البيانات الحسية الحيوية في أقل من 150 مللي ثانية.',
      keywords: ['urgency', 'vital signs', 'team coordination', 'relief'],
      gradient: 'from-rose-600 via-pink-600 to-red-600',
      glowColor: 'rgba(244, 63, 94, 0.35)'
    };
  }

  // Unit 2 L12: Egypt & History of Machines
  if (unitNumber === 2 && partNumber === 1) {
    return {
      badge: 'Engineering Marvels Across Millennia',
      badgeArabic: 'عبقرية الهندسة عبر آلاف السنين',
      theme: 'From Pharaohs’ Levers to AI Automation',
      themeArabic: 'من روافع الفراعنة إلى روبوتات الذكاء الاصطناعي',
      hookQuestionEn: 'Ancient Egyptians hauled 2-ton limestone blocks using simple wooden ramps: Could our high-tech modern society survive if all electric machines stopped tomorrow?',
      hookQuestionAr: 'حرك الفراعنة صخوراً بوزن طنين بروافع خشبية بسيطة: هل تستطيع مجتمعاتنا المعاصرة الصمود لو توقفت جميع الآلات الكهربائية غداً؟',
      discussionPoints: [
        {
          en: 'Did automated machinery destroy traditional craft, or did it unlock limitless human creativity?',
          ar: 'هل قضت الآلات الآلية على الحرف اليدوية، أم فتحت آفاقاً غير محدودة للإبداع البشري؟'
        },
        {
          en: 'How does modern Egypt blend deep historical heritage with forward-looking artificial intelligence?',
          ar: 'كيف تجمع مصر اليوم بين الحفاظ على التراث الأثري وتبني تقنيات الذكاء الاصطناعي؟'
        }
      ],
      funFactEn: 'The Great Pyramid of Giza was the tallest man-made structure on Earth for over 3,800 years, built completely without engines or electricity.',
      funFactAr: 'ظل الهرم الأكبر أطول بناء بشري على وجه الأرض لأكثر من 3800 عام، وشُيد بالكامل دون محركات أو كهرباء.',
      keywords: ['monumental', 'automation', 'heritage', 'levers & ramps'],
      gradient: 'from-amber-600 via-orange-600 to-yellow-600',
      glowColor: 'rgba(245, 158, 11, 0.35)'
    };
  }

  // Unit 2 L34: Machines in Daily Life
  if (unitNumber === 2 && partNumber === 2) {
    return {
      badge: 'The Smart World Challenge',
      badgeArabic: 'تحدي العالم الذكي',
      theme: 'Convenience, Automation & Human Independence',
      themeArabic: 'الرفاهية، الأتمتة واستقلالية العقل البشري',
      hookQuestionEn: 'The average person interacts with over 5 smart machines before breakfast: Are we truly in control of our tools, or have our tools taken control of our daily habits?',
      hookQuestionAr: 'يتعامل الشخص العادي مع أكثر من 5 أجهزة ذكية قبل الإفطار: هل نحن من يتحكم في أدواتنا، أم أن التكنولوجيا هي التي بدأت تتحكم في عاداتنا؟',
      discussionPoints: [
        {
          en: 'What daily skill would modern students struggle with most if computers and spellchecks vanished?',
          ar: 'ما هي المهارة التي سيعاني الطلاب فيها أكثر إذا اختفت أجهزة الكمبيوتر والتصحيح التلقائي؟'
        },
        {
          en: 'Why is it crucial that machines serve our goals rather than rule our time and attention?',
          ar: 'لماذا يجب أن تظل الآلات خادمة لأهدافنا بدلاً من أن تستولي على أوقاتنا وتركيزنا؟'
        }
      ],
      funFactEn: 'Smart home automation saves an average family approximately 120 hours of manual household chores each year.',
      funFactAr: 'توفر الأجهزة الذكية المنزلية للأسرة الواحدة نحو 120 ساعة سنوياً من الأعمال اليدوية الروتينية.',
      keywords: ['smart home', 'appliances', 'efficiency', 'human control'],
      gradient: 'from-indigo-600 via-blue-600 to-sky-600',
      glowColor: 'rgba(79, 70, 229, 0.35)'
    };
  }

  // Unit 3 L12: Climate Justice
  if (unitNumber === 3 && partNumber === 1) {
    return {
      badge: 'Global Justice & Planetary Duty',
      badgeArabic: 'العدالة المناخية والواجب الإنساني',
      theme: 'Environmental Equity, Marginalized Communities & Youth Power',
      themeArabic: 'العدالة البيئية، المجتمعات المتضررة وطاقة الشباب',
      hookQuestionEn: 'The developing nations that contribute the least to global pollution suffer the most severe droughts and floods: Is climate change a scientific issue or a moral test of global justice?',
      hookQuestionAr: 'الدول التي تطلق أقل نسبة من الانبعاثات تعاني أشد موجات الجفاف والفيضانات: هل حماية المناخ مسألة علمية، أم أعظم اختبار للعدالة الإنسانية في عصرنا؟',
      discussionPoints: [
        {
          en: 'Why must wealthier industrialized nations bear greater responsibility for green transition funding?',
          ar: 'لماذا يجب على الدول الصناعية الكبرى تحمل القسط الأكبر من تمويل التحول نحو الطاقة النظيفة؟'
        },
        {
          en: 'How can young student innovators create tangible, solar-powered changes in their local communities?',
          ar: 'كيف يمكن للشباب والمبتكرين في المدارس خلق تغييرات بيئية ملموسة في مجتمعاتهم؟'
        }
      ],
      funFactEn: 'Enough solar energy strikes the Earth every single hour to satisfy the entire globe’s energy consumption for an entire year.',
      funFactAr: 'كمية الطاقة الشمسية التي تسقط على كوكب الأرض في ساعة واحدة تكفي لاستهلاك العالم بأكمله لمدة عام كامل.',
      keywords: ['climate justice', 'equity', 'marginalized', 'tangible action'],
      gradient: 'from-emerald-600 via-teal-600 to-green-600',
      glowColor: 'rgba(16, 185, 129, 0.35)'
    };
  }

  // Unit 3 L34: Rising Sea Levels & Coastal Adaptation
  if (unitNumber === 3 && partNumber === 2) {
    return {
      badge: 'The Ocean’s Rising Tide',
      badgeArabic: 'طوفان المحيطات الصاعد',
      theme: 'Melting Glaciers, Coastal Resilience & Amphibious Architecture',
      themeArabic: 'ذوبان الجليد، صمود المدن الساحلية والعمارة البرمائية',
      hookQuestionEn: 'By 2100, rising seas threaten over 275 million coastal citizens: Would you rather defend historic shorelines behind massive concrete sea walls, or build futuristic amphibious floating cities?',
      hookQuestionAr: 'بحلول عام 2100، سيهدد ارتفاع البحار 275 مليون نسمة: هل تفضل الدفاع عن الشواطئ بجدران خرسانية عملاقة، أم بناء مدن عائمة تتكيف مع الأمواج؟',
      discussionPoints: [
        {
          en: 'How does polar ice melting at the North Pole directly impact living conditions in Alexandria and Venice?',
          ar: 'كيف يؤثر ذوبان الجليد في القطب الشمالي مباشرة على شواطئ الإسكندرية والبندقية؟'
        },
        {
          en: 'What makes amphibious architecture one of the most promising careers for future civil engineers?',
          ar: 'ما الذي يجعل العمارة البرمائية العائمة من أكثر التخصصات الهندسية الواعدة للمستقبل؟'
        }
      ],
      funFactEn: 'If all land ice on Antarctica melted, global oceans would rise by 58 meters, redrawing every world map.',
      funFactAr: 'لو ذاب جليد القارة القطبية الجنوبية، سيرتفع منسوب البحار بنحو 58 متراً، مما يغير خرائط العالم بالكامل.',
      keywords: ['sea level rise', 'amphibious', 'coastal defense', 'thermal expansion'],
      gradient: 'from-sky-600 via-blue-600 to-indigo-700',
      glowColor: 'rgba(2, 132, 199, 0.35)'
    };
  }

  // Unit 4 L12: Underwater Cities: Coral Reefs
  if (unitNumber === 4 && partNumber === 1) {
    return {
      badge: 'The Ocean’s Living City',
      badgeArabic: 'مدينة المحيط الحية',
      theme: 'Marine Biodiversity, Coral Bleaching & Collective Conservation',
      themeArabic: 'التنوع البيولوجي البحري، ابيضاض المرجان وحماية البيئة',
      hookQuestionEn: 'Coral reefs cover less than 1% of the seabed yet sustain 25% of all marine life on the planet: Why is losing this underwater city considered an irreversible ecological catastrophe?',
      hookQuestionAr: 'تغطي الشعاب المرجانية أقل من 1% من قاع المحيط وتأوي 25% من الكائنات البحرية: لماذا يُعد فقدان هذه المدينة المائية كارثة بيئية لا يمكن تعويضها؟',
      discussionPoints: [
        {
          en: 'How does thermal coral bleaching destroy coastal fisheries and human food security?',
          ar: 'كيف تدمر ظاهرة ابيضاض الشعاب المرجانية المصايد السمكية والأمن الغذائي للبشر؟'
        },
        {
          en: 'Why does the timeless proverb "A stitch in time saves nine" apply directly to coral protection?',
          ar: 'لماذا ينطبق المثل الإنجليزي "الوقاية خير من العلاج" مباشرة على إنقاذ الشعاب المرجانية؟'
        }
      ],
      funFactEn: 'Corals are not plants or rocks—they are colonies of living animals that have built vast underwater structures for millions of years.',
      funFactAr: 'الشعاب المرجانية ليست نباتات أو صخوراً، بل مستعمرات من كائنات حية شيدت مدناً بحرية عملاقة عبر ملايين السنين.',
      keywords: ['coral polyps', 'underwater city', 'bleaching', 'fragile ecosystem'],
      gradient: 'from-teal-600 via-emerald-600 to-cyan-600',
      glowColor: 'rgba(13, 148, 136, 0.35)'
    };
  }

  // Unit 4 L34: Deep Sea Wonders
  if (unitNumber === 4 && partNumber === 2) {
    return {
      badge: 'Creatures of the Deep',
      badgeArabic: 'مخلوقات الأعماق الغامضة',
      theme: 'Bioluminescence, Ocean Mysteries & Synchronized Life',
      themeArabic: 'الضوء الحيوي، أسرار المحيطات وتناغم الطبيعة',
      hookQuestionEn: 'In deep ocean zones where sunlight never penetrates, creatures generate their own vibrant living light to hunt and communicate: What hidden wonders await discovery in our oceans?',
      hookQuestionAr: 'في أعماق المحيط التي لا يصلها ضوء الشمس أبداً، تبتكر الكائنات أضواءها الحيوية الخاصة للصيد والتواصل: ما هي الأسرار التي لا تزال تنتظر من يكتشفها؟',
      discussionPoints: [
        {
          en: 'How do synchronized dolphin pods prove that social intelligence exists far beyond human society?',
          ar: 'كيف يثبت التناغم المذهل لأسراب الدلافين أن الذكاء الاجتماعي موجود في الطبيعة بصور مدهشة؟'
        },
        {
          en: 'Why does human plastic pollution and artificial coastline lighting disorient newly hatched sea turtles?',
          ar: 'لماذا تتسبب مخلفات البلاستيك وأضواء المدن الساحلية في تشتيت صغار السلاحف البحرية وموتها؟'
        }
      ],
      funFactEn: 'Over 80% of our ocean remains entirely unmapped and unexplored, with thousands of undiscovered species.',
      funFactAr: 'أكثر من 80% من محيطات كوكب الأرض لا تزال غير مستكشفة تماماً وتخفي آلاف الكائنات غير المعروفة.',
      keywords: ['glow-producing', 'coordinated pods', 'deep sea', 'marine migration'],
      gradient: 'from-blue-700 via-indigo-700 to-violet-700',
      glowColor: 'rgba(67, 56, 202, 0.35)'
    };
  }

  // Unit 5 L12: From Muscles to Mindset
  if (unitNumber === 5 && partNumber === 1) {
    return {
      badge: 'The AI Workplace Revolution',
      badgeArabic: 'ثورة بيئة العمل والذكاء الاصطناعي',
      theme: 'Soft Skills, Human Insight & Lifelong Adaptability',
      themeArabic: 'المهارات الناعمة، البصيرة الإنسانية والمرونة المستمرة',
      hookQuestionEn: 'Advanced AI and robots now handle calculations, construction, and programming in seconds: What is the ONE human skill that technology will NEVER be able to automate?',
      hookQuestionAr: 'يقوم الذكاء الاصطناعي بالبرمجة والبناء وتحليل البيانات في ثوانٍ: ما هي المهارة الإنسانية الوحيدة التي لن تستطيع أي آلة أتمتتها أو استبدالها؟',
      discussionPoints: [
        {
          en: 'Why will empathy, emotional intelligence, and human judgment become more valuable than technical memory?',
          ar: 'لماذا سيصبح التعاطف والذكاء العاطفي والحكم الأخلاقي أثمن بكثير من مجرد حفظ المعلومات؟'
        },
        {
          en: 'How do you build a growth mindset that turns rapid technological change into an empowering advantage?',
          ar: 'كيف تبني عقلية نمو إيجابية تحول التغيرات التكنولوجية السريعة إلى فرصة للنجاح والتميز؟'
        }
      ],
      funFactEn: 'The World Economic Forum identifies empathy, creative problem-solving, and adaptability as the top skills for the next decade.',
      funFactAr: 'يصنف المنتدى الاقتصادي العالمي التعاطف وحل المشكلات الإبداعي والمرونة كأهم المهارات المطلوبة للعقد القادم.',
      keywords: ['mindset', 'emotional intelligence', 'human insight', 'growth'],
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      glowColor: 'rgba(147, 51, 234, 0.35)'
    };
  }

  // Unit 5 L34: The Year 2045: Technology & The Human Spark
  if (unitNumber === 5 && partNumber === 2) {
    return {
      badge: 'The Human Spark in 2045',
      badgeArabic: 'البريق الإنساني في عام 2045',
      theme: 'The Living Warmth of Storytelling vs Cold Algorithms',
      themeArabic: 'دفء الحكاية الإنسانية الحية في مواجهة الخوارزميات الجامدة',
      hookQuestionEn: 'An advanced AI system analyzed Amina’s storytelling and copied every single word and metaphor, yet it completely failed to capture the wide eyes and smiles of the children: What was missing?',
      hookQuestionAr: 'حلل نظام ذكاء اصطناعي فائق حكايات أمينة ونسخ جميع كلماتها واستعاراتها، لكنه عجز تماماً عن نقل ابتسامات ودهشة عيون الأطفال: ما الذي كان ينقصه؟',
      discussionPoints: [
        {
          en: 'Can computer code ever genuinely experience love, heartache, or the warmth of holding hands?',
          ar: 'هل تستطيع لغة البرمجة أن تشعر حقاً بالحب أو الحزن أو دفء المشاعر الإنسانية الصادقة؟'
        },
        {
          en: 'Why does human storytelling connect hearts in a way that synthesized holographic voices never can?',
          ar: 'لماذا تلمس حكايات الجدات القلوب بطريقة لا يمكن للأصوات الافتراضية توليدها مهما بلغت دقتها؟'
        }
      ],
      funFactEn: 'Neuroimaging reveals that when people listen to an emotional storyteller, their brainwave frequencies physically sync up with the speaker.',
      funFactAr: 'أثبتت فحوصات الدماغ أنه عند الاستماع لراوٍ إنساني صادق، تتناغم الترددات العصبية للمستمعين حرفياً مع نبضات الراوي.',
      keywords: ['human spark', 'warmth', 'passion', 'storytelling magic'],
      gradient: 'from-amber-600 via-pink-600 to-rose-600',
      glowColor: 'rgba(244, 63, 94, 0.35)'
    };
  }

  // Unit 6 L12: A Mortifying Encounter & True Friendship
  if (unitNumber === 6 && partNumber === 1) {
    return {
      badge: 'The Mortifying Dining Test',
      badgeArabic: 'اختبار الإحراج الاجتماعي في المطعم',
      theme: 'Embarrassment, Empathy & True Friends in Thick and Thin',
      themeArabic: 'الإحراج، التسامح، والأصدقاء الحقيقيون في السراء والضراء',
      hookQuestionEn: 'You reach for the salt shaker at a trendy crowded restaurant and accidentally splash red juice across your best friend’s brand-new white outfit: What happens next?',
      hookQuestionAr: 'تمد يدك للملاحة في مطعم مزدحم وأنيق، وفجأة ينسكب العصير الأحمر بالخطأ على فستان صديقتك الأبيض الجديد كلياً: كيف ستتصرف، وما رد الفعل الذي يكشف الصديق الحقيقي؟',
      discussionPoints: [
        {
          en: 'Why does immediate gracious forgiveness strengthen friendships far more than avoiding accidents ever could?',
          ar: 'لماذا يبني التسامح والاحتواء السريع صداقات أقوى بكثير من مجرد تجنب الوقوع في الأخطاء؟'
        },
        {
          en: 'What distinguishes a superficial acquaintance from a true friend who stands by your side in thick and thin?',
          ar: 'ما هو الفارق الجوهري بين الصديق السطحي والصديق الأصيل الذي يقف بجانبك في السراء والضراء؟'
        }
      ],
      funFactEn: 'Psychological research proves that experiencing an embarrassing mishap together and laughing it off triggers oxytocin, turning casual friends into lifelong confidants.',
      funFactAr: 'تؤكد الأبحاث النفسية أن تجاوز المواقف المحرجة بالضحك والتسامح يفرز هرمون الترابط الذي يحول المعارف العاديين إلى أصدقاء العمر.',
      keywords: ['mortifying', 'pale as a ghost', 'thick and thin', 'forgiveness'],
      gradient: 'from-fuchsia-600 via-rose-600 to-indigo-600',
      glowColor: 'rgba(225, 29, 72, 0.35)'
    };
  }

  // Unit 6 L34: The Science of Social Connection
  if (unitNumber === 6 && partNumber === 2) {
    return {
      badge: 'The Biology of Belonging',
      badgeArabic: 'علم الروابط الاجتماعية والانتماء',
      theme: 'Brain Chemistry, Stress Reduction & Face-to-Face Bonds',
      themeArabic: 'كيمياء السعادة بالدماغ، تخفيف التوتر وقوة اللقاء المباشر',
      hookQuestionEn: 'In a digital world where everyone texts and scrolls endlessly: Why does sitting on a simple park bench chatting face-to-face with a friend add healthy years to your lifespan?',
      hookQuestionAr: 'في عالم رقمي يتواصل فيه الجميع عبر الشاشات ومواقع التواصل: لماذا يضيف الجلوس على مقعد حديقة والتحدث مع صديق سنوات من الصحة والسعادة لعمرك؟',
      discussionPoints: [
        {
          en: 'How does real-world human presence stimulate feel-good hormones that strengthen your physical immune system?',
          ar: 'كيف يحفز التواصل المباشر إفراز هرمونات السعادة التي تعزز جهاز المناعة الجسدي والنفسي؟'
        },
        {
          en: 'Why is carving out time for friends in a packed schedule not an idle luxury, but a vital medical investment?',
          ar: 'لماذا لا يُعد تخصيص وقت للأصدقاء وسط مشاغل الحياة رفاهية مؤجلة، بل استثماراً طبياً ضرورياً لصحتك؟'
        }
      ],
      funFactEn: 'The historic 85-year Harvard Adult Development Study found that loving, supportive relationships are the single greatest predictor of human longevity and happiness.',
      funFactAr: 'أثبتت دراسة هارفارد الشهيرة (الممتدة لـ 85 عاماً) أن العلاقات الإنسانية الدافئة والداعمة هي العامل رقم واحد لصحة وسعادة الإنسان وطول عمره.',
      keywords: ['essential well-being', 'social interaction', 'compromise', 'worth the effort'],
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
      glowColor: 'rgba(6, 182, 212, 0.35)'
    };
  }

  // Unit 7 L12: A Traveler's Airport Journey
  if (unitNumber === 7 && partNumber === 1) {
    return {
      badge: 'Airport Dilemma & Liquid Rules',
      badgeArabic: 'مأزق المطار وقوانين السوائل',
      theme: 'Airport Security, Travel Mindset & Navigating Delays',
      themeArabic: 'أمن المطارات، عقلية السفر الذكي والتعامل مع التأخير',
      hookQuestionEn: 'Imagine your flight leaves in 90 minutes, and the airport security officer asks you to throw away your favorite expensive perfume. What is your immediate reaction?',
      hookQuestionAr: 'تخيل أن طائرتك ستقلع بعد 90 دقيقة، وضابط التفتيش يطلب منك التخلص من زجاجة عطرك المفضلة الثمينة. ما هو تصرفك الفوري؟',
      discussionPoints: [
        {
          en: 'Why do aviation authorities enforce strict 100ml liquid restrictions in passenger carry-on bags?',
          ar: 'لماذا تفرض سلطات الطيران الدولية قيوداً صارمة على السوائل ألا تتجاوز 100 مل في الحقائب اليدوية؟'
        },
        {
          en: 'Jack advised Hazem to "go with the flow rather than fight unexpected situations." How does this mindset turn flight delays into productive adventures?',
          ar: 'نصح جاك حازم بأن "يجاري الأمور بدلاً من مقاومة المفاجآت". كيف تحول هذه العقلية تأخير الرحلات إلى تجارب نافعة وممتعة؟'
        }
      ],
      funFactEn: 'Paris-Orly Airport handles over 30 million travelers each year and was one of the earliest airports in the world to pioneer automated self-service check-in kiosks.',
      funFactAr: 'يستقبل مطار باريس أورلي أكثر من 30 مليون مسافر سنوياً، وكان من أوائل المطارات التي ابتكرت أكشاك تسجيل الوصول الذاتية لتسريع إجراءات الركاب.',
      keywords: ['boarding pass', 'security checkpoint', 'departure lounge', 'liquid restrictions', 'go with the flow'],
      gradient: 'from-sky-600 via-blue-600 to-teal-600',
      glowColor: 'rgba(2, 132, 199, 0.35)'
    };
  }

  // Unit 8 L12: The Crossroads of Civilizations
  if (unitNumber === 8 && partNumber === 1) {
    return {
      badge: 'The Crossroads of Continents & Suez Genius',
      badgeArabic: 'ملتقى القارات الثلاث وعبقرية السويس',
      theme: 'Strategic Geography, Global Maritime Trade & Civilizational Crossroads',
      themeArabic: 'الجغرافيا الاستراتيجية، التجارة البحرية العالمية وملتقى الحضارات',
      hookQuestionEn: 'If Egypt did not exist at the crossroads of Africa, Asia, and Europe, how much longer and more dangerous would global maritime trade be today?',
      hookQuestionAr: 'لو لم تكن مصر واقعة عند ملتقى قارات أفريقيا وآسيا وأوروبا، كم كانت ستطول رحلات التجارة البحرية وتزداد خطورة وتكلفة اليوم؟',
      discussionPoints: [
        {
          en: 'How did the opening of the Suez Canal in 1869 permanently revolutionize international maritime commerce by eliminating the lengthy trip around Africa?',
          ar: 'كيف أحدث افتتاح قناة السويس عام 1869 ثورة دائمة في التجارة البحرية بإلغاء الرحلة الطويلة حول أفريقيا؟'
        },
        {
          en: 'In what ways has the Sinai Peninsula served as a sacred geographical bridge for human culture, trade, and civilization across millennia?',
          ar: 'بأي طرق شكلت شبه جزيرة سيناء جسراً جغرافياً وثقافياً حاسماً للتجارة والهجرات البشرية عبر آلاف السنين؟'
        }
      ],
      funFactEn: 'Around 12% of total global maritime trade passes through Egypt’s Suez Canal, saving massive container vessels up to 15 days of ocean navigation around the African continent!',
      funFactAr: 'يمر نحو 12% من إجمالي التجارة البحرية العالمية عبر قناة السويس المصرية، مما يوفر على سفن الحاويات العملاقة ما يصل إلى 15 يوماً من الإبحار الشاق حول قارة أفريقيا!',
      keywords: ['crossroads', 'Sinai Peninsula', 'Suez Canal', 'maritime', 'confluence', 'fertile soil', 'lifeline'],
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      glowColor: 'rgba(16, 185, 129, 0.35)'
    };
  }

  // Unit 8 L34: Ancient China, The Silk Road & The Terracotta Army
  if (unitNumber === 8 && partNumber === 2) {
    return {
      badge: 'The Middle Kingdom & Terracotta Army',
      badgeArabic: 'المملكة الوسطى وجيش التراكوتا الأسطوري',
      theme: 'Ancient Chinese Inventions, The Silk Road & The Terracotta Warriors',
      themeArabic: 'ابتكارات الصين القديمة، طريق الحرير وجيش الفخار الصامت',
      hookQuestionEn: 'If paper, printing, gunpowder, and the magnetic compass had never been invented in Ancient China, how different would world civilization and modern technology look today?',
      hookQuestionAr: 'لو لم يتم اختراع الورق والطباعة والبارود والبوصلة في الصين القديمة، كيف كان سيبدو شكل الحضارة الإنسانية والتكنولوجيا الحديثة اليوم؟',
      discussionPoints: [
        {
          en: 'How did the Silk Road serve as the world’s first global internet, transferring not just silk and spices, but revolutionary ideas, science, and cultures across continents?',
          ar: 'كيف كان طريق الحرير بمثابة "الإنترنت الأول في العالم"، حيث نقل ليس فقط الحرير والتوابل بل العلوم والأفكار والثقافات بين القارات؟'
        },
        {
          en: 'Why did Emperor Qin Shi Huang commission 8,000 life-sized terracotta soldiers with uniquely carved individual faces to guard his eternal tomb?',
          ar: 'لماذا أمر الإمبراطور تشين شي هوانغ بنحت 8000 جندي من الفخار بالحجم الطبيعي بملامح وجه فريدة لا تتكرر لحراسة ضريحه الأبدي؟'
        }
      ],
      funFactEn: 'Every single one of the 8,000 Terracotta Warriors discovered in 1974 by local farmers digging a well has completely unique facial features, hairstyles, and armor details—no two soldiers are identical!',
      funFactAr: 'كل جندي من بين أكثر من 8000 جندي من جيش التراكوتا المكتشف عام 1974 على يد مزارعين كانوا يحفرون بئراً، يمتلك ملامح وجه وتسريحة شعر وتفاصيل درع فريدة تماماً لا تتطابق مع أي جندي آخر!',
      keywords: ['birthplace', 'innovation', 'Silk Road', 'terracotta', 'porcelain', 'dynasty', 'gunpowder', 'compass'],
      gradient: 'from-rose-600 via-red-600 to-amber-600',
      glowColor: 'rgba(225, 29, 72, 0.35)'
    };
  }

  // Unit 9 L12: Cosmic Mysteries & A Journey to a Black Hole
  if (unitNumber === 9 && partNumber === 1) {
    return {
      badge: 'Cosmic Mysteries & Black Holes',
      badgeArabic: 'أسرار الثقوب السوداء وأفق الحدث الكوني',
      theme: 'Astrophysics, Gravitational Pull, Event Horizon & Cosmic Misconceptions',
      themeArabic: 'الفيزياء الفلكية، قوى الجاذبية الخارقة، وألغاز نسيج الزمكان',
      hookQuestionEn: 'If a black hole is not a cosmic vacuum cleaner wandering space to devour everything, what truly happens to time and light at the edge of the event horizon?',
      hookQuestionAr: 'إذا لم يكن الثقب الأسود مكنسة فضائية تجوب الكون لتبتلع الكواكب، فما الذي يحدث حقيقةً للزمن والضوء عند حافة أفق الحدث؟',
      discussionPoints: [
        {
          en: 'Why do scientists describe the event horizon as a point of no return where time dramatically slows down relative to the outside universe?',
          ar: 'لماذا يصف علماء الفلك أفق الحدث بنقطة اللاعودة التي يتباطأ عندها تدفق الزمن بصورة هائلة مقارنة ببقية الكون؟'
        },
        {
          en: 'How do misconceptions created by science-fiction movies differ from the real physical role of supermassive black holes in holding galaxies together?',
          ar: 'كيف تختلف المفاهيم الخاطئة التي رسختها أفلام الخيال العلمي عن الدور الفيزيائي الحقيقي للثقوب السوداء العملاقة في تماسك المجرات؟'
        }
      ],
      funFactEn: 'If our Sun were magically replaced by a black hole of the exact same mass, Earth would NOT be sucked in—it would continue orbiting normally in the cold dark because the gravitational pull at that distance would remain identical!',
      funFactAr: 'لو استُبدلت شمسنا نظرياً بثقب أسود له نفس الكتلة تماماً، فلن تُبتلع الأرض على الإطلاق؛ بل ستستمر في الدوران في مدارها الطبيعي في ظلام بارد، لأن قوة الجاذبية على تلك المسافة ستظل متطابقة تماماً!',
      keywords: ['black hole', 'event horizon', 'gravity', 'escape', 'invisible', 'dimension', 'curiosity', 'misconception'],
      gradient: 'from-purple-900 via-indigo-900 to-slate-950',
      glowColor: 'rgba(147, 51, 234, 0.4)'
    };
  }

  // Unit 9 L34: Supermassive Giants & Space-Time Warping
  if (unitNumber === 9 && partNumber === 2) {
    return {
      badge: 'Supermassive Giants & Space-Time Warping',
      badgeArabic: 'العمالقة الفائقة وانحناء نسيج الزمكان',
      theme: 'Singularities, Stellar Collapses & The First Photograph of a Black Hole Shadow',
      themeArabic: 'نقطة التفرد، الانهيار النجمي وأول صورة لظل الثقب الأسود في التاريخ',
      hookQuestionEn: 'If you could freeze time and stand at the exact point of a gravitational singularity, how can the mass of 20 giant suns be compressed into an infinitely small point with zero volume?',
      hookQuestionAr: 'لو استطعت تجميد الزمن والوقوف عند نقطة التفرد (Singularity)، كيف يمكن لكتلة 20 شمساً عملاقة أن تنضغط في نقطة متناهية الصغر بلا حجم وبكثافة لا نهائية؟',
      discussionPoints: [
        {
          en: 'How did Einstein predict that massive black holes would bend space and time over a century before scientists captured the historic 2019 photograph of a black hole shadow?',
          ar: 'كيف تنبأ أينشتاين بأن الثقوب السوداء تلوي نسيج الزمكان قبل أكثر من 100 عام من التقاط أول صورة تاريخية لظلها عام 2019؟'
        },
        {
          en: 'What distinguishes ordinary stellar black holes from the supermassive giants containing billions of solar masses that anchor the core of the Milky Way?',
          ar: 'ما الفارق الجوهري بين الثقوب السوداء النجمية العادية وتلك العمالقة الفائقة التي تبلغ كتلتها مليارات الشموس في قلب مجرة درب التبانة؟'
        }
      ],
      funFactEn: 'The supermassive black hole at the center of the M87 galaxy photographed in 2019 has a mass equal to 6.5 billion suns and an event horizon larger than our entire solar system!',
      funFactAr: 'الثقب الأسود الهائل في قلب مجرة M87 الذي صُوِّر ظله عام 2019 تبلغ كتلته 6.5 مليار ضعف كتلة شمسنا، ويمتد أفق حدثه لمسافة أكبر من نظامنا الشمسي بأكمله!',
      keywords: ['singularity', 'astronomer', 'dense', 'compressed', 'stellar', 'supermassive', 'bend', 'Milky Way'],
      gradient: 'from-violet-950 via-indigo-900 to-fuchsia-950',
      glowColor: 'rgba(168, 85, 247, 0.35)'
    };
  }

  // Unit 10 L12: Kindness Cultures & Global Hospitality
  if (unitNumber === 10 && partNumber === 1) {
    return {
      badge: 'Kindness Cultures & Global Hospitality',
      badgeArabic: 'ثقافات اللطف وكرم الضيافة العالمي',
      theme: 'Global Expressions of Kindness, Cultural Gestures & Sacred Hospitality',
      themeArabic: 'مظاهر اللطف حول العالم، الإيماءات الثقافية، وكرم الضيافة الأصيل',
      hookQuestionEn: 'If offering a cup of mint tea in Cairo, bowing respectfully in Tokyo, or feeding guests before yourself in Mumbai all express the exact same human emotion, why do cultures invent such amazingly different gestures of kindness?',
      hookQuestionAr: 'إذا كان تقديم فنجان الشاي بالنعناع في القاهرة، والانحناء بأدب في طوكيو، وإطعام الضيف قبل أهل البيت في مومباي تعبر جميعها عن نفس المشاعر الإنسانية، فلماذا ابتكرت شعوب الأرض إيماءات وتقاليد ضيافة مختلفة ومبهرة لهذه الدرجة؟',
      discussionPoints: [
        {
          en: 'How does traditional Middle Eastern and Indian hospitality transform a complete stranger into an honored member of the family?',
          ar: 'كيف يحول كرم الضيافة العربي والهندي العريق عابر السبيل أو الغريب إلى فرد عزيز ومكرم في قلب العائلة؟'
        },
        {
          en: 'Why do simple daily verbal compliments and thoughtful micro-gestures create stronger community bonds in modern fast-paced societies?',
          ar: 'لماذا تصنع المجاملات اللفظية الصادقة والإيماءات اليومية البسيطة روابط مجتمعية قوية في عالمنا المعاصر المتسارع؟'
        }
      ],
      funFactEn: 'In traditional Bedouin Arab hospitality, it is an unbreakable ancient rule that any stranger arriving at a tent must be hosted, protected, and generously fed for three full days before ever being asked who they are or why they have come!',
      funFactAr: 'في تقاليد الضيافة البدوية العربية الأصيلة، تنص القاعدة العرفية الصارمة على وجوب استضافة عابر السبيل وحمايته وإكرامه لثلاثة أيام بلياليها بالكامل، دون أن يسأله المضيف عن هويته أو سبب قدومه!',
      keywords: ['hospitality', 'generosity', 'thoughtful', 'politeness', 'gesture', 'compliment', 'respect', 'universal'],
      gradient: 'from-amber-600 via-orange-600 to-rose-600',
      glowColor: 'rgba(245, 158, 11, 0.35)'
    };
  }

  // Unit 10 L34: Collectivist Warmth vs. Individual Independence
  if (unitNumber === 10 && partNumber === 2) {
    return {
      badge: 'Collectivist Warmth vs. Individual Independence',
      badgeArabic: 'الدفء المجتمعي الجماعي مقابل الاستقلالية الفردية',
      theme: 'Cultural Contrasts: Collectivist vs. Individualistic Welcomes, Moroccan Mint Tea & Welcoming Strangers',
      themeArabic: 'مقارنة الثقافات: كرم المجتمعات الجماعية، الاستقلال الفردي، وسر شاي النعناع المغربي',
      hookQuestionEn: 'Why can picking up the bill for a friend be considered a sacred act of generosity in Cairo or Casablanca, but feel uncomfortably patronizing at a restaurant in New York?',
      hookQuestionAr: 'لماذا يُعد دفع الفاتورة عن صديقك في القاهرة أو الدار البيضاء قمة الكرم والمروءة، بينما قد يعتبره شخص في نيويورك نوعاً من التعالي والتقليل من استقلاليته؟',
      discussionPoints: [
        {
          en: 'In collectivist African and Arab societies, hospitality is spontaneous and includes strangers. How does this communal mindset contrast with individualistic event-based hosting?',
          ar: 'في المجتمعات الجماعية الأفريقية والعربية، الضيافة عفوية تشمل حتى الغرباء. كيف تختلف هذه الروح عن استضافة المناسبات المخططة مسبقاً في الغرب؟'
        },
        {
          en: 'Why is refusing an offered glass of fresh mint tea in Morocco considered culturally rude, and what does finishing your plate signal to hosts around the world?',
          ar: 'لماذا يُعد رفض كأس الشاي بالنعناع في المغرب تصرفاً غير لائق، وماذا يعني إنهاء طعامك في الطبق للمضيفين في مختلف الثقافات؟'
        }
      ],
      funFactEn: 'In Morocco, tea ceremonies are an art form where the host pours hot green mint tea from high above the glass to create a delicate layer of froth—refusing even the third glass is culturally unthinkable!',
      funFactAr: 'في المغرب، يُعتبر تقديم الشاي بالنعناع فناً رفيعاً، حيث يُسكب الشاي من إبريق مرتفع في الهواء لصنع رغوة غنية تسمى "الرزة"، ورفض الكأس حتى لو كان الثالث يُعد أمراً غير مقبول اجتماعياً!',
      keywords: ['collectivist', 'individualistic', 'spontaneous', 'patronize', 'mint tea', 'stranger', 'well-fed', 'meaningfully'],
      gradient: 'from-teal-600 via-emerald-600 to-amber-600',
      glowColor: 'rgba(20, 184, 166, 0.35)'
    };
  }

  // Unit 11 L12: The Many Kinds of Literature & Voices in Literature
  if (unitNumber === 11 && partNumber === 1) {
    return {
      badge: 'The World of Literature & Creative Voices',
      badgeArabic: 'عوالم الأدب وأصوات المبدعين',
      theme: 'Novels, Poetry, Drama & Folktales: Connecting Humanity Through Words',
      themeArabic: 'الرواية، الشعر، المسرح، والأساطير الشعبية: جسور الكلمات بين العقول والقلوب',
      hookQuestionEn: 'If a four-line poem can express a deep feeling that takes 300 pages of prose to explain, why did human civilization invent so many different forms of literature?',
      hookQuestionAr: 'إذا كانت أربعة أبيات شعرية موزونة قادرة على تجسيد مشاعر يعجز مقال نثري من 300 صفحة عن شرحها، فلماذا ابتكرت البشرية كل هذه الأشكال المتنوعة من الأدب؟',
      discussionPoints: [
        {
          en: 'How do novels explore inner psychological struggles compared to plays that bring conflicts alive through stage dialogue and physical action?',
          ar: 'كيف تغوص الرواية في الصراعات النفسية الداخلية للشخصيات مقارنة بالمسرح الذي يجسد الصراع حياً عبر الحوار والحركة على خشبة المسرح؟'
        },
        {
          en: 'Folktales carry cultural roots and moral wisdom across generations. How did ancient people use storytelling to understand the world before modern science?',
          ar: 'تحمل الحكايات الشعبية الجذور الثقافية والحكمة الأخلاقية عبر الأجيال. كيف استعان القدماء بالقصص لفهم العالم قبل ظهور العلوم الحديثة؟'
        }
      ],
      funFactEn: 'Did you know that J.K. Rowling’s manuscript for Harry Potter was rejected by 12 major publishers before being accepted, proving that publisher rejection is truly a natural part of a writer’s journey to success!',
      funFactAr: 'هل تعلم أن مخطوطة "هاري بوتر" رُفضت من 12 دار نشر كبرى قبل قبولها، مما يؤكد أن الرفض (Rejection) والانضباط (Discipline) هما حجر الأساس لنجاح أي كاتب ومبدع!',
      keywords: ['literature', 'fiction', 'imagery', 'prose', 'dialog', 'folktale', 'rejection', 'discipline'],
      gradient: 'from-indigo-600 via-purple-600 to-rose-600',
      glowColor: 'rgba(99, 102, 241, 0.35)'
    };
  }

  // Unit 11 L34: The Joy of Poetry (William Wordsworth & The Golden Daffodils)
  if (unitNumber === 11 && partNumber === 2) {
    return {
      badge: 'The Solace of Nature & Romantic Poetry',
      badgeArabic: 'سكينة الطبيعة وروح الشعر الرومانسي',
      theme: 'William Wordsworth, Golden Daffodils & The Inward Eye of Memory',
      themeArabic: 'وليام وردزورث، أزهار النرجس الذهبية، وعين الذاكرة الباطنة',
      hookQuestionEn: 'When you are feeling lonely or stressed, can remembering a field of golden daffodils dancing beside a lake genuinely turn your sadness into peaceful joy?',
      hookQuestionAr: 'عندما تشعر بالوحدة أو وطأة الضغوط، هل يمكن لاستحضار مشهد أزهار النرجس الذهبية الراقصة على ضفاف البحيرة أن يحول حزنك حقاً إلى سكينة وبهجة عميقة؟',
      discussionPoints: [
        {
          en: 'How does sensory imagery of flowers fluttering in the breeze and sparkling water ripples give people emotional strength in difficult times?',
          ar: 'كيف تمنحنا الصور الحسية للأزهار وهي ترفرف في النسيم العليل وموجات الماء المتلألئة قوة وعزيمة معنوية لتجاوز الأوقات الصعبة؟'
        },
        {
          en: 'Why did Wordsworth’s cheerful tone, melodic rhythm, and everyday words revolutionize poetry compared to rigid classical verse?',
          ar: 'لماذا أحدثت نغمة وردزورث المبهجة وإيقاعه الانسيابي ولغته العفوية ثورة كبرى في عالم الشعر مقارنة بالقصائد الكلاسيكية المعقدة؟'
        }
      ],
      funFactEn: 'William Wordsworth was inspired to write “I Wandered Lonely as a Cloud” after a walk with his sister Dorothy in the Lake District, where they suddenly discovered a long belt of daffodils fluttering and dancing with the water ripples!',
      funFactAr: 'استلهم الشاعر الإنجليزي وليام وردزورث قصيدته الخالدة أثناء نزهة ريفية مع أخته دوروثي في منطقة البحيرات، حيث فوجئا بشريط طويل ممتد من أزهار النرجس الذهبية يتمايل ويرقص مع نسيم الماء، فخلّد هذا المشهد في واحدة من أشهر قصائد العالم!',
      keywords: ['daffodils', 'breeze', 'cheerful', 'tone', 'rhythm', 'flow', 'memories', 'peaceful'],
      gradient: 'from-amber-500 via-emerald-600 to-teal-700',
      glowColor: 'rgba(245, 158, 11, 0.35)'
    };
  }

  // Unit 12 L12: Choosing a University & Future Careers
  if (unitNumber === 12 && partNumber === 1) {
    return {
      badge: 'University Pathways & Career Horizons',
      badgeArabic: 'مسارات الجامعة وآفاق المستقبل المهني',
      theme: 'Choosing a University, Degree vs. Apprenticeship & Life Independence',
      themeArabic: 'اختيار الجامعة، الشهادة الأكاديمية مقابل التدريب المهني، واستقلالية القرار',
      hookQuestionEn: 'If choosing the wrong university subject can make your academic life difficult, how do you discover which degree truly matches your passions, talents, and future lifestyle?',
      hookQuestionAr: 'إذا كان اختيار التخصص الجامعي الخاطئ قد يجعل حياتك الأكاديمية شاقة، فكيف تحدد التخصص والجامعة التي تناسب حقاً شغفك وقدراتك ونمط الحياة الذي تطمح إليه؟',
      discussionPoints: [
        {
          en: 'How can high school seniors effectively match their personal strengths with future fields like medicine, engineering, computer science, or education?',
          ar: 'كيف يستطيع طلاب الثانوية المواءمة بنجاح بين نقاط قوتهم الشخصية وبين التخصصات المستقبلية كالطب والهندسة وعلوم الحاسب والآداب؟'
        },
        {
          en: 'Studying abroad builds independence, courage, and cultural awareness. What are the key financial and personal challenges to prepare for?',
          ar: 'تبني الدراسة بالخارج الاستقلالية والشجاعة والوعي الثقافي. ما هي أهم التحديات المالية والشخصية التي يجب الاستعداد لها مبكراً؟'
        }
      ],
      funFactEn: 'Did you know that many world-renowned pioneers, from tech innovators to celebrated fashion creators, chose practical apprenticeships or changed majors before landing their dream careers?',
      funFactAr: 'هل تعلم أن العديد من رواد العالم، من مطوري التكنولوجيا إلى كبار المصممين، خاضوا فترات تدريب مهني (Apprenticeships) أو غيروا تخصصاتهم قبل الوصول إلى وظائف أحلامهم، مما يثبت أن استشارة المرشدين واكتساب المهارات الواقعية هما سر التميز!',
      keywords: ['career', 'university', 'reputation', 'counselor', 'independence', 'cultural awareness', 'apprenticeship', 'abroad'],
      gradient: 'from-blue-600 via-indigo-600 to-cyan-600',
      glowColor: 'rgba(37, 99, 235, 0.35)'
    };
  }

  // Unit 12 L34: Real Paths, Real Passions (Social Media, Egyptology & Marine Diving)
  if (unitNumber === 12 && partNumber === 2) {
    return {
      badge: 'Real Paths, Real Passions',
      badgeArabic: 'مسارات حقيقية وشغف جامعي حقيقي',
      theme: 'Non-Traditional Degrees: Social Media Ethics, Egyptology & Marine Diving Science',
      themeArabic: 'تخصصات جامعية فريدة: أخلاقيات السوشيال ميديا، المصريات، وتكنولوجيا الغوص البحري',
      hookQuestionEn: 'Why do so many people mistakenly think that digital media is just endless scrolling, Egyptology is wearing pharaoh hats, or diving science is just swimming—and how do unusual degrees turn real passion into extraordinary careers?',
      hookQuestionAr: 'لماذا يعتقد الكثيرون خطأً أن دراسة السوشيال ميديا مجرد تصفح عشوائي، والمصريات مجرد ارتداء تاج الفرعون، وعلوم الغوص مجرد سباحة—وكيف تحول هذه التخصصات الفريدة الشغف الحقيقي إلى مهن استثنائية؟',
      discussionPoints: [
        {
          en: 'Rana loves how practical her social media course is with a 12-week agency internship: Why do hands-on internships give university graduates such a massive advantage in landing jobs?',
          ar: 'أشادت رنا بالجانب العملي في دراستها من خلال تدريب 12 أسبوعاً بوكالة رقمية: لماذا يمنح التدريب العملي خريجي الجامعات ميزة تنافسية هائلة للحصول على وظائف فور التخرج؟'
        },
        {
          en: 'Adel studies hieroglyphics and Hind studies marine psychology: How does choosing a major based on deep personal passion make challenging study routines feel exciting and deeply rewarding?',
          ar: 'يدرس عادل الهيروغليفية وهند تدرس علم النفس البحري: كيف يجعل اختيار التخصص القائم على الشغف الحقيقي المذاكرة الصعبة ممتعة ومجزية ومحفزة على الإبداع؟'
        }
      ],
      funFactEn: 'Did you know that Egyptology began formally in 1822 when the Rosetta Stone was deciphered, and today Red Sea diving technology researchers test underwater gear at depths exceeding 100 meters where no sunlight penetrates!',
      funFactAr: 'هل تعلم أن علم المصريات تأسس رسمياً عام 1822 مع فك رموز حجر رشيد، واليوم يختبر باحثو تكنولوجيا الغوص بالبحر الأحمر معدات متطورة على أعماق تزيد عن 100 متر في ظلام دامس لا ينفذ إليه ضوء الشمس!',
      keywords: ['passion', 'practical', 'ethical', 'hieroglyphics', 'psychology', 'scroll', 'solid team', 'specialize'],
      gradient: 'from-teal-600 via-emerald-600 to-cyan-700',
      glowColor: 'rgba(13, 148, 136, 0.35)'
    };
  }

  // Unit 7 L34: A New Experience (Tokyo, Japan) (also fallback)
  return {
    badge: 'Tokyo Shock & Japanese Politeness',
    badgeArabic: 'صدمة طوكيو الحضارية ورقي الشارع الياباني',
    theme: 'Solo Travel, Cultural Discovery & Language Navigation',
    themeArabic: 'السفر الفردي، الاكتشاف الثقافي وتجاوز حواجز اللغة',
    hookQuestionEn: 'If you arrived all alone in Tokyo without speaking any Japanese, how would you find your way and order authentic hot ramen in the world’s busiest metropolis?',
    hookQuestionAr: 'لو وصلت بمفردك تماماً إلى طوكيو دون أن تجيد أي كلمة يابانية، كيف ستجد طريقك وتطلب طبق الرامين اللذيذ في أكثر مدن العالم ازدحاماً؟',
    discussionPoints: [
      {
        en: 'Why does learning even 5 basic polite phrases (like thank you or excuse me) completely change the hospitality you receive abroad?',
        ar: 'لماذا يغير تعلم 5 عبارات أساسية مهذبة فقط (مثل شكراً ومعذرة) شكل الترحيب والتعاون الذي تتلقاه من السكان المحليين؟'
      },
      {
        en: 'The traveler noticed that even in massive rush hour crowds, nobody pushed or shouted. What does this reveal about community culture and respect?',
        ar: 'لاحظ المسافر أنه حتى في ذروة الزحام، لم يدفع أحد أحداً ولم يصرخ أحد. ماذا يكشف ذلك عن ثقافة المجتمع والاحترام المتبادل؟'
      }
    ],
    funFactEn: 'Tokyo’s Shinjuku Station is officially the busiest railway hub in the world, handling 3.5 million passengers daily across 36 platforms with precision timing!',
    funFactAr: 'محطة شينجوكو في طوكيو هي المحطة الأكثر ازدحاماً في العالم رسمياً، حيث تعبر من خلالها 3.5 مليون مسافر يومياً عبر 36 رصيفاً وبدقة توقيت متناهية!',
    keywords: ['board the plane', 'navigate the terminal', 'basic phrases', 'cleanliness', 'in person', 'ramen'],
    gradient: 'from-amber-600 via-rose-600 to-indigo-600',
    glowColor: 'rgba(244, 63, 94, 0.35)'
  };
};

export const StoryHook: React.FC<StoryHookProps> = ({ unitNumber, partNumber }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [completedPoints, setCompletedPoints] = useState<number[]>([]);
  const hook = getHookDataForUnit(unitNumber, partNumber);

  const toggleExpand = () => {
    if (!isExpanded) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899']
      });
    }
    setIsExpanded(prev => !prev);
  };

  const togglePoint = (index: number) => {
    setCompletedPoints(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="mb-8 relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 transition-all duration-300">
      {/* Top Animated Shimmer Bar */}
      <div className={`h-2.5 w-full bg-gradient-to-r ${hook.gradient} animate-pulse`} />

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Badge & Unit Marker Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-black text-white bg-gradient-to-r ${hook.gradient} shadow-xs`}>
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{hook.badge}</span>
              <span className="opacity-80">|</span>
              <span className="font-ar font-bold">{hook.badgeArabic}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            <span>Unit {unitNumber} • Part {partNumber}</span>
          </div>
        </div>

        {/* Big Hook Question (Whiteboard-Ready Typography) */}
        <div className="my-3 sm:my-5 space-y-3">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 shadow-xs border border-blue-100 dark:border-blue-800/50">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                The Core Warm-Up Hook • خطاف التمهيد والتفكير
              </span>
              <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white font-en leading-snug tracking-tight break-words">
                {hook.hookQuestionEn}
              </h2>
            </div>
          </div>

          {/* Arabic Hook translation for classroom teachers */}
          <div className="pr-0 sm:pr-3">
            <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-700 dark:text-slate-300 font-ar leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800">
              💡 {hook.hookQuestionAr}
            </p>
          </div>
        </div>

        {/* Interactive Classroom Discussion Trigger */}
        <div className="pt-2">
          <button
            onClick={toggleExpand}
            className={`w-full flex items-center justify-between px-3.5 py-3 sm:px-5 sm:py-4 rounded-2xl font-black text-xs sm:text-base transition-all border shadow-xs active:scale-98 touch-manipulation min-h-[48px] sm:min-h-[56px] ${
              isExpanded
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-800'
                : `text-white bg-gradient-to-r ${hook.gradient} hover:opacity-95 border-transparent shadow-md`
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BrainCircuit className="w-5 h-5 shrink-0" />
              <span>{isExpanded ? 'إخفاء محاور النقاش التفاعلية' : '🧠 اضغط هنا لفتح محاور النقاش وسؤال العصف الذهني للفصل'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-90 hidden sm:inline">
                {isExpanded ? 'Collapse' : 'Interactive Discussion'}
              </span>
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 animate-pulse" />}
            </div>
          </button>
        </div>

        {/* Collapsible Interactive Discussion Points */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Discussion Prompts with Checkboxes */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-3">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Classroom Discussion Questions • محاور النقاش الصفي للسبورة الذكية</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hook.discussionPoints.map((pt, idx) => {
                  const isChecked = completedPoints.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => togglePoint(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer select-none active:scale-98 ${
                        isChecked
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                          isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-en font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5 leading-snug">
                            {idx + 1}. {pt.en}
                          </p>
                          <p className="font-ar text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {pt.ar}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scientific & Cultural Fun Fact Box */}
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-800 dark:text-amber-300 mb-2">
                <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Did You Know? • معلومة علمية مدهشة</span>
              </div>
              <p className="font-en text-sm sm:text-base text-slate-800 dark:text-slate-200 font-semibold mb-1">
                "{hook.funFactEn}"
              </p>
              <p className="font-ar text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                📌 {hook.funFactAr}
              </p>
            </div>

            {/* Key Vocabulary Teaser Badges */}
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                Key Concept Tags in this Passage • مفاهيم محورية ستتعرف عليها في النص:
              </span>
              <div className="flex flex-wrap gap-2">
                {hook.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs sm:text-sm font-bold font-en bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
