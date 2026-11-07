import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Printer, Warning, Check, ArrowRight, ArrowLeft, Bandaids, Bed, Footprints, Drop, PersonSimpleWalk, Pill, Thermometer,
  Heartbeat, FilePdf, SpeakerHigh, PushPin, Phone, CalendarCheck, Siren, BookOpenText, FirstAidKit,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ListenButton from "../../components/listenbutton";
import Icon3D from "../../components/icon3d";
import { Stagger, StaggerItem, SpotlightCard } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { careGuides, getCareGuide, localizeGuide } from "../../data/careguides";
import * as S from "../../data/services";
import { SITE, primaryPhone } from "../../config/site";
import { localize, useLang, useT } from "../../i18n";

const serviceTr = S.translations || {};

const dict = {
  tr: {
    badge: "Bakım Rehberleri",
    title: "Evde Bakım",
    highlight: "Rehberleri",
    text: "Hasta ve aileler için hazırladığımız, sade dilli ve yazdırılabilir (PDF olarak kaydedilebilir) bakım rehberleri.",
    seoTitle: "Evde Bakım Rehberleri (PDF)",
    seoDesc: "Ameliyat sonrası yara bakımı, bası yarası önleme, diyabetik ayak bakımı, serum sonrası, düşmeleri önleme, sonda bakımı, ilaç düzeni, ateş takibi ve tansiyon ölçümü rehberleri.",
    howTitle: "Rehberler nasıl kullanılır?",
    how: [
      { t: "Okuyun veya dinleyin", d: "Her rehber kısa maddelerden oluşur; dilerseniz sesli dinleyebilirsiniz." },
      { t: "Yazdırın", d: "Yazdır / PDF Kaydet ile çıktısını alın; bakım veren herkesle paylaşın." },
      { t: "Görünür yere asın", d: "Buzdolabı veya yatak başı gibi kolay görülen bir yerde tutun." },
    ],
    open: "Rehberi aç",
    sections: "{n} bölüm",
    disclaimer: "Rehberler genel bilgilendirme amaçlıdır; doktorunuzun size özel talimatlarının yerine geçmez. Acil durumda 112'yi arayın.",
    all: "Tüm rehberler",
    print: "Yazdır / PDF Kaydet",
    seoSuffix: "Bakım Rehberi",
    note: "Bu rehber genel bilgilendirme amaçlıdır; doktorunuzun size özel talimatlarının yerine geçmez. Sorularınız için 7/24 arayabilirsiniz:",
    emergency: "Acil durumda",
    relatedTitle: "Bu konuda destek mi gerekiyor?",
    relatedText: "Ekibimiz evinize gelerek uygulamada ve takipte yardımcı olabilir.",
    book: "Randevu al",
    call: "Ara",
    others: "Diğer rehberler",
    printedFrom: "Bu rehber {url} adresinden yazdırılmıştır.",
  },
  en: {
    badge: "Care Guides",
    title: "Home Care",
    highlight: "Guides",
    text: "Plain-language, printable care guides (save them as PDF) written for patients and their families.",
    seoTitle: "Home Care Guides (PDF)",
    seoDesc: "Guides on wound care after surgery, preventing pressure sores, diabetic foot care, after an IV drip, preventing falls, catheter care, managing medicines, fever and measuring blood pressure.",
    howTitle: "How to use the guides",
    how: [
      { t: "Read or listen", d: "Each guide is made of short points; you can also have it read aloud." },
      { t: "Print it", d: "Use Print / Save as PDF and share it with everyone involved in care." },
      { t: "Keep it visible", d: "Put it somewhere easy to see, such as on the fridge or by the bed." },
    ],
    open: "Open guide",
    sections: "{n} sections",
    disclaimer: "The guides are for general information and do not replace your doctor's personal instructions. In an emergency call 112.",
    all: "All guides",
    print: "Print / Save as PDF",
    seoSuffix: "Care Guide",
    note: "This guide is for general information and does not replace your doctor's personal instructions. You can call us 24/7 with questions:",
    emergency: "In an emergency",
    relatedTitle: "Need help with this?",
    relatedText: "Our team can visit your home to help with care and follow-up.",
    book: "Book a visit",
    call: "Call",
    others: "Other guides",
    printedFrom: "Printed from {url}.",
  },
  ar: {
    badge: "أدلة الرعاية",
    title: "أدلة الرعاية",
    highlight: "المنزلية",
    text: "أدلة رعاية بلغة بسيطة وقابلة للطباعة (يمكن حفظها بصيغة PDF)، أعددناها للمرضى وعائلاتهم.",
    seoTitle: "أدلة الرعاية المنزلية (PDF)",
    seoDesc: "أدلة عن العناية بالجرح بعد العملية، والوقاية من قرح الفراش، والعناية بالقدم السكرية، وما بعد المحلول الوريدي، والوقاية من السقوط، والعناية بالقسطرة، وتنظيم الأدوية، والحمّى، وقياس ضغط الدم.",
    howTitle: "كيف تستخدم الأدلة؟",
    how: [
      { t: "اقرأ أو استمع", d: "يتكوّن كل دليل من نقاط قصيرة، ويمكنك الاستماع إليه صوتياً." },
      { t: "اطبعه", d: "استخدم زر الطباعة / الحفظ PDF وشاركه مع كل من يشارك في الرعاية." },
      { t: "ضعه في مكان ظاهر", d: "احتفظ به في مكان يسهل رؤيته مثل الثلاجة أو بجانب السرير." },
    ],
    open: "افتح الدليل",
    sections: "{n} أقسام",
    disclaimer: "الأدلة للمعلومات العامة ولا تغني عن تعليمات طبيبك الخاصة بك. في الطوارئ اتصل بـ 112.",
    all: "جميع الأدلة",
    print: "طباعة / حفظ PDF",
    seoSuffix: "دليل الرعاية",
    note: "هذا الدليل للمعلومات العامة ولا يغني عن تعليمات طبيبك الخاصة بك. يمكنك الاتصال بنا على مدار الساعة لأي سؤال:",
    emergency: "في الطوارئ",
    relatedTitle: "هل تحتاج إلى مساعدة في ذلك؟",
    relatedText: "يمكن لفريقنا زيارتك في المنزل للمساعدة في الرعاية والمتابعة.",
    book: "احجز موعداً",
    call: "اتصل",
    others: "أدلة أخرى",
    printedFrom: "طُبع هذا الدليل من {url}.",
  },
};

