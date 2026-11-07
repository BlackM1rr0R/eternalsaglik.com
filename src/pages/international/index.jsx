import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  WhatsappLogo, Phone, BuildingApartment, Stethoscope, Syringe, TestTube, FirstAid, Ambulance, Clock, MapPin, Translate,
  Check, Airplane, Drop, Moon, Sun, WarningCircle, ChatCircleDots, CalendarCheck, HouseLine, Envelope, NavigationArrow,
  IdentificationCard, Pill, Thermometer, CreditCard, ShieldCheck, House, Suitcase,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import AnimatedText from "../../components/animatedtext";
import { Stagger, StaggerItem, SpotlightCard, Magnetic } from "../../components/motion";
import Faq from "../packages/faq";
import ui from "../../styles/ui.module.css";
import s from "./index.module.css";
import { SITE } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { LANGS, useLang, useT } from "../../i18n";

const SERVICE_ICONS = [Stethoscope, Syringe, FirstAid, TestTube, Ambulance, BuildingApartment];
const HOW_ICONS = [ChatCircleDots, CalendarCheck, HouseLine];
const READY_ICONS = [IdentificationCard, BuildingApartment, NavigationArrow, Thermometer, Pill, Phone];
const TONES = ["teal", "blue", "violet", "amber", "rose", "green"];

