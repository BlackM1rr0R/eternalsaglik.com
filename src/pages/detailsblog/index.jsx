import React, { useEffect, useId, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, BookOpenText, ListBullets, Siren, Warning, Stethoscope, CheckCircle, CaretDown,
  WhatsappLogo, CalendarCheck, Phone, Info, Lightbulb, FirstAidKit, Question, House,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import ScrollReveal from "../../components/scrollreveal";
import ListenButton from "../../components/listenbutton";
import ScrollProgress from "../../components/scrollprogress";
import CallbackForm from "../../components/callbackform";
import { Stagger, StaggerItem, SpotlightCard, Float } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { getArticle, getRelated, translations, categoryLabel } from "../../data/articles";
import { articleImage, CATEGORY_ICONS } from "../../components/latestarticles/images";
import { localize, useLang, useT } from "../../i18n";
import { whatsappUrl } from "../../utils/whatsapp";
import { primaryPhone } from "../../config/site";
import MorphTarget from "../../components/morphlink/target";

const dict = {
  tr: {
    home: "Ana Sayfa",
    blog: "Sağlık Yazıları",
    back: "Tüm yazılar",
    crumbs: "Sayfa konumu",
    readMin: "{n} dk okuma",
    toc: "Bu yazıda",
    tocLabel: "İçindekiler",
    secWhat: "Nedir?",
    secSymptoms: "Belirtiler ve dikkat edilecek işaretler",
    secDoctor: "Ne zaman doktora başvurmalı?",
    secKind: "Bilmeniz gerekenler",
    secWhy: "Nedenleri",
    secContent: "Tedavi ve destek",
    secHome: "Evde bakım önerileri",
    secFaq: "Sıkça sorulan sorular",
    secRelated: "İlgili yazılar",
    symptomsNote: "Bu belirtiler başka durumlarda da görülebilir; tanı için doktorunuza danışın.",
    doctorTitle: "Bu durumlarda beklemeyin",
    call112: "112'yi Ara",
    emergencyLine: "Hayati tehlike varsa önce 112'yi arayın.",
    homeIntro: "Genel ve güvenli önerilerdir; hekiminizin size özel talimatları her zaman önceliklidir.",
    contentLabel: "Tedavi ve destek",
    askWa: "WhatsApp'tan sorun",
    askMsg: "Merhaba, \"{title}\" yazınızı okudum, bilgi almak istiyorum.",
    book: "Randevu al",
    callUs: "Ara",
    ctaTitle: "Bu konuda evde destek ister misiniz?",
    ctaText: "Doktor ve hemşire ziyaretleri, evde tahlil, serum, enjeksiyon ve yara bakımı için 7 gün 24 saat ulaşabilirsiniz.",
    callbackTitle: "Bu konuda sizi arayalım",
    disclaimerTitle: "Tıbbi uyarı",
    disclaimer: "Bu yazı genel bilgilendirme amacıyla hazırlanmıştır; tanı, tedavi veya hekim muayenesi yerine geçmez. İlaç başlamadan, bırakmadan ya da dozunu değiştirmeden önce mutlaka doktorunuza danışın. Acil durumlarda 112'yi arayın.",
    notFoundTitle: "Yazı bulunamadı",
    notFoundText: "Aradığınız yazı kaldırılmış ya da adresi değişmiş olabilir.",
    notFoundBtn: "Sağlık yazılarına dön",
    read: "Oku",
    seoSuffix: "ETERNAL Sağlık",
  },
  en: {
    home: "Home",
    blog: "Health Articles",
    back: "All articles",
    crumbs: "Breadcrumb",
    readMin: "{n} min read",
    toc: "In this article",
    tocLabel: "Table of contents",
    secWhat: "What is it?",
    secSymptoms: "Symptoms and signs to watch for",
    secDoctor: "When should you see a doctor?",
    secKind: "Good to know",
    secWhy: "Causes",
    secContent: "Treatment and support",
    secHome: "Home-care tips",
    secFaq: "Frequently asked questions",
    secRelated: "Related articles",
    symptomsNote: "These signs can also occur in other conditions; ask your doctor for a diagnosis.",
    doctorTitle: "Don't wait in these situations",
    call112: "Call 112",
    emergencyLine: "If life is at risk, call 112 first.",
    homeIntro: "These are general, safe tips; your doctor's personal instructions always come first.",
    contentLabel: "Treatment and support",
    askWa: "Ask on WhatsApp",
    askMsg: "Hello, I read your article \"{title}\" and would like some information.",
    book: "Book now",
    callUs: "Call",
    ctaTitle: "Would you like support with this at home?",
    ctaText: "Reach us 7 days a week, 24 hours a day for doctor and nurse visits, home lab tests, IV drips, injections and wound care.",
    callbackTitle: "Let us call you about this",
    disclaimerTitle: "Medical disclaimer",
    disclaimer: "This article is for general information only and does not replace diagnosis, treatment or a medical examination. Always talk to your doctor before starting, stopping or changing the dose of any medicine. In an emergency, call 112.",
    notFoundTitle: "Article not found",
    notFoundText: "The article you are looking for may have been removed or its address may have changed.",
    notFoundBtn: "Back to health articles",
    read: "Read",
    seoSuffix: "ETERNAL Health",
  },
  ar: {
    home: "الرئيسية",
    blog: "مقالات صحية",
    back: "كل المقالات",
    crumbs: "مسار التنقل",
    readMin: "قراءة {n} دقائق",
    toc: "في هذا المقال",
    tocLabel: "جدول المحتويات",
    secWhat: "ما هو؟",
    secSymptoms: "الأعراض والعلامات التي يجب الانتباه إليها",
    secDoctor: "متى يجب مراجعة الطبيب؟",
    secKind: "معلومات مهمة",
    secWhy: "الأسباب",
    secContent: "العلاج والدعم",
    secHome: "نصائح للرعاية في المنزل",
    secFaq: "الأسئلة الشائعة",
    secRelated: "مقالات ذات صلة",
    symptomsNote: "قد تظهر هذه العلامات في حالات أخرى أيضًا، فاستشر طبيبك للتشخيص.",
    doctorTitle: "لا تنتظر في هذه الحالات",
    call112: "اتصل بالرقم 112",
    emergencyLine: "إذا كانت الحياة في خطر فاتصل بالرقم 112 أولًا.",
    homeIntro: "هذه نصائح عامة وآمنة، وتبقى تعليمات طبيبك الخاصة بك هي الأولى دائمًا.",
    contentLabel: "العلاج والدعم",
    askWa: "اسأل عبر واتساب",
    askMsg: "مرحبًا، قرأت مقالكم \"{title}\" وأرغب في الحصول على معلومات.",
    book: "احجز موعدًا",
    callUs: "اتصل",
    ctaTitle: "هل ترغب في دعم منزلي بهذا الشأن؟",
    ctaText: "تواصل معنا 7 أيام في الأسبوع على مدار 24 ساعة لزيارات الطبيب والممرضة والتحاليل المنزلية والمحاليل والحقن والعناية بالجروح.",
    callbackTitle: "دعنا نتصل بك بهذا الشأن",
    disclaimerTitle: "تنبيه طبي",
    disclaimer: "أُعدّ هذا المقال لأغراض التوعية العامة فقط، ولا يغني عن التشخيص أو العلاج أو الفحص الطبي. استشر طبيبك دائمًا قبل بدء أي دواء أو إيقافه أو تغيير جرعته. وفي الحالات الطارئة اتصل بالرقم 112.",
    notFoundTitle: "المقال غير موجود",
    notFoundText: "ربما تمت إزالة المقال الذي تبحث عنه أو تغيّر عنوانه.",
    notFoundBtn: "العودة إلى المقالات الصحية",
    read: "اقرأ",
    seoSuffix: "إيترنال الصحية",
  },
};

const SITE_URL = "https://eternalsaglik.com";

// Highlights the table-of-contents entry for the section currently on screen.
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const els = key.split(",").map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
};

