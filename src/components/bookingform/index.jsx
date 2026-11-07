import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, WhatsappLogo, CheckCircle, FileText, MapPin, Info, Stethoscope, CalendarDots, UserCircle, Check,
} from "@phosphor-icons/react";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import * as S from "../../data/services";
import { SITE } from "../../config/site";
import { buildMessage, isValidPhone, openWhatsApp } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";
import { localize, useLang, useT } from "../../i18n";

const serviceTr = S.translations || {};
const serviceList = S.services || [];

const dict = {
  tr: {
    steps: ["Hizmet", "Zaman & Adres", "İletişim"],
    stepOf: "Adım {n} / 3",
    q0: "Hangi hizmete ihtiyacınız var?",
    service: "Hizmet",
    forWho: "Kimin için?",
    q1: "Ne zaman ve nereye gelelim?",
    date: "Tarih",
    district: "Bölge",
    slot: "Uygun saat aralığı",
    slotAria: "Saat",
    address: "Adres",
    addressPh: "Mahalle, sokak, bina no / otel adı ve oda no",
    q2: "İletişim bilgileri",
    name: "Ad Soyad",
    phone: "Telefon",
    note: "Not (isteğe bağlı)",
    notePh: "Şikayet, kullanılan ilaçlar, kat / asansör bilgisi…",
    prescription: "Doktorun yazdığı reçete / tedavi var (fotoğrafını WhatsApp'ta ekleyeceğim)",
    kvkk: "Bilgilerimin randevu amacıyla işlenmesini kabul ediyorum.",
    kvkkLink: "KVKK Aydınlatma Metni",
    info: "Gönder'e bastığınızda bilgileriniz WhatsApp mesajı olarak hazırlanır; mesajı siz gönderirsiniz.",
    summary: "Talep özeti",
    back: "Geri",
    next: "Devam",
    submit: "Randevu Talebini Gönder",
    errService: "Lütfen bir hizmet seçin.",
    errDate: "Tarih seçin.",
    errAddress: "Lütfen açık adres veya mahalle yazın.",
    errName: "Adınızı yazın.",
    errPhone: "Geçerli bir telefon numarası yazın.",
    errKvkk: "Devam etmek için onay gereklidir.",
    doneTitle: "Talebiniz hazır!",
    doneA: "WhatsApp açıldı. Mesajı",
    doneSend: "gönder",
    doneB: "tuşuna basmanız yeterli.",
    donePresc: " Reçetenizin fotoğrafını da aynı sohbete ekleyin.",
    doneC: " Ekibimiz randevunuzu onaylamak için size dönecek.",
    newReq: "Yeni talep",
    home: "Ana sayfa",
  },
  en: {
    steps: ["Service", "Time & address", "Contact"],
    stepOf: "Step {n} of 3",
    q0: "Which service do you need?",
    service: "Service",
    forWho: "Who is it for?",
    q1: "When and where should we come?",
    date: "Date",
    district: "Area",
    slot: "Preferred time window",
    slotAria: "Time",
    address: "Address",
    addressPh: "Neighbourhood, street, building no. / hotel name and room no.",
    q2: "Contact details",
    name: "Full name",
    phone: "Phone",
    note: "Note (optional)",
    notePh: "Symptoms, current medicines, floor / lift information…",
    prescription: "I have a prescription / treatment from a doctor (I will add a photo on WhatsApp)",
    kvkk: "I agree to my details being processed for this appointment.",
    kvkkLink: "KVKK Privacy Notice",
    info: "When you press Send, your details are prepared as a WhatsApp message; you send the message yourself.",
    summary: "Request summary",
    back: "Back",
    next: "Continue",
    submit: "Send Booking Request",
    errService: "Please choose a service.",
    errDate: "Please choose a date.",
    errAddress: "Please enter your full address or neighbourhood.",
    errName: "Please enter your name.",
    errPhone: "Please enter a valid phone number.",
    errKvkk: "Your consent is needed to continue.",
    doneTitle: "Your request is ready!",
    doneA: "WhatsApp has opened. Just press",
    doneSend: "send",
    doneB: "on the message.",
    donePresc: " Please add a photo of your prescription to the same chat.",
    doneC: " Our team will get back to you to confirm your appointment.",
    newReq: "New request",
    home: "Home page",
  },
  ar: {
    steps: ["الخدمة", "الوقت والعنوان", "التواصل"],
    stepOf: "الخطوة {n} من 3",
    q0: "ما الخدمة التي تحتاجها؟",
    service: "الخدمة",
    forWho: "لمن الخدمة؟",
    q1: "متى وإلى أين نأتي؟",
    date: "التاريخ",
    district: "المنطقة",
    slot: "الفترة الزمنية المناسبة",
    slotAria: "الوقت",
    address: "العنوان",
    addressPh: "الحي، الشارع، رقم المبنى / اسم الفندق ورقم الغرفة",
    q2: "بيانات التواصل",
    name: "الاسم الكامل",
    phone: "الهاتف",
    note: "ملاحظة (اختياري)",
    notePh: "الشكوى، الأدوية المستخدمة، الطابق / وجود مصعد…",
    prescription: "لدي وصفة / علاج من الطبيب (سأضيف صورتها في واتساب)",
    kvkk: "أوافق على معالجة بياناتي لغرض الموعد.",
    kvkkLink: "نص الإفصاح وفق KVKK",
    info: "عند الضغط على إرسال تُجهَّز بياناتك كرسالة واتساب، وأنت من يرسل الرسالة.",
    summary: "ملخص الطلب",
    back: "رجوع",
    next: "متابعة",
    submit: "أرسل طلب الموعد",
    errService: "يرجى اختيار خدمة.",
    errDate: "يرجى اختيار التاريخ.",
    errAddress: "يرجى كتابة العنوان الكامل أو اسم الحي.",
    errName: "يرجى كتابة اسمك.",
    errPhone: "يرجى كتابة رقم هاتف صحيح.",
    errKvkk: "الموافقة مطلوبة للمتابعة.",
    doneTitle: "طلبك جاهز!",
    doneA: "تم فتح واتساب. يكفي أن تضغط على زر",
    doneSend: "الإرسال",
    doneB: "في الرسالة.",
    donePresc: " أضف صورة الوصفة الطبية إلى المحادثة نفسها.",
    doneC: " سيتواصل معك فريقنا لتأكيد موعدك.",
    newReq: "طلب جديد",
    home: "الصفحة الرئيسية",
  },
};

