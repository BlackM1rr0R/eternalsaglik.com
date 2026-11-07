import React from "react";
import { Link } from "react-router-dom";
import {
  Target, UsersThree, Eye, ShieldCheck, Medal, Handshake, Heart,
  UserCircle, Stethoscope, IdentificationBadge, ArrowRight, Phone, CalendarCheck, WhatsappLogo,
  ChatCircleDots, ClipboardText, CalendarBlank, HouseLine, ChartLineUp, Ear, Check,
  HandSoap, Pill, Warning, Siren, LockKey, ListChecks, MapPin, Syringe, TestTube, Bandaids,
  FirstAidKit, Bed, Ambulance, Leaf, Heartbeat, Quotes,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import { Stagger, StaggerItem, SpotlightCard, CountUp, ScrollLine, Parallax, Float, Magnetic } from "../../components/motion";
import { SITE, primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT, useLang } from "../../i18n";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";

const dict = {
  tr: {
    seoTitle: "Hakkımızda",
    seoDesc: "ETERNAL Sağlık Hizmetleri: Sakarya merkezli, 15 yılı aşkın deneyimle evde doktor, hemşire, serum, tahlil ve bakım hizmeti. Hikâyemiz, çalışma şeklimiz ve değerlerimiz.",
    badge: "Biz kimiz",
    title: "Sağlığı evinize taşıyan",
    highlight: "güvenilir bir ekip",
    text: "15 yılı aşkın deneyimimizle Sakarya, Düzce, Kocaeli ve İstanbul'da doktor, hemşire ve bakım hizmetlerini hastalarımızın kapısına getiriyoruz.",
    stats: ["Yıl deneyim", "Hizmet verdiğimiz hasta", "Ev ziyareti", "Memnuniyet"],
    storyBadge: "Hikâyemiz",
    storyTitle: "Bir ihtiyaçtan",
    storyAccent: "doğan hizmet",
    story: [
      "Hastaneye gitmek her zaman kolay değildir. Yatağa bağımlı bir anne, ameliyattan yeni çıkmış bir baba, yoğun çalışan bir genç ya da küçük çocuğuyla yolu göze alamayan bir aile… ETERNAL Sağlık Hizmetleri, bu insanların sağlık hizmetine kendi evlerinde, güvenle ulaşabilmesi için kuruldu.",
      "Bugün Sakarya merkezli ekibimizle evde doktor muayenesinden serum ve enjeksiyona, evde tahlilden yara bakımına, hasta bakımından özel ambulansa kadar geniş bir yelpazede hizmet veriyoruz. Değişmeyen tek şey yaklaşımımız: her hastayı kendi ailemizden biri gibi görmek.",
    ],
    quote: "Evinizde yalnız değilsiniz.",
    quoteBy: "ETERNAL MEDLINE GROUP",
    approachTitle: "Yaklaşımımız",
    approach: [
      { t: "Önce dinlemek", d: "Hastanın ve yakınlarının anlattıklarını acele etmeden dinleriz." },
      { t: "Kişiye özel plan", d: "İhtiyaca, sağlık geçmişine ve hekim önerisine göre plan yaparız." },
      { t: "Şeffaf iletişim", d: "Ne yapılacağını, neden yapılacağını açıkça anlatırız." },
      { t: "Sürekli takip", d: "Ziyaretten sonra da sorularınıza ulaşılabilir kalırız." },
    ],
    mvaBadge: "Değerlerimiz",
    mvaTitle: "Eternal Sağlık",
    mvaAccent: "ile tanışın",
    mission: "Misyonumuz",
    missionText: "Deneyimli doktor, hemşire ve sağlık profesyonellerinden oluşan ekibimizle kapsamlı yerinde bakım hizmeti sunmak; hastalarımızın ihtiyaçlarına göre hazırlanan bakım planlarıyla güvenliklerini ve konforlarını ön planda tutmak.",
    aboutT: "Hakkımızda",
    aboutText: "Hasta memnuniyetine büyük önem veriyor, her hastamızı ailemizin bir parçası olarak görüyoruz. Bireysel yaklaşımla ihtiyaçları anlıyor, dinliyor ve en uygun çözümü birlikte arıyoruz.",
    vision: "Vizyonumuz",
    visionText: "Evde bakım hizmetlerimizi güvenilirlik, kalite ve etik değerlere dayandırmak; tıptaki gelişmeleri takip ederek hastalarımıza mümkün olan en iyi bakımı sunmaya çalışmak.",
    howBadge: "Nasıl çalışıyoruz?",
    howTitle: "İlk aramadan",
    howAccent: "takibe kadar",
    howLead: "Her ziyaret aynı özenle, adım adım planlanır.",
    how: [
      { t: "İlk temas", d: "Telefon, WhatsApp veya online randevu formu ile bize ulaşırsınız. Hizmet türünü, adresi ve size uygun zamanı konuşuruz." },
      { t: "Ön değerlendirme", d: "Hastanın durumu, kullandığı ilaçlar, alerjileri ve varsa reçete ya da doktor notu hakkında bilgi alırız." },
      { t: "Planlama", d: "İhtiyaca uygun sağlık profesyoneli, gerekli malzemeler ve ziyaret saati belirlenir; size bildirilir." },
      { t: "Ev ziyareti", d: "Ekibimiz hijyen kurallarına uyarak, işlemi önceden anlatıp onayınızı alarak uygulamayı yapar." },
      { t: "Bilgilendirme ve takip", d: "Yapılan işlemler, sonuçlar ve dikkat edilecekler hakkında hastayı ve yakınlarını bilgilendiririz." },
    ],
    safeBadge: "Güvenli evde bakım",
    safeTitle: "Evde bakımı güvenli kılan",
    safeAccent: "temel ilkeler",
    safeLead: "Güvenli bir evde sağlık hizmeti; ekibin özeni kadar, hasta ve aileyle kurulan doğru iletişime de dayanır.",
    safe: [
      { t: "Doğru bilgi", d: "Güncel ilaç listesi, alerjiler ve kronik hastalıklar işlem öncesinde paylaşılmalıdır." },
      { t: "Hijyen ve steril malzeme", d: "El hijyeni, eldiven ve tek kullanımlık, steril malzeme temel kuraldır." },
      { t: "Hekim önerisi", d: "İlaç ve serum uygulamaları hekim önerisi veya reçeteyle yapılmalıdır." },
      { t: "Bilgilendirilmiş onam", d: "Hasta, uygulamanın ne olduğunu ve olası etkilerini bilerek karar verir." },
      { t: "Acil durum farkındalığı", d: "Hayati tehlike belirtilerinde evde beklenmez; 112 aranır." },
      { t: "Gizlilik", d: "Sağlık bilgileri KVKK kapsamında korunur ve yalnızca hizmet için kullanılır." },
    ],
    safeNote: "Bu bilgiler geneldir; kendi durumunuz için doktorunuza danışın.",
    valuesBadge: "Temel değerler",
    valuesTitle: "Bizi biz yapan",
    valuesAccent: "değerler",
    values: [
      { t: "Güvenilirlik", d: "Hastalarımızın güvenliği ve mahremiyeti en öncelikli değerimizdir." },
      { t: "Kalite", d: "Her ziyarette özenli ve standartlara uygun hizmet sunmaya çalışırız." },
      { t: "Etik", d: "Tıbbi etik kurallarına bağlı, şeffaf ve dürüst hizmet veririz." },
      { t: "Empati", d: "Her hastamızı ailemizin bir parçası gibi görür, öyle davranırız." },
    ],
    teamBadge: "Ekibimiz",
    teamTitle: "Yönetim Kurulumuz",
    teamLead: "Gücümüzün, operasyonlarımıza değer katan çalışanlarımızdan geldiğini biliyoruz.",
    team: [
      { role: "CEO & Kurucu", d: "15 yıllık klinik deneyimiyle evde sağlık hizmetlerinde liderlik yapmaktadır." },
      { role: "CEO Yardımcısı", d: "Hasta bakım yönetimi ve operasyonel süreçlerin koordinasyonundan sorumludur." },
      { role: "Genel Yönetim", d: "İnsan kaynakları ve kalite yönetim süreçlerini yönetmektedir." },
    ],
    servicesBadge: "Hizmetler",
    servicesTitle: "Sunduklarımız",
    services: ["Evde Doktor", "Evde Hemşire", "IV Serum", "Evde Tahlil", "Yara Bakımı & Pansuman", "Evde Check-Up", "Evde Hasta Bakıcı", "Özel Ambulans", "Geleneksel Tıp"],
    allServices: "Tüm hizmetleri gör",
    regionsBadge: "Hizmet bölgeleri",
    regionsTitle: "Nerelere",
    regionsAccent: "geliyoruz?",
    regionsLead: "Merkezimiz Adapazarı, Sakarya'dadır. Aşağıdaki illerde ev, iş yeri ve otel adreslerine hizmet veriyoruz.",
    regionsNames: ["Sakarya", "Düzce", "Kocaeli", "İstanbul"],
    hq: "Merkez",
    regionSub: "Ev · iş yeri · otel",
    regionNote: "Adresiniz bu bölgelerin dışında mı? Arayın; özel ambulans ve planlı ziyaretler için birlikte değerlendirelim.",
    ctaTitle: "Sağlık hizmetinizi ayağınıza getirmek için buradayız.",
    ctaText: "ETERNAL MEDLINE GROUP — Evinizde yalnız değilsiniz.",
    ctaBook: "Online Randevu",
    ctaCall: "Hemen arayın",
    ctaWa: "WhatsApp",
    waMsg: "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
  },
  en: {
    seoTitle: "About Us",
    seoDesc: "ETERNAL Health Services: a Sakarya-based team with over 15 years of experience in home doctor, nurse, IV drip, lab test and care services. Our story, how we work and our values.",
    badge: "Who we are",
    title: "A trusted team bringing",
    highlight: "healthcare to your home",
    text: "With more than 15 years of experience, we bring doctor, nurse and care services to our patients' doors in Sakarya, Düzce, Kocaeli and Istanbul.",
    stats: ["Years of experience", "Patients served", "Home visits", "Satisfaction"],
    storyBadge: "Our story",
    storyTitle: "A service born",
    storyAccent: "from a real need",
    story: [
      "Getting to hospital isn't always easy. A bed-bound mother, a father just home from surgery, a young professional with no time, a family who can't face the journey with a small child… ETERNAL Health Services was founded so that these people could reach healthcare safely, in their own homes.",
      "Today our Sakarya-based team offers a wide range of services — from home doctor visits to IV drips and injections, home lab tests to wound care, patient care to private ambulance. One thing has never changed: our approach of treating every patient as one of our own family.",
    ],
    quote: "You are not alone at home.",
    quoteBy: "ETERNAL MEDLINE GROUP",
    approachTitle: "Our approach",
    approach: [
      { t: "Listen first", d: "We take the time to listen to the patient and their family." },
      { t: "A personal plan", d: "We plan around the patient's needs, medical history and the doctor's advice." },
      { t: "Clear communication", d: "We explain openly what will be done and why." },
      { t: "Ongoing follow-up", d: "We stay reachable for your questions after the visit too." },
    ],
    mvaBadge: "Our values",
    mvaTitle: "Meet",
    mvaAccent: "Eternal Health",
    mission: "Our mission",
    missionText: "To provide comprehensive on-site care through our team of experienced doctors, nurses and healthcare professionals, putting our patients' safety and comfort first with care plans built around their needs.",
    aboutT: "About us",
    aboutText: "Patient satisfaction matters deeply to us, and we see every patient as part of our family. With an individual approach we listen, understand the need and look for the best solution together.",
    vision: "Our vision",
    visionText: "To base our home care on reliability, quality and ethics, and to keep up with medical progress so we can offer our patients the best care possible.",
    howBadge: "How we work",
    howTitle: "From the first call",
    howAccent: "to follow-up",
    howLead: "Every visit is planned step by step, with the same care.",
    how: [
      { t: "First contact", d: "You reach us by phone, WhatsApp or the online booking form. We discuss the service, the address and a time that suits you." },
      { t: "Initial assessment", d: "We ask about the patient's condition, current medicines, allergies and any prescription or doctor's note." },
      { t: "Planning", d: "The right healthcare professional, the materials needed and the visit time are arranged and confirmed with you." },
      { t: "Home visit", d: "Our team follows hygiene rules, explains the procedure beforehand and asks for your consent before carrying it out." },
      { t: "Update and follow-up", d: "We let the patient and family know what was done, any results and what to watch for." },
    ],
    safeBadge: "Safe home care",
    safeTitle: "The core principles that",
    safeAccent: "make home care safe",
    safeLead: "Safe home healthcare depends on good communication with the patient and family as much as on the team's care.",
    safe: [
      { t: "Accurate information", d: "An up-to-date list of medicines, allergies and long-term conditions should be shared before any procedure." },
      { t: "Hygiene and sterile materials", d: "Hand hygiene, gloves and sterile single-use materials are the basic rule." },
      { t: "Doctor's advice", d: "Medicines and IV drips should be given on a doctor's advice or prescription." },
      { t: "Informed consent", d: "The patient decides knowing what the procedure is and its possible effects." },
      { t: "Emergency awareness", d: "With signs of a life-threatening emergency, don't wait at home — call 112." },
      { t: "Privacy", d: "Health information is protected under KVKK and used only to provide the service." },
    ],
    safeNote: "This is general information — talk to your doctor about your own situation.",
    valuesBadge: "Core values",
    valuesTitle: "The values",
    valuesAccent: "that define us",
    values: [
      { t: "Reliability", d: "Our patients' safety and privacy are our highest priority." },
      { t: "Quality", d: "We aim for careful, standards-based care at every visit." },
      { t: "Ethics", d: "We work transparently and honestly, bound by medical ethics." },
      { t: "Empathy", d: "We see every patient as part of our family and treat them that way." },
    ],
    teamBadge: "Our team",
    teamTitle: "Our Management Board",
    teamLead: "We know our strength comes from the people who add value to everything we do.",
    team: [
      { role: "CEO & Founder", d: "Leads our home healthcare services, drawing on 15 years of clinical experience." },
      { role: "Deputy CEO", d: "Responsible for patient care management and coordinating day-to-day operations." },
      { role: "General Management", d: "Manages human resources and quality management processes." },
    ],
    servicesBadge: "Services",
    servicesTitle: "What we offer",
    services: ["Home Doctor", "Home Nurse", "IV Drips", "Home Lab Tests", "Wound Care & Dressings", "Home Check-Up", "Home Caregiver", "Private Ambulance", "Traditional Medicine"],
    allServices: "See all services",
    regionsBadge: "Service areas",
    regionsTitle: "Where do",
    regionsAccent: "we go?",
    regionsLead: "Our base is in Adapazarı, Sakarya. We serve homes, workplaces and hotels in the provinces below.",
    regionsNames: ["Sakarya", "Düzce", "Kocaeli", "Istanbul"],
    hq: "Base",
    regionSub: "Home · workplace · hotel",
    regionNote: "Is your address outside these areas? Give us a call and we'll look at private ambulance or scheduled visits together.",
    ctaTitle: "We're here to bring healthcare to your door.",
    ctaText: "ETERNAL MEDLINE GROUP — You are not alone at home.",
    ctaBook: "Book Online",
    ctaCall: "Call us now",
    ctaWa: "WhatsApp",
    waMsg: "Hello, I'd like some information about your services.",
  },
  ar: {
    seoTitle: "من نحن",
    seoDesc: "إيترنال للخدمات الصحية: فريق مقرّه سكاريا بخبرة تزيد على 15 عامًا في خدمات الطبيب والممرض والمحاليل والتحاليل والرعاية المنزلية. قصتنا وطريقة عملنا وقيمنا.",
    badge: "من نحن",
    title: "فريق موثوق",
    highlight: "يحمل الصحة إلى منزلك",
    text: "بخبرة تزيد على 15 عامًا نوصل خدمات الطبيب والممرض والرعاية إلى أبواب مرضانا في سكاريا ودوزجه وكوجالي وإسطنبول.",
    stats: ["سنة خبرة", "مريض قدّمنا له الخدمة", "زيارة منزلية", "نسبة الرضا"],
    storyBadge: "قصتنا",
    storyTitle: "خدمة وُلدت",
    storyAccent: "من حاجة حقيقية",
    story: [
      "الذهاب إلى المستشفى ليس سهلًا دائمًا. أمّ طريحة الفراش، أب عاد للتو من عملية جراحية، شاب مشغول، أو عائلة لا تقوى على الطريق مع طفل صغير… تأسست إيترنال للخدمات الصحية ليتمكن هؤلاء من الوصول إلى الرعاية الصحية بأمان في منازلهم.",
      "اليوم يقدّم فريقنا الذي مقرّه سكاريا مجموعة واسعة من الخدمات: من زيارة الطبيب المنزلية إلى المحاليل والحقن، ومن التحاليل المنزلية إلى العناية بالجروح، ومن رعاية المرضى إلى الإسعاف الخاص. والشيء الوحيد الذي لم يتغير هو نهجنا: أن نعامل كل مريض كواحد من عائلتنا.",
    ],
    quote: "لست وحدك في منزلك.",
    quoteBy: "ETERNAL MEDLINE GROUP",
    approachTitle: "نهجنا",
    approach: [
      { t: "الاستماع أولًا", d: "نستمع إلى المريض وذويه دون استعجال." },
      { t: "خطة خاصة", d: "نخطط وفق الحاجة والتاريخ الصحي وتوصية الطبيب." },
      { t: "تواصل واضح", d: "نشرح بوضوح ما سيتم ولماذا." },
      { t: "متابعة مستمرة", d: "نبقى متاحين لأسئلتك بعد الزيارة أيضًا." },
    ],
    mvaBadge: "قيمنا",
    mvaTitle: "تعرّف على",
    mvaAccent: "إيترنال للصحة",
    mission: "رسالتنا",
    missionText: "تقديم رعاية شاملة في مكان المريض عبر فريقنا من الأطباء والممرضين والمهنيين الصحيين ذوي الخبرة، مع وضع سلامة المرضى وراحتهم أولًا من خلال خطط رعاية تُعدّ وفق احتياجاتهم.",
    aboutT: "من نحن",
    aboutText: "نولي رضا المرضى أهمية كبيرة، ونرى كل مريض جزءًا من عائلتنا. بنهج فردي نستمع ونفهم الحاجة ونبحث معًا عن الحل الأنسب.",
    vision: "رؤيتنا",
    visionText: "أن نبني خدمات الرعاية المنزلية على الموثوقية والجودة والأخلاقيات، وأن نواكب التطورات الطبية لنقدّم لمرضانا أفضل رعاية ممكنة.",
    howBadge: "كيف نعمل؟",
    howTitle: "من المكالمة الأولى",
    howAccent: "حتى المتابعة",
    howLead: "تُخطَّط كل زيارة خطوة بخطوة وبالعناية نفسها.",
    how: [
      { t: "التواصل الأول", d: "تتواصل معنا هاتفيًا أو عبر واتساب أو نموذج الحجز. نتحدث عن نوع الخدمة والعنوان والوقت المناسب لك." },
      { t: "التقييم المبدئي", d: "نسأل عن حالة المريض وأدويته وحساسيته وأي وصفة أو ملاحظة من الطبيب." },
      { t: "التخطيط", d: "يُحدَّد المهني الصحي المناسب والمواد اللازمة وموعد الزيارة، ونُبلغك بذلك." },
      { t: "الزيارة المنزلية", d: "يلتزم فريقنا بقواعد النظافة، ويشرح الإجراء مسبقًا ويأخذ موافقتك قبل تنفيذه." },
      { t: "الإبلاغ والمتابعة", d: "نُطلع المريض وذويه على ما تم من إجراءات والنتائج وما يجب الانتباه إليه." },
    ],
    safeBadge: "رعاية منزلية آمنة",
    safeTitle: "المبادئ الأساسية",
    safeAccent: "لرعاية منزلية آمنة",
    safeLead: "تعتمد الرعاية الصحية المنزلية الآمنة على التواصل الصحيح مع المريض وعائلته بقدر اعتمادها على عناية الفريق.",
    safe: [
      { t: "معلومات صحيحة", d: "يجب مشاركة قائمة الأدوية الحالية والحساسية والأمراض المزمنة قبل أي إجراء." },
      { t: "النظافة والمواد المعقّمة", d: "تعقيم اليدين والقفازات والمواد المعقّمة أحادية الاستخدام قاعدة أساسية." },
      { t: "توصية الطبيب", d: "يجب أن تُعطى الأدوية والمحاليل بتوصية من الطبيب أو بوصفة طبية." },
      { t: "الموافقة المستنيرة", d: "يقرّر المريض وهو يعرف ماهية الإجراء وآثاره المحتملة." },
      { t: "الوعي بالطوارئ", d: "عند ظهور علامات الخطر على الحياة لا تنتظر في المنزل؛ اتصل بـ 112." },
      { t: "الخصوصية", d: "تُحمى المعلومات الصحية بموجب قانون KVKK وتُستخدم لتقديم الخدمة فقط." },
    ],
    safeNote: "هذه معلومات عامة؛ استشر طبيبك بشأن حالتك.",
    valuesBadge: "القيم الأساسية",
    valuesTitle: "القيم",
    valuesAccent: "التي تميّزنا",
    values: [
      { t: "الموثوقية", d: "سلامة مرضانا وخصوصيتهم على رأس أولوياتنا." },
      { t: "الجودة", d: "نسعى إلى رعاية دقيقة ومطابقة للمعايير في كل زيارة." },
      { t: "الأخلاقيات", d: "نعمل بشفافية وصدق ملتزمين بأخلاقيات الطب." },
      { t: "التعاطف", d: "نرى كل مريض جزءًا من عائلتنا ونعامله على هذا الأساس." },
    ],
    teamBadge: "فريقنا",
    teamTitle: "مجلس إدارتنا",
    teamLead: "ندرك أن قوتنا تأتي من العاملين الذين يضيفون قيمة إلى عملنا.",
    team: [
      { role: "الرئيس التنفيذي والمؤسس", d: "يقود خدمات الرعاية الصحية المنزلية مستندًا إلى 15 عامًا من الخبرة السريرية." },
      { role: "نائبة الرئيس التنفيذي", d: "مسؤولة عن إدارة رعاية المرضى وتنسيق العمليات." },
      { role: "الإدارة العامة", d: "تدير الموارد البشرية وعمليات إدارة الجودة." },
    ],
    servicesBadge: "الخدمات",
    servicesTitle: "ما نقدّمه",
    services: ["طبيب منزلي", "ممرض منزلي", "محاليل وريدية", "تحاليل منزلية", "العناية بالجروح والضمادات", "فحص شامل منزلي", "مرافق مريض منزلي", "إسعاف خاص", "الطب التقليدي"],
    allServices: "عرض جميع الخدمات",
    regionsBadge: "مناطق الخدمة",
    regionsTitle: "إلى أين",
    regionsAccent: "نصل؟",
    regionsLead: "مركزنا في أدابازاري بولاية سكاريا. نخدم المنازل وأماكن العمل والفنادق في الولايات التالية.",
    regionsNames: ["سكاريا", "دوزجه", "كوجالي", "إسطنبول"],
    hq: "المركز",
    regionSub: "منزل · مكان عمل · فندق",
    regionNote: "هل عنوانك خارج هذه المناطق؟ اتصل بنا لنبحث معًا خيار الإسعاف الخاص أو الزيارات المجدولة.",
    ctaTitle: "نحن هنا لنوصل الرعاية الصحية إلى بابك.",
    ctaText: "ETERNAL MEDLINE GROUP — لست وحدك في منزلك.",
    ctaBook: "احجز عبر الإنترنت",
    ctaCall: "اتصل الآن",
    ctaWa: "واتساب",
    waMsg: "مرحبًا، أودّ الحصول على معلومات عن خدماتكم.",
  },
};

const STATS = [
  { to: 15, suffix: "+" },
  { to: 10348, suffix: "+" },
  { to: 937, suffix: "+" },
  { to: 98, prefix: "%" },
];
const APPROACH_ICONS = [Ear, ClipboardText, ChatCircleDots, ChartLineUp];
const HOW_ICONS = [ChatCircleDots, ClipboardText, CalendarBlank, HouseLine, ChartLineUp];
const SAFE_ICONS = [ListChecks, HandSoap, Pill, Check, Siren, LockKey];
const VALUES = [
  { Icon: ShieldCheck, tone: "teal" },
  { Icon: Medal, tone: "blue" },
  { Icon: Handshake, tone: "amber" },
  { Icon: Heart, tone: "rose" },
];
const TEAM = [
  { name: "Dr. Hasan Arslan", Icon: UserCircle },
  { name: "Dr. Selin Aydın", Icon: Stethoscope },
  { name: "Dr. Fatma Koç", Icon: IdentificationBadge },
];
const SERVICES = [
  { slug: "evde-doktor", Icon: Stethoscope },
  { slug: "evde-hemsire", Icon: FirstAidKit },
  { slug: "evde-serum", Icon: Syringe },
  { slug: "evde-tahlil", Icon: TestTube },
  { slug: "yara-bakimi", Icon: Bandaids },
  { slug: "evde-check-up", Icon: Heartbeat },
  { slug: "evde-hasta-bakici", Icon: Bed },
  { slug: "ozel-ambulans", Icon: Ambulance },
  { slug: "evde-geleneksel-tip", Icon: Leaf },
];

const Head = ({ badge, title, accent, lead }) => (
  <ScrollReveal>
    <div className={ui.sectionHead}>
      <span className={ui.badge}>{badge}</span>
      <h2>
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {lead && <p>{lead}</p>}
    </div>
  </ScrollReveal>
);

const About = () => {
  const t = useT(dict);
  const { meta } = useLang();
  const statLabels = t("stats");
  const services = t("services");
  const regions = t("regionsNames");

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/about">
        <div className={ui.btnRow}>
          <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}>
            <CalendarCheck weight="duotone" /> {t("ctaBook")}
          </Link>
          <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}>
            <Phone weight="duotone" /> <bdi>{primaryPhone.display}</bdi>
          </a>
        </div>
      </PageHero>

      <Wrapper>
        {/* Stats */}
        <Stagger className={styles.statsBar} gap={0.1}>
          {STATS.map((s, i) => (
            <StaggerItem key={i} className={styles.statItem}>
              <strong>
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} locale={meta.locale} duration={2.2} />
              </strong>
              <span>{statLabels[i]}</span>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Story */}
        <section className={ui.section}>
          <div className={styles.story}>
            <div>
              <ScrollReveal>
                <span className={ui.badge}>{t("storyBadge")}</span>
                <h2 className={styles.h2}>
                  {t("storyTitle")} <span className="accent">{t("storyAccent")}</span>
                </h2>
                {t("story").map((p, i) => (
                  <p key={i} className={styles.lead}>{p}</p>
                ))}
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <blockquote className={styles.quote}>
                  <Quotes weight="fill" className={styles.quoteIcon} aria-hidden="true" />
                  <p>{t("quote")}</p>
                  <cite>{t("quoteBy")}</cite>
                </blockquote>
              </ScrollReveal>
            </div>
            <Parallax speed={0.1}>
              <div className={styles.approach}>
                <h3>{t("approachTitle")}</h3>
                <Stagger className={styles.approachGrid} gap={0.1}>
                  {t("approach").map((a, i) => {
                    const Icon = APPROACH_ICONS[i];
                    return (
                      <StaggerItem key={a.t} className={styles.approachItem}>
                        <span className={styles.approachIcon}><Icon weight="duotone" /></span>
                        <strong>{a.t}</strong>
                        <p>{a.d}</p>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </Parallax>
          </div>
        </section>

        {/* Mission / About / Vision */}
        <section className={ui.section}>
          <Head badge={t("mvaBadge")} title={t("mvaTitle")} accent={t("mvaAccent")} />
          <Stagger className={styles.mvaGrid} gap={0.12}>
            {[
              { Icon: Target, h: t("mission"), p: t("missionText"), tone: "teal" },
              { Icon: UsersThree, h: t("aboutT"), p: t("aboutText"), tone: "violet", alt: true },
              { Icon: Eye, h: t("vision"), p: t("visionText"), tone: "blue" },
            ].map(({ Icon, h, p, tone, alt }) => (
              <StaggerItem key={h}>
                <SpotlightCard className={`${styles.mvaCard} ${alt ? styles.mvaCardAlt : ""}`}>
                  <Icon3D icon={<Icon weight="duotone" />} tone={tone} size={60} />
                  <h3>{h}</h3>
                  <p>{p}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* How we work — timeline */}
        <section className={ui.section}>
          <Head badge={t("howBadge")} title={t("howTitle")} accent={t("howAccent")} lead={t("howLead")} />
          <div className={styles.timeline}>
            <ScrollLine className={styles.timelineLine} />
            {t("how").map((s, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <ScrollReveal key={s.t} delay={0.05} direction="up" distance={30}>
                  <div className={styles.tlItem}>
                    <span className={styles.tlDot}><Icon weight="duotone" /></span>
                    <div className={styles.tlCard}>
                      <span className={styles.tlStep}>{String(i + 1).padStart(2, "0")}</span>
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Safe home care */}
        <section className={ui.section}>
          <Head badge={t("safeBadge")} title={t("safeTitle")} accent={t("safeAccent")} lead={t("safeLead")} />
          <Stagger className={styles.safeGrid} gap={0.08}>
            {t("safe").map((s, i) => {
              const Icon = SAFE_ICONS[i];
              const danger = i === 4;
              return (
                <StaggerItem key={s.t}>
                  <SpotlightCard className={`${styles.safeCard} ${danger ? styles.safeDanger : ""}`}>
                    <span className={styles.safeIcon}>{danger ? <Warning weight="fill" /> : <Icon weight="duotone" />}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
          <p className={styles.note}>{t("safeNote")}</p>
        </section>

        {/* Values */}
        <section className={ui.section}>
          <Head badge={t("valuesBadge")} title={t("valuesTitle")} accent={t("valuesAccent")} />
          <Stagger className={styles.valuesGrid} gap={0.1}>
            {t("values").map((v, i) => {
              const { Icon, tone } = VALUES[i];
              return (
                <StaggerItem key={v.t}>
                  <SpotlightCard className={styles.valueCard}>
                    <Icon3D icon={<Icon weight="duotone" />} tone={tone} size={56} float />
                    <h3>{v.t}</h3>
                    <p>{v.d}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        {/* Team */}
        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("teamBadge")}</span>
              <h2>{t("teamTitle")}</h2>
              <p>{t("teamLead")}</p>
            </div>
          </ScrollReveal>
          <Stagger className={styles.teamGrid} gap={0.12}>
            {TEAM.map(({ name, Icon }, i) => (
              <StaggerItem key={name}>
                <SpotlightCard className={styles.teamCard}>
                  <span className={styles.teamAvatar}><Icon weight="duotone" /></span>
                  <h3>{name}</h3>
                  <span className={styles.teamRole}>{t("team")[i].role}</span>
                  <p>{t("team")[i].d}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Services */}
        <section className={ui.section}>
          <Head badge={t("servicesBadge")} title={t("servicesTitle")} />
          <Stagger className={styles.servicesTags} gap={0.05}>
            {SERVICES.map(({ slug, Icon }, i) => (
              <StaggerItem key={slug} y={14}>
                <Link to={`/hizmet/${slug}`} className={styles.serviceTag}>
                  <Icon weight="duotone" /> {services[i]}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <div className={ui.btnRow}>
            <Link to="/hizmetlerimiz" className={`${ui.btn} ${ui.btnGhost}`}>
              {t("allServices")} <ArrowRight weight="bold" className={styles.flip} />
            </Link>
          </div>
        </section>

        {/* Regions */}
        <section className={ui.section}>
          <Head badge={t("regionsBadge")} title={t("regionsTitle")} accent={t("regionsAccent")} lead={t("regionsLead")} />
          <Stagger className={styles.regions} gap={0.1}>
            {regions.map((r, i) => (
              <StaggerItem key={r}>
                <SpotlightCard className={`${styles.region} ${i === 0 ? styles.regionHq : ""}`}>
                  <span className={styles.regionPin}><MapPin weight="fill" /></span>
                  <strong>{r}</strong>
                  {i === 0 ? <small>{t("hq")} · {SITE.addressShort}</small> : <small>{t("regionSub")}</small>}
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
          <p className={styles.note}>{t("regionNote")}</p>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <div className={styles.ctaBox}>
            <Float className={styles.ctaIcon} amplitude={8}>
              <HouseLine weight="duotone" />
            </Float>
            <h2>{t("ctaTitle")}</h2>
            <p>{t("ctaText")}</p>
            <div className={styles.ctaRow}>
              <Magnetic>
                <Link to="/randevu" className={`${ui.btn} ${styles.ctaPrimary}`}>
                  <CalendarCheck weight="duotone" /> {t("ctaBook")}
                </Link>
              </Magnetic>
              <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${styles.ctaGhost}`}>
                <Phone weight="duotone" /> {t("ctaCall")}
              </a>
              <a href={whatsappUrl(t("waMsg"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
                <WhatsappLogo weight="fill" /> {t("ctaWa")}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Wrapper>
    </>
  );
};

export default React.memo(About);
