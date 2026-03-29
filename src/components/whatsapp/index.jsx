import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./index.module.css";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

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
      href="https://wa.me/905525189654?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.whatsapp} ${pulse ? styles.pulse : ""}`}
      aria-label="WhatsApp ile iletişime geç"
    >
      <FaWhatsapp />
      <span className={styles.tooltip}>Bize yazın!</span>
    </a>
  );
};

export default WhatsAppButton;
