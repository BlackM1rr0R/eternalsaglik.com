import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCommentMedical, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import w from "../../styles/widgets.module.css";
import { SITE, primaryPhone } from "../../config/site";
import { services } from "../../data/services";
import { serumList } from "../../data/serums";
import { articles } from "../../data/articles";
import { whatsappUrl } from "../../utils/whatsapp";
import { openEmergency } from "./emergency";

// Rule-based helper: answers common questions from the site's own data and hands off
// to WhatsApp / phone. It never gives a diagnosis.

const norm = (s) =>
  s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9\s+]/g, " ");

const has = (text, words) => words.some((w2) => text.includes(w2));

const answer = (raw) => {
  const t = norm(raw);

  if (has(t, ["bayil", "bilinc", "gogus agri", "nefes alam", "kalp kriz", "inme", "felc", "kanama durm", "zehirlen"])) {
    return {
      text: "Bu belirtiler acil olabilir. Lütfen hemen 112'yi arayın. Ardından bize de ulaşabilirsiniz.",
      links: [{ label: "112'yi Ara", href: "tel:112" }, { label: "Acil destek", action: openEmergency }],
    };
  }
  if (has(t, ["acil", "hemen gel", "simdi", "ivedi"])) {
    return { text: "Acil durumlar için 7/24 ulaşabilirsiniz. Konumunuzu WhatsApp'tan gönderebilirsiniz.", links: [{ label: "Acil destek", action: openEmergency }, { label: "Ara", href: `tel:${primaryPhone.tel}` }] };
  }
  if (has(t, ["fiyat", "ucret", "kac para", "ne kadar", "tutar", "price"])) {
    return {
      text: "Ücret, hizmetin türüne ve süresine göre belirlenir. Size uygun paketi WhatsApp'tan yazarsanız hemen bilgi verelim.",
      links: [{ label: "Paketler", to: "/paketler" }, { label: "WhatsApp'tan sor", href: whatsappUrl("Merhaba, fiyat bilgisi almak istiyorum.") }],
    };
  }
  if (has(t, ["randevu", "rezervasyon", "gelebilir mi", "ne zaman"])) {
    return { text: "Online randevu formunu 1 dakikada doldurabilirsiniz; talebiniz WhatsApp ile bize ulaşır.", links: [{ label: "Randevu al", to: "/randevu" }, { label: "Sizi arayalım", to: "/randevu#geri-arama" }] };
  }
  if (has(t, ["bolge", "nerede", "adres", "sehir", "sapanca", "kartepe", "duzce", "kocaeli", "istanbul", "sakarya"])) {
    return { text: `Hizmet bölgelerimiz: ${SITE.regions.join(", ")}. Merkezimiz: ${SITE.addressShort}. Sapanca ve Kartepe'deki otellere de geliyoruz.`, links: [{ label: "Hizmet bölgeleri", to: "/#bolgeler" }, { label: "İletişim", to: "/contact" }] };
  }
  if (has(t, ["saat", "acik mi", "kacta", "gece", "hafta sonu", "bayram"])) {
    return { text: `Çalışma saatlerimiz: ${SITE.hours}, tatil günleri dahil.`, links: [{ label: "Ara", href: `tel:${primaryPhone.tel}` }] };
  }
  if (has(t, ["anne", "baba", "yakinim", "ailem", "uzakta", "baska sehir", "dede", "nine", "babaanne", "anneanne"])) {
    return { text: "Başka şehirde olsanız bile yakınınız için randevu oluşturabilirsiniz. Ziyaret sonrası sizi bilgilendiriyoruz.", links: [{ label: "Aileniz için", to: "/aileniz-icin" }] };
  }
  if (has(t, ["recete", "doktor yazdi", "igne", "enjeksiyon"])) {
    return { text: "Reçetenizin fotoğrafını WhatsApp'tan göndermeniz yeterli; hemşiremiz evinize gelip uygulamayı yapar.", links: [{ label: "Reçete gönder", href: whatsappUrl("Merhaba, reçetemdeki iğne/serum uygulaması için randevu almak istiyorum. Reçete fotoğrafını ekliyorum.") }] };
  }
  if (has(t, ["otel", "hotel", "turist", "english", "arabic"])) {
    return { text: "Otelinize geliyoruz. İngilizce ve Arapça sayfalarımız da var.", links: [{ label: "English", to: "/en" }, { label: "العربية", to: "/ar" }] };
  }
  if (has(t, ["sirket", "kurumsal", "ofis", "fabrika", "calisan", "huzurevi"])) {
    return { text: "Şirketler, oteller ve huzurevleri için sözleşmeli sağlık hizmeti sunuyoruz.", links: [{ label: "Kurumsal", to: "/kurumsal" }] };
  }
  if (has(t, ["hangi serum", "serum test", "bana uygun", "quiz"])) {
    return { text: "3 kısa soruyla size uygun serumu önerelim.", links: [{ label: "Serum testi", to: "/serum-testi" }] };
  }

  const svc = services.find((s) => norm(`${s.title} ${s.keyword}`).split(" ").filter((x) => x.length > 4).some((x) => t.includes(x)));
  if (svc) return { text: `${svc.title}: ${svc.desc}`, links: [{ label: "Detaylar", to: `/hizmet/${svc.slug}` }, { label: "Randevu al", to: "/randevu" }] };

  const serum = serumList.find((s) => norm(s.info).split(" ").filter((x) => x.length > 3 && !["serum", "terapi"].includes(x)).some((x) => t.includes(x)));
  if (serum) return { text: `${serum.info} (${serum.category}): ${serum.desc}.`, links: [{ label: "Serum detayı", to: `/serumlar/${serum.id}` }] };

  const art = articles.find((a) => norm(a.text).split(" ").filter((x) => x.length > 4).some((x) => t.includes(x)));
  if (art) return { text: `Bu konuda bir yazımız var: "${art.text}".`, links: [{ label: "Yazıyı oku", to: `/details/${art.id}` }, { label: "Belirti rehberi", to: "/belirti-rehberi" }] };

  if (has(t, ["merhaba", "selam", "iyi gunler", "hello", "hi"])) {
    return { text: "Merhaba! Size nasıl yardımcı olabilirim? Hizmetler, randevu, bölgeler veya serumlar hakkında sorabilirsiniz." };
  }
  return {
    text: "Bu soruyu tam anlayamadım. Ekibimiz WhatsApp'ta hemen yardımcı olabilir.",
    links: [{ label: "WhatsApp'a yaz", href: whatsappUrl(`Merhaba, bir sorum var: ${raw}`) }, { label: "Belirti rehberi", to: "/belirti-rehberi" }],
  };
};

