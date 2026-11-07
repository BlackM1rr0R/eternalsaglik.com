import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { HouseLine, CalendarCheck, Stethoscope, Package, Question, Phone, WhatsappLogo } from "@phosphor-icons/react";
import ui from "../../styles/ui.module.css";
import { Float, Stagger, StaggerItem } from "../../components/motion";
import { SITE } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT } from "../../i18n";

const dict = {
  tr: {
    title: "Sayfa Bulunamadı | ETERNAL Sağlık",
    h2: "Sayfa Bulunamadı",
    text: "Aradığınız sayfa mevcut değil veya taşındı. Ama endişelenmeyin, ekibimiz hâlâ 7/24 burada.",
    home: "Ana Sayfa",
    book: "Randevu Al",
    popular: "Belki bunları arıyordunuz",
    links: ["Hizmetlerimiz", "Bakım Paketleri", "Sıkça Sorulanlar"],
    help: "Yardıma mı ihtiyacınız var?",
    call: "Ara",
    wa: "WhatsApp",
    waText: "Merhaba, web sitenizde aradığımı bulamadım. Yardımcı olabilir misiniz?",
  },
  en: {
    title: "Page Not Found | ETERNAL Health",
    h2: "Page Not Found",
    text: "The page you are looking for doesn't exist or has moved. Don't worry, our team is still here 24/7.",
    home: "Home",
    book: "Book Now",
    popular: "Perhaps you were looking for",
    links: ["Our Services", "Care Packages", "FAQ"],
    help: "Need help?",
    call: "Call",
    wa: "WhatsApp",
    waText: "Hello, I couldn't find what I was looking for on your website. Could you help?",
  },
  ar: {
    title: "الصفحة غير موجودة | إيترنال الصحية",
    h2: "الصفحة غير موجودة",
    text: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لا تقلق، فريقنا ما زال هنا على مدار الساعة.",
    home: "الرئيسية",
    book: "احجز موعداً",
    popular: "ربما كنت تبحث عن",
    links: ["خدماتنا", "باقات الرعاية", "الأسئلة الشائعة"],
    help: "هل تحتاج إلى مساعدة؟",
    call: "اتصل",
    wa: "واتساب",
    waText: "مرحباً، لم أجد ما أبحث عنه في موقعكم. هل يمكنكم المساعدة؟",
  },
};

const LINKS = [
  { to: "/hizmetlerimiz", icon: Stethoscope },
  { to: "/paketler", icon: Package },
  { to: "/sss", icon: Question },
];

// 404 with an animated ECG line that "flatlines" into the 404 and recovers.
const NotFound = () => {
  const t = useT(dict);
  const reduce = useReducedMotion();
  const labels = t("links");
  return (
    <section className={ui.page} style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <Helmet>
        <title>{t("title")}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ padding: "0 20px" }}>
        <svg viewBox="0 0 320 90" style={{ width: "min(420px, 90vw)", display: "block", margin: "0 auto" }} aria-hidden="true">
          <path d="M0 50 H320" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" />
          <motion.path
            d="M0 50 H70 L82 22 L96 78 L108 12 L120 64 L130 50 H190 L200 50 H320"
            fill="none" stroke="var(--rose-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 2.2, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
          />
          {!reduce && (
            <motion.circle r="4" fill="var(--rose-500)" cy="50"
              animate={{ cx: [0, 320], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }} />
          )}
        </svg>
        <Float amplitude={6} duration={5}>
          <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180 }} dir="ltr"
            style={{ fontSize: "clamp(4rem, 12vw, 6rem)", fontWeight: 800, lineHeight: 1, margin: "10px 0", background: "linear-gradient(135deg, var(--teal-600), var(--blue-500))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            404
          </motion.h1>
        </Float>
        <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: "var(--text)", margin: "0 0 8px" }}>
          {t("h2")}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto" }}>
          {t("text")}
        </motion.p>
        <div className={ui.btnRow}>
          <Link to="/" className={`${ui.btn} ${ui.btnPrimary}`}><HouseLine /> {t("home")}</Link>
          <Link to="/randevu" className={`${ui.btn} ${ui.btnGhost}`}><CalendarCheck /> {t("book")}</Link>
        </div>

        <p className={ui.muted} style={{ margin: "34px 0 12px", fontWeight: 600 }}>{t("popular")}</p>
        <Stagger className={ui.chips} style={{ justifyContent: "center" }} gap={0.07}>
          {LINKS.map((l, i) => {
            const Icon = l.icon;
            return (
              <StaggerItem key={l.to} y={10}>
                <Link to={l.to} className={ui.chip} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon /> {labels[i]}</Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className={ui.hint} style={{ margin: "28px 0 10px" }}>{t("help")}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`tel:${SITE.phones[0].tel}`} className={`${ui.btn} ${ui.btnGhost}`}><Phone /> {t("call")} <span dir="ltr">{SITE.phones[0].display}</span></a>
          <a href={whatsappUrl(t("waText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}><WhatsappLogo /> {t("wa")}</a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
