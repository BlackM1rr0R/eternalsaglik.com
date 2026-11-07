import { ANALYTICS } from "../config/site";

const CONSENT_KEY = "eternal-consent"; // "granted" | "denied"
let loaded = false;

export const getConsent = () => localStorage.getItem(CONSENT_KEY);

export const setConsent = (value) => {
  localStorage.setItem(CONSENT_KEY, value);
  if (value === "granted") initAnalytics();
};

const addScript = (src) => {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
};

export const initAnalytics = () => {
  if (loaded || getConsent() !== "granted") return;
  loaded = true;

  if (ANALYTICS.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS.ga4Id, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4Id}`);
  }

  if (ANALYTICS.metaPixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", ANALYTICS.metaPixelId);
    window.fbq("track", "PageView");
  }

  trackClicks();
};

export const trackEvent = (name, params = {}) => {
  if (getConsent() !== "granted") return;
  window.gtag?.("event", name, params);
  if (name === "generate_lead") window.fbq?.("track", "Lead", params);
  if (name === "contact_click") window.fbq?.("track", "Contact", params);
};

export const trackPageView = (path) => {
  if (getConsent() !== "granted" || !ANALYTICS.ga4Id) return;
  window.gtag?.("event", "page_view", { page_path: path });
  window.fbq?.("track", "PageView");
};

// Counts every phone and WhatsApp click on the site without touching each component.
const trackClicks = () => {
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (href.startsWith("tel:")) trackEvent("contact_click", { method: "phone", location: window.location.pathname });
    else if (href.includes("wa.me/")) trackEvent("contact_click", { method: "whatsapp", location: window.location.pathname });
  });
};
