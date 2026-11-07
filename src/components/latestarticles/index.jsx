import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight, Clock, BookOpenText } from "@phosphor-icons/react";
import ScrollReveal from "../scrollreveal";
import { SpotlightCard } from "../motion";
import styles from "./index.module.css";
import { articles, translations, categoryLabel } from "../../data/articles";
import { articleImage, CATEGORY_ICONS } from "./images";
import { useLang, useLocalized, useT } from "../../i18n";
import "swiper/css";
import "swiper/css/pagination";

const dict = {
  tr: { badge: "Sağlık Rehberi", title: "Son", accent: "Yazılarımız", text: "Evde bakım, hastalıklar ve tahliller hakkında sade dille hazırlanmış rehber yazılar.", all: "Tüm Yazılar", read: "Devamını Oku", readMin: "{n} dk", region: "Son sağlık yazıları" },
  en: { badge: "Health Guide", title: "Latest", accent: "Articles", text: "Plain-language guides on home care, health conditions and lab tests.", all: "All Articles", read: "Read More", readMin: "{n} min", region: "Latest health articles" },
  ar: { badge: "الدليل الصحي", title: "أحدث", accent: "المقالات", text: "أدلة بلغة مبسطة حول الرعاية المنزلية والأمراض والتحاليل.", all: "كل المقالات", read: "اقرأ المزيد", readMin: "{n} د", region: "أحدث المقالات الصحية" },
};

// Newest first; the FAQ article is skipped (it has its own page).
const ORDER = [20, 21, 22, 23, 24, 25, 15, 10, 2, 13, 11, 17, 4, 3, 1, 9, 14, 18];

const LatestArticles = () => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const list = useLocalized(articles, translations, "id");
  const items = useMemo(() => ORDER.map((id) => list.find((a) => a.id === id)).filter(Boolean), [list]);

  return (
    <section className={styles.section} aria-label={t("region")}>
      <ScrollReveal>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>{t("badge")}</span>
            <h2>{t("title")} <span className="accent">{t("accent")}</span></h2>
            <p className={styles.sub}>{t("text")}</p>
          </div>
          <Link to="/gallery" className={styles.viewAll}>
            {t("all")} <ArrowRight className={styles.arrow} />
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className={styles.slider} dir={meta.dir}>
          <Swiper
            key={lang}
            dir={meta.dir}
            modules={[Autoplay, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={1.08}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {items.map((item) => {
              const Icon = CATEGORY_ICONS[item.category] || BookOpenText;
              return (
                <SwiperSlide key={item.id} className={styles.slide}>
                  <SpotlightCard as={Link} to={`/details/${item.id}`} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img src={articleImage(item.id)} alt="" loading="lazy" />
                      <span className={styles.cardTag}><Icon weight="duotone" /> {categoryLabel(item.category, lang)}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <span className={styles.time}><Clock /> {t("readMin", { n: item.readMinutes })}</span>
                      <h3>{item.text}</h3>
                      <p>{item.textTwo}</p>
                      <span className={styles.readMore}>
                        {t("read")} <ArrowRight className={styles.arrow} />
                      </span>
                    </div>
                  </SpotlightCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default LatestArticles;
