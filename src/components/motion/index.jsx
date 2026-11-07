/* Motion primitives. All respect prefers-reduced-motion (via framer's MotionConfig in settings).
 *
 *   <Stagger> <StaggerItem>…</StaggerItem> … </Stagger>   children rise in one after another when scrolled into view
 *   <SpotlightCard className=…>                           card with a soft light that follows the pointer
 *   <Magnetic>…</Magnetic>                                 child is gently pulled toward the pointer (buttons)
 *   <Parallax speed={0.15}>…</Parallax>                    moves slower/faster than the scroll
 *   <CountUp to={937} suffix="+" />                        counts up when it becomes visible
 *   <Marquee items={[…]} />                                endless horizontal ticker
 *   <Float>…</Float>                                       slow idle bobbing
 */
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion, animate } from "framer-motion";
import styles from "./index.module.css";

const ease = [0.16, 1, 0.3, 1];

export const Stagger = ({ children, className, style, gap = 0.08, as = "div", once = true }) => {
  const M = motion[as] || motion.div;
  return (
    <M className={className} style={style} initial="hidden" whileInView="show" viewport={{ once, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
      {children}
    </M>
  );
};

export const StaggerItem = ({ children, className, style, y = 28, as = "div" }) => {
  const M = motion[as] || motion.div;
  return (
    <M className={className} style={style}
      variants={{ hidden: { opacity: 0, y, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease }, transitionEnd: { filter: "none" } } }}>
      {children}
    </M>
  );
};

export const SpotlightCard = ({ children, className = "", style, as = "div", ...rest }) => {
  const ref = useRef(null);
  const Tag = as;
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag ref={ref} onPointerMove={onMove} className={`${styles.spot} ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
};

export const Magnetic = ({ children, strength = 0.3, className, style }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.span ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={className}
      style={{ display: "inline-flex", x, y, ...style }}>
      {children}
    </motion.span>
  );
};

export const Parallax = ({ children, speed = 0.15, className, style }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
  return <motion.div ref={ref} className={className} style={{ y, ...style }}>{children}</motion.div>;
};

export const CountUp = ({ to, from = 0, duration = 2, prefix = "", suffix = "", locale = "tr-TR", className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);
  useEffect(() => {
    if (!inView || reduce) return undefined;
    const c = animate(from, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, from, to, duration, reduce]);
  return <span ref={ref} className={className}>{prefix}{Math.round(val).toLocaleString(locale)}{suffix}</span>;
};

export const Marquee = ({ items, speed = 40, className = "", reverse = false }) => (
  <div className={`${styles.marquee} ${className}`}>
    <div className={styles.track} style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
      {[...items, ...items].map((it, i) => (
        <span key={i} className={styles.item} aria-hidden={i >= items.length}>{it}</span>
      ))}
    </div>
  </div>
);

export const Float = ({ children, amplitude = 8, duration = 6, delay = 0, className, style }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} style={style}
      animate={reduce ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}>
      {children}
    </motion.div>
  );
};

// Thin progress line that fills as the element scrolls through the viewport.
export const ScrollLine = ({ className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className={`${styles.line} ${className || ""}`} aria-hidden="true">
      <motion.span style={{ scaleY }} />
    </div>
  );
};

export const useMouse = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  return { x, y };
};
