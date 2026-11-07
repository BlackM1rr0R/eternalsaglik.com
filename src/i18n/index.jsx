/* Site-wide language system (Turkish default, English, Arabic RTL).
 *
 * UI strings live next to the component that uses them:
 *     const dict = { tr: { hello: "Merhaba" }, en: { hello: "Hello" }, ar: { hello: "مرحبا" } };
 *     const t = useT(dict);  t("hello")  →  string in the active language (falls back to Turkish)
 *     t("greet", { name: "Ali" })  replaces {name} placeholders.
 *
 * Data files keep Turkish fields and ship translations keyed by id/slug:
 *     export const translations = { en: { "evde-doktor": { title: "..." } }, ar: { ... } };
 *     const items = useLocalized(services, translations, "slug");
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const LANGS = [
  { code: "tr", label: "Türkçe", short: "TR", dir: "ltr", locale: "tr-TR", speech: "tr-TR" },
  { code: "en", label: "English", short: "EN", dir: "ltr", locale: "en-GB", speech: "en-GB" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl", locale: "ar", speech: "ar-SA" },
];
const CODES = LANGS.map((l) => l.code);
const KEY = "eternal-lang";

const initialLang = () => {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (CODES.includes(q)) return q;
    const path = window.location.pathname.split("/")[1];
    if (path === "en" || path === "ar") return path;
    const saved = localStorage.getItem(KEY);
    if (CODES.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return "tr";
};

const LangContext = createContext({ lang: "tr", setLang: () => {}, meta: LANGS[0] });

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(initialLang);
  const meta = LANGS.find((l) => l.code === lang) || LANGS[0];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, meta.dir]);

  const setLang = useCallback((code) => CODES.includes(code) && setLangState(code), []);
  const value = useMemo(() => ({ lang, setLang, meta }), [lang, setLang, meta]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);

const fill = (s, vars) => (vars && typeof s === "string" ? s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`)) : s);

// Returns t(key, vars). Values can be strings, arrays or objects.
export const useT = (dict) => {
  const { lang } = useLang();
  return useCallback(
    (key, vars) => {
      const v = dict?.[lang]?.[key] ?? dict?.tr?.[key];
      return v === undefined ? key : fill(v, vars);
    },
    [dict, lang]
  );
};

// Merge translated fields onto Turkish base objects.
export const localize = (item, translations, lang, key) => {
  if (!item || lang === "tr" || !translations?.[lang]) return item;
  const tr = translations[lang][item[key]];
  return tr ? { ...item, ...tr } : item;
};

export const useLocalized = (list, translations, key = "id") => {
  const { lang } = useLang();
  return useMemo(() => list.map((it) => localize(it, translations, lang, key)), [list, translations, lang, key]);
};

export const useLocalizedItem = (item, translations, key = "id") => {
  const { lang } = useLang();
  return useMemo(() => localize(item, translations, lang, key), [item, translations, lang, key]);
};