const FaqItem = ({ q, a, open, onToggle }) => {
  const id = useId();
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
      <h3 className={styles.faqQ}>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span>{q}</span>
          <CaretDown className={styles.caret} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} key="a" className={styles.faqA}
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NotFound = ({ t }) => (
  <section className={styles.notFound}>
    <Helmet>
      <title>{`${t("notFoundTitle")} | ${t("seoSuffix")}`}</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <Wrapper>
      <BookOpenText className={styles.notFoundIcon} weight="duotone" />
      <h1>{t("notFoundTitle")}</h1>
      <p>{t("notFoundText")}</p>
      <Link to="/gallery" className={`${ui.btn} ${ui.btnPrimary}`}>{t("notFoundBtn")}</Link>
    </Wrapper>
  </section>
);

const Details = () => {
  const { id } = useParams();
  const t = useT(dict);
  const { lang } = useLang();
  const base = getArticle(id);
  const art = useMemo(() => localize(base, translations, lang, "id"), [base, lang]);
  const related = useMemo(
    () => (base ? getRelated(base.id, 3).map((r) => localize(r, translations, lang, "id")) : []),
    [base, lang]
  );
  const [openFaq, setOpenFaq] = useState(0);

  const sections = useMemo(() => {
    if (!art) return [];
    return [
      { id: "nedir", label: art.headerText || t("secWhat") },
      art.symptoms?.length ? { id: "belirtiler", label: t("secSymptoms") } : null,
      art.whenToSeeDoctor?.length ? { id: "doktor", label: t("secDoctor") } : null,
      { id: "bilgi", label: art.forKind },
      { id: "nedenler", label: art.whyTitle },
      { id: "tedavi", label: t("secContent") },
      art.homeCare?.length ? { id: "evde-bakim", label: t("secHome") } : null,
      art.faqs?.length ? { id: "sss", label: t("secFaq") } : null,
    ].filter(Boolean);
  }, [art, t]);
  const active = useActiveSection(sections.map((s) => s.id));

  useEffect(() => { setOpenFaq(0); }, [id]);

  if (!art) return <NotFound t={t} />;

  const CatIcon = CATEGORY_ICONS[art.category] || BookOpenText;
  const url = `${SITE_URL}/details/${art.id}`;
  const listenText = [
    art.text, art.textTwo, art.headerText, art.aboutHeaderText,
    ...(art.types || []).map((x) => `${x.t}. ${x.d}`),
    art.symptoms?.length ? `${t("secSymptoms")}: ${art.symptoms.join(". ")}` : "",
    art.whenToSeeDoctor?.length ? `${t("secDoctor")} ${art.whenToSeeDoctor.join(". ")}` : "",
    art.forKind, art.aboutKind, art.whyTitle, art.whyText, t("secContent"), art.content,
    art.homeCare?.length ? `${t("secHome")}: ${art.homeCare.join(". ")}` : "",
  ].filter(Boolean).join(". ");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      headline: art.text,
      name: art.text,
      description: art.textTwo,
      inLanguage: lang,
      url,
      mainEntityOfPage: url,
      isAccessibleForFree: true,
      ...(art.category === "Hastalık" ? { about: { "@type": "MedicalCondition", name: art.text } } : {}),
      audience: { "@type": "PeopleAudience", audienceType: "Patients and caregivers" },
      publisher: { "@type": "MedicalBusiness", name: "ETERNAL Sağlık Hizmetleri", url: SITE_URL },
    },
    art.faqs?.length && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: art.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("home"), item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: t("blog"), item: `${SITE_URL}/gallery` },
        { "@type": "ListItem", position: 3, name: art.text, item: url },
      ],
    },
  ].filter(Boolean);

  const scrollTo = (e, sid) => {
    e.preventDefault();
    document.getElementById(sid)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>{`${art.text} | ${t("seoSuffix")}`}</title>
        <meta name="description" content={art.textTwo} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={art.text} />
        <meta property="og:description" content={art.textTwo} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ScrollProgress />

      {/* Hero */}
      <section className={styles.hero}>
        <Wrapper>
          <nav aria-label={t("crumbs")} className={styles.crumbs}>
            <Link to="/"><House /> {t("home")}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/gallery">{t("blog")}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{art.text}</span>
          </nav>

          <div className={styles.heroGrid}>
            <motion.div className={styles.heroInfo} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div className={styles.meta}>
                <Link to="/gallery" className={styles.metaCat}><CatIcon weight="duotone" /> {categoryLabel(art.category, lang)}</Link>
                <span className={styles.metaTime}><Clock /> {t("readMin", { n: art.readMinutes })}</span>
              </div>
              <h1>{art.text}</h1>
              <p className={styles.lead}>{art.textTwo}</p>
              <div className={styles.heroActions}>
                <ListenButton text={listenText} />
                <a className={`${ui.btn} ${ui.btnWa} ${styles.smallBtn}`} href={whatsappUrl(t("askMsg", { title: art.text }))} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo weight="fill" /> {t("askWa")}
                </a>
              </div>
            </motion.div>
            <Float className={styles.heroImage} amplitude={6} duration={7}>
              <MorphTarget name={`art-${art.id}`}>
                <motion.img src={articleImage(art.id)} alt="" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} />
              </MorphTarget>
            </Float>
          </div>
        </Wrapper>
      </section>

      <section className={styles.page}>
        <Wrapper>
          <div className={styles.layout}>
            {/* Table of contents */}
            <aside className={styles.aside}>
              <nav className={styles.toc} aria-label={t("tocLabel")}>
                <p className={styles.tocTitle}><ListBullets /> {t("toc")}</p>
                <ol>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} onClick={(e) => scrollTo(e, s.id)} className={active === s.id ? styles.tocActive : ""}
                        aria-current={active === s.id ? "true" : undefined}>{s.label}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.asideCta}>
                <p>{t("ctaTitle")}</p>
                <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock} ${styles.smallBtn}`}><CalendarCheck /> {t("book")}</Link>
                <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost} ${ui.btnBlock} ${styles.smallBtn}`}><Phone /> {primaryPhone.display}</a>
              </div>
            </aside>

            <article className={styles.article}>
              {/* What is it */}
              <ScrollReveal>
                <section id="nedir" className={styles.block}>
                  <h2>{art.headerText}</h2>
                  <p className={styles.text}>{art.aboutHeaderText}</p>
                  <Stagger className={styles.types} gap={0.08}>
                    {(art.types || []).map((type, i) => (
                      <StaggerItem key={type.t}>
                        <SpotlightCard className={styles.typeCard}>
                          <span className={styles.typeNum}>{String(i + 1).padStart(2, "0")}</span>
                          <h3>{type.t}</h3>
                          <p>{type.d}</p>
                        </SpotlightCard>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </section>
              </ScrollReveal>

              {/* Symptoms */}
              {art.symptoms?.length > 0 && (
                <ScrollReveal>
                  <section id="belirtiler" className={styles.block}>
                    <h2><Stethoscope className={styles.h2Icon} weight="duotone" /> {t("secSymptoms")}</h2>
                    <Stagger as="ul" className={styles.symptoms} gap={0.05}>
                      {art.symptoms.map((s) => (
                        <StaggerItem as="li" key={s} y={14}><span className={styles.dot} aria-hidden="true" />{s}</StaggerItem>
                      ))}
                    </Stagger>
                    <p className={styles.small}><Info /> {t("symptomsNote")}</p>
                  </section>
                </ScrollReveal>
              )}

              {/* When to see a doctor */}
              {art.whenToSeeDoctor?.length > 0 && (
                <ScrollReveal>
                  <section id="doktor" className={`${styles.block} ${styles.doctor}`}>
                    <div className={styles.doctorHead}>
                      <span className={styles.doctorIcon}><Warning weight="fill" /></span>
                      <div>
                        <h2>{t("secDoctor")}</h2>
                        <p>{t("doctorTitle")}</p>
                      </div>
                    </div>
                    <ul>
                      {art.whenToSeeDoctor.map((w) => (
                        <li key={w} className={w.includes("112") ? styles.redFlag : ""}>
                          {w.includes("112") ? <Siren weight="fill" /> : <FirstAidKit weight="duotone" />} <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.doctorFoot}>
                      <span>{t("emergencyLine")}</span>
                      <a href="tel:112" className={`${ui.btn} ${ui.btnDanger} ${styles.smallBtn}`}><Siren weight="fill" /> {t("call112")}</a>
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* Good to know */}
              <ScrollReveal>
                <section id="bilgi" className={`${styles.block} ${styles.infoCard}`}>
                  <h2><Lightbulb className={styles.h2Icon} weight="duotone" /> {art.forKind}</h2>
                  <p className={styles.text}>{art.aboutKind}</p>
                </section>
              </ScrollReveal>

              {/* Causes */}
              <ScrollReveal>
                <section id="nedenler" className={styles.block}>
                  <h2><Question className={styles.h2Icon} weight="duotone" /> {art.whyTitle}</h2>
                  <p className={styles.text}>{art.whyText}</p>
                </section>
              </ScrollReveal>

              {/* Treatment & support */}
              <ScrollReveal>
                <section id="tedavi" className={`${styles.block} ${styles.contentCard}`}>
                  <h2><FirstAidKit className={styles.h2Icon} weight="duotone" /> {t("secContent")}</h2>
                  <p className={styles.text}>{art.content}</p>
                </section>
              </ScrollReveal>

              {/* Home care */}
              {art.homeCare?.length > 0 && (
                <ScrollReveal>
                  <section id="evde-bakim" className={styles.block}>
                    <h2><House className={styles.h2Icon} weight="duotone" /> {t("secHome")}</h2>
                    <p className={styles.small}>{t("homeIntro")}</p>
                    <Stagger as="ul" className={styles.tips} gap={0.06}>
                      {art.homeCare.map((h) => (
                        <StaggerItem as="li" key={h} y={16}><CheckCircle weight="fill" /> <span>{h}</span></StaggerItem>
                      ))}
                    </Stagger>
                  </section>
                </ScrollReveal>
              )}

              {/* FAQ */}
              {art.faqs?.length > 0 && (
                <ScrollReveal>
                  <section id="sss" className={styles.block}>
                    <h2><Question className={styles.h2Icon} weight="duotone" /> {t("secFaq")}</h2>
                    <div className={styles.faq}>
                      {art.faqs.map((f, i) => (
                        <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* Disclaimer */}
              <ScrollReveal>
                <aside className={styles.disclaimer} aria-label={t("disclaimerTitle")}>
                  <Info weight="duotone" />
                  <div>
                    <strong>{t("disclaimerTitle")}</strong>
                    <p>{t("disclaimer")}</p>
                  </div>
                </aside>
              </ScrollReveal>

              {/* CTA + callback */}
              <ScrollReveal>
                <div className={styles.cta}>
                  <h2>{t("ctaTitle")}</h2>
                  <p>{t("ctaText")}</p>
                  <div className={styles.ctaBtns}>
                    <a className={`${ui.btn} ${ui.btnWa}`} href={whatsappUrl(t("askMsg", { title: art.text }))} target="_blank" rel="noopener noreferrer"><WhatsappLogo weight="fill" /> {t("askWa")}</a>
                    <Link className={`${ui.btn} ${ui.btnPrimary}`} to="/randevu"><CalendarCheck /> {t("book")}</Link>
                    <a className={`${ui.btn} ${ui.btnGhost}`} href={`tel:${primaryPhone.tel}`}><Phone /> {t("callUs")}</a>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <CallbackForm title={t("callbackTitle")} source={`Blog: ${base.text}`} />
              </ScrollReveal>
            </article>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className={styles.related}>
              <div className={styles.relatedHead}>
                <h2>{t("secRelated")}</h2>
                <Link to="/gallery" className={styles.backLink}><ArrowLeft className={styles.flip} /> {t("back")}</Link>
              </div>
              <Stagger className={styles.relatedGrid} gap={0.08}>
                {related.map((r) => {
                  const RIcon = CATEGORY_ICONS[r.category] || BookOpenText;
                  return (
                    <StaggerItem key={r.id}>
                      <SpotlightCard as={Link} to={`/details/${r.id}`} className={styles.relCard}>
                        <div className={styles.relImg}><img src={articleImage(r.id)} alt="" loading="lazy" /></div>
                        <div className={styles.relBody}>
                          <span className={styles.relMeta}><RIcon weight="duotone" /> {categoryLabel(r.category, lang)} · {t("readMin", { n: r.readMinutes })}</span>
                          <h3>{r.text}</h3>
                          <span className={styles.relRead}>{t("read")} <ArrowRight className={styles.flip} /></span>
                        </div>
                      </SpotlightCard>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </section>
          )}
        </Wrapper>
      </section>
    </>
  );
};

export default Details;
