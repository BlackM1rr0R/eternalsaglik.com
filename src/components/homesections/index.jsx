import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Phone, Stethoscope, Heartbeat, ClipboardText, UsersThree, Bandaids, FlowerLotus, GlobeHemisphereWest,
  Buildings, MapPin, MagicWand, Clock, HouseLine, CalendarCheck, Check,
} from "@phosphor-icons/react";
import ScrollReveal from "../scrollreveal";
import Icon3D from "../icon3d";
import TiltCard from "../tiltcard";
import { Stagger, StaggerItem, SpotlightCard, CountUp, Magnetic } from "../motion";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { services, translations } from "../../data/services";
import { SITE, primaryPhone } from "../../config/site";
import { useT, useLang, useLocalized } from "../../i18n";

const dict = {
  tr: {
    svcBadge: "hizmet",
    svcTitle: "Evinize gelen",
    svcAccent: "sağlık",
    svcLead: "Bir hizmet seçin; ayrıntıları, kimler için uygun olduğunu, ziyaretin nasıl geçtiğini ve ilgili yazıları görün.",
    details: "Detaylar",
    allServices: "Tüm hizmetleri incele",
    audBadge: "Size özel",
    audTitle: "Kim için hizmet",
    audAccent: "arıyorsunuz?",
    audiences: [
      { t: "Anne babam için", d: "Uzaktan planlayın, biz yanında olalım" },
      { t: "Ameliyat sonrası", d: "Yara bakımı, pansuman, takip" },
      { t: "Kronik hastalık", d: "Diyabet, tansiyon, kalp takibi" },
      { t: "Serum & wellness", d: "Enerji, bağışıklık, güzellik" },
      { t: "Otel misafirleri", d: "English · العربية" },
      { t: "Kurumlar", d: "Otel, fabrika, ofis, huzurevi" },
    ],
    symptoms: "Belirti Rehberi",
    quiz: "Hangi serum bana uygun?",
    howBadge: "Nasıl çalışır?",
    howTitle: "4 adımda",
    howAccent: "evde sağlık",
    howLead: "İlk mesajınızdan takip ziyaretine kadar her adımda yanınızdayız.",
    steps: [
      { t: "Bize ulaşın", d: "Arayın, WhatsApp'tan yazın veya online randevu formunu doldurun." },
      { t: "Planlayalım", d: "İhtiyacınızı dinleyip uygun ekibi ve saati belirleyelim." },
      { t: "Ekibimiz gelir", d: "Doktor veya hemşiremiz evinize, otelinize ya da ofisinize gelir." },
      { t: "Takipte kalalım", d: "Tedavi ve kontroller planlanır; gerekirse ailenize bilgi verilir." },
    ],
    bookOnline: "Online Randevu Al",
    areaBadge: "Hizmet Bölgelerimiz",
    areaTitle: "Nerelere",
    areaAccent: "geliyoruz?",
    areaLead: "Merkezimiz {address}. {regions} ve çevresindeki ev, otel ve iş yerlerine hizmet veriyoruz.",
    areaLabel: "Bölge seçin",
    areas: { sakarya: "Sakarya", duzce: "Düzce", kocaeli: "Kocaeli", istanbul: "İstanbul", sapanca: "Sapanca / Kartepe" },
    mapTitle: "{area} hizmet bölgesi haritası",
    regionList: ["Sakarya", "Düzce", "Kocaeli", "İstanbul"],
    provinces: "il",
    hours: "7 gün / 24 saat",
    center: "Merkez",
  },
  en: {
    svcBadge: "services",
    svcTitle: "Healthcare that",
    svcAccent: "comes to you",
    svcLead: "Pick a service to see the details, who it suits, how a visit works and related reading.",
    details: "Details",
    allServices: "Explore all services",
    audBadge: "For you",
    audTitle: "Who are you",
    audAccent: "looking for care for?",
    audiences: [
      { t: "My parents", d: "Plan from afar — we'll be by their side" },
      { t: "After surgery", d: "Wound care, dressings, follow-up" },
      { t: "Chronic conditions", d: "Diabetes, blood pressure, heart follow-up" },
      { t: "IV drips & wellness", d: "Energy, immunity, beauty" },
      { t: "Hotel guests", d: "English · العربية" },
      { t: "Organisations", d: "Hotels, factories, offices, care homes" },
    ],
    symptoms: "Symptom Guide",
    quiz: "Which drip suits me?",
    howBadge: "How it works",
    howTitle: "Home healthcare",
    howAccent: "in 4 steps",
    howLead: "We are with you at every step, from your first message to the follow-up visit.",
    steps: [
      { t: "Get in touch", d: "Call, message us on WhatsApp or fill in the online booking form." },
      { t: "We plan together", d: "We listen to what you need and arrange the right team and time." },
      { t: "Our team arrives", d: "Our doctor or nurse comes to your home, hotel or office." },
      { t: "We stay in touch", d: "Treatment and check-ups are planned, and your family is kept informed if needed." },
    ],
    bookOnline: "Book Online",
    areaBadge: "Service regions",
    areaTitle: "Where do",
    areaAccent: "we visit?",
    areaLead: "Our base is in {address}. We serve homes, hotels and workplaces in and around {regions}.",
    areaLabel: "Choose a region",
    areas: { sakarya: "Sakarya", duzce: "Düzce", kocaeli: "Kocaeli", istanbul: "Istanbul", sapanca: "Sapanca / Kartepe" },
    mapTitle: "Map of the {area} service area",
    regionList: ["Sakarya", "Düzce", "Kocaeli", "Istanbul"],
    provinces: "provinces",
    hours: "7 days / 24 hours",
    center: "Base",
  },
  ar: {
    svcBadge: "خدمات",
    svcTitle: "رعاية صحية",
    svcAccent: "تأتي إليك",
    svcLead: "اختر خدمة لترى تفاصيلها ولمن تناسب وكيف تسير الزيارة والمقالات ذات الصلة.",
    details: "التفاصيل",
    allServices: "استعرض كل الخدمات",
    audBadge: "خصيصًا لك",
    audTitle: "لمن تبحث",
    audAccent: "عن رعاية؟",
    audiences: [
      { t: "لوالديّ", d: "خطّط عن بُعد ونحن إلى جانبهما" },
      { t: "بعد الجراحة", d: "عناية بالجروح وضماد ومتابعة" },
      { t: "الأمراض المزمنة", d: "متابعة السكري والضغط والقلب" },
      { t: "المحاليل والعافية", d: "الطاقة والمناعة والجمال" },
      { t: "نزلاء الفنادق", d: "English · العربية" },
      { t: "المؤسسات", d: "فنادق ومصانع ومكاتب ودور رعاية" },
    ],
    symptoms: "دليل الأعراض",
    quiz: "ما المحلول المناسب لي؟",
    howBadge: "كيف نعمل؟",
    howTitle: "الرعاية المنزلية",
    howAccent: "في 4 خطوات",
    howLead: "نرافقك في كل خطوة، من رسالتك الأولى حتى زيارة المتابعة.",
    steps: [
      { t: "تواصل معنا", d: "اتصل بنا أو راسلنا عبر واتساب أو املأ نموذج الحجز الإلكتروني." },
      { t: "نخطط معًا", d: "نستمع إلى احتياجك ونحدد الفريق والوقت المناسبين." },
      { t: "يصل فريقنا", d: "يأتي طبيبنا أو ممرضنا إلى منزلك أو فندقك أو مكتبك." },
      { t: "نبقى على تواصل", d: "يُخطَّط للعلاج والمراجعات، وتُطلَع عائلتك عند الحاجة." },
    ],
    bookOnline: "احجز إلكترونيًا",
    areaBadge: "مناطق الخدمة",
    areaTitle: "إلى أين",
    areaAccent: "نصل؟",
    areaLead: "مقرّنا في {address}. نخدم المنازل والفنادق وأماكن العمل في {regions} وما حولها.",
    areaLabel: "اختر منطقة",
    areas: { sakarya: "سكاريا", duzce: "دوزجة", kocaeli: "كوجالي", istanbul: "إسطنبول", sapanca: "صبانجة / كارتبه" },
    mapTitle: "خريطة منطقة خدمة {area}",
    regionList: ["سكاريا", "دوزجة", "كوجالي", "إسطنبول"],
    provinces: "ولايات",
    hours: "7 أيام / 24 ساعة",
    center: "المقر",
  },
};

