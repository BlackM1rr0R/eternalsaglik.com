// Printable home-care guides (/bakim-rehberi/:slug). General guidance only;
// every guide reminds the reader to follow their own doctor's instructions.
export const careGuides = [
  {
    slug: "ameliyat-sonrasi-yara-bakimi",
    title: "Ameliyat Sonrası Yara Bakımı",
    summary: "Ameliyat yaranızın evde temiz ve güvenli iyileşmesi için temel adımlar.",
    sections: [
      { h: "Günlük bakım", items: ["Yaraya dokunmadan önce ellerinizi sabun ve suyla en az 20 saniye yıkayın.", "Pansumanı doktorunuzun veya hemşirenizin söylediği aralıklarla değiştirin.", "Yarayı kuru ve temiz tutun; izin verilene kadar küvete girmeyin, havuza ve denize girmeyin.", "Yara üzerine krem, pudra veya bitkisel karışım sürmeyin."] },
      { h: "Beslenme ve hareket", items: ["Bol su için, protein ve sebze ağırlıklı beslenin.", "Ağır kaldırmaktan ve yarayı geren hareketlerden kaçının.", "Doktorunuzun izin verdiği ölçüde kısa yürüyüşler yapın."] },
      { h: "Hemen haber verin", danger: true, items: ["Yarada artan kızarıklık, şişlik veya ısı artışı", "Sarı/yeşil akıntı veya kötü koku", "38°C ve üzeri ateş", "Dikişlerin açılması veya kanamanın durmaması"] },
    ],
  },
  {
    slug: "basi-yarasi-onleme",
    title: "Bası Yarasını (Dekubit) Önleme",
    summary: "Yatağa bağımlı hastalarda bası yarası riskini azaltmak için aileye yönelik rehber.",
    sections: [
      { h: "Pozisyon", items: ["Hastanın pozisyonunu en az 2 saatte bir değiştirin.", "Topuk, kalça, sakrum ve dirsek gibi kemik çıkıntılarının altına yastık destek koyun.", "Mümkünse havalı (basınç azaltıcı) yatak kullanın."] },
      { h: "Cilt bakımı", items: ["Cildi her gün kızarıklık açısından kontrol edin.", "Cildi kuru tutun; ıslak bez ve çarşafı hemen değiştirin.", "Kızarık bölgeye masaj yapmayın.", "Nemlendirici ile cildin kurumasını önleyin."] },
      { h: "Beslenme", items: ["Yeterli protein ve sıvı alımı yaranın oluşmasını ve ilerlemesini önlemeye yardım eder."] },
      { h: "Hemen haber verin", danger: true, items: ["Basınca rağmen beyazlaşmayan kızarıklık", "Ciltte açılma, su toplama veya morarma", "Yarada koku veya akıntı"] },
    ],
  },
  {
    slug: "diyabetik-ayak-bakimi",
    title: "Diyabetik Ayak Bakımı",
    summary: "Şeker hastalarının ayak yaralarını önlemek için günlük kontrol listesi.",
    sections: [
      { h: "Her gün", items: ["Ayaklarınızı her gün ayna yardımıyla kontrol edin; parmak aralarına bakın.", "Ilık suyla yıkayın, özellikle parmak aralarını iyice kurulayın.", "Topuklara nemlendirici sürün, parmak aralarına sürmeyin."] },
      { h: "Ayakkabı ve çorap", items: ["Çıplak ayakla yürümeyin.", "Dikişsiz, pamuklu çorap ve rahat ayakkabı giyin.", "Ayakkabının içini giymeden önce kontrol edin."] },
      { h: "Kesinlikle yapmayın", items: ["Nasırları kendiniz kesmeyin veya nasır ilacı kullanmayın.", "Ayaklarınızı sobaya, termofora veya sıcak suya tutmayın."] },
      { h: "Hemen haber verin", danger: true, items: ["İyileşmeyen yara veya çatlak", "Ayakta renk değişikliği, şişlik veya ısı artışı", "Uyuşma ve his kaybında artış"] },
    ],
  },
  {
    slug: "serum-sonrasi",
    title: "Serum Uygulaması Sonrası",
    summary: "Serum ve damar yolu uygulamasından sonra dikkat edilecekler.",
    sections: [
      { h: "İlk saatler", items: ["Damar yolu bölgesine birkaç dakika hafif baskı uygulayın.", "Bandı 1-2 saat çıkarmayın.", "Bol su için."] },
      { h: "Normal kabul edilenler", items: ["Bölgede hafif morarma", "Kısa süreli hafif yorgunluk"] },
      { h: "Hemen haber verin", danger: true, items: ["Kol veya elde şişlik, ağrı, kızarıklık", "Kaşıntı, döküntü, nefes darlığı (alerji belirtileri — acil durumda 112)", "Ateş veya titreme"] },
    ],
  },
];

export const getCareGuide = (slug) => careGuides.find((g) => g.slug === slug);
