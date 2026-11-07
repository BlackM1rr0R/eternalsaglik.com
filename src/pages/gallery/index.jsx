import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MagnifyingGlass, X, Clock, ArrowRight, BookOpenText, WhatsappLogo, CalendarCheck, Phone, Sparkle, Info, SquaresFour,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import { Stagger, StaggerItem, SpotlightCard, CountUp } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { articles, translations, CATEGORIES, POPULAR_IDS, categoryLabel } from "../../data/articles";
import { articleImage, CATEGORY_ICONS } from "../../components/latestarticles/images";
import { useLang, useLocalized, useT } from "../../i18n";
import { whatsappUrl } from "../../utils/whatsapp";
import { primaryPhone } from "../../config/site";
import MorphLink from "../../components/morphlink";

const FEATURED_ID = 20;

const dict = {
  tr: {
    badge: "Sağlık Rehberi",
    title: "Sağlık",
    highlight: "Yazıları",
    text: "Hastalıklar, evde bakım, tahliller ve tedaviler hakkında sade, güvenilir ve uygulanabilir bilgiler. Her yazıda belirtiler, ne zaman doktora gidilmeli ve evde bakım önerileri var.",
    seoTitle: "Sağlık Yazıları ve Evde Bakım Rehberi",
    seoDesc: "Diyabet, tansiyon, grip, dehidrasyon, düşmelerin önlenmesi, ameliyat sonrası bakım ve daha fazlası: ETERNAL Sağlık'tan sade dille sağlık yazıları.",
    search: "Yazılarda ara… (ör. tansiyon, grip)",
    searchLabel: "Yazılarda ara",
    clear: "Aramayı temizle",
    all: "Tümü",
    catsLabel: "Yazı kategorileri",
    stats: ["yazı", "konu başlığı", "dilde içerik"],
    featured: "Öne çıkan yazı",
    readMin: "{n} dk okuma",
    read: "Yazıyı oku",
    results: "{n} yazı bulundu",
    empty: "Aramanızla eşleşen bir yazı bulamadık. Farklı bir kelime deneyin ya da sorunuzu bize WhatsApp'tan yazın.",
    picksTitle: "Editörün seçtikleri",
    picksText: "Evde bakım veren ailelerin en çok işine yarayacağını düşündüğümüz yazılar.",
    clustersBadge: "Konular",
    clustersTitle: "Konulara göre keşfedin",
    clustersText: "Merak ettiğiniz alanı seçin, ilgili tüm yazıları birlikte görün.",
    seeAll: "Tümünü göster ({n})",
    catDesc: {
      "Hastalık": "Belirtiler, nedenler ve hastalıkla yaşamaya dair temel bilgiler.",
      "Evde Bakım": "Yaşlı ve hasta bakımında evde dikkat edilmesi gerekenler.",
      "Hizmet": "Evde enjeksiyon, yara bakımı ve takip hizmetleri nasıl işler?",
      "Tedavi": "Serum, IV terapi, solunum ve fizik tedavi uygulamaları.",
      "Tahlil": "Evde kan alma, laboratuvar paketleri ve test hazırlığı.",
      "Yaşam": "Beslenme, uyku ve hareketle sağlığınızı koruyun.",
      "SSS": "Hizmetlerimizle ilgili en sık sorulan sorular.",
    },
    ctaTitle: "Aklınıza takılan bir soru mu var?",
    ctaText: "Yazılar genel bilgi amaçlıdır. Durumunuza özel bilgi almak ya da evde doktor, hemşire veya tahlil hizmeti planlamak için bize ulaşın.",
    ask: "WhatsApp'tan sorun",
    askMsg: "Merhaba, sağlık yazılarınızı okudum ve bir sorum var.",
    book: "Online randevu",
    call: "Hemen arayın",
    disclaimer: "Bu sayfadaki içerikler bilgilendirme amaçlıdır; tanı ve tedavi yerine geçmez. Sağlık sorunlarınız için doktorunuza danışın. Acil durumlarda 112'yi arayın.",
    listName: "ETERNAL Sağlık – Sağlık Yazıları",
  },
  en: {
    badge: "Health Guide",
    title: "Health",
    highlight: "Articles",
    text: "Clear, reliable and practical information about conditions, home care, lab tests and treatments. Every article covers symptoms, when to see a doctor and home-care tips.",
    seoTitle: "Health Articles and Home Care Guide",
    seoDesc: "Diabetes, blood pressure, flu, dehydration, fall prevention, recovery after surgery and more: plain-language health articles from ETERNAL Health.",
    search: "Search articles… (e.g. blood pressure, flu)",
    searchLabel: "Search articles",
    clear: "Clear search",
    all: "All",
    catsLabel: "Article categories",
    stats: ["articles", "topics", "languages"],
    featured: "Featured article",
    readMin: "{n} min read",
    read: "Read article",
    results: "{n} articles found",
    empty: "We couldn't find an article matching your search. Try another word or send us your question on WhatsApp.",
    picksTitle: "Editor's picks",
    picksText: "Articles we think are most useful for families caring for someone at home.",
    clustersBadge: "Topics",
    clustersTitle: "Explore by topic",
    clustersText: "Pick an area you're curious about and see all related articles together.",
    seeAll: "Show all ({n})",
    catDesc: {
      "Hastalık": "Symptoms, causes and the basics of living with a condition.",
      "Evde Bakım": "What to look out for when caring for older or ill people at home.",
      "Hizmet": "How home injections, wound care and monitoring work.",
      "Tedavi": "IV drips, IV therapy, respiratory therapy and physiotherapy.",
      "Tahlil": "Home blood collection, lab packages and test preparation.",
      "Yaşam": "Protect your health through diet, sleep and movement.",
      "SSS": "The most common questions about our services.",
    },
    ctaTitle: "Have a question on your mind?",
    ctaText: "These articles are for general information. Contact us for advice about your situation or to arrange a home doctor, nurse or lab test.",
    ask: "Ask on WhatsApp",
    askMsg: "Hello, I read your health articles and have a question.",
    book: "Book online",
    call: "Call us now",
    disclaimer: "The content on this page is for information only and does not replace diagnosis or treatment. Consult your doctor about health concerns. In an emergency, call 112.",
    listName: "ETERNAL Health – Health Articles",
  },
  ar: {
    badge: "الدليل الصحي",
    title: "مقالات",
    highlight: "صحية",
    text: "معلومات واضحة وموثوقة وعملية عن الأمراض والرعاية المنزلية والتحاليل والعلاجات. يتناول كل مقال الأعراض ومتى تراجع الطبيب ونصائح الرعاية في المنزل.",
    seoTitle: "مقالات صحية ودليل الرعاية المنزلية",
    seoDesc: "السكري وضغط الدم والإنفلونزا والجفاف والوقاية من السقوط والتعافي بعد العمليات وغيرها: مقالات صحية بلغة مبسطة من إيترنال الصحية.",
    search: "ابحث في المقالات… (مثل: الضغط، الإنفلونزا)",
    searchLabel: "ابحث في المقالات",
    clear: "مسح البحث",
    all: "الكل",
    catsLabel: "تصنيفات المقالات",
    stats: ["مقالًا", "موضوعات", "لغات"],
    featured: "مقال مميز",
    readMin: "قراءة {n} دقائق",
    read: "اقرأ المقال",
    results: "تم العثور على {n} مقالًا",
    empty: "لم نجد مقالًا يطابق بحثك. جرّب كلمة أخرى أو أرسل سؤالك عبر واتساب.",
    picksTitle: "اختيارات المحرر",
    picksText: "مقالات نرى أنها الأكثر فائدة للأسر التي ترعى مريضًا أو مسنًّا في المنزل.",
    clustersBadge: "الموضوعات",
    clustersTitle: "استكشف حسب الموضوع",
    clustersText: "اختر المجال الذي يهمك واطّلع على جميع المقالات المتعلقة به.",
    seeAll: "عرض الكل ({n})",
    catDesc: {
      "Hastalık": "الأعراض والأسباب وأساسيات التعايش مع المرض.",
      "Evde Bakım": "ما يجب الانتباه إليه عند رعاية المسنين والمرضى في المنزل.",
      "Hizmet": "كيف تتم خدمات الحقن والعناية بالجروح والمتابعة في المنزل؟",
      "Tedavi": "المحاليل الوريدية والعلاج الوريدي والعلاج التنفسي والطبيعي.",
      "Tahlil": "سحب الدم في المنزل وباقات التحاليل والتحضير للفحص.",
      "Yaşam": "حافظ على صحتك بالتغذية والنوم والحركة.",
      "SSS": "أكثر الأسئلة شيوعًا حول خدماتنا.",
    },
    ctaTitle: "هل لديك سؤال؟",
    ctaText: "المقالات لأغراض المعلومات العامة. تواصل معنا للحصول على معلومات تخص حالتك أو لترتيب زيارة طبيب أو ممرضة أو تحليل في المنزل.",
    ask: "اسأل عبر واتساب",
    askMsg: "مرحبًا، قرأت مقالاتكم الصحية ولدي سؤال.",
    book: "احجز عبر الإنترنت",
    call: "اتصل بنا الآن",
    disclaimer: "المحتوى في هذه الصفحة لأغراض التوعية فقط ولا يغني عن التشخيص أو العلاج. استشر طبيبك بشأن مشكلاتك الصحية. وفي الحالات الطارئة اتصل بالرقم 112.",
    listName: "إيترنال الصحية – مقالات صحية",
  },
};

