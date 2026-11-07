import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Thin reading-progress bar pinned to the top of the viewport.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 4, zIndex: 1100, transformOrigin: "0%",
        scaleX, background: "linear-gradient(90deg, var(--teal-500), var(--blue-500), var(--amber-400))",
      }}
    />
  );
};

export default ScrollProgress;
