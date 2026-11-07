import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Wrapper from "../../components/UI/wrapper";
import Hero from "../../components/hero";
import Main from "../../components/main";
import Logo from "../../components/logo";
import LatestArticles from "../../components/latestarticles";
import CallbackForm from "../../components/callbackform";
import ScrollReveal from "../../components/scrollreveal";
import { AudienceShortcuts, HowItWorks, ServiceAreas, ServicesShowcase } from "../../components/homesections";
import { FaqList, faqJsonLd } from "../faq";
import { faqs } from "../../data/faq";
import ui from "../../styles/ui.module.css";

const homeFaqs = faqs.slice(0, 5);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Eternal Sağlık Hizmetleri | Sakarya Evde Sağlık, Evde Doktor ve Serum</title>
        <meta
          name="description"
          content="Sakarya, Düzce, Kocaeli ve İstanbul'da 7/24 evde doktor, evde hemşire, evde serum, tahlil ve yara bakımı. Online randevu alın."
        />
        <meta
          name="keywords"
          content="Sakarya evde sağlık, evde doktor, evde hemşire, evde serum, evde kan alma, yara bakımı, Eternal Sağlık"
        />
        <link rel="canonical" href="https://eternalsaglik.com/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd(homeFaqs))}</script>
      </Helmet>
      <Hero />
      <Wrapper>
        <AudienceShortcuts />
        <Main />
        <ServicesShowcase />
        <HowItWorks />
        <LatestArticles />
        <Logo />
        <ServiceAreas />
        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>SSS</span>
              <h2>Merak edilenler</h2>
            </div>
          </ScrollReveal>
          <FaqList items={homeFaqs} />
          <div className={ui.btnRow}>
            <Link to="/sss" className={`${ui.btn} ${ui.btnGhost}`}>Tüm sorular</Link>
          </div>
        </section>
        <CallbackForm source="Ana sayfa" />
      </Wrapper>
    </>
  );
};

export default Home;
