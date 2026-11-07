import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, CalendarCheck, Check, Clock, HouseLine, Phone, ShieldCheck, Siren, Sparkle, UsersThree, WhatsappLogo, Medal,
  Question, CursorClick,
} from "@phosphor-icons/react";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Wrapper from "../../components/UI/wrapper";
import { Stagger, StaggerItem, SpotlightCard, CountUp, Magnetic } from "../../components/motion";
import { HowItWorks, ServiceAreas } from "../../components/homesections";
import { services, translations } from "../../data/services";
import { faqs } from "../../data/faq";
import { FaqList, faqJsonLd } from "../faq";
import { SITE, primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT, useLang, useLocalized } from "../../i18n";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";

const CAT_OF = {
  "evde-doktor": "care", "evde-hemsire": "care", "evde-hasta-bakici": "care", "yara-bakimi": "care",
  "evde-tahlil": "lab", "evde-check-up": "lab",
  "evde-serum": "wellness", "evde-geleneksel-tip": "wellness",
  "ozel-ambulans": "transport",
};
const CATS = ["all", "care", "lab", "wellness", "transport"];
const FAQ_IDS = ["neden-evde", "bolgeler", "ziyaret-sureci", "ziyaret-hazirlik", "ayni-gun", "otel-ofis", "ucret", "ne-zaman-112"];

