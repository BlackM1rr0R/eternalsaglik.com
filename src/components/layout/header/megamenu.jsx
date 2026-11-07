import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Phone, Star, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import styles from "./megamenu.module.css";
import { useLang, useT, localize } from "../../../i18n";
import * as S from "../../../data/services";
import * as SR from "../../../data/serums";
import { primaryPhone } from "../../../config/site";
import { openPalette } from "../../cmdk";

const dict = {
  tr: { services: "Hizmetlerimiz", all: "Tüm hizmetler", serums: "Popüler serumlar", allSerums: "Tüm serumlar", quiz: "Hangi serum bana uygun?", ctaT: "Evde sağlık, tek tıkla", ctaD: "Formu doldurun, talebiniz WhatsApp ile bize ulaşsın.", book: "Randevu Al", search: "Ara" },
  en: { services: "Our services", all: "All services", serums: "Popular drips", allSerums: "All drips", quiz: "Which drip suits me?", ctaT: "Home healthcare in one tap", ctaD: "Fill in the form and your request reaches us on WhatsApp.", book: "Book Now", search: "Search" },
  ar: { services: "خدماتنا", all: "كل الخدمات", serums: "محاليل شائعة", allSerums: "كل المحاليل", quiz: "أي محلول يناسبني؟", ctaT: "رعاية منزلية بنقرة واحدة", ctaD: "املأ النموذج وسيصلنا طلبك عبر واتساب.", book: "احجز موعداً", search: "بحث" },
};

const list = { hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } };

const MegaMenu = ({ onNavigate }) => {
  const { lang } = useLang();
  const t = useT(dict);
  const services = S.services.map((s) => localize(s, S.translations, lang, "slug"));
  const serums = SR.serumList.filter((s) => s.popular).slice(0, 5).map((s) => localize(s, SR.listTranslations || SR.translations, lang, "id"));

  return (
    <motion.div className={styles.panel} initial="hidden" animate="show" variants={list}>
      <div className={styles.col}>
        <h4>{t("services")}</h4>
        <motion.ul className={styles.services} variants={list}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li key={s.slug} variants={item}>
                <Link to={`/hizmet/${s.slug}`} className={styles.svc} onClick={onNavigate}>
                  <span className={`${styles.svcIcon} ${styles[s.tone] || ""}`}><Icon /></span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.need || s.desc}</small>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
        <Link to="/hizmetlerimiz" className={styles.more} onClick={onNavigate}>{t("all")} <ArrowRight /></Link>
      </div>

      <div className={`${styles.col} ${styles.serumCol}`}>
        <h4>{t("serums")}</h4>
        <motion.ul className={styles.serums} variants={list}>
          {serums.map((s) => (
            <motion.li key={s.id} variants={item}>
              <Link to={`/serumlar/${s.id}`} className={styles.serum} onClick={onNavigate}>
                <Star weight="fill" /> <span>{s.info}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <Link to="/serum-testi" className={styles.quiz} onClick={onNavigate}><Sparkle /> {t("quiz")}</Link>
        <Link to="/serumlar" className={styles.more} onClick={onNavigate}>{t("allSerums")} <ArrowRight /></Link>
      </div>

      <motion.div className={styles.cta} variants={item}>
        <span className={styles.ctaGlow} aria-hidden="true" />
        <CalendarCheck className={styles.ctaIcon} />
        <strong>{t("ctaT")}</strong>
        <p>{t("ctaD")}</p>
        <Link to="/randevu" className={styles.ctaBtn} onClick={onNavigate}>{t("book")} <ArrowRight /></Link>
        <a href={`tel:${primaryPhone.tel}`} className={styles.ctaPhone}><Phone /> <bdi>{primaryPhone.display}</bdi></a>
        <button type="button" className={styles.search} onClick={() => { onNavigate?.(); openPalette(); }}>
          <MagnifyingGlass /> {t("search")} <kbd>Ctrl K</kbd>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MegaMenu;
