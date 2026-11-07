import React from "react";
import w from "../../styles/widgets.module.css";

// Suspense fallback while a lazy page chunk downloads: a shimmering page skeleton
// (hero, then a grid of cards) instead of an empty screen.
const PageLoader = () => (
  <div className={w.skel} role="status" aria-busy="true" aria-label="…">
    <div className={w.skelHero}>
      <span className={`${w.sk} ${w.skPill}`} />
      <span className={`${w.sk} ${w.skTitle}`} />
      <span className={`${w.sk} ${w.skTitle2}`} />
      <span className={`${w.sk} ${w.skLine}`} />
      <span className={`${w.sk} ${w.skLine} ${w.skShort}`} />
      <div className={w.skBtns}>
        <span className={`${w.sk} ${w.skBtn}`} />
        <span className={`${w.sk} ${w.skBtn}`} />
      </div>
    </div>
    <div className={w.skGrid}>
      {[0, 1, 2].map((i) => (
        <div key={i} className={w.skCard} style={{ animationDelay: `${i * 0.12}s` }}>
          <span className={`${w.sk} ${w.skIcon}`} />
          <span className={`${w.sk} ${w.skLine}`} />
          <span className={`${w.sk} ${w.skLine} ${w.skShort}`} />
          <span className={`${w.sk} ${w.skLine} ${w.skShorter}`} />
        </div>
      ))}
    </div>
  </div>
);

export default PageLoader;
