import React, { useId, useState } from "react";
import { FaPhoneVolume, FaWhatsapp } from "../../icons/modern";
import ui from "../../styles/ui.module.css";
import { buildMessage, isValidPhone, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";
import { useT } from "../../i18n";
import common from "../../i18n/common";

// "Sizi arayalım": only name + phone, for visitors who don't want to fill a long form.
const CallbackForm = ({ title, source = "Web sitesi", compact = false }) => {
  const uid = useId();
  const t = useT(common);
  const c = t("callback");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeIdx, setTimeIdx] = useState(0);
  const time = c.times[timeIdx];
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError(c.errName);
    if (!isValidPhone(phone)) return setError(c.errPhone);
    setError("");
    openWhatsApp(
      buildMessage(c.msgTitle, { [c.name]: name, [c.phone]: phone, [c.when]: time, [c.page]: source })
    );
    trackEvent("generate_lead", { form: "callback", source });
    setSent(true);
  };

  return (
    <div className={`${ui.card} ${ui.glass}`} style={{ margin: compact ? 0 : "40px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <FaPhoneVolume style={{ color: "var(--primary)", fontSize: 26 }} />
        <h3 style={{ margin: 0 }}>{title || c.title}</h3>
      </div>
      <p className={ui.hint} style={{ marginBottom: 16 }}>
        {c.hint}
      </p>
      {sent ? (
        <p style={{ fontWeight: 600, color: "var(--primary)" }} role="status">
          {c.sent}
        </p>
      ) : (
        <form className={ui.form} onSubmit={submit} noValidate>
          <div className={ui.row}>
            <div className={ui.field}>
              <label htmlFor={`${uid}-name`}>{c.name}</label>
              <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div className={ui.field}>
              <label htmlFor={`${uid}-phone`}>{c.phone}</label>
              <input
                id={`${uid}-phone`} value={phone} onChange={(e) => setPhone(e.target.value)}
                inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx"
              />
            </div>
          </div>
          <div className={ui.chips} role="radiogroup" aria-label={c.when}>
            {c.times.map((label, i) => (
              <button
                type="button" key={label} role="radio" aria-checked={timeIdx === i}
                className={`${ui.chip} ${timeIdx === i ? ui.chipActive : ""}`} onClick={() => setTimeIdx(i)}
              >
                {label}
              </button>
            ))}
          </div>
          {error && <p className={ui.error} role="alert">{error}</p>}
          <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
            <FaWhatsapp /> {c.submit}
          </button>
        </form>
      )}
    </div>
  );
};

export default CallbackForm;
