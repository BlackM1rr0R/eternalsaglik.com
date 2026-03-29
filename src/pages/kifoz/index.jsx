import React, { useReducer } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUserMd, FaStethoscope, FaLeaf, FaVials,
  FaAmbulance, FaHandHoldingHeart, FaClipboardCheck,
  FaChevronDown, FaChevronUp, FaSyringe, FaBandAid,
  FaHeartbeat, FaPhoneAlt, FaArrowRight,
  FaShieldAlt, FaClock, FaHome,
} from "react-icons/fa";

const services = [
  { num: "01", icon: <FaUserMd />, title: "Evde Doktor Hizmeti", desc: "Uzman doktorlarımız evinize gelerek muayene, teşhis ve tedavi hizmeti sunmaktadır. Hastane stresinden uzak, konforunuzda profesyonel sağlık hizmeti alın.", color: "#0d9488", bg: "#f0fdfa" },
  { num: "02", icon: <FaStethoscope />, title: "Evde Hemşire Hizmeti", desc: "Yaşlı, yatalak veya kronik rahatsızlıkları olan bireyler için profesyonel hemşire bakımı. İlaçların düzenli uygulanması, yara bakımı ve hasta takibi.", color: "#0d9488", bg: "#f0fdfa" },
  { num: "03", icon: <FaLeaf />, title: "Evde Geleneksel Tıp", desc: "Hacamat, solucan tedavisi, kuppa ve diğer geleneksel yöntemlerle doğal iyileşme. Binlerce yıllık bilgi birikimiyle modern tıbbı destekliyoruz.", color: "#2563eb", bg: "#eff6ff" },
  { num: "04", icon: <FaVials />, title: "Evde Tahlil Hizmeti", desc: "Kan tahlili, idrar testi ve diğer laboratuvar testlerini evinizin konforunda yapıyoruz. Sonuçları hızlıca doktorunuza iletiyoruz.", color: "#2563eb", bg: "#eff6ff" },
  { num: "05", icon: <FaAmbulance />, title: "Özel Ambulans Hizmeti", desc: "7/24 hasta nakil hizmeti. Yüksek standartlardaki medikal ekipmanlar ve deneyimli sağlık personeli ile güvenli transfer.", color: "#d97706", bg: "#fffbeb" },
  { num: "06", icon: <FaHandHoldingHeart />, title: "Evde Hasta Bakıcı", desc: "Hasta bakımı, beslenme desteği, hijyen bakımı ve günlük yaşam aktivitelerinde profesyonel yardım.", color: "#d97706", bg: "#fffbeb" },
  { num: "07", icon: <FaClipboardCheck />, title: "Evde Check Up", desc: "Kapsamlı sağlık taraması paketleri. Kan testleri, EKG, tansiyon ölçümü ve daha fazlası evinizde.", color: "#0d9488", bg: "#f0fdfa" },
  { num: "08", icon: <FaSyringe />, title: "IV Serum Tedavisi", desc: "Vitamin, mineral ve amino asit desteği için özel IV serum formülleri. Enerji, bağışıklık ve güzellik serumları.", color: "#2563eb", bg: "#eff6ff" },
  { num: "09", icon: <FaBandAid />, title: "Yara Bakımı & Pansuman", desc: "Kronik ve akut yaraların profesyonel bakımı. Bası yarası, cerrahi yara ve diyabetik ayak bakımı.", color: "#d97706", bg: "#fffbeb" },
];

const whyUs = [
  { icon: <FaShieldAlt />, title: "Güvenilirlik", desc: "%98 hasta memnuniyet oranı" },
  { icon: <FaClock />, title: "7/24 Hizmet", desc: "Gece-gündüz ulaşılabilirlik" },
  { icon: <FaHome />, title: "Ev Konforu", desc: "Hastane stresinden uzak tedavi" },
  { icon: <FaHeartbeat />, title: "15 Yıl Deneyim", desc: "Binlerce başarılı tedavi" },
];

