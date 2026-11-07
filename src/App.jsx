import React, { Suspense, useEffect } from "react";
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
import Assistant from "./components/widgets/assistant";
import PageLoader from "./components/widgets/pageloader";
import { trackPageView } from "./utils/analytics";

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
        <BrowserRouter>
          <ScrollToTop>
            <AnimatedRoutes />
          </ScrollToTop>
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <a href="#main" className="skip-link">İçeriğe geç</a>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routeArr.map((item) => (
              <Route
                path={item.path}
                key={item.id}
                element={
                  <motion.main id="main" variants={pageVariants} initial="initial" animate="animate" exit="exit">
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
    </>
  );
}

export default App;
