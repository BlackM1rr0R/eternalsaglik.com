import React, { useLayoutEffect, useRef } from "react";
import { takeMorph } from "../../utils/viewtransition";

// Destination of a shared-element morph started by <MorphLink morph={name}>.
const MorphTarget = ({ name, children, className, style }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    // wait one frame so the page has its final layout (page entry animation is skipped during a morph)
    const id = requestAnimationFrame(() => takeMorph(name, ref.current));
    return () => cancelAnimationFrame(id);
  }, [name]);
  return <div ref={ref} className={className} style={style} data-morph-target={name}>{children}</div>;
};

export default MorphTarget;
