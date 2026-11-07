import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

// Card that tilts toward the mouse pointer, with a soft glare.
// Touch devices and reduced-motion users get a plain, static card.
const TiltCard = ({ children, className = "", max = 8, style, ...rest }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const glare = useTransform(
    [x, y],
    ([gx, gy]) => `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.16), transparent 50%)`
  );

  if (reduce) {
    return (
      <div className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      {...rest}
    >
      {children}
      <motion.span
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", background: glare }}
      />
    </motion.div>
  );
};

export default TiltCard;