const QUICK = ["Randevu almak istiyorum", "Fiyatlar", "Hangi bölgelere geliyorsunuz?", "Annem için hizmet", "Hangi serum bana uygun?"];

const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Merhaba, ben Eternal Asistan. Hizmetler, randevu ve serumlar hakkında sorularınızı yanıtlayabilirim.\n\nNot: Tıbbi teşhis koymam; acil durumda 112'yi arayın." },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("eternal:chat", on);
    return () => window.removeEventListener("eternal:chat", on);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text) => {
    const q = text.trim();
    if (!q) return;
    setInput("");
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", ...answer(q) }]);
    }, 550);
  };

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" className={`${w.fab} ${w.fabChat}`} onClick={() => setOpen((o) => !o)}
        aria-label="Eternal Asistan" aria-expanded={open}>
        {open ? <FaTimes /> : <FaCommentMedical />}
        {!open && <span className={w.fabDot} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label="Eternal Asistan" className={`${w.sheet} ${w.sheetRight}`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            style={{ display: "flex", flexDirection: "column" }}>
            <div className={w.sheetHead}>
              <h3><FaRobot style={{ color: "var(--primary)" }} /> Eternal Asistan</h3>
              <button className={w.close} onClick={close} aria-label="Kapat"><FaTimes /></button>
            </div>
            <div className={w.chatBody} ref={bodyRef} aria-live="polite" style={{ flex: 1, overflowY: "auto" }}>
              {msgs.map((m, i) => (
                <div key={i} className={`${w.msg} ${m.from === "bot" ? w.msgBot : w.msgUser}`}>
                  {m.text}
                  {m.links && (
                    <div className={w.msgLinks}>
                      {m.links.map((l) =>
                        l.to ? <Link key={l.label} to={l.to} onClick={close}>{l.label}</Link>
                          : l.action ? <button key={l.label} type="button" onClick={() => { close(); l.action(); }}>{l.label}</button>
                            : <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{l.label}</a>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {typing && <div className={`${w.msg} ${w.msgBot}`}><span className={w.typing}><i /><i /><i /></span></div>}
            </div>
            {msgs.length < 3 && (
              <div className={w.quick}>
                {QUICK.map((q) => <button key={q} type="button" onClick={() => send(q)}>{q}</button>)}
              </div>
            )}
            <form className={w.chatInput} onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Sorunuzu yazın…" aria-label="Mesaj" />
              <button type="submit" aria-label="Gönder"><FaPaperPlane /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;
