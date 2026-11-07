import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Check, WhatsappLogo, Gift, Stamp, CaretDown, Clock, ChatCircleDots, ClipboardText, HouseLine,
  ArrowsClockwise, CalendarCheck, SquaresFour, Info, UserCircle, Heart,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import { Stagger, StaggerItem, SpotlightCard, Magnetic } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import Faq from "./faq";
import s from "./index.module.css";
import { packageGroups, giftPackage, translations } from "../../data/packages";
import { FEATURES } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { localize, useLang, useLocalizedItem, useT } from "../../i18n";

const dict = {
  tr: {
    badge: "Paketler",
    title: "İhtiyacınıza Uygun",
    highlight: "Bakım Paketleri",
    text: "Düzenli takipten ameliyat sonrası bakıma, ofis serum gününden otel hizmetine kadar. Fiyat ve detay için paketin altındaki butondan bize yazın.",
    seoTitle: "Evde Bakım ve Serum Paketleri",
    seoDesc: "Diyabet takibi, tansiyon takibi, yaşlı bakım, evde fizik tedavi desteği, taburcu sonrası bakım, yara ve dekubit bakımı, check-up ve serum paketleri. Sakarya ve çevresi.",
    heroWa: "Paket Önerisi İsteyin",
    heroWaText: "Merhaba, bana / yakınıma uygun bir bakım paketi hakkında bilgi almak istiyorum.",
    heroHow: "Nasıl çalışır?",
    howBadge: "Nasıl çalışır?",
    howTitle: "Paketler 4 adımda",
    howText: "Hazır bir kalıp yerine, paket içeriği ilk görüşmede ihtiyacınıza göre netleşir.",
    how: [
      { t: "Bize yazın", d: "WhatsApp'tan veya telefonla kimin için, hangi ihtiyaçla bakım istediğinizi kısaca anlatın." },
      { t: "Birlikte planlayalım", d: "Ziyaret sıklığı, süre ve içerik konuşulur; fiyat bilgisi bu aşamada size iletilir." },
      { t: "Ziyaretler başlar", d: "Doktor veya hemşiremiz belirlenen gün ve saatte adrese gelir." },
      { t: "Takip ve güncelleme", d: "İhtiyaç değiştikçe plan güncellenir; ziyaret sonrası size bilgi verilir." },
    ],
    listBadge: "Paketlerimiz",
    listTitle: "Size uygun paketi seçin",
    all: "Tümü",
    featured: "En çok tercih edilen",
    desc: "Bu paket hakkında",
    details: "Kimler için, nasıl işler?",
    hide: "Detayları gizle",
    idealFor: "Kimler için uygun?",
    howItWorks: "Nasıl işler?",
    included: "Neler dahil?",
    ask: "Bilgi Al",
    askText: "Merhaba, \"{name}\" paketi hakkında bilgi almak istiyorum.",
    noPrice: "Paketlerde sabit fiyat yayınlamıyoruz: ücret hizmetin türüne, ziyaret sıklığına ve adrese göre değişir. Size özel bilgiyi WhatsApp'tan iletiyoruz.",
    cmpBadge: "Karşılaştırma",
    cmpTitle: "Düzenli bakım mı, tek seferlik ziyaret mi?",
    cmpText: "İkisi de evinizde aynı özenle yapılır. Fark, takibin sürekliliğinde.",
    regular: "Düzenli bakım",
    oneoff: "Tek seferlik ziyaret",
    cmpRows: [
      { k: "Kimler için", a: "Kronik rahatsızlığı olan, düzenli ölçüm veya bakım ihtiyacı olanlar.", b: "Belirli bir işlem, kontrol ya da ani bir ihtiyacı olanlar." },
      { k: "Planlama", a: "Haftalık veya aylık takvim; günler önceden belirlenir.", b: "Uygun gün ve saat tek ziyaret için ayarlanır." },
      { k: "Takip", a: "Ölçümler kayıt altına alınır, değişimler zaman içinde izlenir.", b: "Ziyaret sonrası bilgilendirme yapılır; gerekirse yeni bir plan önerilir." },
      { k: "Aileye bilgi", a: "Her ziyaret sonrası düzenli bilgilendirme.", b: "Ziyaretin ardından tek seferlik bilgilendirme." },
      { k: "Örnek", a: "Diyabet takibi, tansiyon takibi, yaşlı bakım destek.", b: "Check-up, dikiş alma, tek seans serum, otel ziyareti." },
    ],
    giftBadge: "Hediye",
    giftSteps: ["Paketi siz seçin", "Yakınınızın bilgilerini iletin", "Randevuyu biz planlayalım"],
    giftBtn: "Hediye Et",
    giftText: "Merhaba, bir yakınıma sağlık paketi hediye etmek istiyorum.",
    loyaltyTitle: "Sadakat Kartı",
    loyaltyText: "Serum seanslarınızda her ziyaret kartınıza işlenir. Ayrıntılar için bize yazın.",
    faqBadge: "Sık sorulanlar",
    faqTitle: "Paketler hakkında merak edilenler",
    faq: [
      { q: "Paket fiyatları neden sitede yazmıyor?", a: "Ücret; hizmetin türüne, ziyaret sıklığına, kullanılacak malzemeye ve adresinize göre değişir. Yanlış bir beklenti oluşmaması için fiyatı ihtiyacınızı dinledikten sonra WhatsApp'tan iletiyoruz." },
      { q: "Paketin içeriğini değiştirebilir miyim?", a: "Evet. Sayfadaki içerikler örnek niteliğindedir. Ziyaret sıklığı ve yapılacak işlemler, yakınınızın durumuna ve doktorunun önerilerine göre birlikte belirlenir." },
      { q: "Paketlere başlamak için doktor raporu gerekir mi?", a: "Her paket için gerekmez. Ancak ilaç, serum veya pansuman uygulamalarında varsa reçete, epikriz ve doktor önerilerini paylaşmanız bakımın güvenle planlanmasına yardımcı olur." },
      { q: "Her ziyarete aynı ekip mi geliyor?", a: "Düzenli paketlerde mümkün olduğunca aynı ekibin gelmesine özen gösteriyoruz; böylece yakınınız ekibi tanır ve takip daha kolay olur." },
      { q: "Serum paketleri herkese uygun mu?", a: "Hayır. Serum uygulamasından önce sağlık geçmişiniz ve kullandığınız ilaçlar değerlendirilir. Uygun görülmeyen durumlarda uygulama yapılmaz; bu konuda doktorunuza da danışmanızı öneririz." },
      { q: "Paketi yarıda bırakabilir veya erteleyebilir miyim?", a: "Planınızda bir değişiklik olursa bize önceden haber vermeniz yeterli. Erteleme ve iptal koşullarını paket planlanırken sizinle netleştiriyoruz." },
      { q: "Hangi bölgelerde paket hizmeti veriyorsunuz?", a: "Sakarya başta olmak üzere Düzce, Kocaeli ve İstanbul'da hizmet veriyoruz. Adresinizi yazarsanız planlamayı buna göre yaparız." },
      { q: "Acil bir durumda paket kapsamında mı aramalıyım?", a: "Bilinç kaybı, şiddetli göğüs ağrısı, nefes darlığı veya ağır kanama gibi durumlarda vakit kaybetmeden 112'yi arayın. Paketler acil tıbbi müdahalenin yerine geçmez." },
    ],
    unsure: "Hangisinin size uygun olduğundan emin değil misiniz?",
    quiz: "Serum Testi",
    symptoms: "Belirti Rehberi",
    book: "Randevu Al",
  },
  en: {
    badge: "Packages",
    title: "Care Packages",
    highlight: "Built Around You",
    text: "From regular follow-up to post-surgery care, from an office drip day to hotel visits. For prices and details, message us using the button under each package.",
    seoTitle: "Home Care and IV Drip Packages",
    seoDesc: "Diabetes and blood pressure follow-up, elderly care, home physiotherapy support, care after discharge, wound and bedsore care, check-ups and IV drip packages in Sakarya and nearby.",
    heroWa: "Ask for a Recommendation",
    heroWaText: "Hello, I would like information about a care package suitable for me / my relative.",
    heroHow: "How it works",
    howBadge: "How it works",
    howTitle: "Packages in 4 steps",
    howText: "Rather than a fixed template, the contents are agreed in the first conversation, based on your needs.",
    how: [
      { t: "Message us", d: "On WhatsApp or by phone, tell us briefly who the care is for and what is needed." },
      { t: "We plan together", d: "We discuss frequency, duration and contents; pricing is shared with you at this stage." },
      { t: "Visits begin", d: "Our doctor or nurse arrives at the address on the agreed day and time." },
      { t: "Follow-up and updates", d: "The plan is updated as needs change, and you receive an update after each visit." },
    ],
    listBadge: "Our packages",
    listTitle: "Choose the package that suits you",
    all: "All",
    featured: "Most popular",
    desc: "About this package",
    details: "Who is it for, how does it work?",
    hide: "Hide details",
    idealFor: "Who is it for?",
    howItWorks: "How it works",
    included: "What's included",
    ask: "Ask Us",
    askText: "Hello, I would like information about the \"{name}\" package.",
    noPrice: "We do not publish fixed package prices: the cost depends on the type of service, visit frequency and address. We share personalised information on WhatsApp.",
    cmpBadge: "Comparison",
    cmpTitle: "Regular care or a one-off visit?",
    cmpText: "Both are carried out at home with the same care. The difference is how continuous the follow-up is.",
    regular: "Regular care",
    oneoff: "One-off visit",
    cmpRows: [
      { k: "Who it suits", a: "People with a long-term condition who need regular readings or care.", b: "People needing a specific procedure, a check or help with a sudden need." },
      { k: "Planning", a: "A weekly or monthly schedule with days set in advance.", b: "A convenient day and time arranged for a single visit." },
      { k: "Follow-up", a: "Readings are recorded and changes are tracked over time.", b: "An update after the visit; a new plan is suggested if needed." },
      { k: "Family updates", a: "Regular updates after every visit.", b: "A single update after the visit." },
      { k: "Examples", a: "Diabetes follow-up, blood pressure follow-up, elderly care support.", b: "Check-up, stitch removal, single drip session, hotel visit." },
    ],
    giftBadge: "Gift",
    giftSteps: ["You choose the package", "Send us your relative's details", "We arrange the appointment"],
    giftBtn: "Give as a Gift",
    giftText: "Hello, I would like to give a health package to a relative as a gift.",
    loyaltyTitle: "Loyalty Card",
    loyaltyText: "Each IV drip visit is recorded on your card. Message us for details.",
    faqBadge: "FAQ",
    faqTitle: "Questions about our packages",
    faq: [
      { q: "Why are package prices not shown on the site?", a: "The cost depends on the type of service, visit frequency, materials used and your address. To avoid false expectations, we share the price on WhatsApp after hearing what you need." },
      { q: "Can I change what a package includes?", a: "Yes. The contents on this page are examples. Visit frequency and procedures are agreed together, based on your relative's condition and their doctor's advice." },
      { q: "Do I need a doctor's report to start a package?", a: "Not for every package. For medicines, IV drips or dressings, sharing any prescription, discharge summary and doctor's advice helps us plan care safely." },
      { q: "Does the same team come to every visit?", a: "For regular packages we try to send the same team whenever possible, so your relative gets to know them and follow-up is easier." },
      { q: "Are IV drip packages suitable for everyone?", a: "No. Before a drip, your health history and current medicines are reviewed. If it is not considered suitable, it is not given; we also recommend asking your own doctor." },
      { q: "Can I pause or stop a package?", a: "Just let us know in advance if your plans change. Postponement and cancellation terms are agreed with you when the package is planned." },
      { q: "Which areas do you cover?", a: "We serve Sakarya first and foremost, as well as Düzce, Kocaeli and Istanbul. Send us your address and we will plan accordingly." },
      { q: "In an emergency, should I call under my package?", a: "In cases such as loss of consciousness, severe chest pain, difficulty breathing or heavy bleeding, call 112 immediately. Packages do not replace emergency medical care." },
    ],
    unsure: "Not sure which one suits you?",
    quiz: "Drip Quiz",
    symptoms: "Symptom Guide",
    book: "Book Now",
  },
  ar: {
    badge: "الباقات",
    title: "باقات رعاية",
    highlight: "تناسب احتياجك",
    text: "من المتابعة المنتظمة إلى الرعاية بعد العمليات، ومن يوم المحاليل في المكتب إلى خدمة الفنادق. للأسعار والتفاصيل راسلونا عبر الزر أسفل كل باقة.",
    seoTitle: "باقات الرعاية المنزلية والمحاليل الوريدية",
    seoDesc: "متابعة السكري والضغط، رعاية كبار السن، دعم العلاج الطبيعي في المنزل، الرعاية بعد الخروج من المستشفى، العناية بالجروح وقرح الفراش، الفحص الشامل وباقات المحاليل في سكاريا وما حولها.",
    heroWa: "اطلبوا اقتراح باقة",
    heroWaText: "مرحباً، أود معرفة باقة رعاية مناسبة لي / لقريبي.",
    heroHow: "كيف تعمل؟",
    howBadge: "كيف تعمل؟",
    howTitle: "الباقات في 4 خطوات",
    howText: "بدلاً من قالب جاهز، يتحدد محتوى الباقة في المحادثة الأولى حسب احتياجكم.",
    how: [
      { t: "راسلونا", d: "عبر واتساب أو الهاتف، أخبرونا باختصار لمن الرعاية وما الحاجة." },
      { t: "نخطط معاً", d: "نتفق على عدد الزيارات والمدة والمحتوى، ونبلغكم بالسعر في هذه المرحلة." },
      { t: "تبدأ الزيارات", d: "يصل طبيبنا أو الممرض إلى العنوان في اليوم والوقت المحددين." },
      { t: "متابعة وتحديث", d: "تُحدَّث الخطة كلما تغيرت الحاجة، وتصلكم المعلومات بعد كل زيارة." },
    ],
    listBadge: "باقاتنا",
    listTitle: "اختاروا الباقة المناسبة",
    all: "الكل",
    featured: "الأكثر طلباً",
    desc: "عن هذه الباقة",
    details: "لمن هي وكيف تعمل؟",
    hide: "إخفاء التفاصيل",
    idealFor: "لمن تناسب؟",
    howItWorks: "كيف تعمل؟",
    included: "ماذا تشمل؟",
    ask: "استفسر",
    askText: "مرحباً، أود الاستفسار عن باقة \"{name}\".",
    noPrice: "لا ننشر أسعاراً ثابتة للباقات: تختلف التكلفة حسب نوع الخدمة وعدد الزيارات والعنوان. نرسل لكم المعلومات الخاصة بكم عبر واتساب.",
    cmpBadge: "مقارنة",
    cmpTitle: "رعاية منتظمة أم زيارة واحدة؟",
    cmpText: "كلاهما يتم في منزلكم بالعناية نفسها. الفرق في استمرارية المتابعة.",
    regular: "رعاية منتظمة",
    oneoff: "زيارة واحدة",
    cmpRows: [
      { k: "لمن تناسب", a: "لأصحاب الأمراض المزمنة ومن يحتاجون قياسات أو رعاية منتظمة.", b: "لمن يحتاج إجراءً محدداً أو فحصاً أو حاجة مفاجئة." },
      { k: "التخطيط", a: "جدول أسبوعي أو شهري تُحدَّد أيامه مسبقاً.", b: "يُحدَّد يوم ووقت مناسبان لزيارة واحدة." },
      { k: "المتابعة", a: "تُسجَّل القياسات وتُتابَع التغيرات مع الوقت.", b: "معلومات بعد الزيارة، مع اقتراح خطة جديدة عند الحاجة." },
      { k: "إبلاغ العائلة", a: "إبلاغ منتظم بعد كل زيارة.", b: "إبلاغ واحد بعد الزيارة." },
      { k: "أمثلة", a: "متابعة السكري، متابعة الضغط، دعم رعاية كبار السن.", b: "فحص شامل، فك الغرز، جلسة محلول واحدة، زيارة فندقية." },
    ],
    giftBadge: "هدية",
    giftSteps: ["اختاروا الباقة", "أرسلوا بيانات قريبكم", "ننسق نحن الموعد"],
    giftBtn: "أهدِ الآن",
    giftText: "مرحباً، أود إهداء باقة صحية لأحد أقاربي.",
    loyaltyTitle: "بطاقة الولاء",
    loyaltyText: "تُسجَّل كل جلسة محلول على بطاقتكم. راسلونا للتفاصيل.",
    faqBadge: "أسئلة شائعة",
    faqTitle: "أسئلة حول الباقات",
    faq: [
      { q: "لماذا لا تظهر أسعار الباقات على الموقع؟", a: "تختلف التكلفة حسب نوع الخدمة وعدد الزيارات والمستلزمات وعنوانكم. لتجنب أي توقعات غير دقيقة، نرسل السعر عبر واتساب بعد معرفة احتياجكم." },
      { q: "هل يمكنني تعديل محتوى الباقة؟", a: "نعم. المحتوى في هذه الصفحة أمثلة فقط. يُحدَّد عدد الزيارات والإجراءات معاً حسب حالة قريبكم وتوصيات طبيبه." },
      { q: "هل أحتاج إلى تقرير طبي لبدء الباقة؟", a: "ليس لكل الباقات. لكن عند إعطاء الأدوية أو المحاليل أو الضمادات، فإن مشاركة الوصفة وتقرير الخروج وتوصيات الطبيب تساعد على تخطيط الرعاية بأمان." },
      { q: "هل يأتي الفريق نفسه في كل زيارة؟", a: "في الباقات المنتظمة نحرص قدر الإمكان على إرسال الفريق نفسه، ليتعرف عليه قريبكم وتسهل المتابعة." },
      { q: "هل باقات المحاليل مناسبة للجميع؟", a: "لا. قبل المحلول يُراجَع تاريخكم الصحي والأدوية التي تتناولونها. إذا لم يكن مناسباً فلا يُعطى، وننصح أيضاً باستشارة طبيبكم." },
      { q: "هل يمكنني إيقاف الباقة أو تأجيلها؟", a: "يكفي إبلاغنا مسبقاً بأي تغيير. نتفق معكم على شروط التأجيل والإلغاء عند تخطيط الباقة." },
      { q: "ما المناطق التي تخدمونها؟", a: "نخدم سكاريا بالدرجة الأولى، إضافة إلى دوزجه وكوجالي وإسطنبول. أرسلوا عنوانكم وسنخطط وفقاً له." },
      { q: "في حالة الطوارئ، هل أتصل بكم ضمن الباقة؟", a: "في حالات مثل فقدان الوعي أو ألم الصدر الشديد أو ضيق التنفس أو النزيف الشديد اتصلوا فوراً بالرقم 112. الباقات لا تحل محل الرعاية الطبية الطارئة." },
    ],
    unsure: "لستم متأكدين أي باقة تناسبكم؟",
    quiz: "اختبار المحاليل",
    symptoms: "دليل الأعراض",
    book: "احجز موعداً",
  },
};

