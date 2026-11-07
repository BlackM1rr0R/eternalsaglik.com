import React from "react";
import w from "../../styles/widgets.module.css";

// Suspense fallback while a lazy page chunk downloads: a drawing heartbeat line.
const PageLoader = () => (
  <div className={w.loader} role="status" aria-label="Yükleniyor">
    <svg className={w.loaderPulse} viewBox="0 0 220 60" aria-hidden="true">
      <path d="M0 30 H70 L82 10 L96 52 L110 4 L124 44 L134 30 H220" />
    </svg>
  </div>
);

export default PageLoader;
