import React, { Suspense, lazy, useEffect, useState } from "react";

// ⌘K / Ctrl+K command palette launcher. The palette (with every service, serum, article,
// FAQ and guide in three languages) is only downloaded on first open.
const load = () => import("./palette");
const Palette = lazy(load);

export const openPalette = () => window.dispatchEvent(new Event("eternal:cmdk"));
export const prefetchPalette = load;

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMounted(true);
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("eternal:cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("eternal:cmdk", onOpen);
    };
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <Palette open={open} onClose={() => setOpen(false)} />
    </Suspense>
  );
};

export default CommandPalette;