const HOW_ICONS = [ChatCircleDots, ClipboardText, HouseLine, ArrowsClockwise];
const HOW_TONES = ["teal", "blue", "amber", "green"];

const PackageCard = ({ p, groupTitle, t }) => {
  const [open, setOpen] = useState(false);
  const Icon = p.icon;
  const id = `pk-${p.id}`;
  return (
    <TiltCard className={`${ui.card} ${ui.glowBorder} ${p.featured ? ui.featured : ""}`} style={{ height: "100%" }} max={5}>
      <div className={s.cardInner}>
        {p.featured && <span className={ui.ribbon}>{t("featured")}</span>}
        <div><Icon3D icon={<Icon />} tone={p.tone} size={58} /></div>
        <span className={s.groupTag}>{groupTitle}</span>
        <h3>{p.name}</h3>
        <span className={s.period}><Clock /> {p.period}</span>
        <p style={{ marginTop: 12 }}>{p.desc}</p>
        <ul aria-label={t("included")}>
          {p.features.map((f) => <li key={f}><Check weight="bold" /> {f}</li>)}
        </ul>
        <button type="button" className={`${s.more} ${open ? s.moreOpen : ""}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          {open ? t("hide") : t("details")} <CaretDown weight="bold" />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={id} className={s.details} key="d"
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <div className={s.detailsBody}>
                <div>
                  <h4>{t("idealFor")}</h4>
                  <div className={s.ideal}>{p.idealFor.map((x) => <span key={x}>{x}</span>)}</div>
                </div>
                <div>
                  <h4>{t("howItWorks")}</h4>
                  <ol className={s.flow}>{p.howItWorks.map((x) => <li key={x}>{x}</li>)}</ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={s.spacer} />
        <a href={whatsappUrl(t("askText", { name: p.name }))} target="_blank" rel="noopener noreferrer"
          className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} style={{ marginTop: 20 }}>
          <WhatsappLogo /> {t("ask")}
        </a>
      </div>
    </TiltCard>
  );
};

const Packages = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const { hash } = useLocation();
  const [filter, setFilter] = useState("all");
  // /paketler#duzenli (used by the home page) opens the matching tab.
  useEffect(() => {
    const id = decodeURIComponent(hash.replace("#", ""));
    if (packageGroups.some((g) => g.id === id)) setFilter(id);
  }, [hash]);
  const gift = useLocalizedItem(giftPackage, translations, "id");

  const groups = useMemo(
    () => packageGroups.map((g) => {
      const lg = localize(g, translations, lang, "id");
      return { ...lg, items: g.items.map((it) => localize(it, translations, lang, "id")) };
    }),
    [lang]
  );
  const visible = groups
    .filter((g) => filter === "all" || g.id === filter)
    .flatMap((g) => g.items.map((p) => ({ p, groupTitle: g.title })));
  const tabs = [{ id: "all", title: t("all") }, ...groups.map((g) => ({ id: g.id, title: g.title }))];
  const GiftIcon = gift.icon;

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/paketler">
        <div className={ui.btnRow}>
          <Magnetic>
            <a href={whatsappUrl(t("heroWaText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
              <WhatsappLogo /> {t("heroWa")}
            </a>
          </Magnetic>
          <a href="#nasil-calisir" className={`${ui.btn} ${ui.btnGhost}`}>{t("heroHow")}</a>
        </div>
      </PageHero>

      <Wrapper>
        <section id="nasil-calisir" className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("howBadge")}</span>
              <h2>{t("howTitle")}</h2>
              <p>{t("howText")}</p>
            </div>
          </ScrollReveal>
          <Stagger className={ui.grid}>
            {t("how").map((step, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <StaggerItem key={step.t}>
                  <SpotlightCard className={ui.card} style={{ height: "100%" }}>
                    <span className={s.stepNo}>0{i + 1}</span>
                    <div style={{ marginTop: 10 }}><Icon3D icon={<Icon />} tone={HOW_TONES[i]} size={54} /></div>
                    <h3>{step.t}</h3>
                    <p>{step.d}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        <section id="paketler" className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("listBadge")}</span>
              <h2>{t("listTitle")}</h2>
            </div>
          </ScrollReveal>
          {packageGroups.map((g) => <span key={g.id} id={g.id} style={{ display: "block", position: "relative", top: -110 }} aria-hidden="true" />)}
          <LayoutGroup>
            <div className={s.tabs} role="tablist" aria-label={t("listTitle")}>
              {tabs.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button key={tab.id} type="button" role="tab" aria-selected={active}
                    className={`${s.tab} ${active ? s.tabActive : ""}`} onClick={() => setFilter(tab.id)}>
                    {active && <motion.span layoutId="pkTab" className={s.tabPill} transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className={s.tabLabel}>{tab.id === "all" && <SquaresFour />}{tab.title}</span>
                  </button>
                );
              })}
            </div>
            <motion.div layout className={ui.grid} role="tabpanel">
              <AnimatePresence mode="popLayout">
                {visible.map(({ p, groupTitle }, i) => (
                  <motion.div key={p.id} id={p.id} layout
                    initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}>
                    <PackageCard p={p} groupTitle={groupTitle} t={t} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
          <div className={`${ui.note} ${s.noteRow}`}>
            <Info /> <span>{t("noPrice")}</span>
          </div>
        </section>

        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("cmpBadge")}</span>
              <h2>{t("cmpTitle")}</h2>
              <p>{t("cmpText")}</p>
            </div>
          </ScrollReveal>
          <div className={s.compare}>
            {[["a", t("regular"), CalendarCheck, "teal"], ["b", t("oneoff"), UserCircle, "amber"]].map(([k, title, Icon, tone], ci) => (
              <ScrollReveal key={k} direction={ci === 0 ? "right" : "left"} delay={ci * 0.1}>
                <SpotlightCard className={`${ui.card} ${s.compareCol} ${ci === 0 ? ui.featured : ""}`} style={{ height: "100%" }}>
                  <h3><Icon3D icon={<Icon />} tone={tone} size={46} /> {title}</h3>
                  {t("cmpRows").map((r) => (
                    <div key={r.k} className={s.compareRow}>
                      <strong>{r.k}</strong>
                      <span>{r[k]}</span>
                    </div>
                  ))}
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ScrollReveal>
          <section className={ui.sectionTight}>
            <div className={`${ui.card} ${ui.glowBorder} ${s.gift}`}>
              <Icon3D icon={<GiftIcon />} tone="rose" size={84} float />
              <div className={s.giftBody}>
                <span className={ui.badge}>{t("giftBadge")}</span>
                <h2 style={{ marginTop: 12 }}>{gift.name}</h2>
                <p>{gift.desc}</p>
                <ol className={s.giftSteps}>
                  {t("giftSteps").map((x, i) => <li key={x}>{i === 0 ? <Gift /> : i === 1 ? <Heart /> : <CalendarCheck />} {x}</li>)}
                </ol>
              </div>
              <Magnetic>
                <a href={whatsappUrl(t("giftText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
                  <WhatsappLogo /> {t("giftBtn")}
                </a>
              </Magnetic>
            </div>
          </section>
        </ScrollReveal>

        {FEATURES.loyaltyCard && (
          <ScrollReveal>
            <section className={ui.sectionTight}>
              <div className={ui.card} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <Icon3D icon={<Stamp />} tone="amber" size={70} />
                <div style={{ flex: "1 1 320px" }}>
                  <h3 style={{ marginTop: 0 }}>{t("loyaltyTitle")}</h3>
                  <p>{t("loyaltyText")}</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("faqBadge")}</span>
              <h2>{t("faqTitle")}</h2>
            </div>
          </ScrollReveal>
          <Faq items={t("faq")} />
        </section>

        <section className={`${ui.sectionTight} ${ui.center}`} style={{ paddingBottom: 80 }}>
          <p className={ui.muted}>{t("unsure")}</p>
          <div className={ui.btnRow}>
            <Link to="/serum-testi" className={`${ui.btn} ${ui.btnGhost}`}>{t("quiz")}</Link>
            <Link to="/belirti-rehberi" className={`${ui.btn} ${ui.btnGhost}`}>{t("symptoms")}</Link>
            <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}>{t("book")}</Link>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default Packages;