// Extra service choices (Turkish value is what the clinic receives).
const EXTRA_SERVICES = [
  { key: "serum-recete", tr: "Serum uygulaması (reçeteli)", en: "IV drip (prescribed)", ar: "محلول وريدي (بوصفة طبية)" },
  { key: "diger", tr: "Diğer / Emin değilim", en: "Other / Not sure", ar: "أخرى / لست متأكداً" },
];
const FOR_WHO = [
  { tr: "Kendim", en: "Myself", ar: "لنفسي" },
  { tr: "Annem / Babam", en: "My mother / father", ar: "والدتي / والدي" },
  { tr: "Eşim", en: "My spouse", ar: "زوجي / زوجتي" },
  { tr: "Çocuğum", en: "My child", ar: "طفلي" },
  { tr: "Diğer yakınım", en: "Another relative", ar: "قريب آخر" },
];
const SLOTS = [
  { tr: "08:00 – 10:00" }, { tr: "10:00 – 12:00" }, { tr: "12:00 – 14:00" }, { tr: "14:00 – 17:00" }, { tr: "17:00 – 20:00" },
  { tr: "20:00 sonrası", en: "After 20:00", ar: "بعد 20:00" },
];
const DISTRICT_NAMES = {
  en: { İstanbul: "Istanbul", "Sapanca / Kartepe (otel)": "Sapanca / Kartepe (hotel)", Diğer: "Other" },
  ar: { Sakarya: "سكاريا", Düzce: "دوزجه", Kocaeli: "كوجالي", İstanbul: "إسطنبول", "Sapanca / Kartepe (otel)": "سبانجا / كارتبه (فندق)", Diğer: "أخرى" },
};
const DISTRICTS = [...SITE.regions, "Sapanca / Kartepe (otel)", "Diğer"];
const LANG_NAME = { en: "English", ar: "العربية (Arapça)" };
// Message labels for the clinic stay Turkish; other languages get a bilingual label.
const MSG_LABELS = {
  en: { Hizmet: "Service", "Kimin için": "For", Tarih: "Date", Saat: "Time", Bölge: "Area", Adres: "Address", "Ad Soyad": "Name", Telefon: "Phone", Not: "Note", Reçete: "Prescription", Dil: "Language" },
  ar: { Hizmet: "الخدمة", "Kimin için": "لمن", Tarih: "التاريخ", Saat: "الوقت", Bölge: "المنطقة", Adres: "العنوان", "Ad Soyad": "الاسم", Telefon: "الهاتف", Not: "ملاحظة", Reçete: "الوصفة", Dil: "اللغة" },
};