const dict = {
  tr: {
    title: "Otelinizde Doktor ve Serum | ETERNAL Sağlık Hizmetleri",
    desc: "Sakarya, Sapanca, Kartepe, Kocaeli, Düzce ve İstanbul'da otel, villa ve evde doktor ziyareti, serum, hemşirelik ve tahlil. 7/24, Türkçe, İngilizce ve Arapça iletişim.",
    badge: "Misafirlerimiz için",
    h1: "Kapınızda Bir Doktor,",
    h1b: "Nerede Konaklarsanız",
    lead: "Tatilde rahatsızlandınız ya da uzun bir yolculuk sonrası serum mu istiyorsunuz? Sağlık ekibimiz otelinize, villanıza veya evinize 7/24 geliyor.",
    wa: "WhatsApp'tan yazın",
    waText: "Merhaba, bölgede misafirim ve sağlık desteği istiyorum. Otelim / adresim: ",
    call: "Ara",
    strip: ["7/24, bayramlar dahil", "Türkçe · English · العربية", "Otel, villa ve ev ziyareti"],
    home: "Ana sayfa",
    servicesH: "Sizin için neler yapabiliriz?",
    services: [
      { t: "Doktor ziyareti", d: "Otelinizde veya evinizde muayene, değerlendirme ve gerektiğinde reçete." },
      { t: "Serum uygulaması", d: "Doktor değerlendirmesinden sonra sıvı, vitamin ve destek serumları." },
      { t: "Hemşirelik", d: "Enjeksiyon, pansuman, sonda bakımı ve takip." },
      { t: "Tahlil", d: "Kan ve idrar tahlilleri ile PCR testleri, kaldığınız yerde alınır." },
      { t: "Özel ambulans", d: "Hastaneye, eve veya başka bir şehre hasta transferi." },
      { t: "Otel hizmeti", d: "Sapanca, Kartepe ve çevresinde konaklayan misafirlere hizmet veriyoruz." },
    ],
    hotelBadge: "Otel ve villa ziyaretleri",
    hotelH: "Odanızdan çıkmanıza gerek yok",
    hotelText: "Sapanca, Kartepe ve çevresindeki otel, bungalov ve villalarda konaklayan misafirlere oda ziyareti yapıyoruz. Resepsiyon bizi sizin adınıza da arayabilir.",
    hotelList: [
      "Otel adı ve oda numarası ya da villanın konumu yeterli",
      "Ziyaret saati sizinle teyit edilir",
      "Muayene ve uygulama odanızda, mahremiyetinize özen gösterilerek yapılır",
      "Hastane gerekirse yönlendirme ve ambulans koordinasyonu",
    ],
    ivBadge: "Yolcular için serum",
    ivH: "Uzun yolculuk sonrası serum: kimler için, nasıl?",
    ivText: "Uzun uçuş ya da araç yolculuğu, sıcak hava ve az sıvı alımı sonrası bazı misafirler kendini bitkin hisseder. Serum, ancak doktor değerlendirmesinden sonra ve uygun görülürse uygulanır.",
    ivList: [
      "Uygulama öncesinde sağlık geçmişiniz, ilaçlarınız ve alerjileriniz sorulur",
      "Serumun içeriği ve süresi doktor tarafından belirlenir",
      "Uygulama sırasında hemşiremiz yanınızda kalır",
      "Serum herkes için uygun değildir; uygun olmadığı durumlarda uygulanmaz",
    ],
    infoBadge: "Bilgi",
    infoH: "Jet lag ve sıvı kaybı hakkında",
    infoNote: "Bu bilgiler geneldir ve muayenenin yerine geçmez. Şikâyetleriniz sürerse doktora danışın.",
    jet: {
      t: "Jet lag",
      p: [
        "Birkaç saat dilimi geçtikten sonra uyku düzeninin bozulması, gündüz uykululuk, dikkat dağınıklığı ve iştah değişikliği sık görülür; genellikle birkaç gün içinde vücut yerel saate uyum sağlar.",
        "Gün ışığına çıkmak, yerel saate göre uyumaya çalışmak, bol su içmek ve alkolü sınırlamak uyumu kolaylaştırabilir. Serum jet lag'ı tedavi etmez; yalnızca sıvı ihtiyacı olan durumlarda doktor değerlendirmesiyle düşünülebilir.",
      ],
    },
    dehyd: {
      t: "Sıvı kaybı (dehidratasyon)",
      p: [
        "Sıcak hava, uzun yolculuk, alkol, kusma veya ishal sıvı kaybına yol açabilir. Susuzluk, ağız kuruluğu, baş ağrısı, halsizlik ve koyu renkli idrar hafif sıvı kaybının olası işaretleridir.",
        "Çoğu zaman ağızdan sıvı almak ve dinlenmek yeterlidir. Ağızdan sıvı alamıyorsanız ya da kusma ve ishal sürüyorsa doktor değerlendirmesi gerekebilir.",
      ],
    },
    redflag: "Göğüs ağrısı, nefes darlığı, bilinç bulanıklığı, bayılma ya da uzun yolculuk sonrası tek bacakta ağrılı şişlik varsa hemen 112'yi arayın.",
    howH: "Nasıl çalışır?",
    how: ["Konumunuzu ve kısa bir açıklamayı WhatsApp'tan gönderin.", "Ziyaret saatini ve tahmini varış süresini teyit ederiz.", "Doktor veya hemşiremiz size gelir ve bakım sağlar."],
    reachH: "Bize nasıl ulaşırsınız?",
    reachText: "En hızlı yol WhatsApp'tır: konumunuzu paylaşabilir, mesajınızı kendi dilinizde yazabilirsiniz.",
    reachWa: "WhatsApp (konum paylaşabilirsiniz)",
    reachPhone: "Telefon",
    reachMail: "E-posta",
    readyH: "Hazır bulundurmanız iyi olur",
    ready: [
      "Pasaport veya kimlik",
      "Otel adı ve oda numarası ya da villa adresi",
      "WhatsApp konum pini",
      "Şikâyetiniz ve ne zaman başladığı",
      "Kullandığınız ilaçlar ve alerjileriniz",
      "Size ulaşabileceğimiz bir telefon numarası",
    ],
    payH: "Ödeme ve sigorta",
    payText: "Ödeme seçenekleri, ücret ve seyahat sigortanız için gerekebilecek belgelerle ilgili sorularınızı ziyaretten önce WhatsApp'tan bize sorun; size net bilgi verelim.",
    payBtn: "WhatsApp'tan sorun",
    payWa: "Merhaba, ödeme seçenekleri ve ücret hakkında bilgi almak istiyorum.",
    info: [
      { t: "7/24, bayramlar dahil" },
      { t: "Sakarya, Sapanca, Kartepe, Kocaeli, Düzce, İstanbul" },
      { t: "Türkçe, İngilizce ve Arapça iletişim" },
    ],
    faqH: "Sık sorulanlar",
    faq: [
      { q: "Otel dışında, kiralık villa veya evde de geliyor musunuz?", a: "Evet. Konumu WhatsApp'tan paylaşmanız yeterli; hizmet bölgemizdeki otel, villa, bungalov ve evlere geliyoruz." },
      { q: "Ne kadar sürede gelirsiniz?", a: "Süre konumunuza ve o anki yoğunluğa göre değişir. Acil çağrılarda ortalama 30-45 dakika içinde ulaşmaya çalışıyoruz; tahmini süreyi yazdığınızda size bildiririz." },
      { q: "Doktor İngilizce veya Arapça konuşuyor mu?", a: "Türkçe, İngilizce ve Arapça iletişim kurabiliyoruz. Ziyaret öncesinde dil tercihinizi belirtmeniz yeterli." },
      { q: "Reçete yazılırsa ilacı nereden alırım?", a: "Ekibimiz size en yakın eczane hakkında bilgi verir. Gece saatlerinde nöbetçi eczaneler açıktır." },
      { q: "Çocuğum için de hizmet alabilir miyim?", a: "Durumu WhatsApp'tan kısaca anlatın; uygun ekibi yönlendirelim. Çocuklarda yüksek ateşle birlikte uyuşukluk, nefes almada zorluk veya havale gibi durumlarda hemen 112'yi arayın." },
      { q: "Ödemeyi nasıl yapabilirim?", a: "Ödeme seçeneklerini ve ücreti WhatsApp'tan bize sorun; ziyaret öncesinde size bilgi veririz." },
    ],
    emergency: "Hayati tehlike varsa önce 112'yi arayın (ücretsiz, 7/24).",
  },
  en: {
    title: "Doctor & IV Therapy at Your Hotel | ETERNAL Health Services",
    desc: "Hotel, villa and home doctor visits, IV drips, nursing and lab tests in Sakarya, Sapanca, Kartepe, Kocaeli, Düzce and Istanbul. 24/7, English and Arabic speaking support.",
    badge: "For international guests",
    h1: "A Doctor at Your Door,",
    h1b: "Wherever You Stay",
    lead: "Feeling unwell on holiday, or need an IV drip after a long trip? Our medical team comes to your hotel, villa or home, 24/7.",
    wa: "Message us on WhatsApp",
    waText: "Hello, I am a guest in the area and I would like medical assistance. My hotel/address is: ",
    call: "Call",
    strip: ["24/7, including holidays", "Türkçe · English · العربية", "Hotel, villa and home visits"],
    home: "Home page",
    servicesH: "What we can do for you",
    services: [
      { t: "Doctor visit", d: "Examination, assessment and, if needed, prescriptions at your hotel or home." },
      { t: "IV drip therapy", d: "Fluids, vitamin and support drips after a medical assessment." },
      { t: "Nursing care", d: "Injections, dressings, catheter care and monitoring." },
      { t: "Lab tests", d: "Blood and urine tests, PCR tests collected where you stay." },
      { t: "Private ambulance", d: "Patient transfer to hospital, home or another city." },
      { t: "Hotel service", d: "We work with guests staying in Sapanca, Kartepe and the surrounding area." },
    ],
    hotelBadge: "Hotel and villa visits",
    hotelH: "No need to leave your room",
    hotelText: "We visit guests staying in hotels, bungalows and villas in Sapanca, Kartepe and the surrounding area. Your reception can also call us on your behalf.",
    hotelList: [
      "The hotel name and room number, or the villa's location, is all we need",
      "The visit time is confirmed with you",
      "Examination and care take place in your room, with respect for your privacy",
      "Referral and ambulance coordination if hospital care is needed",
    ],
    ivBadge: "IV drips for travellers",
    ivH: "IV drips after a long journey: who for, and how?",
    ivText: "After a long flight or drive, hot weather and too little to drink, some guests feel drained. A drip is only given after a doctor's assessment, and only if it is considered appropriate.",
    ivList: [
      "We ask about your health history, medicines and allergies first",
      "The doctor decides on the contents and duration",
      "Our nurse stays with you during the drip",
      "A drip is not suitable for everyone, and is not given when it isn't appropriate",
    ],
    infoBadge: "Good to know",
    infoH: "About jet lag and dehydration",
    infoNote: "This is general information and does not replace an examination. If symptoms persist, see a doctor.",
    jet: {
      t: "Jet lag",
      p: [
        "After crossing several time zones, disturbed sleep, daytime sleepiness, poor concentration and changes in appetite are common; the body usually adjusts to local time within a few days.",
        "Getting daylight, trying to sleep on local time, drinking plenty of water and limiting alcohol can help. An IV drip does not treat jet lag; it may only be considered, after a doctor's assessment, when fluids are needed.",
      ],
    },
    dehyd: {
      t: "Dehydration",
      p: [
        "Hot weather, long journeys, alcohol, vomiting or diarrhoea can cause fluid loss. Thirst, a dry mouth, headache, tiredness and dark urine are possible signs of mild dehydration.",
        "Drinking fluids and resting is often enough. If you cannot keep fluids down, or vomiting and diarrhoea continue, a doctor's assessment may be needed.",
      ],
    },
    redflag: "Chest pain, difficulty breathing, confusion, fainting, or a painful swollen leg after a long journey: call 112 immediately.",
    howH: "How it works",
    how: ["Send us your location and a short description on WhatsApp.", "We confirm the visit time and the expected arrival.", "Our doctor or nurse comes to you and provides care."],
    reachH: "How to reach us",
    reachText: "WhatsApp is the fastest way: you can share your location and write in your own language.",
    reachWa: "WhatsApp (location sharing welcome)",
    reachPhone: "Phone",
    reachMail: "E-mail",
    readyH: "Good to have ready",
    ready: [
      "Passport or ID",
      "Hotel name and room number, or villa address",
      "A WhatsApp location pin",
      "Your symptoms and when they started",
      "Medicines you take and any allergies",
      "A phone number we can reach you on",
    ],
    payH: "Payment and insurance",
    payText: "Please ask us on WhatsApp before the visit about payment options, fees and any documents your travel insurance may need, and we will give you clear information.",
    payBtn: "Ask us on WhatsApp",
    payWa: "Hello, I would like information about payment options and fees.",
    info: [
      { t: "24/7, including holidays" },
      { t: "Sakarya, Sapanca, Kartepe, Kocaeli, Düzce, Istanbul" },
      { t: "Turkish, English and Arabic communication" },
    ],
    faqH: "Frequently asked questions",
    faq: [
      { q: "Do you also visit rental villas or homes, not just hotels?", a: "Yes. Just share the location on WhatsApp; we visit hotels, villas, bungalows and homes within our service area." },
      { q: "How long will it take you to arrive?", a: "It depends on your location and how busy we are. For urgent calls we aim to arrive in 30-45 minutes on average, and we tell you the estimated time when you message us." },
      { q: "Does the doctor speak English or Arabic?", a: "We can communicate in Turkish, English and Arabic. Just tell us your preferred language before the visit." },
      { q: "If I get a prescription, where do I buy the medicine?", a: "Our team will tell you about the nearest pharmacy. Duty pharmacies (nöbetçi eczane) are open at night." },
      { q: "Can you see my child?", a: "Briefly describe the situation on WhatsApp and we will arrange the right team. If a child has a high fever with drowsiness, difficulty breathing or a seizure, call 112 immediately." },
      { q: "How can I pay?", a: "Ask us on WhatsApp about payment options and fees; we will let you know before the visit." },
    ],
    emergency: "Life-threatening emergency? Call 112 (free, 24/7) first.",
  },
  ar: {
    title: "طبيب وعلاج بالمحاليل في فندقك | إيترنال للخدمات الصحية",
    desc: "زيارات طبيب في الفندق والفيلا والمنزل، محاليل وريدية، تمريض وتحاليل في سكاريا وسبانجا وكارتبه وكوجالي ودوزجه وإسطنبول. على مدار الساعة.",
    badge: "للضيوف الدوليين",
    h1: "طبيب عند بابك،",
    h1b: "أينما كنت تقيم",
    lead: "هل تشعر بتوعك أثناء العطلة أو تحتاج إلى محلول وريدي بعد رحلة طويلة؟ فريقنا الطبي يأتي إلى فندقك أو الفيلا أو المنزل على مدار الساعة.",
    wa: "راسلنا على واتساب",
    waText: "مرحباً، أنا ضيف في المنطقة وأحتاج إلى مساعدة طبية. الفندق / العنوان: ",
    call: "اتصل",
    strip: ["على مدار الساعة، بما في ذلك العطل", "Türkçe · English · العربية", "زيارات للفنادق والفلل والمنازل"],
    home: "الصفحة الرئيسية",
    servicesH: "ماذا نقدم لك",
    services: [
      { t: "زيارة طبيب", d: "فحص وتقييم ووصفة طبية عند الحاجة في فندقك أو منزلك." },
      { t: "العلاج بالمحاليل الوريدية", d: "محاليل السوائل والفيتامينات والدعم بعد تقييم طبي." },
      { t: "التمريض", d: "الحقن، الضمادات، العناية بالقسطرة والمتابعة." },
      { t: "التحاليل", d: "تحاليل الدم والبول واختبار PCR في مكان إقامتك." },
      { t: "إسعاف خاص", d: "نقل المرضى إلى المستشفى أو المنزل أو مدينة أخرى." },
      { t: "خدمة الفنادق", d: "نخدم الضيوف المقيمين في سبانجا وكارتبه والمناطق المحيطة." },
    ],
    hotelBadge: "زيارات الفنادق والفلل",
    hotelH: "لا حاجة لمغادرة غرفتك",
    hotelText: "نزور الضيوف المقيمين في الفنادق والبنغلوهات والفلل في سبانجا وكارتبه والمناطق المحيطة. ويمكن لموظفي الاستقبال الاتصال بنا نيابة عنك.",
    hotelList: [
      "يكفي اسم الفندق ورقم الغرفة أو موقع الفيلا",
      "يُؤكَّد موعد الزيارة معك",
      "يتم الفحص والرعاية في غرفتك مع احترام خصوصيتك",
      "التوجيه وتنسيق الإسعاف إذا لزمت رعاية المستشفى",
    ],
    ivBadge: "محاليل للمسافرين",
    ivH: "المحاليل بعد رحلة طويلة: لمن وكيف؟",
    ivText: "بعد رحلة طيران أو سفر طويل بالسيارة، ومع الطقس الحار وقلة شرب السوائل، يشعر بعض الضيوف بالإنهاك. لا يُعطى المحلول إلا بعد تقييم الطبيب وإذا رأى أنه مناسب.",
    ivList: [
      "نسألك أولاً عن تاريخك الصحي وأدويتك والحساسية",
      "يحدد الطبيب محتوى المحلول ومدته",
      "يبقى الممرض بجانبك أثناء المحلول",
      "المحلول لا يناسب الجميع، ولا يُعطى إذا لم يكن مناسباً",
    ],
    infoBadge: "معلومات مفيدة",
    infoH: "عن اضطراب الرحلات الجوية الطويلة والجفاف",
    infoNote: "هذه معلومات عامة ولا تغني عن الفحص الطبي. إذا استمرت الأعراض فاستشر طبيباً.",
    jet: {
      t: "اضطراب الرحلات الجوية الطويلة (Jet lag)",
      p: [
        "بعد عبور عدة مناطق زمنية يشيع اضطراب النوم والنعاس نهاراً وضعف التركيز وتغير الشهية؛ وعادة ما يتكيف الجسم مع التوقيت المحلي خلال أيام قليلة.",
        "التعرض لضوء النهار ومحاولة النوم وفق التوقيت المحلي وشرب الكثير من الماء والحد من الكحول قد يساعد. المحلول الوريدي لا يعالج اضطراب الرحلات؛ وقد يُنظر فيه فقط بعد تقييم الطبيب عند الحاجة إلى السوائل.",
      ],
    },
    dehyd: {
      t: "الجفاف (فقدان السوائل)",
      p: [
        "قد يؤدي الطقس الحار والسفر الطويل والكحول والقيء أو الإسهال إلى فقدان السوائل. العطش وجفاف الفم والصداع والتعب والبول الداكن علامات محتملة لجفاف خفيف.",
        "غالباً ما يكفي شرب السوائل والراحة. إذا لم تستطع الاحتفاظ بالسوائل أو استمر القيء والإسهال، فقد يلزم تقييم الطبيب.",
      ],
    },
    redflag: "عند ألم الصدر أو ضيق التنفس أو تشوش الوعي أو الإغماء أو تورم مؤلم في ساق واحدة بعد رحلة طويلة: اتصل فوراً بالرقم 112.",
    howH: "كيف تعمل الخدمة",
    how: ["أرسل لنا موقعك ووصفاً قصيراً عبر واتساب.", "نؤكد موعد الزيارة ووقت الوصول المتوقع.", "يأتي طبيبنا أو الممرض إليك ويقدم الرعاية."],
    reachH: "كيف تتواصل معنا",
    reachText: "واتساب هو الطريقة الأسرع: يمكنك مشاركة موقعك والكتابة بلغتك.",
    reachWa: "واتساب (يمكنك مشاركة الموقع)",
    reachPhone: "الهاتف",
    reachMail: "البريد الإلكتروني",
    readyH: "يُفضَّل تجهيز ما يلي",
    ready: [
      "جواز السفر أو الهوية",
      "اسم الفندق ورقم الغرفة أو عنوان الفيلا",
      "موقعك عبر واتساب",
      "الأعراض ومتى بدأت",
      "الأدوية التي تتناولها والحساسية",
      "رقم هاتف يمكننا الوصول إليك عليه",
    ],
    payH: "الدفع والتأمين",
    payText: "اسألنا عبر واتساب قبل الزيارة عن طرق الدفع والرسوم وأي مستندات قد يحتاجها تأمين السفر الخاص بك، وسنعطيك معلومات واضحة.",
    payBtn: "اسألنا على واتساب",
    payWa: "مرحباً، أود معرفة طرق الدفع والرسوم.",
    info: [
      { t: "على مدار الساعة، بما في ذلك العطل" },
      { t: "سكاريا، سبانجا، كارتبه، كوجالي، دوزجه، إسطنبول" },
      { t: "التواصل بالتركية والإنجليزية والعربية" },
    ],
    faqH: "أسئلة شائعة",
    faq: [
      { q: "هل تزورون الفلل والمنازل المستأجرة أيضاً، وليس الفنادق فقط؟", a: "نعم. يكفي مشاركة الموقع عبر واتساب؛ نزور الفنادق والفلل والبنغلوهات والمنازل ضمن منطقة خدمتنا." },
      { q: "كم من الوقت تحتاجون للوصول؟", a: "يعتمد ذلك على موقعك ومدى الانشغال. في الحالات العاجلة نسعى للوصول خلال 30-45 دقيقة في المتوسط، ونخبرك بالوقت المتوقع عند مراسلتنا." },
      { q: "هل يتحدث الطبيب الإنجليزية أو العربية؟", a: "يمكننا التواصل بالتركية والإنجليزية والعربية. يكفي أن تخبرنا باللغة المفضلة قبل الزيارة." },
      { q: "إذا كُتبت لي وصفة، من أين أشتري الدواء؟", a: "سيرشدك فريقنا إلى أقرب صيدلية. وتعمل الصيدليات المناوبة (nöbetçi eczane) ليلاً." },
      { q: "هل يمكنكم معاينة طفلي؟", a: "صف الحالة باختصار عبر واتساب وسنوجه الفريق المناسب. إذا كان لدى الطفل حمى شديدة مع خمول أو صعوبة في التنفس أو تشنج، فاتصل فوراً بالرقم 112." },
      { q: "كيف يمكنني الدفع؟", a: "اسألنا عبر واتساب عن طرق الدفع والرسوم، وسنبلغك قبل الزيارة." },
    ],
    emergency: "في حالة طوارئ تهدد الحياة اتصل أولاً بالرقم 112 (مجاني، على مدار الساعة).",
  },
};

