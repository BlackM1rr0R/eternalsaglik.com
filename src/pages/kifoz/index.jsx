import React from "react";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import { services } from "../../data/services";
import { faqs } from "../../data/faq";
import { FaqList, faqJsonLd } from "../faq";
import { primaryPhone } from "../../config/site";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaPhoneAlt, FaArrowRight, FaShieldAlt, FaClock, FaHome } from "react-icons/fa";

const whyUs = [
  { icon: <FaShieldAlt />, title: "Güvenilirlik", desc: "%98 hasta memnuniyet oranı" },
  { icon: <FaClock />, title: "7/24 Hizmet", desc: "Gece-gündüz ulaşılabilirlik" },
  { icon: <FaHome />, title: "Ev Konforu", desc: "Hastane stresinden uzak tedavi" },
  { icon: <FaHeartbeat />, title: "15 Yıl Deneyim", desc: "Binlerce başarılı tedavi" },
];

const Kifoz = () => {
  return (
    <>
      <Helmet>
        <title>Hizmetlerimiz | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="Sakarya ve çevresinde evde doktor, evde hemşire, IV serum, evde tahlil, yara bakımı, hasta bakıcı ve özel ambulans hizmetleri." />
        <link rel="canonical" href="https://eternalsaglik.com/hizmetlerimiz" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd())}</script>
      </Helmet>

      <section className={styles.page}>
        {/* Hero */}
        <div className={styles.heroSection}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.heroInner}>
                <span className={styles.badge}>Profesyonel Sağlık</span>
                <h1><span>Sağlığı</span> Eve Getiriyoruz</h1>
                <p>9 farklı hizmet kategorisinde uzman ekibimizle evinizin konforunda sağlık hizmeti sunuyoruz</p>
                <div className={styles.heroBtns}>
                  <a href={`tel:${primaryPhone.tel}`} className={styles.heroCallBtn}><FaPhoneAlt /> Hemen Ara</a>
                  <Link to="/randevu" className={styles.heroOutlineBtn}>Randevu Al <FaArrowRight /></Link>
                </div>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        <Wrapper>
          {/* Why Us */}
          <div className={styles.whyUsSection}>
            <div className={styles.whyUsGrid}>
              {whyUs.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={styles.whyUsCard}>
                    <div className={styles.whyUsIcon}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Services */}
          <ScrollReveal>
            <div className={styles.sectionTitle}>
              <span className={styles.badge}>Hizmetler</span>
              <h2>Tüm Hizmetlerimiz</h2>
            </div>
          </ScrollReveal>

          <div className={styles.servicesSection}>
            <div className={styles.servicesGrid}>
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollReveal key={s.slug} delay={i * 0.05}>
                    <TiltCard className={styles.serviceCard} style={{ position: "relative", height: "100%" }}>
                      <Link to={`/hizmet/${s.slug}`} style={{ color: "inherit", textDecoration: "none", display: "block" }}>
                        <div className={styles.serviceCardHeader}>
                          <Icon3D icon={<Icon />} tone={s.tone} size={56} />
                          <span className={styles.serviceCardNum}>{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <span style={{ display: "inline-flex", gap: 6, alignItems: "center", marginTop: 12, color: "var(--primary)", fontWeight: 700 }}>
                          Detaylar <FaArrowRight />
                        </span>
                      </Link>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <ScrollReveal>
            <div className={styles.faqSection}>
              <div className={styles.sectionTitle}>
                <span className={styles.badge}>SSS</span>
                <h2>Sıkça Sorulan Sorular</h2>
              </div>
              <FaqList items={faqs} />
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default Kifoz;
