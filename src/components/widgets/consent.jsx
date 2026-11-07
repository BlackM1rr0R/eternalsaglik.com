import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import w from "../../styles/widgets.module.css";
import ui from "../../styles/ui.module.css";
import { getConsent, initAnalytics, setConsent } from "../../utils/analytics";
import { useT } from "../../i18n";
import common from "../../i18n/common";

// KVKK cookie consent. Analytics scripts load only after "Kabul Et".
const ConsentBanner = () => {
  const [show, setShow] = useState(false);
  const t = useT(common);
  const c = t("consent");

  useEffect(() => {
    const c = getConsent();
    if (c === "granted") initAnalytics();
    else if (!c) setShow(true);
  }, []);

  if (!show) return null;
  const choose = (v) => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div className={w.consent} role="region" aria-label={c.region}>
      <p>
        {c.text} <Link to="/kvkk">{c.link}</Link>.
      </p>
      <div className={w.consentBtns}>
        <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => choose("denied")}>{c.reject}</button>
        <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={() => choose("granted")}>{c.accept}</button>
      </div>
    </div>
  );
};

export default ConsentBanner;
