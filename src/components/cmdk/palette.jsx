import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  MagnifyingGlass, ArrowRight, Stethoscope, Syringe, BookOpenText, Question, FirstAidKit, Package,
  CalendarCheck, Phone, WhatsappLogo, Moon, Sun, Translate, HouseLine, KeyReturn, ArrowsDownUp, Ambulance, Sparkle,
} from "@phosphor-icons/react";
import styles from "./index.module.css";
import { useLang, useT, localize, LANGS } from "../../i18n";
import common from "../../i18n/common";
import { useSettings } from "../../context/settings";
import { primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import * as S from "../../data/services";
import * as SR from "../../data/serums";
import * as A from "../../data/articles";
import * as F from "../../data/faq";
import * as G from "../../data/careguides";
import * as P from "../../data/packages";
import { openEmergency } from "../widgets/emergency";

const dict = {
  tr: {
    placeholder: "Hizmet, serum, yazı veya soru arayın…", empty: "Sonuç bulunamadı. Farklı bir kelime deneyin.",
    groups: { actions: "Hızlı işlemler", pages: "Sayfalar", services: "Hizmetler", serums: "Serumlar", packages: "Paketler", articles: "Yazılar", faq: "Sıkça sorulanlar", guides: "Bakım rehberleri" },
    book: "Online randevu al", call: "Hemen ara", wa: "WhatsApp'tan yaz", sos: "Acil destek", theme: "Temayı değiştir", lang: "Dil",
    hint: "gezin", open: "aç", close: "kapat", popular: "Popüler aramalar",
    chips: ["Evde serum", "Kan alma", "Yara bakımı", "Tansiyon", "Fiyat"],
  },
  en: {
    placeholder: "Search services, drips, articles or questions…", empty: "No results. Try another word.",
    groups: { actions: "Quick actions", pages: "Pages", services: "Services", serums: "IV drips", packages: "Packages", articles: "Articles", faq: "FAQ", guides: "Care guides" },
    book: "Book online", call: "Call now", wa: "Message on WhatsApp", sos: "Urgent help", theme: "Toggle theme", lang: "Language",
    hint: "navigate", open: "open", close: "close", popular: "Popular searches",
    chips: ["IV drip at home", "Blood test", "Wound care", "Blood pressure", "Price"],
  },
  ar: {
    placeholder: "ابحث عن خدمة أو محلول أو مقال أو سؤال…", empty: "لا توجد نتائج. جرّب كلمة أخرى.",
    groups: { actions: "إجراءات سريعة", pages: "الصفحات", services: "الخدمات", serums: "المحاليل", packages: "الباقات", articles: "المقالات", faq: "الأسئلة الشائعة", guides: "أدلة الرعاية" },
    book: "احجز عبر الإنترنت", call: "اتصل الآن", wa: "راسلنا على واتساب", sos: "مساعدة عاجلة", theme: "تبديل المظهر", lang: "اللغة",
    hint: "تنقّل", open: "فتح", close: "إغلاق", popular: "عمليات بحث شائعة",
    chips: ["محلول في المنزل", "تحليل دم", "العناية بالجروح", "ضغط الدم", "السعر"],
  },
};

// Lower-case, strip accents, map Turkish dotless i and Arabic letter variants.
const norm = (s = "") =>
  String(s)
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ًͯ-ٟ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");

const score = (q, title, extra) => {
  const t = norm(title);
  const e = norm(extra);
  if (!q) return 0;
  if (t.startsWith(q)) return 100;
  if (t.split(/\s+/).some((w) => w.startsWith(q))) return 80;
  if (t.includes(q)) return 60;
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => t.includes(w) || e.includes(w))) return 45;
  if (e.includes(q)) return 30;
  return 0;
};