const joinList = (arr, lang) => {
  try {
    return new Intl.ListFormat(lang, { style: "long", type: "conjunction" }).format(arr);
  } catch {
    return arr.join(", ");
  }
};

export const ServicesShowcase = () => {
  const t = useT(dict);
  const { meta } = useLang();
  const list = useLocalized(services, translations, "slug");
  return (
    <section className={ui.section}>
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}><CountUp to={list.length} duration={1.2} locale={meta.locale} /> {t("svcBadge")}</span>
          <h2>{t("svcTitle")} <span className="accent">{t("svcAccent")}</span></h2>
          <p>{t("svcLead")}</p>
        </div>
      </ScrollReveal>
      <Stagger className={styles.servicesGrid} gap={0.07}>
        {list.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.slug} style={{ height: "100%" }}>
              <TiltCard className={`${ui.card} ${ui.glowBorder}`} style={{ height: "100%" }}>
                <Link to={`/hizmet/${s.slug}`} className={styles.cardLink}>
                  <Icon3D icon={<Icon />} tone={s.tone} size={62} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className={styles.tags}>
                    {s.includes.slice(0, 2).map((x) => <span key={x}><Check weight="bold" /> {x}</span>)}
                  </div>
                  <span className={styles.more}>{t("details")} <ArrowRight /></span>
                </Link>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </Stagger>
      <div className={ui.btnRow}>
        <Magnetic>
          <Link to="/hizmetlerimiz" className={`${ui.btn} ${ui.btnGhost}`}>{t("allServices")} <ArrowRight /></Link>
        </Magnetic>
      </div>
    </section>
  );
};

