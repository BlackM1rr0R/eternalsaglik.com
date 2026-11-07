// Symptom guide / body map: points visitors to the right service, article, serum or care guide.
// This is navigation help, not a diagnosis; red-flag symptoms always point to 112.
// Link fields: service = service slug, article = article id (1-19), serum = serum id, guide = care guide slug.
export const bodyRegions = [
  {
    id: "head", label: "Baş & Genel",
    intro: "Genel halsizlik, ateş, baş ağrısı ve günlük enerjiyi etkileyen şikayetler.",
    symptoms: [
      { s: "Halsizlik, yorgunluk, enerji düşüklüğü", service: "evde-serum", article: 15 },
      { s: "Ateş, grip, sık hastalanma", service: "evde-doktor", article: 6, guide: "ates-yonetimi" },
      { s: "Mevsim geçişlerinde bağışıklık desteği", serum: 17, article: 18 },
      { s: "Baş ağrısı, baş dönmesi", service: "evde-doktor", article: 13 },
      { s: "Uyku düzensizliği, stres, yorgun uyanma", service: "evde-doktor", article: 18 },
      { s: "Saç dökülmesi, tırnak kırılması", serum: 9 },
      { s: "Yaşlı yakında ilaçları karıştırma, unutma", service: "evde-hasta-bakici", guide: "evde-ilac-duzeni" },
    ],
    redFlag: "Ani ve çok şiddetli baş ağrısı, yüzde kayma, konuşma bozukluğu veya bilinç bulanıklığında hemen 112'yi arayın.",
  },
  {
    id: "chest", label: "Göğüs & Solunum",
    intro: "Nefes, kalp ve tansiyonla ilgili takip gerektiren durumlar.",
    symptoms: [
      { s: "Nefes darlığı, astım, öksürük", service: "evde-doktor", article: 3 },
      { s: "Kronik solunum hastalığı, buhar / oksijen uygulaması", service: "evde-hemsire", article: 12 },
      { s: "Tansiyon yüksekliği, çarpıntı", service: "evde-doktor", article: 13, guide: "evde-tansiyon-olcumu" },
      { s: "Kalp yetmezliği takibi", service: "evde-doktor", article: 4 },
      { s: "Kalp ve tansiyon kontrolü (EKG ile check-up)", service: "evde-check-up", article: 13 },
      { s: "Covid-19 şüphesi, PCR testi", service: "evde-tahlil", article: 6 },
    ],
    redFlag: "Ani ve şiddetli göğüs ağrısı veya ağır nefes darlığında hemen 112'yi arayın.",
  },
  {
    id: "belly", label: "Karın & Sindirim",
    intro: "Sindirim, sıvı kaybı, şeker ve idrar yolu şikayetleri.",
    symptoms: [
      { s: "İshal, kusma, sıvı kaybı", service: "evde-serum", article: 1, serum: 8 },
      { s: "Kan şekeri yüksekliği (diyabet)", service: "evde-doktor", article: 2 },
      { s: "İdrar yanması, sık idrara çıkma", service: "evde-tahlil", article: 9 },
      { s: "İdrar sondası kullanımı, sonda değişimi", service: "evde-hemsire", guide: "sonda-bakimi" },
      { s: "İştahsızlık, kilo kaybı (özellikle yaşlılarda)", service: "evde-doktor", article: 18 },
      { s: "Kan değerlerimi kontrol ettirmek istiyorum", service: "evde-check-up", article: 17 },
    ],
    redFlag: "Şiddetli ve geçmeyen karın ağrısı, kanlı kusma veya dışkı ya da bilinç bulanıklığına yol açan sıvı kaybında hemen 112'yi arayın.",
  },
  {
    id: "arms", label: "Kollar & Eller",
    intro: "Enjeksiyon, kan alma, serum sonrası ve kas-eklem şikayetleri.",
    symptoms: [
      { s: "Doktorun yazdığı iğne / serum", service: "evde-hemsire", article: 7 },
      { s: "Kan tahlili yaptırmam lazım", service: "evde-tahlil", article: 10 },
      { s: "Serum sonrası kolda morarma veya şişlik", service: "evde-hemsire", guide: "serum-sonrasi" },
      { s: "Kas krampları, uyuşma", serum: 4 },
      { s: "Spor sonrası kas yorgunluğu", serum: 11 },
      { s: "Omuz veya eklem ağrısı, hareket kısıtlılığı", service: "evde-doktor", article: 14 },
    ],
    redFlag: "Göğüsten sol kola ya da çeneye yayılan ağrı veya kolda ani güçsüzlük olursa hemen 112'yi arayın.",
  },
  {
    id: "legs", label: "Bacaklar & Ayaklar",
    intro: "Ayak sağlığı, hareket, denge ve dolaşımla ilgili durumlar.",
    symptoms: [
      { s: "Diyabetik ayak yarası", service: "yara-bakimi", guide: "diyabetik-ayak-bakimi" },
      { s: "Hareket kısıtlılığı, eklem ağrısı", service: "evde-doktor", article: 14 },
      { s: "Bacakta şişlik, iltihap", service: "evde-doktor", article: 8 },
      { s: "Denge sorunu, düşme korkusu (yaşlılarda)", service: "evde-hasta-bakici", guide: "dusmeleri-onleme" },
      { s: "Yürüyemeyen hastanın hastaneye / eve nakli", service: "ozel-ambulans" },
      { s: "Kas ağrısı ve tutulma (tamamlayıcı uygulamalar)", service: "evde-geleneksel-tip", article: 18 },
    ],
    redFlag: "Tek bacakta ani şişlik, ağrı ve kızarıklıkla birlikte nefes darlığı olursa hemen 112'yi arayın.",
  },
  {
    id: "skin", label: "Cilt & Yara",
    intro: "Ameliyat yaraları, bası yaraları, iltihap ve cilt bakımı.",
    symptoms: [
      { s: "Ameliyat yarası, dikiş alma", service: "yara-bakimi", guide: "ameliyat-sonrasi-yara-bakimi" },
      { s: "Bası yarası (yatağa bağımlı hasta)", service: "yara-bakimi", guide: "basi-yarasi-onleme" },
      { s: "Yara, iltihaplanma", service: "yara-bakimi", article: 11 },
      { s: "Cilt lekeleri, cilt yorgunluğu", serum: 3, article: 5 },
      { s: "Cilt parlaklığı ve bakım desteği", serum: 10 },
      { s: "Yatağa bağımlı hastada hijyen ve cilt bakımı", service: "evde-hasta-bakici", guide: "basi-yarasi-onleme" },
    ],
    redFlag: "Hızla yayılan kızarıklık ve yüksek ateş ya da dudak-dil şişmesi ve nefes darlığıyla gelen döküntüde hemen 112'yi arayın.",
  },
];

