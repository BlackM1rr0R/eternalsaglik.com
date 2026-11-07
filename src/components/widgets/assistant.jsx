import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChatCircleDots, X, PaperPlaneRight, Robot } from "@phosphor-icons/react";
import w from "../../styles/widgets.module.css";
import { SITE, primaryPhone } from "../../config/site";
import * as S from "../../data/services";
import * as SR from "../../data/serums";
import * as A from "../../data/articles";
import { whatsappUrl } from "../../utils/whatsapp";
import { localize, useLang, useT } from "../../i18n";
import { openEmergency } from "./emergency";

// Rule-based helper: answers common questions from the site's own data and hands off
// to WhatsApp / phone. It never gives a diagnosis. Understands Turkish, English and Arabic
// keywords and answers in the active site language (Arabic input gets an Arabic answer).

const services = S.services || [];
const serums = SR.serumList || [];
const articles = A.articles || [];
const TR = { services: S.translations || {}, serums: SR.translations || {}, articles: A.translations || {} };

const REGION_NAMES = {
  tr: SITE.regions.join(", "),
  en: "Sakarya, Düzce, Kocaeli, Istanbul",
  ar: "سكاريا، دوزجه، كوجالي، إسطنبول",
};
const HOURS = { tr: SITE.hours, en: "7 days / 24 hours", ar: "7 أيام / 24 ساعة" };
const ADDRESS = { tr: SITE.addressShort, en: "Semerciler, Adapazarı / Sakarya", ar: "حي سمرجيلر، أدابازاري / سكاريا" };

