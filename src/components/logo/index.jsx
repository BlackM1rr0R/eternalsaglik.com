import React, { useEffect } from "react";
import styles from './index.module.css';
import ScrollReveal from "../scrollreveal";

const FeaturableWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://featurable.com/assets/bundle.js";
    script.defer = true;
    script.charset = "UTF-8";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <span className={styles.badge}>Hasta Yorumları</span>
          <h2>Hastalarımız Ne Diyor?</h2>
          <p>Google üzerindeki gerçek hasta değerlendirmelerimiz</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className={styles.widgetWrap}>
          <div
            id="featurable-ddd9981e-eda0-4798-a92b-2dca78041fb2"
            data-featurable-async
            data-location-code="de"
            className={styles.widget}
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FeaturableWidget;
