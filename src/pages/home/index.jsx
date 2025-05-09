import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper/index";
import Hero from "../../components/hero";
import Main from "../../components/main";
import Logo from "../../components/logo";
import YusifAbout from "../../components/yusifabout";

import LatestArticles from "../../components/latestarticles";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Eternal Sağlık Hizmetleri</title>
        <meta
          name="description"
          content="ETERNAL Sağlık Hizmetleri ile kolayca randevunuzu ayarlayın ve en iyi sağlık hizmetlerini deneyimleyin."
        />
        <meta
          name="keywords"
          content="Randevu, Sağlık Hizmetleri, ETERNAL, Online Randevu, Klinik"
        />

      </Helmet>
      <Hero />
      <Wrapper>
        <Main />
        <YusifAbout />
        <Logo />
        {/* <Hospital />
        <ChatApp /> */}
        <LatestArticles />

      </Wrapper>
    </>
  );
};

export default Home;
