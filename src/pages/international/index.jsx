import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWhatsapp, FaPhoneAlt, FaHotel, FaUserMd, FaSyringe, FaVials, FaUserNurse, FaAmbulance, FaClock, FaMapMarkerAlt, FaLanguage,
} from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import ui from "../../styles/ui.module.css";
import { SITE, primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";

const T = {
  en: {
    dir: "ltr",
    title: "Doctor & IV Therapy at Your Hotel | ETERNAL Health Services",
    desc: "Home and hotel doctor visits, IV drips, nursing and lab tests in Sakarya, Sapanca, Kartepe, Kocaeli, Düzce and Istanbul. 24/7, English and Arabic speaking support.",
    badge: "For international guests",
    h1: "A Doctor at Your Door,",
    h1b: "Wherever You Stay",
    lead: "Feeling unwell on holiday, or need an IV drip after a long trip? Our medical team comes to your hotel, villa or home, 24/7.",
    wa: "Message us on WhatsApp",
    waText: "Hello, I am a guest in the area and I would like medical assistance. My hotel/address is: ",
    call: "Call",
    servicesH: "What we can do for you",
    services: [
      { i: FaUserMd, t: "Doctor visit", d: "Examination, treatment and prescriptions at your hotel or home." },
      { i: FaSyringe, t: "IV drip therapy", d: "Hydration, vitamin, energy and immunity drips after a medical assessment." },
      { i: FaUserNurse, t: "Nursing care", d: "Injections, dressings, catheter care and monitoring." },
      { i: FaVials, t: "Lab tests", d: "Blood and urine tests, PCR tests collected where you stay." },
      { i: FaAmbulance, t: "Private ambulance", d: "Patient transfer to hospital, home or another city." },
      { i: FaHotel, t: "Hotel service", d: "We work with guests staying in Sapanca, Kartepe and the surrounding area." },
    ],
    howH: "How it works",
    how: ["Send us your location and a short description on WhatsApp.", "We confirm the visit time and the expected arrival.", "Our doctor or nurse comes to you and provides care."],
    info: [
      { i: FaClock, t: "24/7, including holidays" },
      { i: FaMapMarkerAlt, t: "Sakarya, Sapanca, Kartepe, Kocaeli, Düzce, Istanbul" },
      { i: FaLanguage, t: "Turkish, English and Arabic communication" },
    ],
    emergency: "Life-threatening emergency? Call 112 (free, 24/7) first.",
    turkish: "Türkçe site",
  },
  ar: {
    dir: "rtl",
    title: "طبيب وعلاج بالمحاليل في فندقك | إيترنال للخدمات الصحية",
    desc: "زيارات طبيب منزلية وفندقية، محاليل وريدية، تمريض وتحاليل في سكاريا وسبانجا وكارتبه وكوجالي ودوزجه وإسطنبول. على مدار الساعة.",
    badge: "للضيوف الدوليين",
    h1: "طبيب عند بابك،",
    h1b: "أينما كنت تقيم",
    lead: "هل تشعر بتوعك أثناء العطلة أو تحتاج إلى محلول وريدي بعد رحلة طويلة؟ فريقنا الطبي يأتي إلى فندقك أو الفيلا أو المنزل على مدار الساعة.",
    wa: "راسلنا على واتساب",
    waText: "مرحباً، أنا ضيف في المنطقة وأحتاج إلى مساعدة طبية. الفندق / العنوان: ",
    call: "اتصل",
    servicesH: "ماذا نقدم لك",
    services: [
      { i: FaUserMd, t: "زيارة طبيب", d: "فحص وعلاج ووصفات طبية في فندقك أو منزلك." },
      { i: FaSyringe, t: "العلاج بالمحاليل الوريدية", d: "محاليل الترطيب والفيتامينات والطاقة والمناعة بعد تقييم طبي." },
      { i: FaUserNurse, t: "التمريض", d: "الحقن، الضمادات، العناية بالقسطرة والمتابعة." },
      { i: FaVials, t: "التحاليل", d: "تحاليل الدم والبول واختبار PCR في مكان إقامتك." },
      { i: FaAmbulance, t: "إسعاف خاص", d: "نقل المرضى إلى المستشفى أو المنزل أو مدينة أخرى." },
      { i: FaHotel, t: "خدمة الفنادق", d: "نخدم الضيوف المقيمين في سبانجا وكارتبه والمناطق المحيطة." },
    ],
    howH: "كيف تعمل الخدمة",
    how: ["أرسل لنا موقعك ووصفاً قصيراً عبر واتساب.", "نؤكد موعد الزيارة ووقت الوصول المتوقع.", "يأتي طبيبنا أو الممرض إليك ويقدم الرعاية."],
    info: [
      { i: FaClock, t: "على مدار الساعة، بما في ذلك العطل" },
      { i: FaMapMarkerAlt, t: "سكاريا، سبانجا، كارتبه، كوجالي، دوزجه، إسطنبول" },
      { i: FaLanguage, t: "التواصل بالتركية والإنجليزية والعربية" },
    ],
    emergency: "في حالة طوارئ تهدد الحياة اتصل أولاً بالرقم 112 (مجاني، على مدار الساعة).",
    turkish: "الموقع بالتركية",
  },
};

const TONES = ["teal", "blue", "violet", "amber", "rose", "green"];

const International = ({ lang = "en" }) => {
  const t = T[lang];
  return (
    <div dir={t.dir} lang={lang}>
      <Helmet htmlAttributes={{ lang, dir: t.dir }}>
        <title>{t.title}</title>
        <meta name="description" content={t.desc} />
        <link rel="canonical" href={`${SITE.url}/${lang}`} />
        <link rel="alternate" hrefLang="tr" href={SITE.url} />
        <link rel="alternate" hrefLang="en" href={`${SITE.url}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE.url}/ar`} />
      </Helmet>

      <section className={ui.pageHero}>
        <Wrapper>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className={ui.badge}>{t.badge}</span>
            <h1>{t.h1} <span>{t.h1b}</span></h1>
            <p>{t.lead}</p>
            <div className={ui.btnRow}>
              <a href={whatsappUrl(t.waText)} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}><FaWhatsapp /> {t.wa}</a>
              <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`} dir="ltr"><FaPhoneAlt /> {t.call} {primaryPhone.tel.replace(/^\+90(\d{3})(\d{3})(\d{2})(\d{2})$/, "+90 $1 $2 $3 $4")}</a>
            </div>
            <div className={ui.chips} style={{ justifyContent: "center", marginTop: 18 }}>
              <Link to="/" className={ui.chip}>{t.turkish}</Link>
              <Link to={lang === "en" ? "/ar" : "/en"} className={ui.chip}>{lang === "en" ? "العربية" : "English"}</Link>
            </div>
          </motion.div>
        </Wrapper>
      </section>

      <Wrapper>
        <section className={ui.section}>
          <div className={ui.sectionHead}><h2>{t.servicesH}</h2></div>
          <div className={ui.grid}>
            {t.services.map((s, i) => {
              const Icon = s.i;
              return (
                <ScrollReveal key={s.t} delay={i * 0.06}>
                  <TiltCard className={`${ui.card} ${ui.glowBorder}`} style={{ height: "100%" }}>
                    <Icon3D icon={<Icon />} tone={TONES[i % TONES.length]} size={58} />
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className={ui.sectionTight}>
          <div className={ui.grid2}>
            <div className={ui.card}>
              <h2 style={{ marginTop: 0 }}>{t.howH}</h2>
              <ol style={{ display: "grid", gap: 10, paddingInlineStart: 22, color: "var(--text-secondary)" }}>
                {t.how.map((x) => <li key={x}>{x}</li>)}
              </ol>
            </div>
            <div className={ui.card}>
              {t.info.map((x) => {
                const Icon = x.i;
                return (
                  <p key={x.t} style={{ display: "flex", gap: 12, alignItems: "center", margin: "8px 0" }}>
                    <Icon style={{ color: "var(--primary)", flexShrink: 0 }} /> {x.t}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={`${ui.note} ${ui.noteDanger}`} style={{ margin: "24px 0 80px" }}>
            <FaAmbulance /> <span>{t.emergency}</span>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export const InternationalEn = () => <International lang="en" />;
export const InternationalAr = () => <International lang="ar" />;
export default International;
