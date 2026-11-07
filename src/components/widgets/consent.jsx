import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import w from "../../styles/widgets.module.css";
import ui from "../../styles/ui.module.css";
import { getConsent, initAnalytics, setConsent } from "../../utils/analytics";

// KVKK cookie consent. Analytics scripts load only after "Kabul Et".
const ConsentBanner = () => {
  const [show, setShow] = useState(false);

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
    <div className={w.consent} role="region" aria-label="Çerez bildirimi">
      <p>
        Sitemizi geliştirmek için, izniniz olursa analiz çerezleri kullanıyoruz. Zorunlu çerezler dışında
        hiçbir veri izniniz olmadan işlenmez. Ayrıntılar: <Link to="/kvkk">KVKK ve Gizlilik Politikası</Link>.
      </p>
      <div className={w.consentBtns}>
        <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => choose("denied")}>Reddet</button>
        <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={() => choose("granted")}>Kabul Et</button>
      </div>
    </div>
  );
};

export default ConsentBanner;
