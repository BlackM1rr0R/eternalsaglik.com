import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import w from "../../styles/widgets.module.css";

// Soft teal cursor ring (desktop + fine pointer only). It grows over links, buttons and
// cards, and shrinks on press. The native cursor stays visible for accessibility.
const INTERACTIVE = "a, button, [role='button'], [role='tab'], [role='option'], input, select, textarea, label";
const CARD = "[class*='card'], [class*='Card']";

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default");
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches && !document.documentElement.classList.contains("a11y-reduce-motion"));
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("input, textarea, select")) setMode("text");
      else if (t.closest(INTERACTIVE)) setMode("link");
      else if (t.closest(CARD)) setMode("card");
      else setMode("default");
    };
    const leave = () => setHidden(true);
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = { default: 26, link: 46, card: 70, text: 4 }[mode];

  return (
    <motion.div
      aria-hidden="true"
      className={`${w.cursor} ${w["cursor_" + mode] || ""}`}
      style={{ x: sx, y: sy }}
      animate={{ width: size, height: size, opacity: hidden ? 0 : 1, scale: down ? 0.82 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
};

export default Cursor;