const AUDIENCES = [
  { icon: UsersThree, tone: "teal", to: "/aileniz-icin" },
  { icon: Bandaids, tone: "amber", to: "/paketler#ameliyat" },
  { icon: Heartbeat, tone: "rose", to: "/paketler#duzenli" },
  { icon: FlowerLotus, tone: "violet", to: "/serum-testi" },
  { icon: GlobeHemisphereWest, tone: "blue", to: "/en" },
  { icon: Buildings, tone: "green", to: "/kurumsal" },
];

export const AudienceShortcuts = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const labels = t("audiences");
  return (
    <section className={ui.sectionTight}>
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}>{t("audBadge")}</span>
          <h2>{t("audTitle")} <span className="accent">{t("audAccent")}</span></h2>
        </div>
      </ScrollReveal>
      <Stagger className={styles.audGrid} gap={0.07}>
        {AUDIENCES.map((a, i) => {
          const Icon = a.icon;
          const to = a.to === "/en" && lang === "ar" ? "/ar" : a.to;
          return (
            <StaggerItem key={a.to} style={{ height: "100%" }}>
              <SpotlightCard as={Link} to={to} className={`${ui.card} ${ui.glass} ${styles.aud}`}>
                <Icon3D icon={<Icon />} tone={a.tone} size={48} />
                <div>
                  <strong>{labels[i].t}</strong>
                  <span>{labels[i].d}</span>
                </div>
                <ArrowRight className={styles.audArrow} />
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
      <div className={ui.btnRow}>
        <Link to="/belirti-rehberi" className={`${ui.btn} ${ui.btnGhost}`}><Stethoscope /> {t("symptoms")}</Link>
        <Link to="/serum-testi" className={`${ui.btn} ${ui.btnGhost}`}><MagicWand /> {t("quiz")}</Link>
      </div>
    </section>
  );
};

const STEP_META = [
  { icon: Phone, tone: "teal" },
  { icon: ClipboardText, tone: "blue" },
  { icon: HouseLine, tone: "amber" },
  { icon: Heartbeat, tone: "rose" },
];

export const HowItWorks = () => {
  const t = useT(dict);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = t("steps");
  return (
    <section className={ui.section} ref={ref}>
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}>{t("howBadge")}</span>
          <h2>{t("howTitle")} <span className="accent">{t("howAccent")}</span></h2>
          <p>{t("howLead")}</p>
        </div>
      </ScrollReveal>
      <div className={styles.timeline}>
        <div className={styles.track} aria-hidden="true"><motion.div className={styles.fill} style={{ width: line }} /></div>
        <Stagger as="ol" className={styles.tList} gap={0.14}>
        {steps.map((s, i) => {
          const Icon = STEP_META[i].icon;
          return (
            <StaggerItem as="li" key={i} className={styles.tStep}>
              <div className={styles.tIcon}>
                <Icon3D icon={<Icon />} tone={STEP_META[i].tone} size={64} float />
                <span className={styles.tNum}>{i + 1}</span>
              </div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </StaggerItem>
          );
        })}
        </Stagger>
      </div>
      <div className={ui.btnRow}>
        <Magnetic>
          <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}><CalendarCheck /> {t("bookOnline")} <ArrowRight /></Link>
        </Magnetic>
      </div>
    </section>
  );
};

