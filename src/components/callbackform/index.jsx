import React, { useId, useState } from "react";
import { FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
import ui from "../../styles/ui.module.css";
import { buildMessage, isValidPhone, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";

// "Sizi arayalım": only name + phone, for visitors who don't want to fill a long form.
const CallbackForm = ({ title = "Sizi Arayalım", source = "Web sitesi", compact = false }) => {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("Hemen");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Lütfen adınızı yazın.");
    if (!isValidPhone(phone)) return setError("Lütfen geçerli bir telefon numarası yazın.");
    setError("");
    openWhatsApp(
      buildMessage("Geri Arama Talebi", { "Ad Soyad": name, Telefon: phone, "Uygun zaman": time, Sayfa: source })
    );
    trackEvent("generate_lead", { form: "callback", source });
    setSent(true);
  };

  return (
    <div className={`${ui.card} ${ui.glass}`} style={{ margin: compact ? 0 : "40px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <FaPhoneVolume style={{ color: "var(--primary)", fontSize: 26 }} />
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <p className={ui.hint} style={{ marginBottom: 16 }}>
        Adınızı ve numaranızı bırakın, ekibimiz sizi en kısa sürede arasın.
      </p>
      {sent ? (
        <p style={{ fontWeight: 600, color: "var(--primary)" }} role="status">
          Teşekkürler! WhatsApp açıldı, mesajı göndermeniz yeterli. Sizi kısa sürede arayacağız.
        </p>
      ) : (
        <form className={ui.form} onSubmit={submit} noValidate>
          <div className={ui.row}>
            <div className={ui.field}>
              <label htmlFor={`${uid}-name`}>Ad Soyad</label>
              <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div className={ui.field}>
              <label htmlFor={`${uid}-phone`}>Telefon</label>
              <input
                id={`${uid}-phone`} value={phone} onChange={(e) => setPhone(e.target.value)}
                inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx"
              />
            </div>
          </div>
          <div className={ui.chips} role="radiogroup" aria-label="Uygun zaman">
            {["Hemen", "Bugün", "Yarın sabah", "Akşam"].map((t) => (
              <button
                type="button" key={t} role="radio" aria-checked={time === t}
                className={`${ui.chip} ${time === t ? ui.chipActive : ""}`} onClick={() => setTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {error && <p className={ui.error} role="alert">{error}</p>}
          <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
            <FaWhatsapp /> Beni Arayın
          </button>
        </form>
      )}
    </div>
  );
};

export default CallbackForm;
