import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUniversalAccess, FaTimes, FaMoon, FaAdjust, FaTextHeight, FaHandPointer, FaPause, FaUndo } from "react-icons/fa";
import w from "../../styles/widgets.module.css";
import ui from "../../styles/ui.module.css";
import { useSettings } from "../../context/settings";

const Switch = ({ on, onClick, label }) => (
  <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onClick}
    className={`${w.switch} ${on ? w.switchOn : ""}`} />
);

// Accessibility panel: text size, big mode for elderly users, contrast, dark mode, motion.
const A11yPanel = () => {
  const [open, setOpen] = useState(false);
  const { settings, update, reset } = useSettings();
  const scale = (d) => update({ fontScale: Math.min(1.5, Math.max(0.9, +(settings.fontScale + d).toFixed(2))) });

  return (
    <>
      <button type="button" className={`${w.fab} ${w.fabA11y}`} onClick={() => setOpen((o) => !o)}
        aria-label="Erişilebilirlik ayarları" aria-expanded={open}>
        <FaUniversalAccess />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label="Erişilebilirlik ayarları" className={`${w.sheet} ${w.sheetLeft}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <div className={w.sheetHead}>
              <h3><FaUniversalAccess style={{ color: "var(--blue-500)" }} /> Erişilebilirlik</h3>
              <button className={w.close} onClick={() => setOpen(false)} aria-label="Kapat"><FaTimes /></button>
            </div>
            <div className={w.sheetBody} style={{ gap: 0 }}>
              <div className={w.optRow}>
                <span><FaTextHeight /> Yazı boyutu</span>
                <div className={w.stepper}>
                  <button type="button" onClick={() => scale(-0.1)} aria-label="Yazıyı küçült">A−</button>
                  <output aria-live="polite">{Math.round(settings.fontScale * 100)}%</output>
                  <button type="button" onClick={() => scale(0.1)} aria-label="Yazıyı büyüt">A+</button>
                </div>
              </div>
              <div className={w.optRow}>
                <span><FaHandPointer /> Büyük mod (yaşlılar için)</span>
                <Switch label="Büyük mod" on={settings.bigMode}
                  onClick={() => update({ bigMode: !settings.bigMode, fontScale: !settings.bigMode ? Math.max(settings.fontScale, 1.2) : 1 })} />
              </div>
              <div className={w.optRow}>
                <span><FaAdjust /> Yüksek kontrast</span>
                <Switch label="Yüksek kontrast" on={settings.contrast} onClick={() => update({ contrast: !settings.contrast })} />
              </div>
              <div className={w.optRow}>
                <span><FaMoon /> Karanlık mod</span>
                <Switch label="Karanlık mod" on={settings.theme === "dark"}
                  onClick={() => update({ theme: settings.theme === "dark" ? "light" : "dark" })} />
              </div>
              <div className={w.optRow}>
                <span><FaPause /> Animasyonları azalt</span>
                <Switch label="Animasyonları azalt" on={settings.reduceMotion} onClick={() => update({ reduceMotion: !settings.reduceMotion })} />
              </div>
              <button type="button" onClick={reset} className={`${ui.btn} ${ui.btnGhost}`} style={{ marginTop: 14 }}>
                <FaUndo /> Varsayılana dön
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default A11yPanel;
