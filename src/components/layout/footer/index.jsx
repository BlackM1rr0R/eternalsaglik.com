import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logoeternal.png";
import { FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}>
        <Wrapper>
          <div className={styles.topContent}>
            <a href="tel:05525189654" className={styles.topCard}>
              <div className={styles.topCardIcon} style={{background:"rgba(45,212,191,0.15)"}}><FaPhoneAlt /></div>
              <div className={styles.topCardText}>
                <span>Bizi Arayın</span>
                <strong>0552 518 96 54</strong>
              </div>
            </a>
            <a href="mailto:info@eternalsaglik.com" className={styles.topCard}>
              <div className={styles.topCardIcon} style={{background:"rgba(96,165,250,0.15)"}}><FaEnvelope /></div>
              <div className={styles.topCardText}>
                <span>E-posta</span>
                <strong>info@eternalsaglik.com</strong>
              </div>
            </a>
            <div className={styles.topCard}>
              <div className={styles.topCardIcon} style={{background:"rgba(251,191,36,0.15)"}}><FaMapMarkerAlt /></div>
              <div className={styles.topCardText}>
                <span>Adres</span>
                <strong>Sakarya, Semerciler Mah.</strong>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      <Wrapper>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logoLink}>
              <img src={Logo} alt="Eternal Sağlık" />
              <div>
                <h3>ETERNAL</h3>
                <p>Sağlık Hizmetleri</p>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              Siz neredeyseniz biz oradayız. Uzman sağlık ekibimizle evinizin
              konforunda kaliteli sağlık hizmeti sunuyoruz.
            </p>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/sakaryaevdesaglik.esh/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className={styles.linksGroup}>
            <h4>Sayfalar</h4>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/randevu">Randevu</Link></li>
              <li><Link to="/hizmetlerimiz">Hizmetlerimiz</Link></li>
              <li><Link to="/about">Hakkımızda</Link></li>
              <li><Link to="/gallery">Blog</Link></li>
              <li><Link to="/contact">İletişim</Link></li>
            </ul>
          </div>

          <div className={styles.linksGroup}>
            <h4>Hizmetler</h4>
            <ul>
              <li><Link to="/serumlar">Serumlar</Link></li>
              <li><Link to="/details/15">IV Serumlar</Link></li>
              <li><Link to="/details/16">IV Terapiler</Link></li>
              <li><Link to="/details/17">Lab Paketleri</Link></li>
              <li><Link to="/details/18">Sağlıklı Yaşam</Link></li>
              <li><Link to="/details/19">SSS</Link></li>
            </ul>
          </div>

          <div className={styles.linksGroup}>
            <h4>Diğer Siteler</h4>
            <ul>
              <li>
                <a href="https://www.hemsirenburada.com/" target="_blank" rel="noopener noreferrer">
                  İstanbul Sağlık Sitemiz
                </a>
              </li>
              <li>
                <a href="https://kantahlilim.com/" target="_blank" rel="noopener noreferrer">
                  Kan Tahlili Sitemiz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Wrapper>

      <div className={styles.bottom}>
        <Wrapper>
          <div className={styles.bottomContent}>
            <p>
              &copy; {currentYear} ETERNAL Sağlık Hizmetleri. Tüm hakları saklıdır.
            </p>
            <p className={styles.madeWith}>
              <FaHeart /> ile yapıldı
            </p>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
