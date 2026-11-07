import React, { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CalendarCheck, Check, CheckCircle, Circle, Clock, MapPin, Phone, ShieldCheck, Siren, Sparkle,
  UserCircleCheck, WhatsappLogo, Info, ListChecks, BookOpenText, Lightbulb,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import ListenButton from "../../components/listenbutton";
import CallbackForm from "../../components/callbackform";
import { Stagger, StaggerItem, SpotlightCard, ScrollLine, Magnetic } from "../../components/motion";
import { FaqList, faqJsonLd } from "../faq";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { getService, services, translations } from "../../data/services";
import * as A from "../../data/articles";
import { SITE, primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT, useLang, useLocalized, useLocalizedItem } from "../../i18n";

const dict = {
  tr: {
    badge: "Hizmet",
    book: "Randevu Al",
    wa: "WhatsApp",
    waMsg: "Merhaba, \"{title}\" hakkında bilgi almak istiyorum.",
    navLabel: "Sayfa içi gezinme",
    nav: { about: "Hakkında", includes: "Kapsam", process: "Süreç", prepare: "Hazırlık", faq: "SSS" },
    factDuration: "Süre",
    factRegions: "Bölgeler",
    factHours: "Ulaşılabilirlik",
    hours: "7 gün / 24 saat",
    regions: ["Sakarya", "Düzce", "Kocaeli", "İstanbul"],
    aboutBadge: "Hizmet hakkında",
    aboutTitle: "Bu hizmet",
    aboutAccent: "neleri kapsar?",
    glanceTitle: "Kısaca",
    needLabel: "Ne zaman tercih edilir?",
    forWhoTitle: "Kimler için uygun?",
    durationLabel: "Ziyaret süresi",
    includesBadge: "Kapsam",
    includesTitle: "Bu hizmette",
    includesAccent: "neler var?",
    includesLead: "Ziyaret sırasında ihtiyaca göre aşağıdaki işlemler yapılabilir.",
    processBadge: "Nasıl işler?",
    processTitle: "Adım adım",
    processAccent: "evde ziyaret",
    processLead: "İlk mesajınızdan takip ziyaretine kadar süreç böyle ilerler.",
    stepLabel: "Adım {n}",
    prepareBadge: "Hazırlık",
    prepareTitle: "Ziyaretten önce",
    prepareAccent: "hazırlayın",
    prepareLead: "Hazırladıklarınızı işaretleyin; ziyaret daha hızlı ve rahat geçsin.",
    prepared: "{done}/{total} hazır",
    allReady: "Her şey hazır! Ziyaret için bizi arayabilirsiniz.",
    safetyTitle: "Hijyen ve güvenlik",
    safetyLead: "Her ziyarette dikkat ettiğimiz genel uygulamalar:",
    redFlagTitle: "Acil bir durum mu var?",
    redFlag: "Bilinç kaybı, şiddetli göğüs ağrısı, ani nefes darlığı, felç belirtileri veya ağır kanama varsa beklemeden 112'yi arayın.",
    call112: "112'yi Ara",
    disclaimer: "Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır ve muayenenin yerine geçmez. Size özel öneriler için doktorunuza danışın.",
    faqBadge: "SSS",
    faqTitle: "Sık sorulan",
    faqAccent: "sorular",
    faqLead: "{title} hakkında en çok merak edilenler.",
    allFaq: "Tüm sorular",
    relatedBadge: "Blog",
    relatedTitle: "İlgili",
    relatedAccent: "yazılar",
    readMore: "Devamını oku",
    callbackTitle: "Bu hizmet için sizi arayalım",
    otherBadge: "Diğer hizmetler",
    otherTitle: "Bunlar da",
    otherAccent: "ilginizi çekebilir",
    allServices: "Tüm hizmetler",
    ctaTitle: "Planlamaya hazır mısınız?",
    ctaText: "Arayın, yazın ya da online randevu formunu doldurun; ihtiyacınızı dinleyip size uygun zamanı birlikte belirleyelim.",
    home: "Ana Sayfa",
    services: "Hizmetlerimiz",
  },
  en: {
    badge: "Service",
    book: "Book Now",
    wa: "WhatsApp",
    waMsg: "Hello, I would like information about \"{title}\".",
    navLabel: "On this page",
    nav: { about: "About", includes: "What's included", process: "How it works", prepare: "Preparation", faq: "FAQ" },
    factDuration: "Duration",
    factRegions: "Regions",
    factHours: "Availability",
    hours: "7 days / 24 hours",
    regions: ["Sakarya", "Düzce", "Kocaeli", "Istanbul"],
    aboutBadge: "About the service",
    aboutTitle: "What this",
    aboutAccent: "service covers",
    glanceTitle: "At a glance",
    needLabel: "When to choose it",
    forWhoTitle: "Who is it for?",
    durationLabel: "Visit length",
    includesBadge: "What's included",
    includesTitle: "What the",
    includesAccent: "visit can include",
    includesLead: "Depending on your needs, the following can be done during the visit.",
    processBadge: "How it works",
    processTitle: "A home visit,",
    processAccent: "step by step",
    processLead: "This is how things go, from your first message to the follow-up visit.",
    stepLabel: "Step {n}",
    prepareBadge: "Preparation",
    prepareTitle: "Have these",
    prepareAccent: "ready",
    prepareLead: "Tick off what you have ready so the visit goes quickly and smoothly.",
    prepared: "{done}/{total} ready",
    allReady: "All set! Give us a call to arrange the visit.",
    safetyTitle: "Hygiene and safety",
    safetyLead: "General practices we follow at every visit:",
    redFlagTitle: "Is it an emergency?",
    redFlag: "For loss of consciousness, severe chest pain, sudden breathlessness, signs of stroke or heavy bleeding, call 112 without waiting.",
    call112: "Call 112",
    disclaimer: "The information on this page is general and does not replace an examination. Ask your doctor for advice specific to you.",
    faqBadge: "FAQ",
    faqTitle: "Frequently asked",
    faqAccent: "questions",
    faqLead: "What people most often ask about {title}.",
    allFaq: "All questions",
    relatedBadge: "Blog",
    relatedTitle: "Related",
    relatedAccent: "reading",
    readMore: "Read more",
    callbackTitle: "We'll call you about this service",
    otherBadge: "Other services",
    otherTitle: "You may also",
    otherAccent: "be interested in",
    allServices: "All services",
    ctaTitle: "Ready to plan a visit?",
    ctaText: "Call, message us or fill in the online booking form; we'll listen to what you need and find a suitable time together.",
    home: "Home",
    services: "Services",
  },
  ar: {
    badge: "خدمة",
    book: "احجز موعدًا",
    wa: "واتساب",
    waMsg: "مرحبًا، أودّ الحصول على معلومات عن \"{title}\".",
    navLabel: "التنقل داخل الصفحة",
    nav: { about: "نبذة", includes: "ما تشمله", process: "الخطوات", prepare: "التحضير", faq: "الأسئلة" },
    factDuration: "المدة",
    factRegions: "المناطق",
    factHours: "التوفر",
    hours: "7 أيام / 24 ساعة",
    regions: ["سكاريا", "دوزجة", "كوجالي", "إسطنبول"],
    aboutBadge: "عن الخدمة",
    aboutTitle: "ما الذي",
    aboutAccent: "تشمله هذه الخدمة؟",
    glanceTitle: "باختصار",
    needLabel: "متى تختارها؟",
    forWhoTitle: "لمن تناسب؟",
    durationLabel: "مدة الزيارة",
    includesBadge: "ما تشمله",
    includesTitle: "ماذا تتضمن",
    includesAccent: "هذه الخدمة؟",
    includesLead: "بحسب الحاجة، يمكن إجراء ما يلي خلال الزيارة.",
    processBadge: "كيف تعمل؟",
    processTitle: "الزيارة المنزلية",
    processAccent: "خطوة بخطوة",
    processLead: "هكذا تسير الأمور من رسالتك الأولى حتى زيارة المتابعة.",
    stepLabel: "الخطوة {n}",
    prepareBadge: "التحضير",
    prepareTitle: "جهّز ما يلي",
    prepareAccent: "قبل الزيارة",
    prepareLead: "ضع علامة على ما جهّزته لتكون الزيارة أسرع وأيسر.",
    prepared: "{done}/{total} جاهز",
    allReady: "كل شيء جاهز! يمكنك الاتصال بنا لترتيب الزيارة.",
    safetyTitle: "النظافة والسلامة",
    safetyLead: "ممارسات عامة نحرص عليها في كل زيارة:",
    redFlagTitle: "هل هي حالة طارئة؟",
    redFlag: "عند فقدان الوعي أو ألم الصدر الشديد أو ضيق التنفس المفاجئ أو علامات السكتة الدماغية أو النزيف الشديد، اتصل بالرقم 112 دون انتظار.",
    call112: "اتصل بـ 112",
    disclaimer: "المعلومات في هذه الصفحة عامة ولا تغني عن الفحص الطبي. استشر طبيبك للحصول على توصيات خاصة بك.",
    faqBadge: "الأسئلة الشائعة",
    faqTitle: "الأسئلة",
    faqAccent: "الشائعة",
    faqLead: "أكثر ما يُسأل عنه بخصوص {title}.",
    allFaq: "كل الأسئلة",
    relatedBadge: "المدونة",
    relatedTitle: "مقالات",
    relatedAccent: "ذات صلة",
    readMore: "اقرأ المزيد",
    callbackTitle: "دعنا نتصل بك بخصوص هذه الخدمة",
    otherBadge: "خدمات أخرى",
    otherTitle: "قد تهمّك",
    otherAccent: "أيضًا",
    allServices: "كل الخدمات",
    ctaTitle: "هل أنت مستعد للتخطيط لزيارة؟",
    ctaText: "اتصل بنا أو راسلنا أو املأ نموذج الحجز الإلكتروني؛ سنستمع إلى احتياجك ونحدد معًا الوقت المناسب.",
    home: "الرئيسية",
    services: "خدماتنا",
  },
};

const SECTION_IDS = { about: "hakkinda", includes: "kapsam", process: "surec", prepare: "hazirlik", faq: "sss" };

const Heading = ({ badge, title, accent, lead }) => (
  <ScrollReveal>
    <div className={ui.sectionHead}>
      <span className={ui.badge}>{badge}</span>
      <h2>{title} <span className="accent">{accent}</span></h2>
      {lead && <p>{lead}</p>}
    </div>
  </ScrollReveal>
);

// Tick-off list for "how to prepare": purely local state, nothing is sent anywhere.
const PrepareChecklist = ({ items, t }) => {
  const [done, setDone] = useState(() => new Set());
  const toggle = (i) => setDone((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  const pct = items.length ? (done.size / items.length) * 100 : 0;
  return (
    <div className={`${ui.card} ${styles.checklist}`}>
      <div className={styles.checkHead}>
        <ListChecks weight="duotone" />
        <span>{t("prepared", { done: done.size, total: items.length })}</span>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <motion.span animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
      </div>
      <ul className={styles.checkList}>
        {items.map((x, i) => {
          const on = done.has(i);
          return (
            <li key={x}>
              <button type="button" aria-pressed={on} onClick={() => toggle(i)} className={`${styles.checkItem} ${on ? styles.checkOn : ""}`}>
                <motion.span className={styles.checkBox} animate={{ scale: on ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.3 }}>
                  {on ? <CheckCircle weight="fill" /> : <Circle />}
                </motion.span>
                <span>{x}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {done.size === items.length && items.length > 0 && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={styles.allReady}>
          <Sparkle weight="fill" /> {t("allReady")}
        </motion.p>
      )}
    </div>
  );
};

const ServicePage = () => {
  const { slug } = useParams();
  const t = useT(dict);
  const { lang } = useLang();
  const raw = getService(slug);
  const s = useLocalizedItem(raw, translations, "slug");
  const all = useLocalized(services, translations, "slug");
  const relatedRaw = useMemo(
    () => (raw ? raw.articles.map((id) => (A.getArticle ? A.getArticle(id) : null)).filter(Boolean) : []),
    [raw]
  );
  const related = useLocalized(relatedRaw, A.translations || {}, "id");

  if (!raw || !s) return <Navigate to="/hizmetlerimiz" replace />;
  const Icon = s.icon;
  const regions = t("regions");
  const nav = t("nav");
  const others = all.filter((x) => x.slug !== s.slug);
  const path = `/hizmet/${s.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: SITE.name,
      url: `${SITE.url}${path}`,
      telephone: primaryPhone.tel,
      email: SITE.email,
      address: { "@type": "PostalAddress", streetAddress: SITE.address, addressRegion: "Sakarya", addressCountry: "TR" },
      geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      openingHours: "Mo-Su 00:00-23:59",
      areaServed: regions,
      inLanguage: lang,
      makesOffer: {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.desc, serviceType: s.title, areaServed: regions },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("home"), item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: t("services"), item: `${SITE.url}/hizmetlerimiz` },
        { "@type": "ListItem", position: 3, name: s.title, item: `${SITE.url}${path}` },
      ],
    },
    faqJsonLd(s.faqs, lang),
  ];

  const listenText = [s.title, ...(s.about || [s.intro]), ...s.includes].join(". ");

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={s.title}
        text={s.desc}
        seoTitle={`${s.title} | ${s.keyword}`}
        seoDesc={`${s.keyword}: ${s.desc}`}
        path={path}
        jsonLd={jsonLd}
      >
        <motion.div className={styles.heroIcon} initial={{ opacity: 0, scale: 0.6, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.25 }}>
          <Icon3D icon={<Icon />} tone={s.tone} size={96} float />
        </motion.div>
        <div className={ui.btnRow}>
          <Magnetic>
            <Link to="/randevu" state={{ service: raw.title }} className={`${ui.btn} ${ui.btnPrimary}`}>
              <CalendarCheck /> {t("book")}
            </Link>
          </Magnetic>
          <a href={whatsappUrl(t("waMsg", { title: s.title }))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
            <WhatsappLogo /> {t("wa")}
          </a>
          <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}>
            <Phone /> <span dir="ltr">{primaryPhone.display}</span>
          </a>
        </div>
        <Stagger className={styles.facts} gap={0.1}>
          <StaggerItem className={styles.fact} y={14}>
            <Clock weight="duotone" />
            <div><strong>{t("factHours")}</strong><span>{t("hours")}</span></div>
          </StaggerItem>
          <StaggerItem className={styles.fact} y={14}>
            <MapPin weight="duotone" />
            <div><strong>{t("factRegions")}</strong><span>{regions.join(" · ")}</span></div>
          </StaggerItem>
          <StaggerItem className={styles.fact} y={14}>
            <UserCircleCheck weight="duotone" />
            <div><strong>{t("needLabel")}</strong><span>{s.need}</span></div>
          </StaggerItem>
        </Stagger>
      </PageHero>

      <nav className={styles.subnav} aria-label={t("navLabel")}>
        <div className={styles.subnavInner}>
          {Object.keys(SECTION_IDS).map((k) => (
            <a key={k} href={`#${SECTION_IDS[k]}`} className={styles.subnavLink}>{nav[k]}</a>
          ))}
        </div>
      </nav>

      <Wrapper>
        {/* About */}
        <section className={`${ui.section} ${styles.anchor}`} id={SECTION_IDS.about}>
          <Heading badge={t("aboutBadge")} title={t("aboutTitle")} accent={t("aboutAccent")} />
          <div className={styles.aboutGrid}>
            <ScrollReveal>
              <div className={`${ui.card} ${styles.aboutText}`}>
                {(s.about || [s.intro]).map((p, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }} className={i === 0 ? styles.lead : undefined}>
                    {p}
                  </motion.p>
                ))}
                <ListenButton text={listenText} />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <SpotlightCard className={`${ui.card} ${ui.glass} ${styles.glance}`}>
                <h3><Lightbulb weight="duotone" /> {t("glanceTitle")}</h3>
                <dl className={styles.glanceList}>
                  <div>
                    <dt>{t("needLabel")}</dt>
                    <dd>{s.need}</dd>
                  </div>
                  <div>
                    <dt>{t("durationLabel")}</dt>
                    <dd>{s.duration}</dd>
                  </div>
                </dl>
                <h4>{t("forWhoTitle")}</h4>
                <ul>
                  {s.forWho.map((x) => <li key={x}><UserCircleCheck /> {x}</li>)}
                </ul>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </section>

        {/* What's included */}
        <section className={`${ui.sectionTight} ${styles.anchor}`} id={SECTION_IDS.includes}>
          <Heading badge={t("includesBadge")} title={t("includesTitle")} accent={t("includesAccent")} lead={t("includesLead")} />
          <Stagger className={styles.includes} gap={0.06}>
            {s.includes.map((x, i) => (
              <StaggerItem key={x}>
                <SpotlightCard className={`${ui.card} ${styles.include}`}>
                  <span className={`${styles.includeIcon} ${styles[`tone_${s.tone}`] || ""}`}><Check weight="bold" /></span>
                  <span className={styles.includeNum}>{String(i + 1).padStart(2, "0")}</span>
                  <p>{x}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Process timeline */}
        <section className={`${ui.section} ${styles.anchor}`} id={SECTION_IDS.process}>
          <Heading badge={t("processBadge")} title={t("processTitle")} accent={t("processAccent")} lead={t("processLead")} />
          <div className={styles.timeline}>
            <ScrollLine className={styles.timelineLine} />
            <Stagger as="ol" className={styles.timelineList} gap={0.14}>
              {s.process.map((p, i) => (
                <StaggerItem as="li" key={p.t} className={styles.tItem}>
                  <span className={styles.tDot}>{i + 1}</span>
                  <div className={`${ui.card} ${styles.tCard}`}>
                    <span className={styles.tStep}>{t("stepLabel", { n: i + 1 })}</span>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Preparation + safety */}
        <section className={`${ui.sectionTight} ${styles.anchor}`} id={SECTION_IDS.prepare}>
          <Heading badge={t("prepareBadge")} title={t("prepareTitle")} accent={t("prepareAccent")} lead={t("prepareLead")} />
          <div className={styles.prepGrid}>
            <ScrollReveal>
              <PrepareChecklist key={s.slug + lang} items={s.prepare} t={t} />
            </ScrollReveal>
            <div className={styles.prepSide}>
              <ScrollReveal delay={0.1}>
                <div className={`${ui.card} ${styles.safety}`}>
                  <h3><ShieldCheck weight="duotone" /> {t("safetyTitle")}</h3>
                  <p className={ui.hint}>{t("safetyLead")}</p>
                  <ul>
                    {s.safety.map((x) => <li key={x}><Check /> {x}</li>)}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.18}>
                <div className={`${ui.note} ${ui.noteDanger} ${styles.redFlag}`} role="note">
                  <Siren weight="duotone" />
                  <div>
                    <strong>{t("redFlagTitle")}</strong>
                    <p>{t("redFlag")}</p>
                    <a href="tel:112" className={`${ui.btn} ${ui.btnDanger} ${styles.btnSmall}`}><Phone /> {t("call112")}</a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
          <p className={`${ui.note} ${styles.disclaimer}`}><Info /> <span>{t("disclaimer")}</span></p>
        </section>

        {/* FAQ */}
        <section className={`${ui.section} ${styles.anchor}`} id={SECTION_IDS.faq}>
          <Heading badge={t("faqBadge")} title={t("faqTitle")} accent={t("faqAccent")} lead={t("faqLead", { title: s.title })} />
          <FaqList key={s.slug + lang} items={s.faqs} />
          <div className={ui.btnRow}>
            <Link to="/sss" className={`${ui.btn} ${ui.btnGhost}`}>{t("allFaq")} <ArrowRight /></Link>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className={ui.sectionTight}>
            <Heading badge={t("relatedBadge")} title={t("relatedTitle")} accent={t("relatedAccent")} />
            <Stagger className={styles.related}>
              {related.map((a) => (
                <StaggerItem key={a.id}>
                  <Link to={`/details/${a.id}`} className={`${ui.card} ${ui.glowBorder} ${styles.relCard}`}>
                    <BookOpenText weight="duotone" className={styles.relIcon} />
                    <h3>{a.text}</h3>
                    <p>{a.textTwo}</p>
                    <span className={styles.more}>{t("readMore")} <ArrowRight /></span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        <CallbackForm title={t("callbackTitle")} source={`Hizmet: ${raw.title}`} />

        {/* Other services */}
        <section className={ui.sectionTight}>
          <Heading badge={t("otherBadge")} title={t("otherTitle")} accent={t("otherAccent")} />
          <Stagger className={styles.others} gap={0.05}>
            {others.map((x) => {
              const XIcon = x.icon;
              return (
                <StaggerItem key={x.slug}>
                  <Link to={`/hizmet/${x.slug}`} className={`${ui.card} ${styles.other}`}>
                    <Icon3D icon={<XIcon />} tone={x.tone} size={44} />
                    <span>{x.title}</span>
                    <ArrowRight className={styles.otherArrow} />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className={ui.btnRow}>
            <Link to="/hizmetlerimiz" className={`${ui.btn} ${ui.btnGhost}`}>{t("allServices")} <ArrowRight /></Link>
          </div>
        </section>

        {/* Final CTA */}
        <ScrollReveal>
          <section className={styles.cta}>
            <h2>{t("ctaTitle")}</h2>
            <p>{t("ctaText")}</p>
            <div className={ui.btnRow}>
              <Link to="/randevu" state={{ service: raw.title }} className={`${ui.btn} ${ui.btnPrimary}`}><CalendarCheck /> {t("book")}</Link>
              <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}><Phone /> <span dir="ltr">{primaryPhone.display}</span></a>
            </div>
          </section>
        </ScrollReveal>
      </Wrapper>
    </>
  );
};

export default ServicePage;
