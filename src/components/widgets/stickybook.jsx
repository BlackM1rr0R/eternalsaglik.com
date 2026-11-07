import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ArrowRight, X, WhatsappLogo } from "@phosphor-icons/react";
import w from "../../styles/widgets.module.css";
import { useLang, useT, localize } from "../../i18n";
import * as S from "../../data/services";
import * as SR from "../../data/serums";
import { whatsappUrl } from "../../utils/whatsapp";

const dict = {
  tr: { for: "Bu hizmet için randevu alın", serum: "Bu serum için evde uygulama", pkg: "Size uygun paketi birlikte seçelim", family: "Yakınınız için ziyaret planlayın", book: "Randevu Al", wa: "WhatsApp", close: "Kapat", waMsg: "Merhaba, \"{x}\" hakkında bilgi almak istiyorum." },
  en: { for: "Book this service", serum: "Have this drip at home", pkg: "Let's pick the right package together", family: "Plan a visit for your relative", book: "Book Now", wa: "WhatsApp", close: "Close", waMsg: "Hello, I would like information about \"{x}\"." },
  ar: { for: "احجز هذه الخدمة", serum: "احصل على هذا المحلول في المنزل", pkg: "لنختر الباقة المناسبة معاً", family: "خطّط لزيارة قريبك", book: "احجز موعداً", wa: "واتساب", close: "إغلاق", waMsg: "مرحباً، أود معلومات عن \"{x}\"." },
};

// Resolve what the current page is about. `service` is the Turkish booking chip value.
const useContextItem = (pathname, lang, t) => {
  let m = pathname.match(/^\/hizmet\/([^/]+)/);
  if (m) {
    const s = S.services.find((x) => x.slug === m[1]);
    if (!s) return null;
    const L = localize(s, S.translations, lang, "slug");
    return { label: t("for"), title: L.title, service: s.title, Icon: s.icon };
  }
  m = pathname.match(/^\/serumlar\/(\d+)/);
  if (m) {
    const s = SR.serumList.find((x) => x.id === Number(m[1]));
    if (!s) return null;
    const L = localize(s, SR.listTranslations || SR.translations, lang, "id");
    return { label: t("serum"), title: L.info, service: "IV Serum Tedavisi", note: s.info };
  }
  if (pathname === "/paketler") return { label: t("pkg"), title: "", service: "" };
  if (pathname === "/aileniz-icin") return { label: t("family"), title: "", service: "Evde Doktor Hizmeti" };
  return null;
};

const StickyBook = () => {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const t = useT(dict);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const item = useContextItem(pathname, lang, t);

  useEffect(() => { setDismissed(false); setShow(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 40;
      setShow(window.scrollY > 520 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!item) return null;
  const Icon = item.Icon || CalendarCheck;
  const name = item.note || item.title;

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.aside className={w.sticky} aria-label={item.label}
          initial={{ y: 90, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}>
          <span className={w.stickyIcon}><Icon /></span>
          <span className={w.stickyText}>
            <small>{item.label}</small>
            {item.title && <strong>{item.title}</strong>}
          </span>
          {name && (
            <a className={w.stickyWa} href={whatsappUrl(t("waMsg", { x: name }))} target="_blank" rel="noopener noreferrer" aria-label={t("wa")}>
              <WhatsappLogo />
            </a>
          )}
          <Link to="/randevu" state={{ service: item.service }} className={w.stickyBtn}>
            {t("book")} <ArrowRight />
          </Link>
          <button type="button" className={w.stickyClose} onClick={() => setDismissed(true)} aria-label={t("close")}><X /></button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default StickyBook;
