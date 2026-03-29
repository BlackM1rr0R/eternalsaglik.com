import React, { useMemo, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { motion } from "framer-motion";
import { FaArrowRight, FaSearch } from "react-icons/fa";
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

const Gallery = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const photos = useMemo(
    () => [
      { id: 15, images: IllSerum, info: "IV Serum Tedavisi" },
      { id: 16, images: IllSerum, info: "IV Terapi" },
      { id: 17, images: IllLab, info: "Laboratuvar Paketleri" },
      { id: 18, images: IllWellness, info: "Sağlıklı Yaşam" },
      { id: 19, images: IllFAQ, info: "Sıkça Sorulan Sorular" },
      { id: 1, images: IllStomach, info: "İshal Durumunda Neler Yapılmalı?" },
      { id: 2, images: IllDiabetes, info: "Diyabet (Şeker Hastalığı)" },
      { id: 3, images: IllBreathing, info: "Astım" },
      { id: 4, images: IllHeart, info: "Kalp Yetmezliği" },
      { id: 5, images: IllSkin, info: "Cilt Lekeleri ve Yorgunluk" },
      { id: 6, images: IllVirus, info: "Covid-19 (PCR Testi)" },
      { id: 7, images: IllInjection, info: "Enjeksiyon (İğne)" },
      { id: 8, images: IllInflammation, info: "İleri Derece İltihaplanmalar" },
      { id: 9, images: IllUrinary, info: "İdrar Yolu Problemleri" },
      { id: 10, images: IllBlood, info: "Evde Kan Alma Hizmeti" },
      { id: 11, images: IllWound, info: "Yara Bakımı ve Pansuman" },
      { id: 12, images: IllBreathing, info: "Solunum Terapisi" },
      { id: 13, images: IllHeart, info: "Kalp ve Tansiyon Takibi" },
      { id: 14, images: IllPhysio, info: "Evde Fizik Tedavi Hizmetleri" },
    ],
    []
  );

  const filtered = photos.filter((p) =>
    p.info.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Blog | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="Sağlık konularında bilgilendirici yazılar." />
      </Helmet>

      <section className={styles.page}>
        <Wrapper>
          <ScrollReveal>
            <div className={styles.header}>
              <span className={styles.badge}>Blog & Bilgi</span>
              <h1>Hastalıklar</h1>
              <p>Hastalıklar hakkında bilgilendirici yazılarımızı okuyabilirsiniz.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className={styles.searchBar}>
              <FaSearch />
              <input
                type="text"
                placeholder="Ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </ScrollReveal>

          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={(i % 6) * 0.05}>
                <motion.div
                  className={styles.card}
                  onClick={() => navigate(`/details/${item.id}`)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.cardImage}>
                    <img src={item.images} alt={item.info} />
                    <div className={styles.cardOverlay}>
                      <span>Oku <FaArrowRight /></span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h2>{item.info}</h2>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.noResults}>
              <p>Sonuç bulunamadı.</p>
            </div>
          )}
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(Gallery);
