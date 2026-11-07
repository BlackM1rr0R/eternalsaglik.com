// Thin wrapper over the View Transitions API with graceful fallback.
import { flushSync } from "react-dom";


export const supportsVT = () =>
  typeof document !== "undefined" &&
  "startViewTransition" in document &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !document.documentElement.classList.contains("a11y-reduce-motion");

// Circular reveal for the theme switch, starting at the pointer (or the element's centre).
export const revealThemeChange = (event, apply) => {
  if (!supportsVT()) {
    apply();
    return;
  }
  const r = event?.currentTarget?.getBoundingClientRect?.();
  const x = event?.clientX || (r ? r.left + r.width / 2 : window.innerWidth / 2);
  const y = event?.clientY || (r ? r.top + r.height / 2 : 0);
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement;
  root.classList.add("vt-theme");
  const t = document.startViewTransition(() => flushSync(apply));
  t.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
  t.finished.finally(() => root.classList.remove("vt-theme"));
};

// ── Shared-element "morph" between pages (FLIP, works in every browser) ──
// 1. morphNavigate() clones the source picture into a fixed overlay at its current position.
// 2. The route changes normally.
// 3. <MorphTarget name> on the next page flies the overlay to its own box, then reveals itself.
let pending = null;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("a11y-reduce-motion");

export const morphNavigate = (navigate, to, name, sourceEl, options) => {
  if (!sourceEl || reduced()) {
    navigate(to, options);
    return;
  }
  pending?.overlay.remove();
  const r = sourceEl.getBoundingClientRect();
  const cs = getComputedStyle(sourceEl);
  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    position: "fixed", left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`,
    zIndex: "10040", pointerEvents: "none", overflow: "hidden", borderRadius: cs.borderRadius,
    boxShadow: "0 30px 60px -20px rgba(18,39,43,0.35)", willChange: "left, top, width, height",
  });
  const clone = sourceEl.cloneNode(true);
  clone.removeAttribute("data-morph-source");
  Object.assign(clone.style, { width: "100%", height: "100%", margin: "0", transform: "none" });
  clone.querySelectorAll("img").forEach((img) => Object.assign(img.style, { width: "100%", height: "100%", objectFit: "cover" }));
  overlay.appendChild(clone);
  document.body.appendChild(overlay);
  overlay.animate([{ transform: "scale(1)" }, { transform: "scale(1.04)" }], { duration: 250, easing: "ease-out", fill: "forwards" });
  const timer = setTimeout(() => {
    if (pending?.overlay === overlay) {
      overlay.remove();
      pending = null;
      window.dispatchEvent(new Event("eternal:morph-end"));
    }
  }, 3000);
  pending = { name, overlay, timer };
  window.dispatchEvent(new Event("eternal:morph-start"));
  navigate(to, options);
};

// Called by <MorphTarget> once mounted: returns true if it should play the arrival.
export const takeMorph = (name, targetEl) => {
  if (!pending || pending.name !== name || !targetEl) return false;
  const { overlay, timer } = pending;
  pending = null;
  clearTimeout(timer);
  const t = targetEl.getBoundingClientRect();
  const radius = getComputedStyle(targetEl).borderRadius;
  targetEl.style.visibility = "hidden";
  const anim = overlay.animate(
    [
      { left: overlay.style.left, top: overlay.style.top, width: overlay.style.width, height: overlay.style.height },
      { left: `${t.left}px`, top: `${t.top}px`, width: `${t.width}px`, height: `${t.height}px`, borderRadius: radius },
    ],
    { duration: 620, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
  );
  anim.onfinish = () => {
    targetEl.style.visibility = "";
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: "forwards" }).onfinish = () => overlay.remove();
    window.dispatchEvent(new Event("eternal:morph-end"));
  };
  return true;
};
