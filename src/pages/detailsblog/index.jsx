import React, { useMemo } from "react";
import styles from './index.module.css';
import { useParams, Link } from "react-router-dom";
import Wrapper from '../../components/UI/wrapper';
import ScrollReveal from "../../components/scrollreveal";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";

import IllStomach from "../../assets/illustrations/stomach.svg";
import IllDiabetes from "../../assets/illustrations/diabetes.svg";
import IllBreathing from "../../assets/illustrations/breathing.svg";
import IllHeart from "../../assets/illustrations/heart-health.svg";
import IllSkin from "../../assets/illustrations/skin-care.svg";
import IllVirus from "../../assets/illustrations/virus.svg";
import IllInjection from "../../assets/illustrations/injection.svg";
import IllInflammation from "../../assets/illustrations/inflammation.svg";
import IllUrinary from "../../assets/illustrations/urinary.svg";
import IllBlood from "../../assets/illustrations/blood-test.svg";
import IllWound from "../../assets/illustrations/wound-care.svg";
import IllBreath2 from "../../assets/illustrations/breathing.svg";
import IllPhysio from "../../assets/illustrations/physio.svg";
import IllSerum from "../../assets/illustrations/serum-iv.svg";
import IllLab from "../../assets/illustrations/lab-test.svg";
import IllWellness from "../../assets/illustrations/wellness.svg";
import IllFAQ from "../../assets/illustrations/faq.svg";

const imageMap = {
  1: IllStomach, 2: IllDiabetes, 3: IllBreathing, 4: IllHeart,
  5: IllSkin, 6: IllVirus, 7: IllInjection, 8: IllInflammation,
  9: IllUrinary, 10: IllBlood, 11: IllWound, 12: IllBreath2,
  13: IllHeart, 14: IllPhysio, 15: IllSerum, 16: IllSerum,
  17: IllLab, 18: IllWellness, 19: IllFAQ,
};

