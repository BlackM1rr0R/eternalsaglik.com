import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Warning, ArrowRight, Phone, BookOpenText, FileText, Drop, Stethoscope, HandPointing, ListChecks, CalendarCheck,
  WhatsappLogo, Brain, Heartbeat, ForkKnife, HandPalm, Footprints, Bandaids, Info, Siren,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import { Stagger, StaggerItem } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { bodyRegions, localizeRegion, localizedRedFlags } from "../../data/symptoms";
import * as S from "../../data/services";
import * as A from "../../data/articles";
import * as SR from "../../data/serums";
import { getCareGuide, localizeGuide } from "../../data/careguides";
import { whatsappUrl } from "../../utils/whatsapp";
import { localize, useLang, useT } from "../../i18n";

const serviceTr = S.translations || {};
const articleTr = A.translations || {};
const serumTr = SR.translations || {};

const dict = {
  tr: {
    badge: "Belirti Rehberi",
    title: "Ne Hissediyorsunuz?",
    highlight: "Size Yol Gösterelim",
    text: "Vücut haritasından bir bölge seçin, size uygun hizmeti, bilgilendirici yazıları ve bakım rehberlerini gösterelim. Bu rehber teşhis koymaz; yönlendirme amaçlıdır.",
    seoTitle: "Belirti Rehberi – Hangi Sağlık Hizmetine İhtiyacım Var?",
    seoDesc: "Vücut haritası ile belirtilerinize uygun evde sağlık hizmetini bulun: evde doktor, hemşire, serum, tahlil, yara bakımı ve bakım rehberleri.",
    redTitle: "Şu belirtilerde beklemeyin, hemen 112'yi arayın:",
    call112: "112'yi Ara",
    steps: ["Bölgeyi seçin", "Şikayetinizi bulun", "Hizmete veya rehbere geçin"],
    mapLabel: "Vücut haritası",
    skinHint: "Cilt ve yaralar için figürün dış hattına dokunun.",
    regionsLabel: "Bölgeler",
    count: "{n} konu",
    read: "Yazıyı oku",
    guide: "Bakım rehberi",
    serum: "Serum",
    book: "Randevu Al",
    ask: "WhatsApp'tan sorun",
    askMsg: "Merhaba, {region} bölgesindeki bir şikayetim için bilgi almak istiyorum.",
    disclaimerTitle: "Önemli",
    disclaimer: "Bu sayfa teşhis koymaz ve doktor muayenesinin yerine geçmez. Belirtileriniz şiddetliyse, kötüleşiyorsa ya da emin değilseniz doktorunuza danışın; hayati tehlikede 112'yi arayın.",
    notFound: "Aradığınız şikayeti bulamadınız mı? Ekibimize yazın, size uygun hizmeti birlikte belirleyelim.",
    guides: "Tüm bakım rehberleri",
  },
  en: {
    badge: "Symptom Guide",
    title: "How Are You Feeling?",
    highlight: "Let Us Guide You",
    text: "Choose an area on the body map and we will show you the right service, helpful articles and care guides. This guide does not diagnose; it is here to point you in the right direction.",
    seoTitle: "Symptom Guide – Which Health Service Do I Need?",
    seoDesc: "Use the body map to find the right home healthcare service for your symptoms: home doctor, nurse, IV drips, tests, wound care and care guides.",
    redTitle: "Do not wait — call 112 immediately for:",
    call112: "Call 112",
    steps: ["Choose an area", "Find your complaint", "Go to the service or guide"],
    mapLabel: "Body map",
    skinHint: "Tap the outline of the figure for skin and wounds.",
    regionsLabel: "Areas",
    count: "{n} topics",
    read: "Read article",
    guide: "Care guide",
    serum: "IV drip",
    book: "Book Now",
    ask: "Ask on WhatsApp",
    askMsg: "Hello, I would like information about a complaint in the {region} area.",
    disclaimerTitle: "Important",
    disclaimer: "This page does not diagnose and does not replace an examination by a doctor. If your symptoms are severe, getting worse or you are unsure, talk to your doctor; if life is in danger, call 112.",
    notFound: "Can't find your complaint? Message our team and we will work out the right service together.",
    guides: "All care guides",
  },
  ar: {
    badge: "دليل الأعراض",
    title: "بماذا تشعر؟",
    highlight: "دعنا نرشدك",
    text: "اختر منطقة من خريطة الجسم لنعرض لك الخدمة المناسبة والمقالات المفيدة وأدلة الرعاية. هذا الدليل لا يضع تشخيصاً، بل هو للإرشاد فقط.",
    seoTitle: "دليل الأعراض – ما الخدمة الصحية التي أحتاجها؟",
    seoDesc: "استخدم خريطة الجسم للعثور على خدمة الرعاية المنزلية المناسبة لأعراضك: طبيب منزلي، ممرض، محاليل وريدية، تحاليل، عناية بالجروح وأدلة رعاية.",
    redTitle: "لا تنتظر، اتصل بـ 112 فوراً في الحالات التالية:",
    call112: "اتصل بـ 112",
    steps: ["اختر المنطقة", "ابحث عن شكواك", "انتقل إلى الخدمة أو الدليل"],
    mapLabel: "خريطة الجسم",
    skinHint: "المس الحدود الخارجية للشكل لاختيار الجلد والجروح.",
    regionsLabel: "المناطق",
    count: "{n} مواضيع",
    read: "اقرأ المقال",
    guide: "دليل الرعاية",
    serum: "محلول وريدي",
    book: "احجز موعداً",
    ask: "اسأل عبر واتساب",
    askMsg: "مرحباً، أرغب في الحصول على معلومات عن شكوى في منطقة {region}.",
    disclaimerTitle: "مهم",
    disclaimer: "هذه الصفحة لا تضع تشخيصاً ولا تغني عن فحص الطبيب. إذا كانت أعراضك شديدة أو تزداد سوءاً أو لم تكن متأكداً فاستشر طبيبك، وإذا كانت الحياة في خطر فاتصل بـ 112.",
    notFound: "لم تجد شكواك؟ راسل فريقنا لنحدد معاً الخدمة المناسبة.",
    guides: "جميع أدلة الرعاية",
  },
};

