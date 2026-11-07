import React, { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretDown, WhatsappLogo, Phone, MagnifyingGlass, X, Info, CalendarCheck, Drop, TestTube, Wallet, ShieldCheck, Siren,
  SquaresFour, ChatCircleDots, ArrowRight, BookOpenText, Heartbeat, Question,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import { Stagger, StaggerItem, SpotlightCard } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { faqs, faqCategories, translations } from "../../data/faq";
import { primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { localize, useLang, useT } from "../../i18n";

const dict = {
  tr: {
    badge: "SSS",
    title: "Sıkça Sorulan",
    highlight: "Sorular",
    text: "Randevu, ziyaret süreci, serum, tahlil, ödeme, gizlilik ve acil durumlar hakkında merak ettikleriniz tek sayfada.",
    seoTitle: "Sıkça Sorulan Sorular – Evde Sağlık Hizmeti",
    seoDesc: "Evde sağlık hizmeti, randevu, hizmet bölgeleri, serum uygulaması, evde tahlil, ödeme, gizlilik ve acil durumlar hakkında sıkça sorulan sorular.",
    search: "Sorularda ara…",
    searchLabel: "Sorularda ara",
    clear: "Aramayı temizle",
    all: "Tümü",
    cats: { genel: "Genel", randevu: "Randevu & Ziyaret", serum: "Serum & IV", tahlil: "Tahlil", odeme: "Ödeme & İptal", gizlilik: "Gizlilik", acil: "Acil Durumlar" },
    tabs: "Soru kategorileri",
    count: "{n} soru",
    empty: "Aramanızla eşleşen bir soru bulamadık. Farklı bir kelime deneyin ya da sorunuzu bize doğrudan yazın.",
    emergencyTitle: "Hayati tehlike mi var?",
    emergencyText: "Bilinç kaybı, şiddetli göğüs ağrısı, ağır nefes darlığı veya durdurulamayan kanamada beklemeyin.",
    call112: "112'yi Ara",
    ctaTitle: "Sorunuzun yanıtını bulamadınız mı?",
    ctaText: "Ekibimiz 7 gün 24 saat ulaşılabilir. Sorunuzu yazın, size uygun bilgiyi paylaşalım.",
    ask: "WhatsApp'tan sorun",
    askMsg: "Merhaba, bir sorum var.",
    callUs: "Hemen arayın",
    chat: "Asistana sorun",
    book: "Online randevu",
    moreTitle: "Daha fazla bilgi",
    more: [
      { to: "/belirti-rehberi", title: "Belirti Rehberi", text: "Vücut haritasından size uygun hizmeti bulun." },
      { to: "/bakim-rehberi", title: "Bakım Rehberleri", text: "Yazdırılabilir evde bakım rehberleri." },
      { to: "/kvkk", title: "KVKK ve Gizlilik", text: "Verilerinizin nasıl işlendiğini okuyun." },
    ],
  },
  en: {
    badge: "FAQ",
    title: "Frequently Asked",
    highlight: "Questions",
    text: "Everything you may want to know about booking, home visits, IV drips, tests, payment, privacy and emergencies — on one page.",
    seoTitle: "Frequently Asked Questions – Home Healthcare",
    seoDesc: "Frequently asked questions about home healthcare, booking, service areas, IV drips, home blood tests, payment, privacy and emergencies.",
    search: "Search the questions…",
    searchLabel: "Search the questions",
    clear: "Clear search",
    all: "All",
    cats: { genel: "General", randevu: "Booking & Visits", serum: "IV Drips", tahlil: "Tests", odeme: "Payment & Cancellation", gizlilik: "Privacy", acil: "Emergencies" },
    tabs: "Question categories",
    count: "{n} questions",
    empty: "No question matches your search. Try another word or send us your question directly.",
    emergencyTitle: "Is life in danger?",
    emergencyText: "Do not wait in case of loss of consciousness, severe chest pain, severe shortness of breath or bleeding that will not stop.",
    call112: "Call 112",
    ctaTitle: "Couldn't find your answer?",
    ctaText: "Our team is available 7 days a week, 24 hours a day. Send us your question and we will share the information you need.",
    ask: "Ask on WhatsApp",
    askMsg: "Hello, I have a question.",
    callUs: "Call us now",
    chat: "Ask the assistant",
    book: "Book online",
    moreTitle: "More information",
    more: [
      { to: "/belirti-rehberi", title: "Symptom Guide", text: "Use the body map to find the right service." },
      { to: "/bakim-rehberi", title: "Care Guides", text: "Printable home-care guides." },
      { to: "/kvkk", title: "KVKK & Privacy", text: "Read how your data is processed." },
    ],
  },
  ar: {
    badge: "الأسئلة الشائعة",
    title: "الأسئلة",
    highlight: "الشائعة",
    text: "كل ما قد ترغب في معرفته عن الحجز والزيارات المنزلية والمحاليل الوريدية والتحاليل والدفع والخصوصية والحالات الطارئة في صفحة واحدة.",
    seoTitle: "الأسئلة الشائعة – الرعاية الصحية المنزلية",
    seoDesc: "أسئلة شائعة عن الرعاية الصحية المنزلية والحجز ومناطق الخدمة والمحاليل الوريدية وتحاليل الدم المنزلية والدفع والخصوصية والطوارئ.",
    search: "ابحث في الأسئلة…",
    searchLabel: "ابحث في الأسئلة",
    clear: "مسح البحث",
    all: "الكل",
    cats: { genel: "عام", randevu: "الحجز والزيارة", serum: "المحاليل الوريدية", tahlil: "التحاليل", odeme: "الدفع والإلغاء", gizlilik: "الخصوصية", acil: "الطوارئ" },
    tabs: "فئات الأسئلة",
    count: "{n} سؤال",
    empty: "لم نجد سؤالاً يطابق بحثك. جرّب كلمة أخرى أو أرسل سؤالك إلينا مباشرة.",
    emergencyTitle: "هل الحياة في خطر؟",
    emergencyText: "لا تنتظر عند فقدان الوعي أو ألم الصدر الشديد أو ضيق التنفس الشديد أو النزيف الذي لا يتوقف.",
    call112: "اتصل بـ 112",
    ctaTitle: "لم تجد إجابة سؤالك؟",
    ctaText: "فريقنا متاح 7 أيام في الأسبوع و24 ساعة في اليوم. أرسل سؤالك وسنشاركك المعلومات المناسبة.",
    ask: "اسأل عبر واتساب",
    askMsg: "مرحباً، لدي سؤال.",
    callUs: "اتصل بنا الآن",
    chat: "اسأل المساعد",
    book: "احجز إلكترونياً",
    moreTitle: "مزيد من المعلومات",
    more: [
      { to: "/belirti-rehberi", title: "دليل الأعراض", text: "استخدم خريطة الجسم للعثور على الخدمة المناسبة." },
      { to: "/bakim-rehberi", title: "أدلة الرعاية", text: "أدلة رعاية منزلية قابلة للطباعة." },
      { to: "/kvkk", title: "الخصوصية وKVKK", text: "اقرأ كيف تُعالَج بياناتك." },
    ],
  },
};

const CAT_ICONS = { genel: Info, randevu: CalendarCheck, serum: Drop, tahlil: TestTube, odeme: Wallet, gizlilik: ShieldCheck, acil: Siren };
const MORE_ICONS = [Heartbeat, BookOpenText, ShieldCheck];

// Items with an id are translated from data/faq.js; items without one (local FAQs passed by other pages) render as given.
const localizeFaqs = (items, lang) => items.map((f) => (f.id ? localize(f, translations, lang, "id") : f));

const currentLang = () => (typeof document !== "undefined" && ["en", "ar"].includes(document.documentElement.lang) ? document.documentElement.lang : "tr");

// Accordion with height animation. `items` defaults to every FAQ.
export const FaqList = ({ items = faqs, defaultOpen = 0 }) => {
  const { lang } = useLang();
  const uid = useId();
  const list = useMemo(() => localizeFaqs(items, lang), [items, lang]);
  const keyOf = (f, i) => f.id || `${i}-${f.q}`;
  const [open, setOpen] = useState(() => (list[defaultOpen] ? keyOf(list[defaultOpen], defaultOpen) : null));

  return (
    <div className={styles.list}>
      <AnimatePresence initial={false}>
        {list.map((f, i) => {
          const k = keyOf(f, i);
          const isOpen = open === k;
          const panelId = `${uid}-p-${i}`;
          const btnId = `${uid}-b-${i}`;
          return (
            <motion.div key={k} layout="position" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`} id={f.id ? `sss-${f.id}` : undefined}>
              <h3 className={styles.qWrap}>
                <button type="button" id={btnId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : k)} className={styles.q}>
                  <span className={styles.qIcon} aria-hidden="true"><Question /></span>
                  <span className={styles.qText}>{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className={styles.caret} aria-hidden="true"><CaretDown weight="bold" /></motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={panelId} role="region" aria-labelledby={btnId} key="a"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                    <p className={styles.a}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// FAQPage structured data. Pass `lang` (from useLang) for the active language; defaults to the document language.
export const faqJsonLd = (items = faqs, lang = currentLang()) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: lang,
  mainEntity: localizeFaqs(items, lang).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const Faq = () => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const cats = t("cats");
  const all = useMemo(() => localizeFaqs(faqs, lang), [lang]);

  const locale = meta.locale;
  const q = query.trim().toLocaleLowerCase(locale);
  const filtered = useMemo(
    () => faqs.filter((f, i) => (cat === "all" || f.cat === cat) && (!q || `${all[i].q} ${all[i].a}`.toLocaleLowerCase(locale).includes(q))),
    [cat, q, all, locale]
  );
  const countFor = (c) => (c === "all" ? faqs.length : faqs.filter((f) => f.cat === c).length);

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        text={t("text")}
        seoTitle={t("seoTitle")}
        seoDesc={t("seoDesc")}
        path="/sss"
        jsonLd={faqJsonLd(faqs, lang)}
      >
        <div className={styles.search}>
          <MagnifyingGlass className={styles.searchIcon} aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("search")} aria-label={t("searchLabel")} />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label={t("clear")} className={styles.clear}><X weight="bold" /></button>
          )}
        </div>
      </PageHero>

      <Wrapper>
        <section className={styles.body}>
          <div className={styles.tabs} role="tablist" aria-label={t("tabs")}>
            {["all", ...faqCategories].map((c) => {
              const Ico = c === "all" ? SquaresFour : CAT_ICONS[c];
              const active = cat === c;
              return (
                <button key={c} type="button" role="tab" aria-selected={active} onClick={() => setCat(c)} className={`${styles.tab} ${active ? styles.tabActive : ""}`}>
                  {active && <motion.span layoutId="faq-tab" className={styles.tabBg} transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <Ico className={styles.tabIcon} aria-hidden="true" />
                  <span>{c === "all" ? t("all") : cats[c]}</span>
                  <span className={styles.tabCount}>{countFor(c)}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.layout}>
            <div>
              <p className={styles.resultCount} aria-live="polite">{t("count", { n: filtered.length })}</p>
              {filtered.length ? (
                <FaqList key={`${cat}|${q}`} items={filtered} defaultOpen={0} />
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${ui.card} ${styles.empty}`}>
                  <MagnifyingGlass aria-hidden="true" />
                  <p>{t("empty")}</p>
                  <a href={whatsappUrl(`${t("askMsg")} ${query}`)} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
                    <WhatsappLogo /> {t("ask")}
                  </a>
                </motion.div>
              )}
            </div>

            <aside className={styles.aside}>
              <div className={`${ui.note} ${ui.noteDanger} ${styles.sos}`}>
                <Siren aria-hidden="true" />
                <div>
                  <strong>{t("emergencyTitle")}</strong>
                  <p>{t("emergencyText")}</p>
                  <a href="tel:112" className={`${ui.btn} ${ui.btnDanger}`}><Phone /> {t("call112")}</a>
                </div>
              </div>
              <SpotlightCard className={`${ui.card} ${styles.cta}`}>
                <ChatCircleDots className={styles.ctaIcon} aria-hidden="true" />
                <h2>{t("ctaTitle")}</h2>
                <p>{t("ctaText")}</p>
                <div className={styles.ctaBtns}>
                  <a href={whatsappUrl(t("askMsg"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa} ${ui.btnBlock}`}>
                    <WhatsappLogo /> {t("ask")}
                  </a>
                  <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost} ${ui.btnBlock}`}>
                    <Phone /> {t("callUs")} <span dir="ltr">{primaryPhone.display}</span>
                  </a>
                  <button type="button" onClick={() => window.dispatchEvent(new Event("eternal:chat"))} className={`${ui.btn} ${ui.btnGhost} ${ui.btnBlock}`}>
                    <ChatCircleDots /> {t("chat")}
                  </button>
                  <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
                    <CalendarCheck /> {t("book")}
                  </Link>
                </div>
              </SpotlightCard>
            </aside>
          </div>

          <h2 className={styles.moreTitle}>{t("moreTitle")}</h2>
          <Stagger className={styles.more}>
            {t("more").map((m, i) => {
              const Ico = MORE_ICONS[i];
              return (
                <StaggerItem key={m.to}>
                  <Link to={m.to} className={`${ui.card} ${ui.glowBorder} ${styles.moreCard}`}>
                    <Ico className={styles.moreIcon} aria-hidden="true" />
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                    <ArrowRight className={styles.moreArrow} aria-hidden="true" />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      </Wrapper>
    </>
  );
};

export default Faq;