const ICONS = {
  "ameliyat-sonrasi-yara-bakimi": [Bandaids, "teal"],
  "basi-yarasi-onleme": [Bed, "violet"],
  "diyabetik-ayak-bakimi": [Footprints, "blue"],
  "serum-sonrasi": [Drop, "amber"],
  "dusmeleri-onleme": [PersonSimpleWalk, "rose"],
  "sonda-bakimi": [FirstAidKit, "green"],
  "evde-ilac-duzeni": [Pill, "violet"],
  "ates-yonetimi": [Thermometer, "rose"],
  "evde-tansiyon-olcumu": [Heartbeat, "teal"],
};
const iconOf = (slug) => ICONS[slug] || [FilePdf, "teal"];
const HOW_ICONS = [SpeakerHigh, Printer, PushPin];

const useGuides = () => {
  const { lang } = useLang();
  return useMemo(() => careGuides.map((g) => localizeGuide(g, lang)), [lang]);
};

export const CareGuideList = () => {
  const t = useT(dict);
  const guides = useGuides();
  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        text={t("text")}
        seoTitle={t("seoTitle")}
        seoDesc={t("seoDesc")}
        path="/bakim-rehberi"
      />
      <Wrapper>
        <section className={ui.sectionTight}>
          <h2 className={styles.howTitle}>{t("howTitle")}</h2>
          <Stagger className={styles.how}>
            {t("how").map((h, i) => {
              const Ico = HOW_ICONS[i];
              return (
                <StaggerItem key={h.t} className={styles.howItem}>
                  <span className={styles.howNum}>{i + 1}</span>
                  <Ico className={styles.howIcon} aria-hidden="true" />
                  <div>
                    <strong>{h.t}</strong>
                    <p>{h.d}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        <section className={styles.listSection}>
          <Stagger className={ui.grid} gap={0.06}>
            {guides.map((g) => {
              const [Ico, tone] = iconOf(g.slug);
              const danger = g.sections.find((s) => s.danger);
              return (
                <StaggerItem key={g.slug} style={{ height: "100%" }}>
                  <SpotlightCard as={Link} to={`/bakim-rehberi/${g.slug}`} className={`${ui.card} ${ui.glowBorder} ${styles.card}`}>
                    <Icon3D icon={<Ico weight="duotone" />} tone={tone} size={56} />
                    <h3>{g.title}</h3>
                    <p>{g.summary}</p>
                    <ul className={styles.toc}>
                      {g.sections.filter((s) => !s.danger).slice(0, 3).map((s) => <li key={s.h}><Check aria-hidden="true" /> {s.h}</li>)}
                    </ul>
                    {danger && <p className={styles.cardDanger}><Warning aria-hidden="true" /> {danger.h}</p>}
                    <span className={styles.cardFoot}>
                      <span className={styles.meta}>{t("sections", { n: g.sections.length })}</span>
                      <span className={styles.open}>{t("open")} <ArrowRight className={styles.arrow} aria-hidden="true" /></span>
                    </span>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className={ui.note} style={{ marginTop: 32 }}>
            <Warning aria-hidden="true" />
            <span>{t("disclaimer")}</span>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export const CareGuideDetail = () => {
  const { slug } = useParams();
  const t = useT(dict);
  const { lang } = useLang();
  const base = getCareGuide(slug);
  const g = useMemo(() => (base ? localizeGuide(base, lang) : null), [base, lang]);
  const others = useGuides().filter((x) => x.slug !== slug).slice(0, 3);
  if (!g) return <Navigate to="/bakim-rehberi" replace />;

  const svcBase = g.service && S.getService ? S.getService(g.service) : null;
  const svc = svcBase ? localize(svcBase, serviceTr, lang, "slug") : null;
  const [Ico, tone] = iconOf(g.slug);
  const speech = [g.title, g.summary, ...g.sections.flatMap((s) => [s.h, ...s.items])].join(". ");
  const url = SITE.url.replace("https://", "");

  return (
    <section className={ui.page}>
      <Helmet>
        <title>{`${g.title} | ${t("seoSuffix")} | ETERNAL Sağlık`}</title>
        <meta name="description" content={g.summary} />
        <link rel="canonical" href={`${SITE.url}/bakim-rehberi/${g.slug}`} />
      </Helmet>
      <Wrapper>
        <article className={`${ui.prose} ${styles.article}`}>
          <Link to="/bakim-rehberi" className={`no-print ${styles.back}`}>
            <ArrowLeft className={styles.backIcon} aria-hidden="true" /> {t("all")}
          </Link>

          <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={styles.head}>
            <div className="no-print"><Icon3D icon={<Ico weight="duotone" />} tone={tone} size={64} float /></div>
            <p className={ui.hint}>{SITE.name} · <span dir="ltr">{primaryPhone.display}</span> · {url}</p>
            <h1 className={styles.h1}>{g.title}</h1>
            <p className={styles.summary}>{g.summary}</p>
            <div className={`no-print ${styles.actions}`}>
              <button type="button" onClick={() => window.print()} className={`${ui.btn} ${ui.btnPrimary}`} style={{ marginTop: 12 }}>
                <Printer /> {t("print")}
              </button>
              <ListenButton text={speech} />
            </div>
          </motion.header>

          <Stagger gap={0.07}>
            {g.sections.map((s) => (
              <StaggerItem key={s.h} as="section" className={`${styles.block} ${s.danger ? styles.blockDanger : ""}`}>
                <h2 className={styles.blockTitle}>
                  {s.danger ? <Siren aria-hidden="true" /> : <BookOpenText aria-hidden="true" />} {s.h}
                </h2>
                <ul className={styles.items}>
                  {s.items.map((it) => (
                    <li key={it}>
                      {s.danger ? <Warning className={styles.iDanger} aria-hidden="true" /> : <Check className={styles.iOk} weight="bold" aria-hidden="true" />}
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {s.danger && (
                  <a href="tel:112" className={`no-print ${ui.btn} ${ui.btnDanger} ${styles.sosBtn}`}><Phone /> 112</a>
                )}
              </StaggerItem>
            ))}
          </Stagger>

          <div className={ui.note} style={{ marginTop: 30 }}>
            <Warning aria-hidden="true" />
            <span>
              {t("note")} <strong dir="ltr">{primaryPhone.display}</strong>. {t("emergency")}: <strong>112</strong>.
            </span>
          </div>
          <p className={styles.printOnly}>{t("printedFrom", { url: `${url}/bakim-rehberi/${g.slug}` })}</p>

          {svc && (
            <div className={`no-print ${ui.card} ${styles.related}`}>
              <div>
                <h2>{t("relatedTitle")}</h2>
                <p>{t("relatedText")}</p>
                <Link to={`/hizmet/${svc.slug}`} className={styles.relatedLink}>{svc.title} <ArrowRight className={styles.arrow} aria-hidden="true" /></Link>
              </div>
              <div className={styles.relatedBtns}>
                <Link to="/randevu" state={{ service: svcBase.title }} className={`${ui.btn} ${ui.btnPrimary}`}><CalendarCheck /> {t("book")}</Link>
                <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}><Phone /> {t("call")}</a>
              </div>
            </div>
          )}
        </article>

        <section className={`no-print ${styles.others}`}>
          <h2>{t("others")}</h2>
          <Stagger className={ui.grid}>
            {others.map((o) => {
              const [OIco, otone] = iconOf(o.slug);
              return (
                <StaggerItem key={o.slug} style={{ height: "100%" }}>
                  <Link to={`/bakim-rehberi/${o.slug}`} className={`${ui.card} ${ui.glowBorder} ${styles.card}`}>
                    <Icon3D icon={<OIco weight="duotone" />} tone={otone} size={48} />
                    <h3>{o.title}</h3>
                    <p>{o.summary}</p>
                    <span className={styles.open}>{t("open")} <ArrowRight className={styles.arrow} aria-hidden="true" /></span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      </Wrapper>
    </section>
  );
};
