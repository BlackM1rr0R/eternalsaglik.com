import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logoresmi.png";
import { Sling as Hamburger } from "hamburger-react";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Ana Sayfa" },
  { path: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { path: "/serumlar", label: "Serumlar" },
  { path: "/about", label: "Hakkımızda" },
  { path: "/gallery", label: "Blog" },
  { path: "/contact", label: "İletişim" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Wrapper>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            <img src={Logo} alt="Eternal Sağlık" />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>ETERNAL</span>
              <span className={styles.logoSub}>Sağlık Hizmetleri</span>
            </div>
          </Link>

          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${
                  location.pathname === link.path ? styles.active : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <a href="tel:05525189654" className={styles.phoneBtn}>
              <FaPhoneAlt />
              <span>Ara</span>
            </a>
            <Link
              to="/randevu"
              className={styles.appointBtn}
            >
              Randevu Al
            </Link>
            <a
              href="https://www.instagram.com/sakaryaevdesaglik.esh/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaInstagram />
            </a>
          </div>

          <div className={styles.hamburger}>
            <Hamburger
              size={22}
              distance="lg"
              color={scrolled ? "#0d9488" : "#0f172a"}
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
            />
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`${styles.mobileLink} ${
                        location.pathname === link.path ? styles.active : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link
                    to="/randevu"
                    className={styles.mobileAppointBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaPhoneAlt />
                    Randevu Al
                  </Link>
                </motion.div>
                <motion.div
                  className={styles.mobileSocial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href="https://www.instagram.com/sakaryaevdesaglik.esh/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a href="tel:05525189654">
                    <FaPhoneAlt />
                    <span>0552 518 96 54</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </header>
  );
};

export default React.memo(Header);
