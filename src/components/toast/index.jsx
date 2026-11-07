/* Toast notifications.
 *   import { toast } from "../toast";
 *   toast({ title: "Talebiniz hazır", text: "WhatsApp açıldı…", type: "success" | "info" | "error", duration: 5000 });
 * <Toaster /> is mounted once in App.jsx.
 */
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, WarningCircle, X } from "@phosphor-icons/react";
import styles from "./index.module.css";

const EVT = "eternal:toast";
let seq = 0;

export const toast = (opts) => {
  window.dispatchEvent(new CustomEvent(EVT, { detail: { id: ++seq, type: "success", duration: 5000, ...opts } }));
};

const ICON = { success: CheckCircle, info: Info, error: WarningCircle };

const Toaster = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const on = (e) => {
      const t = e.detail;
      setItems((list) => [...list.slice(-2), t]);
      if (t.duration) setTimeout(() => setItems((list) => list.filter((x) => x.id !== t.id)), t.duration);
    };
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);

  const close = (id) => setItems((list) => list.filter((x) => x.id !== id));

  return (
    <div className={styles.stack} aria-live="polite" aria-atomic="false">
      <AnimatePresence initial={false}>
        {items.map((t) => {
          const Icon = ICON[t.type] || Info;
          return (
            <motion.div
              key={t.id}
              layout
              role="status"
              className={`${styles.toast} ${styles[t.type] || ""}`}
              initial={{ opacity: 0, y: 24, scale: 0.9, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <span className={styles.icon}><Icon weight="fill" /></span>
              <div className={styles.body}>
                {t.title && <strong>{t.title}</strong>}
                {t.text && <p>{t.text}</p>}
              </div>
              <button type="button" className={styles.close} onClick={() => close(t.id)} aria-label="×"><X /></button>
              {t.duration > 0 && <motion.span className={styles.bar} initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: t.duration / 1000, ease: "linear" }} />}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
