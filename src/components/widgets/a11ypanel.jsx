import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUniversalAccess, FaTimes, FaMoon, FaAdjust, FaTextHeight, FaHandPointer, FaPause, FaUndo } from "../../icons/modern";
import w from "../../styles/widgets.module.css";
import ui from "../../styles/ui.module.css";
import { useSettings } from "../../context/settings";
import { useT } from "../../i18n";
import common from "../../i18n/common";
import LangSwitch from "../langswitch";

const Switch = ({ on, onClick, label }) => (
  <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onClick}
    className={`${w.switch} ${on ? w.switchOn : ""}`} />
);

// Accessibility panel: text size, big mode for elderly users, contrast, dark mode, motion.
const A11yPanel = () => {
  const [open, setOpen] = useState(false);
  const { settings, update, reset } = useSettings();
  const t = useT(common);
  const a = t("a11y");
  const scale = (d) => update({ fontScale: Math.min(1.5, Math.max(0.9, +(settings.fontScale + d).toFixed(2))) });

  return (
    <>
      <button type="button" className={`${w.fab} ${w.fabA11y}`} onClick={() => setOpen((o) => !o)}
        aria-label={a.open} aria-expanded={open}>
        <FaUniversalAccess />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label={a.open} className={`${w.sheet} ${w.sheetLeft}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <div className={w.sheetHead}>
              <h3><FaUniversalAccess style={{ color: "var(--blue-500)" }} /> {a.title}</h3>
              <button className={w.close} onClick={() => setOpen(false)} aria-label={t("sos").close}><FaTimes /></button>
            </div>
            <div className={w.sheetBody} style={{ gap: 0 }}>
              <div className={w.optRow}>
                <span><FaTextHeight /> {a.text}</span>
                <div className={w.stepper}>
                  <button type="button" onClick={() => scale(-0.1)} aria-label={a.smaller}>A−</button>
                  <output aria-live="polite">{Math.round(settings.fontScale * 100)}%</output>
                  <button type="button" onClick={() => scale(0.1)} aria-label={a.bigger}>A+</button>
                </div>
              </div>
              <div className={w.optRow}>
                <span><FaHandPointer /> {a.big}</span>
                <Switch label={a.big} on={settings.bigMode}
                  onClick={() => update({ bigMode: !settings.bigMode, fontScale: !settings.bigMode ? Math.max(settings.fontScale, 1.2) : 1 })} />
              </div>
              <div className={w.optRow}>
                <span><FaAdjust /> {a.contrast}</span>
                <Switch label={a.contrast} on={settings.contrast} onClick={() => update({ contrast: !settings.contrast })} />
              </div>
              <div className={w.optRow}>
                <span><FaMoon /> {a.dark}</span>
                <Switch label={a.dark} on={settings.theme === "dark"}
                  onClick={() => update({ theme: settings.theme === "dark" ? "light" : "dark" })} />
              </div>
              <div className={w.optRow}>
                <span><FaPause /> {a.motion}</span>
                <Switch label={a.motion} on={settings.reduceMotion} onClick={() => update({ reduceMotion: !settings.reduceMotion })} />
              </div>
              <div className={w.optRow} style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <span>{a.language}</span>
                <LangSwitch variant="chips" />
              </div>
              <button type="button" onClick={reset} className={`${ui.btn} ${ui.btnGhost}`} style={{ marginTop: 14 }}>
                <FaUndo /> {a.reset}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default A11yPanel;
