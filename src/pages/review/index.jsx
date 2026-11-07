import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaGoogle, FaWhatsapp, FaHeart } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ui from "../../styles/ui.module.css";
import { SITE } from "../../config/site";
import { buildMessage, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";

// Post-visit feedback. Link to this page (eternalsaglik.com/degerlendirme) in the
// message the team sends after a visit. Every rating gets the same two options.
const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const sendFeedback = () => {
    openWhatsApp(buildMessage("Hizmet Değerlendirmesi", { Puan: `${rating} / 5`, Yorum: text }));
    trackEvent("feedback", { rating });
    setSent(true);
  };

  return (
    <>
      <PageHero
        badge="Değerlendirme"
        title="Hizmetimizi"
        highlight="Nasıl Buldunuz?"
        text="Görüşleriniz ekibimizi geliştirmemize yardım ediyor. Bir dakikanızı ayırdığınız için teşekkür ederiz."
        seoTitle="Hizmet Değerlendirmesi"
        path="/degerlendirme"
      />
      <Wrapper>
        <section className={ui.section} style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className={`${ui.card} ${ui.center}`}>
            <div role="radiogroup" aria-label="Puan" style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <motion.button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} yıldız`}
                  whileHover={{ scale: 1.2, rotate: -8 }} whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)}
                  style={{ border: 0, background: "none", cursor: "pointer", fontSize: 44, color: n <= (hover || rating) ? "var(--accent)" : "var(--slate-300)" }}>
                  <FaStar />
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {rating > 0 && !sent && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className={ui.form} style={{ marginTop: 22, textAlign: "left" }}>
                  <div className={ui.field}>
                    <label htmlFor="rv-text">{rating >= 4 ? "En çok neyi beğendiniz?" : "Neyi daha iyi yapabiliriz?"}</label>
                    <textarea id="rv-text" value={text} onChange={(e) => setText(e.target.value)} />
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnPrimary}`}
                      onClick={() => trackEvent("review_google", { rating })}>
                      <FaGoogle /> Google'da Yorum Yaz
                    </a>
                    <button type="button" onClick={sendFeedback} className={`${ui.btn} ${ui.btnGhost}`}>
                      <FaWhatsapp /> Görüşümü Ekibe İlet
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {sent && (
              <motion.p initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ marginTop: 20, fontWeight: 700, color: "var(--primary)" }}>
                <FaHeart /> Teşekkür ederiz! Görüşünüz ekibimize ulaştı.
              </motion.p>
            )}
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default Review;
