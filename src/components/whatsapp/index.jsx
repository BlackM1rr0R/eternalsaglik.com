import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "../../icons/modern";
import styles from "./index.module.css";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT } from "../../i18n";
import common from "../../i18n/common";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const t = useT(common);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const pulseTimer = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <a
      href={whatsappUrl(t("waDefault"))}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.whatsapp} ${pulse ? styles.pulse : ""}`}
      aria-label={t("whatsapp")}
    >
      <FaWhatsapp />
      <span className={styles.tooltip}>{t("writeUs")}</span>
    </a>
  );
};

export default WhatsAppButton;
