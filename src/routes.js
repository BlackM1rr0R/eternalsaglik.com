import { lazy } from "react";
import Home from "./pages/home";

// Home is bundled eagerly (first paint); every other page is its own chunk.
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Details = lazy(() => import("./pages/detailsblog"));
const Gallery = lazy(() => import("./pages/gallery"));
const Idiopatik = lazy(() => import("./pages/idiopatik"));
const Kifoz = lazy(() => import("./pages/kifoz"));
const NotFound = lazy(() => import("./pages/notFound"));
const Serumlar = lazy(() => import("./pages/serumlar"));
const SerumlarDetails = lazy(() => import("./pages/serumlardetails"));
const Packages = lazy(() => import("./pages/packages"));
const ServicePage = lazy(() => import("./pages/service"));
const SerumQuiz = lazy(() => import("./pages/serumquiz"));
const Symptoms = lazy(() => import("./pages/symptoms"));
const CareGuideList = lazy(() => import("./pages/careguide").then((m) => ({ default: m.CareGuideList })));
const CareGuideDetail = lazy(() => import("./pages/careguide").then((m) => ({ default: m.CareGuideDetail })));
const Family = lazy(() => import("./pages/family"));
const Corporate = lazy(() => import("./pages/corporate"));
const InternationalEn = lazy(() => import("./pages/international").then((m) => ({ default: m.InternationalEn })));
const InternationalAr = lazy(() => import("./pages/international").then((m) => ({ default: m.InternationalAr })));
const Review = lazy(() => import("./pages/review"));
const Kvkk = lazy(() => import("./pages/kvkk"));
const Faq = lazy(() => import("./pages/faq"));

const routeItem = (id, title, path, component) => ({ id, title, path, component });

const routes = {
  home: routeItem(1, "home", "/", Home),
  about: routeItem(2, "about", "/about", About),
  contact: routeItem(4, "contact", "/contact", Contact),
  gallery: routeItem(5, "gallery", "/gallery", Gallery),
  randevu: routeItem(6, "randevu", "/randevu", Idiopatik),
  hizmetler: routeItem(7, "hizmetlerimiz", "/hizmetlerimiz", Kifoz),
  details: routeItem(8, "detailsblog", "/details/:id", Details),
  serumlar: routeItem(9, "serumlar", "/serumlar", Serumlar),
  serumDetails: routeItem(10, "serumlardetails", "/serumlar/:id", SerumlarDetails),
  paketler: routeItem(11, "paketler", "/paketler", Packages),
  hizmet: routeItem(12, "hizmet", "/hizmet/:slug", ServicePage),
  serumTesti: routeItem(13, "serum-testi", "/serum-testi", SerumQuiz),
  belirti: routeItem(14, "belirti-rehberi", "/belirti-rehberi", Symptoms),
  bakim: routeItem(15, "bakim-rehberi", "/bakim-rehberi", CareGuideList),
  bakimDetay: routeItem(16, "bakim-rehberi-detay", "/bakim-rehberi/:slug", CareGuideDetail),
  aile: routeItem(17, "aileniz-icin", "/aileniz-icin", Family),
  kurumsal: routeItem(18, "kurumsal", "/kurumsal", Corporate),
  en: routeItem(19, "en", "/en", InternationalEn),
  ar: routeItem(20, "ar", "/ar", InternationalAr),
  degerlendirme: routeItem(21, "degerlendirme", "/degerlendirme", Review),
  kvkk: routeItem(22, "kvkk", "/kvkk", Kvkk),
  sss: routeItem(23, "sss", "/sss", Faq),
  notFound: routeItem(3, "notFound", "*", NotFound),
};

const routeArr = Object.values(routes);

export { routes, routeArr };
