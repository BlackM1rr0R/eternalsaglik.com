import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ui from "../../styles/ui.module.css";
import { faqs } from "../../data/faq";
import { whatsappUrl } from "../../utils/whatsapp";

// Accordion + FAQPage structured data so answers can appear directly in Google results.
export const FaqList = ({ items = faqs }) => {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 860, margin: "0 auto" }}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={ui.card} style={{ padding: 0, overflow: "hidden" }}>
            <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "18px 22px", border: 0, background: "none", color: "var(--text)", font: "inherit", fontWeight: 700, fontSize: "1.02rem", textAlign: "left", cursor: "pointer" }}>
              {f.q}
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: "var(--primary)", display: "grid" }}><FaChevronDown /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ padding: "0 22px 20px", margin: 0, color: "var(--text-secondary)" }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const faqJsonLd = (items = faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const Faq = () => (
  <>
    <PageHero
      badge="SSS"
      title="Sıkça Sorulan"
      highlight="Sorular"
      text="Evde sağlık hizmetlerimiz hakkında merak ettikleriniz."
      seoTitle="Sıkça Sorulan Sorular – Evde Sağlık Hizmeti"
      seoDesc="Evde sağlık hizmeti, hizmet bölgeleri, ücretlendirme, acil durumlar ve serum uygulaması hakkında sıkça sorulan sorular."
      path="/sss"
      jsonLd={faqJsonLd()}
    />
    <Wrapper>
      <section className={ui.section}>
        <FaqList />
        <div className={ui.btnRow}>
          <a href={whatsappUrl("Merhaba, bir sorum var.")} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
            <FaWhatsapp /> Sorunuzu sorun
          </a>
        </div>
      </section>
    </Wrapper>
  </>
);

export default Faq;
