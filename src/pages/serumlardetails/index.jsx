import React, { useMemo } from "react";
import styles from './index.module.css';
import { useParams, Link } from "react-router-dom";
import Wrapper from '../../components/UI/wrapper';
import ScrollReveal from "../../components/scrollreveal";
import SerumSVG from "../../components/serumcard";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaArrowLeft, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

const serumsData = [
  { id: 1, text: "Atom Serum", category: "Enerji", textTwo: "Atom Serum, günlük yaşamı olumsuz etkileyen cilt problemleri ve yorgunluk hissini gidermek için özel olarak formüle edilmiştir.", headerText: "Atom Serum Nedir?", aboutHeaderText: "Atom Serum, cildin ihtiyaç duyduğu nemi sağlayarak kuruluğu önler ve cilt tonunu eşitler. Yoğun vitamin ve mineral içeriği sayesinde cildinizi besler ve yeniler.", types: [{ t: "Günlük Nemlendirici", d: "Cildinizi gün boyu nemli tutarak kuruluğa karşı korur." }, { t: "Cilt Yenileyici", d: "Yoğun içerikli formülüyle cildin yenilenme sürecini destekler." }, { t: "Yaşlanma Karşıtı", d: "İnce çizgileri ve kırışıklıkları azaltarak daha genç bir cilt görünümü sağlar." }], forKind: "Gençler ve Yetişkinler İçin", aboutKind: "Hem gençler hem de yetişkinler tarafından rahatlıkla kullanılabilir. Cilt tipinize uygun olarak günde iki kez kullanabilirsiniz.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Doğal ve organik içeriklerle formüle edilmiştir. Paraben ve sülfat gibi zararlı kimyasallar içermez.", content: "C vitamini, E vitamini, hyaluronik asit ve bitkisel ekstraktlar içerir." },
  { id: 2, text: "Fat Burning Slim Boost", category: "Detox", textTwo: "Fat Burning Slim Boost, kilo verme sürecinizi hızlandırmak ve enerji seviyenizi artırmak için özel olarak geliştirilmiş bir takviyedir.", headerText: "Fat Burning Slim Boost Nedir?", aboutHeaderText: "İçerdiği doğal bileşenlerle yağ yakımını teşvik eder ve metabolizmayı hızlandırır.", types: [{ t: "Metabolizma Hızlandırıcı", d: "Metabolizmanızı hızlandırarak gün boyu daha fazla kalori yakmanızı sağlar." }, { t: "Enerji Artırıcı", d: "Doğal içerikleri sayesinde enerji seviyenizi artırır." }, { t: "Yağ Yakıcı", d: "Vücutta biriken yağların yakılmasını teşvik eder." }], forKind: "Kadınlar ve Erkekler İçin", aboutKind: "Kilo vermek ve vücut yağ oranını azaltmak isteyen herkes tarafından kullanılabilir.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Doğal içeriklerle formüle edilmiş ve zararlı kimyasallar içermeyen bir üründür.", content: "Yeşil çay ekstresi, kafein, L-karnitin ve termojenik bileşenler içerir." },
  { id: 3, text: "Collagen Booster", category: "Güzellik", textTwo: "Collagen Booster, cilt sağlığını destekleyen ve yaşlanma belirtilerini azaltan bir takviyedir.", headerText: "Collagen Booster Nedir?", aboutHeaderText: "Kolajen üretimini artırarak cildin elastikiyetini ve nem seviyesini yükseltir.", types: [{ t: "Cilt Yenileyici", d: "Cildin kolajen üretimini artırarak yaşlanma belirtilerini azaltır." }, { t: "Saç ve Tırnak Güçlendirici", d: "Saç ve tırnakları güçlendirir, daha sağlıklı görünmelerini sağlar." }, { t: "Eklem Sağlığı", d: "Kolajen, eklem sağlığını destekler ve hareket kabiliyetini artırır." }], forKind: "Kadınlar ve Erkekler İçin", aboutKind: "Yaşlanma belirtilerini azaltmak ve cilt sağlığını korumak isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Doğal bileşenlerle formüle edilmiş, cildi içten dışa destekler.", content: "Hidrolize kolajen, C vitamini ve hyaluronik asit içerir." },
  { id: 4, text: "Magnezyum IV Terapi", category: "Vitamin", textTwo: "Magnezyum IV Terapi, vücudun ihtiyaç duyduğu magnezyumu doğrudan kan dolaşımına ileterek hızlı bir şekilde eksiklikleri giderir.", headerText: "Magnezyum IV Terapi Nedir?", aboutHeaderText: "Kas kramplarını azaltır, enerji seviyesini artırır ve stresle mücadeleye yardımcı olur.", types: [{ t: "Enerji Artırıcı", d: "Enerji üretimini destekler ve yorgunluk hissini azaltır." }, { t: "Kas Fonksiyonları", d: "Kas kramplarını önler ve kasların daha iyi çalışmasını sağlar." }, { t: "Sinir Sistemi", d: "Sinir fonksiyonlarını iyileştirir, stresle mücadeleye yardımcı olur." }], forKind: "Herkes İçin", aboutKind: "Magnezyum eksikliğini hızlı bir şekilde gidermek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Hızlı etkili bir tedavi yöntemidir. Doğrudan kan dolaşımına verildiği için hızlı sonuç verir.", content: "Saf magnezyum minerali içerir." },
  { id: 5, text: "Alfa Lipoik Asit IV Terapi", category: "Detox", textTwo: "Alfa Lipoik Asit IV Terapi, güçlü bir antioksidan olarak hücre yenilenmesini destekler.", headerText: "Alfa Lipoik Asit Nedir?", aboutHeaderText: "Vücudu serbest radikallerden korur, hücre yenilenmesini destekler ve enerji üretimini artırır.", types: [{ t: "Antioksidan Etki", d: "Vücudu serbest radikallerden korur." }, { t: "Sinir Sağlığı", d: "Sinir hasarını azaltır ve sinir sistemini korur." }, { t: "Cilt Sağlığı", d: "Cildi yeniler, kırışıklıkları azaltır." }], forKind: "Herkes İçin", aboutKind: "Sağlıklı bir yaşam tarzını desteklemek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Güçlü antioksidan özellikleri ile vücudu korur.", content: "Güçlü antioksidanlar içerir." },
  { id: 6, text: "Selenyum IV Terapi", category: "Vitamin", textTwo: "Selenyum IV Terapi, bağışıklık sistemini destekleyen ve tiroid fonksiyonlarını düzenleyen bir tedavidir.", headerText: "Selenyum IV Terapi Nedir?", aboutHeaderText: "Bağışıklık sistemini güçlendirir, tiroid fonksiyonlarını iyileştirir.", types: [{ t: "Bağışıklık Desteği", d: "Bağışıklık sistemini güçlendirir ve enfeksiyonlara karşı korur." }, { t: "Tiroid Fonksiyonları", d: "Tiroid bezinin düzgün çalışmasını sağlar." }, { t: "Antioksidan Etki", d: "Hücre yenilenmesini destekler." }], forKind: "Herkes İçin", aboutKind: "Bağışıklık sistemini güçlendirmek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Tiroid sağlığını destekler ve genel sağlığı iyileştirir.", content: "Yüksek oranda selenyum minerali içerir." },
  { id: 7, text: "B Vitamin Kompleksi", category: "Vitamin", textTwo: "B Vitamin Kompleksi, vücudun enerji üretimini destekleyen, sinir sistemi sağlığını iyileştiren önemli bir takviyedir.", headerText: "B Vitamin Kompleksi Nedir?", aboutHeaderText: "Enerji üretiminden cilt sağlığına kadar birçok önemli fonksiyona katkıda bulunur.", types: [{ t: "Enerji Artırıcı", d: "Enerji üretimini destekler ve yorgunluğu azaltır." }, { t: "Sinir Sağlığı", d: "Sinir sistemi fonksiyonlarını iyileştirir." }, { t: "Bağışıklık Desteği", d: "Bağışıklık sistemini güçlendirir." }], forKind: "Herkes İçin", aboutKind: "Enerji eksikliği ve stres yaşayan herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Vücudun temel ihtiyaçlarını karşılayan bir takviyedir.", content: "B1, B2, B3, B5, B6, B7, B9 ve B12 vitaminlerini içerir." },
  { id: 8, text: "Hidrasyon IV Terapi", category: "Enerji", textTwo: "Hidrasyon IV Terapi, vücudun su ve elektrolit dengesini hızla yeniden sağlar.", headerText: "Hidrasyon IV Terapi Nedir?", aboutHeaderText: "Dehidrasyonu önler, enerji seviyesini artırır ve genel sağlığı iyileştirir.", types: [{ t: "Dehidrasyon Tedavisi", d: "Vücudun sıvı dengesini hızla sağlar." }, { t: "Enerji Artırıcı", d: "Enerji seviyesini artırır ve yorgunluğu azaltır." }, { t: "Genel Sağlık", d: "Genel sağlık durumunu iyileştirir." }], forKind: "Herkes İçin", aboutKind: "Sıvı kaybını hızla gidermek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Hızlı etkili bir rehidrasyon yöntemidir.", content: "Elektrolitler ve sıvı içerir." },
  { id: 9, text: "Saç ve Tırnak Canlılığı", category: "Güzellik", textTwo: "Saç ve Tırnak Canlılığı IV Terapi, saç ve tırnak sağlığını destekleyen besinler içerir.", headerText: "Saç ve Tırnak Terapisi Nedir?", aboutHeaderText: "Saç ve tırnak sağlığını iyileştirir, güçlendirir ve canlandırır.", types: [{ t: "Saç Güçlendirici", d: "Saç köklerini besler, saç dökülmesini azaltır." }, { t: "Tırnak Güçlendirici", d: "Tırnakları güçlendirir ve kırılmalarını önler." }, { t: "Canlılık", d: "Saç ve tırnaklara parlaklık ve canlılık kazandırır." }], forKind: "Herkes İçin", aboutKind: "Saç dökülmesi ve tırnak kırılmasından şikayetçi olan bireyler için önerilir.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Saç ve tırnak sağlığını içten dışa destekler ve güçlendirir.", content: "Biotin, keratin ve çinko içerir." },
  { id: 10, text: "Beauty Kokteyl IV Terapi", category: "Güzellik", textTwo: "Beauty Kokteyl IV Terapi, cilt sağlığını destekleyen, gençleştirici özellikleri olan bir tedavidir.", headerText: "Beauty Kokteyl Nedir?", aboutHeaderText: "Cildi besler, yeniler ve gençleştirir.", types: [{ t: "Cilt Yenileme", d: "Cildi nemlendirir ve cilt tonunu eşitler." }, { t: "Anti-Aging", d: "Yaşlanma karşıtı etki sağlar." }, { t: "Canlandırma", d: "Cildin canlı ve parlak görünmesini sağlar." }], forKind: "Herkes İçin", aboutKind: "Cilt sağlığını iyileştirmek ve gençleştirmek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Cilt sağlığını içten dışa iyileştirir.", content: "Vitamin C, E ve hyaluronik asit içerir." },
  { id: 11, text: "Amino Asit Kokteyl", category: "Enerji", textTwo: "Amino Asit Kokteyl, vücudun ihtiyaç duyduğu esansiyel amino asitleri sağlar.", headerText: "Amino Asit Kokteyl Nedir?", aboutHeaderText: "Kas gelişimini destekler, enerji seviyelerini artırır.", types: [{ t: "Kas Gelişimi", d: "Kasların güçlenmesini ve onarılmasını sağlar." }, { t: "Enerji Artışı", d: "Enerji seviyelerini artırır ve yorgunluğu giderir." }, { t: "İyileşme", d: "Vücudun iyileşme sürecini hızlandırır." }], forKind: "Herkes İçin", aboutKind: "Kas gelişimini hızlandırmak isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Vücudun ihtiyaç duyduğu amino asitleri sağlar.", content: "Esansiyel amino asitler içerir." },
  { id: 12, text: "Glutatyon IV Serum", category: "Detox", textTwo: "Glutatyon IV Serum, güçlü bir antioksidan olan glutatyon içerir.", headerText: "Glutatyon IV Serum Nedir?", aboutHeaderText: "Vücudu zararlı serbest radikallere karşı korur ve cilt sağlığını iyileştirir.", types: [{ t: "Anti-Aging", d: "Yaşlanma belirtilerini azaltır." }, { t: "Antioksidan Koruma", d: "Serbest radikalleri nötralize eder." }, { t: "Cilt Sağlığı", d: "Cilt tonunu eşitler ve lekeleri azaltır." }], forKind: "Herkes İçin", aboutKind: "Yaşlanma belirtilerini azaltmak isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Güçlü bir antioksidan kaynağı olarak vücudu genç tutar.", content: "Glutatyon ve destekleyici antioksidanlar içerir." },
  { id: 13, text: "NAD+ Terapi", category: "Enerji", textTwo: "NAD+ (Nikotinamid Adenin Dinükleotid), vücudun enerji üretimini artıran ve hücresel yenilenmeyi destekleyen bir moleküldür.", headerText: "NAD+ Terapi Nedir?", aboutHeaderText: "Enerji üretimini artırır ve hücresel yenilenmeyi teşvik eder.", types: [{ t: "Enerji Artışı", d: "Hücrelere enerji sağlar ve genel enerji seviyelerini artırır." }, { t: "Zihinsel Netlik", d: "Zihinsel netliği artırır, odaklanmayı güçlendirir." }, { t: "Yaşlanma Karşıtı", d: "Yaşlanma sürecini yavaşlatır." }], forKind: "Herkes İçin", aboutKind: "Enerji seviyelerini artırmak isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Hücresel enerji üretimini artırarak vücudu genç tutar.", content: "NAD+ molekülü içerir." },
  { id: 14, text: "Myers Kokteyli IV Terapi", category: "Vitamin", textTwo: "Myers Kokteyli IV Terapi, vücuda ihtiyacı olan vitamin, mineral ve elektrolitleri sağlar.", headerText: "Myers Kokteyli Nedir?", aboutHeaderText: "Bağışıklık sistemini güçlendiren ve vücuda vitamin desteği sağlayan bir tedavidir.", types: [{ t: "Bağışıklık Desteği", d: "Vücuda güçlendirici vitamin ve mineraller sağlar." }, { t: "Enerji Artışı", d: "Enerji seviyelerini artırır, yorgunluğu azaltır." }, { t: "Hızlı İyileşme", d: "Yorgunluk ve hastalık sonrası hızla iyileşmeyi destekler." }], forKind: "Herkes İçin", aboutKind: "Bağışıklık sistemini güçlendirmek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Vücudu iyileştirir, güçlendirir ve bağışıklık sistemini destekler.", content: "Vitamin ve mineral kokteyli içerir." },
  { id: 15, text: "Yüksek Doz C Vitamini", category: "Bağışıklık", textTwo: "Yüksek Doz C Vitamini Kokteyli, bağışıklık sistemini güçlendirir ve cilt sağlığını iyileştirir.", headerText: "Yüksek Doz C Vitamini Nedir?", aboutHeaderText: "Bağışıklık sistemini güçlendiren ve serbest radikalleri yok eden bir tedavidir.", types: [{ t: "Bağışıklık Güçlendirme", d: "C vitamini bağışıklık sistemini güçlendirir." }, { t: "Cilt Sağlığı", d: "Ciltteki lekeleri azaltır ve sağlıklı görünüm sağlar." }, { t: "Serbest Radikal Koruma", d: "Serbest radikalleri nötralize eder." }], forKind: "Herkes İçin", aboutKind: "Bağışıklık sistemini güçlendirmek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Bağışıklık sistemini güçlendirir ve serbest radikallere karşı koruma sağlar.", content: "Yüksek dozda C vitamini içerir." },
  { id: 16, text: "Çinko IV Terapi", category: "Bağışıklık", textTwo: "Çinko IV Terapi, bağışıklık sistemini güçlendiren ve hücresel onarımı hızlandıran bir tedavidir.", headerText: "Çinko IV Terapi Nedir?", aboutHeaderText: "Bağışıklık sistemini destekleyen ve hücresel onarımı hızlandıran bir tedavidir.", types: [{ t: "Bağışıklık Güçlendirme", d: "Vücudu hastalıklara karşı korur." }, { t: "Hücresel Onarım", d: "Hücrelerin onarımını hızlandırır." }, { t: "Cilt Sağlığı", d: "Ciltteki iltihaplanmaları azaltır." }], forKind: "Herkes İçin", aboutKind: "Bağışıklık sistemini güçlendirmek isteyen herkes için uygundur.", whyTitle: "Neden Tercih Edilmeli?", whyText: "Bağışıklık sistemini güçlendirir ve iyileşmeyi hızlandırır.", content: "Çinko minerali içerir." },
];

