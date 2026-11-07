import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBolt, FaShieldVirus, FaSpa, FaLeaf, FaDumbbell, FaCut, FaBriefcase, FaPlane, FaCloudSun, FaRunning, FaRedo, FaWhatsapp, FaInfoCircle } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import Icon3D from "../../components/icon3d";
import SerumSVG from "../../components/serumcard";
import ui from "../../styles/ui.module.css";
import { serumList } from "../../data/serums";
import { whatsappUrl } from "../../utils/whatsapp";

// Each answer adds points to serum ids from data/serums.js.
const QUESTIONS = [
  {
    q: "En çok neye ihtiyaç duyuyorsunuz?",
    options: [
      { label: "Enerji, yorgunlukla mücadele", icon: FaBolt, tone: "amber", score: { 1: 3, 7: 3, 14: 3, 13: 2, 8: 2 } },
      { label: "Bağışıklık desteği", icon: FaShieldVirus, tone: "teal", score: { 17: 3, 15: 3, 16: 2, 22: 2, 6: 1 } },
      { label: "Cilt ve güzellik", icon: FaSpa, tone: "rose", score: { 10: 3, 3: 3, 12: 2, 19: 2 } },
      { label: "Detoks / kilo kontrolü", icon: FaLeaf, tone: "green", score: { 18: 3, 2: 3, 23: 2, 5: 2, 12: 1 } },
      { label: "Kas, spor performansı", icon: FaDumbbell, tone: "blue", score: { 20: 3, 11: 3, 4: 2, 8: 1 } },
      { label: "Saç ve tırnak", icon: FaCut, tone: "violet", score: { 9: 4, 7: 1, 3: 1 } },
    ],
  },
  {
    q: "Hangisi sizi daha iyi anlatıyor?",
    options: [
      { label: "Yoğun iş temposu, stres", icon: FaBriefcase, tone: "blue", score: { 4: 2, 7: 2, 14: 1, 13: 1 } },
      { label: "Seyahat ediyorum / tatildeyim", icon: FaPlane, tone: "teal", score: { 8: 3, 14: 1 } },
      { label: "Sık hastalanıyorum, mevsim geçişi", icon: FaCloudSun, tone: "amber", score: { 15: 2, 17: 2, 16: 1, 21: 1 } },
      { label: "Düzenli spor yapıyorum", icon: FaRunning, tone: "green", score: { 20: 2, 11: 2, 8: 1 } },
    ],
  },
  {
    q: "Nasıl bir uygulama düşünüyorsunuz?",
    options: [
      { label: "Tek seans, hızlı destek", icon: FaBolt, tone: "amber", score: { 8: 1, 14: 1, 1: 1 } },
      { label: "Birkaç seanslık kür", icon: FaRedo, tone: "teal", score: { 12: 1, 13: 1, 3: 1, 18: 1 } },
      { label: "Kapsamlı / premium paket", icon: FaSpa, tone: "violet", score: { 24: 3, 19: 1, 13: 1 } },
    ],
  },
];

const SerumQuiz = () => {
  const [answers, setAnswers] = useState([]);
  const step = answers.length;
  const finished = step === QUESTIONS.length;

  const results = useMemo(() => {
    if (!finished) return [];
    const totals = {};
    answers.forEach((a) => Object.entries(a.score).forEach(([id, pts]) => { totals[id] = (totals[id] || 0) + pts; }));
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => serumList.find((s) => s.id === Number(id)))
      .filter(Boolean);
  }, [answers, finished]);

  const summary = answers.map((a) => a.label).join(", ");

  return (
    <>
      <PageHero
        badge="Serum Testi"
        title="Hangi Serum"
        highlight="Bana Uygun?"
        text="3 kısa soruyu yanıtlayın, ihtiyacınıza uygun serumları önerelim. Kesin içerik, doktor değerlendirmesinden sonra belirlenir."
        seoTitle="Hangi Serum Bana Uygun? Serum Testi"
        seoDesc="3 soruda size uygun IV serumu bulun: enerji, bağışıklık, güzellik, detoks ve sporcu serumları. Evde serum uygulaması."
        path="/serum-testi"
      />
      <Wrapper>
        <section className={ui.section} style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className={ui.steps} aria-hidden="true">
            {QUESTIONS.map((_, i) => <div key={i} className={`${ui.step} ${i < step ? ui.stepDone : ""}`} />)}
          </div>
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <p className={ui.hint}>Soru {step + 1} / {QUESTIONS.length}</p>
                <h2 style={{ margin: "6px 0 22px" }}>{QUESTIONS[step].q}</h2>
                <div className={ui.grid} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                  {QUESTIONS[step].options.map((o) => {
                    const Icon = o.icon;
                    return (
                      <motion.button key={o.label} type="button" whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                        className={`${ui.card} ${ui.glowBorder}`} style={{ cursor: "pointer", textAlign: "center", font: "inherit" }}
                        onClick={() => setAnswers((a) => [...a, o])}>
                        <Icon3D icon={<Icon />} tone={o.tone} size={56} />
                        <h3 style={{ fontSize: "1rem" }}>{o.label}</h3>
                      </motion.button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <button type="button" className={`${ui.btn} ${ui.btnGhost}`} style={{ marginTop: 22 }} onClick={() => setAnswers((a) => a.slice(0, -1))}>
                    Geri
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className={ui.center}>Size önerdiğimiz serumlar</h2>
                <p className={`${ui.center} ${ui.hint}`} style={{ marginBottom: 26 }}>Seçimleriniz: {summary}</p>
                <div className={ui.grid}>
                  {results.map((s, i) => (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                      className={`${ui.card} ${i === 0 ? ui.featured : ""}`}>
                      {i === 0 && <span className={ui.ribbon}>En uygun</span>}
                      <div style={{ borderRadius: 14, overflow: "hidden" }}><SerumSVG name={s.info} category={s.category} /></div>
                      <h3>{s.info}</h3>
                      <p>{s.desc}</p>
                      <Link to={`/serumlar/${s.id}`} className={`${ui.btn} ${ui.btnGhost} ${ui.btnBlock}`} style={{ marginTop: 14 }}>Detaylar</Link>
                    </motion.div>
                  ))}
                </div>
                <div className={ui.note} style={{ marginTop: 26 }}>
                  <FaInfoCircle />
                  <span>Bu öneri bilgilendirme amaçlıdır. Hamilelik, kronik hastalık, böbrek/kalp rahatsızlığı veya düzenli ilaç kullanımı varsa mutlaka belirtin; uygulama öncesi doktor değerlendirmesi yapılır.</span>
                </div>
                <div className={ui.btnRow}>
                  <a className={`${ui.btn} ${ui.btnWa}`} target="_blank" rel="noopener noreferrer"
                    href={whatsappUrl(`Merhaba, serum testini çözdüm.\nSeçimlerim: ${summary}\nÖnerilen: ${results.map((r) => r.info).join(", ")}\nBilgi almak istiyorum.`)}>
                    <FaWhatsapp /> Sonucu WhatsApp'tan Gönder
                  </a>
                  <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => setAnswers([])}><FaRedo /> Tekrar Çöz</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </Wrapper>
    </>
  );
};

export default SerumQuiz;
