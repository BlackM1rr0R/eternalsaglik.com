import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlobeHemisphereEast, Check, CaretDown } from "@phosphor-icons/react";
import { LANGS, useLang } from "../../i18n";
import styles from "./index.module.css";

// Language picker: compact pill in the nav, or a row of chips (`variant="chips"`) in menus.
const LangSwitch = ({ variant = "menu" }) => {
  const { lang, setLang, meta } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  if (variant === "chips") {
    return (
      <div className={styles.chips} role="radiogroup" aria-label="Dil / Language">
        {LANGS.map((l) => (
          <button key={l.code} type="button" role="radio" aria-checked={lang === l.code}
            className={`${styles.chip} ${lang === l.code ? styles.chipOn : ""}`} onClick={() => setLang(l.code)}>
            <span>{l.short}</span> {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label="Dil / Language">
        <GlobeHemisphereEast weight="duotone" />
        <span>{meta.short}</span>
        <CaretDown className={`${styles.caret} ${open ? styles.caretOpen : ""}`} weight="bold" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.menu}
            role="listbox"
            aria-label="Dil / Language"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {LANGS.map((l, i) => (
              <motion.li key={l.code} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                <button type="button" role="option" aria-selected={lang === l.code}
                  className={`${styles.item} ${lang === l.code ? styles.itemOn : ""}`}
                  onClick={() => { setLang(l.code); setOpen(false); }}>
                  <span className={styles.code}>{l.short}</span>
                  <span className={styles.label}>{l.label}</span>
                  {lang === l.code && <Check weight="bold" className={styles.check} />}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LangSwitch;
