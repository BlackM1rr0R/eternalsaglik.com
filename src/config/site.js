// Single source of truth for contact details and feature flags.
// Change a phone number here and it updates everywhere on the site.

export const SITE = {
  name: "ETERNAL Sağlık Hizmetleri",
  shortName: "ETERNAL Sağlık",
  url: "https://eternalsaglik.com",
  phones: [
    { display: "0552 518 96 54", tel: "+905525189654" },
    { display: "0543 406 35 44", tel: "+905434063544" },
  ],
  whatsapp: "905525189654",
  email: "info@eternalsaglik.com",
  instagram: "https://www.instagram.com/sakaryaevdesaglik.esh/",
  address: "Semerciler Mah., Adapazarı / Sakarya",
  addressShort: "Sakarya, Semerciler Mah.",
  geo: { lat: 40.7751944, lng: 30.3928889 },
  hours: "7 Gün / 24 Saat",
  regions: ["Sakarya", "Düzce", "Kocaeli", "İstanbul"],
  // Google review link shown after a good rating on /degerlendirme.
  // Replace with the "Yorum yaz" link from Google Business Profile when available.
  googleReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=ETERNAL+Sa%C4%9Fl%C4%B1k+Hizmetleri+Sakarya",
  featurableWidgetId: "ddd9981e-eda0-4798-a92b-2dca78041fb2",
};

export const primaryPhone = SITE.phones[0];

// Features that make a commercial promise stay off until the business confirms them.
export const FEATURES = {
  loyaltyCard: false, // "5 seans sonrası 1 seans hediye" style campaign
};

// Analytics IDs come from build-time env vars; empty means the tracker is not loaded.
export const ANALYTICS = {
  ga4Id: process.env.REACT_APP_GA4_ID || "",
  metaPixelId: process.env.REACT_APP_META_PIXEL_ID || "",
};
