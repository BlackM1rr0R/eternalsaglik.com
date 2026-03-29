import React, { useMemo, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import SerumSVG from "../../components/serumcard";
import { motion } from "framer-motion";
import { FaSearch, FaSyringe, FaArrowRight, FaStar, FaFilter } from "react-icons/fa";

const categories = ["Tümü", "Vitamin", "Detox", "Güzellik", "Enerji", "Bağışıklık", "Özel"];

const Serumlar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const photos = useMemo(
    () => [
      { id: 1, info: "Atom Serum", category: "Enerji", popular: true, desc: "Yüksek enerji ve canlılık" },
      { id: 2, info: "Fat Burning Slim Boost", category: "Detox", desc: "Yağ yakımı ve metabolizma" },
      { id: 3, info: "Collagen Booster", category: "Güzellik", popular: true, desc: "Cilt yenileme ve parlaklık" },
      { id: 4, info: "Magnezyum IV Terapi", category: "Vitamin", desc: "Kas ve sinir sağlığı" },
      { id: 5, info: "Alfa Lipoik Asit IV Terapi", category: "Detox", desc: "Güçlü antioksidan destek" },
      { id: 6, info: "Selenyum IV Terapi", category: "Vitamin", desc: "Tiroid ve bağışıklık" },
      { id: 7, info: "B Vitamin Kompleksi", category: "Vitamin", popular: true, desc: "Enerji ve sinir sistemi" },
      { id: 8, info: "Hidrasyon IV Terapi", category: "Enerji", desc: "Vücut sıvı dengesi" },
      { id: 9, info: "Saç ve Tırnak Canlılığı", category: "Güzellik", desc: "Saç dökülmesine karşı" },
      { id: 10, info: "Beauty Kokteyl IV Terapi", category: "Güzellik", popular: true, desc: "Tam güzellik paketi" },
      { id: 11, info: "Amino Asit Kokteyl", category: "Enerji", desc: "Kas onarımı ve güç" },
      { id: 12, info: "Glutatyon IV Serum", category: "Detox", popular: true, desc: "Master antioksidan" },
      { id: 13, info: "NAD+ Terapi", category: "Enerji", desc: "Hücre yenileme ve yaşlanma" },
      { id: 14, info: "Myers Kokteyli IV Terapi", category: "Vitamin", popular: true, desc: "Klasik vitamin kokteyli" },
      { id: 15, info: "Yüksek Doz C Vitamini", category: "Bağışıklık", desc: "Güçlü bağışıklık desteği" },
      { id: 16, info: "Çinko IV Terapi", category: "Bağışıklık", desc: "Enfeksiyona karşı koruma" },
      { id: 17, info: "Immun Boost Serum", category: "Bağışıklık", popular: true, desc: "Tam bağışıklık paketi" },
      { id: 18, info: "Detox Master IV", category: "Detox", desc: "Derin vücut temizliği" },
      { id: 19, info: "Anti-Aging Premium", category: "Güzellik", desc: "Yaşlanma karşıtı formül" },
      { id: 20, info: "Sporcu Performans IV", category: "Enerji", desc: "Antrenman sonrası toparlanma" },
      { id: 21, info: "D Vitamini IV Terapi", category: "Vitamin", desc: "Kemik ve kas sağlığı" },
      { id: 22, info: "Bağışıklık Kalkan Plus", category: "Bağışıklık", desc: "Mevsimsel koruma" },
      { id: 23, info: "Kilo Kontrol Serumu", category: "Özel", desc: "Sağlıklı kilo yönetimi" },
      { id: 24, info: "VIP Wellness Paket", category: "Özel", popular: true, desc: "Premium sağlık deneyimi" },
    ],
    []
  );

  const filtered = photos.filter((p) => {
    const matchSearch = p.info.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "Tümü" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Helmet>
        <title>Serumlar & IV Terapi | Eternal Sağlık Hizmetleri</title>
        <meta name="description" content="24 farklı IV Terapi ve Serum tedavisi. Vitamin, Detox, Güzellik, Enerji ve daha fazlası." />
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

          <div className={styles.resultInfo}>
            <p>{filtered.length} serum bulundu</p>
          </div>

          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={(i % 6) * 0.05}>
                <motion.div
                  className={styles.card}
                  onClick={() => navigate(`/serumlar/${item.id}`)}
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
                    <div className={styles.cardAction}>
                      <span>İncele</span>
                      <FaArrowRight />
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
