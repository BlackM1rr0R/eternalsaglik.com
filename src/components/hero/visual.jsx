import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./visual.module.css";

// Animated hero illustration: a glossy IV bag with a falling drip next to a live ECG card.
// Original SVG, no external assets.
const HeroVisual = () => {
  const reduce = useReducedMotion();
  return (
    <div className={styles.wrap} aria-hidden="true">
      <motion.svg
        className={styles.bag}
        viewBox="0 0 120 220"
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="hvBag" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ccfbf1" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="hvLiquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
          <radialGradient id="hvShine" cx="0.3" cy="0.2" r="0.6">
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M60 4 v14" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <rect x="18" y="18" width="84" height="120" rx="22" fill="url(#hvBag)" stroke="#14b8a6" strokeWidth="3" />
        <motion.rect
          x="26" width="68" rx="14" fill="url(#hvLiquid)"
          initial={{ y: 52, height: 78 }}
          animate={reduce ? undefined : { y: [52, 60, 52], height: [78, 70, 78] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="26" y="26" width="30" height="60" rx="14" fill="url(#hvShine)" />
        <path d="M52 92 h16 M60 84 v16" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 138 v22" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
        <rect x="50" y="160" width="20" height="26" rx="6" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="3" />
        {!reduce && (
          <motion.circle cx="60" cy="168" r="4" fill="#0d9488"
            animate={{ cy: [166, 182], opacity: [1, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn" }} />
        )}
        <path d="M60 186 C60 205, 90 200, 100 218" stroke="#14b8a6" strokeWidth="3" fill="none" />
      </motion.svg>

      <motion.div className={styles.monitor} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className={styles.monHead}>
          <span className={styles.live}><i /> Canlı takip</span>
          <strong>72 <small>bpm</small></strong>
        </div>
        <svg viewBox="0 0 240 60" className={styles.ecg}>
          <path className={styles.ecgBase} d="M0 32 H60 L72 12 L86 52 L98 6 L110 44 L120 32 H240" />
          <path d="M0 32 H60 L72 12 L86 52 L98 6 L110 44 L120 32 H240" />
        </svg>
        <div className={styles.monStats}>
          <span><b>120/80</b> Tansiyon</span>
          <span><b>98%</b> SpO₂</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
