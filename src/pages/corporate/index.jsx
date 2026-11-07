import React, { useState } from "react";
import { FaHotel, FaIndustry, FaBuilding, FaHome, FaWhatsapp, FaEnvelope, FaCheck } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import ui from "../../styles/ui.module.css";
import { SITE } from "../../config/site";
import { buildMessage, isValidPhone, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";

const SEGMENTS = [
  { icon: FaHotel, tone: "teal", t: "Oteller", items: ["Misafirlere odada doktor ve serum", "Türkçe / İngilizce / Arapça iletişim", "7/24 çağrı"] },
  { icon: FaIndustry, tone: "amber", t: "Fabrikalar", items: ["Sözleşmeli hemşire / sağlık personeli", "Periyodik sağlık taramaları", "İşyerinde tahlil günleri"] },
  { icon: FaBuilding, tone: "blue", t: "Ofisler", items: ["Ofiste serum günü", "Çalışan check-up paketleri", "Grip mevsimi bağışıklık programı"] },
  { icon: FaHome, tone: "rose", t: "Huzurevleri", items: ["Düzenli doktor ve hemşire ziyareti", "Yara ve dekubit bakımı", "Tahlil ve ilaç takibi"] },
];

const NEEDS = ["Sözleşmeli hemşire", "Doktor ziyareti", "Toplu serum günü", "Sağlık taraması / check-up", "Tahlil günü", "Misafir sağlık hizmeti (otel)", "Diğer"];

const Corporate = () => {
  const [f, setF] = useState({ company: "", sector: "Otel", size: "1-20", name: "", phone: "", email: "", needs: [], note: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const toggle = (n) => set("needs", f.needs.includes(n) ? f.needs.filter((x) => x !== n) : [...f.needs, n]);

  const message = () =>
    buildMessage("Kurumsal Teklif Talebi", {
      Kurum: f.company, Sektör: f.sector, "Çalışan / oda sayısı": f.size, Yetkili: f.name,
      Telefon: f.phone, "E-posta": f.email, İhtiyaç: f.needs.join(", "), Not: f.note,
    });

  const valid = () => {
    let msg = "";
    if (!f.company.trim() || !f.name.trim()) msg = "Kurum ve yetkili adını yazın.";
    else if (!isValidPhone(f.phone)) msg = "Geçerli bir telefon numarası yazın.";
    setErr(msg);
    return !msg;
  };

  const sendWa = (e) => {
    e.preventDefault();
    if (!valid()) return;
    openWhatsApp(message());
    trackEvent("generate_lead", { form: "corporate" });
    setSent(true);
  };
  const mailHref = `mailto:${SITE.email}?subject=${encodeURIComponent(`Kurumsal Teklif – ${f.company}`)}&body=${encodeURIComponent(message().replace(/\*/g, ""))}`;

  return (
    <>
      <PageHero
        badge="Kurumsal"
        title="Kurumlar İçin"
        highlight="Sağlık Çözümleri"
        text="Oteller, fabrikalar, ofisler ve huzurevleri için sözleşmeli sağlık hizmeti. İhtiyacınızı yazın, size özel teklif hazırlayalım."
        seoTitle="Kurumsal Sağlık Hizmeti – Otel, Fabrika, Ofis, Huzurevi"
        seoDesc="Sakarya ve çevresinde şirketlere sözleşmeli hemşire, ofiste serum günü, check-up ve otel misafirlerine sağlık hizmeti."
        path="/kurumsal"
      />
      <Wrapper>
        <section className={ui.section}>
          <div className={ui.grid}>
            {SEGMENTS.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.t} delay={i * 0.08}>
                  <TiltCard className={`${ui.card} ${ui.glowBorder}`} style={{ height: "100%" }}>
                    <Icon3D icon={<Icon />} tone={s.tone} size={60} />
                    <h3>{s.t}</h3>
                    <ul>{s.items.map((x) => <li key={x}><FaCheck /> {x}</li>)}</ul>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className={ui.sectionTight} style={{ maxWidth: 860, margin: "0 auto 80px" }}>
          <ScrollReveal>
            <form className={`${ui.card} ${ui.glass} ${ui.form}`} onSubmit={sendWa} noValidate>
              <h2 style={{ margin: 0 }}>Teklif isteyin</h2>
              {sent && <p role="status" style={{ color: "var(--primary)", fontWeight: 700 }}>Teşekkürler! WhatsApp açıldı; mesajı göndermeniz yeterli.</p>}
              <div className={ui.row}>
                <div className={ui.field}><label htmlFor="co-company">Kurum adı</label><input id="co-company" value={f.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" /></div>
                <div className={ui.field}>
                  <label htmlFor="co-sector">Sektör</label>
                  <select id="co-sector" value={f.sector} onChange={(e) => set("sector", e.target.value)}>
                    {["Otel", "Fabrika", "Ofis", "Huzurevi", "Okul", "Diğer"].map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
                <div className={ui.field}>
                  <label htmlFor="co-size">Çalışan / oda sayısı</label>
                  <select id="co-size" value={f.size} onChange={(e) => set("size", e.target.value)}>
                    {["1-20", "21-50", "51-200", "200+"].map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div className={ui.row}>
                <div className={ui.field}><label htmlFor="co-name">Yetkili adı</label><input id="co-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></div>
                <div className={ui.field}><label htmlFor="co-phone">Telefon</label><input id="co-phone" value={f.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" /></div>
                <div className={ui.field}><label htmlFor="co-email">E-posta</label><input id="co-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></div>
              </div>
              <span className={ui.label}>İhtiyacınız</span>
              <div className={ui.chips}>
                {NEEDS.map((n) => (
                  <button type="button" key={n} aria-pressed={f.needs.includes(n)} className={`${ui.chip} ${f.needs.includes(n) ? ui.chipActive : ""}`} onClick={() => toggle(n)}>{n}</button>
                ))}
              </div>
              <div className={ui.field}><label htmlFor="co-note">Not</label><textarea id="co-note" value={f.note} onChange={(e) => set("note", e.target.value)} /></div>
              {err && <p className={ui.error} role="alert">{err}</p>}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="submit" className={`${ui.btn} ${ui.btnWa}`}><FaWhatsapp /> WhatsApp ile Gönder</button>
                <a href={mailHref} className={`${ui.btn} ${ui.btnGhost}`} onClick={(e) => { if (!valid()) e.preventDefault(); else trackEvent("generate_lead", { form: "corporate_email" }); }}>
                  <FaEnvelope /> E-posta ile Gönder
                </a>
              </div>
            </form>
          </ScrollReveal>
        </section>
      </Wrapper>
    </>
  );
};

export default Corporate;
