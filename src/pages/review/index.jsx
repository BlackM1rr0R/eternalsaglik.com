import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, GoogleLogo, WhatsappLogo, Heart, SmileySad, SmileyMeh, Smiley, SmileyWink, Sparkle, ShieldCheck } from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ui from "../../styles/ui.module.css";
import { SITE } from "../../config/site";
import { buildMessage, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";
import { useT } from "../../i18n";

const dict = {
  tr: {
    badge: "Değerlendirme",
    title: "Hizmetimizi",
    highlight: "Nasıl Buldunuz?",
    text: "Görüşleriniz ekibimizi geliştirmemize yardım ediyor. Bir dakikanızı ayırdığınız için teşekkür ederiz.",
    seoTitle: "Hizmet Değerlendirmesi",
    seoDesc: "ETERNAL Sağlık Hizmetleri ziyaretinizi değerlendirin: Google'da yorum yazın veya görüşünüzü doğrudan ekibimize iletin.",
    group: "Puan",
    star: "{n} yıldız",
    pick: "Puanınızı seçin",
    labels: ["", "Kötü", "Geliştirilmeli", "İdare eder", "İyi", "Mükemmel"],
    textLabel: "Görüşünüz (isteğe bağlı)",
    textHint: "Ziyaretle ilgili beğendiğiniz ya da daha iyi olmasını istediğiniz her şeyi yazabilirsiniz.",
    options: "Görüşünüzü nasıl paylaşmak istersiniz?",
    google: "Google'da Yorum Yaz",
    team: "Görüşümü Ekibe İlet",
    msgTitle: "Hizmet Değerlendirmesi",
    msgScore: "Puan",
    msgText: "Yorum",
    thanks: "Teşekkür ederiz! Görüşünüz ekibimize ulaştı.",
    privacy: "Ekibe ilettiğiniz görüş yalnızca hizmet kalitemizi geliştirmek için kullanılır ve izniniz olmadan yayınlanmaz.",
    again: "Başka bir yorum yazın",
  },
  en: {
    badge: "Feedback",
    title: "How Was",
    highlight: "Our Service?",
    text: "Your feedback helps our team improve. Thank you for taking a minute.",
    seoTitle: "Service Feedback",
    seoDesc: "Rate your visit from ETERNAL Health Services: write a Google review or send your feedback directly to our team.",
    group: "Rating",
    star: "{n} stars",
    pick: "Choose your rating",
    labels: ["", "Poor", "Needs work", "Okay", "Good", "Excellent"],
    textLabel: "Your feedback (optional)",
    textHint: "Tell us anything you liked about the visit, or anything you'd like us to do better.",
    options: "How would you like to share your feedback?",
    google: "Write a Google Review",
    team: "Send Feedback to the Team",
    msgTitle: "Service Feedback",
    msgScore: "Rating",
    msgText: "Comment",
    thanks: "Thank you! Your feedback has reached our team.",
    privacy: "Feedback sent to the team is used only to improve our service and is never published without your permission.",
    again: "Write another comment",
  },
  ar: {
    badge: "التقييم",
    title: "كيف وجدتم",
    highlight: "خدمتنا؟",
    text: "آراؤكم تساعد فريقنا على التطور. شكراً لتخصيصكم دقيقة من وقتكم.",
    seoTitle: "تقييم الخدمة",
    seoDesc: "قيّموا زيارتكم من إيترنال للخدمات الصحية: اكتبوا مراجعة على Google أو أرسلوا رأيكم مباشرة إلى فريقنا.",
    group: "التقييم",
    star: "{n} من 5",
    pick: "اختاروا تقييمكم",
    labels: ["", "سيئ", "يحتاج إلى تحسين", "مقبول", "جيد", "ممتاز"],
    textLabel: "رأيكم (اختياري)",
    textHint: "اكتبوا ما أعجبكم في الزيارة أو ما تودون أن نحسّنه.",
    options: "كيف تودون مشاركة رأيكم؟",
    google: "اكتب مراجعة على Google",
    team: "أرسل رأيي إلى الفريق",
    msgTitle: "تقييم الخدمة",
    msgScore: "التقييم",
    msgText: "التعليق",
    thanks: "شكراً لكم! وصل رأيكم إلى فريقنا.",
    privacy: "يُستخدم الرأي المرسل إلى الفريق لتحسين خدمتنا فقط، ولا يُنشر دون إذنكم.",
    again: "اكتب تعليقاً آخر",
  },
};

const FACES = [Smiley, SmileySad, SmileyMeh, SmileyMeh, Smiley, SmileyWink];

// Post-visit feedback. Link to this page (eternalsaglik.com/degerlendirme) in the
// message the team sends after a visit. Every rating gets the same two options (no review gating).
const Review = () => {
  const t = useT(dict);
  const reduce = useReducedMotion();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const shown = hover || rating;
  const Face = FACES[shown];

  const sendFeedback = () => {
    openWhatsApp(buildMessage(t("msgTitle"), { [t("msgScore")]: `${rating} / 5`, [t("msgText")]: text }));
    trackEvent("feedback", { rating });
    setSent(true);
  };

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/degerlendirme" />
      <Wrapper>
        <section className={ui.section} style={{ maxWidth: 640, margin: "0 auto" }}>
          <motion.div className={`${ui.card} ${ui.glass} ${ui.center}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <AnimatePresence mode="wait">
              <motion.div key={shown} initial={{ scale: 0.6, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.6, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ fontSize: 56, color: shown ? "var(--accent)" : "var(--slate-300)", lineHeight: 1 }} aria-hidden="true">
                <Face />
              </motion.div>
            </AnimatePresence>
            <p style={{ margin: "6px 0 14px", fontWeight: 700, color: "var(--text)", minHeight: "1.6em" }} aria-live="polite">
              {shown ? t("labels")[shown] : t("pick")}
            </p>

            <div role="radiogroup" aria-label={t("group")} dir="ltr" style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => {
                const on = n <= shown;
                return (
                  <motion.button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={t("star", { n })}
                    whileHover={{ scale: 1.2, rotate: -8 }} whileTap={{ scale: 0.85 }}
                    animate={rating === n && !reduce ? { scale: [1, 1.35, 1] } : undefined}
                    onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onFocus={() => setHover(n)} onBlur={() => setHover(0)}
                    onClick={() => setRating(n)}
                    style={{ border: 0, background: "none", cursor: "pointer", fontSize: 44, padding: 4, color: on ? "var(--accent)" : "var(--slate-300)", transition: "color 0.2s" }}>
                    <Star weight={on ? "fill" : "duotone"} />
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {rating > 0 && !sent && (
                <motion.div key="form" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden" }}>
                  <div className={ui.form} style={{ marginTop: 22, textAlign: "start" }}>
                    <div className={ui.field}>
                      <label htmlFor="rv-text">{t("textLabel")}</label>
                      <textarea id="rv-text" value={text} onChange={(e) => setText(e.target.value)} />
                      <span className={ui.hint}>{t("textHint")}</span>
                    </div>
                    <span className={ui.label}>{t("options")}</span>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnPrimary}`}
                        onClick={() => trackEvent("review_google", { rating })}>
                        <GoogleLogo /> {t("google")}
                      </a>
                      <button type="button" onClick={sendFeedback} className={`${ui.btn} ${ui.btnGhost}`}>
                        <WhatsappLogo /> {t("team")}
                      </button>
                    </div>
                    <p className={ui.hint} style={{ display: "flex", gap: 8, alignItems: "flex-start", margin: 0 }}>
                      <ShieldCheck style={{ flexShrink: 0, marginTop: 3 }} /> {t("privacy")}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {sent && (
                <motion.div key="thanks" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ marginTop: 20 }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <motion.span animate={reduce ? undefined : { scale: [1, 1.18, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                      style={{ display: "inline-block", fontSize: 44, color: "var(--rose-500)" }} aria-hidden="true">
                      <Heart weight="fill" />
                    </motion.span>
                    {!reduce && [0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.span key={i} aria-hidden="true"
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, x: Math.cos((i / 6) * Math.PI * 2) * 46, y: Math.sin((i / 6) * Math.PI * 2) * 46, scale: 1 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        style={{ position: "absolute", top: "35%", left: "35%", color: "var(--accent)", fontSize: 16 }}>
                        <Sparkle weight="fill" />
                      </motion.span>
                    ))}
                  </div>
                  <p role="status" style={{ marginTop: 8, fontWeight: 700, color: "var(--primary)" }}>{t("thanks")}</p>
                  <button type="button" className={`${ui.btn} ${ui.btnGhost}`} style={{ marginTop: 6 }}
                    onClick={() => { setSent(false); setText(""); }}>
                    {t("again")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </Wrapper>
    </>
  );
};

export default Review;
