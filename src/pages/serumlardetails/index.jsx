import React from "react";
import styles from "./index.module.css";
import { useParams, Link } from "react-router-dom";
import Wrapper from "../../components/UI/wrapper";
import ScrollReveal from "../../components/scrollreveal";
import SerumSVG from "../../components/serumcard";
import ListenButton from "../../components/listenbutton";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaArrowLeft, FaPhoneAlt, FaShieldAlt, FaWhatsapp, FaMagic } from "react-icons/fa";
import { getSerum, serumList } from "../../data/serums";
import { primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";

const SerumlarDetails = () => {
  const { id } = useParams();
  const listItem = serumList.find((s) => s.id === Number(id));
  // Some catalogue entries have no long-form description yet; fall back to the card info.
  const serum =
    getSerum(id) ||
    (listItem && { id: listItem.id, text: listItem.info, category: listItem.category, textTwo: listItem.desc });

  if (!serum) {
    return (
      <Wrapper>
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <h2>Serum bulunamadı</h2>
          <Link to="/serumlar" style={{ color: "var(--primary)", fontWeight: 600 }}>Serumlara dön</Link>
        </div>
      </Wrapper>
    );
  }

  const listenText = [serum.text, serum.textTwo, serum.headerText, serum.aboutHeaderText, serum.whyText]
    .filter(Boolean)
    .join(". ");

  return (
    <>
      <Helmet>
        <title>{serum.text} | Evde IV Serum | ETERNAL Sağlık</title>
        <meta name="description" content={serum.textTwo} />
        <link rel="canonical" href={`https://eternalsaglik.com/serumlar/${serum.id}`} />
      </Helmet>

      <section className={styles.page}>
        <Wrapper>
          <ScrollReveal>
            <Link to="/serumlar" className={styles.backLink}>
              <FaArrowLeft /> Serumlara Dön
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.hero}>
              <div className={styles.heroSvg}>
                <SerumSVG name={serum.text} category={serum.category} />
              </div>
              <div className={styles.heroInfo}>
                <span className={styles.badge}>{serum.category}</span>
                <h1>{serum.text}</h1>
                <p>{serum.textTwo}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <a
                    href={whatsappUrl(`Merhaba, "${serum.text}" serumu için evde uygulama randevusu almak istiyorum.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.callBtn}
                  >
                    <FaWhatsapp /> WhatsApp ile Sipariş
                  </a>
                  <a href={`tel:${primaryPhone.tel}`} className={styles.callBtn} style={{ background: "var(--slate-800)" }}>
                    <FaPhoneAlt /> Ara
                  </a>
                  <ListenButton text={listenText} />
                </div>
                <Link to="/serum-testi" style={{ display: "inline-flex", gap: 6, alignItems: "center", marginTop: 14, color: "var(--primary)", fontWeight: 600 }}>
                  <FaMagic /> Hangi serum bana uygun? Testi çöz
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {serum.headerText && (
            <ScrollReveal>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{serum.headerText}</h2>
                <p className={styles.sectionText}>{serum.aboutHeaderText}</p>
              </div>
            </ScrollReveal>
          )}

          {serum.types?.length > 0 && (
            <ScrollReveal>
              <div className={styles.typesGrid}>
                {serum.types.map((type, i) => (
                  <div key={i} className={styles.typeCard}>
                    <div className={styles.typeNum}>{String(i + 1).padStart(2, "0")}</div>
                    <h3>{type.t}</h3>
                    <p>{type.d}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {serum.forKind && (
            <ScrollReveal>
              <div className={styles.forWho}>
                <h3>{serum.forKind}</h3>
                <p>{serum.aboutKind}</p>
              </div>
            </ScrollReveal>
          )}

          {serum.whyTitle && (
            <ScrollReveal>
              <div className={styles.whySection}>
                <h3>{serum.whyTitle}</h3>
                <p>{serum.whyText}</p>
              </div>
            </ScrollReveal>
          )}

          {serum.content && (
            <ScrollReveal>
              <div className={styles.contentBox}>
                <FaCheckCircle className={styles.contentIcon} />
                <div>
                  <h3>İçerik</h3>
                  <p>{serum.content}</p>
                </div>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className={styles.trustBox}>
              <FaShieldAlt className={styles.trustIcon} />
              <h2>Verdiğimiz Bilgilere Güvenebilirsiniz</h2>
              <p>Bu içerik Eternal Sağlık tarafından onaylanmıştır. Tıbbi Yayın Kurulumuz, sağlık alanında güvenilir bilgiye erişim sağlamak amacıyla oluşturulmuştur.</p>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default SerumlarDetails;