const dict = {
  tr: {
    seoTitle: "Hizmetlerimiz – Evde Doktor, Hemşire, Serum, Tahlil",
    seoDesc: "Sakarya, Düzce, Kocaeli ve İstanbul'da evde doktor, evde hemşire, IV serum, evde tahlil, check-up, yara bakımı, hasta bakıcı, geleneksel tıp ve özel ambulans hizmetleri.",
    badge: "Profesyonel Sağlık",
    title: "Sağlığı",
    highlight: "eve getiriyoruz",
    text: "9 farklı hizmet kategorisinde, evinizin, otelinizin ya da iş yerinizin konforunda sağlık hizmeti sunuyoruz. Size uygun hizmeti seçin, gerisini birlikte planlayalım.",
    call: "Hemen Ara",
    book: "Randevu Al",
    stats: ["Yıllık deneyim", "Hasta memnuniyeti", "Evde ziyaret", "Hasta"],
    whyBadge: "Neden ETERNAL?",
    whyTitle: "Evde sağlıkta",
    whyAccent: "güvenilir adres",
    why: [
      { t: "15+ yıllık deneyim", d: "Evde sağlık alanında 15 yılı aşkın deneyimle çalışıyoruz." },
      { t: "%98 memnuniyet", d: "Hastalarımızın memnuniyeti en önemli önceliğimiz." },
      { t: "7 gün / 24 saat", d: "Gece ya da gündüz, telefon ve WhatsApp üzerinden bize ulaşabilirsiniz." },
      { t: "Evinizin konforu", d: "Yol, bekleme ve kalabalık olmadan, tanıdık ortamınızda bakım." },
    ],
    servicesBadge: "Hizmetler",
    servicesTitle: "Tüm",
    servicesAccent: "hizmetlerimiz",
    servicesLead: "Bir kategori seçin veya doğrudan bir hizmete tıklayarak ayrıntıları, süreci ve sık sorulan soruları görün.",
    filterLabel: "Hizmet kategorisi",
    cats: { all: "Tümü", care: "Muayene & Bakım", lab: "Tahlil & Tarama", wellness: "Serum & Tamamlayıcı", transport: "Hasta Nakli" },
    details: "Detaylar",
    pickBadge: "Karar rehberi",
    pickTitle: "Hangi hizmete",
    pickAccent: "ihtiyacım var?",
    pickLead: "Durumunuza en yakın ifadeyi seçin; size uygun hizmeti gösterelim. Emin değilseniz bizi arayın, birlikte karar verelim.",
    pickHint: "Durumunuzu seçin",
    pickIncludes: "Öne çıkanlar",
    pickGo: "Hizmeti incele",
    pickNote: "Bu rehber yalnızca yön göstermek içindir; doğru hizmeti telefonda birlikte netleştirebiliriz.",
    emergencyTitle: "Hayati tehlike mi var?",
    emergency: "Bilinç kaybı, şiddetli göğüs ağrısı, ani nefes darlığı, felç belirtileri veya ağır kanama durumunda beklemeden 112'yi arayın.",
    call112: "112'yi Ara",
    faqBadge: "SSS",
    faqTitle: "Sıkça sorulan",
    faqAccent: "sorular",
    allFaq: "Tüm soruları gör",
    ctaTitle: "Size en uygun hizmeti birlikte seçelim",
    ctaText: "İhtiyacınızı anlatın; doğru ekibi ve uygun zamanı planlayalım. {hours} ulaşabilirsiniz.",
    hours: "7 gün / 24 saat",
    waMsg: "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
    listName: "ETERNAL Sağlık Hizmetleri – Hizmetler",
  },
  en: {
    seoTitle: "Our Services – Home Doctor, Nurse, IV Drips, Lab Tests",
    seoDesc: "Home doctor, home nursing, IV drips, home lab tests, check-ups, wound care, caregivers, traditional medicine and private ambulance in Sakarya, Düzce, Kocaeli and Istanbul.",
    badge: "Professional care",
    title: "Bringing healthcare",
    highlight: "to your home",
    text: "We offer 9 service categories in the comfort of your home, hotel or workplace. Choose the service that fits, and we will plan the rest together.",
    call: "Call now",
    book: "Book Now",
    stats: ["Years of experience", "Patient satisfaction", "Home visits", "Patients"],
    whyBadge: "Why ETERNAL?",
    whyTitle: "A trusted name in",
    whyAccent: "home healthcare",
    why: [
      { t: "15+ years of experience", d: "We have worked in home healthcare for more than 15 years." },
      { t: "98% satisfaction", d: "Our patients' satisfaction is our top priority." },
      { t: "7 days / 24 hours", d: "Day or night, you can reach us by phone and WhatsApp." },
      { t: "Comfort of home", d: "Care in familiar surroundings, without travel, waiting or crowds." },
    ],
    servicesBadge: "Services",
    servicesTitle: "All our",
    servicesAccent: "services",
    servicesLead: "Pick a category or click a service to see the details, the process and common questions.",
    filterLabel: "Service category",
    cats: { all: "All", care: "Examination & care", lab: "Tests & screening", wellness: "Drips & complementary", transport: "Patient transport" },
    details: "Details",
    pickBadge: "Decision guide",
    pickTitle: "Which service",
    pickAccent: "do I need?",
    pickLead: "Choose the statement closest to your situation and we will show the matching service. If you are unsure, call us and we will decide together.",
    pickHint: "Choose your situation",
    pickIncludes: "Highlights",
    pickGo: "View service",
    pickNote: "This guide is only a pointer; we can confirm the right service with you by phone.",
    emergencyTitle: "Is life at risk?",
    emergency: "For loss of consciousness, severe chest pain, sudden breathlessness, signs of stroke or heavy bleeding, call 112 without waiting.",
    call112: "Call 112",
    faqBadge: "FAQ",
    faqTitle: "Frequently asked",
    faqAccent: "questions",
    allFaq: "See all questions",
    ctaTitle: "Let's choose the right service together",
    ctaText: "Tell us what you need and we will plan the right team and a suitable time. You can reach us {hours}.",
    hours: "7 days a week, 24 hours a day",
    waMsg: "Hello, I would like information about your services.",
    listName: "ETERNAL Health Services – Services",
  },
  ar: {
    seoTitle: "خدماتنا – طبيب منزلي، تمريض، محاليل، تحاليل",
    seoDesc: "طبيب منزلي وتمريض منزلي ومحاليل وريدية وتحاليل منزلية وفحص شامل وعناية بالجروح ومرافقة المرضى والطب التقليدي والإسعاف الخاص في سكاريا ودوزجة وكوجالي وإسطنبول.",
    badge: "رعاية احترافية",
    title: "نحمل الرعاية الصحية",
    highlight: "إلى منزلك",
    text: "نقدّم 9 فئات من الخدمات في راحة منزلك أو فندقك أو مكان عملك. اختر الخدمة المناسبة، ولنخطط معًا لما تبقّى.",
    call: "اتصل الآن",
    book: "احجز موعدًا",
    stats: ["سنوات من الخبرة", "رضا المرضى", "زيارة منزلية", "مريض"],
    whyBadge: "لماذا إترنال؟",
    whyTitle: "عنوان موثوق",
    whyAccent: "للرعاية المنزلية",
    why: [
      { t: "أكثر من 15 عامًا من الخبرة", d: "نعمل في مجال الرعاية الصحية المنزلية منذ أكثر من 15 عامًا." },
      { t: "رضا بنسبة 98%", d: "رضا مرضانا هو أولويتنا الأولى." },
      { t: "7 أيام / 24 ساعة", d: "ليلًا أو نهارًا، يمكنك التواصل معنا هاتفيًا أو عبر واتساب." },
      { t: "راحة المنزل", d: "رعاية في بيئتك المألوفة دون عناء الطريق أو الانتظار أو الازدحام." },
    ],
    servicesBadge: "الخدمات",
    servicesTitle: "جميع",
    servicesAccent: "خدماتنا",
    servicesLead: "اختر فئة أو اضغط على خدمة لرؤية التفاصيل والخطوات والأسئلة الشائعة.",
    filterLabel: "فئة الخدمة",
    cats: { all: "الكل", care: "الفحص والرعاية", lab: "التحاليل والفحص", wellness: "المحاليل والطب التكميلي", transport: "نقل المرضى" },
    details: "التفاصيل",
    pickBadge: "دليل الاختيار",
    pickTitle: "ما الخدمة",
    pickAccent: "التي أحتاجها؟",
    pickLead: "اختر العبارة الأقرب إلى حالتك وسنعرض لك الخدمة المناسبة. وإن لم تكن متأكدًا فاتصل بنا لنقرر معًا.",
    pickHint: "اختر حالتك",
    pickIncludes: "أبرز ما تشمله",
    pickGo: "عرض الخدمة",
    pickNote: "هذا الدليل للتوجيه فقط، ويمكننا تحديد الخدمة المناسبة معك هاتفيًا.",
    emergencyTitle: "هل الحياة في خطر؟",
    emergency: "عند فقدان الوعي أو ألم الصدر الشديد أو ضيق التنفس المفاجئ أو علامات السكتة الدماغية أو النزيف الشديد، اتصل بالرقم 112 دون انتظار.",
    call112: "اتصل بـ 112",
    faqBadge: "الأسئلة الشائعة",
    faqTitle: "الأسئلة",
    faqAccent: "الشائعة",
    allFaq: "عرض كل الأسئلة",
    ctaTitle: "لنختر معًا الخدمة الأنسب لك",
    ctaText: "أخبرنا باحتياجك وسنخطط للفريق المناسب والوقت الملائم. يمكنك التواصل معنا {hours}.",
    hours: "7 أيام في الأسبوع و24 ساعة في اليوم",
    waMsg: "مرحبًا، أودّ الحصول على معلومات عن خدماتكم.",
    listName: "إترنال للخدمات الصحية – الخدمات",
  },
};

