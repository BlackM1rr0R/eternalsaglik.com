import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaArrowRight, FaPhoneAlt, FaUserMd, FaHeartbeat, FaClipboardList, FaUserFriends, FaBandAid, FaSpa,
  FaGlobeEurope, FaBuilding, FaMapMarkerAlt, FaMagic, FaStethoscope,
} from "react-icons/fa";
import ScrollReveal from "../scrollreveal";
import Icon3D from "../icon3d";
import TiltCard from "../tiltcard";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { services } from "../../data/services";
import { SITE } from "../../config/site";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export const ServicesShowcase = () => (
  <section className={ui.section}>
    <ScrollReveal>
      <div className={ui.sectionHead}>
        <span className={ui.badge}>Hizmetlerimiz</span>
        <h2>Evinize gelen sağlık</h2>
        <p>Bir hizmet seçin; ayrıntıları, kimler için uygun olduğunu ve ilgili yazıları görün.</p>
      </div>
    </ScrollReveal>
    <motion.div className={`${ui.grid} ${styles.servicesGrid}`} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <motion.div key={s.slug} variants={item}>
            <TiltCard className={`${ui.card} ${ui.glowBorder}`} style={{ height: "100%" }}>
              <Link to={`/hizmet/${s.slug}`} className={styles.cardLink}>
                <Icon3D icon={<Icon />} tone={s.tone} size={62} />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className={styles.more}>Detaylar <FaArrowRight /></span>
              </Link>
            </TiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

const AUDIENCES = [
  { icon: FaUserFriends, tone: "teal", t: "Anne babam için", d: "Uzaktan planlayın, biz yanında olalım", to: "/aileniz-icin" },
  { icon: FaBandAid, tone: "amber", t: "Ameliyat sonrası", d: "Yara bakımı, pansuman, takip", to: "/paketler#ameliyat" },
  { icon: FaHeartbeat, tone: "rose", t: "Kronik hastalık", d: "Diyabet, tansiyon, kalp takibi", to: "/paketler#duzenli" },
  { icon: FaSpa, tone: "violet", t: "Serum & wellness", d: "Enerji, bağışıklık, güzellik", to: "/serum-testi" },
  { icon: FaGlobeEurope, tone: "blue", t: "Otel misafirleri", d: "English · العربية", to: "/en" },
  { icon: FaBuilding, tone: "green", t: "Kurumlar", d: "Otel, fabrika, ofis, huzurevi", to: "/kurumsal" },
];

export const AudienceShortcuts = () => (
  <section className={ui.sectionTight}>
    <ScrollReveal>
      <div className={ui.sectionHead}>
        <span className={ui.badge}>Size özel</span>
        <h2>Kim için hizmet arıyorsunuz?</h2>
      </div>
    </ScrollReveal>
    <motion.div className={styles.audGrid} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {AUDIENCES.map((a) => {
        const Icon = a.icon;
        return (
          <motion.div key={a.t} variants={item}>
            <Link to={a.to} className={`${ui.card} ${ui.glass} ${styles.aud}`}>
              <Icon3D icon={<Icon />} tone={a.tone} size={48} />
              <div>
                <strong>{a.t}</strong>
                <span>{a.d}</span>
              </div>
              <FaArrowRight className={styles.audArrow} />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
    <div className={ui.btnRow}>
      <Link to="/belirti-rehberi" className={`${ui.btn} ${ui.btnGhost}`}><FaStethoscope /> Belirti Rehberi</Link>
      <Link to="/serum-testi" className={`${ui.btn} ${ui.btnGhost}`}><FaMagic /> Hangi serum bana uygun?</Link>
    </div>
  </section>
);

const STEPS = [
  { icon: FaPhoneAlt, tone: "teal", t: "Bize ulaşın", d: "Arayın, WhatsApp'tan yazın veya online randevu formunu doldurun." },
  { icon: FaClipboardList, tone: "blue", t: "Planlayalım", d: "İhtiyacınızı dinleyip uygun ekibi ve saati belirleyelim." },
  { icon: FaUserMd, tone: "amber", t: "Ekibimiz gelir", d: "Doktor veya hemşiremiz evinize, otelinize ya da ofisinize gelir." },
  { icon: FaHeartbeat, tone: "rose", t: "Takipte kalalım", d: "Tedavi ve kontroller planlanır; gerekirse ailenize bilgi verilir." },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className={ui.section} ref={ref}>
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}>Nasıl çalışır?</span>
          <h2>4 adımda evde sağlık</h2>
        </div>
      </ScrollReveal>
      <div className={styles.timeline}>
        <div className={styles.track}><motion.div className={styles.fill} style={{ width: line }} /></div>
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <ScrollReveal key={s.t} delay={i * 0.12} className={styles.tStep}>
              <Icon3D icon={<Icon />} tone={s.tone} size={64} float />
              <span className={styles.tNum}>{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </ScrollReveal>
          );
        })}
      </div>
      <div className={ui.btnRow}>
        <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}>Online Randevu Al <FaArrowRight /></Link>
      </div>
    </section>
  );
};

const AREA_QUERY = {
  Sakarya: "Adapazarı, Sakarya",
  Düzce: "Düzce",
  Kocaeli: "İzmit, Kocaeli",
  İstanbul: "İstanbul",
  "Sapanca / Kartepe": "Sapanca, Sakarya",
};

export const ServiceAreas = () => {
  const [area, setArea] = useState("Sakarya");
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(AREA_QUERY[area])}&z=${area === "İstanbul" ? 10 : 11}&output=embed`;
  return (
    <section className={ui.section} id="bolgeler">
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}><FaMapMarkerAlt /> Hizmet Bölgelerimiz</span>
          <h2>Nerelere geliyoruz?</h2>
          <p>Merkezimiz {SITE.addressShort}. {SITE.regions.join(", ")} ve çevresindeki otellere hizmet veriyoruz.</p>
        </div>
      </ScrollReveal>
      <div className={ui.chips} style={{ justifyContent: "center", marginBottom: 20 }}>
        {Object.keys(AREA_QUERY).map((a) => (
          <button key={a} type="button" aria-pressed={area === a} className={`${ui.chip} ${area === a ? ui.chipActive : ""}`} onClick={() => setArea(a)}>{a}</button>
        ))}
      </div>
      <ScrollReveal>
        <div className={styles.map}>
          <iframe title={`${area} hizmet bölgesi haritası`} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </ScrollReveal>
    </section>
  );
};
