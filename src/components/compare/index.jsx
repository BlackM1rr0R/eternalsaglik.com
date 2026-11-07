/* Side-by-side comparison for catalogue cards (serums, packages).
 *
 *   const cmp = useCompare("serum", validIds);            // selection, persisted in sessionStorage per type
 *   <CompareToggle checked={cmp.has(id)} onToggle={() => cmp.toggle(id)} name={title} />
 *   <CompareBar columns={[{ id, title, subtitle, waText, cells: { rowKey: string | string[] } }]}
 *               rows={[{ key, label }]} onRemove={cmp.remove} onClear={cmp.clear} heading="..." />
 *
 * CompareBar renders the floating tray and the comparison dialog (CompareDrawer). No prices are shown.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Scales, X, Trash, WhatsappLogo, Check, Plus, Info } from "@phosphor-icons/react";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT } from "../../i18n";
import { toast } from "../toast";
import styles from "./index.module.css";

export const COMPARE_MAX = 3;

const dict = {
  tr: {
    toggle: "Karşılaştır",
    toggleAria: "{name} öğesini karşılaştırmaya ekle",
    tray: "Karşılaştırma listesi",
    count: "{n}/{max} seçildi",
    open: "Karşılaştır",
    clear: "Temizle",
    remove: "{name} öğesini kaldır",
    close: "Kapat",
    heading: "Karşılaştırma",
    need2: "Karşılaştırmak için en az 2 seçim yapın.",
    addMore: "Bir seçim daha ekleyin",
    maxTitle: "Liste dolu",
    maxText: "En fazla {max} öğe karşılaştırabilirsiniz. Yenisini eklemek için birini kaldırın.",
    wa: "WhatsApp ile bilgi al",
    rowHead: "Özellik",
    empty: "—",
    note: "Bilgiler genel niteliktedir; size uygun seçeneğe ön değerlendirmede birlikte karar verilir. Fiyat bilgisi WhatsApp'tan iletilir.",
  },
  en: {
    toggle: "Compare",
    toggleAria: "Add {name} to comparison",
    tray: "Comparison list",
    count: "{n}/{max} selected",
    open: "Compare",
    clear: "Clear",
    remove: "Remove {name}",
    close: "Close",
    heading: "Comparison",
    need2: "Select at least 2 items to compare.",
    addMore: "Add one more",
    maxTitle: "List is full",
    maxText: "You can compare up to {max} items. Remove one to add another.",
    wa: "Ask on WhatsApp",
    rowHead: "Feature",
    empty: "—",
    note: "This information is general; the right option for you is decided together at the pre-assessment. Pricing is shared on WhatsApp.",
  },
  ar: {
    toggle: "قارن",
    toggleAria: "أضف {name} إلى المقارنة",
    tray: "قائمة المقارنة",
    count: "تم اختيار {n} من {max}",
    open: "قارن",
    clear: "مسح",
    remove: "إزالة {name}",
    close: "إغلاق",
    heading: "المقارنة",
    need2: "اختر عنصرين على الأقل للمقارنة.",
    addMore: "أضف عنصرًا آخر",
    maxTitle: "القائمة ممتلئة",
    maxText: "يمكنك مقارنة {max} عناصر كحد أقصى. أزل عنصرًا لإضافة آخر.",
    wa: "استفسر عبر واتساب",
    rowHead: "الميزة",
    empty: "—",
    note: "هذه المعلومات عامة، ويُتَّفق معك على الخيار المناسب خلال التقييم المسبق. تُرسل معلومات السعر عبر واتساب.",
  },
};

const storageKey = (type) => `eternal-compare:${type}`;

const readStored = (type) => {
  try {
    const v = JSON.parse(sessionStorage.getItem(storageKey(type)) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

/* ---------------------------------------------------------------- state hook */

