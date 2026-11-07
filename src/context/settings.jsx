import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";

const KEY = "eternal-settings";
const defaults = { theme: "light", fontScale: 1, contrast: false, reduceMotion: false, bigMode: false };

const load = () => {
  try {
    // Light is the brand default; dark mode only when the visitor turns it on.
    return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return defaults;
  }
};

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(load);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.classList.toggle("a11y-contrast", settings.contrast);
    root.classList.toggle("a11y-big", settings.bigMode);
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
    root.style.fontSize = `${settings.fontScale * 100}%`;
    localStorage.setItem(KEY, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      update: (patch) => setSettings((s) => ({ ...s, ...patch })),
      reset: () => setSettings({ ...defaults }),
    }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {/* "user" follows the OS setting; the panel toggle forces it on */}
      <MotionConfig reducedMotion={settings.reduceMotion ? "always" : "user"}>{children}</MotionConfig>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
