import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaWhatsapp, FaCheckCircle, FaFileMedical, FaMapMarkerAlt, FaInfoCircle,
} from "react-icons/fa";
import ui from "../../styles/ui.module.css";
import { services } from "../../data/services";
import { SITE } from "../../config/site";
import { buildMessage, isValidPhone, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";

const SLOTS = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 17:00", "17:00 – 20:00", "20:00 sonrası"];
const FOR_WHO = ["Kendim", "Annem / Babam", "Eşim", "Çocuğum", "Diğer yakınım"];
// Local date (not UTC) so the minimum date is correct after midnight in Turkey.
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Three-step booking wizard. There is no booking backend, so the result is a
// pre-filled WhatsApp message to the clinic (works on every phone, no server needed).
const BookingForm = ({ defaultService = "" }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: defaultService, forWho: "Kendim", date: today(), slot: SLOTS[1],
    district: SITE.regions[0], address: "", name: "", phone: "", note: "", prescription: false, kvkk: false,
  });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const serviceOptions = useMemo(
    () => [...services.map((s) => s.title), "Serum uygulaması (reçeteli)", "Diğer / Emin değilim"],
    []
  );

  const validate = (s) => {
    const e = {};
    if (s === 0 && !data.service) e.service = "Lütfen bir hizmet seçin.";
    if (s === 1) {
      if (!data.date) e.date = "Tarih seçin.";
      if (data.address.trim().length < 5) e.address = "Lütfen açık adres veya mahalle yazın.";
    }
    if (s === 2) {
      if (!data.name.trim()) e.name = "Adınızı yazın.";
      if (!isValidPhone(data.phone)) e.phone = "Geçerli bir telefon numarası yazın.";
      if (!data.kvkk) e.kvkk = "Devam etmek için onay gereklidir.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = (e) => {
    e.preventDefault();
    if (!validate(2)) return;
    const dateTr = new Date(`${data.date}T12:00`).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });
    openWhatsApp(
      buildMessage("Online Randevu Talebi", {
        Hizmet: data.service,
        "Kimin için": data.forWho,
        Tarih: dateTr,
        Saat: data.slot,
        Bölge: data.district,
        Adres: data.address,
        "Ad Soyad": data.name,
        Telefon: data.phone,
        Not: data.note,
        Reçete: data.prescription ? "Var (fotoğrafı bu mesaja ekleyeceğim)" : "",
      })
    );
    trackEvent("generate_lead", { form: "booking", service: data.service });
    setDone(true);
  };

  if (done) {
    return (
      <motion.div className={`${ui.card} ${ui.center}`} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
          <FaCheckCircle style={{ fontSize: 64, color: "var(--primary)" }} />
        </motion.div>
        <h3>Talebiniz hazır!</h3>
        <p>
          WhatsApp açıldı. Mesajı <strong>gönder</strong> tuşuna basmanız yeterli.
          {data.prescription && " Reçetenizin fotoğrafını da aynı sohbete ekleyin."} Ekibimiz randevunuzu onaylamak için size dönecek.
        </p>
        <div className={ui.btnRow}>
          <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => { setDone(false); setStep(0); }}>
            Yeni talep
          </button>
          <Link to="/" className={`${ui.btn} ${ui.btnPrimary}`}>Ana sayfa</Link>
        </div>
      </motion.div>
    );
  }

  const Err = ({ k }) => (errors[k] ? <span className={ui.error} role="alert">{errors[k]}</span> : null);

  return (
    <form className={`${ui.card} ${ui.glass}`} onSubmit={submit} noValidate>
      <div className={ui.steps} aria-hidden="true">
        {[0, 1, 2].map((i) => <div key={i} className={`${ui.step} ${i <= step ? ui.stepDone : ""}`} />)}
      </div>
      <p className={ui.hint} style={{ marginBottom: 10 }}>Adım {step + 1} / 3</p>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className={ui.form}>
          {step === 0 && (
            <>
              <h3 style={{ margin: 0 }}>Hangi hizmete ihtiyacınız var?</h3>
              <div className={ui.chips} role="radiogroup" aria-label="Hizmet">
                {serviceOptions.map((s) => (
                  <button type="button" key={s} role="radio" aria-checked={data.service === s}
                    className={`${ui.chip} ${data.service === s ? ui.chipActive : ""}`} onClick={() => set("service", s)}>
                    {s}
                  </button>
                ))}
              </div>
              <Err k="service" />
              <span className={ui.label}>Kimin için?</span>
              <div className={ui.chips} role="radiogroup" aria-label="Kimin için">
                {FOR_WHO.map((s) => (
                  <button type="button" key={s} role="radio" aria-checked={data.forWho === s}
                    className={`${ui.chip} ${data.forWho === s ? ui.chipActive : ""}`} onClick={() => set("forWho", s)}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 style={{ margin: 0 }}>Ne zaman ve nereye gelelim?</h3>
              <div className={ui.row}>
                <div className={ui.field}>
                  <label htmlFor="bk-date">Tarih</label>
                  <input id="bk-date" type="date" min={today()} value={data.date} onChange={(e) => set("date", e.target.value)} />
                  <Err k="date" />
                </div>
                <div className={ui.field}>
                  <label htmlFor="bk-district">Bölge</label>
                  <select id="bk-district" value={data.district} onChange={(e) => set("district", e.target.value)}>
                    {[...SITE.regions, "Sapanca / Kartepe (otel)", "Diğer"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <span className={ui.label}>Uygun saat aralığı</span>
              <div className={ui.chips} role="radiogroup" aria-label="Saat">
                {SLOTS.map((s) => (
                  <button type="button" key={s} role="radio" aria-checked={data.slot === s}
                    className={`${ui.chip} ${data.slot === s ? ui.chipActive : ""}`} onClick={() => set("slot", s)}>
                    {s}
                  </button>
                ))}
              </div>
              <div className={ui.field}>
                <label htmlFor="bk-address"><FaMapMarkerAlt /> Adres</label>
                <textarea id="bk-address" value={data.address} onChange={(e) => set("address", e.target.value)} placeholder="Mahalle, sokak, bina no / otel adı ve oda no" style={{ minHeight: 80 }} />
                <Err k="address" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ margin: 0 }}>İletişim bilgileri</h3>
              <div className={ui.row}>
                <div className={ui.field}>
                  <label htmlFor="bk-name">Ad Soyad</label>
                  <input id="bk-name" value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                  <Err k="name" />
                </div>
                <div className={ui.field}>
                  <label htmlFor="bk-phone">Telefon</label>
                  <input id="bk-phone" value={data.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" />
                  <Err k="phone" />
                </div>
              </div>
              <div className={ui.field}>
                <label htmlFor="bk-note">Not (isteğe bağlı)</label>
                <textarea id="bk-note" value={data.note} onChange={(e) => set("note", e.target.value)} placeholder="Şikayet, kullanılan ilaçlar, kat / asansör bilgisi…" />
              </div>
              <label className={ui.checkbox}>
                <input type="checkbox" checked={data.prescription} onChange={(e) => set("prescription", e.target.checked)} />
                <span><FaFileMedical /> Doktorun yazdığı reçete / tedavi var (fotoğrafını WhatsApp'ta ekleyeceğim)</span>
              </label>
              <label className={ui.checkbox}>
                <input type="checkbox" checked={data.kvkk} onChange={(e) => set("kvkk", e.target.checked)} />
                <span>
                  Bilgilerimin randevu amacıyla işlenmesini kabul ediyorum. <Link to="/kvkk" target="_blank">KVKK Aydınlatma Metni</Link>
                </span>
              </label>
              <Err k="kvkk" />
              <div className={ui.note}>
                <FaInfoCircle />
                <span>Gönder'e bastığınızda bilgileriniz WhatsApp mesajı olarak hazırlanır; mesajı siz gönderirsiniz.</span>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 22 }}>
        {step > 0 ? (
          <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={back}><FaArrowLeft /> Geri</button>
        ) : <span />}
        {step < 2 ? (
          <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={next}>Devam <FaArrowRight /></button>
        ) : (
          <button type="submit" className={`${ui.btn} ${ui.btnWa}`}><FaWhatsapp /> Randevu Talebini Gönder</button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
