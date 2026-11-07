import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { FaPrint, FaExclamationTriangle, FaCheck, FaArrowRight, FaArrowLeft, FaFilePdf } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import ListenButton from "../../components/listenbutton";
import Icon3D from "../../components/icon3d";
import ui from "../../styles/ui.module.css";
import { careGuides, getCareGuide } from "../../data/careguides";
import { SITE, primaryPhone } from "../../config/site";

export const CareGuideList = () => (
  <>
    <PageHero
      badge="Bakım Rehberleri"
      title="Evde Bakım"
      highlight="Rehberleri"
      text="Hasta ve aileler için hazırladığımız, yazdırılabilir (PDF olarak kaydedilebilir) bakım rehberleri."
      seoTitle="Evde Bakım Rehberleri (PDF)"
      seoDesc="Ameliyat sonrası yara bakımı, bası yarası önleme, diyabetik ayak bakımı ve serum sonrası rehberleri."
      path="/bakim-rehberi"
    />
    <Wrapper>
      <section className={ui.section}>
        <div className={ui.grid}>
          {careGuides.map((g, i) => (
            <ScrollReveal key={g.slug} delay={i * 0.06}>
              <Link to={`/bakim-rehberi/${g.slug}`} className={`${ui.card} ${ui.glowBorder}`} style={{ display: "block", textDecoration: "none", height: "100%" }}>
                <Icon3D icon={<FaFilePdf />} tone={["teal", "violet", "blue", "amber"][i % 4]} size={54} />
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
                <span style={{ color: "var(--primary)", fontWeight: 700, display: "inline-flex", gap: 6, alignItems: "center", marginTop: 10 }}>
                  Rehberi aç <FaArrowRight />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </Wrapper>
  </>
);

export const CareGuideDetail = () => {
  const { slug } = useParams();
  const g = getCareGuide(slug);
  if (!g) return <Navigate to="/bakim-rehberi" replace />;
  const speech = [g.title, g.summary, ...g.sections.flatMap((s) => [s.h, ...s.items])].join(". ");

  return (
    <section className={ui.page}>
      <Helmet>
        <title>{g.title} | Bakım Rehberi | ETERNAL Sağlık</title>
        <meta name="description" content={g.summary} />
        <link rel="canonical" href={`https://eternalsaglik.com/bakim-rehberi/${g.slug}`} />
      </Helmet>
      <Wrapper>
        <article className={ui.prose}>
          <Link to="/bakim-rehberi" className="no-print" style={{ color: "var(--primary)", fontWeight: 700, display: "inline-flex", gap: 6, alignItems: "center" }}>
            <FaArrowLeft /> Tüm rehberler
          </Link>
          <p className={ui.hint} style={{ marginTop: 20 }}>{SITE.name} · {primaryPhone.display} · {SITE.url.replace("https://", "")}</p>
          <h1 style={{ color: "var(--text)", margin: "6px 0 10px", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>{g.title}</h1>
          <p>{g.summary}</p>
          <div className="no-print" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" onClick={() => window.print()} className={`${ui.btn} ${ui.btnPrimary}`} style={{ marginTop: 12 }}>
              <FaPrint /> Yazdır / PDF Kaydet
            </button>
            <ListenButton text={speech} />
          </div>

          {g.sections.map((s) => (
            <section key={s.h}>
              <h2 style={s.danger ? { color: "var(--danger)" } : undefined}>
                {s.danger && <FaExclamationTriangle style={{ marginRight: 8 }} />}{s.h}
              </h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {s.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 10 }}>
                    {s.danger ? <FaExclamationTriangle style={{ color: "var(--danger)", marginTop: 6, flexShrink: 0 }} /> : <FaCheck style={{ color: "var(--primary)", marginTop: 6, flexShrink: 0 }} />}
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className={ui.note} style={{ marginTop: 30 }}>
            <FaExclamationTriangle />
            <span>
              Bu rehber genel bilgilendirme amaçlıdır; doktorunuzun size özel talimatlarının yerine geçmez.
              Sorularınız için 7/24 arayabilirsiniz: <strong>{primaryPhone.display}</strong>. Acil durumda <strong>112</strong>.
            </span>
          </div>
        </article>
      </Wrapper>
    </section>
  );
};
