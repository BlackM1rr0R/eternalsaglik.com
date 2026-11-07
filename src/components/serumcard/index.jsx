import React from "react";
import styles from "./index.module.css";

// IV-bag illustration for a serum.
//   name      text printed under the bag (pass the localized name)
//   category  Turkish category key ("Güzellik", "Bağışıklık", "Özel", ...) — chooses the colours/symbol
//   label     optional display text for the category pill (localized); defaults to `category`
const categoryConfig = {
  Enerji: { bg: "#fefce8", bagFill: "#fef3c7", liquidFill: "#fbbf24", stroke: "#d97706", textColor: "#92400e", symbol: "lightning" },
  Detox: { bg: "#ecfdf5", bagFill: "#d1fae5", liquidFill: "#6ee7b7", stroke: "#059669", textColor: "#065f46", symbol: "leaf" },
  Guzellik: { bg: "#fdf4ff", bagFill: "#f3e8ff", liquidFill: "#c084fc", stroke: "#a855f7", textColor: "#7e22ce", symbol: "diamond" },
  Vitamin: { bg: "#fff7ed", bagFill: "#ffedd5", liquidFill: "#fb923c", stroke: "#ea580c", textColor: "#9a3412", symbol: "circle" },
  Bagisiklik: { bg: "#f0fdfa", bagFill: "#ccfbf1", liquidFill: "#5eead4", stroke: "#0d9488", textColor: "#115e59", symbol: "shield" },
  Ozel: { bg: "#f8fafc", bagFill: "#f1f5f9", liquidFill: "#fbbf24", stroke: "#475569", textColor: "#1e293b", symbol: "star" },
};

// Split a long name into at most two balanced lines.
const wrap = (text, max = 24) => {
  const s = String(text || "");
  if (s.length <= max) return [s];
  const words = s.split(" ");
  let best = [s.slice(0, max - 1) + "…"];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    if (a.length <= max && b.length <= max && Math.abs(a.length - b.length) < bestDiff) {
      best = [a, b];
      bestDiff = Math.abs(a.length - b.length);
    }
  }
  return best;
};

const SerumSVG = ({ name, category, label }) => {
  // Categories arrive with Turkish letters ("Güzellik"); config keys are ASCII.
  const key = String(category || "").replace(/ü/g, "u").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ş/g, "s").replace(/Ö/g, "O").replace(/ö/g, "o");
  const c = categoryConfig[key] || categoryConfig[category] || categoryConfig.Vitamin;
  const lines = wrap(name);
  const pill = String(label || category || "");
  const pillW = Math.max(80, pill.length * 7.4 + 28);

  return (
    <svg
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="-1" y="-1" width="402" height="322" fill={c.bg} className={styles.bg} />
      <circle cx="70" cy="60" r="60" fill={c.liquidFill} opacity="0.12" className={styles.blob} />
      <circle cx="340" cy="250" r="80" fill={c.stroke} opacity="0.06" className={styles.blob2} />

      {/* Hook */}
      <line x1="200" y1="18" x2="200" y2="38" stroke="#94a3b8" strokeWidth="2.5" />
      <line x1="184" y1="18" x2="216" y2="18" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

      <g className={styles.bagGroup}>
        {/* IV Bag */}
        <rect x="156" y="38" width="88" height="125" rx="14" fill="white" stroke={c.stroke} strokeWidth="2.5" className={styles.bag} />
        <rect x="174" y="55" width="52" height="85" rx="8" fill={c.bagFill} className={styles.bagInner} />
        <rect x="184" y="65" width="32" height="65" rx="5" fill={c.liquidFill} opacity="0.22" />
        <rect x="164" y="60" width="4" height="40" rx="2" fill="white" opacity="0.7" />

        {/* Category symbol inside bag */}
        {c.symbol === "lightning" && <polygon points="196,72 205,72 200,90 209,90 191,115 196,96 187,96" fill={c.stroke} opacity="0.4" />}
        {c.symbol === "leaf" && (
          <>
            <path d="M190,85 C190,73 205,69 213,78 C221,88 213,102 201,102 C193,102 190,95 190,85Z" fill={c.stroke} opacity="0.2" />
            <path d="M194,97 C197,90 205,83 213,78" stroke={c.stroke} strokeWidth="1" fill="none" opacity="0.3" />
          </>
        )}
        {c.symbol === "diamond" && <polygon points="200,72 209,88 200,104 191,88" fill={c.stroke} opacity="0.25" />}
        {c.symbol === "circle" && (
          <>
            <circle cx="200" cy="90" r="16" fill={c.liquidFill} stroke={c.stroke} strokeWidth="1.5" opacity="0.25" />
            <line x1="200" y1="77" x2="200" y2="103" stroke={c.stroke} strokeWidth="1" opacity="0.2" />
            <line x1="187" y1="90" x2="213" y2="90" stroke={c.stroke} strokeWidth="1" opacity="0.2" />
          </>
        )}
        {c.symbol === "shield" && (
          <>
            <path d="M191,75 L191,98 C191,106 195,111 200,115 C205,111 209,106 209,98 L209,75 L200,70Z" fill={c.stroke} stroke={c.stroke} strokeWidth="1.5" opacity="0.22" />
            <path d="M195,92 L198,95 L206,86" stroke={c.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
          </>
        )}
        {c.symbol === "star" && <polygon points="200,70 204,80 214,81 207,88 209,98 200,93 191,98 193,88 186,81 196,80" fill="#f59e0b" opacity="0.35" />}
      </g>

      {/* Tube with a falling drop */}
      <line x1="200" y1="163" x2="200" y2="208" stroke={c.stroke} strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
      <ellipse cx="200" cy="172" rx="3.5" ry="5" fill={c.liquidFill} className={styles.drop} />
      <circle cx="200" cy="212" r="5" fill={c.stroke} opacity="0.5" />

      {/* Serum name */}
      {lines.map((ln, i) => (
        <text
          key={i}
          x="200"
          y={lines.length === 1 ? 252 : 240 + i * 20}
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans','Segoe UI',Tahoma,Arial,sans-serif"
          fontSize="16"
          fontWeight="700"
          fill={c.textColor}
          className={styles.name}
        >
          {ln}
        </text>
      ))}

      {/* Category label */}
      {pill && (
        <>
          <rect x={200 - pillW / 2} y="272" width={pillW} height="24" rx="12" fill={c.stroke} opacity="0.12" className={styles.pill} />
          <text
            x="200"
            y="288.5"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans','Segoe UI',Tahoma,Arial,sans-serif"
            fontSize="12"
            fontWeight="700"
            fill={c.stroke}
            className={styles.cat}
          >
            {pill}
          </text>
        </>
      )}
    </svg>
  );
};

export default SerumSVG;