const REGION_ICONS = { head: Brain, chest: Heartbeat, belly: ForkKnife, arms: HandPalm, legs: Footprints, skin: Bandaids };
const STEP_ICONS = [HandPointing, ListChecks, CalendarCheck];

// Clickable regions of the body figure (original SVG drawn for this page).
const ZONES = [
  { id: "head", el: <circle cx="100" cy="42" r="28" /> },
  { id: "chest", el: <rect x="66" y="78" width="68" height="62" rx="18" /> },
  { id: "belly", el: <rect x="70" y="142" width="60" height="56" rx="16" /> },
  { id: "arms", el: <g><rect x="34" y="84" width="26" height="118" rx="13" /><rect x="140" y="84" width="26" height="118" rx="13" /></g> },
  { id: "legs", el: <g><rect x="70" y="202" width="27" height="130" rx="13" /><rect x="103" y="202" width="27" height="130" rx="13" /></g> },
];
// Skin: a halo silhouette around the whole figure.
const SKIN = (
  <g>
    <circle cx="100" cy="42" r="36" />
    <rect x="86" y="66" width="28" height="20" rx="8" />
    <rect x="56" y="70" width="88" height="136" rx="26" />
    <rect x="26" y="76" width="42" height="134" rx="21" />
    <rect x="132" y="76" width="42" height="134" rx="21" />
    <rect x="62" y="192" width="76" height="146" rx="22" />
  </g>
);

const getLinks = (item, t, lang) => {
  const links = [];
  if (item.service && S.getService) {
    const base = S.getService(item.service);
    if (base) {
      const s = localize(base, serviceTr, lang, "slug");
      links.push({ to: `/hizmet/${s.slug}`, label: s.title, icon: Stethoscope, kind: "service" });
    }
  }
  if (item.article && A.getArticle) {
    const base = A.getArticle(item.article);
    if (base) {
      const a = localize(base, articleTr, lang, "id");
      links.push({ to: `/details/${a.id}`, label: t("read"), title: a.text, icon: FileText, kind: "article" });
    }
  }
  if (item.serum && SR.serumList) {
    const base = SR.serumList.find((x) => x.id === item.serum);
    if (base) {
      const s = localize(base, serumTr, lang, "id");
      links.push({ to: `/serumlar/${s.id}`, label: s.info, icon: Drop, kind: "serum" });
    }
  }
  if (item.guide) {
    const base = getCareGuide(item.guide);
    if (base) {
      const g = localizeGuide(base, lang);
      links.push({ to: `/bakim-rehberi/${g.slug}`, label: t("guide"), title: g.title, icon: BookOpenText, kind: "guide" });
    }
  }
  return links;
};

