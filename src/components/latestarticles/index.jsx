import React, { useMemo } from "react";
import styles from './index.module.css';
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";
import ScrollReveal from "../scrollreveal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import IllSerum from "../../assets/illustrations/serum-iv.svg";
import IllLab from "../../assets/illustrations/lab-test.svg";
import IllWellness from "../../assets/illustrations/wellness.svg";
import IllInjection from "../../assets/illustrations/injection.svg";
import IllDiabetes from "../../assets/illustrations/diabetes.svg";
import IllBreathing from "../../assets/illustrations/breathing.svg";
import IllHeart from "../../assets/illustrations/heart-health.svg";
import IllSkin from "../../assets/illustrations/skin-care.svg";
import IllStomach from "../../assets/illustrations/stomach.svg";
import IllVirus from "../../assets/illustrations/virus.svg";
import IllInflammation from "../../assets/illustrations/inflammation.svg";
import IllUrinary from "../../assets/illustrations/urinary.svg";
import IllBlood from "../../assets/illustrations/blood-test.svg";
import IllWound from "../../assets/illustrations/wound-care.svg";
import IllPhysio from "../../assets/illustrations/physio.svg";
import IllFAQ from "../../assets/illustrations/faq.svg";

const LatestArticles = () => {
  const articles = useMemo(
    () => [
      { id: 15, img: IllSerum, link: "/details/15", info: "IV Serum Tedavisi", tag: "Tedavi" },
      { id: 16, img: IllSerum, link: "/details/16", info: "IV Terapi", tag: "Tedavi" },
      { id: 17, img: IllLab, link: "/details/17", info: "Laboratuvar Paketleri", tag: "Tahlil" },
      { id: 18, img: IllWellness, link: "/details/18", info: "Sağlıklı Yaşam", tag: "Yaşam" },
      { id: 7, link: "/details/7", img: IllInjection, info: "Enjeksiyon (İğne)", tag: "Hizmet" },
      { id: 2, link: "/details/2", img: IllDiabetes, info: "Diyabet (Şeker Hastalığı)", tag: "Hastalık" },
      { id: 3, link: "/details/3", img: IllBreathing, info: "Astım", tag: "Hastalık" },
      { id: 4, link: "/details/4", img: IllHeart, info: "Kalp Yetmezliği", tag: "Hastalık" },
      { id: 5, link: "/details/5", img: IllSkin, info: "Cilt Lekeleri ve Yorgunluk", tag: "Güzellik" },
      { id: 1, link: "/details/1", img: IllStomach, info: "İshal Durumunda Ne Yapılmalı?", tag: "Sağlık" },
      { id: 6, link: "/details/6", img: IllVirus, info: "Covid-19 (PCR Testi)", tag: "Test" },
      { id: 8, link: "/details/8", img: IllInflammation, info: "İleri Derece İltihaplanmalar", tag: "Hastalık" },
      { id: 9, link: "/details/9", img: IllUrinary, info: "İdrar Yolu Problemleri", tag: "Hastalık" },
      { id: 10, link: "/details/10", img: IllBlood, info: "Evde Kan Alma Hizmeti", tag: "Hizmet" },
      { id: 11, link: "/details/11", img: IllWound, info: "Yara Bakımı ve Pansuman", tag: "Hizmet" },
      { id: 12, link: "/details/12", img: IllBreathing, info: "Solunum Terapisi", tag: "Tedavi" },
      { id: 13, link: "/details/13", img: IllHeart, info: "Kalp ve Tansiyon Takibi", tag: "Hizmet" },
      { id: 14, link: "/details/14", img: IllPhysio, info: "Evde Fizik Tedavi", tag: "Tedavi" },
      { id: 19, img: IllFAQ, link: "/details/19", info: "Sıkça Sorulan Sorular", tag: "SSS" },
    ],
    []
  );

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>Blog & Haberler</span>
            <h2>Son Hizmetlerimiz</h2>
          </div>
          <Link to="/gallery" className={styles.viewAll}>
            Hepsine Bak
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className={styles.slider}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {articles.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={item.link} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img src={item.img} alt={item.info} />
                    <span className={styles.cardTag}>{item.tag}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{item.info}</h3>
                    <span className={styles.readMore}>
                      Devamını Oku <FaArrowRight />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default LatestArticles;