const WHY_ICONS = [Medal, ShieldCheck, Clock, HouseLine];
const WHY_TONES = ["amber", "teal", "blue", "green"];
const STATS = [
  { to: 15, suffix: "+" },
  { to: 98, pct: true },
  { to: 937, suffix: "+" },
  { to: 10348, suffix: "+" },
];

const Heading = ({ badge, title, accent, lead }) => (
  <ScrollReveal>
    <div className={ui.sectionHead}>
      <span className={ui.badge}>{badge}</span>
      <h2>{title} <span className="accent">{accent}</span></h2>
      {lead && <p>{lead}</p>}
    </div>
  </ScrollReveal>
);

const Kifoz = () => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const list = useLocalized(services, translations, "slug");
  const [cat, setCat] = useState("all");
  const [pick, setPick] = useState(services[0].slug);
  const cats = t("cats");
  const shown = cat === "all" ? list : list.filter((s) => CAT_OF[s.slug] === cat);
  const picked = list.find((s) => s.slug === pick) || list[0];
  const PickedIcon = picked.icon;
  const faqItems = useMemo(() => {
    const byId = faqs.filter((f) => FAQ_IDS.includes(f.id));
    return byId.length ? byId : faqs.slice(0, 6);
  }, []);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t("listName"),
      inLanguage: lang,
      itemListElement: list.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}/hizmet/${s.slug}`,
        name: s.title,
      })),
    },
    faqJsonLd(faqItems, lang),
  ];

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        text={t("text")}
        seoTitle={t("seoTitle")}
        seoDesc={t("seoDesc")}
        path="/hizmetlerimiz"
        jsonLd={jsonLd}
      >
        <div className={ui.btnRow}>
          <Magnetic>
            <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnPrimary}`}><Phone /> {t("call")}</a>
          </Magnetic>
          <Link to="/randevu" className={`${ui.btn} ${ui.btnGhost}`}><CalendarCheck /> {t("book")}</Link>
          <a href={whatsappUrl(t("waMsg"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}><WhatsappLogo /> WhatsApp</a>
        </div>
        <Stagger className={styles.stats} gap={0.1}>
          {STATS.map((st, i) => (
            <StaggerItem key={i} className={styles.stat} y={16}>
              <strong><CountUp to={st.to} prefix={st.pct && lang === "tr" ? "%" : ""} suffix={st.pct ? (lang === "tr" ? "" : "%") : st.suffix} locale={meta.locale} /></strong>
              <span>{t("stats")[i]}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </PageHero>

      <Wrapper>
        {/* Why us */}
        <section className={ui.section}>
          <Heading badge={t("whyBadge")} title={t("whyTitle")} accent={t("whyAccent")} />
          <Stagger className={styles.whyGrid}>
            {t("why").map((w, i) => {
              const WIcon = WHY_ICONS[i];
              return (
                <StaggerItem key={w.t}>
                  <SpotlightCard className={`${ui.card} ${styles.whyCard}`}>
                    <Icon3D icon={<WIcon />} tone={WHY_TONES[i]} size={54} />
                    <h3>{w.t}</h3>
                    <p>{w.d}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        {/* All services */}
        <section className={ui.sectionTight} id="tum-hizmetler">
          <Heading badge={t("servicesBadge")} title={t("servicesTitle")} accent={t("servicesAccent")} lead={t("servicesLead")} />
          <div className={`${ui.chips} ${styles.filters}`} role="group" aria-label={t("filterLabel")}>
            {CATS.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={`${ui.chip} ${cat === c ? ui.chipActive : ""}`}>
                {cats[c]}
                <span className={styles.count}>{c === "all" ? services.length : services.filter((s) => CAT_OF[s.slug] === c).length}</span>
              </button>
            ))}
          </div>
          <motion.div layout className={styles.servicesGrid}>
            <AnimatePresence mode="popLayout">
              {shown.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.slug} layout initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}>
                    <TiltCard className={`${ui.card} ${ui.glowBorder} ${styles.serviceCard}`}>
                      <Link to={`/hizmet/${s.slug}`} className={styles.cardLink}>
                        <div className={styles.cardHead}>
                          <Icon3D icon={<Icon />} tone={s.tone} size={58} />
                          <span className={styles.cardNum}>{String(services.findIndex((x) => x.slug === s.slug) + 1).padStart(2, "0")}</span>
                        </div>
                        <span className={styles.cardCat}>{cats[CAT_OF[s.slug]]}</span>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <ul className={styles.cardList}>
                          {s.includes.slice(0, 3).map((x) => <li key={x}><Check weight="bold" /> {x}</li>)}
                        </ul>
                        <span className={styles.more}>{t("details")} <ArrowRight /></span>
                      </Link>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Which service do I need? */}
        <section className={ui.section}>
          <Heading badge={t("pickBadge")} title={t("pickTitle")} accent={t("pickAccent")} lead={t("pickLead")} />
          <div className={styles.picker}>
            <div className={styles.pickList} role="radiogroup" aria-label={t("pickHint")}>
              <p className={styles.pickHint}><CursorClick weight="duotone" /> {t("pickHint")}</p>
              {list.map((s) => (
                <button key={s.slug} type="button" role="radio" aria-checked={pick === s.slug} onClick={() => setPick(s.slug)}
                  className={`${styles.pickItem} ${pick === s.slug ? styles.pickOn : ""}`}>
                  {pick === s.slug && <motion.span layoutId="pickGlow" className={styles.pickGlow} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <Question weight="duotone" className={styles.pickQ} />
                  <span>{s.need}</span>
                </button>
              ))}
            </div>
            <div className={styles.pickPanelWrap}>
              <AnimatePresence mode="wait">
                <motion.div key={picked.slug + lang} className={`${ui.card} ${ui.glass} ${styles.pickPanel}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={styles.pickTop}>
                    <Icon3D icon={<PickedIcon />} tone={picked.tone} size={72} float />
                    <div>
                      <span className={styles.cardCat}>{cats[CAT_OF[picked.slug]]}</span>
                      <h3>{picked.title}</h3>
                    </div>
                  </div>
                  <p>{picked.intro}</p>
                  <h4>{t("pickIncludes")}</h4>
                  <ul>
                    {picked.includes.slice(0, 4).map((x) => <li key={x}><Check /> {x}</li>)}
                  </ul>
                  <p className={styles.pickDuration}><Clock weight="duotone" /> {picked.duration}</p>
                  <div className={styles.pickActions}>
                    <Link to={`/hizmet/${picked.slug}`} className={`${ui.btn} ${ui.btnPrimary}`}>{t("pickGo")} <ArrowRight /></Link>
                    <Link to="/randevu" state={{ service: services.find((x) => x.slug === picked.slug).title }} className={`${ui.btn} ${ui.btnGhost}`}>
                      <CalendarCheck /> {t("book")}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className={ui.hint}><Sparkle weight="fill" /> {t("pickNote")}</p>
              <div className={`${ui.note} ${ui.noteDanger}`} role="note">
                <Siren weight="duotone" />
                <div>
                  <strong>{t("emergencyTitle")}</strong> {t("emergency")}{" "}
                  <a href="tel:112" className={styles.link112}>{t("call112")}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How a visit works + regions (shared with the home page) */}
        <HowItWorks />
        <ServiceAreas />

        {/* FAQ */}
        <section className={ui.section}>
          <Heading badge={t("faqBadge")} title={t("faqTitle")} accent={t("faqAccent")} />
          <FaqList items={faqItems} />
          <div className={ui.btnRow}>
            <Link to="/sss" className={`${ui.btn} ${ui.btnGhost}`}>{t("allFaq")} <ArrowRight /></Link>
          </div>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <section className={styles.cta}>
            <UsersThree weight="duotone" className={styles.ctaIcon} />
            <h2>{t("ctaTitle")}</h2>
            <p>{t("ctaText", { hours: t("hours") })}</p>
            <div className={ui.btnRow}>
              <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}><CalendarCheck /> {t("book")}</Link>
              <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}><Phone /> <span dir="ltr">{primaryPhone.display}</span></a>
              <a href={whatsappUrl(t("waMsg"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}><WhatsappLogo /> WhatsApp</a>
            </div>
          </section>
        </ScrollReveal>
      </Wrapper>
    </>
  );
};

export default Kifoz;
