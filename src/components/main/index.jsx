import React, { useRef } from "react";
import { useInView } from "framer-motion";
import Icon3D from "../icon3d";
import styles from "./index.module.css";
import CountUp from "react-countup";
import ScrollReveal from "../scrollreveal";
import { FaBriefcaseMedical, FaHome, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaBriefcaseMedical />,
    end: 15,
    suffix: "",
    label: "Yıllık profesyonellik",
    tone: "teal",
  },
  {
    icon: <FaHome />,
    end: 937,
    suffix: "+",
    label: "Ev sağlığı hizmeti",
    tone: "green",
  },
  {
    icon: <FaUsers />,
    end: 10348,
    suffix: "+",
    label: "İyileşen hastalarımız",
    tone: "blue",
  },
  {
    icon: <FaMapMarkerAlt />,
    end: 2,
    suffix: "+",
    label: "Adreslerimiz",
    tone: "amber",
  },
];

const Main = () => {
  const ref = useRef(null);
  const counterOn = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <span className={styles.badge}>Başarılarımız</span>
          <h2>Rakamlarla Eternal Sağlık</h2>
          <p>Yılların deneyimi ve binlerce mutlu hasta ile gurur duyuyoruz</p>
        </div>
      </ScrollReveal>

      <div className={styles.grid} ref={ref}>
          {stats.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={styles.card}>
                <Icon3D icon={item.icon} tone={item.tone} size={60} />
                <h3 className={styles.cardNumber}>
                  {counterOn && <CountUp duration={3} delay={0} end={item.end} />}
                  {item.suffix}
                </h3>
                <p className={styles.cardLabel}>{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
      </div>
    </section>
  );
};

export default React.memo(Main);
