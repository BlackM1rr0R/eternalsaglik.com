import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  MagnifyingGlass, Syringe, ArrowRight, Star, WhatsappLogo, MagicWand, Drop, ShieldCheck, HouseLine, Stethoscope,
  ChatCircleDots, ClipboardText, FirstAidKit, Timer, CheckCircle, Warning, CaretDown, Phone, Siren, X, Info, ListChecks,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import SerumSVG from "../../components/serumcard";
import TiltCard from "../../components/tiltcard";
import Icon3D from "../../components/icon3d";
import { Stagger, StaggerItem, SpotlightCard, CountUp, ScrollLine, Magnetic } from "../../components/motion";
import { CompareBar, CompareToggle, useCompare } from "../../components/compare";
import { serumList, serumCategories, listTranslations, categoryLabel, serumDetails, detailTranslations } from "../../data/serums";
import { whatsappUrl } from "../../utils/whatsapp";
import { primaryPhone, SITE } from "../../config/site";
import { useT, useLang, useLocalized, localize } from "../../i18n";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import MorphLink from "../../components/morphlink";

const dict = {
  tr: {
    badge: "IV Terapi & Serum",
    title: "Evde IV Terapi",
    highlight: "& Serum Uygulaması",
    text: "24 farklı serum seçeneği; doktor ön değerlendirmesi, steril tek kullanımlık malzeme ve uygulama boyunca yanınızda olan sağlık ekibiyle evinizin konforunda.",
    seoTitle: "Serumlar & Evde IV Terapi",
    seoDesc: "Evde IV serum uygulaması: vitamin, bağışıklık, güzellik, enerji ve detoks serumları. Ön değerlendirme, steril malzeme, Sakarya, Düzce, Kocaeli ve İstanbul.",
    stats: ["Serum çeşidi", "Kategori", "Yıllık deneyim", "Hizmet bölgesi"],
    heroWa: "WhatsApp'tan Bilgi Al",
    heroQuiz: "Bana uygun serumu bul",
    heroWaMsg: "Merhaba, evde serum uygulaması hakkında bilgi almak istiyorum.",
    searchPh: "Serum ara...",
    searchLabel: "Serum ara",
    clearSearch: "Aramayı temizle",
    filterLabel: "Kategoriye göre filtrele",
    found: "{n} serum bulundu",
    popular: "Popüler",
    view: "İncele",
    order: "Sipariş",
    orderAria: "{name} için WhatsApp ile sipariş",
    waMsg: "Merhaba, \"{name}\" serumu için randevu almak istiyorum.",
    noResults: "Arama kriterlerinize uygun serum bulunamadı.",
    clear: "Filtreleri Temizle",
    quizTitle: "Hangi serum bana uygun?",
    quizText: "3 kısa soruyu yanıtlayın, ihtiyacınıza uygun serumları önerelim.",
    quizBtn: "Teste Başla",
    whatBadge: "IV terapi nedir?",
    whatTitle: "Damar yoluyla,",
    whatAccent: "kontrollü destek",
    whatText: "IV (intravenöz) terapi; sıvı, vitamin, mineral veya antioksidanların ince bir kanül aracılığıyla doğrudan damara verilmesidir. Sindirim sisteminden geçmediği için içerik doğrudan dolaşıma ulaşır. Hastanelerde sıvı kaybını yerine koymak için uzun süredir kullanılan bu yöntem, bugün doktor değerlendirmesiyle destekleyici amaçlarla da uygulanmaktadır.",
    whatCards: [
      { t: "Doğrudan dolaşıma", d: "Sindirim sisteminden geçmediği için içerik doğrudan kana karışır; ağızdan alımda emilim sorunu yaşayanlar için alternatif olabilir." },
      { t: "Önce değerlendirme", d: "Her uygulamadan önce sağlık öykünüz, ilaçlarınız ve yakınmalarınız sorulur; içerik doktor değerlendirmesine göre belirlenir." },
      { t: "Steril ve tek kullanımlık", d: "Kanül, infüzyon seti ve serum gibi tüm malzemeler steril ve tek kullanımlıktır; hijyen kurallarına uygun çalışılır." },
      { t: "Evinizin konforunda", d: "Bekleme salonu ve trafik yok; seansı kendi koltuğunuzda, sevdiklerinizin yanında geçirirsiniz." },
    ],
    whatNote: "IV serumlar dengeli beslenmenin, yeterli su tüketiminin ve doktorunuzun önerdiği tedavilerin yerine geçmez; destekleyici bir uygulamadır.",
    stepsBadge: "Evde seans nasıl işler?",
    stepsTitle: "Mesajdan seansa",
    stepsAccent: "5 adımda",
    steps: [
      { t: "Bize ulaşın", d: "WhatsApp veya telefonla ulaşın; ilgilendiğiniz serumu, adresinizi ve size uygun zamanı paylaşın." },
      { t: "Ön değerlendirme", d: "Yaşınız, kronik hastalıklarınız, alerjileriniz, hamilelik durumunuz ve kullandığınız ilaçlar sorulur. Gerekirse önce kan testi planlanır." },
      { t: "Ekibimiz kapınızda", d: "Sağlık profesyonelimiz steril malzemelerle gelir; tansiyon, nabız ve genel durumunuz kontrol edilir." },
      { t: "Uygulama", d: "Kolunuza ince bir damar yolu açılır ve serum yavaşça verilir. Süre içeriğe göre genellikle 30–60 dakikadır; bu sırada dinlenebilir, kitap okuyabilirsiniz." },
      { t: "Sonrası", d: "Damar yolu çıkarılır ve giriş yeri kapatılır. Kısa bir gözlemin ardından günlük yaşamınıza dönebilirsiniz; dikkat etmeniz gerekenler anlatılır." },
    ],
    prepTitle: "Seansa hazırlık",
    prepTime: "Uygulama süresi: genellikle 30–60 dakika",
    prep: [
      "Uygulamadan önce hafif bir öğün yiyin ve su için.",
      "Kolunuzu rahatça açabileceğiniz bir kıyafet giyin.",
      "Kullandığınız ilaçların listesini ve varsa son tahlil sonuçlarınızı hazır bulundurun.",
      "Rahat bir koltuk veya yatak ve iyi aydınlatılmış bir alan yeterlidir.",
    ],
    safetyBadge: "Güvenlik",
    safetyTitle: "Önce",
    safetyAccent: "doktorunuza danışın",
    safetyText: "Serum herkes için uygun olmayabilir. Aşağıdaki durumlardan biri varsa mutlaka belirtin; uygulamanın uygun olup olmadığına doktor karar verir.",
    consultTitle: "Şu durumlarda önce doktorunuza danışın",
    consult: [
      "Hamilelik veya emzirme dönemi",
      "Böbrek hastalığı ya da böbrek taşı öyküsü",
      "Kalp yetmezliği, ritim bozukluğu veya tansiyon sorunları",
      "Karaciğer hastalığı",
      "İlaç, vitamin veya besin alerjisi",
      "Düzenli kullanılan ilaçlar (özellikle kan sulandırıcı, kalp ve diyabet ilaçları)",
      "G6PD eksikliği (özellikle C vitamini içeren serumlarda)",
      "18 yaşından küçük bireyler",
    ],
    practiceTitle: "Uygulama sırasında",
    practices: [
      "Uygulama öncesi tansiyon ve nabız ölçümü",
      "Steril, tek kullanımlık kanül ve infüzyon seti",
      "Uygulama boyunca sağlık profesyoneli yanınızda",
      "Uygun bulunmazsa uygulama yapılmaz; sizi doğru birime yönlendiririz",
    ],
    sideTitle: "Olası yan etkiler",
    sideText: "Çoğu kişi uygulamayı rahat geçirir. Damar yolu açılan yerde hafif morarma, kısa süreli serinlik veya sıcaklık hissi görülebilir. Kaşıntı, nefes darlığı, göğüs ağrısı veya baş dönmesi olursa hemen söyleyin; uygulama durdurulur.",
    redFlag: "Göğüs ağrısı, nefes darlığı, bilinç bulanıklığı, felç belirtileri veya ağır kanama gibi acil durumlarda serum beklemeyin, hemen 112'yi arayın.",
    call112: "112'yi Ara",
    faqBadge: "SSS",
    faqTitle: "Serumlar hakkında",
    faqAccent: "merak edilenler",
    faq: [
      { q: "Serum uygulaması acıtır mı?", a: "Damar yolu açılırken kısa bir iğne batması hissedilir. Kanül yerleştirildikten sonra çoğu kişi uygulama boyunca belirgin bir rahatsızlık hissetmez." },
      { q: "Bir seans ne kadar sürer?", a: "İçeriğe göre değişmekle birlikte çoğu serum 30–60 dakika sürer. NAD+ gibi yavaş verilmesi gereken içerikler daha uzun sürebilir. Hazırlık ve kısa gözlemle birlikte toplam ziyaret biraz daha uzundur." },
      { q: "Hangi serumun bana uygun olduğunu nasıl bilirim?", a: "Serum testimiz size fikir verebilir; ancak kesin içerik, sağlık öykünüz ve gerekirse tahlil sonuçlarınız değerlendirildikten sonra doktor tarafından belirlenir." },
      { q: "Kaç seans gerekir?", a: "Kişiye ve amaca göre değişir. Tek seanslık destekten birkaç seanslık planlara kadar farklı seçenekler olabilir; sıklığa doktor değerlendirmesiyle karar verilir." },
      { q: "Serumdan önce kan tahlili gerekir mi?", a: "Her serum için zorunlu değildir; ancak D vitamini veya yüksek doz C vitamini gibi bazı uygulamalarda ya da kronik bir hastalığınız varsa önce tahlil önerilebilir. Evde kan alma hizmetimizle bunu da planlayabiliriz." },
      { q: "Serum yerine vitamin hapı kullanamaz mıyım?", a: "Pek çok kişi için dengeli beslenme ve gerekirse ağızdan takviye yeterlidir. Serum; emilim sorunu, ağızdan alım güçlüğü veya hızlı sıvı ihtiyacı gibi durumlarda tercih edilebilir. En doğrusu doktorunuzla birlikte karar vermektir." },
      { q: "Ofiste veya otelde de uygulama yapıyor musunuz?", a: "Evet; evinizin yanı sıra uygun koşullar sağlanabiliyorsa ofisinizde veya konakladığınız otelde de uygulama planlanabilir. Hizmet bölgelerimiz: Sakarya, Düzce, Kocaeli ve İstanbul." },
      { q: "Ücretler nasıl belirleniyor?", a: "Ücret; serumun içeriğine, seans sayısına ve adresinize göre değişir. Güncel bilgi için WhatsApp veya telefonla bize ulaşabilirsiniz." },
    ],
    ctaTitle: "Size uygun serumu",
    ctaAccent: "birlikte belirleyelim",
    ctaText: "Sorularınızı WhatsApp'tan yazın ya da arayın; ekibimiz ön değerlendirme için size yardımcı olsun. 7 gün / 24 saat.",
    ctaWa: "WhatsApp'tan Yazın",
    ctaCall: "Hemen Ara",
    disclaimer: "Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır; tanı veya tedavi önerisi yerine geçmez.",
    cmpHeading: "Serum karşılaştırması",
    cmpRows: { category: "Kategori", desc: "Kısa açıklama", types: "Destek alanları", duration: "Uygulama süresi", forWho: "Kimler için?", consult: "Önce doktora danışılması gerekenler" },
    cmpWa: "Merhaba, \"{name}\" serumu hakkında bilgi almak istiyorum.",
  },
  en: {
    badge: "IV Therapy & Drips",
    title: "IV Therapy at Home",
    highlight: "& Vitamin Drips",
    text: "24 drip options, delivered in the comfort of your home with a doctor's pre-assessment, sterile single-use equipment and a healthcare team that stays with you throughout.",
    seoTitle: "IV Drips & IV Therapy at Home",
    seoDesc: "IV drips at home: vitamin, immunity, beauty, energy and detox drips. Pre-assessment and sterile equipment in Sakarya, Düzce, Kocaeli and Istanbul.",
    stats: ["Drip options", "Categories", "Years of experience", "Service regions"],
    heroWa: "Ask on WhatsApp",
    heroQuiz: "Find the right drip for me",
    heroWaMsg: "Hello, I would like information about IV drips at home.",
    searchPh: "Search drips (e.g. vitamin C, NAD+)…",
    searchLabel: "Search drips",
    clearSearch: "Clear search",
    filterLabel: "Filter by category",
    found: "{n} drips found",
    popular: "Popular",
    view: "Details",
    order: "Order",
    orderAria: "Order {name} via WhatsApp",
    waMsg: "Hello, I would like to book the \"{name}\" drip.",
    noResults: "No drips match your search.",
    clear: "Clear filters",
    quizTitle: "Which drip suits me?",
    quizText: "Answer 3 short questions and we will suggest drips that match your needs.",
    quizBtn: "Start the quiz",
    whatBadge: "What is IV therapy?",
    whatTitle: "Through a vein,",
    whatAccent: "controlled support",
    whatText: "IV (intravenous) therapy means giving fluids, vitamins, minerals or antioxidants directly into a vein through a fine cannula. Because it bypasses the digestive system, the contents reach the bloodstream directly. Long used in hospitals to replace lost fluids, the method is now also used for supportive purposes after a doctor's assessment.",
    whatCards: [
      { t: "Straight to the bloodstream", d: "It bypasses digestion, so the contents enter the blood directly; an alternative for people who absorb oral supplements poorly." },
      { t: "Assessment first", d: "Before every session you are asked about your health history, medicines and complaints; the content is set after a doctor's assessment." },
      { t: "Sterile and single-use", d: "All materials, including the cannula, infusion set and drip, are sterile and single-use, and hygiene rules are followed." },
      { t: "In the comfort of home", d: "No waiting room and no traffic; you spend the session in your own armchair, close to your loved ones." },
    ],
    whatNote: "IV drips do not replace a balanced diet, drinking enough water or treatments recommended by your doctor; they are a supportive option.",
    stepsBadge: "How does a home session work?",
    stepsTitle: "From message to session",
    stepsAccent: "in 5 steps",
    steps: [
      { t: "Get in touch", d: "Contact us by WhatsApp or phone and share the drip you are interested in, your address and a time that suits you." },
      { t: "Pre-assessment", d: "You are asked about your age, chronic conditions, allergies, pregnancy and medicines. A blood test is planned first if needed." },
      { t: "Our team at your door", d: "Our healthcare professional arrives with sterile equipment and checks your blood pressure, pulse and general condition." },
      { t: "The drip", d: "A fine cannula is placed in your arm and the drip runs slowly. It usually takes 30–60 minutes depending on the content; you can rest or read meanwhile." },
      { t: "Afterwards", d: "The cannula is removed and the site is covered. After a short observation you can return to your day, and you are told what to look out for." },
    ],
    prepTitle: "Preparing for your session",
    prepTime: "Drip time: usually 30–60 minutes",
    prep: [
      "Have a light meal and drink some water beforehand.",
      "Wear clothing that lets you uncover your arm easily.",
      "Have a list of your medicines and any recent test results to hand.",
      "A comfortable chair or bed in a well-lit spot is all you need.",
    ],
    safetyBadge: "Safety",
    safetyTitle: "Talk to",
    safetyAccent: "your doctor first",
    safetyText: "A drip is not right for everyone. Please tell us if any of the following applies to you; a doctor decides whether the drip is suitable.",
    consultTitle: "Check with your doctor first if you have",
    consult: [
      "Pregnancy or breastfeeding",
      "Kidney disease or a history of kidney stones",
      "Heart failure, a heart rhythm disorder or blood-pressure problems",
      "Liver disease",
      "An allergy to medicines, vitamins or foods",
      "Regular medication (especially blood thinners, heart or diabetes medicines)",
      "G6PD deficiency (especially for drips containing vitamin C)",
      "Anyone under 18",
    ],
    practiceTitle: "During the session",
    practices: [
      "Blood pressure and pulse checked beforehand",
      "Sterile, single-use cannula and infusion set",
      "A healthcare professional with you throughout",
      "If it is not suitable, the drip is not given and we point you to the right service",
    ],
    sideTitle: "Possible side effects",
    sideText: "Most people find the session comfortable. Slight bruising at the cannula site or a brief cool or warm feeling can occur. Tell us straight away if you notice itching, shortness of breath, chest pain or dizziness; the drip will be stopped.",
    redFlag: "In an emergency such as chest pain, shortness of breath, confusion, signs of stroke or heavy bleeding, do not wait for a drip: call 112 immediately.",
    call112: "Call 112",
    faqBadge: "FAQ",
    faqTitle: "Questions about",
    faqAccent: "IV drips",
    faq: [
      { q: "Does an IV drip hurt?", a: "You feel a brief needle prick when the cannula is placed. Once it is in, most people feel no notable discomfort during the drip." },
      { q: "How long does a session take?", a: "It depends on the content, but most drips take 30–60 minutes. Contents that must be given slowly, such as NAD+, can take longer. With preparation and a short observation, the whole visit is a little longer." },
      { q: "How do I know which drip suits me?", a: "Our drip quiz can give you an idea, but the exact content is decided by a doctor after reviewing your health history and, if needed, your test results." },
      { q: "How many sessions are needed?", a: "It varies by person and goal. Options range from a single supportive session to plans over several sessions; frequency is decided after a doctor's assessment." },
      { q: "Do I need a blood test first?", a: "Not for every drip, but a test may be advised first for some, such as vitamin D or high-dose vitamin C, or if you have a chronic condition. We can arrange this with our home blood-test service." },
      { q: "Can I take vitamin tablets instead?", a: "For many people a balanced diet and, if needed, oral supplements are enough. A drip may be preferred in situations such as poor absorption, difficulty taking things by mouth or a need for fluids. It is best to decide together with your doctor." },
      { q: "Do you also come to offices or hotels?", a: "Yes; besides your home, a session can be planned at your office or hotel if suitable conditions are available. We serve Sakarya, Düzce, Kocaeli and Istanbul." },
      { q: "How are prices set?", a: "The price depends on the drip's content, the number of sessions and your address. Contact us by WhatsApp or phone for current information." },
    ],
    ctaTitle: "Let's find the right drip",
    ctaAccent: "together",
    ctaText: "Message us on WhatsApp or call; our team will help with the pre-assessment. 7 days a week, 24 hours a day.",
    ctaWa: "Message on WhatsApp",
    ctaCall: "Call now",
    disclaimer: "The information on this page is general and does not replace a diagnosis or treatment advice.",
    cmpHeading: "Drip comparison",
    cmpRows: { category: "Category", desc: "In short", types: "Areas of support", duration: "Drip time", forWho: "Who is it for?", consult: "Check with a doctor first if" },
    cmpWa: "Hello, I would like information about the \"{name}\" drip.",
  },
  ar: {
    badge: "العلاج الوريدي والمحاليل",
    title: "العلاج الوريدي في المنزل",
    highlight: "ومحاليل الفيتامينات",
    text: "24 خيارًا من المحاليل في راحة منزلك، مع تقييم طبي مسبق ومستلزمات معقمة تُستخدم مرة واحدة وفريق رعاية صحية يبقى معك طوال الجلسة.",
    seoTitle: "المحاليل والعلاج الوريدي في المنزل",
    seoDesc: "محاليل وريدية في المنزل: فيتامينات ومناعة وجمال وطاقة وديتوكس. تقييم مسبق ومستلزمات معقمة في سكاريا ودوزجه وكوجالي وإسطنبول.",
    stats: ["نوع من المحاليل", "فئات", "سنوات من الخبرة", "مناطق خدمة"],
    heroWa: "استفسر عبر واتساب",
    heroQuiz: "اعثر على المحلول المناسب لي",
    heroWaMsg: "مرحبًا، أودّ الاستفسار عن المحاليل الوريدية في المنزل.",
    searchPh: "ابحث عن محلول (مثل فيتامين سي، NAD+)…",
    searchLabel: "ابحث عن محلول",
    clearSearch: "مسح البحث",
    filterLabel: "التصفية حسب الفئة",
    found: "تم العثور على {n} محلولًا",
    popular: "الأكثر طلبًا",
    view: "التفاصيل",
    order: "اطلب",
    orderAria: "اطلب {name} عبر واتساب",
    waMsg: "مرحبًا، أودّ حجز موعد لمحلول \"{name}\".",
    noResults: "لا توجد محاليل تطابق بحثك.",
    clear: "مسح عوامل التصفية",
    quizTitle: "أي محلول يناسبني؟",
    quizText: "أجب عن 3 أسئلة قصيرة وسنقترح عليك محاليل تناسب احتياجاتك.",
    quizBtn: "ابدأ الاختبار",
    whatBadge: "ما هو العلاج الوريدي؟",
    whatTitle: "عبر الوريد،",
    whatAccent: "دعم مضبوط",
    whatText: "العلاج الوريدي هو إعطاء السوائل أو الفيتامينات أو المعادن أو مضادات الأكسدة مباشرة في الوريد عبر قنية رفيعة. ولأنه لا يمر عبر الجهاز الهضمي يصل المحتوى إلى الدورة الدموية مباشرة. وقد استُخدمت هذه الطريقة طويلًا في المستشفيات لتعويض السوائل المفقودة، وتُستخدم اليوم أيضًا لأغراض داعمة بعد تقييم الطبيب.",
    whatCards: [
      { t: "مباشرة إلى الدم", d: "لا يمر عبر الهضم فيصل المحتوى إلى الدم مباشرة، وقد يكون بديلًا لمن يعانون من ضعف امتصاص المكمّلات الفموية." },
      { t: "التقييم أولًا", d: "قبل كل جلسة تُسأل عن تاريخك الصحي وأدويتك وشكواك، ويُحدَّد المحتوى بعد تقييم الطبيب." },
      { t: "معقّم ويُستخدم مرة واحدة", d: "جميع المستلزمات من القنية وجهاز التسريب والمحلول معقّمة وتُستخدم مرة واحدة، مع الالتزام بقواعد النظافة." },
      { t: "في راحة منزلك", d: "لا قاعة انتظار ولا زحام، تقضي الجلسة على أريكتك وبالقرب من أحبائك." },
    ],
    whatNote: "لا تحلّ المحاليل الوريدية محل التغذية المتوازنة وشرب الماء الكافي والعلاجات التي يوصي بها طبيبك، بل هي خيار داعم.",
    stepsBadge: "كيف تتم الجلسة المنزلية؟",
    stepsTitle: "من الرسالة إلى الجلسة",
    stepsAccent: "في 5 خطوات",
    steps: [
      { t: "تواصل معنا", d: "تواصل معنا عبر واتساب أو الهاتف وأخبرنا بالمحلول الذي يهمك وعنوانك والوقت المناسب لك." },
      { t: "التقييم المسبق", d: "تُسأل عن عمرك والأمراض المزمنة والحساسية والحمل والأدوية التي تتناولها، ويُخطَّط لتحليل دم أولًا عند الحاجة." },
      { t: "فريقنا عند بابك", d: "يصل أخصائي الرعاية الصحية بمستلزمات معقمة ويقيس ضغط الدم والنبض ويتحقق من حالتك العامة." },
      { t: "إعطاء المحلول", d: "تُركَّب قنية رفيعة في ذراعك ويُعطى المحلول ببطء. وتستغرق العملية عادةً 30–60 دقيقة بحسب المحتوى، ويمكنك أن تستريح أو تقرأ خلالها." },
      { t: "بعد الجلسة", d: "تُزال القنية ويُغطّى مكانها. وبعد مراقبة قصيرة يمكنك العودة إلى يومك، ونشرح لك ما ينبغي الانتباه إليه." },
    ],
    prepTitle: "الاستعداد للجلسة",
    prepTime: "مدة إعطاء المحلول: عادةً 30–60 دقيقة",
    prep: [
      "تناول وجبة خفيفة واشرب الماء قبل الجلسة.",
      "ارتدِ ملابس يسهل معها كشف الذراع.",
      "جهّز قائمة بأدويتك وأحدث نتائج تحاليلك إن وُجدت.",
      "يكفي كرسي مريح أو سرير في مكان جيد الإضاءة.",
    ],
    safetyBadge: "السلامة",
    safetyTitle: "استشر",
    safetyAccent: "طبيبك أولًا",
    safetyText: "قد لا يناسب المحلول الجميع. أخبرنا إذا انطبقت عليك أي من الحالات التالية، ويقرر الطبيب مدى ملاءمة المحلول لك.",
    consultTitle: "استشر طبيبك أولًا في الحالات التالية",
    consult: [
      "الحمل أو الرضاعة",
      "مرض الكلى أو وجود تاريخ لحصى الكلى",
      "قصور القلب أو اضطراب نظمه أو مشكلات ضغط الدم",
      "أمراض الكبد",
      "الحساسية من الأدوية أو الفيتامينات أو الأطعمة",
      "الأدوية المنتظمة (خاصة مميّعات الدم وأدوية القلب والسكري)",
      "نقص إنزيم G6PD (خاصة مع المحاليل المحتوية على فيتامين سي)",
      "من هم دون 18 عامًا",
    ],
    practiceTitle: "أثناء الجلسة",
    practices: [
      "قياس ضغط الدم والنبض قبل البدء",
      "قنية وجهاز تسريب معقّمان يُستخدمان مرة واحدة",
      "أخصائي رعاية صحية إلى جانبك طوال الوقت",
      "إذا لم يكن المحلول مناسبًا فلن يُعطى، ونوجّهك إلى الجهة المناسبة",
    ],
    sideTitle: "الآثار الجانبية المحتملة",
    sideText: "يمرّ معظم الناس بالجلسة براحة. وقد تظهر كدمة خفيفة مكان القنية أو شعور قصير بالبرودة أو الدفء. أخبرنا فورًا إذا شعرت بحكة أو ضيق في التنفس أو ألم في الصدر أو دوار، وسيُوقف المحلول.",
    redFlag: "في الحالات الطارئة مثل ألم الصدر أو ضيق التنفس أو التشوش أو علامات السكتة الدماغية أو النزيف الشديد لا تنتظر المحلول، واتصل بالرقم 112 فورًا.",
    call112: "اتصل بـ 112",
    faqBadge: "الأسئلة الشائعة",
    faqTitle: "أسئلة حول",
    faqAccent: "المحاليل الوريدية",
    faq: [
      { q: "هل يؤلم إعطاء المحلول؟", a: "تشعر بوخزة إبرة قصيرة عند تركيب القنية، وبعد تركيبها لا يشعر معظم الناس بإزعاج يُذكر طوال الجلسة." },
      { q: "كم تستغرق الجلسة؟", a: "يختلف ذلك بحسب المحتوى، لكن معظم المحاليل تستغرق 30–60 دقيقة. وقد تستغرق المحتويات التي يجب إعطاؤها ببطء مثل NAD+ وقتًا أطول. ومع التحضير والمراقبة القصيرة تكون الزيارة أطول قليلًا." },
      { q: "كيف أعرف المحلول المناسب لي؟", a: "قد يمنحك اختبار المحاليل فكرة أولية، لكن المحتوى الدقيق يحدده الطبيب بعد مراجعة تاريخك الصحي ونتائج تحاليلك عند الحاجة." },
      { q: "كم جلسة أحتاج؟", a: "يختلف ذلك بحسب الشخص والهدف، وتتراوح الخيارات بين جلسة داعمة واحدة وخطط من عدة جلسات، ويُحدَّد التكرار بعد تقييم الطبيب." },
      { q: "هل أحتاج إلى تحليل دم أولًا؟", a: "ليس لكل محلول، لكن قد يُنصح بالتحليل أولًا لبعضها مثل فيتامين د أو فيتامين سي بجرعة عالية، أو إذا كان لديك مرض مزمن. ويمكننا ترتيب ذلك عبر خدمة سحب الدم في المنزل." },
      { q: "ألا يمكنني تناول أقراص الفيتامينات بدلًا من ذلك؟", a: "تكفي التغذية المتوازنة والمكمّلات الفموية عند الحاجة لكثير من الناس. وقد يُفضَّل المحلول في حالات مثل ضعف الامتصاص أو صعوبة التناول بالفم أو الحاجة إلى السوائل. والأفضل أن تقرر ذلك مع طبيبك." },
      { q: "هل تقدمون الخدمة في المكاتب أو الفنادق؟", a: "نعم، إلى جانب منزلك يمكن ترتيب الجلسة في مكتبك أو الفندق الذي تقيم فيه إذا توفرت الظروف المناسبة. مناطق خدمتنا: سكاريا ودوزجه وكوجالي وإسطنبول." },
      { q: "كيف تُحدَّد الأسعار؟", a: "يعتمد السعر على محتوى المحلول وعدد الجلسات وعنوانك. تواصل معنا عبر واتساب أو الهاتف للحصول على المعلومات الحالية." },
    ],
    ctaTitle: "لنحدد معًا",
    ctaAccent: "المحلول المناسب لك",
    ctaText: "راسلنا عبر واتساب أو اتصل بنا، وسيساعدك فريقنا في التقييم المسبق. 7 أيام في الأسبوع، 24 ساعة في اليوم.",
    ctaWa: "راسلنا عبر واتساب",
    ctaCall: "اتصل الآن",
    disclaimer: "المعلومات في هذه الصفحة عامة ولا تحلّ محل التشخيص أو المشورة العلاجية.",
    cmpHeading: "مقارنة المحاليل",
    cmpRows: { category: "الفئة", desc: "باختصار", types: "مجالات الدعم", duration: "مدة الجلسة", forWho: "لمن يناسب؟", consult: "استشر الطبيب أولًا في الحالات التالية" },
    cmpWa: "مرحبًا، أودّ الاستفسار عن محلول \"{name}\".",
  },
};