const Target = ({ item, t, lang }) => {
  const links = getLinks(item, t, lang);
  return (
    <div className={styles.symptom}>
      <strong>{item.s}</strong>
      <div className={styles.links}>
        {links.map((l) => {
          const Ico = l.icon;
          return (
            <Link key={l.to} to={l.to} title={l.title} className={`${styles.link} ${styles[l.kind] || ""}`}>
              <Ico aria-hidden="true" /> {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const itemV = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } };

const Symptoms = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [active, setActive] = useState("head");
  const regions = useMemo(() => bodyRegions.map((r) => localizeRegion(r, lang)), [lang]);
  const flags = localizedRedFlags(lang);
  const region = regions.find((r) => r.id === active);
  const RegionIcon = REGION_ICONS[region.id] || Info;

  const zoneProps = (id) => {
    const r = regions.find((x) => x.id === id);
    return {
      role: "button",
      tabIndex: 0,
      "aria-label": r.label,
      "aria-pressed": active === id,
      onClick: () => setActive(id),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActive(id);
        }
      },
    };
  };

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        text={t("text")}
        seoTitle={t("seoTitle")}
        seoDesc={t("seoDesc")}
        path="/belirti-rehberi"
      >
        <Stagger className={styles.steps}>
          {t("steps").map((s, i) => {
            const Ico = STEP_ICONS[i];
            return (
              <StaggerItem key={s} className={styles.stepPill}>
                <span className={styles.stepNum}>{i + 1}</span><Ico aria-hidden="true" /> {s}
              </StaggerItem>
            );
          })}
        </Stagger>
      </PageHero>

      <Wrapper>
        <section className={ui.sectionTight}>
          <motion.div className={`${ui.note} ${ui.noteDanger} ${styles.red}`} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Siren className={styles.redIcon} aria-hidden="true" />
            <div>
              <strong>{t("redTitle")}</strong>
              <ul className={styles.flags}>
                {flags.map((f) => <li key={f}><Warning aria-hidden="true" /> {f}</li>)}
              </ul>
              <a href="tel:112" className={`${ui.btn} ${ui.btnDanger}`} style={{ padding: "9px 18px", marginTop: 12 }}><Phone /> {t("call112")}</a>
            </div>
          </motion.div>
        </section>

        <section className={styles.layout}>
          <div className={styles.figureWrap}>
            <svg viewBox="0 0 200 340" className={styles.figure} role="group" aria-label={t("mapLabel")}>
              <g {...zoneProps("skin")} className={`${styles.skin} ${active === "skin" ? styles.skinActive : ""}`}>{SKIN}</g>
              {ZONES.map((z) => (
                <g key={z.id} {...zoneProps(z.id)} className={`${styles.zone} ${active === z.id ? styles.zoneActive : ""}`}>
                  {z.el}
                </g>
              ))}
            </svg>
            <p className={styles.hint}>{t("skinHint")}</p>
            <div className={ui.chips} style={{ justifyContent: "center", marginTop: 12 }} role="group" aria-label={t("regionsLabel")}>
              {regions.map((r) => {
                const Ico = REGION_ICONS[r.id] || Info;
                return (
                  <button key={r.id} type="button" aria-pressed={active === r.id} className={`${ui.chip} ${styles.chip} ${active === r.id ? ui.chipActive : ""}`} onClick={() => setActive(r.id)}>
                    <Ico aria-hidden="true" /> {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${region.id}-${lang}`} className={`${ui.card} ${styles.panel}`}
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <div className={styles.panelHead}>
                <span className={styles.panelIcon}><RegionIcon aria-hidden="true" /></span>
                <div>
                  <h2>{region.label}</h2>
                  <p>{region.intro}</p>
                </div>
                <span className={styles.count}>{t("count", { n: region.symptoms.length })}</span>
              </div>
              {region.redFlag && (
                <div className={`${ui.note} ${ui.noteDanger}`} style={{ marginBottom: 14 }}>
                  <Warning aria-hidden="true" /> <span>{region.redFlag}</span>
                </div>
              )}
              <motion.div className={styles.symptoms} variants={list} initial="hidden" animate="show">
                {region.symptoms.map((s, i) => (
                  <motion.div key={`${region.id}-${i}`} variants={itemV}>
                    <Target item={s} t={t} lang={lang} />
                  </motion.div>
                ))}
              </motion.div>
              <p className={styles.notFound}>{t("notFound")}</p>
              <div className={styles.actions}>
                <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}>
                  {t("book")} <ArrowRight className={styles.arrow} />
                </Link>
                <a href={whatsappUrl(t("askMsg", { region: region.label }))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
                  <WhatsappLogo /> {t("ask")}
                </a>
                <Link to="/bakim-rehberi" className={`${ui.btn} ${ui.btnGhost}`}>
                  <BookOpenText /> {t("guides")}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className={styles.disclaimer}>
          <div className={ui.note}>
            <Info aria-hidden="true" />
            <span><strong>{t("disclaimerTitle")}:</strong> {t("disclaimer")}</span>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default Symptoms;
