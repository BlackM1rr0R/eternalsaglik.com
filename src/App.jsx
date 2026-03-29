import React from "react";
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

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop>
          <AnimatedRoutes />
        </ScrollToTop>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routeArr.map((item) => (
            <Route
              exact
              path={item.path}
              key={item.id}
              element={
                <motion.main
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <item.component />
                </motion.main>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

export default App;