const Details = () => {
  const { id } = useParams();
  const photos = useMemo(
    () => [
      { id: 1, text: "İshal Durumunda Neler Yapılmalı?", textTwo: "Günlük yaşamı olumsuz etkileyen mide ve bağırsak sorunları arasında yer alan ishal, hem yetişkinlerde hem çocuklarda en çok görülen bulaşıcı hastalıklardan biridir.", headerText: "İshal Nedir?", aboutHeaderText: "İshal, bağırsak hareketi sırasında gevşek ve sulu dışkılamaya neden olan, genellikle bir veya iki gün içerisinde kendiliğinden geçen bir sağlık problemidir.", types: [{ t: "Akut İshal", d: "1-2 gün süren ve herhangi bir tedavi gerektirmeden kendiliğinden geçen ishal türüdür." }, { t: "Sürekli İshal", d: "Yaklaşık iki ila dört hafta süren ishal türüdür." }, { t: "Kronik İshal", d: "Dört haftadan uzun süren ishal türüdür. Ciddi bir sağlık probleminden kaynaklanıyor olabilir." }], forKind: "Çocuklarda ve Bebeklerde İshal", aboutKind: "İshal durumunda bebeklere sıvı vermeye devam edilmesi elzemdir. Bebek eğer mamayla besleniyorsa normalden daha sık beslenmesi sağlanmalıdır.", whyTitle: "İshal Neden Olur?", whyText: "Crohn hastalığı, ülseratif kolit gibi bağırsak hastalıkları, bakteriyel enfeksiyonlar, virüsler, bazı gıdalara karşı alerjiler, temiz olmayan gıdalar veya sulardaki bakteriler.", content: "Süt ve süt ürünleri, baharatlı yiyecekler, işlenmiş gıdalar, kahve, kızartılmış besinler ishale yol açabilir." },
      { id: 2, text: "Diyabet (Şeker Hastalığı)", textTwo: "Diyabet, vücudun yeterli insülin üretmemesi veya insülini etkili kullanamaması nedeniyle kan şekerinin yükselmesi durumudur.", headerText: "Diyabet Nedir?", aboutHeaderText: "Diyabet, insülinin ya yetersiz üretildiği ya da vücud tarafından etkili bir şekilde kullanılmadığı bir hastalıktır.", types: [{ t: "Tip 1 Diyabet", d: "Pankreasın insülin üretmemesi nedeniyle oluşur. Genellikle çocuklukta görülür." }, { t: "Tip 2 Diyabet", d: "Vücudun insüline karşı direnç gösterdiği bir durumdur. Genellikle yaşla birlikte artar." }, { t: "Gestasyonel Diyabet", d: "Hamilelik döneminde ortaya çıkan geçici diyabet türüdür." }], forKind: "Diyabetin Belirtileri", aboutKind: "Aşırı susuzluk, sık idrara çıkma, yorgunluk, bulanık görme, açlık hissi gibi belirtiler diyabetin yaygın belirtileridir.", whyTitle: "Diyabet Neden Olur?", whyText: "Genetik faktörler, aşırı kilo, kötü beslenme alışkanlıkları ve hareketsiz yaşam tarzı gibi nedenler diyabetin başlıca sebeplerindendir.", content: "Meyveler, sebzeler, tam tahıllar ve sağlıklı yağlar, diyabet hastaları için uygun besinlerdir." },
      { id: 3, text: "Astım", textTwo: "Astım, hava yollarındaki iltihaplanma ve daralma nedeniyle nefes almayı zorlaştıran bir hastalıktır.", headerText: "Astım Nedir?", aboutHeaderText: "Astım, kronik bir akciğer hastalığı olup, hava yollarının daralmasına ve tıkanmasına neden olur.", types: [{ t: "Alerjik Astım", d: "Toz, polen, hayvan tüyü gibi alerjenlere karşı gelişen astım türüdür." }, { t: "Egzersize Bağlı Astım", d: "Fiziksel aktivite sırasında veya sonrasında tetiklenen astım türüdür." }, { t: "Mesleki Astım", d: "İş yerindeki kimyasal veya tozlara maruz kalma sonucu gelişen astım türüdür." }], forKind: "Astım Tedavisi", aboutKind: "Astım tedavisinde inhaler ilaçlar, steroidler ve bronkodilatörler kullanılır.", whyTitle: "Astım Neden Olur?", whyText: "Genetik yatkınlık, alerjiler, hava kirliliği, sigara dumanı ve solunum yolu enfeksiyonları astımın başlıca nedenleridir.", content: "Tedavide inhaler ilaçlar, steroidler, bronkodilatörler ve yaşam tarzı değişiklikleri önemlidir." },
      { id: 4, text: "Kalp Yetmezliği", textTwo: "Kalp yetmezliği, kalbin vücudun ihtiyaç duyduğu kanı yeterince pompalayamadığı bir durumdur.", headerText: "Kalp Yetmezliği Nedir?", aboutHeaderText: "Kalp yetmezliği, kalbin yeterli kan pompalamasını engelleyen kronik bir sağlık durumudur.", types: [{ t: "Sol Taraflı Yetmezlik", d: "Kalbin sol ventrikülü yeterince kan pompalanamaz." }, { t: "Sağ Taraflı Yetmezlik", d: "Kalbin sağ tarafı etkilenir, bacaklarda şişmeye neden olur." }, { t: "Sistolik Yetmezlik", d: "Kalp yeterli güçte kasılamaz." }], forKind: "Kalp Yetmezliği Belirtileri", aboutKind: "Nefes darlığı, yorgunluk, ayak bileklerinde şişlik, hızlı kalp atışı gibi belirtiler görülebilir.", whyTitle: "Kalp Yetmezliği Neden Olur?", whyText: "Koroner arter hastalığı, yüksek tansiyon, kalp kapak hastalıkları ve diyabet gibi faktörler kalp yetmezliğine yol açabilir.", content: "Tedavide ilaçlar, yaşam tarzı değişiklikleri ve bazı durumlarda cerrahi müdahale gerekebilir." },
      { id: 5, text: "Cilt Lekeleri ve Yorgunluk", textTwo: "Cilt lekeleri ve yorgunluk, birçoğumuzun zaman zaman karşılaştığı yaygın sağlık sorunlarıdır.", headerText: "Cilt Lekeleri ve Yorgunluk Nedir?", aboutHeaderText: "Cilt lekeleri, ciltteki melanin pigmentinin düzensiz dağılmasından kaynaklanır. Yorgunluk ise vücudun fiziksel ve zihinsel olarak tükendiğini hissettiği bir durumdur.", types: [{ t: "Güneş Lekeleri", d: "UV ışınlarına maruz kalma sonucu oluşan lekelerdir." }, { t: "Hormonal Lekeler", d: "Hamilelik, doğum kontrol hapı gibi hormonal değişimlerle oluşur." }, { t: "Kronik Yorgunluk", d: "Uzun süreli dinlenmeyle geçmeyen yorgunluk durumudur." }], forKind: "Cilt Bakımı ve Enerji", aboutKind: "Düzgün cilt bakımı ve sağlıklı yaşam tarzı ile cilt lekeleri ve yorgunluk azaltılabilir.", whyTitle: "Neden Oluşur?", whyText: "Güneş maruziyeti, hormonal değişimler, stres, uykusuzluk ve yetersiz beslenme temel nedenlerdir.", content: "C vitamini, retinol, hyalüronik asit içeren ürünler ve düzenli uyku önemlidir." },
      { id: 6, text: "Covid-19 (PCR Testi)", textTwo: "Covid-19, SARS-CoV-2 virüsünün neden olduğu bulaşıcı bir hastalıktır. PCR testi, virüsü tespit etmek için kullanılan en güvenilir yöntemdir.", headerText: "Covid-19 PCR Testi Nedir?", aboutHeaderText: "PCR testi, virüsün genetik materyalini tespit ederek enfeksiyonu teşhis eder.", types: [{ t: "PCR Testi", d: "Burun veya boğazdan alınan örnekle yapılan en hassas test yöntemidir." }, { t: "Antijen Testi", d: "Hızlı sonuç veren ancak PCR kadar hassas olmayan test türüdür." }, { t: "Antikor Testi", d: "Geçmişte enfeksiyon geçirip geçirmediğinizi gösterir." }], forKind: "Test Süreci", aboutKind: "Evde PCR testi hizmeti ile hastaneye gitmeden test yaptırılabilir.", whyTitle: "Neden PCR Testi?", whyText: "PCR testi, Covid-19 virüsünü en erken ve en doğru şekilde tespit eden yöntemdir.", content: "Burun veya boğaz sürüntüsü örneği alınır ve laboratuvarda analiz edilir." },
      { id: 7, text: "Enjeksiyon (İğne)", textTwo: "Enjeksiyon, ilaçların vücut içerisine verilmesi için kullanılan tıbbi bir işlemdir.", headerText: "Enjeksiyon Nedir?", aboutHeaderText: "Enjeksiyon, ilaçların kas içi, deri altı veya damar içi yolla uygulanmasıdır.", types: [{ t: "Kas İçi Enjeksiyon", d: "İlacın kas dokusuna verilmesidir." }, { t: "Deri Altı Enjeksiyon", d: "İlacın deri altındaki yağ dokusuna verilmesidir." }, { t: "Damar İçi Enjeksiyon", d: "İlacın doğrudan kan dolaşımına verilmesidir." }], forKind: "Evde Enjeksiyon", aboutKind: "Profesyonel hemşire ekibimiz ile evinizde güvenli enjeksiyon uygulaması yapılır.", whyTitle: "Neden Evde Enjeksiyon?", whyText: "Hastane stresinden uzak, evinizin konforunda profesyonel uygulama.", content: "Steril malzemeler ve uzman sağlık personeli ile güvenli uygulama." },
      { id: 8, text: "İleri Derece İltihaplanmalar", textTwo: "İltihaplanma, vücudun enfeksiyonlara ve yaralanmalara karşı verdiği doğal bir yanıttır.", headerText: "İltihaplanma Nedir?", aboutHeaderText: "İltihaplanma, vücudun kendini koruma mekanizmasıdır ancak kontrol edilmedikçe kronikleşebilir.", types: [{ t: "Akut İltihaplanma", d: "Kısa süreli, yaralanma veya enfeksiyona bağlıdır." }, { t: "Kronik İltihaplanma", d: "Uzun süreli, otoimmün hastalıklar veya çevresel faktörlerle ilişkilidir." }, { t: "Sistemik İltihaplanma", d: "Tüm vücudu etkileyen yaygın iltihaplanma durumudur." }], forKind: "İltihaplanma Tedavisi", aboutKind: "Anti-inflamatuar ilaçlar, fizik tedavi ve yaşam tarzı değişiklikleri ile tedavi edilir.", whyTitle: "Neden Oluşur?", whyText: "Enfeksiyonlar, otoimmün hastalıklar, stres ve kötü beslenme iltihaplanmanın başlıca nedenleridir.", content: "Anti-inflamatuar ilaçlar, steroidler, fizik tedavi ve beslenme düzeni ile tedavi edilir." },
      { id: 9, text: "İdrar Yolu Problemleri", textTwo: "İdrar yolu enfeksiyonları, idrar sisteminde bakterilerin çoğalmasıyla ortaya çıkan yaygın bir sağlık sorunudur.", headerText: "İdrar Yolu Enfeksiyonu Nedir?", aboutHeaderText: "İdrar yolu enfeksiyonları, böbrekler, üreterler, mesane veya üretrada oluşabilir.", types: [{ t: "Alt İdrar Yolu", d: "Mesane ve üretra enfeksiyonları (sistit)." }, { t: "Üst İdrar Yolu", d: "Böbrek enfeksiyonları (piyelonefrit)." }, { t: "Tekrarlayan İYE", d: "Yılda birden fazla tekrarlayan enfeksiyonlardır." }], forKind: "Belirtiler", aboutKind: "Sık idrara çıkma, yanma hissi, karın ağrısı ve bulanık idrar gibi belirtiler görülür.", whyTitle: "Neden Oluşur?", whyText: "Bakteriyel enfeksiyonlar, yetersiz sıvı alımı, bağışıklık sistemi zayıflığı ve hijyen eksikliği temel nedenlerdir.", content: "Antibiyotik tedavisi, bol su içmek ve hijyen kurallarına dikkat etmek önemlidir." },
      { id: 10, text: "Evde Kan Alma Hizmeti", textTwo: "Evde kan alma hizmeti, hastaların hastaneye gitmeden kendi evlerinde kan örneği verebilmelerini sağlar.", headerText: "Evde Kan Alma Nedir?", aboutHeaderText: "Profesyonel sağlık ekibimiz evinize gelerek steril ortamda kan örneği alır.", types: [{ t: "Rutin Kan Tahlili", d: "Genel sağlık kontrolü için yapılan standart kan testleri." }, { t: "Özel Testler", d: "Hormon, vitamin, allerji gibi özel testler." }, { t: "Acil Kan Alma", d: "Acil durumlarda hızlı kan alma hizmeti." }], forKind: "Kimler İçin Uygun?", aboutKind: "Yaşlı, engelli, hareket kısıtlılığı olan bireyler ve hastaneye gidemeyenler için idealdir.", whyTitle: "Neden Evde Kan Alma?", whyText: "Hastane kuyruğu olmadan, steril ortamda, profesyonel uygulama.", content: "Steril malzemeler, uzman hemşire ve hızlı sonuç." },
      { id: 11, text: "Yara Bakımı ve Pansuman", textTwo: "Profesyonel yara bakımı ve pansuman hizmeti ile yaralarınızın hızlı ve güvenli iyileşmesini sağlıyoruz.", headerText: "Yara Bakımı Nedir?", aboutHeaderText: "Yara bakımı, yaranın temizlenmesi, pansuman yapılması ve enfeksiyon önlenmesi işlemlerini kapsar.", types: [{ t: "Akut Yara Bakımı", d: "Cerrahi yara, kesi ve yanıkların bakımı." }, { t: "Kronik Yara Bakımı", d: "Bası yarası, diyabetik ayak gibi uzun süreli yaralar." }, { t: "Pansuman Değişimi", d: "Düzenli pansuman değişimi ve yara takibi." }], forKind: "Evde Yara Bakımı", aboutKind: "Uzman hemşire ekibimiz ile evinizde profesyonel yara bakımı hizmeti.", whyTitle: "Neden Evde Yara Bakımı?", whyText: "Evinizin konforunda, steril ortamda, enfeksiyon riski minimuma indirilmiş uygulama.", content: "Steril pansuman malzemeleri ve uzman hemşire ile profesyonel bakım." },
      { id: 12, text: "Solunum Terapisi", textTwo: "Solunum terapisi, akciğer ve solunum yolu hastalıklarının tedavisinde kullanılan bir yöntemdir.", headerText: "Solunum Terapisi Nedir?", aboutHeaderText: "Solunum terapisi, hastaların nefes alma kapasitesini artırmak için uygulanan tedavi yöntemidir.", types: [{ t: "Oksijen Terapisi", d: "Düşük oksijen seviyesi olan hastalara oksijen verilmesi." }, { t: "Nebülizatör Tedavisi", d: "İlaçların buhar şeklinde solunum yoluyla verilmesi." }, { t: "Göğüs Fizik Tedavi", d: "Akciğerlerdeki salgının atılmasına yardımcı olur." }], forKind: "Kimler İçin Uygun?", aboutKind: "KOAH, astım, pnömoni ve diğer solunum yolu hastalıkları olan bireyler için uygundur.", whyTitle: "Neden Evde Solunum Terapisi?", whyText: "Evinizde rahat ve stressiz ortamda profesyonel solunum tedavisi.", content: "Oksijen konsantratörü, nebülizatör ve profesyonel terapist ile uygulama." },
      { id: 13, text: "Kalp ve Tansiyon Takibi", textTwo: "Düzenli kalp ve tansiyon takibi, kardiyovasküler hastalıkların erken teşhisinde büyük önem taşır.", headerText: "Kalp ve Tansiyon Takibi Nedir?", aboutHeaderText: "Kan basıncının ve kalp ritminin düzenli olarak ölçülüp kayıt altına alınmasıdır.", types: [{ t: "Tansiyon Ölçümü", d: "Kan basıncının düzenli ölçümü ve takibi." }, { t: "EKG Takibi", d: "Kalbin elektriksel aktivitesinin izlenmesi." }, { t: "Holter Monitorizasyonu", d: "24 saat boyunca kalp ritminin kayıt altına alınması." }], forKind: "Kimler İçin Uygun?", aboutKind: "Hipertansiyon, kalp hastalığı öyküsü olan ve risk grubundaki bireyler için önerilir.", whyTitle: "Neden Düzenli Takip?", whyText: "Erken teşhis ile kalp krizi ve inme riskini önemli ölçüde azaltır.", content: "Dijital tansiyon aleti, EKG cihazı ve uzman sağlık personeli." },
      { id: 14, text: "Evde Fizik Tedavi", textTwo: "Evde fizik tedavi hizmeti ile hareket kabiliyetinizi artırın ve ağrılarınızı azaltın.", headerText: "Evde Fizik Tedavi Nedir?", aboutHeaderText: "Fizyoterapist eşliğinde evinizde uygulanan rehabilitasyon ve egzersiz programıdır.", types: [{ t: "Ortopedik Rehabilitasyon", d: "Ameliyat sonrası veya kırıklarda iyileşme süreci." }, { t: "Nörolojik Rehabilitasyon", d: "İnme, MS gibi nörolojik hastalıklarda rehabilitasyon." }, { t: "Ağrı Yönetimi", d: "Bel, boyun ve eklem ağrılarında tedavi." }], forKind: "Kimler İçin Uygun?", aboutKind: "Ameliyat sonrası, kronik ağrı, nörolojik hastalık ve hareket kısıtlılığı olan bireyler için.", whyTitle: "Neden Evde Fizik Tedavi?", whyText: "Kendi ortamınızda, bireysel program ile daha hızlı ve etkili iyileşme.", content: "Fizyoterapist, egzersiz programı ve rehabilitasyon ekipmanları." },
      { id: 15, text: "IV Serum Tedavisi", textTwo: "IV Serum Tedavisi, vitamin ve minerallerin doğrudan kan dolaşımına verilmesiyle hızlı etki sağlayan bir tedavi yöntemidir.", headerText: "IV Serum Tedavisi Nedir?", aboutHeaderText: "IV serum tedavisi, vücudun ihtiyaç duyduğu besin öğelerini doğrudan kan yoluyla alarak hızlı iyileşme sağlar.", types: [{ t: "Vitamin Serumları", d: "C vitamini, B kompleks ve diğer vitaminlerin IV yolla verilmesi." }, { t: "Mineral Serumları", d: "Magnezyum, çinko, selenyum gibi minerallerin takviyesi." }, { t: "Özel Formül Serumlar", d: "Hasta ihtiyacına göre özel hazırlanan serum formülleri." }], forKind: "Kimler İçin Uygun?", aboutKind: "Enerji eksikliği, bağışıklık zayıflığı, kronik yorgunluk ve vitamin eksikliği olan bireyler için uygundur.", whyTitle: "Neden IV Serum?", whyText: "Oral takviyelere göre çok daha hızlı ve etkili emilim sağlar.", content: "Vitamin, mineral, amino asit ve antioksidan içeren özel formüller." },
      { id: 16, text: "IV Terapi", textTwo: "IV Terapi, çeşitli sağlık sorunlarının tedavisinde kullanılan, ilaçların doğrudan damar yoluyla verilmesi yöntemidir.", headerText: "IV Terapi Nedir?", aboutHeaderText: "IV terapi, ilaçların ve besin öğelerinin doğrudan kan dolaşımına verilmesidir.", types: [{ t: "Hidrasyon Terapisi", d: "Vücut sıvı dengesinin yeniden sağlanması." }, { t: "Detox Terapisi", d: "Vücuttaki toksinlerin temizlenmesi." }, { t: "Bağışıklık Terapisi", d: "Bağışıklık sisteminin güçlendirilmesi." }], forKind: "Kimler İçin Uygun?", aboutKind: "Dehidrasyon, yorgunluk, bağışıklık zayıflığı ve genel sağlık desteği isteyen bireyler için.", whyTitle: "Neden IV Terapi?", whyText: "Hızlı etki, yüksek biyoyararlanım ve profesyonel uygulama.", content: "Elektrolitler, vitaminler, mineraller ve özel ilaç formülleri." },
      { id: 17, text: "Laboratuvar Paketleri", textTwo: "Laboratuvar paketleri, belirli sağlık taramaları için oluşturulan kapsamlı test gruplarıdır.", headerText: "Laboratuvar Paketleri Nelerdir?", aboutHeaderText: "Kan, idrar ve diğer örneklerle yapılan kapsamlı sağlık taraması paketleridir.", types: [{ t: "Genel Check-Up Paketi", d: "Temel kan sayımı, karaciğer, böbrek fonksiyon testleri." }, { t: "Hormon Paneli", d: "Tiroid, cinsiyet hormonları ve diğer hormon testleri." }, { t: "Allerji Paneli", d: "Gıda ve çevresel alerjenlere karşı test." }], forKind: "Kimler İçin Uygun?", aboutKind: "Düzenli sağlık kontrolü yaptırmak isteyen herkes için uygundur.", whyTitle: "Neden Evde Laboratuvar?", whyText: "Hastane kuyrukları olmadan, evinizde rahatça kan örneği verin.", content: "300+ farklı test seçeneği, hızlı sonuç ve uzman değerlendirmesi." },
      { id: 18, text: "Sağlıklı Yaşam", textTwo: "Sağlıklı yaşam, dengeli beslenme, düzenli egzersiz, yeterli uyku ve stres yönetimi gibi faktörleri içeren bir yaşam tarzıdır.", headerText: "Sağlıklı Yaşam Nedir?", aboutHeaderText: "Sağlıklı yaşam, bireylerin fiziksel ve zihinsel sağlığını korumak için benimsemeleri gereken bir yaşam tarzıdır.", types: [{ t: "Dengeli Beslenme", d: "Vücudun ihtiyaç duyduğu tüm besin maddelerini yeterli almak." }, { t: "Düzenli Egzersiz", d: "Fiziksel aktivite vücudun sağlıklı kalması için gereklidir." }, { t: "Yeterli Uyku", d: "Vücudun dinlenmesi ve yenilenmesi için yeterli uyku almak." }], forKind: "Sağlıklı Yaşamın Faydaları", aboutKind: "Sağlıklı yaşam, fiziksel ve zihinsel sağlığı korur, hastalıkları önler ve yaşam kalitesini artırır.", whyTitle: "Neden Sağlıklı Yaşam?", whyText: "Kronik hastalıkların önlenmesi, enerji artışı ve daha mutlu bir yaşam.", content: "Dengeli diyet, günlük 30 dakika egzersiz, 7-8 saat uyku önerilir." },
      { id: 19, text: "Sıkça Sorulan Sorular (SSS)", textTwo: "Sağlık hizmetlerimiz ve tedavi yöntemlerimiz hakkında sıkça sorulan soruların yanıtları.", headerText: "Sıkça Sorulan Sorular", aboutHeaderText: "Sağlık hizmetlerimiz hakkında en çok merak edilen soruların yanıtları.", types: [{ t: "IV Terapiler Hakkında", d: "IV terapiler, vitamin ve minerallerin doğrudan damardan verilmesiyle uygulanan tedavilerdir." }, { t: "Laboratuvar Paketleri", d: "Laboratuvar paketleri, belirli sağlık taramaları için oluşturulan test gruplarıdır." }, { t: "Sağlıklı Yaşam", d: "Sağlıklı yaşam; dengeli beslenme, düzenli egzersiz ve stres yönetimini kapsar." }], forKind: "Diğer Sorular", aboutKind: "Diğer sağlık hizmetlerimiz hakkında sorularınız için bizi arayın.", whyTitle: "Neden Bize Güvenmelisiniz?", whyText: "15 yıllık deneyim, %98 memnuniyet oranı ve profesyonel sağlık ekibi.", content: "7/24 hizmet, uzman kadro, steril ortam ve hızlı sonuç." },
    ],
    []
  );

  const photo = photos.find((item) => item.id === Number(id));

  if (!photo) {
    return (
      <Wrapper>
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <h2>Bilgi bulunamadı</h2>
          <Link to="/gallery" style={{ color: "#0d9488", fontWeight: 600 }}>Bloga dön</Link>
        </div>
      </Wrapper>
    );
  }

  const illustration = imageMap[photo.id] || IllSerum;

  return (
    <>
      <Helmet>
        <title>{photo.text} | ETERNAL Sağlık</title>
        <meta name="description" content={photo.textTwo} />
      </Helmet>

      <section className={styles.page}>
        <Wrapper>
          <ScrollReveal>
            <Link to="/gallery" className={styles.backLink}>
              <FaArrowLeft /> Bloga Dön
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.hero}>
              <div className={styles.heroImage}>
                <img src={illustration} alt={photo.text} />
              </div>
              <div className={styles.heroInfo}>
                <h1>{photo.text}</h1>
                <p>{photo.textTwo}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.section}>
              <h2>{photo.headerText}</h2>
              <p>{photo.aboutHeaderText}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.typesGrid}>
              {photo.types.map((type, i) => (
                <div key={i} className={styles.typeCard}>
                  <div className={styles.typeNum}>{String(i + 1).padStart(2, "0")}</div>
                  <h3>{type.t}</h3>
                  <p>{type.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.infoCard}>
              <h3>{photo.forKind}</h3>
              <p>{photo.aboutKind}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.whyCard}>
              <h3>{photo.whyTitle}</h3>
              <p>{photo.whyText}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.contentCard}>
              <h3>İçerik & Tedavi</h3>
              <p>{photo.content}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.trustBox}>
              <FaShieldAlt className={styles.trustIcon} />
              <h2>Verdiğimiz Bilgilere Güvenebilirsiniz</h2>
              <p>Bu içerik Eternal Sağlık tarafından onaylanmıştır. Tıbbi Yayın Kurulumuz, deneyimli doktor ve araştırmacılardan oluşan bir ekiptir.</p>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default Details;
