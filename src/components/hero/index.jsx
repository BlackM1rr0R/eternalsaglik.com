import React, { useRef } from "react";
import styles from "./index.module.css";
import CountUp from "react-countup";
import Wrapper from "../UI/wrapper";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroVisual from "./visual";
import Icon3D from "../icon3d";
import TiltCard from "../tiltcard";
import { primaryPhone } from "../../config/site";
import { FaPhoneAlt, FaArrowRight, FaHeartbeat, FaUserMd, FaClock, FaShieldAlt } from "react-icons/fa";

const Hero = () => {
  const ref = useRef(null);
  // Parallax: background shapes drift slower than the content while scrolling.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shapesY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.heroBg}>
        <div className={styles.overlay} />
        <motion.div className={styles.floatingShapes} style={{ y: shapesY }}>
          <div className={styles.shape1} />
          <div className={styles.shape2} />
          <div className={styles.shape3} />
        </motion.div>
      </div>

      <Wrapper>
        <motion.div className={styles.heroContent} style={{ y: contentY }}>
          <div className={styles.left}>
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FaHeartbeat />
              <span>7/24 Evde Sağlık Hizmeti</span>
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Aradığınız Sağlık,
              <br />
              <span className={styles.gradient}>Sağlıklı Gelecek</span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Alanında uzman sağlık ekibimizle evinizin konforunda profesyonel
              sağlık hizmeti alın. Her anınızda yanınızda.
            </motion.p>

            <motion.div
              className={styles.heroBtns}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href={`tel:${primaryPhone.tel}`} className={styles.btnPrimary}>
                <FaPhoneAlt />
                <span>{primaryPhone.display}</span>
              </a>
              <Link to="/hizmetlerimiz" className={styles.btnOutline}>
                <span>Hizmetlerimiz</span>
                <FaArrowRight />
              </Link>
            </motion.div>

              <motion.div
                className={styles.stats}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className={styles.stat}>
                  <div className={styles.statNumber}>
                    <span><CountUp duration={3} end={24} />/</span>
                    <span><CountUp duration={3} end={7} /></span>
                  </div>
                  <p>Acil Bakım</p>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <div className={styles.statNumber}>
                    <span><CountUp duration={3} end={98} />%</span>
                  </div>
                  <p>Memnuniyet</p>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <div className={styles.statNumber}>
                    <span><CountUp duration={3} end={15} />+</span>
                  </div>
                  <p>Yıl Deneyim</p>
                </div>
              </motion.div>
          </div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroVisual />
            <div className={styles.featureCards}>
              <TiltCard
                className={styles.featureCard}
              >
                <Icon3D icon={<FaUserMd />} tone="teal" size={48} />
                <h3>Uzman Doktor</h3>
                <p>Evde muayene ve tedavi</p>
              </TiltCard>
              <TiltCard className={`${styles.featureCard} ${styles.featureCardOffset}`}>
                <Icon3D icon={<FaClock />} tone="green" size={48} />
                <h3>7/24 Hizmet</h3>
                <p>Her an ulaşılabilir</p>
              </TiltCard>
              <TiltCard
                className={styles.featureCard}
              >
                <Icon3D icon={<FaShieldAlt />} tone="blue" size={48} />
                <h3>Güvenilir</h3>
                <p>%98 memnuniyet oranı</p>
              </TiltCard>
            </div>
          </motion.div>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default React.memo(Hero);
