# ETERNAL Sağlık Hizmetleri – eternalsaglik.com

Website of ETERNAL Sağlık Hizmetleri, a home healthcare provider in Sakarya (also Düzce, Kocaeli, İstanbul):
home doctor and nurse visits, IV serum therapy, home lab tests, wound care, patient care and private ambulance.

Live: https://eternalsaglik.com

## Stack

- React 18 (Create React App), React Router 6, route-level code splitting with `React.lazy`
- CSS Modules + design tokens in `src/assets/css/variables.css` (light and dark theme)
- framer-motion for animation, Swiper for sliders, react-helmet-async for per-page SEO tags
- No backend: every form (booking, contact, callback, corporate) opens a pre-filled WhatsApp message

## Project layout

```
src/
  config/site.js        phones, WhatsApp, e-mail, address, regions, feature flags, analytics IDs
  data/                 services, serums, articles, packages, FAQ, care guides, symptom map
  context/settings.jsx  theme, font size, contrast, big mode, reduced motion (saved in localStorage)
  components/
    widgets/            mobile action bar, emergency sheet, accessibility panel, KVKK consent, assistant
    bookingform/        3-step appointment wizard
    icon3d/, tiltcard/  CSS 3D icons and pointer-tilt cards
  pages/                one folder per route (see src/routes.js)
  utils/                whatsapp.js, analytics.js, speech.js
public/sw.js            service worker (PWA, offline fallback)
scripts/sitemap.js      generates public/sitemap.xml before each build
scripts/deploy.py       uploads build/ to the server with a backup of the previous release
```

## Pages

| Path | Purpose |
|---|---|
| `/` | Home: audiences, stats, services, how it works, articles, Google reviews, service areas map, FAQ |
| `/randevu` | Online booking wizard + "Sizi arayalım" callback form |
| `/hizmetlerimiz`, `/hizmet/:slug` | Services overview and one SEO landing page per service |
| `/paketler` | Care, post-surgery, wellness and gift packages (no prices; "Bilgi Al" on WhatsApp) |
| `/serumlar`, `/serumlar/:id`, `/serum-testi` | Serum catalogue, details, 3-question serum quiz |
| `/belirti-rehberi` | Body map / symptom guide that points to services and articles |
| `/bakim-rehberi`, `/bakim-rehberi/:slug` | Printable (PDF) home-care guides |
| `/aileniz-icin` | For adult children arranging care for parents |
| `/kurumsal` | Hotels, factories, offices, care homes + quote form |
| `/en`, `/ar` | English and Arabic (RTL) pages for international guests |
| `/degerlendirme` | Post-visit rating; links to Google reviews |
| `/sss`, `/kvkk` | FAQ (with FAQPage schema) and KVKK privacy notice |

## Development

```bash
npm install
npm start          # http://localhost:3000
npm run build      # also regenerates public/sitemap.xml
```

Change contact details in `src/config/site.js` only. Optional analytics: set `REACT_APP_GA4_ID` and/or
`REACT_APP_META_PIXEL_ID` in `.env` (see `.env.example`); trackers load only after the visitor accepts cookies.

## Deploy

The server serves `build/` as static files with nginx from `/var/www/eternal`.

```bash
pip install paramiko
npm run build
npm run deploy                     # keeps the last 3 releases as /var/www/eternal.bak-*
python scripts/deploy.py --rollback
```

Credentials are read from `.env`, which is git-ignored. Never commit it.