// Local date (not UTC) so the minimum date is correct after midnight in Turkey.
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const fmtDate = (iso, locale) => {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
};
const pick = (o, lang) => o[lang] || o.tr;

// Three-step booking wizard. There is no booking backend, so the result is a
// pre-filled WhatsApp message to the clinic (works on every phone, no server needed).
const BookingForm = ({ defaultService = "" }) => {
  const t = useT(dict);
  const { lang, meta } = useLang();
  const rtl = meta.dir === "rtl";

  // { key, tr (value sent to the clinic), label (shown) }
  const serviceOptions = useMemo(
    () => [
      ...serviceList.map((s) => ({ key: s.slug, tr: s.title, label: localize(s, serviceTr, lang, "slug").title })),
      ...EXTRA_SERVICES.map((e) => ({ key: e.key, tr: e.tr, label: pick(e, lang) })),
    ],
    [lang]
  );

  // The default may be a slug, a Turkish title or a translated title.
  const initialService = () => {
    if (!defaultService) return "";
    const all = [
      ...serviceList.map((s) => ({ key: s.slug, names: [s.slug, s.title, serviceTr.en?.[s.slug]?.title, serviceTr.ar?.[s.slug]?.title] })),
      ...EXTRA_SERVICES.map((e) => ({ key: e.key, names: [e.key, e.tr, e.en, e.ar] })),
    ];
    return all.find((o) => o.names.includes(defaultService))?.key || "";
  };

  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => ({
    service: initialService(), forWho: 0, date: today(), slot: 1,
    district: DISTRICTS[0], address: "", name: "", phone: "", note: "", prescription: false, kvkk: false,
  }));
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const svc = serviceOptions.find((o) => o.key === data.service);
  const districtLabel = (d) => DISTRICT_NAMES[lang]?.[d] || d;

  const validate = (s) => {
    const e = {};
    if (s === 0 && !data.service) e.service = t("errService");
    if (s === 1) {
      if (!data.date) e.date = t("errDate");
      if (data.address.trim().length < 5) e.address = t("errAddress");
    }
    if (s === 2) {
      if (!data.name.trim()) e.name = t("errName");
      if (!isValidPhone(data.phone)) e.phone = t("errPhone");
      if (!data.kvkk) e.kvkk = t("errKvkk");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = (e) => {
    e.preventDefault();
    if (!validate(2)) return;
    const dual = (trVal, local) => (lang !== "tr" && local && local !== trVal ? `${trVal} (${local})` : trVal);
    const who = FOR_WHO[data.forWho];
    const slot = SLOTS[data.slot];
    const fields = {
      Hizmet: dual(svc?.tr, svc?.label),
      "Kimin için": dual(who.tr, pick(who, lang)),
      Tarih: dual(fmtDate(data.date, "tr-TR"), fmtDate(data.date, meta.locale)),
      Saat: dual(slot.tr, pick(slot, lang)),
      Bölge: dual(data.district, districtLabel(data.district)),
      Adres: data.address,
      "Ad Soyad": data.name,
      Telefon: data.phone,
      Not: data.note,
      Reçete: data.prescription ? "Var (fotoğrafı bu mesaja ekleyeceğim)" : "",
    };
    if (lang !== "tr") fields.Dil = LANG_NAME[lang];
    const labels = MSG_LABELS[lang];
    const msgFields = labels
      ? Object.fromEntries(Object.entries(fields).map(([k, v]) => [`${k} / ${labels[k] || k}`, v]))
      : fields;
    openWhatsApp(buildMessage(lang === "tr" ? "Online Randevu Talebi" : "Online Randevu Talebi / Online booking request", msgFields));
    trackEvent("generate_lead", { form: "booking", service: svc?.tr });
    setDone(true);
  };

  const flip = rtl ? { transform: "scaleX(-1)" } : undefined;

  if (done) {
    return (
      <motion.div className={`${ui.card} ${ui.center}`} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
          <CheckCircle weight="duotone" style={{ fontSize: 64, color: "var(--primary)" }} />
        </motion.div>
        <h3>{t("doneTitle")}</h3>
        <p>
          {t("doneA")} <strong>{t("doneSend")}</strong> {t("doneB")}
          {data.prescription && t("donePresc")}{t("doneC")}
        </p>
        <div className={ui.btnRow}>
          <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => { setDone(false); setStep(0); }}>
            {t("newReq")}
          </button>
          <Link to="/" className={`${ui.btn} ${ui.btnPrimary}`}>{t("home")}</Link>
        </div>
      </motion.div>
    );
  }

  const Err = ({ k }) => (errors[k] ? <span className={ui.error} role="alert">{errors[k]}</span> : null);
  const STEP_ICONS = [Stethoscope, CalendarDots, UserCircle];
  const slide = rtl ? -30 : 30;

  return (
    <form className={`${ui.card} ${ui.glass}`} onSubmit={submit} noValidate>
      <ol className={styles.stepper} aria-label={t("stepOf", { n: step + 1 })}>
        {t("steps").map((label, i) => {
          const Ico = STEP_ICONS[i];
          const state = i < step ? styles.done : i === step ? styles.current : "";
          return (
            <li key={label} className={`${styles.stepItem} ${state}`} aria-current={i === step ? "step" : undefined}>
              <span className={styles.stepDot}>
                {i < step ? <Check weight="bold" aria-hidden="true" /> : <Ico aria-hidden="true" />}
              </span>
              <span className={styles.stepLabel}>{label}</span>
            </li>
          );
        })}
      </ol>
      <div className={styles.track} aria-hidden="true">
        <motion.span className={styles.fill} initial={false} animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 22 }} />
      </div>
      <p className={ui.hint} style={{ margin: "10px 0" }}>{t("stepOf", { n: step + 1 })}</p>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: slide }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -slide }} transition={{ duration: 0.25 }} className={ui.form}>
          {step === 0 && (
            <>
              <h3 style={{ margin: 0 }}>{t("q0")}</h3>
              <div className={ui.chips} role="radiogroup" aria-label={t("service")}>
                {serviceOptions.map((o) => (
                  <button type="button" key={o.key} role="radio" aria-checked={data.service === o.key}
                    className={`${ui.chip} ${data.service === o.key ? ui.chipActive : ""}`} onClick={() => set("service", o.key)}>
                    {o.label}
                  </button>
                ))}
              </div>
              <Err k="service" />
              <span className={ui.label}>{t("forWho")}</span>
              <div className={ui.chips} role="radiogroup" aria-label={t("forWho")}>
                {FOR_WHO.map((w, i) => (
                  <button type="button" key={w.tr} role="radio" aria-checked={data.forWho === i}
                    className={`${ui.chip} ${data.forWho === i ? ui.chipActive : ""}`} onClick={() => set("forWho", i)}>
                    {pick(w, lang)}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 style={{ margin: 0 }}>{t("q1")}</h3>
              <div className={ui.row}>
                <div className={ui.field}>
                  <label htmlFor="bk-date">{t("date")}</label>
                  <input id="bk-date" type="date" min={today()} value={data.date} onChange={(e) => set("date", e.target.value)} />
                  {data.date && <span className={styles.datePreview}><CalendarDots aria-hidden="true" /> {fmtDate(data.date, meta.locale)}</span>}
                  <Err k="date" />
                </div>
                <div className={ui.field}>
                  <label htmlFor="bk-district">{t("district")}</label>
                  <select id="bk-district" value={data.district} onChange={(e) => set("district", e.target.value)}>
                    {DISTRICTS.map((r) => <option key={r} value={r}>{districtLabel(r)}</option>)}
                  </select>
                </div>
              </div>
              <span className={ui.label}>{t("slot")}</span>
              <div className={ui.chips} role="radiogroup" aria-label={t("slotAria")}>
                {SLOTS.map((s, i) => (
                  <button type="button" key={s.tr} role="radio" aria-checked={data.slot === i} dir="ltr"
                    className={`${ui.chip} ${data.slot === i ? ui.chipActive : ""}`} onClick={() => set("slot", i)}>
                    {pick(s, lang)}
                  </button>
                ))}
              </div>
              <div className={ui.field}>
                <label htmlFor="bk-address"><MapPin aria-hidden="true" /> {t("address")}</label>
                <textarea id="bk-address" value={data.address} onChange={(e) => set("address", e.target.value)} placeholder={t("addressPh")} style={{ minHeight: 80 }} />
                <Err k="address" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ margin: 0 }}>{t("q2")}</h3>
              <div className={ui.row}>
                <div className={ui.field}>
                  <label htmlFor="bk-name">{t("name")}</label>
                  <input id="bk-name" value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                  <Err k="name" />
                </div>
                <div className={ui.field}>
                  <label htmlFor="bk-phone">{t("phone")}</label>
                  <input id="bk-phone" value={data.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" dir="ltr" />
                  <Err k="phone" />
                </div>
              </div>
              <div className={ui.field}>
                <label htmlFor="bk-note">{t("note")}</label>
                <textarea id="bk-note" value={data.note} onChange={(e) => set("note", e.target.value)} placeholder={t("notePh")} />
              </div>
              <label className={ui.checkbox}>
                <input type="checkbox" checked={data.prescription} onChange={(e) => set("prescription", e.target.checked)} />
                <span><FileText aria-hidden="true" /> {t("prescription")}</span>
              </label>
              <label className={ui.checkbox}>
                <input type="checkbox" checked={data.kvkk} onChange={(e) => set("kvkk", e.target.checked)} />
                <span>
                  {t("kvkk")} <Link to="/kvkk" target="_blank">{t("kvkkLink")}</Link>
                </span>
              </label>
              <Err k="kvkk" />
              <div className={styles.summary}>
                <strong>{t("summary")}</strong>
                <dl>
                  <dt>{t("service")}</dt><dd>{svc?.label}</dd>
                  <dt>{t("forWho")}</dt><dd>{pick(FOR_WHO[data.forWho], lang)}</dd>
                  <dt>{t("date")}</dt><dd>{fmtDate(data.date, meta.locale)} · <span dir="ltr">{pick(SLOTS[data.slot], lang)}</span></dd>
                  <dt>{t("district")}</dt><dd>{districtLabel(data.district)}</dd>
                </dl>
              </div>
              <div className={ui.note}>
                <Info aria-hidden="true" />
                <span>{t("info")}</span>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
        {step > 0 ? (
          <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={back}><ArrowLeft style={flip} /> {t("back")}</button>
        ) : <span />}
        {step < 2 ? (
          <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={next}>{t("next")} <ArrowRight style={flip} /></button>
        ) : (
          <button type="submit" className={`${ui.btn} ${ui.btnWa}`}><WhatsappLogo /> {t("submit")}</button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
