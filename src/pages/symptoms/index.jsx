import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationTriangle, FaArrowRight, FaPhoneAlt, FaBookMedical, FaFileMedicalAlt, FaFlask } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { bodyRegions, redFlags } from "../../data/symptoms";
import { getService } from "../../data/services";
import { getArticle } from "../../data/articles";
import { serumList } from "../../data/serums";
import { getCareGuide } from "../../data/careguides";

// Clickable regions of the body figure (original SVG drawn for this page).
const ZONES = [
  { id: "head", el: <circle cx="100" cy="42" r="28" /> },
  { id: "chest", el: <rect x="66" y="78" width="68" height="62" rx="18" /> },
  { id: "belly", el: <rect x="70" y="142" width="60" height="56" rx="16" /> },
  { id: "arms", el: <g><rect x="34" y="84" width="26" height="118" rx="13" /><rect x="140" y="84" width="26" height="118" rx="13" /></g> },
  { id: "legs", el: <g><rect x="70" y="202" width="27" height="130" rx="13" /><rect x="103" y="202" width="27" height="130" rx="13" /></g> },
];

const Target = ({ item }) => {
  const links = [];
  if (item.service) { const s = getService(item.service); if (s) links.push({ to: `/hizmet/${s.slug}`, label: s.title, icon: <FaFileMedicalAlt /> }); }
  if (item.article) { const a = getArticle(item.article); if (a) links.push({ to: `/details/${a.id}`, label: "Yazıyı oku", icon: <FaBookMedical /> }); }
  if (item.serum) { const s = serumList.find((x) => x.id === item.serum); if (s) links.push({ to: `/serumlar/${s.id}`, label: s.info, icon: <FaFlask /> }); }
  if (item.guide) { const g = getCareGuide(item.guide); if (g) links.push({ to: `/bakim-rehberi/${g.slug}`, label: "Bakım rehberi", icon: <FaBookMedical /> }); }
  return (
    <div className={styles.symptom}>
      <strong>{item.s}</strong>
      <div className={styles.links}>
        {links.map((l) => <Link key={l.to} to={l.to}>{l.icon} {l.label}</Link>)}
      </div>
    </div>
  );
};

const Symptoms = () => {
  const [active, setActive] = useState("head");
  const region = bodyRegions.find((r) => r.id === active);

  return (
    <>
      <PageHero
        badge="Belirti Rehberi"
        title="Ne Hissediyorsunuz?"
        highlight="Size Yol Gösterelim"
        text="Vücut haritasından bir bölge seçin, size uygun hizmeti ve bilgilendirici yazıları gösterelim. Bu rehber teşhis koymaz; yönlendirme amaçlıdır."
        seoTitle="Belirti Rehberi – Hangi Sağlık Hizmetine İhtiyacım Var?"
        seoDesc="Vücut haritası ile belirtilerinize uygun evde sağlık hizmetini bulun: evde doktor, hemşire, serum, tahlil ve yara bakımı."
        path="/belirti-rehberi"
      />
      <Wrapper>
        <section className={ui.sectionTight}>
          <div className={`${ui.note} ${ui.noteDanger}`}>
            <FaExclamationTriangle />
            <div>
              <strong>Şu belirtilerde beklemeyin, hemen 112'yi arayın:</strong> {redFlags.join(" · ")}
              <div style={{ marginTop: 10 }}>
                <a href="tel:112" className={`${ui.btn} ${ui.btnDanger}`} style={{ padding: "8px 16px" }}><FaPhoneAlt /> 112</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.layout}>
          <div className={styles.figureWrap}>
            <svg viewBox="0 0 200 340" className={styles.figure} role="group" aria-label="Vücut haritası">
              {ZONES.map((z) => {
                const r = bodyRegions.find((x) => x.id === z.id);
                return (
                  <g key={z.id} role="button" tabIndex={0} aria-label={r.label} aria-pressed={active === z.id}
                    className={`${styles.zone} ${active === z.id ? styles.zoneActive : ""}`}
                    onClick={() => setActive(z.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(z.id);
                      }
                    }}>
                    {z.el}
                  </g>
                );
              })}
            </svg>
            <div className={ui.chips} style={{ justifyContent: "center", marginTop: 16 }}>
              {bodyRegions.map((r) => (
                <button key={r.id} type="button" className={`${ui.chip} ${active === r.id ? ui.chipActive : ""}`} onClick={() => setActive(r.id)}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={region.id} className={ui.card} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 style={{ marginTop: 0 }}>{region.label}</h2>
              {region.redFlag && (
                <div className={`${ui.note} ${ui.noteDanger}`} style={{ marginBottom: 14 }}>
                  <FaExclamationTriangle /> <span>{region.redFlag}</span>
                </div>
              )}
              <div style={{ display: "grid", gap: 12 }}>
                {region.symptoms.map((s) => <Target key={s.s} item={s} />)}
              </div>
              <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`} style={{ marginTop: 22 }}>
                Randevu Al <FaArrowRight />
              </Link>
            </motion.div>
          </AnimatePresence>
        </section>
      </Wrapper>
    </>
  );
};

export default Symptoms;
