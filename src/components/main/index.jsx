import React, { useState } from "react";
import styles from "./index.module.css";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";
import ScrollReveal from "../scrollreveal";
import { FaBriefcaseMedical, FaHome, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaBriefcaseMedical />,
    end: 15,
    suffix: "",
    label: "Yıllık profesyonellik",
    color: "#115e59",
    bg: "linear-gradient(135deg, #f0fdfa, #ccfbf1)",
  },
  {
    icon: <FaHome />,
    end: 937,
    suffix: "+",
    label: "Ev sağlığı hizmeti",
    color: "#0f766e",
    bg: "linear-gradient(135deg, #ccfbf1, #99f6e4)",
  },
  {
    icon: <FaUsers />,
    end: 10348,
    suffix: "+",
    label: "İyileşen hastalarımız",
    color: "#0d9488",
    bg: "linear-gradient(135deg, #eff6ff, #dbeafe)",
  },
  {
    icon: <FaMapMarkerAlt />,
    end: 2,
    suffix: "+",
    label: "Adreslerimiz",
    color: "#115e59",
    bg: "linear-gradient(135deg, #fffbeb, #fef3c7)",
  },
];

const Main = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <span className={styles.badge}>Başarılarımız</span>
          <h2>Uğurlarımız hakkında</h2>
          <p>Yılların deneyimi ve binlerce mutlu hasta ile gurur duyuyoruz</p>
        </div>
      </ScrollReveal>

      <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
        <div className={styles.grid}>
          {stats.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={styles.card} style={{ background: item.bg }}>
                <div className={styles.cardIcon} style={{ color: item.color }}>
                  {item.icon}
                </div>
                <h3 className={styles.cardNumber} style={{ color: item.color }}>
                  {counterOn && <CountUp duration={3} delay={0} end={item.end} />}
                  {item.suffix}
                </h3>
                <p className={styles.cardLabel}>{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollTrigger>
    </section>
  );
};

export default React.memo(Main);
