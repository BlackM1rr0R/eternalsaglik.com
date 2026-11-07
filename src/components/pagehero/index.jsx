import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Wrapper from "../UI/wrapper";
import ui from "../../styles/ui.module.css";

// Page header + <head> tags used by the newer pages.
const PageHero = ({ badge, title, highlight, text, seoTitle, seoDesc, path, children, jsonLd }) => (
  <>
    <Helmet>
      <title>{seoTitle || `${title} ${highlight || ""}`.trim()} | ETERNAL Sağlık Hizmetleri</title>
      {seoDesc && <meta name="description" content={seoDesc} />}
      {path && <link rel="canonical" href={`https://eternalsaglik.com${path}`} />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
    <section className={ui.pageHero}>
      <Wrapper>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {badge && <span className={ui.badge}>{badge}</span>}
          <h1>
            {title} {highlight && <span>{highlight}</span>}
          </h1>
          {text && <p>{text}</p>}
          {children}
        </motion.div>
      </Wrapper>
    </section>
  </>
);

export default PageHero;
