import React from "react";
import styles from "./index.module.css";
import ScrollReveal from "../scrollreveal";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaStethoscope,
  FaLeaf,
  FaVials,
  FaAmbulance,
  FaHandHoldingHeart,
  FaClipboardCheck,
} from "react-icons/fa";

const services = [
  {
    num: "01",
    icon: <FaUserMd />,
    title: "Evde Doktor Hizmeti",
    desc: "Hastaların kendi evlerinde kaliteli sağlık hizmeti alabilmeleri için profesyonel doktor hizmeti sunuyoruz.",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    num: "02",
    icon: <FaStethoscope />,
    title: "Evde Hemşire Hizmeti",
    desc: "Yaşlı, yatalak veya kronik rahatsızlıkları olan bireyler için profesyonel hemşire bakımı.",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    num: "03",
    icon: <FaLeaf />,
    title: "Evde Geleneksel Tıp",
    desc: "Binlerce yıllık doğal tedavi yöntemlerini modern yaşamınıza entegre eden hizmet.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    num: "04",
    icon: <FaVials />,
    title: "Evde Tahlil Hizmeti",
    desc: "Sağlık sorununuzun tespiti ve tedavisi için evinizin konforunda tahlil yapıyoruz.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    num: "05",
    icon: <FaAmbulance />,
    title: "Özel Ambulans Hizmeti",
    desc: "Yüksek standartlardaki medikal ekipmanları ve deneyimli sağlık personeli ile hasta nakil hizmeti.",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    num: "06",
    icon: <FaHandHoldingHeart />,
    title: "Evde Hasta Bakıcı",
    desc: "Hastane ortamının stresinden uzakta, tıbbi gereksinimlerin profesyonel olarak karşılandığı hizmet.",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    num: "07",
    icon: <FaClipboardCheck />,
    title: "Evde Check Up",
    desc: "Yaşınıza ve sağlık durumunuza özel check-up paketlerimizi evinizde gerçekleştiriyoruz.",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
];

const YusifAbout = () => {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <span className={styles.badge}>Neler Sunuyoruz</span>
          <h2>Hizmetlerimiz</h2>
          <p>
            Uzman ekibimiz ile evinizin konforunda kapsamlı sağlık hizmetleri sunuyoruz
          </p>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <ScrollReveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? "up" : "up"}>
            <motion.div
              className={styles.card}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.cardTop}>
                <div
                  className={styles.iconWrap}
                  style={{ background: service.bg, color: service.color }}
                >
                  {service.icon}
                </div>
                <span className={styles.num} style={{ color: service.color }}>
                  {service.num}
                </span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className={styles.cardLine} style={{ background: service.color }} />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default YusifAbout;
