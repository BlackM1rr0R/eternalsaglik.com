import React from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaWhatsapp, FaGift, FaStamp } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import ui from "../../styles/ui.module.css";
import { packageGroups, giftPackage } from "../../data/packages";
import { FEATURES } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";

const Packages = () => (
  <>
    <PageHero
      badge="Paketler"
      title="İhtiyacınıza Uygun"
      highlight="Bakım Paketleri"
      text="Düzenli takipten ameliyat sonrası bakıma, ofis serum gününden otel hizmetine kadar. Fiyat ve detay için paketin altındaki butondan bize yazın."
      seoTitle="Evde Bakım ve Serum Paketleri"
      seoDesc="Diyabet takibi, tansiyon takibi, yaşlı bakım, ameliyat sonrası yara bakımı, dekubit bakımı, check-up ve serum paketleri. Sakarya ve çevresi."
      path="/paketler"
    />
    <Wrapper>
      {packageGroups.map((g) => (
        <section key={g.id} id={g.id} className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <h2>{g.title}</h2>
              <p>{g.subtitle}</p>
            </div>
          </ScrollReveal>
          <div className={ui.grid}>
            {g.items.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={p.name} delay={i * 0.08}>
                  <TiltCard className={`${ui.card} ${ui.glowBorder} ${p.featured ? ui.featured : ""}`} style={{ height: "100%" }}>
                    {p.featured && <span className={ui.ribbon}>En çok tercih edilen</span>}
                    <Icon3D icon={<Icon />} tone={p.tone} size={58} />
                    <h3>{p.name}</h3>
                    <p className={ui.hint}>{p.period}</p>
                    <ul>
                      {p.features.map((f) => <li key={f}><FaCheck /> {f}</li>)}
                    </ul>
                    <a href={whatsappUrl(`Merhaba, "${p.name}" paketi hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer"
                      className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} style={{ marginTop: 20 }}>
                      <FaWhatsapp /> Bilgi Al
                    </a>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      ))}

      <ScrollReveal>
        <section className={ui.sectionTight}>
          <div className={`${ui.card} ${ui.glowBorder}`} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <Icon3D icon={<FaGift />} tone="rose" size={80} float />
            <div style={{ flex: "1 1 320px" }}>
              <h3 style={{ marginTop: 0 }}>{giftPackage.name}</h3>
              <p>{giftPackage.desc}</p>
            </div>
            <a href={whatsappUrl("Merhaba, bir yakınıma sağlık paketi hediye etmek istiyorum.")} target="_blank" rel="noopener noreferrer"
              className={`${ui.btn} ${ui.btnWa}`}>
              <FaWhatsapp /> Hediye Et
            </a>
          </div>
        </section>
      </ScrollReveal>

      {FEATURES.loyaltyCard && (
        <ScrollReveal>
          <section className={ui.sectionTight}>
            <div className={ui.card} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <Icon3D icon={<FaStamp />} tone="amber" size={70} />
              <div style={{ flex: "1 1 320px" }}>
                <h3 style={{ marginTop: 0 }}>Sadakat Kartı</h3>
                <p>Serum seanslarınızda her ziyaret kartınıza işlenir. Ayrıntılar için bize yazın.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      <section className={`${ui.sectionTight} ${ui.center}`}>
        <p className={ui.muted}>Hangisinin size uygun olduğundan emin değil misiniz?</p>
        <div className={ui.btnRow}>
          <Link to="/serum-testi" className={`${ui.btn} ${ui.btnGhost}`}>Serum Testi</Link>
          <Link to="/belirti-rehberi" className={`${ui.btn} ${ui.btnGhost}`}>Belirti Rehberi</Link>
          <Link to="/randevu" className={`${ui.btn} ${ui.btnPrimary}`}>Randevu Al</Link>
        </div>
      </section>
    </Wrapper>
  </>
);

export default Packages;
