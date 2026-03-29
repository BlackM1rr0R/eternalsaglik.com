import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { Link } from "react-router-dom";
import {
  FaEye, FaBullseye, FaUsers, FaHeartbeat, FaShieldAlt,
  FaClock, FaHome, FaUserMd, FaStethoscope, FaAmbulance,
  FaPhoneAlt, FaArrowRight, FaMedal, FaHandshake, FaStar,
} from "react-icons/fa";

const values = [
  { icon: <FaShieldAlt />, title: "Güvenilirlik", desc: "Hastalarımızın güvenliği ve mahremiyeti en öncelikli değerimizdir.", color: "#0d9488", bg: "#f0fdfa" },
  { icon: <FaMedal />, title: "Kalite", desc: "En yüksek standartlarda sağlık hizmeti sunmayı taahhüt ediyoruz.", color: "#2563eb", bg: "#eff6ff" },
  { icon: <FaHandshake />, title: "Etik", desc: "Tıbbi etik kurallarına bağlı, şeffaf ve dürüstçe hizmet veriyoruz.", color: "#d97706", bg: "#fffbeb" },
  { icon: <FaHeartbeat />, title: "Empati", desc: "Her hastamızı ailemizin bir parçası gibi görüyor ve öyle davranıyoruz.", color: "#db2777", bg: "#fdf2f8" },
];

const stats = [
  { num: "15+", label: "Yıl Deneyim" },
  { num: "10.000+", label: "Mutlu Hasta" },
  { num: "937+", label: "Ev Ziyareti" },
  { num: "%98", label: "Memnuniyet" },
];

const team = [
  { name: "Dr. Hasan Arslan", role: "CEO & Kurucu", icon: <FaUserMd />, desc: "15 yıllık klinik deneyim ile evde sağlık hizmetlerinde liderlik yapmaktadır." },
  { name: "Dr. Selin Aydın", role: "CEO Yardımcısı", icon: <FaStethoscope />, desc: "Hasta bakım yönetimi ve operasyonel süreçlerin koordinasyonundan sorumludur." },
  { name: "Dr. Fatma Koç", role: "Genel Yönetim", icon: <FaUsers />, desc: "İnsan kaynakları ve kalite yönetim sistemlerini yönetmektedir." },
];

const services = [
  "Evde Doktor Hizmeti", "Evde Hemşire Hizmeti", "IV Serum Tedavisi",
  "Evde Tahlil", "Özel Ambulans", "Fizik Tedavi", "Check-Up", "Yara Bakımı",
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>Hakkımızda | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="ETERNAL Sağlık Hizmetleri - 15 yıllık deneyim ile evde sağlık hizmeti." />
      </Helmet>

      <section className={styles.page}>
        {/* Hero */}
        <div className={styles.heroSection}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.heroInner}>
                <span className={styles.heroBadge}>Biz Kimiz</span>
                <h1>Hakkımızda</h1>
                <p>15 yıllık deneyimimiz ve uzman kadromuz ile Türkiye'nin önde gelen evde sağlık hizmeti sağlayıcısıyız</p>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        <Wrapper>
          {/* Stats bar */}
          <ScrollReveal>
            <div className={styles.statsBar}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Mission / Vision / About */}
          <div className={styles.mvaSection}>
            <ScrollReveal>
              <div className={styles.mvaHeader}>
                <span className={styles.badge}>Değerlerimiz</span>
                <h2><span className={styles.highlight}>Eternal Sağlık</span> İle Tanışın</h2>
              </div>
            </ScrollReveal>

            <div className={styles.mvaGrid}>
              <ScrollReveal delay={0}>
                <div className={styles.mvaCard}>
                  <div className={styles.mvaIcon}><FaBullseye /></div>
                  <h3>Misyonumuz</h3>
                  <p>
                    ETERNAL SAĞLIK HİZMETLERİ olarak, uzman bir ekip tarafından sunulan kapsamlı
                    yerinde bakım hizmetleri sunmaktayız. Ekibimiz deneyimli doktorlar, hemşireler
                    ve sağlık profesyonellerinden oluşur. Hastalarımızın ihtiyaçlarına özel
                    tasarlanan bakım planlarıyla güvenliklerini ve konforlarını sağlıyoruz.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className={`${styles.mvaCard} ${styles.mvaCardAlt}`}>
                  <div className={styles.mvaIcon}><FaUsers /></div>
                  <h3>Hakkımızda</h3>
                  <p>
                    Müşteri memnuniyetine büyük önem veriyoruz ve her bir hastamızı ailemizin
                    bir parçası olarak görüyoruz. Bireysel yaklaşım benimseyerek ihtiyaçları anlıyor,
                    dinliyor ve en uygun çözümleri sunuyoruz. Kişiselleştirilmiş bakım planları
                    ile hastaların özel gereksinimlerini karşılıyoruz.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className={styles.mvaCard}>
                  <div className={styles.mvaIcon}><FaEye /></div>
                  <h3>Vizyonumuz</h3>
                  <p>
                    Evde bakım hizmetlerimizi güvenilirlik, kalite ve etik değerlere dayandırıyoruz.
                    En son tıbbi gelişmeleri takip ediyor ve en iyi uygulamaları kullanarak
                    hastalarımıza mümkün olan en iyi bakımı sunmaya çalışıyoruz.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Values */}
          <ScrollReveal>
            <div className={styles.valuesSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.badge}>Temel Değerler</span>
                <h2>Bizi Farklı Kılan Değerler</h2>
              </div>
              <div className={styles.valuesGrid}>
                {values.map((v, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className={styles.valueCard}>
                      <div className={styles.valueIcon} style={{ background: v.bg, color: v.color }}>{v.icon}</div>
                      <h3>{v.title}</h3>
                      <p>{v.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Team */}
          <ScrollReveal>
            <div className={styles.teamSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.badge}>Ekibimiz</span>
                <h2>Yönetim Kurulumuz</h2>
                <p>Gücümüzün, operasyonlarımıza benzersiz değer katan çalışanlarımızdan geldiğini biliyoruz.</p>
              </div>
              <div className={styles.teamGrid}>
                {team.map((m, i) => (
                  <ScrollReveal key={i} delay={i * 0.12}>
                    <div className={styles.teamCard}>
                      <div className={styles.teamAvatar}>{m.icon}</div>
                      <h3>{m.name}</h3>
                      <span className={styles.teamRole}>{m.role}</span>
                      <p>{m.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Services we offer */}
          <ScrollReveal>
            <div className={styles.servicesSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.badge}>Hizmetler</span>
                <h2>Sunduklarımız</h2>
              </div>
              <div className={styles.servicesTags}>
                {services.map((s, i) => (
                  <div key={i} className={styles.serviceTag}>
                    <FaStar className={styles.serviceTagIcon} />
                    {s}
                  </div>
                ))}
              </div>
              <div className={styles.servicesLink}>
                <Link to="/hizmetlerimiz">
                  Tüm Hizmetleri Gör <FaArrowRight />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <div className={styles.ctaBox}>
              <FaHome className={styles.ctaIcon} />
              <h2>Sağlık hizmetinizi ayağınıza getirmek için buradayız.</h2>
              <p>ETERNAL MEDLINE GROUP - Evinizde yalnız değilsiniz.</p>
              <a href="tel:05525189654" className={styles.ctaBtn}>
                <FaPhoneAlt /> Hemen Arayın
              </a>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(About);
