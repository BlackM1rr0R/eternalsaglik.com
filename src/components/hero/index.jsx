import React, { useState } from "react";
import styles from "./index.module.css";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";
import Wrapper from "../UI/wrapper";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaArrowRight, FaHeartbeat, FaUserMd, FaClock, FaShieldAlt } from "react-icons/fa";

const Hero = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.overlay} />
        <div className={styles.floatingShapes}>
          <div className={styles.shape1} />
          <div className={styles.shape2} />
          <div className={styles.shape3} />
        </div>
      </div>

      <Wrapper>
        <div className={styles.heroContent}>
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
              <a href="tel:+905525189654" className={styles.btnPrimary}>
                <FaPhoneAlt />
                <span>0552 518 96 54</span>
              </a>
              <Link to="/hizmetlerimiz" className={styles.btnOutline}>
                <span>Hizmetlerimiz</span>
                <FaArrowRight />
              </Link>
            </motion.div>

            <ScrollTrigger
              onEnter={() => setCounterOn(true)}
              onExit={() => setCounterOn(false)}
            >
              <motion.div
                className={styles.stats}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className={styles.stat}>
                  <div className={styles.statNumber}>
                    <span>{counterOn && <CountUp duration={3} end={24} />}/</span>
                    <span>{counterOn && <CountUp duration={3} end={7} />}</span>
                  </div>
                  <p>Acil Bakım</p>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <div className={styles.statNumber}>
                    <span>{counterOn && <CountUp duration={3} end={98} />}%</span>
                  </div>
                  <p>Memnuniyet</p>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <div className={styles.statNumber}>
                    <span>{counterOn && <CountUp duration={3} end={15} />}+</span>
                  </div>
                  <p>Yıl Deneyim</p>
                </div>
              </motion.div>
            </ScrollTrigger>
          </div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.featureCards}>
              <motion.div
                className={styles.featureCard}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                <div className={styles.featureIcon}>
                  <FaUserMd />
                </div>
                <h3>Uzman Doktor</h3>
                <p>Evde muayene ve tedavi</p>
              </motion.div>
              <motion.div
                className={`${styles.featureCard} ${styles.featureCardOffset}`}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                <div className={`${styles.featureIcon} ${styles.iconGreen}`}>
                  <FaClock />
                </div>
                <h3>7/24 Hizmet</h3>
                <p>Her an ulaşılabilir</p>
              </motion.div>
              <motion.div
                className={styles.featureCard}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                <div className={`${styles.featureIcon} ${styles.iconDark}`}>
                  <FaShieldAlt />
                </div>
                <h3>Güvenilir</h3>
                <p>%98 memnuniyet oranı</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Wrapper>
    </section>
  );
};

export default React.memo(Hero);
