import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaMoon, FaSun, FaInstagram, FaArrowRight, FaCalendarCheck, FaTimes } from "react-icons/fa";
import styles from "./index.module.css";
import Logo from "../../../assets/images/logo-eternal.svg";
import { useSettings } from "../../../context/settings";
import { SITE, primaryPhone } from "../../../config/site";

const navLinks = [
  { path: "/", label: "Ana Sayfa" },
  { path: "/hizmetlerimiz", label: "Hizmetler" },
  { path: "/paketler", label: "Paketler" },
  { path: "/serumlar", label: "Serumlar" },
  { path: "/about", label: "Hakkımızda" },
  { path: "/gallery", label: "Blog" },
  { path: "/contact", label: "İletişim" },
];

// Extra destinations, shown in the mobile menu.
const moreLinks = [
  { path: "/aileniz-icin", label: "Aileniz İçin" },
  { path: "/belirti-rehberi", label: "Belirti Rehberi" },
  { path: "/serum-testi", label: "Serum Testi" },
  { path: "/bakim-rehberi", label: "Bakım Rehberleri" },
  { path: "/kurumsal", label: "Kurumsal" },
  { path: "/sss", label: "SSS" },
  { path: "/en", label: "English" },
  { path: "/ar", label: "العربية" },
];

const isActive = (pathname, path) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { settings, update } = useSettings();
  const dark = settings.theme === "dark";
  const toggleTheme = () => update({ theme: dark ? "light" : "dark" });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <motion.nav
          className={styles.bar}
          aria-label="Ana menü"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className={styles.logo} aria-label="ETERNAL Sağlık ana sayfa">
            <span className={styles.logoMark}><img src={Logo} alt="" /></span>
            <span className={styles.logoText}>
              <strong>ETERNAL</strong>
              <small>Sağlık Hizmetleri</small>
            </span>
          </Link>

          <ul className={styles.links}>
            {navLinks.map((l) => {
              const active = isActive(pathname, l.path);
              return (
                <li key={l.path}>
                  <Link to={l.path} className={`${styles.link} ${active ? styles.linkActive : ""}`} aria-current={active ? "page" : undefined}>
                    {active && (
                      <motion.span layoutId="nav-pill" className={styles.pill} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className={styles.linkLabel}>{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={dark ? "Açık moda geç" : "Karanlık moda geç"}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={dark ? "sun" : "moon"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: "grid" }}>
                  {dark ? <FaSun /> : <FaMoon />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link to="/en" className={`${styles.iconBtn} ${styles.lang}`} aria-label="English">EN</Link>
            <a href={`tel:${primaryPhone.tel}`} className={styles.phone}>
              <span className={styles.phoneIcon}><FaPhoneAlt /></span>
              <span>{primaryPhone.display}</span>
            </a>
            <Link to="/randevu" className={styles.cta}>
              Randevu Al <FaArrowRight />
            </Link>
            <button type="button" className={styles.burger} onClick={() => setOpen(true)} aria-label="Menüyü aç" aria-expanded={open}>
              <span /><span /><span />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.sheetTop}>
              <Link to="/" className={styles.logo}>
                <span className={styles.logoMark}><img src={Logo} alt="" /></span>
                <span className={styles.logoText}><strong>ETERNAL</strong><small>Sağlık Hizmetleri</small></span>
              </Link>
              <button type="button" className={styles.iconBtn} onClick={() => setOpen(false)} aria-label="Menüyü kapat"><FaTimes /></button>
            </div>

            <nav className={styles.sheetLinks} aria-label="Mobil menü">
              {navLinks.map((l, i) => (
                <motion.div key={l.path} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}>
                  <Link to={l.path} className={`${styles.sheetLink} ${isActive(pathname, l.path) ? styles.sheetLinkActive : ""}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span>{l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div className={styles.sheetMore} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              {moreLinks.map((l) => <Link key={l.path} to={l.path}>{l.label}</Link>)}
            </motion.div>

            <motion.div className={styles.sheetActions} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link to="/randevu" className={styles.cta}><FaCalendarCheck /> Randevu Al</Link>
              <a href={`tel:${primaryPhone.tel}`} className={styles.phone}><span className={styles.phoneIcon}><FaPhoneAlt /></span>{primaryPhone.display}</a>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label="Instagram"><FaInstagram /></a>
                <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={dark ? "Açık mod" : "Karanlık mod"}>{dark ? <FaSun /> : <FaMoon />}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);
