import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowRight, FaClock } from "react-icons/fa";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logo-eternal.svg";
import { SITE, primaryPhone } from "../../../config/site";
import { whatsappUrl } from "../../../utils/whatsapp";

const groups = [
  {
    title: "Kurumsal",
    links: [["/", "Ana Sayfa"], ["/about", "Hakkımızda"], ["/kurumsal", "Kurumlar İçin"], ["/gallery", "Blog"], ["/contact", "İletişim"], ["/kvkk", "KVKK ve Gizlilik"]],
  },
  {
    title: "Hizmetler",
    links: [["/hizmetlerimiz", "Tüm Hizmetler"], ["/paketler", "Bakım Paketleri"], ["/serumlar", "Serumlar"], ["/aileniz-icin", "Aileniz İçin"], ["/randevu", "Online Randevu"]],
  },
  {
    title: "Rehberler",
    links: [["/serum-testi", "Serum Testi"], ["/belirti-rehberi", "Belirti Rehberi"], ["/bakim-rehberi", "Bakım Rehberleri"], ["/sss", "Sıkça Sorulanlar"], ["/en", "English"], ["/ar", "العربية"]],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
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
            <span className={styles.ctaEyebrow}><FaClock /> 7 gün · 24 saat</span>
            <h2>Sağlığınız için <span className="accent">bir mesaj</span> uzağınızdayız.</h2>
          </div>
          <div className={styles.ctaBtns}>
            <Link to="/randevu" className={styles.ctaPrimary}>Randevu Al <FaArrowRight /></Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.ctaGhost}><FaWhatsapp /> WhatsApp</a>
          </div>
        </motion.div>

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark}><img src={Logo} alt="" /></span>
              <span><strong>ETERNAL</strong><small>Sağlık Hizmetleri</small></span>
            </Link>
            <p>Siz neredeyseniz biz oradayız. Uzman sağlık ekibimizle evinizin konforunda kaliteli sağlık hizmeti sunuyoruz.</p>
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

          <nav className={styles.group} aria-label="Diğer siteler">
            <h4>Diğer Sitelerimiz</h4>
            <ul>
              <li><a href="https://www.hemsirenburada.com/" target="_blank" rel="noopener noreferrer">İstanbul Sağlık</a></li>
              <li><a href="https://kantahlilim.com/" target="_blank" rel="noopener noreferrer">Kan Tahlili</a></li>
            </ul>
          </nav>
        </div>
      </Wrapper>

      <div className={styles.wordmark} aria-hidden="true">ETERNAL</div>

      <div className={styles.bottom}>
        <Wrapper>
          <div className={styles.bottomInner}>
            <p>© {year} ETERNAL Sağlık Hizmetleri. Tüm hakları saklıdır.</p>
            <p>{SITE.regions.join(" · ")}</p>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
