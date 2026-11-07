import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowRight, FaClock } from "../../../icons/modern";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logo-eternal.svg";
import { SITE, primaryPhone } from "../../../config/site";
import { whatsappUrl } from "../../../utils/whatsapp";
import { useT } from "../../../i18n";
import common from "../../../i18n/common";

const groupDefs = (t) => {
  const n = t("nav"), m = t("more"), f = t("footer");
  return [
    { title: f.corporate, links: [["/", n.home], ["/about", n.about], ["/kurumsal", f.forCompanies], ["/gallery", n.blog], ["/contact", n.contact], ["/kvkk", f.kvkk]] },
    { title: f.servicesCol, links: [["/hizmetlerimiz", f.allServices], ["/paketler", f.carePackages], ["/serumlar", n.serums], ["/aileniz-icin", m.family], ["/randevu", t("onlineBook")]] },
    { title: f.guidesCol, links: [["/serum-testi", m.quiz], ["/belirti-rehberi", m.symptoms], ["/bakim-rehberi", m.guides], ["/sss", f.faqLong]] },
  ];
};

const Footer = () => {
  const year = new Date().getFullYear();
  const t = useT(common);
  const f = t("footer");
  const groups = groupDefs(t);
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className={styles.ctaEyebrow}><FaClock /> {f.ctaEyebrow}</span>
            <h2>{f.ctaA} <span className="accent">{f.ctaAccent}</span> {f.ctaB}</h2>
          </div>
          <div className={styles.ctaBtns}>
            <Link to="/randevu" className={styles.ctaPrimary}>{t("book")} <FaArrowRight /></Link>
            <a href={whatsappUrl(t("waDefault"))} target="_blank" rel="noopener noreferrer" className={styles.ctaGhost}><FaWhatsapp /> {t("whatsapp")}</a>
          </div>
        </motion.div>

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark}><img src={Logo} alt="" /></span>
              <span><strong>ETERNAL</strong><small>{t("brandSub")}</small></span>
            </Link>
            <p>{f.about}</p>
            <ul className={styles.contact}>
              <li><a href={`tel:${primaryPhone.tel}`}><FaPhoneAlt /> {primaryPhone.display}</a></li>
              <li><a href={`mailto:${SITE.email}`}><FaEnvelope /> {SITE.email}</a></li>
              <li><span><FaMapMarkerAlt /> {SITE.addressShort}</span></li>
            </ul>
            <div className={styles.socials}>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          {groups.map((g) => (
            <nav key={g.title} className={styles.group} aria-label={g.title}>
              <h4>{g.title}</h4>
              <ul>
                {g.links.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
              </ul>
            </nav>
          ))}

          <nav className={styles.group} aria-label={f.otherSites}>
            <h4>{f.otherSites}</h4>
            <ul>
              <li><a href="https://www.hemsirenburada.com/" target="_blank" rel="noopener noreferrer">{f.istanbul}</a></li>
              <li><a href="https://kantahlilim.com/" target="_blank" rel="noopener noreferrer">{f.bloodTest}</a></li>
            </ul>
          </nav>
        </div>
      </Wrapper>

      <div className={styles.wordmark} aria-hidden="true">ETERNAL</div>

      <div className={styles.bottom}>
        <Wrapper>
          <div className={styles.bottomInner}>
            <p>© {year} ETERNAL Sağlık Hizmetleri. {f.rights}</p>
            <p>{SITE.regions.join(" · ")}</p>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
