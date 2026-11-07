import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Headline that reveals word by word (rise + un-blur).
// `lines` is an array of lines; each line is a string or { text, accent: true }.
const word = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const AnimatedText = ({ as: Tag = "h1", lines, className, delay = 0.1, style }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] || motion.h1;
  const list = lines.map((l) => (typeof l === "string" ? { text: l } : l));

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {list.map((l, i) => (
          <React.Fragment key={i}>
            {l.accent ? <span className="accent">{l.text}</span> : l.text}
            {i < list.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      aria-label={list.map((l) => l.text).join(" ")}
    >
      {list.map((l, i) => (
        <span key={i} aria-hidden="true" style={{ display: "block" }}>
          {l.text.split(" ").map((w, j) => (
            <motion.span
              key={j}
              variants={word}
              className={l.accent ? "accent" : undefined}
              style={{ display: "inline-block", marginRight: "0.25em", willChange: "transform, filter" }}
            >
              {w}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
};

export default AnimatedText;
