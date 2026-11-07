import { SITE } from "../config/site";

export const whatsappUrl = (text = "Merhaba, bilgi almak istiyorum.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

// Builds a readable message from label/value pairs, skipping empty values.
export const buildMessage = (title, fields) => {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `• ${k}: ${String(v).trim()}`);
  return [`*${title}*`, ...lines].join("\n");
};

export const openWhatsApp = (text) => {
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
};

// Turkish mobile numbers: accepts 05xx..., 5xx..., +905xx... with spaces.
export const isValidPhone = (value) => {
  const digits = String(value).replace(/\D/g, "");
  return /^(90)?0?5\d{9}$/.test(digits) || (digits.length >= 10 && digits.length <= 15);
};