const dict = {
  tr: {
    name: "Eternal Asistan",
    greet: "Merhaba, ben Eternal Asistan. Hizmetler, randevu ve serumlar hakkında sorularınızı yanıtlayabilirim.\n\nNot: Tıbbi teşhis koymam; acil durumda 112'yi arayın.",
    placeholder: "Sorunuzu yazın…",
    inputLabel: "Mesaj",
    send: "Gönder",
    close: "Kapat",
    quick: ["Randevu almak istiyorum", "Fiyatlar", "Hangi bölgelere geliyorsunuz?", "Annem için hizmet", "Hangi serum bana uygun?"],
    redflag: "Bu belirtiler acil olabilir. Lütfen hemen 112'yi arayın. Ardından bize de ulaşabilirsiniz.",
    call112: "112'yi Ara",
    sos: "Acil destek",
    urgent: "Acil durumlar için 7/24 ulaşabilirsiniz. Konumunuzu WhatsApp'tan gönderebilirsiniz.",
    call: "Ara",
    price: "Ücret, hizmetin türüne ve süresine göre belirlenir. Size uygun paketi WhatsApp'tan yazarsanız hemen bilgi verelim.",
    packages: "Paketler",
    askWa: "WhatsApp'tan sor",
    priceMsg: "Merhaba, fiyat bilgisi almak istiyorum.",
    booking: "Online randevu formunu 1 dakikada doldurabilirsiniz; talebiniz WhatsApp ile bize ulaşır.",
    book: "Randevu al",
    callback: "Sizi arayalım",
    regions: "Hizmet bölgelerimiz: {regions}. Merkezimiz: {address}. Sapanca ve Kartepe'deki otellere de geliyoruz.",
    regionsLink: "Hizmet bölgeleri",
    contact: "İletişim",
    hours: "Çalışma saatlerimiz: {hours}, tatil günleri dahil.",
    family: "Başka şehirde olsanız bile yakınınız için randevu oluşturabilirsiniz. Ziyaret sonrası sizi bilgilendiriyoruz.",
    familyLink: "Aileniz için",
    prescription: "Reçetenizin fotoğrafını WhatsApp'tan göndermeniz yeterli; hemşiremiz evinize gelip uygulamayı yapar.",
    sendRx: "Reçete gönder",
    rxMsg: "Merhaba, reçetemdeki iğne/serum uygulaması için randevu almak istiyorum. Reçete fotoğrafını ekliyorum.",
    hotel: "Otelinize geliyoruz. İngilizce ve Arapça sayfalarımız da var.",
    corporate: "Şirketler, oteller ve huzurevleri için sözleşmeli sağlık hizmeti sunuyoruz.",
    corporateLink: "Kurumsal",
    quiz: "3 kısa soruyla size uygun serumu önerelim.",
    quizLink: "Serum testi",
    faq: "Randevu, serum, tahlil, ödeme ve gizlilik hakkında sık sorulan soruları tek sayfada topladık.",
    faqLink: "Sıkça sorulan sorular",
    guides: "Yara bakımı, bası yarası, düşmeleri önleme, sonda bakımı, ilaç düzeni ve ateş takibi gibi konularda yazdırılabilir rehberlerimiz var.",
    guidesLink: "Bakım rehberleri",
    symptoms: "Vücut haritasından şikayetinizi seçin, size uygun hizmeti ve yazıları gösterelim. Rehber teşhis koymaz.",
    symptomsLink: "Belirti rehberi",
    details: "Detaylar",
    serumLink: "Serum detayı",
    article: "Bu konuda bir yazımız var: \"{title}\".",
    readArticle: "Yazıyı oku",
    hello: "Merhaba! Size nasıl yardımcı olabilirim? Hizmetler, randevu, bölgeler veya serumlar hakkında sorabilirsiniz.",
    fallback: "Bu soruyu tam anlayamadım. Ekibimiz WhatsApp'ta hemen yardımcı olabilir.",
    writeWa: "WhatsApp'a yaz",
    fallbackMsg: "Merhaba, bir sorum var: {q}",
  },
  en: {
    name: "Eternal Assistant",
    greet: "Hello, I'm the Eternal Assistant. I can answer your questions about our services, booking and IV drips.\n\nNote: I do not give medical diagnoses; in an emergency call 112.",
    placeholder: "Type your question…",
    inputLabel: "Message",
    send: "Send",
    close: "Close",
    quick: ["I'd like to book a visit", "Prices", "Which areas do you cover?", "Care for my mother", "Which IV drip suits me?"],
    redflag: "These symptoms may be an emergency. Please call 112 immediately. You can contact us afterwards as well.",
    call112: "Call 112",
    sos: "Emergency help",
    urgent: "You can reach us 24/7 for urgent situations. You can send us your location via WhatsApp.",
    call: "Call",
    price: "Fees depend on the type and length of the service. Message us on WhatsApp and we will tell you about the package that suits you.",
    packages: "Packages",
    askWa: "Ask on WhatsApp",
    priceMsg: "Hello, I would like information about prices.",
    booking: "You can fill in the online booking form in a minute; your request reaches us via WhatsApp.",
    book: "Book now",
    callback: "Request a call back",
    regions: "We cover: {regions}. Our base: {address}. We also visit hotels in Sapanca and Kartepe.",
    regionsLink: "Service areas",
    contact: "Contact",
    hours: "Our hours: {hours}, including public holidays.",
    family: "Even if you live in another city, you can book a visit for your relative. We update you after the visit.",
    familyLink: "For your family",
    prescription: "Just send a photo of your prescription via WhatsApp; our nurse will come to your home and administer it.",
    sendRx: "Send prescription",
    rxMsg: "Hello, I would like to book an appointment for the injection/drip on my prescription. I am attaching a photo of the prescription.",
    hotel: "We come to your hotel. Our website is also available in English and Arabic.",
    corporate: "We provide contracted healthcare for companies, hotels and care homes.",
    corporateLink: "Corporate",
    quiz: "Answer 3 short questions and we will suggest a suitable IV drip.",
    quizLink: "IV drip quiz",
    faq: "We have gathered frequently asked questions about booking, IV drips, tests, payment and privacy on one page.",
    faqLink: "Frequently asked questions",
    guides: "We have printable guides on wound care, pressure sores, preventing falls, catheter care, managing medicines, fever and more.",
    guidesLink: "Care guides",
    symptoms: "Choose your complaint on the body map and we will show you the right service and articles. The guide does not diagnose.",
    symptomsLink: "Symptom guide",
    details: "Details",
    serumLink: "IV drip details",
    article: "We have an article on this: \"{title}\".",
    readArticle: "Read the article",
    hello: "Hello! How can I help? You can ask about our services, booking, areas we cover or IV drips.",
    fallback: "I didn't quite understand that. Our team can help you straight away on WhatsApp.",
    writeWa: "Message on WhatsApp",
    fallbackMsg: "Hello, I have a question: {q}",
  },
  ar: {
    name: "مساعد إيترنال",
    greet: "مرحباً، أنا مساعد إيترنال. يمكنني الإجابة عن أسئلتك حول الخدمات والحجز والمحاليل الوريدية.\n\nملاحظة: لا أضع تشخيصاً طبياً؛ في الطوارئ اتصل بـ 112.",
    placeholder: "اكتب سؤالك…",
    inputLabel: "رسالة",
    send: "إرسال",
    close: "إغلاق",
    quick: ["أريد حجز موعد", "الأسعار", "ما المناطق التي تخدمونها؟", "خدمة لوالدتي", "أي محلول يناسبني؟"],
    redflag: "قد تكون هذه الأعراض حالة طارئة. يرجى الاتصال فوراً بالرقم 112، ويمكنك التواصل معنا بعد ذلك أيضاً.",
    call112: "اتصل بـ 112",
    sos: "دعم طارئ",
    urgent: "يمكنك التواصل معنا على مدار الساعة في الحالات العاجلة، ويمكنك إرسال موقعك عبر واتساب.",
    call: "اتصل",
    price: "تُحدَّد الأجرة بحسب نوع الخدمة ومدتها. راسلنا عبر واتساب لنخبرك بالباقة المناسبة لك.",
    packages: "الباقات",
    askWa: "اسأل عبر واتساب",
    priceMsg: "مرحباً، أرغب في معرفة الأسعار.",
    booking: "يمكنك تعبئة نموذج الحجز الإلكتروني خلال دقيقة، ويصلنا طلبك عبر واتساب.",
    book: "احجز موعداً",
    callback: "اطلب اتصالاً",
    regions: "مناطق خدمتنا: {regions}. مقرّنا: {address}. ونزور أيضاً الفنادق في سبانجا وكارتبه.",
    regionsLink: "مناطق الخدمة",
    contact: "اتصل بنا",
    hours: "ساعات العمل: {hours}، بما في ذلك العطلات الرسمية.",
    family: "حتى لو كنت في مدينة أخرى يمكنك حجز موعد لقريبك، ونُطلعك على ما تم بعد الزيارة.",
    familyLink: "لعائلتك",
    prescription: "يكفي أن ترسل صورة الوصفة الطبية عبر واتساب، وتأتي ممرضتنا إلى منزلك لإعطاء العلاج.",
    sendRx: "أرسل الوصفة",
    rxMsg: "مرحباً، أرغب في حجز موعد لإعطاء الحقنة/المحلول الموصوف لي. أرفق صورة الوصفة.",
    hotel: "نأتي إلى فندقك. موقعنا متوفر أيضاً باللغتين الإنجليزية والعربية.",
    corporate: "نقدّم خدمات صحية بعقود للشركات والفنادق ودور الرعاية.",
    corporateLink: "للشركات",
    quiz: "أجب عن 3 أسئلة قصيرة لنقترح عليك المحلول المناسب.",
    quizLink: "اختبار المحاليل",
    faq: "جمعنا الأسئلة الشائعة عن الحجز والمحاليل والتحاليل والدفع والخصوصية في صفحة واحدة.",
    faqLink: "الأسئلة الشائعة",
    guides: "لدينا أدلة قابلة للطباعة عن العناية بالجروح وقرح الفراش والوقاية من السقوط والعناية بالقسطرة وتنظيم الأدوية والحمّى وغيرها.",
    guidesLink: "أدلة الرعاية",
    symptoms: "اختر شكواك من خريطة الجسم لنعرض لك الخدمة والمقالات المناسبة. الدليل لا يضع تشخيصاً.",
    symptomsLink: "دليل الأعراض",
    details: "التفاصيل",
    serumLink: "تفاصيل المحلول",
    article: "لدينا مقال عن هذا الموضوع: \"{title}\".",
    readArticle: "اقرأ المقال",
    hello: "مرحباً! كيف يمكنني مساعدتك؟ يمكنك السؤال عن الخدمات أو الحجز أو المناطق أو المحاليل الوريدية.",
    fallback: "لم أفهم سؤالك تماماً. يمكن لفريقنا مساعدتك فوراً عبر واتساب.",
    writeWa: "راسلنا عبر واتساب",
    fallbackMsg: "مرحباً، لدي سؤال: {q}",
  },
};