// Map query (Turkish place names work best with Google Maps) and zoom per region.
const AREAS = [
  { key: "sakarya", q: "Adapazarı, Sakarya", z: 11 },
  { key: "duzce", q: "Düzce", z: 11 },
  { key: "kocaeli", q: "İzmit, Kocaeli", z: 11 },
  { key: "istanbul", q: "İstanbul", z: 10 },
  { key: "sapanca", q: "Sapanca, Sakarya", z: 11 },
];

export const ServiceAreas = () => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const [area, setArea] = useState(AREAS[0].key);
  const names = t("areas");
  const cur = AREAS.find((a) => a.key === area) || AREAS[0];
  const hl = lang === "tr" ? "tr" : lang;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(cur.q)}&z=${cur.z}&hl=${hl}&output=embed`;
  return (
    <section className={ui.section} id="bolgeler">
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}><MapPin /> {t("areaBadge")}</span>
          <h2>{t("areaTitle")} <span className="accent">{t("areaAccent")}</span></h2>
          <p>{t("areaLead", { address: SITE.addressShort, regions: joinList(t("regionList"), meta.locale) })}</p>
        </div>
      </ScrollReveal>
      <div className={`${ui.chips} ${styles.areaChips}`} role="group" aria-label={t("areaLabel")}>
        {AREAS.map((a) => (
          <button key={a.key} type="button" aria-pressed={area === a.key} className={`${ui.chip} ${area === a.key ? ui.chipActive : ""}`} onClick={() => setArea(a.key)}>
            {names[a.key]}
          </button>
        ))}
      </div>
      <ScrollReveal>
        <div className={styles.map}>
          <AnimatePresence mode="wait">
            <motion.iframe key={cur.key + hl} title={t("mapTitle", { area: names[cur.key] })} src={src} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }} />
          </AnimatePresence>
          <div className={styles.mapBadge}>
            <MapPin weight="fill" />
            <span><strong>{names[cur.key]}</strong></span>
          </div>
        </div>
      </ScrollReveal>
      <Stagger className={styles.areaFacts} gap={0.08}>
        <StaggerItem y={14}>
          <SpotlightCard className={`${ui.card} ${styles.areaFact}`}>
            <strong><CountUp to={SITE.regions.length} duration={1.2} locale={meta.locale} /></strong>
            <span>{t("provinces")}</span>
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem y={14}>
          <SpotlightCard className={`${ui.card} ${styles.areaFact}`}>
            <Clock weight="duotone" />
            <span>{t("hours")}</span>
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem y={14}>
          <SpotlightCard className={`${ui.card} ${styles.areaFact}`}>
            <HouseLine weight="duotone" />
            <span>{t("center")}: {SITE.addressShort}</span>
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem y={14}>
          <SpotlightCard as="a" href={`tel:${primaryPhone.tel}`} className={`${ui.card} ${styles.areaFact}`}>
            <Phone weight="duotone" />
            <span dir="ltr">{primaryPhone.display}</span>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>
    </section>
  );
};
