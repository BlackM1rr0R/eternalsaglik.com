// Symptom guide / body map: points visitors to the right service or article.
// This is navigation help, not a diagnosis; red-flag symptoms always point to 112.
export const bodyRegions = [
  {
    id: "head", label: "Baş & Genel", symptoms: [
      { s: "Halsizlik, yorgunluk, enerji düşüklüğü", service: "evde-serum", article: 15 },
      { s: "Ateş, grip, sık hastalanma", service: "evde-doktor", article: 6 },
      { s: "Cilt lekeleri, cilt yorgunluğu", serum: 3, article: 5 },
      { s: "Saç dökülmesi, tırnak kırılması", serum: 9 },
    ],
  },
  {
    id: "chest", label: "Göğüs & Solunum", symptoms: [
      { s: "Nefes darlığı, astım, öksürük", service: "evde-doktor", article: 3 },
      { s: "Tansiyon yüksekliği, çarpıntı", service: "evde-doktor", article: 13 },
      { s: "Kalp yetmezliği takibi", service: "evde-doktor", article: 4 },
    ],
    redFlag: "Ani ve şiddetli göğüs ağrısı veya ağır nefes darlığında hemen 112'yi arayın.",
  },
  {
    id: "belly", label: "Karın & Sindirim", symptoms: [
      { s: "İshal, kusma, sıvı kaybı", service: "evde-serum", article: 1 },
      { s: "Kan şekeri yüksekliği (diyabet)", service: "evde-doktor", article: 2 },
      { s: "İdrar yanması, sık idrara çıkma", service: "evde-tahlil", article: 9 },
    ],
  },
  {
    id: "arms", label: "Kollar & Eller", symptoms: [
      { s: "Doktorun yazdığı iğne / serum", service: "evde-hemsire", article: 7 },
      { s: "Kan tahlili yaptırmam lazım", service: "evde-tahlil", article: 10 },
      { s: "Kas krampları, uyuşma", serum: 4 },
    ],
  },
  {
    id: "legs", label: "Bacaklar & Ayaklar", symptoms: [
      { s: "Diyabetik ayak yarası", service: "yara-bakimi", guide: "diyabetik-ayak-bakimi" },
      { s: "Hareket kısıtlılığı, eklem ağrısı", service: "evde-doktor", article: 14 },
      { s: "Bacakta şişlik, iltihap", service: "evde-doktor", article: 8 },
    ],
  },
  {
    id: "skin", label: "Cilt & Yara", symptoms: [
      { s: "Ameliyat yarası, dikiş alma", service: "yara-bakimi", guide: "ameliyat-sonrasi-yara-bakimi" },
      { s: "Bası yarası (yatağa bağımlı hasta)", service: "yara-bakimi", guide: "basi-yarasi-onleme" },
      { s: "Yara, iltihaplanma", service: "yara-bakimi", article: 11 },
    ],
  },
];

export const redFlags = [
  "Bilinç kaybı veya bayılma",
  "Ani, şiddetli göğüs ağrısı",
  "Ağır nefes darlığı",
  "Yüzde kayma, konuşma bozukluğu, kolda/bacakta ani güçsüzlük",
  "Durdurulamayan kanama",
];
