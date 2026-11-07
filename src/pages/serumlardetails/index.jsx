import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Phone, WhatsappLogo, MagicWand, Timer, HouseLine, CheckCircle, Warning, Siren, Info, Flask,
  UserCheck, ClipboardText, Heartbeat, Syringe, SealCheck, MapPin, Clock, ShieldCheck, Sparkle, Star,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import SerumSVG from "../../components/serumcard";
import ListenButton from "../../components/listenbutton";
import TiltCard from "../../components/tiltcard";
import Icon3D from "../../components/icon3d";
import AnimatedText from "../../components/animatedtext";
import { Stagger, StaggerItem, SpotlightCard, Float, Magnetic } from "../../components/motion";
import { getSerum, serumList, listTranslations, detailTranslations, categoryLabel } from "../../data/serums";
import { primaryPhone, SITE } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT, useLang, localize } from "../../i18n";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";

const dict = {
  tr: {
    back: "Serumlara Dön",
    notFound: "Serum bulunamadı",
    notFoundText: "Aradığınız serum katalogda yer almıyor olabilir.",
    seoSuffix: "Evde IV Serum | ETERNAL Sağlık",
    home: "Evde uygulama",
    waOrder: "WhatsApp ile Sipariş",
    call: "Ara",
    waMsg: "Merhaba, \"{name}\" serumu için evde uygulama randevusu almak istiyorum.",
    quizLink: "Hangi serum bana uygun? Testi çöz",
    typesTitle: "Öne çıkan destek alanları",
    howTitle: "Seans nasıl geçer?",
    howSteps: ["Ön değerlendirme", "Tansiyon ve nabız", "Serum uygulaması", "Gözlem ve öneriler"],
    durationLabel: "Süre",
    durationNote: "Süre, içerik ve doktor değerlendirmesine göre değişebilir.",
    forTitle: "Kimler için?",
    contentTitle: "İçerik",
    contentNote: "Kesin içerik ve miktar, ön değerlendirme sonrası doktor tarafından belirlenir.",
    consultTitle: "Önce doktorunuza danışın",
    consultGeneral: ["Hamilelik veya emzirme", "Böbrek, kalp veya karaciğer hastalığı", "İlaç, vitamin veya besin alerjisi", "Düzenli kullanılan ilaçlar"],
    redFlag: "Göğüs ağrısı, nefes darlığı, bilinç bulanıklığı veya ağır kanama gibi acil durumlarda serum beklemeyin, hemen 112'yi arayın.",
    disclaimerTitle: "Bilgilendirme",
    disclaimer: "Bu sayfa genel bilgilendirme amaçlıdır; tanı veya tedavi önerisi yerine geçmez. Serumlar destekleyici uygulamalardır ve uygunluğuna her zaman doktor değerlendirmesiyle karar verilir.",
    orderTitle: "Evde uygulama talebi",
    orderList: ["Uygulama öncesi ön değerlendirme", "Steril, tek kullanımlık malzeme", "Uygulama boyunca sağlık profesyoneli", "İletişim: {hours}"],
    regions: "Hizmet bölgeleri",
    relatedTitle: "Benzer serumlar",
    relatedText: "Aynı kategorideki diğer seçenekler",
    allSerums: "Tüm serumlar",
    view: "İncele",
    popular: "Popüler",
  },
  en: {
    back: "Back to drips",
    notFound: "Drip not found",
    notFoundText: "The drip you are looking for may not be in our catalogue.",
    seoSuffix: "IV Drip at Home | ETERNAL Health",
    home: "Given at home",
    waOrder: "Order via WhatsApp",
    call: "Call",
    waMsg: "Hello, I would like to book a home session for the \"{name}\" drip.",
    quizLink: "Which drip suits me? Take the quiz",
    typesTitle: "Key areas of support",
    howTitle: "What happens in a session?",
    howSteps: ["Pre-assessment", "Blood pressure and pulse", "The drip", "Observation and advice"],
    durationLabel: "Duration",
    durationNote: "Timing can vary with the content and the doctor's assessment.",
    forTitle: "Who is it for?",
    contentTitle: "Contents",
    contentNote: "The exact content and amounts are set by a doctor after the pre-assessment.",
    consultTitle: "Talk to your doctor first",
    consultGeneral: ["Pregnancy or breastfeeding", "Kidney, heart or liver disease", "Allergy to medicines, vitamins or foods", "Regular medication"],
    redFlag: "In an emergency such as chest pain, shortness of breath, confusion or heavy bleeding, do not wait for a drip: call 112 immediately.",
    disclaimerTitle: "Please note",
    disclaimer: "This page is for general information and does not replace a diagnosis or treatment advice. Drips are a supportive option and suitability is always decided after a doctor's assessment.",
    orderTitle: "Request a home session",
    orderList: ["Pre-assessment before the drip", "Sterile, single-use equipment", "A healthcare professional throughout", "Contact: {hours}"],
    regions: "Service regions",
    relatedTitle: "Similar drips",
    relatedText: "Other options in the same category",
    allSerums: "All drips",
    view: "Details",
    popular: "Popular",
  },
  ar: {
    back: "العودة إلى المحاليل",
    notFound: "المحلول غير موجود",
    notFoundText: "قد لا يكون المحلول الذي تبحث عنه ضمن قائمتنا.",
    seoSuffix: "محلول وريدي في المنزل | إترنال للرعاية الصحية",
    home: "يُعطى في المنزل",
    waOrder: "اطلب عبر واتساب",
    call: "اتصل",
    waMsg: "مرحبًا، أودّ حجز جلسة منزلية لمحلول \"{name}\".",
    quizLink: "أي محلول يناسبني؟ أجرِ الاختبار",
    typesTitle: "أبرز مجالات الدعم",
    howTitle: "كيف تسير الجلسة؟",
    howSteps: ["التقييم المسبق", "الضغط والنبض", "إعطاء المحلول", "المراقبة والنصائح"],
    durationLabel: "المدة",
    durationNote: "قد تختلف المدة بحسب المحتوى وتقييم الطبيب.",
    forTitle: "لمن هذا المحلول؟",
    contentTitle: "المحتوى",
    contentNote: "يحدد الطبيب المحتوى والكميات بدقة بعد التقييم المسبق.",
    consultTitle: "استشر طبيبك أولًا",
    consultGeneral: ["الحمل أو الرضاعة", "أمراض الكلى أو القلب أو الكبد", "الحساسية من الأدوية أو الفيتامينات أو الأطعمة", "الأدوية المنتظمة"],
    redFlag: "في الحالات الطارئة مثل ألم الصدر أو ضيق التنفس أو التشوش أو النزيف الشديد لا تنتظر المحلول، واتصل بالرقم 112 فورًا.",
    disclaimerTitle: "ملاحظة",
    disclaimer: "هذه الصفحة للمعلومات العامة ولا تحلّ محل التشخيص أو المشورة العلاجية. المحاليل خيار داعم، ويُحدَّد مدى ملاءمتها دائمًا بعد تقييم الطبيب.",
    orderTitle: "طلب جلسة منزلية",
    orderList: ["تقييم مسبق قبل المحلول", "مستلزمات معقمة تُستخدم مرة واحدة", "أخصائي رعاية صحية طوال الجلسة", "التواصل: {hours}"],
    regions: "مناطق الخدمة",
    relatedTitle: "محاليل مشابهة",
    relatedText: "خيارات أخرى من الفئة نفسها",
    allSerums: "جميع المحاليل",
    view: "التفاصيل",
    popular: "الأكثر طلبًا",
  },
};

