import React from "react";
import { getArticle } from "../../data/articles";
import styles from './index.module.css';
import { useParams, Link } from "react-router-dom";
import Wrapper from '../../components/UI/wrapper';
import ScrollReveal from "../../components/scrollreveal";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import ListenButton from "../../components/listenbutton";
import ScrollProgress from "../../components/scrollprogress";
import CallbackForm from "../../components/callbackform";

import IllStomach from "../../assets/illustrations/stomach.svg";
import IllDiabetes from "../../assets/illustrations/diabetes.svg";
import IllBreathing from "../../assets/illustrations/breathing.svg";
import IllHeart from "../../assets/illustrations/heart-health.svg";
import IllSkin from "../../assets/illustrations/skin-care.svg";
import IllVirus from "../../assets/illustrations/virus.svg";
import IllInjection from "../../assets/illustrations/injection.svg";
import IllInflammation from "../../assets/illustrations/inflammation.svg";
import IllUrinary from "../../assets/illustrations/urinary.svg";
import IllBlood from "../../assets/illustrations/blood-test.svg";
import IllWound from "../../assets/illustrations/wound-care.svg";
import IllBreath2 from "../../assets/illustrations/breathing.svg";
import IllPhysio from "../../assets/illustrations/physio.svg";
import IllSerum from "../../assets/illustrations/serum-iv.svg";
import IllLab from "../../assets/illustrations/lab-test.svg";
import IllWellness from "../../assets/illustrations/wellness.svg";
import IllFAQ from "../../assets/illustrations/faq.svg";

const imageMap = {
  1: IllStomach, 2: IllDiabetes, 3: IllBreathing, 4: IllHeart,
  5: IllSkin, 6: IllVirus, 7: IllInjection, 8: IllInflammation,
  9: IllUrinary, 10: IllBlood, 11: IllWound, 12: IllBreath2,
  13: IllHeart, 14: IllPhysio, 15: IllSerum, 16: IllSerum,
  17: IllLab, 18: IllWellness, 19: IllFAQ,
};

const Details = () => {
  const { id } = useParams();
  const photo = getArticle(id);

  if (!photo) {
    return (
      <Wrapper>
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <h2>Bilgi bulunamadı</h2>
          <Link to="/gallery" style={{ color: "var(--primary)", fontWeight: 600 }}>Bloga dön</Link>
        </div>
      </Wrapper>
    );
  }

  const illustration = imageMap[photo.id] || IllSerum;

  return (
    <>
      <Helmet>
        <title>{photo.text} | ETERNAL Sağlık</title>
        <meta name="description" content={photo.textTwo} />
        <link rel="canonical" href={`https://eternalsaglik.com/details/${photo.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            headline: photo.text,
            description: photo.textTwo,
            inLanguage: "tr",
            publisher: { "@type": "MedicalBusiness", name: "ETERNAL Sağlık Hizmetleri", url: "https://eternalsaglik.com" },
          })}
        </script>
      </Helmet>
      <ScrollProgress />

      <section className={styles.page}>
        <Wrapper>
          <ScrollReveal>
            <Link to="/gallery" className={styles.backLink}>
              <FaArrowLeft /> Bloga Dön
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.hero}>
              <div className={styles.heroImage}>
                <img src={illustration} alt={photo.text} />
              </div>
              <div className={styles.heroInfo}>
                <h1>{photo.text}</h1>
                <p>{photo.textTwo}</p>
                <ListenButton
                  text={[photo.text, photo.textTwo, photo.headerText, photo.aboutHeaderText, ...(photo.types || []).map((t) => `${t.t}. ${t.d}`), photo.whyText, photo.content].filter(Boolean).join(". ")}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.section}>
              <h2>{photo.headerText}</h2>
              <p>{photo.aboutHeaderText}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.typesGrid}>
              {photo.types.map((type, i) => (
                <div key={i} className={styles.typeCard}>
                  <div className={styles.typeNum}>{String(i + 1).padStart(2, "0")}</div>
                  <h3>{type.t}</h3>
                  <p>{type.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.infoCard}>
              <h3>{photo.forKind}</h3>
              <p>{photo.aboutKind}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.whyCard}>
              <h3>{photo.whyTitle}</h3>
              <p>{photo.whyText}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.contentCard}>
              <h3>İçerik & Tedavi</h3>
              <p>{photo.content}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <CallbackForm title="Bu konuda destek mi lazım?" source={`Blog: ${photo.text}`} />
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.trustBox}>
              <FaShieldAlt className={styles.trustIcon} />
              <h2>Verdiğimiz Bilgilere Güvenebilirsiniz</h2>
              <p>Bu içerik Eternal Sağlık tarafından onaylanmıştır. Tıbbi Yayın Kurulumuz, deneyimli doktor ve araştırmacılardan oluşan bir ekiptir.</p>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default Details;