// Lower-case, strip Latin accents and Arabic diacritics, unify Arabic letter variants.
const norm = (s) =>
  String(s)
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^a-z0-9\s+ء-ي]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const K = (...words) => words.map(norm);
// Short keywords (≤ 3 letters) must match a whole word; longer ones may match inside a word.
const has = (text, words) => {
  const padded = ` ${text} `;
  return words.some((k) => (k.length <= 3 ? padded.includes(` ${k} `) : text.includes(k)));
};

const INTENTS = {
  redflag: K(
    "bayil", "bilinc", "gogus agri", "nefes alam", "kalp kriz", "inme", "felc", "kanama durm", "zehirlen", "havale",
    "faint", "unconscious", "passed out", "chest pain", "can t breathe", "cant breathe", "cannot breathe", "heart attack", "stroke", "bleeding", "poison", "seizure",
    "اغماء", "اغمي", "مغمى", "الوعي", "الم في الصدر", "الم الصدر", "لا استطيع التنفس", "ضيق تنفس شديد", "نوبة قلبية", "جلطة", "سكتة", "نزيف", "تسمم", "تشنج"
  ),
  urgent: K("acil", "hemen gel", "simdi", "ivedi", "urgent", "emergency", "right now", "asap", "immediately", "عاجل", "طوارئ", "طارئ", "حالا", "فورا"),
  price: K("fiyat", "ucret", "kac para", "ne kadar", "tutar", "price", "prices", "cost", "how much", "fee", "fees", "pricing", "سعر", "اسعار", "السعر", "تكلفة", "كم يكلف", "بكم", "رسوم"),
  booking: K("randevu", "rezervasyon", "gelebilir mi", "ne zaman", "appointment", "book", "booking", "reserve", "schedule", "موعد", "حجز", "احجز"),
  regions: K(
    "bolge", "nerede", "adres", "sehir", "sapanca", "kartepe", "duzce", "kocaeli", "istanbul", "sakarya",
    "where", "area", "areas", "region", "location", "address", "city", "cover",
    "اين", "منطقة", "مناطق", "عنوان", "مدينة", "اسطنبول", "سكاريا", "كوجالي", "دوزجه", "سبانجا", "كارتبه"
  ),
  hours: K("saat", "acik mi", "kacta", "gece", "hafta sonu", "bayram", "hours", "open", "opening", "night", "weekend", "holiday", "ساعات", "مفتوح", "دوام", "ليلا", "الليل", "عطلة", "نهاية الاسبوع"),
  family: K(
    "anne", "baba", "yakinim", "ailem", "uzakta", "baska sehir", "dede", "nine", "babaanne", "anneanne",
    "mother", "father", "mum", "mom", "dad", "parent", "parents", "grandmother", "grandfather", "relative", "another city", "elderly",
    "امي", "ابي", "والدتي", "والدي", "جدتي", "جدي", "قريبي", "مدينة اخرى", "كبار السن", "مسن"
  ),
  prescription: K("recete", "doktor yazdi", "igne", "enjeksiyon", "prescription", "prescribed", "injection", "jab", "وصفة", "روشتة", "حقنة", "ابرة"),
  hotel: K("otel", "hotel", "turist", "tourist", "english", "arabic", "ingilizce", "arapca", "فندق", "سائح", "انجليزي", "عربي"),
  corporate: K("sirket", "kurumsal", "ofis", "fabrika", "calisan", "huzurevi", "company", "corporate", "office", "factory", "employees", "care home", "nursing home", "شركة", "مكتب", "مصنع", "موظفين", "دار رعاية"),
  quiz: K("hangi serum", "serum test", "bana uygun", "quiz", "which drip", "which iv", "suits me", "right for me", "اي محلول", "يناسبني", "اختبار"),
  faq: K("sss", "sik sorulan", "faq", "frequently asked", "الاسئلة الشائعة"),
  guides: K("rehber", "guide", "guides", "دليل", "ادلة"),
  symptoms: K("belirti", "symptom", "symptoms", "اعراض", "الاعراض"),
  hello: K("merhaba", "selam", "iyi gunler", "hello", "hi", "hey", "good morning", "مرحبا", "السلام", "اهلا", "صباح الخير", "مساء الخير"),
};

