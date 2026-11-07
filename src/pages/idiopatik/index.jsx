import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import DoctorProfile from '../../assets/images/doctor12.jpg';
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import BookingForm from "../../components/bookingform";
import CallbackForm from "../../components/callbackform";
import ui from "../../styles/ui.module.css";
import { SITE } from "../../config/site";
import { FaPhoneAlt, FaHeartbeat, FaBriefcaseMedical, FaCalendarCheck } from "react-icons/fa";

const skills = [
  "Evde Doktor Hizmeti", "I.V. Terapi", "Glutatyon Terapisi",
  "Yüksek Doz C Vitamin Terapisi", "Serum Tedavisi", "Evde Hemşirelik Hizmeti",
  "Sağlık Danışmanlık Hizmeti", "Hasta Bakım Refakat Hizmeti",
  "Yaşlı Bakım Destek Hizmeti", "Serum Takma", "Enjeksiyon",
  "Sonda Takma ve Değişimi", "Pansuman & Yara Bakımı",
  "Bası Yarası Pansumanı (Dekubit)", "Tansiyon Ölçümleri",
  "Glukoz (Şeker) Ölçümü & Takibi", "Oksijen & Buhar Uygulaması",
  "Evde & Hastanede Hemşire", "Göz & Kulak Lavajı (Yıkama)",
  "Cerrahi Müdahale", "Dikiş Atma ve Alma", "Buzlu Ağrı Kompresi & Masaj",
];

const Idiopatik = () => {
  const { state } = useLocation();
  return (
    <>
      <Helmet>
        <title>Randevu Al | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="Evde doktor, hemşire, serum ve tahlil için online randevu alın. Sakarya, Düzce, Kocaeli ve İstanbul." />
        <link rel="canonical" href="https://eternalsaglik.com/randevu" />
      </Helmet>

      <section className={styles.page}>
        {/* CTA Hero */}
        <div className={styles.ctaHero}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.ctaContent}>
                <div className={styles.ctaIcon}>
                  <FaCalendarCheck />
                </div>
                <h1>Randevu Alın</h1>
                <p>Formu doldurun, talebiniz WhatsApp ile bize ulaşsın. Dilerseniz hemen arayın.</p>
                <div className={styles.ctaButtons}>
                  <a href={`tel:${SITE.phones[0].tel}`} className={styles.callBtn}>
                    <FaPhoneAlt />
                    <span>{SITE.phones[0].display}</span>
                  </a>
                  <a href={`tel:${SITE.phones[1].tel}`} className={styles.callBtnAlt}>
                    <FaPhoneAlt />
                    <span>{SITE.phones[1].display}</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        {/* Booking */}
        <Wrapper>
          <div className={ui.grid2} style={{ alignItems: "start", margin: "48px 0" }}>
            <ScrollReveal>
              <BookingForm defaultService={state?.service || ""} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div id="geri-arama">
                <CallbackForm compact title="Form doldurmak istemiyor musunuz?" source="Randevu sayfası" />
              </div>
            </ScrollReveal>
          </div>
        </Wrapper>

        {/* Doctor Profile */}
        <div className={styles.doctorSection}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.doctorCard}>
                <img src={DoctorProfile} alt="Dr. Atakan Bayrak" className={styles.doctorImg} />
                <div className={styles.doctorInfo}>
                  <h2>Uzm. Dr. Atakan Bayrak</h2>
                  <span className={styles.doctorBadge}>ETERNAL Sağlık Hizmetleri</span>
                  <p>Uzman sağlık ekibimizle rahat bir nefes alın.</p>
                </div>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        {/* Skills */}
        <Wrapper>
          <ScrollReveal>
            <div className={styles.skillsSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.badge}>Uzmanlık Alanları</span>
                <h2>Hizmet Yelpazesi</h2>
              </div>
              <div className={styles.skillsGrid}>
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className={styles.skillTag}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBriefcaseMedical />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.clinicBox}>
              <FaHeartbeat className={styles.clinicIcon} />
              <h2>ETERNAL Sağlık Hizmeti</h2>
              <p>Bu kurumda hastalar değil hastalıklar susturulur.</p>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(Idiopatik);
