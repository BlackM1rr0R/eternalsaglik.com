import React from "react";
import styles from "./index.module.css";

// Glossy "3D" icon: layered gradients, a specular highlight and a soft floor shadow.
// Pure CSS, so it costs no image downloads and follows dark mode.
const Icon3D = ({ icon, tone = "teal", size = 64, float = false, className = "" }) => (
  <span
    className={`${styles.wrap} ${styles[tone] || ""} ${float ? styles.float : ""} ${className}`}
    style={{ "--size": `${size}px` }}
    aria-hidden="true"
  >
    <span className={styles.orb}>
      <span className={styles.glyph}>{icon}</span>
      <span className={styles.shine} />
    </span>
    <span className={styles.floor} />
  </span>
);

export default Icon3D;