// Generic words that should not pick a service/serum/article on their own.
const STOP = new Set(K(
  "hizmeti", "hizmet", "hizmetler", "sakarya", "evde", "tedavisi", "terapi", "serum", "serumu",
  "service", "services", "home", "therapy", "drip", "drips", "treatment", "care", "with",
  "خدمة", "المنزل", "منزلي", "منزلية", "علاج", "محلول", "وريدي", "الوريدي"
));
const tokens = (s, min) => norm(s).split(" ").filter((x) => x.length > min && !STOP.has(x));
const matchAny = (t, names, min) => names.some((n) => tokens(n || "", min).some((x) => t.includes(x)));
const allLangs = (item, tr, key) => ["tr", "en", "ar"].map((l) => localize(item, tr, l, key));

const answer = (raw, L) => {
  const q = norm(raw);
  const t = (k, vars) => {
    const v = dict[L]?.[k] ?? dict.tr[k];
    return vars && typeof v === "string" ? v.replace(/\{(\w+)\}/g, (_, x) => vars[x] ?? "") : v;
  };

  if (has(q, INTENTS.redflag)) {
    return { text: t("redflag"), links: [{ label: t("call112"), href: "tel:112" }, { label: t("sos"), action: openEmergency }] };
  }
  if (has(q, INTENTS.urgent)) {
    return { text: t("urgent"), links: [{ label: t("sos"), action: openEmergency }, { label: t("call"), href: `tel:${primaryPhone.tel}` }] };
  }
  if (has(q, INTENTS.price)) {
    return { text: t("price"), links: [{ label: t("packages"), to: "/paketler" }, { label: t("askWa"), href: whatsappUrl(t("priceMsg")) }] };
  }
  if (has(q, INTENTS.booking)) {
    return { text: t("booking"), links: [{ label: t("book"), to: "/randevu" }, { label: t("callback"), to: "/randevu#geri-arama" }] };
  }
  if (has(q, INTENTS.regions)) {
    return { text: t("regions", { regions: REGION_NAMES[L], address: ADDRESS[L] }), links: [{ label: t("regionsLink"), to: "/#bolgeler" }, { label: t("contact"), to: "/contact" }] };
  }
  if (has(q, INTENTS.hours)) {
    return { text: t("hours", { hours: HOURS[L] }), links: [{ label: t("call"), href: `tel:${primaryPhone.tel}` }] };
  }
  if (has(q, INTENTS.family)) {
    return { text: t("family"), links: [{ label: t("familyLink"), to: "/aileniz-icin" }] };
  }
  if (has(q, INTENTS.prescription)) {
    return { text: t("prescription"), links: [{ label: t("sendRx"), href: whatsappUrl(t("rxMsg")) }] };
  }
  if (has(q, INTENTS.hotel)) {
    return { text: t("hotel"), links: [{ label: "English", to: "/en" }, { label: "العربية", to: "/ar" }] };
  }
  if (has(q, INTENTS.corporate)) {
    return { text: t("corporate"), links: [{ label: t("corporateLink"), to: "/kurumsal" }] };
  }
  if (has(q, INTENTS.quiz)) {
    return { text: t("quiz"), links: [{ label: t("quizLink"), to: "/serum-testi" }] };
  }
  if (has(q, INTENTS.faq)) {
    return { text: t("faq"), links: [{ label: t("faqLink"), to: "/sss" }] };
  }
  if (has(q, INTENTS.guides)) {
    return { text: t("guides"), links: [{ label: t("guidesLink"), to: "/bakim-rehberi" }] };
  }
  if (has(q, INTENTS.symptoms)) {
    return { text: t("symptoms"), links: [{ label: t("symptomsLink"), to: "/belirti-rehberi" }] };
  }

  const svc = services.find((s) => matchAny(q, allLangs(s, TR.services, "slug").flatMap((x) => [x.title, x.keyword]), 4));
  if (svc) {
    const s = localize(svc, TR.services, L, "slug");
    return { text: `${s.title}: ${s.desc}`, links: [{ label: t("details"), to: `/hizmet/${s.slug}` }, { label: t("book"), to: "/randevu" }] };
  }

  const serum = serums.find((s) => matchAny(q, allLangs(s, TR.serums, "id").map((x) => x.info), 3));
  if (serum) {
    const s = localize(serum, TR.serums, L, "id");
    return { text: L === "tr" ? `${s.info} (${s.category}): ${s.desc}.` : `${s.info}: ${s.desc}.`, links: [{ label: t("serumLink"), to: `/serumlar/${s.id}` }] };
  }

  const art = articles.find((a) => matchAny(q, allLangs(a, TR.articles, "id").map((x) => x.text), 4));
  if (art) {
    const a = localize(art, TR.articles, L, "id");
    return { text: t("article", { title: a.text }), links: [{ label: t("readArticle"), to: `/details/${a.id}` }, { label: t("symptomsLink"), to: "/belirti-rehberi" }] };
  }

  if (has(q, INTENTS.hello)) return { text: t("hello") };
  return {
    text: t("fallback"),
    links: [{ label: t("writeWa"), href: whatsappUrl(t("fallbackMsg", { q: raw })) }, { label: t("symptomsLink"), to: "/belirti-rehberi" }],
  };
};

