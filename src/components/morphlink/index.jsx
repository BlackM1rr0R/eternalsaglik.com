import React, { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { morphNavigate } from "../../utils/viewtransition";

// <Link> that morphs a shared element into the next page (View Transitions API).
// Mark the picture inside the card with `data-morph-source` (or put it anywhere inside an
// ancestor marked `data-morph-scope`), and the destination with
// `data-morph-target={name}` + `style={{ viewTransitionName: name }}`.
// Modifier clicks (new tab etc.) and browsers without support behave like a normal link.
const MorphLink = forwardRef(({ to, morph, onClick, ...rest }, ref) => {
  const navigate = useNavigate();
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = e.currentTarget;
    const source =
      el.querySelector("[data-morph-source]") || el.closest("[data-morph-scope]")?.querySelector("[data-morph-source]");
    if (!source || !morph) return;
    e.preventDefault();
    morphNavigate(navigate, to, morph, source);
  };
  return <Link ref={ref} to={to} onClick={handle} {...rest} />;
});

MorphLink.displayName = "MorphLink";
export default MorphLink;
