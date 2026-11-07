import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAmbulance, FaMapMarkerAlt, FaPhoneAlt, FaTimes, FaExclamationTriangle } from "../../icons/modern";
import w from "../../styles/widgets.module.css";
import ui from "../../styles/ui.module.css";
import { primaryPhone } from "../../config/site";
import { openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";
import { useT } from "../../i18n";
import common from "../../i18n/common";

export const openEmergency = () => window.dispatchEvent(new Event("eternal:sos"));

// "Şimdi doktor lazım": call now, or send the current location over WhatsApp.
const EmergencySheet = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const t = useT(common);
  const s = t("sos");

  useEffect(() => {
    const on = () => setOpen(true);
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("eternal:sos", on);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("eternal:sos", on);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const sendLocation = () => {
    trackEvent("generate_lead", { form: "emergency" });
    const fallback = () => {
      setStatus(s.locFail);
      openWhatsApp(`${s.msg} ${s.myAddr}: `);
    };
    if (!navigator.geolocation) return fallback();
    setStatus(s.locating);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const maps = `https://maps.google.com/?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`;
        setStatus("");
        openWhatsApp(`${s.msg}\n${s.myLoc}: ${maps}`);
      },
      fallback,
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className={w.backdrop} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="sos-title"
            className={`${w.sheet} ${w.sheetCenter}`}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
          >
            <div className={w.sheetHead}>
              <h3 id="sos-title"><FaAmbulance style={{ color: "var(--danger)" }} /> {s.title}</h3>
              <button className={w.close} onClick={() => setOpen(false)} aria-label={s.close}><FaTimes /></button>
            </div>
            <div className={w.sheetBody}>
              <div className={`${ui.note} ${ui.noteDanger}`}>
                <FaExclamationTriangle />
                <span>
                  {s.warn}
                </span>
              </div>
              <a href="tel:112" className={`${ui.btn} ${ui.btnDanger} ${ui.btnBlock}`}>
                <FaPhoneAlt /> {s.call112}
              </a>
              <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
                <FaPhoneAlt /> Eternal Sağlık: {primaryPhone.display}
              </a>
              <button type="button" onClick={sendLocation} className={`${ui.btn} ${ui.btnWa} ${ui.btnBlock}`}>
                <FaMapMarkerAlt /> {s.sendLoc}
              </button>
              {status && <p className={ui.hint} role="status">{status}</p>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmergencySheet;
