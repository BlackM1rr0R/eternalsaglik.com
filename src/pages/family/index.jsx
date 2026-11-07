import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWhatsapp, FaUserMd, FaHome, FaClipboardList, FaComments, FaCheckDouble, FaHeartbeat, FaTint,
  FaStethoscope, FaUserNurse, FaWalking, FaGift, FaArrowRight,
} from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import CallbackForm from "../../components/callbackform";
import ui from "../../styles/ui.module.css";
import DoctorPhoto from "../../assets/images/doctor12.jpg";
import { packageGroups } from "../../data/packages";
import { whatsappUrl } from "../../utils/whatsapp";

const STEPS = [
  { icon: FaComments, tone: "teal", t: "Bize yazın veya arayın", d: "Nerede olursanız olun; yakınınızın adresini ve ihtiyacını WhatsApp'tan iletin." },
  { icon: FaClipboardList, tone: "blue", t: "Bakımı birlikte planlayalım", d: "Tek seferlik ziyaret mi, düzenli takip mi? Size uygun planı birlikte belirleyelim." },
  { icon: FaHome, tone: "amber", t: "Ekibimiz yakınınızı ziyaret eder", d: "Doktor veya hemşiremiz belirlenen saatte evine gider, işlemleri yapar." },
  { icon: FaCheckDouble, tone: "green", t: "Size bilgi veririz", d: "Ziyaret sonrası ölçümler ve yapılan işlemler hakkında WhatsApp'tan bilgilendiriliyorsunuz." },
];

const TEAM = [
  { icon: FaStethoscope, t: "Doktor", d: "Dahiliye ve acil tıp alanında deneyimli doktorlar" },
  { icon: FaUserNurse, t: "Hemşire", d: "Enjeksiyon, serum, sonda ve pansuman uygulamaları" },
  { icon: FaWalking, t: "Fizik tedavi", d: "Evde fizik tedavi ve hareket desteği" },
];

const Family = () => {
  const regular = packageGroups.find((g) => g.id === "duzenli");
  return (
    <>
      <PageHero
        badge="Aileniz İçin"
        title="Uzakta Olsanız Bile"
        highlight="Anneniz, Babanız Güvende"
        text="Başka şehirde ya da yurt dışında yaşıyor olabilirsiniz. Yakınınızın sağlık ihtiyaçlarını siz planlayın, ekibimiz yanında olsun."
        seoTitle="Anne Babam İçin Evde Sağlık Hizmeti"
        seoDesc="Başka şehirde yaşayanlar için yaşlı anne babaya evde doktor, hemşire ve düzenli takip. Ziyaret sonrası aileye WhatsApp bilgilendirmesi."
        path="/aileniz-icin"
      >
        <div className={ui.btnRow}>
          <a href={whatsappUrl("Merhaba, başka şehirde yaşıyorum. Annem/babam için evde sağlık hizmeti almak istiyorum.")} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
            <FaWhatsapp /> Yakınım İçin Yaz
          </a>
          <Link to="/randevu" state={{ service: "Evde Doktor Hizmeti" }} className={`${ui.btn} ${ui.btnGhost}`}>Randevu Oluştur</Link>
        </div>
      </PageHero>

      <Wrapper>
        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>Nasıl çalışır?</span>
              <h2>4 adımda uzaktan bakım</h2>
            </div>
          </ScrollReveal>
          <div className={ui.grid}>
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.t} delay={i * 0.1}>
                  <div className={ui.card} style={{ height: "100%" }}>
                    <span className={ui.hint} style={{ fontWeight: 800 }}>0{i + 1}</span>
                    <div><Icon3D icon={<Icon />} tone={s.tone} size={56} /></div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className={ui.sectionTight}>
          <div className={ui.grid2} style={{ alignItems: "center" }}>
            <ScrollReveal>
              <div>
                <span className={ui.badge}>Ziyaret sonrası</span>
                <h2 style={{ color: "var(--text)" }}>İçiniz rahat olsun</h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Ziyaret bittiğinde yapılan işlemler ve ölçüm sonuçları size iletilir. Böylece yakınınızın durumunu
                  uzaktan da takip edebilirsiniz. Değerlerde bir sorun varsa sizinle hemen iletişime geçilir.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              {/* Illustrative example of the post-visit message; not a real patient. */}
              <motion.div className={ui.card} style={{ maxWidth: 380, margin: "0 auto", background: "var(--bg-soft)" }}
                initial={{ rotate: -2 }} whileHover={{ rotate: 0, scale: 1.02 }}>
                <p className={ui.hint} style={{ display: "flex", gap: 8, alignItems: "center" }}><FaWhatsapp style={{ color: "var(--wa)" }} /> Örnek bilgilendirme mesajı</p>
                <div style={{ background: "var(--surface)", borderRadius: 14, padding: 14, marginTop: 8, fontSize: "0.93rem", lineHeight: 1.7, color: "var(--text)" }}>
                  <strong>Ziyaret Özeti</strong><br />
                  <FaHeartbeat style={{ color: "var(--rose-500)" }} /> Tansiyon: 13/8<br />
                  <FaTint style={{ color: "var(--blue-500)" }} /> Açlık şekeri: 112 mg/dL<br />
                  <FaUserMd style={{ color: "var(--primary)" }} /> Yapılan: Pansuman, ilaç kontrolü<br />
                  Sonraki ziyaret: Perşembe 10:00
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>Evinize kim gelecek?</span>
              <h2>Ekibimizle tanışın</h2>
            </div>
          </ScrollReveal>
          <div className={ui.grid2} style={{ alignItems: "stretch" }}>
            <ScrollReveal>
              <TiltCard className={ui.card} style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", height: "100%" }}>
                <img src={DoctorPhoto} alt="Uzm. Dr. Atakan Bayrak" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }} loading="lazy" />
                <div>
                  <h3 style={{ marginTop: 0 }}>Uzm. Dr. Atakan Bayrak</h3>
                  <p>ETERNAL Sağlık Hizmetleri</p>
                </div>
              </TiltCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className={ui.card} style={{ height: "100%" }}>
                {TEAM.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.t} style={{ display: "flex", gap: 14, alignItems: "center", padding: "8px 0" }}>
                      <Icon3D icon={<Icon />} size={44} />
                      <div><strong>{m.t}</strong><p style={{ margin: 0 }}>{m.d}</p></div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.sectionTight}>
          <div className={ui.sectionHead}>
            <h2>Düzenli takip paketleri</h2>
            <p>{regular.subtitle}</p>
          </div>
          <div className={ui.grid}>
            {regular.items.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className={`${ui.card} ${ui.glowBorder}`}>
                  <Icon3D icon={<Icon />} tone={p.tone} size={50} />
                  <h3>{p.name}</h3>
                  <p className={ui.hint}>{p.period}</p>
                </div>
              );
            })}
          </div>
          <div className={ui.btnRow}>
            <Link to="/paketler" className={`${ui.btn} ${ui.btnPrimary}`}>Tüm paketler <FaArrowRight /></Link>
            <a href={whatsappUrl("Merhaba, bir yakınıma sağlık paketi hediye etmek istiyorum.")} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnGhost}`}>
              <FaGift /> Hediye Et
            </a>
          </div>
        </section>

        <CallbackForm title="Sizi arayalım, birlikte planlayalım" source="Aileniz için" />
      </Wrapper>
    </>
  );
};

export default Family;