export const redFlags = [
  "Bilinç kaybı veya bayılma",
  "Ani, şiddetli göğüs ağrısı",
  "Ağır nefes darlığı",
  "Yüzde kayma, konuşma bozukluğu, kolda/bacakta ani güçsüzlük",
  "Durdurulamayan kanama",
  "Dudak veya dil şişmesiyle gelen alerjik reaksiyon",
];

// Translations keyed by region id; `symptoms` follows the order of the Turkish list.
export const translations = {
  en: {
    head: {
      label: "Head & General",
      intro: "General weakness, fever, headaches and complaints that affect your everyday energy.",
      symptoms: [
        "Weakness, tiredness, low energy",
        "Fever, flu, getting ill often",
        "Immune support during seasonal changes",
        "Headache, dizziness",
        "Poor sleep, stress, waking up tired",
        "Hair loss, brittle nails",
        "An elderly relative mixing up or forgetting medicines",
      ],
      redFlag: "For a sudden, very severe headache, a drooping face, slurred speech or confusion, call 112 immediately.",
    },
    chest: {
      label: "Chest & Breathing",
      intro: "Breathing, heart and blood pressure conditions that need monitoring.",
      symptoms: [
        "Shortness of breath, asthma, cough",
        "Chronic lung disease, steam / oxygen therapy",
        "High blood pressure, palpitations",
        "Heart failure follow-up",
        "Heart and blood pressure check (check-up with ECG)",
        "Suspected Covid-19, PCR test",
      ],
      redFlag: "For sudden severe chest pain or severe shortness of breath, call 112 immediately.",
    },
    belly: {
      label: "Abdomen & Digestion",
      intro: "Digestive problems, fluid loss, blood sugar and urinary complaints.",
      symptoms: [
        "Diarrhoea, vomiting, fluid loss",
        "High blood sugar (diabetes)",
        "Burning when urinating, frequent urination",
        "Using a urinary catheter, catheter change",
        "Loss of appetite, weight loss (especially in older people)",
        "I want my blood values checked",
      ],
      redFlag: "For severe abdominal pain that does not ease, vomiting or passing blood, or fluid loss causing confusion, call 112 immediately.",
    },
    arms: {
      label: "Arms & Hands",
      intro: "Injections, blood tests, after an IV drip, and muscle or joint complaints.",
      symptoms: [
        "An injection / drip prescribed by my doctor",
        "I need a blood test",
        "Bruising or swelling in the arm after a drip",
        "Muscle cramps, numbness",
        "Muscle fatigue after sport",
        "Shoulder or joint pain, limited movement",
      ],
      redFlag: "If pain spreads from the chest to the left arm or jaw, or an arm suddenly becomes weak, call 112 immediately.",
    },
    legs: {
      label: "Legs & Feet",
      intro: "Foot health, mobility, balance and circulation.",
      symptoms: [
        "Diabetic foot wound",
        "Limited movement, joint pain",
        "Swelling or inflammation in the leg",
        "Balance problems, fear of falling (in older people)",
        "Transport to hospital / home for a patient who cannot walk",
        "Muscle pain and stiffness (complementary therapies)",
      ],
      redFlag: "If one leg suddenly becomes swollen, painful and red together with shortness of breath, call 112 immediately.",
    },
    skin: {
      label: "Skin & Wounds",
      intro: "Surgical wounds, pressure sores, inflammation and skin care.",
      symptoms: [
        "Surgical wound, stitch removal",
        "Pressure sore (bed-bound patient)",
        "Wound, inflammation",
        "Skin blemishes, tired-looking skin",
        "Skin radiance and care support",
        "Hygiene and skin care for a bed-bound patient",
      ],
      redFlag: "For rapidly spreading redness with a high fever, or a rash with swollen lips or tongue and shortness of breath, call 112 immediately.",
    },
    redFlags: [
      "Loss of consciousness or fainting",
      "Sudden, severe chest pain",
      "Severe shortness of breath",
      "Drooping face, slurred speech, sudden weakness in an arm or leg",
      "Bleeding that will not stop",
      "An allergic reaction with swelling of the lips or tongue",
    ],
  },
  ar: {
    head: {
      label: "الرأس والحالة العامة",
      intro: "الضعف العام والحمّى والصداع والشكاوى التي تؤثر في طاقتك اليومية.",
      symptoms: [
        "ضعف وتعب وانخفاض الطاقة",
        "حمّى وإنفلونزا وكثرة المرض",
        "دعم المناعة في تقلبات الفصول",
        "صداع ودوار",
        "اضطراب النوم والتوتر والاستيقاظ متعباً",
        "تساقط الشعر وتكسّر الأظافر",
        "قريب مسن يخلط أدويته أو ينساها",
      ],
      redFlag: "عند صداع مفاجئ شديد جداً أو ميلان الوجه أو صعوبة الكلام أو التشوش، اتصل بـ 112 فوراً.",
    },
    chest: {
      label: "الصدر والتنفس",
      intro: "حالات التنفس والقلب وضغط الدم التي تحتاج إلى متابعة.",
      symptoms: [
        "ضيق التنفس والربو والسعال",
        "مرض تنفسي مزمن، جلسات بخار / أكسجين",
        "ارتفاع ضغط الدم والخفقان",
        "متابعة قصور القلب",
        "فحص القلب وضغط الدم (فحص شامل مع تخطيط القلب)",
        "اشتباه كوفيد-19، اختبار PCR",
      ],
      redFlag: "عند ألم مفاجئ وشديد في الصدر أو ضيق تنفس شديد، اتصل بـ 112 فوراً.",
    },
    belly: {
      label: "البطن والهضم",
      intro: "مشكلات الهضم وفقدان السوائل وسكر الدم والمسالك البولية.",
      symptoms: [
        "إسهال وقيء وفقدان السوائل",
        "ارتفاع سكر الدم (السكري)",
        "حرقة البول وكثرة التبول",
        "استخدام القسطرة البولية وتغييرها",
        "فقدان الشهية ونقص الوزن (خاصة لدى كبار السن)",
        "أريد فحص قيم الدم لدي",
      ],
      redFlag: "عند ألم شديد في البطن لا يزول، أو قيء أو براز مدمّى، أو فقدان سوائل يسبب التشوش، اتصل بـ 112 فوراً.",
    },
    arms: {
      label: "الذراعان واليدان",
      intro: "الحقن وسحب الدم وما بعد المحلول الوريدي وشكاوى العضلات والمفاصل.",
      symptoms: [
        "حقنة / محلول وصفه الطبيب",
        "أحتاج إلى تحليل دم",
        "كدمة أو تورم في الذراع بعد المحلول",
        "تشنجات عضلية وتنميل",
        "إرهاق العضلات بعد الرياضة",
        "ألم في الكتف أو المفاصل ومحدودية الحركة",
      ],
      redFlag: "إذا امتد الألم من الصدر إلى الذراع اليسرى أو الفك، أو ضعفت الذراع فجأة، اتصل بـ 112 فوراً.",
    },
    legs: {
      label: "الساقان والقدمان",
      intro: "صحة القدم والحركة والتوازن والدورة الدموية.",
      symptoms: [
        "جرح القدم السكرية",
        "محدودية الحركة وألم المفاصل",
        "تورم أو التهاب في الساق",
        "مشكلات التوازن والخوف من السقوط (لدى كبار السن)",
        "نقل مريض لا يستطيع المشي إلى المستشفى / المنزل",
        "ألم العضلات وتيبّسها (تطبيقات تكميلية)",
      ],
      redFlag: "إذا تورمت ساق واحدة فجأة مع ألم واحمرار وضيق في التنفس، اتصل بـ 112 فوراً.",
    },
    skin: {
      label: "الجلد والجروح",
      intro: "جروح العمليات وقرح الفراش والالتهاب والعناية بالبشرة.",
      symptoms: [
        "جرح عملية جراحية، إزالة الغرز",
        "قرحة الفراش (مريض طريح الفراش)",
        "جرح والتهاب",
        "بقع البشرة وإرهاقها",
        "دعم نضارة البشرة والعناية بها",
        "النظافة والعناية بالجلد لمريض طريح الفراش",
      ],
      redFlag: "عند احمرار ينتشر بسرعة مع حرارة مرتفعة، أو طفح مع تورم الشفتين أو اللسان وضيق التنفس، اتصل بـ 112 فوراً.",
    },
    redFlags: [
      "فقدان الوعي أو الإغماء",
      "ألم مفاجئ وشديد في الصدر",
      "ضيق تنفس شديد",
      "ميلان الوجه وصعوبة الكلام وضعف مفاجئ في الذراع أو الساق",
      "نزيف لا يتوقف",
      "تفاعل تحسسي مع تورم الشفتين أو اللسان",
    ],
  },
};

// Region with translated label/intro/redFlag and symptom texts (link fields stay from the base).
export const localizeRegion = (r, lang) => {
  const tr = lang !== "tr" ? translations[lang]?.[r.id] : null;
  if (!tr) return r;
  return {
    ...r,
    label: tr.label || r.label,
    intro: tr.intro || r.intro,
    redFlag: tr.redFlag || r.redFlag,
    symptoms: r.symptoms.map((s, i) => ({ ...s, s: tr.symptoms?.[i] || s.s })),
  };
};

export const localizedRedFlags = (lang) => (lang !== "tr" && translations[lang]?.redFlags) || redFlags;
