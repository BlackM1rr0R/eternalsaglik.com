import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logo-eternal.svg";
import { Sling as Hamburger } from "hamburger-react";
import { FaInstagram, FaPhoneAlt, FaMoon, FaSun } from "react-icons/fa";
import { useSettings } from "../../../context/settings";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "../../../config/site";

const navLinks = [
  { path: "/", label: "Ana Sayfa" },
  { path: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { path: "/paketler", label: "Paketler" },
  { path: "/serumlar", label: "Serumlar" },
  { path: "/about", label: "Hakkımızda" },
  { path: "/gallery", label: "Blog" },
  { path: "/contact", label: "İletişim" },
];

// Extra links shown only in the mobile menu.
const moreLinks = [
  { path: "/aileniz-icin", label: "Aileniz İçin" },
  { path: "/belirti-rehberi", label: "Belirti Rehberi" },
  { path: "/serum-testi", label: "Serum Testi" },
  { path: "/bakim-rehberi", label: "Bakım Rehberleri" },
  { path: "/kurumsal", label: "Kurumsal" },
  { path: "/sss", label: "SSS" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings, update } = useSettings();
  const dark = settings.theme === "dark";
  const toggleTheme = () => update({ theme: dark ? "light" : "dark" });

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
            <button type="button" onClick={toggleTheme} className={styles.socialLink} aria-label={dark ? "Açık moda geç" : "Karanlık moda geç"}
              style={{ border: 0, cursor: "pointer", background: "transparent" }}>
              {dark ? <FaSun /> : <FaMoon />}
            </button>
            <Link to="/en" className={styles.socialLink} style={{ fontWeight: 800, fontSize: 13 }} aria-label="English">EN</Link>
            <a href={`tel:${SITE.phones[0].tel}`} className={styles.phoneBtn}>
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
              href={SITE.instagram}
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
              color={scrolled ? "#0d9488" : dark ? "#e8eef6" : "#0f172a"}
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "6px 0 10px" }}>
                  {moreLinks.map((l) => (
                    <Link key={l.path} to={l.path} onClick={() => setIsMenuOpen(false)}
                      style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--text)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  ))}
                  <Link to="/en" onClick={() => setIsMenuOpen(false)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--text)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>English</Link>
                  <Link to="/ar" onClick={() => setIsMenuOpen(false)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--text)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>العربية</Link>
                  <button type="button" onClick={toggleTheme} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--text)", background: "transparent", fontSize: 14, fontWeight: 600, display: "inline-flex", gap: 6, alignItems: "center", font: "inherit" }}>
                    {dark ? <FaSun /> : <FaMoon />} {dark ? "Açık mod" : "Karanlık mod"}
                  </button>
                </div>
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
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a href={`tel:${SITE.phones[0].tel}`}>
                    <FaPhoneAlt />
                    <span>{SITE.phones[0].display}</span>
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
