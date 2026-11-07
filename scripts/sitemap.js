// Generates public/sitemap.xml from the routes and data files. Runs before every build (npm "prebuild").
const fs = require("fs");
const path = require("path");

const SITE = "https://eternalsaglik.com";
const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const all = (re, s) => [...s.matchAll(re)].map((m) => m[1]);

const staticPages = [
  ["/", "1.0", "weekly"],
  ["/randevu", "0.9", "monthly"],
  ["/hizmetlerimiz", "0.9", "monthly"],
  ["/paketler", "0.9", "monthly"],
  ["/serumlar", "0.8", "monthly"],
  ["/aileniz-icin", "0.8", "monthly"],
  ["/kurumsal", "0.7", "monthly"],
  ["/serum-testi", "0.7", "monthly"],
  ["/belirti-rehberi", "0.7", "monthly"],
  ["/bakim-rehberi", "0.6", "monthly"],
  ["/sss", "0.7", "monthly"],
  ["/gallery", "0.7", "weekly"],
  ["/about", "0.6", "yearly"],
  ["/contact", "0.7", "yearly"],
  ["/en", "0.7", "monthly"],
  ["/ar", "0.7", "monthly"],
  ["/kvkk", "0.3", "yearly"],
];

const services = all(/slug: "([a-z0-9-]+)"/g, read("src/data/services.js")).map((s) => [`/hizmet/${s}`, "0.8", "monthly"]);
const guides = all(/slug: "([a-z0-9-]+)"/g, read("src/data/careguides.js")).map((s) => [`/bakim-rehberi/${s}`, "0.5", "yearly"]);
const articles = all(/\{ id: (\d+), text:/g, read("src/data/articles.js")).map((id) => [`/details/${id}`, "0.6", "monthly"]);
const serums = all(/\{ id: (\d+), info:/g, read("src/data/serums.js")).map((id) => [`/serumlar/${id}`, "0.6", "monthly"]);

const today = new Date().toISOString().slice(0, 10);
const urls = [...staticPages, ...services, ...guides, ...articles, ...serums]
  .map(([loc, pr, cf]) => `  <url><loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`)
  .join("\n");

fs.writeFileSync(
  path.join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`sitemap.xml: ${urls.split("\n").length} URLs`);
