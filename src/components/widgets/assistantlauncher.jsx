import React, { Suspense, lazy, useEffect, useState } from "react";
import { ChatCircleDots } from "@phosphor-icons/react";
import w from "../../styles/widgets.module.css";

// The assistant bundles every service, serum and article in three languages, so it is
// only downloaded when the visitor first opens it (or hovers the button, as a prefetch).
const load = () => import("./assistant");
const Assistant = lazy(load);

const AssistantLauncher = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const on = () => setActive(true);
    window.addEventListener("eternal:chat", on);
    return () => window.removeEventListener("eternal:chat", on);
  }, []);

  const fab = (
    <button type="button" className={`${w.fab} ${w.fabChat}`} aria-label="Eternal Asistan" aria-expanded={false}
      onClick={() => setActive(true)} onPointerEnter={load} onFocus={load}>
      <ChatCircleDots />
      <span className={w.fabDot} />
    </button>
  );

  if (!active) return fab;
  return (
    <Suspense fallback={fab}>
      <Assistant defaultOpen />
    </Suspense>
  );
};

export default AssistantLauncher;