// Lowercase + strip accents so "tansiyon" finds "Tansiyon" and "sivi" finds "sıvı".
const norm = (s) =>
  String(s || "")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const ArticleMeta = ({ item, t, lang }) => {
  const CatIcon = CATEGORY_ICONS[item.category] || BookOpenText;
  return (
    <div className={styles.meta}>
      <span className={styles.metaCat}><CatIcon weight="duotone" /> {categoryLabel(item.category, lang)}</span>
      <span className={styles.metaTime}><Clock /> {t("readMin", { n: item.readMinutes })}</span>
    </div>
  );
};

const Gallery = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const list = useLocalized(articles, translations, "id");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const topRef = useRef(null);

  const counts = useMemo(() => {
    const c = {};
    list.forEach((a) => { c[a.category] = (c[a.category] || 0) + 1; });
    return c;
  }, [list]);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return list
      .filter((a) => cat === "all" || a.category === cat)
      .filter((a) => !q || norm([a.text, a.textTwo, a.headerText, categoryLabel(a.category, lang), ...(a.symptoms || [])].join(" ")).includes(q))
      .sort((a, b) => b.id - a.id);
  }, [list, query, cat, lang]);

  const browsing = cat === "all" && !query.trim();
  const featured = list.find((a) => a.id === FEATURED_ID);
  const gridItems = browsing ? filtered.filter((a) => a.id !== FEATURED_ID) : filtered;
  const picks = POPULAR_IDS.map((id) => list.find((a) => a.id === id)).filter(Boolean);

  const chooseCat = (c) => {
    setCat(c);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("listName"),
    inLanguage: lang,
    url: "https://eternalsaglik.com/gallery",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `https://eternalsaglik.com/details/${a.id}`, name: a.text })),
    },
  };

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/gallery" jsonLd={jsonLd}>
        <div className={styles.searchBar} role="search">
          <MagnifyingGlass aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")} aria-label={t("searchLabel")} />
          {query && (
            <button type="button" className={styles.clearBtn} onClick={() => setQuery("")} aria-label={t("clear")}>
              <X />
            </button>
          )}
        </div>
        <div className={styles.stats}>
          <span><strong><CountUp to={articles.length} /></strong> {t("stats")[0]}</span>
          <span><strong><CountUp to={CATEGORIES.length} /></strong> {t("stats")[1]}</span>
          <span><strong>3</strong> {t("stats")[2]}</span>
        </div>
      </PageHero>

      <section className={styles.page} ref={topRef}>
        <Wrapper>
          <div className={`${ui.chips} ${styles.chips}`} role="group" aria-label={t("catsLabel")}>
            <button type="button" className={`${ui.chip} ${cat === "all" ? ui.chipActive : ""}`} aria-pressed={cat === "all"} onClick={() => setCat("all")}>
              <SquaresFour /> {t("all")} <span className={styles.count}>{list.length}</span>
            </button>
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c];
              return (
                <button key={c} type="button" className={`${ui.chip} ${cat === c ? ui.chipActive : ""}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                  <Icon /> {categoryLabel(c, lang)} <span className={styles.count}>{counts[c] || 0}</span>
                </button>
              );
            })}
          </div>

          {browsing && featured && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <SpotlightCard as={MorphLink} to={`/details/${featured.id}`} morph={`art-${featured.id}`} className={styles.featured}>
                <div className={styles.featuredImg} data-morph-source="">
                  <img src={articleImage(featured.id)} alt="" loading="lazy" />
                  <span className={styles.ribbon}><Sparkle weight="fill" /> {t("featured")}</span>
                </div>
                <div className={styles.featuredBody}>
                  <ArticleMeta item={featured} t={t} lang={lang} />
                  <h2>{featured.text}</h2>
                  <p>{featured.textTwo}</p>
                  <span className={styles.readLink}>{t("read")} <ArrowRight className={styles.arrow} /></span>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {!browsing && <p className={styles.results} aria-live="polite">{t("results", { n: filtered.length })}</p>}

          <Stagger key={`${cat}|${query}|${lang}`} className={styles.grid} gap={0.06}>
            {gridItems.map((item) => (
              <StaggerItem key={item.id}>
                <SpotlightCard as={MorphLink} to={`/details/${item.id}`} morph={`art-${item.id}`} className={styles.card}>
                  <div className={styles.cardImg} data-morph-source="">
                    <img src={articleImage(item.id)} alt="" loading="lazy" />
                  </div>
                  <div className={styles.cardBody}>
                    <ArticleMeta item={item} t={t} lang={lang} />
                    <h3>{item.text}</h3>
                    <p>{item.textTwo}</p>
                    <span className={styles.readLink}>{t("read")} <ArrowRight className={styles.arrow} /></span>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          {filtered.length === 0 && (
            <div className={`${ui.note} ${styles.empty}`}>
              <Info /> <span>{t("empty")}</span>
            </div>
          )}
        </Wrapper>
      </section>

      {browsing && (
        <>
          <section className={styles.picksSection}>
            <Wrapper>
              <div className={styles.picks}>
                <div className={styles.picksHead}>
                  <h2>{t("picksTitle")}</h2>
                  <p>{t("picksText")}</p>
                </div>
                <Stagger as="ol" className={styles.picksList} gap={0.07}>
                  {picks.map((a, i) => (
                    <StaggerItem as="li" key={a.id}>
                      <Link to={`/details/${a.id}`} className={styles.pick}>
                        <span className={styles.pickNum}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.pickText}>
                          <strong>{a.text}</strong>
                          <small>{categoryLabel(a.category, lang)} · {t("readMin", { n: a.readMinutes })}</small>
                        </span>
                        <ArrowRight className={styles.arrow} />
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Wrapper>
          </section>

          <section className={ui.section}>
            <Wrapper>
              <div className={ui.sectionHead}>
                <span className={ui.badge}>{t("clustersBadge")}</span>
                <h2>{t("clustersTitle")}</h2>
                <p>{t("clustersText")}</p>
              </div>
              <Stagger className={styles.clusters} gap={0.07}>
                {CATEGORIES.map((c) => {
                  const Icon = CATEGORY_ICONS[c];
                  const items = list.filter((a) => a.category === c).sort((a, b) => b.id - a.id);
                  return (
                    <StaggerItem key={c}>
                      <SpotlightCard className={styles.cluster}>
                        <div className={styles.clusterHead}>
                          <span className={styles.clusterIcon}><Icon weight="duotone" /></span>
                          <div>
                            <h3>{categoryLabel(c, lang)}</h3>
                            <p>{t("catDesc")[c]}</p>
                          </div>
                        </div>
                        <ul>
                          {items.slice(0, 3).map((a) => (
                            <li key={a.id}><Link to={`/details/${a.id}`}>{a.text}</Link></li>
                          ))}
                        </ul>
                        <button type="button" className={styles.clusterBtn} onClick={() => chooseCat(c)}>
                          {t("seeAll", { n: items.length })} <ArrowRight className={styles.arrow} />
                        </button>
                      </SpotlightCard>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </Wrapper>
          </section>
        </>
      )}

      <section className={styles.ctaSection}>
        <Wrapper>
          <motion.div className={styles.cta} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2>{t("ctaTitle")}</h2>
            <p>{t("ctaText")}</p>
            <div className={ui.btnRow}>
              <a className={`${ui.btn} ${ui.btnWa}`} href={whatsappUrl(t("askMsg"))} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo weight="fill" /> {t("ask")}
              </a>
              <Link className={`${ui.btn} ${ui.btnPrimary}`} to="/randevu"><CalendarCheck /> {t("book")}</Link>
              <a className={`${ui.btn} ${ui.btnGhost}`} href={`tel:${primaryPhone.tel}`}><Phone /> {t("call")}</a>
            </div>
            <p className={styles.disclaimer}><Info /> {t("disclaimer")}</p>
          </motion.div>
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(Gallery);
