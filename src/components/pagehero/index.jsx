import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Wrapper from "../UI/wrapper";
import ui from "../../styles/ui.module.css";
import AnimatedText from "../animatedtext";
import { useLang } from "../../i18n";

const BRAND = { tr: "ETERNAL Sağlık Hizmetleri", en: "ETERNAL Health Services", ar: "إيترنال للخدمات الصحية" };

// Page header + <head> tags used by the newer pages.
const PageHero = ({ badge, title, highlight, text, seoTitle, seoDesc, path, children, jsonLd }) => {
  const { lang } = useLang();
  return (
  <>
    <Helmet>
      <title>{seoTitle || `${title} ${highlight || ""}`.trim()} | {BRAND[lang] || BRAND.tr}</title>
      {seoDesc && <meta name="description" content={seoDesc} />}
      {path && <link rel="canonical" href={`https://eternalsaglik.com${path}`} />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
    <section className={ui.pageHero}>
      <Wrapper>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {badge && <span className={ui.badge}>{badge}</span>}
          <AnimatedText lines={highlight ? [title, { text: highlight, accent: true }] : [title]} delay={0.1} />
          {text && <p>{text}</p>}
          {children}
        </motion.div>
      </Wrapper>
    </section>
  </>
  );
};

export default PageHero;
