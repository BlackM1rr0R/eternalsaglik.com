import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, GoogleLogo, Quotes, ArrowUpRight } from "@phosphor-icons/react";
import ScrollReveal from "../scrollreveal";
import { Float } from "../motion";
import { SITE } from "../../config/site";
import { useT } from "../../i18n";
import styles from "./index.module.css";

const dict = {
  tr: {
    badge: "Hasta yorumları",
    title: "Hastalarımız",
    accent: "ne diyor?",
    lead: "Bu bölümdeki yorumlar Google üzerinden doğrudan yüklenir; hiçbirini biz yazmıyor veya düzenlemiyoruz.",
    real: "Google'daki gerçek yorumlar",
    realSub: "Hizmet alan hastalar ve yakınlarından",
    all: "Google'da görüntüle",
  },
  en: {
    badge: "Patient reviews",
    title: "What our patients",
    accent: "are saying",
    lead: "The reviews in this section are loaded directly from Google; we do not write or edit any of them.",
    real: "Genuine reviews on Google",
    realSub: "From patients and their families",
    all: "View on Google",
  },
  ar: {
    badge: "آراء المرضى",
    title: "ماذا يقول",
    accent: "مرضانا؟",
    lead: "تُحمَّل المراجعات في هذا القسم مباشرةً من Google، ولا نكتب أيًّا منها أو نعدّله.",
    real: "مراجعات حقيقية على Google",
    realSub: "من المرضى وذويهم",
    all: "عرض على Google",
  },
};

const ease = [0.16, 1, 0.3, 1];

const FeaturableWidget = () => {
  const t = useT(dict);
  const reduce = useReducedMotion();

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
          <span className={styles.badge}>{t("badge")}</span>
          <h2>
            {t("title")} <span className="accent">{t("accent")}</span>
          </h2>
          <p>{t("lead")}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className={styles.summary}>
          <span className={styles.gIcon} aria-hidden="true"><GoogleLogo weight="bold" /></span>
          <div className={styles.summaryText}>
            <div className={styles.stars} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, scale: 0.3, rotate: -40 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
                >
                  <Star weight="fill" />
                </motion.span>
              ))}
            </div>
            <strong>{t("real")}</strong>
            <small>{t("realSub")}</small>
          </div>
          <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className={styles.gLink}>
            {t("all")} <ArrowUpRight weight="bold" className={styles.flip} />
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className={styles.widgetWrap}>
          <Float className={`${styles.quote} ${styles.quoteA}`} amplitude={10} duration={7}>
            <Quotes weight="fill" />
          </Float>
          <Float className={`${styles.quote} ${styles.quoteB}`} amplitude={8} duration={8} delay={1}>
            <Quotes weight="fill" />
          </Float>
          <div
            id="featurable-ddd9981e-eda0-4798-a92b-2dca78041fb2"
            data-featurable-async
            data-location-code="tr"
            className={styles.widget}
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FeaturableWidget;
