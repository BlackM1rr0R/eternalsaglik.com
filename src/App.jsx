import React, { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { routeArr } from "./routes";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import WhatsAppButton from "./components/whatsapp";
import ScrollToTopButton from "./components/scrolltopbutton";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/scrolltop";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "./context/settings";
import MobileBar from "./components/widgets/mobilebar";
import EmergencySheet from "./components/widgets/emergency";
import A11yPanel from "./components/widgets/a11ypanel";
import ConsentBanner from "./components/widgets/consent";
import Assistant from "./components/widgets/assistantlauncher";
import PageLoader from "./components/widgets/pageloader";
import Toaster from "./components/toast";
import Cursor from "./components/widgets/cursor";
import CommandPalette from "./components/cmdk";
import { trackPageView } from "./utils/analytics";
import { IconContext } from "@phosphor-icons/react";
import { LanguageProvider, useT } from "./i18n";
import common from "./i18n/common";

// Contextual booking bar: only on detail pages, loaded lazily (it needs service/serum data).
const StickyBook = lazy(() => import("./components/widgets/stickybook"));
const STICKY_ROUTES = /^\/(hizmet\/|serumlar\/\d|paketler$|aileniz-icin$)/;

const ICONS = { weight: "duotone", size: "1em", mirrored: false };

// Soft page transition: content rises and un-blurs in, fades and blurs out.
const pageVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, transitionEnd: { filter: "none" } },
  exit: { opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <LanguageProvider>
          <IconContext.Provider value={ICONS}>
            <BrowserRouter>
              <ScrollToTop>
                <AnimatedRoutes />
              </ScrollToTop>
            </BrowserRouter>
          </IconContext.Provider>
        </LanguageProvider>
      </SettingsProvider>
    </HelmetProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  // While a shared-element morph runs the incoming page skips its entry animation (utils/viewtransition.js)
  const [morphing, setMorphing] = useState(false);
  useEffect(() => {
    const on = () => setMorphing(true);
    const off = () => setMorphing(false);
    window.addEventListener("eternal:morph-start", on);
    window.addEventListener("eternal:morph-end", off);
    return () => {
      window.removeEventListener("eternal:morph-start", on);
      window.removeEventListener("eternal:morph-end", off);
    };
  }, []);
  const t = useT(common);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <a href="#main" className="skip-link">{t("skip")}</a>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routeArr.map((item) => (
              <Route
                path={item.path}
                key={item.id}
                element={
                  <motion.main id="main" variants={pageVariants} initial={morphing ? false : "initial"} animate="animate" exit="exit">
                    <item.component />
                  </motion.main>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <Assistant />
      <A11yPanel />
      <MobileBar />
      <EmergencySheet />
      <ConsentBanner />
      <Toaster />
      <Cursor />
      <CommandPalette />
      {STICKY_ROUTES.test(location.pathname) && (
        <Suspense fallback={null}>
          <StickyBook />
        </Suspense>
      )}
    </>
  );
}

export default App;
