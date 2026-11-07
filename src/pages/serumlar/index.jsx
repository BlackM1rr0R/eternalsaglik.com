import React, { useState } from "react";
import { serumList, serumCategories } from "../../data/serums";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import SerumSVG from "../../components/serumcard";
import { motion } from "framer-motion";
import { FaSearch, FaSyringe, FaArrowRight, FaStar, FaFilter, FaWhatsapp, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../../utils/whatsapp";
import ui from "../../styles/ui.module.css";

const categories = serumCategories;

const Serumlar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const photos = serumList;

  const filtered = photos.filter((p) => {
    // Turkish-aware lower-casing so "İ"/"I" searches match.
    const matchSearch = p.info.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr"));
    const matchCategory = activeCategory === "Tümü" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Helmet>
        <title>Serumlar & IV Terapi | Eternal Sağlık Hizmetleri</title>
        <meta name="description" content="24 farklı IV Terapi ve Serum tedavisi. Vitamin, Detox, Güzellik, Enerji ve daha fazlası. Evde, ofiste ve otelde uygulama." />
        <link rel="canonical" href="https://eternalsaglik.com/serumlar" />
      </Helmet>

      <section className={styles.page}>
        <div className={styles.heroBanner}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.heroContent}>
                <span className={styles.heroBadge}>
                  <FaSyringe /> IV Terapi & Serum
                </span>
                <h1>ETERNAL IV TERAPI Tedavileri</h1>
                <p>
                  24 farklı serum ve IV terapi seçeneğiyle vücut dengenizi yeniden kurun.
                  Uzman ekibimiz ile evinizde profesyonel IV tedavi uygulaması.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.heroStat}>
                    <strong>24+</strong>
                    <span>Serum Çeşidi</span>
                  </div>
                  <div className={styles.heroStatDivider} />
                  <div className={styles.heroStat}>
                    <strong>7</strong>
                    <span>Kategori</span>
                  </div>
                  <div className={styles.heroStatDivider} />
                  <div className={styles.heroStat}>
                    <strong>%100</strong>
                    <span>Doğal</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        <Wrapper>
          <ScrollReveal delay={0.1}>
            <div className={styles.filterBar}>
              <div className={styles.searchBox}>
                <FaSearch />
                <input
                  type="text"
                  placeholder="Serum ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className={styles.filterRight}>
                <FaFilter className={styles.filterIcon} />
                <div className={styles.categories}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Link to="/serum-testi" className={`${ui.card} ${ui.glowBorder}`} style={{ display: "flex", gap: 16, alignItems: "center", margin: "18px 0", textDecoration: "none", flexWrap: "wrap" }}>
              <FaMagic style={{ fontSize: 30, color: "var(--primary)" }} />
              <div style={{ flex: "1 1 240px" }}>
                <strong style={{ color: "var(--text)" }}>Hangi serum bana uygun?</strong>
                <p style={{ margin: 0 }}>3 soruluk testi çözün, size uygun serumları önerelim.</p>
              </div>
              <span className={`${ui.btn} ${ui.btnPrimary}`}>Teste Başla <FaArrowRight /></span>
            </Link>
          </ScrollReveal>

          <div className={styles.resultInfo}>
            <p>{filtered.length} serum bulundu</p>
          </div>

          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={(i % 6) * 0.05}>
                <motion.div
                  className={styles.card}
                  onClick={() => navigate(`/serumlar/${item.id}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/serumlar/${item.id}`)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.popular && (
                    <div className={styles.popularBadge}>
                      <FaStar /> Popüler
                    </div>
                  )}
                  <div className={styles.cardImage}>
                    <SerumSVG name={item.info} category={item.category} />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <h2>{item.info}</h2>
                    <p className={styles.cardDesc}>{item.desc}</p>
                    <div className={styles.cardAction} style={{ justifyContent: "space-between" }}>
                      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>İncele <FaArrowRight /></span>
                      <a
                        href={whatsappUrl(`Merhaba, "${item.info}" serumu için randevu almak istiyorum.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "inline-flex", gap: 6, alignItems: "center", color: "#fff", background: "var(--wa)", padding: "6px 12px", borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: "none" }}
                        aria-label={`${item.info} için WhatsApp ile sipariş`}
                      >
                        <FaWhatsapp /> Sipariş
                      </a>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.noResults}>
              <FaSyringe className={styles.noResultsIcon} />
              <p>Arama kriterlerinize uygun serum bulunamadı.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("Tümü"); }}>
                Filtreleri Temizle
              </button>
            </div>
          )}
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(Serumlar);