const SerumlarDetails = () => {
  const { id } = useParams();
  const serum = serumsData.find((s) => s.id === Number(id));

  if (!serum) {
    return (
      <Wrapper>
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <h2>Serum bulunamadı</h2>
          <Link to="/serumlar" style={{ color: "#0d9488", fontWeight: 600 }}>Serumlara dön</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      <Helmet>
        <title>{serum.text} | ETERNAL Sağlık</title>
        <meta name="description" content={serum.textTwo} />
      </Helmet>

      <section className={styles.page}>
        <Wrapper>
          {/* Back link */}
          <ScrollReveal>
            <Link to="/serumlar" className={styles.backLink}>
              <FaArrowLeft /> Serumlara Dön
            </Link>
          </ScrollReveal>

          {/* Hero */}
          <ScrollReveal>
            <div className={styles.hero}>
              <div className={styles.heroSvg}>
                <SerumSVG name={serum.text} category={serum.category} />
              </div>
              <div className={styles.heroInfo}>
                <span className={styles.badge}>{serum.category}</span>
                <h1>{serum.text}</h1>
                <p>{serum.textTwo}</p>
                <a href="tel:05525189654" className={styles.callBtn}>
                  <FaPhoneAlt /> Randevu Al
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* About */}
          <ScrollReveal>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{serum.headerText}</h2>
              <p className={styles.sectionText}>{serum.aboutHeaderText}</p>
            </div>
          </ScrollReveal>

          {/* Types */}
          <ScrollReveal>
            <div className={styles.typesGrid}>
              {serum.types.map((type, i) => (
                <div key={i} className={styles.typeCard}>
                  <div className={styles.typeNum}>{String(i + 1).padStart(2, "0")}</div>
                  <h3>{type.t}</h3>
                  <p>{type.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* For who */}
          <ScrollReveal>
            <div className={styles.forWho}>
              <h3>{serum.forKind}</h3>
              <p>{serum.aboutKind}</p>
            </div>
          </ScrollReveal>

          {/* Why */}
          <ScrollReveal>
            <div className={styles.whySection}>
              <h3>{serum.whyTitle}</h3>
              <p>{serum.whyText}</p>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal>
            <div className={styles.contentBox}>
              <FaCheckCircle className={styles.contentIcon} />
              <div>
                <h3>İçerik</h3>
                <p>{serum.content}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Trust */}
          <ScrollReveal>
            <div className={styles.trustBox}>
              <FaShieldAlt className={styles.trustIcon} />
              <h2>Verdiğimiz Bilgilere Güvenebilirsiniz</h2>
              <p>Bu içerik Eternal Sağlık tarafından onaylanmıştır. Tıbbi Yayın Kurulumuz, sağlık alanında güvenilir bilgiye erişim sağlamak amacıyla oluşturulmuştur.</p>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default SerumlarDetails;
