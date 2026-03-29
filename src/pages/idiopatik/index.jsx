import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import DoctorProfile from '../../assets/images/doctor12.jpg';
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { motion } from "framer-motion";
import {
  FaPhoneAlt, FaUserMd, FaStethoscope, FaSyringe, FaBandAid,
  FaHeartbeat, FaLungs, FaVials, FaEye, FaCut, FaThermometerHalf,
  FaHandHoldingMedical, FaBriefcaseMedical, FaCalendarCheck,
} from "react-icons/fa";

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
  return (
    <>
      <Helmet>
        <title>Randevu Al | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="ETERNAL Sağlık Hizmetleri ile randevunuzu ayın." />
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
                <p>Doktorumuz sizlere hizmet vermektedir. Sadece arayın!</p>
                <div className={styles.ctaButtons}>
                  <a href="tel:05525189654" className={styles.callBtn}>
                    <FaPhoneAlt />
                    <span>0552 518 96 54</span>
                  </a>
                  <a href="tel:05434063544" className={styles.callBtnAlt}>
                    <FaPhoneAlt />
                    <span>0543 406 35 44</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

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

        {/* Fixed Mobile Call Button */}
        <div className={styles.fixedCall}>
          <a href="tel:05525189654">
            <FaPhoneAlt />
            <span>Hemen Arayın</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default React.memo(Idiopatik);
