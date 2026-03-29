import React from "react";
import Wrapper from "../../components/UI/wrapper/index";
import Hero from "../../components/hero";
import Main from "../../components/main";
import Logo from "../../components/logo";
import YusifAbout from "../../components/yusifabout";
import LatestArticles from "../../components/latestarticles";
import CTASection from "../../components/cta";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Eternal Sağlık Hizmetleri | Evde Sağlık</title>
        <meta
          name="description"
          content="ETERNAL Sağlık Hizmetleri ile kolayca randevunuzu ayarlayın ve en iyi sağlık hizmetlerini deneyimleyin."
        />
        <meta
          name="keywords"
          content="Randevu, Sağlık Hizmetleri, ETERNAL, Online Randevu, Klinik, Evde Sağlık"
        />
      </Helmet>
      <Hero />
      <Wrapper>
        <Main />
        <YusifAbout />
        <LatestArticles />
        <CTASection />
        <Logo />
      </Wrapper>
    </>
  );
};

export default Home;