const WHAT_ICONS = [
  { icon: Drop, tone: "teal" },
  { icon: Stethoscope, tone: "blue" },
  { icon: ShieldCheck, tone: "green" },
  { icon: HouseLine, tone: "amber" },
];
const STEP_ICONS = [ChatCircleDots, ClipboardText, FirstAidKit, Syringe, CheckCircle];
const SERUM_IDS = serumList.map((s) => s.id);
const CMP_ROWS = ["category", "desc", "types", "duration", "forWho", "consult"];

const fold = (s, locale) => String(s || "").toLocaleLowerCase(locale).normalize("NFD").replace(/[̀-ًͯ-ٟ]/g, "");

const FaqItem = ({ q, a, open, onToggle, id }) => (
  <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
    <button type="button" className={styles.faqQ} aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
      <span>{q}</span>
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className={styles.faqIcon}>
        <CaretDown weight="bold" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`${id}-a`}
          role="region"
          aria-labelledby={`${id}-q`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <p className={styles.faqA}>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Serumlar = () => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const items = useLocalized(serumList, listTranslations, "id");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [openFaq, setOpenFaq] = useState(0);
  const cmp = useCompare("serum", SERUM_IDS);

  const cmpRowLabels = t("cmpRows");
  const cmpRows = CMP_ROWS.map((key) => ({ key, label: cmpRowLabels[key] }));
  const cmpColumns = useMemo(
    () => cmp.ids.map((id) => {
      const base = serumList.find((x) => String(x.id) === id);
      if (!base) return null;
      const item = localize(base, listTranslations, lang, "id");
      const d = localize(serumDetails.find((x) => String(x.id) === id), detailTranslations, lang, "id") || {};
      return {
        id,
        title: item.info,
        subtitle: categoryLabel(item.category, lang),
        waText: t("cmpWa", { name: item.info }),
        cells: {
          category: categoryLabel(item.category, lang),
          desc: item.desc,
          types: (d.types || []).map((x) => x.t),
          duration: d.duration,
          forWho: [d.forKind, d.aboutKind].filter(Boolean).join(" — "),
          consult: d.notFor,
        },
      };
    }).filter(Boolean),
    [cmp.ids, lang, t]
  );

  const counts = useMemo(() => {
    const c = { Tümü: serumList.length };
    serumList.forEach((s) => { c[s.category] = (c[s.category] || 0) + 1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = fold(search.trim(), meta.locale);
    return items.filter((p, i) => {
      const base = serumList[i];
      // Match the localized name/description and the Turkish name, so "vitamin c" and "C vitamini" both work.
      const hay = fold([p.info, p.desc, base.info, base.desc, categoryLabel(p.category, lang)].join(" "), meta.locale);
      const matchSearch = !q || hay.includes(q);
      const matchCategory = activeCategory === "Tümü" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [items, search, activeCategory, lang, meta.locale]);

  const stats = [
    { n: serumList.length, s: "" },
    { n: serumCategories.length - 1, s: "" },
    { n: 15, s: "+" },
    { n: SITE.regions.length, s: "" },
  ];

  const faq = t("faq");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/serumlar" jsonLd={jsonLd}>
        <div className={styles.heroActions}>
          <Magnetic>
            <a className={`${ui.btn} ${ui.btnWa}`} href={whatsappUrl(t("heroWaMsg"))} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo weight="fill" /> {t("heroWa")}
            </a>
          </Magnetic>
          <Link to="/serum-testi" className={`${ui.btn} ${ui.btnGhost}`}><MagicWand /> {t("heroQuiz")}</Link>
        </div>
        <Stagger className={styles.heroStats} gap={0.1}>
          {stats.map((s, i) => (
            <StaggerItem key={i} className={styles.heroStat} y={16}>
              <strong><CountUp to={s.n} suffix={s.s} locale={meta.locale} duration={1.6} /></strong>
              <span>{t("stats")[i]}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </PageHero>

      <section className={styles.page}>
        <Wrapper>
          {/* Search + categories */}
          <motion.div className={styles.filterBar} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <label className={styles.searchBox}>
              <MagnifyingGlass aria-hidden="true" />
              <input
                type="search"
                placeholder={t("searchPh")}
                aria-label={t("searchLabel")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" className={styles.clearBtn} onClick={() => setSearch("")} aria-label={t("clearSearch")}>
                  <X weight="bold" />
                </button>
              )}
            </label>
            <div className={styles.categories} role="group" aria-label={t("filterLabel")}>
              {serumCategories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    className={`${styles.catBtn} ${active ? styles.catBtnActive : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {active && <motion.span layoutId="serumCatPill" className={styles.catPill} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                    <span className={styles.catText}>{categoryLabel(cat, lang)}</span>
                    <span className={styles.catCount} aria-hidden="true">{counts[cat] || 0}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Quiz banner */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Link to="/serum-testi" className={`${ui.card} ${ui.glowBorder} ${styles.quizBanner}`}>
              <Icon3D icon={<MagicWand />} tone="violet" size={58} float />
              <div className={styles.quizText}>
                <strong>{t("quizTitle")}</strong>
                <p>{t("quizText")}</p>
              </div>
              <span className={`${ui.btn} ${ui.btnPrimary}`}>{t("quizBtn")} <ArrowRight className={styles.flip} /></span>
            </Link>
          </motion.div>

          <p className={styles.resultInfo} aria-live="polite">{t("found", { n: filtered.length })}</p>

          <Stagger key={activeCategory} className={styles.grid} gap={0.06}>
            {filtered.map((item) => (
              <StaggerItem key={item.id} className={styles.cell}>
                <TiltCard className={styles.tilt} max={6}>
                  <SpotlightCard className={styles.card} data-morph-scope="">
                    {item.popular && (
                      <span className={styles.popularBadge}><Star weight="fill" /> {t("popular")}</span>
                    )}
                    <div className={styles.cardImage} data-morph-source="">
                      <SerumSVG name={item.info} category={item.category} label={categoryLabel(item.category, lang)} />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardCategory}>{categoryLabel(item.category, lang)}</span>
                        <CompareToggle checked={cmp.has(item.id)} onToggle={() => cmp.toggle(item.id)} name={item.info} full={cmp.full} />
                      </div>
                      <h2 className={styles.cardTitle}>
                        <MorphLink to={`/serumlar/${item.id}`} morph={`serum-${item.id}`} className={styles.stretched}>{item.info}</MorphLink>
                      </h2>
                      <p className={styles.cardDesc}>{item.desc}</p>
                      <div className={styles.cardAction}>
                        <span className={styles.viewLink}>{t("view")} <ArrowRight className={styles.flip} /></span>
                        <a
                          href={whatsappUrl(t("waMsg", { name: item.info }))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.orderBtn}
                          aria-label={t("orderAria", { name: item.info })}
                        >
                          <WhatsappLogo weight="fill" /> {t("order")}
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          {filtered.length === 0 && (
            <motion.div className={styles.noResults} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <Syringe className={styles.noResultsIcon} />
              <p>{t("noResults")}</p>
              <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => { setSearch(""); setActiveCategory("Tümü"); }}>
                {t("clear")}
              </button>
            </motion.div>
          )}
        </Wrapper>

        {/* What is IV therapy */}
        <section className={ui.section}>
          <Wrapper>
            <div className={styles.whatGrid}>
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
                <span className={ui.badge}>{t("whatBadge")}</span>
                <h2 className={styles.h2}>{t("whatTitle")} <span className="accent">{t("whatAccent")}</span></h2>
                <p className={styles.lead}>{t("whatText")}</p>
                <div className={ui.note}><Info /><span>{t("whatNote")}</span></div>
              </motion.div>
              <Stagger className={styles.whatCards} gap={0.1}>
                {t("whatCards").map((c, i) => {
                  const I = WHAT_ICONS[i].icon;
                  return (
                    <StaggerItem key={i}>
                      <SpotlightCard className={`${ui.card} ${styles.whatCard}`}>
                        <Icon3D icon={<I />} tone={WHAT_ICONS[i].tone} size={50} />
                        <h3>{c.t}</h3>
                        <p>{c.d}</p>
                      </SpotlightCard>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </Wrapper>
        </section>

        {/* How a home session works */}
        <section className={`${ui.section} ${styles.softBand}`}>
          <Wrapper>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("stepsBadge")}</span>
              <h2>{t("stepsTitle")} <span className="accent">{t("stepsAccent")}</span></h2>
            </div>
            <div className={styles.stepsWrap}>
              <div className={styles.timeline}>
                <ScrollLine className={styles.timelineLine} />
                {t("steps").map((s, i) => {
                  const I = STEP_ICONS[i];
                  return (
                    <motion.div key={i} className={styles.tStep}
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.05 }}>
                      <motion.span className={styles.tDot} initial={{ scale: 0.4 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 14 }}>
                        <I weight="duotone" />
                      </motion.span>
                      <div className={styles.tBody}>
                        <span className={styles.tNum}>{String(i + 1).padStart(2, "0")}</span>
                        <h3>{s.t}</h3>
                        <p>{s.d}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <motion.aside className={`${ui.card} ${styles.prepCard}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <Icon3D icon={<ListChecks />} tone="teal" size={50} />
                <h3>{t("prepTitle")}</h3>
                <ul>
                  {t("prep").map((p, i) => <li key={i}><CheckCircle weight="fill" /> {p}</li>)}
                </ul>
                <p className={styles.prepTime}><Timer /> {t("prepTime")}</p>
              </motion.aside>
            </div>
          </Wrapper>
        </section>

        {/* Safety */}
        <section className={ui.section}>
          <Wrapper>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("safetyBadge")}</span>
              <h2>{t("safetyTitle")} <span className="accent">{t("safetyAccent")}</span></h2>
              <p>{t("safetyText")}</p>
            </div>
            <Stagger className={styles.safetyGrid} gap={0.12}>
              <StaggerItem>
                <SpotlightCard className={`${ui.card} ${styles.consultCard}`}>
                  <Icon3D icon={<Warning />} tone="amber" size={50} />
                  <h3>{t("consultTitle")}</h3>
                  <ul>{t("consult").map((c, i) => <li key={i}><Warning weight="fill" className={styles.warnIcon} /> {c}</li>)}</ul>
                </SpotlightCard>
              </StaggerItem>
              <StaggerItem>
                <SpotlightCard className={`${ui.card} ${styles.practiceCard}`}>
                  <Icon3D icon={<ShieldCheck />} tone="green" size={50} />
                  <h3>{t("practiceTitle")}</h3>
                  <ul>{t("practices").map((c, i) => <li key={i}><CheckCircle weight="fill" /> {c}</li>)}</ul>
                  <h3 className={styles.sideTitle}>{t("sideTitle")}</h3>
                  <p>{t("sideText")}</p>
                </SpotlightCard>
              </StaggerItem>
            </Stagger>
            <motion.div className={`${ui.note} ${ui.noteDanger} ${styles.redFlag}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Siren />
              <span>{t("redFlag")}</span>
              <a href="tel:112" className={`${ui.btn} ${ui.btnDanger}`}><Phone weight="fill" /> {t("call112")}</a>
            </motion.div>
          </Wrapper>
        </section>

        {/* FAQ */}
        <section className={`${ui.section} ${styles.softBand}`}>
          <Wrapper>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("faqBadge")}</span>
              <h2>{t("faqTitle")} <span className="accent">{t("faqAccent")}</span></h2>
            </div>
            <Stagger className={styles.faqList} gap={0.06}>
              {faq.map((f, i) => (
                <StaggerItem key={i} y={16}>
                  <FaqItem id={`serum-faq-${i}`} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
                </StaggerItem>
              ))}
            </Stagger>
          </Wrapper>
        </section>

        {/* CTA */}
        <section className={ui.sectionTight}>
          <Wrapper>
            <motion.div className={styles.cta} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2>{t("ctaTitle")} <span className="accent">{t("ctaAccent")}</span></h2>
              <p>{t("ctaText")}</p>
              <div className={ui.btnRow}>
                <Magnetic>
                  <a className={`${ui.btn} ${ui.btnWa}`} href={whatsappUrl(t("heroWaMsg"))} target="_blank" rel="noopener noreferrer">
                    <WhatsappLogo weight="fill" /> {t("ctaWa")}
                  </a>
                </Magnetic>
                <a className={`${ui.btn} ${ui.btnGhost}`} href={`tel:${primaryPhone.tel}`}><Phone /> {t("ctaCall")} <span dir="ltr">{primaryPhone.display}</span></a>
                <Link className={`${ui.btn} ${ui.btnGhost}`} to="/serum-testi"><MagicWand /> {t("quizBtn")}</Link>
              </div>
              <p className={styles.disclaimer}><Info /> {t("disclaimer")}</p>
            </motion.div>
          </Wrapper>
        </section>
      </section>

      <CompareBar columns={cmpColumns} rows={cmpRows} onRemove={cmp.remove} onClear={cmp.clear} heading={t("cmpHeading")} />
    </>
  );
};

export default React.memo(Serumlar);
