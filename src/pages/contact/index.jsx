import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaCheckCircle, FaEnvelope, FaInstagram, FaWhatsapp, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { sendMessage } from "../../api";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "../../components/scrollreveal";
import { motion } from "framer-motion";

const Contact = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gmail, setGmail] = useState("");
  const [message, setMessage] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !gmail || !message || !phonenumber) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    setLoading(true);
    try {
      await sendMessage({ firstname, lastname, gmail, message, phonenumber });
      setSuccessMessage("Mesajınız başarıyla gönderildi!");
      setFirstName(""); setLastName(""); setGmail("");
      setMessage(""); setPhone(""); setSubject("");
    } catch {
      alert("Mesaj gönderilemedi, bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>İletişim | ETERNAL Sağlık Hizmetleri</title>
        <meta name="description" content="ETERNAL Sağlık Hizmetleri ile iletişime geçin." />
      </Helmet>

      <section className={styles.page}>
        {/* Hero */}
        <div className={styles.heroSection}>
          <Wrapper>
            <ScrollReveal>
              <div className={styles.heroInner}>
                <span className={styles.heroBadge}>İletişim</span>
                <h1>Bize Ulaşın</h1>
                <p>Sorularınız, önerileriniz veya randevu talepleriniz için bizimle iletişime geçin</p>
              </div>
            </ScrollReveal>
          </Wrapper>
        </div>

        <Wrapper>
          {/* Info Cards */}
          <div className={styles.infoCards}>
            <ScrollReveal delay={0}>
              <motion.a href="tel:05525189654" className={styles.infoCard} whileHover={{ y: -4 }}>
                <div className={`${styles.infoIcon} ${styles.iconTeal}`}><FaPhoneAlt /></div>
                <h3>Telefon</h3>
                <p>0552 518 96 54</p>
                <span>7/24 Ulaşılabilir</span>
              </motion.a>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <motion.a href="https://wa.me/905525189654" target="_blank" rel="noopener noreferrer" className={styles.infoCard} whileHover={{ y: -4 }}>
                <div className={`${styles.infoIcon} ${styles.iconGreen}`}><FaWhatsapp /></div>
                <h3>WhatsApp</h3>
                <p>Mesaj Gönderin</p>
                <span>Hızlı Yanıt</span>
              </motion.a>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <motion.div className={styles.infoCard} whileHover={{ y: -4 }}>
                <div className={`${styles.infoIcon} ${styles.iconBlue}`}><FaMapMarkerAlt /></div>
                <h3>Adres</h3>
                <p>Sakarya, Semerciler Mah.</p>
                <span>Sakarya, Düzce, Kocaeli, İstanbul</span>
              </motion.div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <motion.div className={styles.infoCard} whileHover={{ y: -4 }}>
                <div className={`${styles.infoIcon} ${styles.iconAmber}`}><FaClock /></div>
                <h3>Çalışma Saatleri</h3>
                <p>7 Gun / 24 Saat</p>
                <span>Tatil günleri dahil</span>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <ScrollReveal direction="left">
              <div className={styles.formLeft}>
                <h2>Mesaj Gönderin</h2>
                <p>
                  Eternal Sağlık ekibi olarak müşteri memnuniyetini öncelikli hedeflerimiz
                  arasına koyan bir firma olarak, size en kısa sürede geri dönüş yapacağız.
                </p>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}><FaHeadset /></div>
                    <div>
                      <h4>Hızlı Yanıt</h4>
                      <span>En geç 1 saat içinde dönüş</span>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}><FaShieldAlt /></div>
                    <div>
                      <h4>Gizlilik</h4>
                      <span>Bilgileriniz güvendedir</span>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}><FaClock /></div>
                    <div>
                      <h4>7/24 Destek</h4>
                      <span>Her zaman ulaşabilirsiniz</span>
                    </div>
                  </div>
                </div>

                <div className={styles.contactLinks}>
                  <a href="tel:05525189654" className={styles.contactLink}>
                    <div className={styles.contactLinkIcon} style={{background:"var(--teal-50)",color:"var(--primary)"}}><FaPhoneAlt /></div>
                    <div className={styles.contactLinkText}>
                      <span>Telefon</span>
                      <strong>0552 518 96 54</strong>
                    </div>
                  </a>
                  <a href="mailto:info@eternalsaglik.com" className={styles.contactLink}>
                    <div className={styles.contactLinkIcon} style={{background:"var(--blue-50)",color:"var(--secondary)"}}><FaEnvelope /></div>
                    <div className={styles.contactLinkText}>
                      <span>E-posta</span>
                      <strong>info@eternalsaglik.com</strong>
                    </div>
                  </a>
                  <a href="https://www.instagram.com/sakaryaevdesaglik.esh/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    <div className={styles.contactLinkIcon} style={{background:"#fdf2f8",color:"#db2777"}}><FaInstagram /></div>
                    <div className={styles.contactLinkText}>
                      <span>Instagram</span>
                      <strong>@sakaryaevdesaglik</strong>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <label>
                    <span>Adınız*</span>
                    <input value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="Adınız" type="text" required />
                  </label>
                  <label>
                    <span>Soyadınız*</span>
                    <input value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Soyadınız" type="text" required />
                  </label>
                  <label>
                    <span>E-posta*</span>
                    <input value={gmail} onChange={(e) => setGmail(e.target.value)} placeholder="E-posta adresiniz" type="email" required />
                  </label>
                  <label>
                    <span>Telefon*</span>
                    <input value={phonenumber} onChange={(e) => setPhone(e.target.value)} placeholder="05xx xxx xx xx" type="text" required />
                  </label>
                </div>
                <label>
                  <span>Konu</span>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className={styles.select}>
                    <option value="">Konu seçin</option>
                    <option value="randevu">Randevu Talebi</option>
                    <option value="bilgi">Bilgi Alma</option>
                    <option value="sikayet">Şikayet / Öneri</option>
                    <option value="diger">Diğer</option>
                  </select>
                </label>
                <label>
                  <span>Mesajınız*</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mesajınızı yazın..." rows="6" required />
                </label>
                <div className={styles.formActions}>
                  {successMessage && (
                    <span className={styles.success}><FaCheckCircle /> {successMessage}</span>
                  )}
                  <button type="submit" disabled={loading}>
                    <FaPaperPlane />
                    {loading ? "Gönderiliyor..." : "Mesajı Gönder"}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal>
            <div className={styles.mapSection}>
              <div className={styles.mapHeader}>
                <h2>Bizi Ziyaret Edin</h2>
                <p>Sağlık hizmetinizi ayağınıza getirmek için buradayız</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3021.401144126256!2d30.3928889!3d40.77519439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQ2JzMwLjciTiAzMMKwMjMnMzQuNCJF!5e0!3m2!1str!2saz!4v1734266122992!5m2!1str!2saz"
                className={styles.map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konum"
              />
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(Contact);