const INFO_ICONS = [Clock, MapPin, Translate];
const ORBIT = [Airplane, Drop, Moon, Sun, Suitcase, House];
const fmtPhone = (tel) => tel.replace(/^\+90(\d{3})(\d{3})(\d{2})(\d{2})$/, "+90 $1 $2 $3 $4");

// Route language (/en or /ar) is applied once on mount / route change; after that the page follows
// the site-wide language switcher, so it also renders in Turkish.
const International = ({ lang: routeLang = "en" }) => {
  const { lang, setLang, meta } = useLang();
  const t = useT(dict);
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  useEffect(() => setLang(routeLang), [routeLang, setLang]);

  const pickLang = (code) => {
    setLang(code);
    if (code === "en" || code === "ar") navigate(`/${code}`);
  };

  const ready = t("ready");
  const jet = t("jet");
  const dehyd = t("dehyd");

  return (
    <div dir={meta.dir} lang={lang}>
      <Helmet htmlAttributes={{ lang, dir: meta.dir }}>
        <title>{t("title")}</title>
        <meta name="description" content={t("desc")} />
        <link rel="canonical" href={`${SITE.url}/${routeLang}`} />
        <link rel="alternate" hrefLang="tr" href={SITE.url} />
        <link rel="alternate" hrefLang="en" href={`${SITE.url}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE.url}/ar`} />
      </Helmet>

      <section className={ui.pageHero}>
        <Wrapper>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className={ui.badge}>{t("badge")}</span>
            <AnimatedText key={lang} lines={[t("h1"), { text: t("h1b"), accent: true }]} />
            <p>{t("lead")}</p>
            <div className={ui.btnRow}>
              <Magnetic>
                <a href={whatsappUrl(t("waText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}><WhatsappLogo /> {t("wa")}</a>
              </Magnetic>
              <a href={`tel:${SITE.phones[0].tel}`} className={`${ui.btn} ${ui.btnGhost}`}><Phone /> {t("call")} <span dir="ltr">{fmtPhone(SITE.phones[0].tel)}</span></a>
            </div>
            <div className={s.langs}>
              {LANGS.map((l) => (
                <button key={l.code} type="button" lang={l.code} aria-pressed={lang === l.code}
                  className={`${s.lang} ${lang === l.code ? s.langActive : ""}`} onClick={() => pickLang(l.code)}>
                  <Translate /> {l.label}
                </button>
              ))}
              <Link to="/" className={s.lang}><House /> {t("home")}</Link>
            </div>
            <div className={s.strip}>
              {t("strip").map((x, i) => {
                const Icon = [Clock, Translate, BuildingApartment][i];
                return <span key={x}><Icon /> {x}</span>;
              })}
            </div>
          </motion.div>
        </Wrapper>
      </section>

      <Wrapper>
        <section className={ui.section}>
          <ScrollReveal><div className={ui.sectionHead}><h2>{t("servicesH")}</h2></div></ScrollReveal>
          <Stagger className={ui.grid} gap={0.06}>
            {t("services").map((sv, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <StaggerItem key={sv.t}>
                  <TiltCard className={`${ui.card} ${ui.glowBorder}`} style={{ height: "100%" }}>
                    <Icon3D icon={<Icon />} tone={TONES[i % TONES.length]} size={58} />
                    <h3>{sv.t}</h3>
                    <p>{sv.d}</p>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        <section className={ui.sectionTight}>
          <div className={s.split}>
            <ScrollReveal direction="right">
              <div>
                <span className={ui.badge}>{t("hotelBadge")}</span>
                <h2>{t("hotelH")}</h2>
                <p>{t("hotelText")}</p>
                <ul className={s.ticks}>{t("hotelList").map((x) => <li key={x}><Check weight="bold" /> {x}</li>)}</ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <div className={s.visual} aria-hidden="true">
                <span className={s.ring} />
                <motion.div className={s.orbit} animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                  {ORBIT.map((Icon, i) => {
                    const a = (i / ORBIT.length) * Math.PI * 2;
                    return (
                      <motion.span key={i} style={{ left: `calc(50% + ${Math.cos(a) * 115}px - 23px)`, top: `calc(50% + ${Math.sin(a) * 115}px - 23px)` }}
                        animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                        <Icon />
                      </motion.span>
                    );
                  })}
                </motion.div>
                <Icon3D icon={<BuildingApartment />} tone="teal" size={110} float />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.section}>
          <div className={s.split}>
            <ScrollReveal direction="right">
              <SpotlightCard className={`${ui.card} ${ui.glass}`}>
                <Icon3D icon={<Syringe />} tone="blue" size={64} />
                <ul className={s.ticks}>{t("ivList").map((x) => <li key={x}><ShieldCheck /> {x}</li>)}</ul>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <span className={ui.badge}>{t("ivBadge")}</span>
                <h2>{t("ivH")}</h2>
                <p>{t("ivText")}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("infoBadge")}</span>
              <h2>{t("infoH")}</h2>
              <p>{t("infoNote")}</p>
            </div>
          </ScrollReveal>
          <div className={s.infoGrid}>
            {[[jet, Moon, "violet"], [dehyd, Drop, "blue"]].map(([block, Icon, tone], i) => (
              <ScrollReveal key={block.t} delay={i * 0.1}>
                <div className={`${ui.card} ${s.infoCard}`} style={{ height: "100%" }}>
                  <h3><Icon3D icon={<Icon />} tone={tone} size={46} /> {block.t}</h3>
                  {block.p.map((x) => <p key={x}>{x}</p>)}
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className={`${ui.note} ${ui.noteDanger} ${s.redflag}`}><WarningCircle /> <span>{t("redflag")}</span></div>
          </ScrollReveal>
        </section>

        <section className={ui.section}>
          <ScrollReveal><div className={ui.sectionHead}><h2>{t("howH")}</h2></div></ScrollReveal>
          <Stagger className={ui.grid}>
            {t("how").map((x, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <StaggerItem key={x}>
                  <SpotlightCard className={ui.card} style={{ height: "100%" }}>
                    <span className={s.stepNo}>0{i + 1}</span>
                    <div style={{ marginTop: 10 }}><Icon3D icon={<Icon />} tone={TONES[i]} size={52} /></div>
                    <p style={{ marginTop: 14 }}>{x}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <h2>{t("reachH")}</h2>
              <p>{t("reachText")}</p>
            </div>
          </ScrollReveal>
          <Stagger className={s.contactGrid}>
            <StaggerItem>
              <a href={whatsappUrl(t("waText"))} target="_blank" rel="noopener noreferrer" className={s.contactItem}>
                <Icon3D icon={<WhatsappLogo />} tone="green" size={46} />
                <span><small>{t("reachWa")}</small><strong dir="ltr">{fmtPhone(`+${SITE.whatsapp}`)}</strong></span>
              </a>
            </StaggerItem>
            {SITE.phones.map((p) => (
              <StaggerItem key={p.tel}>
                <a href={`tel:${p.tel}`} className={s.contactItem}>
                  <Icon3D icon={<Phone />} tone="teal" size={46} />
                  <span><small>{t("reachPhone")}</small><strong dir="ltr">{fmtPhone(p.tel)}</strong></span>
                </a>
              </StaggerItem>
            ))}
            <StaggerItem>
              <a href={`mailto:${SITE.email}`} className={s.contactItem}>
                <Icon3D icon={<Envelope />} tone="violet" size={46} />
                <span><small>{t("reachMail")}</small><strong dir="ltr">{SITE.email}</strong></span>
              </a>
            </StaggerItem>
          </Stagger>
        </section>

        <section className={ui.section}>
          <div className={ui.grid2}>
            <ScrollReveal direction="right">
              <div className={ui.card} style={{ height: "100%" }}>
                <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>{t("readyH")}</h2>
                <Stagger as="ul" className={s.ready} gap={0.05}>
                  {ready.map((x, i) => {
                    const Icon = READY_ICONS[i];
                    return <StaggerItem as="li" key={x} y={12}><Icon /> {x}</StaggerItem>;
                  })}
                </Stagger>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <div style={{ display: "grid", gap: 22, height: "100%" }}>
                <SpotlightCard className={`${ui.card} ${ui.glowBorder}`}>
                  <h2 style={{ marginTop: 0, fontSize: "1.5rem", display: "flex", gap: 12, alignItems: "center" }}>
                    <Icon3D icon={<CreditCard />} tone="amber" size={46} /> {t("payH")}
                  </h2>
                  <p>{t("payText")}</p>
                  <a href={whatsappUrl(t("payWa"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`} style={{ marginTop: 8 }}>
                    <WhatsappLogo /> {t("payBtn")}
                  </a>
                </SpotlightCard>
                <div className={ui.card}>
                  {t("info").map((x, i) => {
                    const Icon = INFO_ICONS[i];
                    return (
                      <p key={x.t} style={{ display: "flex", gap: 12, alignItems: "center", margin: "8px 0" }}>
                        <Icon style={{ color: "var(--primary)", flexShrink: 0 }} /> {x.t}
                      </p>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal><div className={ui.sectionHead}><h2>{t("faqH")}</h2></div></ScrollReveal>
          <Faq key={lang} items={t("faq")} />
          <div className={`${ui.note} ${ui.noteDanger}`} style={{ margin: "32px auto 80px", maxWidth: 820 }}>
            <Ambulance /> <span>{t("emergency")}</span>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export const InternationalEn = () => <International lang="en" />;
export const InternationalAr = () => <International lang="ar" />;
export default International;