const Palette = ({ open, onClose }) => {
  const { lang, setLang } = useLang();
  const t = useT(dict);
  const n = useT(common)("nav");
  const m = useT(common)("more");
  const { settings, update } = useSettings();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const index = useMemo(() => {
    const L = (item, tr, key) => localize(item, tr, lang, key);
    const items = [];
    const pages = [
      ["/", n.home], ["/hizmetlerimiz", n.services], ["/paketler", n.packages], ["/serumlar", n.serums], ["/about", n.about],
      ["/gallery", n.blog], ["/contact", n.contact], ["/aileniz-icin", m.family], ["/belirti-rehberi", m.symptoms],
      ["/serum-testi", m.quiz], ["/bakim-rehberi", m.guides], ["/kurumsal", m.corporate], ["/sss", m.faq],
    ];
    pages.forEach(([to, title]) => items.push({ g: "pages", title, to, Icon: HouseLine }));
    S.services.forEach((s) => {
      const x = L(s, S.translations, "slug");
      items.push({ g: "services", title: x.title, sub: x.desc, extra: `${s.title} ${s.keyword || ""} ${(x.includes || []).join(" ")}`, to: `/hizmet/${s.slug}`, Icon: Stethoscope });
    });
    SR.serumList.forEach((s) => {
      const x = L(s, SR.listTranslations || SR.translations, "id");
      const cat = SR.categoryLabel ? SR.categoryLabel(s.category, lang) : s.category;
      items.push({ g: "serums", title: x.info, sub: `${cat} · ${x.desc}`, extra: `${s.info} ${s.category}`, to: `/serumlar/${s.id}`, Icon: Syringe });
    });
    (P.packageGroups || []).forEach((grp) =>
      grp.items.forEach((it) => {
        const x = L(it, P.translations, "id");
        items.push({ g: "packages", title: x.name, sub: x.period, extra: `${it.name} ${(x.features || []).join(" ")}`, to: "/paketler", Icon: Package });
      })
    );
    A.articles.forEach((a) => {
      const x = L(a, A.translations, "id");
      items.push({ g: "articles", title: x.text, sub: x.textTwo, extra: `${a.text} ${x.headerText || ""}`, to: `/details/${a.id}`, Icon: BookOpenText });
    });
    F.faqs.forEach((f) => {
      const x = L(f, F.translations, "id");
      items.push({ g: "faq", title: x.q, sub: x.a, extra: f.q, to: "/sss", Icon: Question });
    });
    G.careGuides.forEach((gd) => {
      const x = L(gd, G.translations, "slug");
      items.push({ g: "guides", title: x.title, sub: x.summary, extra: gd.title, to: `/bakim-rehberi/${gd.slug}`, Icon: FirstAidKit });
    });
    return items;
  }, [lang, n, m]);

  const actions = useMemo(
    () => [
      { g: "actions", title: t("book"), to: "/randevu", Icon: CalendarCheck, accent: true },
      { g: "actions", title: t("call"), sub: primaryPhone.display, href: `tel:${primaryPhone.tel}`, Icon: Phone },
      { g: "actions", title: t("wa"), href: whatsappUrl(common[lang]?.waDefault), Icon: WhatsappLogo },
      { g: "actions", title: t("sos"), run: openEmergency, Icon: Ambulance },
      { g: "actions", title: t("theme"), run: () => update({ theme: settings.theme === "dark" ? "light" : "dark" }), Icon: settings.theme === "dark" ? Sun : Moon },
      ...LANGS.filter((l) => l.code !== lang).map((l) => ({ g: "actions", title: `${t("lang")}: ${l.label}`, run: () => setLang(l.code), Icon: Translate })),
    ],
    [t, lang, settings.theme, update, setLang]
  );

  const results = useMemo(() => {
    const query = norm(q.trim());
    if (!query) return [...actions, ...index.filter((i) => i.g === "services").slice(0, 5)];
    const hits = [...actions, ...index]
      .map((i) => ({ ...i, s: score(query, i.title, `${i.sub || ""} ${i.extra || ""}`) }))
      .filter((i) => i.s > 0)
      .sort((a, b) => b.s - a.s);
    // keep groups together, max 6 per group, groups ordered by their best hit
    const byGroup = {};
    hits.forEach((h) => { (byGroup[h.g] = byGroup[h.g] || []).length < 6 && byGroup[h.g].push(h); });
    return Object.values(byGroup).sort((a, b) => b[0].s - a[0].s).flat();
  }, [q, index, actions]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item) => {
    onClose();
    if (item.run) item.run();
    else if (item.href) window.open(item.href, item.href.startsWith("http") ? "_blank" : "_self", "noopener");
    else if (item.to) navigate(item.to);
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); run(results[active]); }
    else if (e.key === "Escape") { e.preventDefault(); onClose(); }
  };

  let lastGroup = null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className={styles.panel} role="dialog" aria-modal="true" aria-label={t("placeholder")}
            initial={{ opacity: 0, y: -24, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}>
            <div className={styles.searchRow}>
              <MagnifyingGlass className={styles.searchIcon} />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
                placeholder={t("placeholder")} aria-label={t("placeholder")} role="combobox"
                aria-expanded="true" aria-controls="cmdk-list" aria-activedescendant={`cmdk-${active}`} />
              <kbd className={styles.esc} onClick={onClose}>Esc</kbd>
            </div>

            {!q && (
              <div className={styles.chips}>
                <span><Sparkle /> {t("popular")}</span>
                {t("chips").map((c) => <button key={c} type="button" onClick={() => setQ(c)}>{c}</button>)}
              </div>
            )}

            <div className={styles.list} id="cmdk-list" role="listbox" ref={listRef}>
              {results.length === 0 && <p className={styles.empty}>{t("empty")}</p>}
              {results.map((r, i) => {
                const header = r.g !== lastGroup ? <div className={styles.group} key={`g-${r.g}-${i}`}>{t("groups")[r.g]}</div> : null;
                lastGroup = r.g;
                const Icon = r.Icon;
                return (
                  <React.Fragment key={`${r.g}-${r.title}-${i}`}>
                    {header}
                    <button type="button" id={`cmdk-${i}`} data-i={i} role="option" aria-selected={i === active}
                      className={`${styles.item} ${i === active ? styles.itemActive : ""} ${r.accent ? styles.itemAccent : ""}`}
                      onMouseMove={() => setActive(i)} onClick={() => run(r)}>
                      {i === active && <motion.span layoutId="cmdk-hl" className={styles.hl} transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                      <span className={styles.icon}><Icon /></span>
                      <span className={styles.text}>
                        <strong>{r.title}</strong>
                        {r.sub && <small>{r.sub}</small>}
                      </span>
                      <ArrowRight className={styles.go} />
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className={styles.foot}>
              <span><kbd><ArrowsDownUp /></kbd> {t("hint")}</span>
              <span><kbd><KeyReturn /></kbd> {t("open")}</span>
              <span><kbd>Esc</kbd> {t("close")}</span>
              <span className={styles.brand}>ETERNAL</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Palette;
