import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import ScrollReveal from "../scrollreveal";

const CTASection = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <ScrollReveal>
          <div className={styles.content}>
            <span className={styles.badge}>7/24 Hizmetinizdeyiz</span>
            <h2>Sağlığınız İçin <span>Hemen Arayın</span></h2>
            <p>
              Uzman sağlık ekibimiz, evinizin konforunda size en kaliteli sağlık
              hizmetini sunmak için hazır. Randevu almak veya bilgi almak için
              hemen bize ulaşın.
            </p>
            <div className={styles.buttons}>
              <a href="tel:05525189654" className={styles.btnPrimary}>
                <FaPhoneAlt />
                <span>0552 518 96 54</span>
              </a>
              <Link to="/randevu" className={styles.btnSecondary}>
                <FaCalendarCheck />
                <span>Randevu Al</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