const faqData = [
  {
    question: "Neden Evde Sağlık Hizmetleri?",
    answer: "Evde sağlık hizmetleri, hastaların hastane ortamına gitme gereksinimini azaltarak evde aileleriyle birlikte daha hızlı iyileşmelerini sağlar.",
    details: [
      { title: "Konfor ve Güvenlik", text: "Tanıdık ortamda daha hızlı iyileşme, hastane enfeksiyonu riski yok." },
      { title: "Kişiselleştirilmiş Bakım", text: "Hastanın özel ihtiyaçlarına göre uyarlanmış tedavi planları." },
      { title: "Ekonomik Avantajlar", text: "Hastane yatış maliyetlerinden önemli tasarruf." },
      { title: "Psikolojik Destek", text: "Aile yanında olmanın verdiği moral ile daha hızlı iyileşme." },
    ],
  },
  { question: "Hangi bölgelere hizmet veriyorsunuz?", answer: "Sakarya, Düzce, Kocaeli ve İstanbul bölgesinde aktif olarak evde sağlık hizmeti sunmaktayız. Özel ambulans hizmetimiz ile daha geniş bölgelere de ulaşım sağlanmaktadır." },
  { question: "Ücretlendirme nasıl yapılır?", answer: "Hizmet türününe ve süre uzunluğuna göre fiyatlandırma yapılmaktadır. Detaylı bilgi için bizi aramanız yeterlidir. İlk danışmanlık görüşmemiz ücretsizdir." },
  { question: "Doktorlarınız hangi uzmanlık alanlarında?", answer: "Ekibimizde dahiliye, acil tıp, fizik tedavi ve geleneksel tıp alanlarında uzman doktorlar bulunmaktadır. Her hasta için en uygun uzman yönlendirilir." },
  { question: "Acil durumlarda ne kadar sürede gelirsiniz?", answer: "Acil çağrılarda ortalama 30-45 dakika içinde hasta adresine ulaşmaktayız. 7/24 çağrı merkezimiz her an hazırdır." },
];

const initialState = { open: 0 };
function reducer(state, action) {
  return { open: state.open === action ? null : action };
}

const Kifoz = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Helmet>
        <title>Hizmetlerimiz | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="ETERNAL Sağlık Hizmetleri - Evde doktor, hemşire, IV terapi ve daha fazlası." />
      </Helmet>

      <section className={styles.page}>
        {/* Hero */}
        <div className={styles.heroSection}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.heroInner}>
                <span className={styles.badge}>Profesyonel Sağlık</span>
                <h1><span>Sağlığı</span> Eve Getiriyoruz</h1>
                <p>9 farklı hizmet kategorisinde uzman ekibimizle evinizin konforunda sağlık hizmeti sunuyoruz</p>
                <div className={styles.heroBtns}>
                  <a href="tel:05525189654" className={styles.heroCallBtn}><FaPhoneAlt /> Hemen Ara</a>
                  <Link to="/randevu" className={styles.heroOutlineBtn}>Randevu Al <FaArrowRight /></Link>
                </div>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        <Wrapper>
          {/* Why Us */}
          <div className={styles.whyUsSection}>
            <div className={styles.whyUsGrid}>
              {whyUs.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={styles.whyUsCard}>
                    <div className={styles.whyUsIcon}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Services */}
          <ScrollReveal>
            <div className={styles.sectionTitle}>
              <span className={styles.badge}>Hizmetler</span>
              <h2>Tüm Hizmetlerimiz</h2>
            </div>
          </ScrollReveal>

          <div className={styles.servicesSection}>
            <div className={styles.servicesGrid}>
              {services.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <motion.div className={styles.serviceCard} whileHover={{ y: -6 }}>
                    <div className={styles.serviceCardHeader}>
                      <div className={styles.serviceCardIcon} style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                      <span className={styles.serviceCardNum}>{s.num}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className={styles.serviceCardLine} style={{ background: s.color }} />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <ScrollReveal>
            <div className={styles.faqSection}>
              <div className={styles.sectionTitle}>
                <span className={styles.badge}>SSS</span>
                <h2>Sıkça Sorulan Sorular</h2>
              </div>
              <div className={styles.accordion}>
                {faqData.map((faq, i) => (
                  <div key={i} className={styles.accordionItem} onClick={() => dispatch(i)}>
                    <div className={styles.accordionHeader}>
                      <span>{faq.question}</span>
                      {state.open === i ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <AnimatePresence>
                      {state.open === i && (
                        <motion.div
                          className={styles.accordionContent}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>{faq.answer}</p>
                          {faq.details && faq.details.map((d, j) => (
                            <div key={j} className={styles.textAbout}>
                              <h3>{j + 1}. {d.title}</h3>
                              <p>{d.text}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default Kifoz;
