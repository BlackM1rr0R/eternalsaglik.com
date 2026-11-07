import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { MagnifyingGlass, CaretDown } from "@phosphor-icons/react";
import { revealThemeChange } from "../../../utils/viewtransition";
import { openPalette, prefetchPalette } from "../../cmdk";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaMoon, FaSun, FaInstagram, FaArrowRight, FaCalendarCheck, FaTimes } from "../../../icons/modern";
import styles from "./index.module.css";
import Logo from "../../../assets/images/logo-eternal.svg";
import { useSettings } from "../../../context/settings";
import { SITE, primaryPhone } from "../../../config/site";

import LangSwitch from "../../langswitch";
import { useT } from "../../../i18n";
import common from "../../../i18n/common";

const NAV = [
  ["/", "home"], ["/hizmetlerimiz", "services"], ["/paketler", "packages"], ["/serumlar", "serums"],
  ["/about", "about"], ["/gallery", "blog"], ["/contact", "contact"],
];

// Extra destinations, shown in the mobile menu.
const MORE = [
  ["/aileniz-icin", "family"], ["/belirti-rehberi", "symptoms"], ["/serum-testi", "quiz"],
  ["/bakim-rehberi", "guides"], ["/kurumsal", "corporate"], ["/sss", "faq"],
];

const loadMega = () => import("./megamenu");
const MegaMenu = lazy(loadMega);

const isActive = (pathname, path) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { settings, update } = useSettings();
  const dark = settings.theme === "dark";
  // Circular reveal from the button (View Transitions); the attribute is set directly so the
  // new snapshot already has the new theme.
  const toggleTheme = (e) =>
    revealThemeChange(e, () => {
      const next = dark ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      update({ theme: next });
    });
  const [mega, setMega] = useState(false);
  const [megaLoaded, setMegaLoaded] = useState(false);
  const megaTimer = useRef(null);
  const openMega = () => { clearTimeout(megaTimer.current); loadMega(); setMegaLoaded(true); megaTimer.current = setTimeout(() => setMega(true), 90); };
  const closeMega = () => { clearTimeout(megaTimer.current); megaTimer.current = setTimeout(() => setMega(false), 160); };
  const t = useT(common);
  const navLinks = NAV.map(([path, k]) => ({ path, label: t("nav")[k] }));
  const moreLinks = MORE.map(([path, k]) => ({ path, label: t("more")[k] }));

  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);
  useEffect(() => {
    if (!mega) return undefined;
    const esc = (e) => e.key === "Escape" && setMega(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [mega]);
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
              <small>{t("brandSub")}</small>
            </span>
          </Link>

          <ul className={styles.links}>
            {navLinks.map((l) => {
              const active = isActive(pathname, l.path);
              return (
                <li key={l.path} {...(l.path === "/hizmetlerimiz" ? { onMouseEnter: openMega, onMouseLeave: closeMega, onFocus: openMega } : {})}>
                  <Link to={l.path} className={`${styles.link} ${active ? styles.linkActive : ""}`} aria-current={active ? "page" : undefined}
                    {...(l.path === "/hizmetlerimiz" ? { "aria-haspopup": "true", "aria-expanded": mega } : {})}>
                    {active && (
                      <motion.span layoutId="nav-pill" className={styles.pill} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className={styles.linkLabel}>{l.label}</span>
                    {l.path === "/hizmetlerimiz" && <CaretDown className={`${styles.caret} ${mega ? styles.caretOpen : ""}`} weight="bold" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <button type="button" className={`${styles.iconBtn} ${styles.searchBtn}`} onClick={openPalette} onPointerEnter={prefetchPalette} aria-label="Ctrl K" title="Ctrl + K">
              <MagnifyingGlass /> <kbd>Ctrl K</kbd>
            </button>
            <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={dark ? t("themeLight") : t("themeDark")}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={dark ? "sun" : "moon"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: "grid" }}>
                  {dark ? <FaSun /> : <FaMoon />}
                </motion.span>
              </AnimatePresence>
            </button>
            <span className={styles.lang}><LangSwitch /></span>
            <a href={`tel:${primaryPhone.tel}`} className={styles.phone} title={primaryPhone.display} aria-label={`${t("call")} ${primaryPhone.display}`}>
              <span className={styles.phoneIcon}><FaPhoneAlt /></span>
              <span>{primaryPhone.display}</span>
            </a>
            <Link to="/randevu" className={styles.cta}>
              {t("book")} <FaArrowRight />
            </Link>
            <button type="button" className={styles.burger} onClick={() => setOpen(true)} aria-label={t("menuOpen")} aria-expanded={open}>
              <span /><span /><span />
            </button>
          </div>
        </motion.nav>
        {megaLoaded && (
          <div className={styles.megaWrap} onMouseEnter={openMega} onMouseLeave={closeMega}>
            <AnimatePresence>
              {mega && (
                <motion.div className={styles.mega}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
                  <Suspense fallback={null}><MegaMenu onNavigate={() => setMega(false)} /></Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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
                <span className={styles.logoText}><strong>ETERNAL</strong><small>{t("brandSub")}</small></span>
              </Link>
              <button type="button" className={styles.iconBtn} onClick={() => setOpen(false)} aria-label={t("menuClose")}><FaTimes /></button>
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

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <LangSwitch variant="chips" />
            </motion.div>

            <motion.div className={styles.sheetActions} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link to="/randevu" className={styles.cta}><FaCalendarCheck /> {t("book")}</Link>
              <a href={`tel:${primaryPhone.tel}`} className={styles.phone}><span className={styles.phoneIcon}><FaPhoneAlt /></span>{primaryPhone.display}</a>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label="Instagram"><FaInstagram /></a>
                <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={dark ? t("themeLight") : t("themeDark")}>{dark ? <FaSun /> : <FaMoon />}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);
