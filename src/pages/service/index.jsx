import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FaCheck, FaWhatsapp, FaCalendarCheck, FaPhoneAlt, FaArrowRight, FaUserCheck } from "react-icons/fa";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import ListenButton from "../../components/listenbutton";
import CallbackForm from "../../components/callbackform";
import ui from "../../styles/ui.module.css";
import { getService, services } from "../../data/services";
import { getArticle } from "../../data/articles";
import { SITE, primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";

const ServicePage = () => {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <Navigate to="/hizmetlerimiz" replace />;
  const Icon = s.icon;
  const related = s.articles.map(getArticle).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE.name,
    url: `${SITE.url}/hizmet/${s.slug}`,
    telephone: primaryPhone.tel,
    areaServed: SITE.regions,
    makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.desc } },
  };

  return (
    <>
      <PageHero
        badge="Hizmet"
        title={s.title}
        text={s.desc}
        seoTitle={`${s.title} | ${s.keyword}`}
        seoDesc={`${s.keyword}: ${s.desc}`}
        path={`/hizmet/${s.slug}`}
        jsonLd={jsonLd}
      >
        <div style={{ display: "flex", justifyContent: "center", margin: "26px 0 6px" }}>
          <Icon3D icon={<Icon />} tone={s.tone} size={96} float />
        </div>
        <div className={ui.btnRow}>
          <Link to="/randevu" state={{ service: s.title }} className={`${ui.btn} ${ui.btnPrimary}`}>
            <FaCalendarCheck /> Randevu Al
          </Link>
          <a href={whatsappUrl(`Merhaba, "${s.title}" hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
            <FaWhatsapp /> WhatsApp
          </a>
          <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${ui.btnGhost}`}>
            <FaPhoneAlt /> {primaryPhone.display}
          </a>
        </div>
      </PageHero>

      <Wrapper>
        <section className={ui.section}>
          <div className={ui.grid2}>
            <ScrollReveal>
              <div className={ui.card} style={{ height: "100%" }}>
                <h2 style={{ marginTop: 0 }}>Bu hizmette neler var?</h2>
                <p>{s.intro}</p>
                <ListenButton text={`${s.title}. ${s.intro}. ${s.includes.join(". ")}`} />
                <ul>
                  {s.includes.map((x) => <li key={x}><FaCheck /> {x}</li>)}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className={ui.card} style={{ height: "100%" }}>
                <h2 style={{ marginTop: 0 }}>Kimler için uygun?</h2>
                <ul>
                  {s.forWho.map((x) => <li key={x}><FaUserCheck /> {x}</li>)}
                </ul>
                <p className={ui.hint} style={{ marginTop: 18 }}>
                  Hizmet bölgeleri: {SITE.regions.join(", ")} · {SITE.hours}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {related.length > 0 && (
          <section className={ui.sectionTight}>
            <div className={ui.sectionHead}><h2>İlgili yazılar</h2></div>
            <div className={ui.grid}>
              {related.map((a) => (
                <Link key={a.id} to={`/details/${a.id}`} className={`${ui.card} ${ui.glowBorder}`} style={{ textDecoration: "none" }}>
                  <h3 style={{ marginTop: 0 }}>{a.text}</h3>
                  <p>{a.textTwo}</p>
                  <span style={{ color: "var(--primary)", fontWeight: 700, display: "inline-flex", gap: 6, alignItems: "center", marginTop: 10 }}>
                    Devamını oku <FaArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CallbackForm source={`Hizmet: ${s.title}`} />

        <section className={ui.sectionTight}>
          <div className={ui.sectionHead}><h2>Diğer hizmetlerimiz</h2></div>
          <div className={ui.chips} style={{ justifyContent: "center" }}>
            {services.filter((x) => x.slug !== s.slug).map((x) => (
              <Link key={x.slug} to={`/hizmet/${x.slug}`} className={ui.chip} style={{ textDecoration: "none" }}>{x.title}</Link>
            ))}
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default ServicePage;