const HOURS = { tr: SITE.hours, en: "24/7", ar: "24/7" };
const REGIONS = {
  tr: SITE.regions,
  en: ["Sakarya", "Düzce", "Kocaeli", "Istanbul"],
  ar: ["سكاريا", "دوزجه", "كوجالي", "إسطنبول"],
};
const TYPE_TONES = ["teal", "violet", "amber"];
const TYPE_ICONS = [Sparkle, Heartbeat, ShieldCheck];
const HOW_ICONS = [ClipboardText, Heartbeat, Syringe, SealCheck];

const SerumlarDetails = () => {
  const { id } = useParams();
  const t = useT(dict);
  const { lang } = useLang();

  const listItem = useMemo(() => serumList.find((s) => s.id === Number(id)), [id]);
  const serum = useMemo(() => {
    const detail = getSerum(id);
    if (detail) return localize(detail, detailTranslations, lang, "id");
    // Catalogue entries without a long-form description fall back to the card info.
    if (!listItem) return null;
    const li = localize(listItem, listTranslations, lang, "id");
    return { id: li.id, text: li.info, category: li.category, textTwo: li.desc };
  }, [id, lang, listItem]);

  const related = useMemo(() => {
    if (!listItem) return [];
    const same = serumList.filter((s) => s.category === listItem.category && s.id !== listItem.id);
    const fill = serumList.filter((s) => s.popular && s.category !== listItem.category && s.id !== listItem.id);
    return [...same, ...fill].slice(0, 3).map((s) => localize(s, listTranslations, lang, "id"));
  }, [listItem, lang]);

  if (!serum) {
    return (
      <Wrapper>
        <Helmet><title>{`${t("notFound")} | ETERNAL`}</title><meta name="robots" content="noindex" /></Helmet>
        <div className={styles.notFound}>
          <Icon3D icon={<Syringe />} tone="teal" size={72} float />
          <h1>{t("notFound")}</h1>
          <p>{t("notFoundText")}</p>
          <Link to="/serumlar" className={`${ui.btn} ${ui.btnPrimary}`}>{t("allSerums")}</Link>
        </div>
      </Wrapper>
    );
  }

  const catLabel = categoryLabel(serum.category, lang);
  const waHref = whatsappUrl(t("waMsg", { name: serum.text }));
  const listenText = [serum.text, serum.textTwo, serum.headerText, serum.aboutHeaderText, serum.howItWorks, serum.whyText]
    .filter(Boolean)
    .join(". ");

  const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6 } };

  return (
    <>
      <Helmet>
        <title>{`${serum.text} | ${t("seoSuffix")}`}</title>
        <meta name="description" content={serum.textTwo} />
        <link rel="canonical" href={`https://eternalsaglik.com/serumlar/${serum.id}`} />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true" />
        <Wrapper>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/serumlar" className={styles.backLink}><ArrowLeft className={styles.flip} /> {t("back")}</Link>
          </motion.div>
          <div className={styles.heroGrid}>
            <motion.div className={styles.heroVisual} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <Float amplitude={6} duration={7}>
                <TiltCard className={styles.heroSvg} max={7}>
                  <SerumSVG name={serum.text} category={serum.category} label={catLabel} />
                </TiltCard>
              </Float>
            </motion.div>
            <div className={styles.heroInfo}>
              <motion.div className={styles.chips} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <span className={styles.chipCat}>{catLabel}</span>
                {serum.duration && <span className={styles.chipSoft}><Timer /> {serum.duration}</span>}
                <span className={styles.chipSoft}><HouseLine /> {t("home")}</span>
                {listItem?.popular && <span className={styles.chipStar}><Star weight="fill" /> {t("popular")}</span>}
              </motion.div>
              <AnimatedText lines={[serum.text]} className={styles.h1} delay={0.15} />
              <motion.p className={styles.heroText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>{serum.textTwo}</motion.p>
              <motion.div className={styles.heroBtns} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <Magnetic>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
                    <WhatsappLogo weight="fill" /> {t("waOrder")}
                  </a>
                </Magnetic>
                <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}><Phone /> {t("call")}</a>
                <ListenButton text={listenText} />
              </motion.div>
              <Link to="/serum-testi" className={styles.quizLink}><MagicWand /> {t("quizLink")}</Link>
            </div>
          </div>
        </Wrapper>
      </section>

      <section className={styles.page}>
        <Wrapper>
          <div className={styles.layout}>
            <div className={styles.main}>
              {serum.headerText && (
                <motion.div className={styles.block} {...reveal}>
                  <h2 className={styles.h2}>{serum.headerText}</h2>
                  <p className={styles.text}>{serum.aboutHeaderText}</p>
                </motion.div>
              )}

              {serum.types?.length > 0 && (
                <div className={styles.block}>
                  <motion.h2 className={styles.h2} {...reveal}>{t("typesTitle")}</motion.h2>
                  <Stagger className={styles.typesGrid} gap={0.1}>
                    {serum.types.map((type, i) => {
                      const I = TYPE_ICONS[i % 3];
                      return (
                        <StaggerItem key={i}>
                          <SpotlightCard className={styles.typeCard}>
                            <div className={styles.typeTop}>
                              <Icon3D icon={<I />} tone={TYPE_TONES[i % 3]} size={46} />
                              <span className={styles.typeNum}>{String(i + 1).padStart(2, "0")}</span>
                            </div>
                            <h3>{type.t}</h3>
                            <p>{type.d}</p>
                          </SpotlightCard>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>
              )}

              {serum.howItWorks && (
                <motion.div className={`${styles.block} ${styles.howBox}`} {...reveal}>
                  <h2 className={styles.h2}>{t("howTitle")}</h2>
                  <Stagger className={styles.howSteps} gap={0.12}>
                    {t("howSteps").map((s, i) => {
                      const I = HOW_ICONS[i];
                      return (
                        <StaggerItem key={i} className={styles.howStep} y={14}>
                          <span className={styles.howIcon}><I weight="duotone" /></span>
                          <span className={styles.howLabel}>{s}</span>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                  <p className={styles.text}>{serum.howItWorks}</p>
                  {serum.duration && (
                    <p className={styles.duration}><Timer /> <strong>{t("durationLabel")}:</strong> {serum.duration}. <span>{t("durationNote")}</span></p>
                  )}
                </motion.div>
              )}

              {(serum.forKind || serum.content) && (
                <Stagger className={styles.twoCol} gap={0.12}>
                  {serum.forKind && (
                    <StaggerItem>
                      <SpotlightCard className={`${ui.card} ${styles.fill}`}>
                        <Icon3D icon={<UserCheck />} tone="blue" size={46} />
                        <h3>{t("forTitle")}</h3>
                        <p className={styles.kicker}>{serum.forKind}</p>
                        <p>{serum.aboutKind}</p>
                      </SpotlightCard>
                    </StaggerItem>
                  )}
                  {serum.content && (
                    <StaggerItem>
                      <SpotlightCard className={`${ui.card} ${styles.fill}`}>
                        <Icon3D icon={<Flask />} tone="green" size={46} />
                        <h3>{t("contentTitle")}</h3>
                        <p>{serum.content}</p>
                        <p className={styles.smallNote}><Info /> {t("contentNote")}</p>
                      </SpotlightCard>
                    </StaggerItem>
                  )}
                </Stagger>
              )}

              <motion.div className={`${styles.block} ${styles.consult}`} {...reveal}>
                <div className={styles.consultHead}>
                  <Icon3D icon={<Warning />} tone="amber" size={46} />
                  <h2 className={styles.h2}>{t("consultTitle")}</h2>
                </div>
                {serum.notFor && <p className={styles.text}>{serum.notFor}</p>}
                <ul className={styles.consultList}>
                  {t("consultGeneral").map((c, i) => <li key={i}><CheckCircle weight="fill" /> {c}</li>)}
                </ul>
                <div className={`${ui.note} ${ui.noteDanger} ${styles.redFlag}`}>
                  <Siren />
                  <span>{t("redFlag")}</span>
                  <a href="tel:112" className={styles.call112}>112</a>
                </div>
              </motion.div>

              {serum.whyTitle && (
                <motion.div className={`${styles.block} ${styles.why}`} {...reveal}>
                  <Sparkle className={styles.whyIcon} weight="duotone" />
                  <div>
                    <h2 className={styles.h2}>{serum.whyTitle}</h2>
                    <p className={styles.text}>{serum.whyText}</p>
                  </div>
                </motion.div>
              )}

              <motion.div className={styles.disclaimer} {...reveal}>
                <ShieldCheck />
                <div>
                  <strong>{t("disclaimerTitle")}</strong>
                  <p>{t("disclaimer")}</p>
                </div>
              </motion.div>
            </div>

            <aside className={styles.aside}>
              <motion.div className={styles.orderCard} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
                <span className={styles.orderEyebrow}>{t("orderTitle")}</span>
                <strong className={styles.orderName}>{serum.text}</strong>
                <div className={styles.orderMeta}>
                  <span>{catLabel}</span>
                  {serum.duration && <span><Clock /> {serum.duration}</span>}
                </div>
                <ul className={styles.orderList}>
                  {t("orderList").map((o, i) => <li key={i}><CheckCircle weight="fill" /> {o.replace("{hours}", HOURS[lang] || SITE.hours)}</li>)}
                </ul>
                <p className={styles.orderRegions}><MapPin /> <span><strong>{t("regions")}:</strong> {(REGIONS[lang] || SITE.regions).join(", ")}</span></p>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa} ${ui.btnBlock}`}>
                  <WhatsappLogo weight="fill" /> {t("waOrder")}
                </a>
                <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost} ${ui.btnBlock}`}>
                  <Phone /> <span dir="ltr">{primaryPhone.display}</span>
                </a>
                <Link to="/serum-testi" className={styles.orderQuiz}><MagicWand /> {t("quizLink")}</Link>
              </motion.div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className={styles.related}>
              <motion.div className={styles.relatedHead} {...reveal}>
                <div>
                  <h2 className={styles.h2}>{t("relatedTitle")}</h2>
                  <p className={styles.textMuted}>{t("relatedText")}</p>
                </div>
                <Link to="/serumlar" className={`${ui.btn} ${ui.btnGhost}`}>{t("allSerums")} <ArrowRight className={styles.flip} /></Link>
              </motion.div>
              <Stagger className={styles.relatedGrid} gap={0.1}>
                {related.map((r) => (
                  <StaggerItem key={r.id}>
                    <TiltCard className={styles.relTilt} max={6}>
                      <Link to={`/serumlar/${r.id}`} className={styles.relCard}>
                        <div className={styles.relImg}><SerumSVG name={r.info} category={r.category} label={categoryLabel(r.category, lang)} /></div>
                        <div className={styles.relBody}>
                          <h3>{r.info}</h3>
                          <p>{r.desc}</p>
                          <span className={styles.relView}>{t("view")} <ArrowRight className={styles.flip} /></span>
                        </div>
                      </Link>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}
        </Wrapper>
      </section>
    </>
  );
};

export default SerumlarDetails;
