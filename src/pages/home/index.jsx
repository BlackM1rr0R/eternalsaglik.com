import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import Hero from "../../components/hero";
import Main from "../../components/main";
import Logo from "../../components/logo";
import LatestArticles from "../../components/latestarticles";
import CallbackForm from "../../components/callbackform";
import ScrollReveal from "../../components/scrollreveal";
import { AudienceShortcuts, ServiceAreas, ServicesShowcase } from "../../components/homesections";
import VisitStory from "../../components/visitstory";
import { FaqList, faqJsonLd } from "../faq";
import { faqs } from "../../data/faq";
import { useT, useLang } from "../../i18n";
import { WhyEternal, HomeCareExplainer, TrustSafety, RegionsMarquee, FinalCta } from "./sections";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";

const homeFaqs = faqs.slice(0, 5);

const dict = {
  tr: {
    title: "Eternal Sağlık Hizmetleri | Sakarya Evde Sağlık, Evde Doktor ve Serum",
    desc: "Sakarya, Düzce, Kocaeli ve İstanbul'da 7/24 evde doktor, evde hemşire, evde serum, tahlil ve yara bakımı. Online randevu alın.",
    keywords: "Sakarya evde sağlık, evde doktor, evde hemşire, evde serum, evde kan alma, yara bakımı, Eternal Sağlık",
    faqBadge: "SSS",
    faqTitle: "Merak",
    faqAccent: "edilenler",
    faqLead: "Evde sağlık hizmetiyle ilgili en sık sorulan sorular.",
    faqAll: "Tüm sorular",
  },
  en: {
    title: "Eternal Health Services | Home Healthcare, Home Doctor & IV Drips in Sakarya",
    desc: "24/7 home doctor, home nurse, IV drips, lab tests and wound care in Sakarya, Düzce, Kocaeli and Istanbul. Book online.",
    keywords: "home healthcare Sakarya, home doctor, home nurse, IV drip at home, home blood test, wound care, Eternal Health",
    faqBadge: "FAQ",
    faqTitle: "Frequently asked",
    faqAccent: "questions",
    faqLead: "The questions we hear most often about home healthcare.",
    faqAll: "All questions",
  },
  ar: {
    title: "إيترنال للخدمات الصحية | رعاية صحية منزلية وطبيب منزلي ومحاليل في سكاريا",
    desc: "طبيب منزلي وممرض منزلي ومحاليل وريدية وتحاليل وعناية بالجروح على مدار الساعة في سكاريا ودوزجه وكوجالي وإسطنبول. احجز عبر الإنترنت.",
    keywords: "رعاية صحية منزلية سكاريا, طبيب منزلي, ممرض منزلي, محلول وريدي في المنزل, تحليل دم منزلي, العناية بالجروح, إيترنال",
    faqBadge: "الأسئلة الشائعة",
    faqTitle: "أسئلة",
    faqAccent: "متكررة",
    faqLead: "أكثر الأسئلة التي تصلنا عن الرعاية الصحية المنزلية.",
    faqAll: "جميع الأسئلة",
  },
};

const Home = () => {
  const t = useT(dict);
  const { lang } = useLang();

  return (
    <>
      <Helmet>
        <title>{t("title")}</title>
        <meta name="description" content={t("desc")} />
        <meta name="keywords" content={t("keywords")} />
        <link rel="canonical" href="https://eternalsaglik.com/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd(homeFaqs, lang))}</script>
      </Helmet>
      <Hero />
      <Wrapper>
        <AudienceShortcuts />
        <Main />
        <WhyEternal />
        <ServicesShowcase />
        <HomeCareExplainer />
        <VisitStory />
        <TrustSafety />
        <LatestArticles />
        <Logo />
      </Wrapper>
      <RegionsMarquee />
      <Wrapper>
        <ServiceAreas />
        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("faqBadge")}</span>
              <h2>
                {t("faqTitle")} <span className="accent">{t("faqAccent")}</span>
              </h2>
              <p>{t("faqLead")}</p>
            </div>
          </ScrollReveal>
          <FaqList items={homeFaqs} />
          <div className={ui.btnRow}>
            <Link to="/sss" className={`${ui.btn} ${ui.btnGhost}`}>
              {t("faqAll")} <ArrowRight weight="bold" className={styles.flip} />
            </Link>
          </div>
        </section>
        <FinalCta />
        <CallbackForm source="Ana sayfa" />
      </Wrapper>
    </>
  );
};

export default Home;