const Assistant = ({ defaultOpen = false }) => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const [open, setOpen] = useState(defaultOpen);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  // The greeting is rendered from the dictionary so it follows language changes.
  const [msgs, setMsgs] = useState([{ from: "bot", greet: true }]);
  const bodyRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("eternal:chat", on);
    return () => {
      window.removeEventListener("eternal:chat", on);
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text) => {
    const q = text.trim();
    if (!q) return;
    // Arabic script gets an Arabic answer; otherwise answer in the site language.
    const answerLang = /[؀-ۿ]/.test(q) ? "ar" : lang;
    setInput("");
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", lang: answerLang, ...answer(q, answerLang) }]);
    }, 550);
  };

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" className={`${w.fab} ${w.fabChat}`} onClick={() => setOpen((o) => !o)}
        aria-label="Eternal Asistan" aria-expanded={open}>
        {open ? <X /> : <ChatCircleDots />}
        {!open && <span className={w.fabDot} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label="Eternal Asistan" className={`${w.sheet} ${w.sheetRight}`} dir={meta.dir}
            initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            style={{ display: "flex", flexDirection: "column" }}>
            <div className={w.sheetHead}>
              <h3><Robot style={{ color: "var(--primary)" }} aria-hidden="true" /> {t("name")}</h3>
              <button type="button" className={w.close} onClick={close} aria-label={t("close")}><X /></button>
            </div>
            <div className={w.chatBody} ref={bodyRef} aria-live="polite" style={{ flex: 1, overflowY: "auto" }}>
              {msgs.map((m, i) => (
                <motion.div key={i} className={`${w.msg} ${m.from === "bot" ? w.msgBot : w.msgUser}`}
                  dir={m.lang === "ar" ? "rtl" : undefined}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  {m.greet ? t("greet") : m.text}
                  {m.links && (
                    <div className={w.msgLinks}>
                      {m.links.map((l) =>
                        l.to ? <Link key={l.label} to={l.to} onClick={close}>{l.label}</Link>
                          : l.action ? <button key={l.label} type="button" onClick={() => { close(); l.action(); }}>{l.label}</button>
                            : <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{l.label}</a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && <div className={`${w.msg} ${w.msgBot}`}><span className={w.typing}><i /><i /><i /></span></div>}
            </div>
            {msgs.length < 3 && (
              <div className={w.quick}>
                {t("quick").map((q) => <button key={q} type="button" onClick={() => send(q)}>{q}</button>)}
              </div>
            )}
            <form className={w.chatInput} onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("placeholder")} aria-label={t("inputLabel")} />
              <button type="submit" aria-label={t("send")}>
                <PaperPlaneRight style={meta.dir === "rtl" ? { transform: "scaleX(-1)" } : undefined} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;
