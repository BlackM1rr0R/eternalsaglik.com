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

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
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
