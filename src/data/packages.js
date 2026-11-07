import {
  FaHeartbeat, FaTint, FaBandAid, FaBed, FaUserFriends, FaClipboardCheck,
  FaBolt, FaBriefcase, FaRing, FaHotel, FaGift,
} from "react-icons/fa";

// Care packages. Prices are intentionally not listed: every package ends in "Bilgi Al" on WhatsApp.
export const packageGroups = [
  {
    id: "duzenli",
    title: "Düzenli Bakım Paketleri",
    subtitle: "Haftalık veya aylık plan; aynı ekip, düzenli takip.",
    items: [
      {
        icon: FaHeartbeat, tone: "rose", name: "Tansiyon & Kalp Takibi",
        period: "Haftalık / Aylık",
        features: ["Düzenli tansiyon ve nabız ölçümü", "İlaç kullanımı kontrolü", "Ölçüm sonuçlarının aileyle paylaşılması", "Gerektiğinde doktor değerlendirmesi"],
      },
      {
        icon: FaTint, tone: "blue", name: "Diyabet Takibi", featured: true,
        period: "Haftalık / Aylık",
        features: ["Şeker ölçümü ve takip çizelgesi", "İnsülin uygulama desteği", "Diyabetik ayak kontrolü", "Periyodik HbA1c tahlili"],
      },
      {
        icon: FaUserFriends, tone: "teal", name: "Yaşlı Bakım Destek",
        period: "Aylık",
        features: ["Düzenli hemşire ziyareti", "Genel sağlık kontrolü", "Ziyaret sonrası aileye bilgilendirme", "Acil durumda öncelikli destek"],
      },
    ],
  },
  {
    id: "ameliyat",
    title: "Ameliyat Sonrası & Kronik Bakım",
    subtitle: "Taburcu olduktan sonra evde güvenli iyileşme.",
    items: [
      {
        icon: FaBandAid, tone: "amber", name: "Ameliyat Sonrası Yara Bakımı",
        period: "İyileşme süresince",
        features: ["Düzenli pansuman", "Dikiş alma", "Enfeksiyon belirtilerinin takibi", "Basılı bakım rehberi"],
      },
      {
        icon: FaBed, tone: "violet", name: "Dekubit (Bası Yarası) Bakımı",
        period: "Haftalık / Aylık",
        features: ["Bası yarası pansumanı", "Pozisyon ve cilt bakımı eğitimi", "Yaranın fotoğraflı takibi", "Aileye bakım eğitimi"],
      },
      {
        icon: FaClipboardCheck, tone: "teal", name: "Evde Check-Up",
        period: "Tek seferlik / Yıllık",
        features: ["Kapsamlı kan tahlilleri", "EKG ve tansiyon ölçümü", "Doktor değerlendirmesi", "Sonuçların açıklanması"],
      },
    ],
  },
  {
    id: "wellness",
    title: "Wellness & Serum Paketleri",
    subtitle: "Evde, ofiste veya otelde serum uygulaması.",
    items: [
      {
        icon: FaBolt, tone: "amber", name: "Enerji & Bağışıklık Kürü",
        period: "Seanslık / Kür",
        features: ["Doktor ön değerlendirmesi", "Kişiye özel serum içeriği", "Seans planlaması", "Evde uygulama"],
      },
      {
        icon: FaBriefcase, tone: "blue", name: "Ofise Serum Günü", featured: true,
        period: "Grup",
        features: ["Ekibiniz için toplu uygulama", "Ofisinizde kurulum", "Her çalışan için ön değerlendirme", "Esnek saat planı"],
      },
      {
        icon: FaRing, tone: "rose", name: "Düğün & Özel Gün Öncesi",
        period: "Grup / Bireysel",
        features: ["Gelin, damat ve aile için", "Güzellik ve hidrasyon serumları", "Evde veya otelde uygulama"],
      },
      {
        icon: FaHotel, tone: "teal", name: "Otelinize Geliyoruz",
        period: "Misafirler için",
        features: ["Sapanca, Kartepe ve çevresi", "Hidrasyon ve yorgunluk serumları", "Türkçe / İngilizce / Arapça iletişim"],
      },
    ],
  },
];

export const giftPackage = {
  icon: FaGift,
  name: "Sağlık Hediye Paketi",
  desc: "Annenize, babanıza veya bir yakınınıza check-up, serum ya da bakım paketi hediye edin. Paketi siz seçin, randevuyu biz yakınınızla planlayalım.",
};