export const useCompare = (type, validIds) => {
  const t = useT(dict);
  const valid = useMemo(() => (validIds ? new Set(validIds.map(String)) : null), [validIds]);
  const [ids, setIds] = useState(() => {
    const stored = readStored(type).map(String);
    return (valid ? stored.filter((x) => valid.has(x)) : stored).slice(0, COMPARE_MAX);
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey(type), JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [type, ids]);

  const has = useCallback((id) => ids.includes(String(id)), [ids]);
  const remove = useCallback((id) => setIds((l) => l.filter((x) => x !== String(id))), []);
  const clear = useCallback(() => setIds([]), []);
  const toggle = useCallback(
    (id) => {
      const k = String(id);
      if (ids.includes(k)) return setIds((l) => l.filter((x) => x !== k));
      if (ids.length >= COMPARE_MAX) {
        toast({ type: "info", title: t("maxTitle"), text: t("maxText", { max: COMPARE_MAX }), duration: 4000 });
        return undefined;
      }
      return setIds((l) => (l.includes(k) ? l : [...l, k]));
    },
    [ids, t]
  );

  return { ids, has, toggle, remove, clear, full: ids.length >= COMPARE_MAX };
};

/* ---------------------------------------------------------------- card toggle */

export const CompareToggle = ({ checked, onToggle, name, full = false, className = "" }) => {
  const t = useT(dict);
  return (
    <label className={`${styles.toggle} ${checked ? styles.toggleOn : ""} ${full && !checked ? styles.toggleFull : ""} ${className}`}>
      <input type="checkbox" checked={checked} onChange={onToggle} aria-label={t("toggleAria", { name })} />
      <span className={styles.toggleBox} aria-hidden="true">
        <AnimatePresence initial={false} mode="wait">
          {checked ? (
            <motion.span key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.toggleIco}>
              <Check weight="bold" />
            </motion.span>
          ) : (
            <motion.span key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.toggleIco}>
              <Plus weight="bold" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>{t("toggle")}</span>
    </label>
  );
};

/* ---------------------------------------------------------------- dialog */

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

const Cell = ({ value, empty }) => {
  if (Array.isArray(value)) {
    if (!value.length) return <span className={styles.muted}>{empty}</span>;
    return <ul className={styles.cellList}>{value.map((v) => <li key={v}><Check weight="bold" aria-hidden="true" /> {v}</li>)}</ul>;
  }
  return value ? <span>{value}</span> : <span className={styles.muted}>{empty}</span>;
};

export const CompareDrawer = ({ open, onClose, columns, rows, onRemove, heading }) => {
  const t = useT(dict);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (prev && typeof prev.focus === "function" && document.contains(prev)) prev.focus();
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={styles.layer} key="cmp">
          <motion.div className={styles.backdrop} onClick={onClose} aria-hidden="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cmp-title"
            className={styles.panel}
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
          >
            <span className={styles.grabber} aria-hidden="true" />
            <div className={styles.panelHead}>
              <h2 id="cmp-title"><Scales aria-hidden="true" /> {heading || t("heading")}</h2>
              <button ref={closeRef} type="button" className={styles.iconBtn} onClick={onClose} aria-label={t("close")}>
                <X weight="bold" />
              </button>
            </div>
            <div className={styles.tableWrap} tabIndex={0} role="region" aria-labelledby="cmp-title">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.rowHead}><span className={styles.srOnly}>{t("rowHead")}</span></th>
                    {columns.map((c, i) => (
                      <motion.th scope="col" key={c.id} className={styles.colHead}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
                        <div className={styles.colHeadInner}>
                          <div>
                            {c.subtitle && <span className={styles.colSub}>{c.subtitle}</span>}
                            <strong>{c.title}</strong>
                          </div>
                          <button type="button" className={styles.iconBtnSm} onClick={() => onRemove(c.id)} aria-label={t("remove", { name: c.title })}>
                            <X weight="bold" />
                          </button>
                        </div>
                      </motion.th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.key}>
                      <th scope="row" className={styles.rowHead}>{r.label}</th>
                      {columns.map((c) => (
                        <td key={c.id}><Cell value={c.cells[r.key]} empty={t("empty")} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" className={styles.rowHead}><span className={styles.srOnly}>WhatsApp</span></th>
                    {columns.map((c) => (
                      <td key={c.id}>
                        <a className={styles.waBtn} href={whatsappUrl(c.waText)} target="_blank" rel="noopener noreferrer">
                          <WhatsappLogo weight="fill" aria-hidden="true" /> {t("wa")}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className={styles.note}><Info aria-hidden="true" /> {t("note")}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

/* ---------------------------------------------------------------- floating tray */

export const CompareBar = ({ columns, rows, onRemove, onClear, heading }) => {
  const t = useT(dict);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const n = columns.length;

  useEffect(() => {
    if (n === 0) setOpen(false);
  }, [n]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <AnimatePresence>
        {n > 0 && (
          <motion.aside
            className={styles.tray}
            aria-label={t("tray")}
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className={styles.trayTop}>
              <span className={styles.trayCount} aria-live="polite"><Scales aria-hidden="true" /> {t("count", { n, max: COMPARE_MAX })}</span>
              <button type="button" className={styles.linkBtn} onClick={onClear}><Trash aria-hidden="true" /> {t("clear")}</button>
            </div>
            <ul className={styles.trayList}>
              <AnimatePresence initial={false}>
                {columns.map((c) => (
                  <motion.li key={c.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                    <span className={styles.trayName}>{c.title}</span>
                    <button type="button" className={styles.iconBtnSm} onClick={() => onRemove(c.id)} aria-label={t("remove", { name: c.title })}>
                      <X weight="bold" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
              {n < 2 && <li className={styles.traySlot} aria-hidden="true"><Plus /> {t("addMore")}</li>}
            </ul>
            <button type="button" className={styles.openBtn} onClick={() => setOpen(true)} disabled={n < 2}
              aria-describedby={n < 2 ? "cmp-need2" : undefined}>
              <Scales weight="bold" aria-hidden="true" /> {t("open")}
            </button>
            {n < 2 && <span id="cmp-need2" className={styles.srOnly}>{t("need2")}</span>}
          </motion.aside>
        )}
      </AnimatePresence>
      <CompareDrawer open={open && n > 0} onClose={close} columns={columns} rows={rows} onRemove={onRemove} heading={heading} />
    </>,
    document.body
  );
};

export default CompareBar;
