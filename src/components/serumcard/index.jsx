import React from "react";

const categoryConfig = {
  Enerji: { bg: "#fefce8", bagFill: "#fef3c7", liquidFill: "#fbbf24", stroke: "#d97706", textColor: "#92400e", symbol: "lightning" },
  Detox: { bg: "#ecfdf5", bagFill: "#d1fae5", liquidFill: "#6ee7b7", stroke: "#059669", textColor: "#065f46", symbol: "leaf" },
  Guzellik: { bg: "#fdf4ff", bagFill: "#f3e8ff", liquidFill: "#c084fc", stroke: "#a855f7", textColor: "#7e22ce", symbol: "diamond" },
  Vitamin: { bg: "#fff7ed", bagFill: "#ffedd5", liquidFill: "#fb923c", stroke: "#ea580c", textColor: "#9a3412", symbol: "circle" },
  Bagisiklik: { bg: "#f0fdfa", bagFill: "#ccfbf1", liquidFill: "#5eead4", stroke: "#0d9488", textColor: "#115e59", symbol: "shield" },
  Ozel: { bg: "#f8fafc", bagFill: "#f1f5f9", liquidFill: "#fbbf24", stroke: "#1e293b", textColor: "#1e293b", symbol: "star" },
};

const SerumSVG = ({ name, category }) => {
  const c = categoryConfig[category] || categoryConfig.Vitamin;

  return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <rect x="-1" y="-1" width="402" height="322" fill={c.bg} />

      {/* Hook */}
      <line x1="200" y1="18" x2="200" y2="38" stroke="#94a3b8" strokeWidth="2.5" />
      <line x1="184" y1="18" x2="216" y2="18" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

      {/* IV Bag */}
      <rect x="156" y="38" width="88" height="125" rx="14" fill="white" stroke={c.stroke} strokeWidth="2.5" />
      <rect x="174" y="55" width="52" height="85" rx="8" fill={c.bagFill} />
      <rect x="184" y="65" width="32" height="65" rx="5" fill={c.liquidFill} opacity="0.22" />

      {/* Category symbol inside bag */}
      {c.symbol === "lightning" && (
        <polygon points="196,72 205,72 200,90 209,90 191,115 196,96 187,96" fill={c.stroke} opacity="0.4" />
      )}
      {c.symbol === "leaf" && (
        <>
          <path d="M190,85 C190,73 205,69 213,78 C221,88 213,102 201,102 C193,102 190,95 190,85Z" fill={c.stroke} opacity="0.15" />
          <path d="M194,97 C197,90 205,83 213,78" stroke={c.stroke} strokeWidth="1" fill="none" opacity="0.22" />
        </>
      )}
      {c.symbol === "diamond" && (
        <polygon points="200,72 209,88 200,104 191,88" fill={c.stroke} opacity="0.2" />
      )}
      {c.symbol === "circle" && (
        <>
          <circle cx="200" cy="90" r="16" fill={c.liquidFill} opacity="0.12" stroke={c.stroke} strokeWidth="1.5" opacity="0.22" />
          <line x1="200" y1="77" x2="200" y2="103" stroke={c.stroke} strokeWidth="1" opacity="0.15" />
          <line x1="187" y1="90" x2="213" y2="90" stroke={c.stroke} strokeWidth="1" opacity="0.15" />
        </>
      )}
      {c.symbol === "shield" && (
        <>
          <path d="M191,75 L191,98 C191,106 195,111 200,115 C205,111 209,106 209,98 L209,75 L200,70Z" fill={c.stroke} opacity="0.15" stroke={c.stroke} strokeWidth="1.5" opacity="0.22" />
          <path d="M195,92 L198,95 L206,86" stroke={c.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
        </>
      )}
      {c.symbol === "star" && (
        <polygon points="200,70 204,80 214,81 207,88 209,98 200,93 191,98 193,88 186,81 196,80" fill="#f59e0b" opacity="0.25" />
      )}

      {/* Tube */}
      <line x1="200" y1="163" x2="200" y2="208" stroke={c.stroke} strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
      <ellipse cx="200" cy="195" rx="3.5" ry="5" fill={c.liquidFill} opacity="0.45" />
      <circle cx="200" cy="212" r="5" fill={c.stroke} opacity="0.5" />

      {/* Serum name */}
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fontFamily="'Segoe UI',Arial,sans-serif"
        fontSize="15"
        fontWeight="700"
        fill={c.textColor}
      >
        {name.length > 28 ? name.substring(0, 26) + "..." : name}
      </text>

      {/* Category label */}
      <rect x="155" y="275" width="90" height="22" rx="11" fill={c.stroke} opacity="0.1" />
      <text
        x="200"
        y="290"
        textAnchor="middle"
        fontFamily="'Segoe UI',Arial,sans-serif"
        fontSize="11"
        fontWeight="600"
        fill={c.stroke}
        opacity="0.7"
      >
        {category}
      </text>
    </svg>
  );
};

export default SerumSVG;
