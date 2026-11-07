import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaHome, FaCalendarCheck } from "react-icons/fa";
import ui from "../../styles/ui.module.css";

// 404 with an animated ECG line that "flatlines" into the 404 and recovers.
const NotFound = () => (
  <section className={ui.page} style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
    <Helmet>
      <title>Sayfa Bulunamadı | ETERNAL Sağlık</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div style={{ padding: "0 20px" }}>
      <svg viewBox="0 0 320 90" style={{ width: "min(420px, 90vw)", display: "block", margin: "0 auto" }} aria-hidden="true">
        <motion.path
          d="M0 50 H70 L82 22 L96 78 L108 12 L120 64 L130 50 H190 L200 50 H320"
          fill="none" stroke="var(--rose-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
        />
      </svg>
      <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180 }}
        style={{ fontSize: "clamp(4rem, 12vw, 6rem)", fontWeight: 800, lineHeight: 1, margin: "10px 0", background: "linear-gradient(135deg, var(--teal-600), var(--blue-500))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
        404
      </motion.h1>
      <h2 style={{ color: "var(--text)", margin: "0 0 8px" }}>Sayfa Bulunamadı</h2>
      <p style={{ color: "var(--text-secondary)", maxWidth: 420, margin: "0 auto" }}>
        Aradığınız sayfa mevcut değil veya taşındı. Ama endişelenmeyin, ekibimiz hâlâ 7/24 burada.
      </p>
      <div className={ui.btnRow}>
        <Link to="/" className={`${ui.btn} ${ui.btnPrimary}`}><FaHome /> Ana Sayfa</Link>
        <Link to="/randevu" className={`${ui.btn} ${ui.btnGhost}`}><FaCalendarCheck /> Randevu Al</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
