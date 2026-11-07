import React, { useState, useEffect } from "react";
import { FaArrowUp } from "../../icons/modern";
import styles from "./index.module.css";
import { useT } from "../../i18n";
import common from "../../i18n/common";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const t = useT(common);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      className={styles.scrollTop}
      onClick={scrollToTop}
      aria-label={t("backToTop")}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
