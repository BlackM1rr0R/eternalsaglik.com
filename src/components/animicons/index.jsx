import React from "react";
import styles from "./index.module.css";

/* "Lottie-style" animated medical micro-icons.
 * Original inline SVGs drawn on a 256 grid in Phosphor's duotone style
 * (currentColor strokes + 20% fill). They are still at rest and play when:
 *   - the `active` prop is true, or
 *   - an ancestor with the ANIM_HOST class is hovered / focused (pure CSS, no re-renders).
 * `gentle` slows the loop down (used for hero icons that loop continuously).
 * prefers-reduced-motion and the site's "reduce motion" toggle stop all motion. */

export const ANIM_HOST = styles.host;

const D = { fill: "currentColor", fillOpacity: 0.2, stroke: "none" };

const Svg = ({ active = false, gentle = false, size, className = "", title, children }) => {
  const dim = size == null ? "1em" : typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 256 256"
      width={dim}
      height={dim}
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${styles.icon} ${active ? styles.play : ""} ${gentle ? styles.gentle : ""} ${className}`}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

const HEART = "M128 216C128 216 24 160 24 94A54 54 0 0 1 128 73.6A54 54 0 0 1 232 94C232 160 128 216 128 216Z";

/* Beating heart with an ECG pulse running across it */
export const HeartPulse = (p) => (
  <Svg {...p}>
    <g className={styles.beat}>
      <path d={HEART} {...D} />
      <path d={HEART} />
    </g>
    <path className={styles.ecg} pathLength="1" d="M32 132h48l14-28 24 56 18-40 10 12h78" />
  </Svg>
);

/* Stethoscope with sound waves coming from the chest piece */
export const StethoscopeWaves = (p) => (
  <Svg {...p}>
    <path d="M36 40h24M132 40h24" />
    <path d="M48 40v48a48 48 0 0 0 96 0V40" />
    <path d="M96 136v16a52 52 0 0 0 104 0v-20" />
    <g className={styles.chest}>
      <circle cx="200" cy="112" r="20" {...D} />
      <circle cx="200" cy="112" r="20" />
    </g>
    <path className={`${styles.wave} ${styles.wave1}`} d="M178 82a32 32 0 0 1 44 0" strokeWidth="12" />
    <path className={`${styles.wave} ${styles.wave2}`} d="M166 66a50 50 0 0 1 68 0" strokeWidth="12" />
  </Svg>
);

/* IV bag: level drops while drops fall through the drip chamber */
export const IvBag = (p) => (
  <Svg {...p}>
    <path d="M108 32V20h40v12" />
    <path className={styles.level} d="M84 84h88v44a32 32 0 0 1-32 32h-24a32 32 0 0 1-32-32Z" {...D} />
    <path d="M80 32h96a8 8 0 0 1 8 8v88a40 40 0 0 1-40 40h-32a40 40 0 0 1-40-40V40a8 8 0 0 1 8-8Z" />
    <path d="M152 60h16M152 84h16" strokeWidth="12" />
    <path d="M128 168v16" />
    <rect x="110" y="184" width="36" height="40" rx="10" {...D} />
    <rect x="110" y="184" width="36" height="40" rx="10" />
    <path d="M128 224v20" />
    <circle className={`${styles.drop} ${styles.drop1}`} cx="128" cy="198" r="6" fill="currentColor" stroke="none" />
    <circle className={`${styles.drop} ${styles.drop2} ${styles.idleHide}`} cx="128" cy="198" r="6" fill="currentColor" stroke="none" />
  </Svg>
);

/* Breathing lungs */
export const Lungs = (p) => (
  <Svg {...p}>
    <path d="M128 32v72M128 104c0 14-18 24-18 24M128 104c0 14 18 24 18 24" />
    <g className={styles.lungL}>
      <path d="M100 72c-28 0-60 56-60 112 0 20 12 28 28 28 20 0 40-8 40-28V88c0-8-2-16-8-16Z" {...D} />
      <path d="M100 72c-28 0-60 56-60 112 0 20 12 28 28 28 20 0 40-8 40-28V88c0-8-2-16-8-16Z" />
    </g>
    <g className={styles.lungR}>
      <path d="M156 72c28 0 60 56 60 112 0 20-12 28-28 28-20 0-40-8-40-28V88c0-8 2-16 8-16Z" {...D} />
      <path d="M156 72c28 0 60 56 60 112 0 20-12 28-28 28-20 0-40-8-40-28V88c0-8 2-16 8-16Z" />
    </g>
  </Svg>
);

/* Test tube with rising bubbles */
export const TestTubeBubbles = (p) => (
  <Svg {...p}>
    <g className={styles.tube}>
      <path d="M104 116h48v68a24 24 0 0 1-48 0Z" {...D} />
      <path d="M92 32h72M104 32v152a24 24 0 0 0 48 0V32" />
      <path d="M152 72h-16" strokeWidth="12" />
      <circle className={`${styles.bubble} ${styles.bubble1}`} cx="120" cy="176" r="7" fill="currentColor" stroke="none" />
      <circle className={`${styles.bubble} ${styles.bubble2}`} cx="137" cy="156" r="6" fill="currentColor" stroke="none" />
      <circle className={`${styles.bubble} ${styles.bubble3}`} cx="124" cy="136" r="5" fill="currentColor" stroke="none" />
    </g>
  </Svg>
);

/* Bandage being applied + plus sign shimmer */
export const BandagePlus = (p) => (
  <Svg {...p}>
    <g transform="rotate(45 120 136)">
      <g className={styles.apply}>
        <rect x="32" y="100" width="176" height="72" rx="36" {...D} />
        <rect x="32" y="100" width="176" height="72" rx="36" />
        <rect x="92" y="108" width="56" height="56" rx="8" />
        <circle cx="110" cy="126" r="5" fill="currentColor" stroke="none" />
        <circle cx="130" cy="146" r="5" fill="currentColor" stroke="none" />
        <circle cx="130" cy="126" r="5" fill="currentColor" stroke="none" />
        <circle cx="110" cy="146" r="5" fill="currentColor" stroke="none" />
      </g>
    </g>
    <path className={styles.plus} d="M208 24v40M188 44h40" strokeWidth="14" />
  </Svg>
);

/* Ambulance: wheels turn, body bounces, beacon flashes */
export const AmbulanceRun = (p) => (
  <Svg {...p}>
    <g className={styles.flash}>
      <path d="M78 36l-12-10M138 36l12-10M108 30V16" strokeWidth="12" />
    </g>
    <g className={styles.bounce}>
      <rect className={styles.beacon} x="94" y="44" width="28" height="20" rx="6" fill="currentColor" fillOpacity="0.2" />
      <path d="M32 64h120v32h40l40 40v36a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8Z" {...D} />
      <path d="M50 180H32a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8h120v32h40l40 40v36a8 8 0 0 1-8 8h-6M170 180H94" />
      <path d="M152 96v40h80" />
      <path d="M88 96v48M64 120h48" />
    </g>
    <g className={styles.wheel}>
      <circle cx="72" cy="184" r="20" {...D} />
      <circle cx="72" cy="184" r="20" />
      <path d="M72 174v20M62 184h20" strokeWidth="10" />
    </g>
    <g className={styles.wheel}>
      <circle cx="192" cy="184" r="20" {...D} />
      <circle cx="192" cy="184" r="20" />
      <path d="M192 174v20M182 184h20" strokeWidth="10" />
    </g>
  </Svg>
);

/* Caring hand with a heart rising from the palm */
export const CareHand = (p) => (
  <Svg {...p}>
    <g className={styles.rise}>
      <path d="M152 116C152 116 112 94 112 66A22 22 0 0 1 152 56A22 22 0 0 1 192 66C192 94 152 116 152 116Z" {...D} />
      <path d="M152 116C152 116 112 94 112 66A22 22 0 0 1 152 56A22 22 0 0 1 192 66C192 94 152 116 152 116Z" />
    </g>
    <g className={styles.lift}>
      <rect x="24" y="156" width="40" height="64" rx="6" {...D} />
      <rect x="24" y="156" width="40" height="64" rx="6" />
      <path d="M64 212h52l66-20c14-4 20-18 12-28-6-8-16-9-24-5l-46 17" />
      <path d="M64 168h40c12 0 20 8 20 16s-8 16-20 16H80" />
    </g>
  </Svg>
);

/* Leaf swaying in the breeze (traditional medicine) */
export const LeafSway = (p) => (
  <Svg {...p}>
    <g className={styles.sway}>
      <path d="M216 40C136 40 64 72 64 152c0 16 4 28 8 36 8 4 20 8 36 8 80 0 108-72 108-156Z" {...D} />
      <path d="M216 40C136 40 64 72 64 152c0 16 4 28 8 36 8 4 20 8 36 8 80 0 108-72 108-156Z" />
      <path d="M40 216L172 84M120 136h40M120 136V96" />
    </g>
  </Svg>
);

/* Clipboard with check marks ticking in one after another */
export const ClipboardCheck = (p) => (
  <Svg {...p}>
    <path d="M64 40h128a8 8 0 0 1 8 8v168a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8Z" {...D} />
    <path d="M64 40h128a8 8 0 0 1 8 8v168a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8Z" />
    <rect x="96" y="24" width="64" height="32" rx="8" fill="currentColor" fillOpacity="0.2" />
    <path className={`${styles.tick} ${styles.tick1}`} pathLength="1" d="M80 104l10 10 20-20" strokeWidth="14" />
    <path className={`${styles.tick} ${styles.tick2}`} pathLength="1" d="M80 144l10 10 20-20" strokeWidth="14" />
    <path className={`${styles.tick} ${styles.tick3}`} pathLength="1" d="M80 184l10 10 20-20" strokeWidth="14" />
    <path d="M132 104h44M132 144h44M132 184h28" strokeWidth="12" />
  </Svg>
);

export const ANIM_ICONS = {
  heart: HeartPulse,
  stethoscope: StethoscopeWaves,
  iv: IvBag,
  lungs: Lungs,
  testTube: TestTubeBubbles,
  bandage: BandagePlus,
  ambulance: AmbulanceRun,
  careHand: CareHand,
  leaf: LeafSway,
  clipboard: ClipboardCheck,
};

/* Service slug (src/data/services.js) -> animated icon name */
export const ANIM_BY_SERVICE = {
  "evde-doktor": "stethoscope",
  "evde-hemsire": "heart",
  "evde-geleneksel-tip": "leaf",
  "evde-tahlil": "testTube",
  "ozel-ambulans": "ambulance",
  "evde-hasta-bakici": "careHand",
  "evde-check-up": "clipboard",
  "evde-serum": "iv",
  "yara-bakimi": "bandage",
};

/* Generic helper: <AnimIcon name="heart" active={hovered} size={24} /> */
export const AnimIcon = ({ name, active = false, size, gentle = false, className, title }) => {
  const Comp = ANIM_ICONS[name];
  if (!Comp) return null;
  return <Comp active={active} size={size} gentle={gentle} className={className} title={title} />;
};

/* Convenience: animated icon for a service slug, falling back to `fallback` (a component) */
export const ServiceAnimIcon = ({ slug, fallback: Fallback, ...rest }) => {
  const name = ANIM_BY_SERVICE[slug];
  if (name) return <AnimIcon name={name} {...rest} />;
  return Fallback ? <Fallback /> : null;
};

export default AnimIcon;
