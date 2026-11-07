import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone, WhatsappLogo, MapPin, Clock, PaperPlaneTilt, CheckCircle, EnvelopeSimple, InstagramLogo,
  ChatsCircle, ShieldCheck, Siren, CalendarCheck, Lightning, CaretDown, Info, Sun, Moon, CalendarBlank,
  HouseLine, NavigationArrow,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import { Stagger, StaggerItem, SpotlightCard, Magnetic } from "../../components/motion";
import { SITE } from "../../config/site";
import { whatsappUrl, buildMessage, openWhatsApp, isValidPhone } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";
import { useT } from "../../i18n";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { toast } from "../../components/toast";

const dict = {
  tr: {
    seoTitle: "İletişim",
    seoDesc: "ETERNAL Sağlık Hizmetleri ile 7/24 iletişime geçin: telefon, WhatsApp, e-posta. Sakarya, Semerciler Mah. Sakarya, Düzce, Kocaeli ve İstanbul'a hizmet.",
    badge: "İletişim",
    title: "Bize",
    highlight: "Ulaşın",
    text: "Sorularınız, önerileriniz veya randevu talepleriniz için bize 7 gün 24 saat ulaşabilirsiniz.",
    phone: "Telefon", phoneSub: "7/24 ulaşılabilir",
    wa: "WhatsApp", waSub: "Mesaj gönderin", waNote: "Reçete ve fotoğraf iletebilirsiniz",
    address: "Adres", addressSub: "Sakarya, Düzce, Kocaeli, İstanbul",
    hours: "Çalışma saatleri", hoursVal: "7 Gün / 24 Saat", hoursSub: "Tatil günleri dahil",
    fastBadge: "Hangi kanal?",
    fastTitle: "En hızlı yol",
    fastAccent: "hangisi?",
    fastLead: "İhtiyacınıza göre doğru kanalı seçerseniz size daha hızlı yardımcı olabiliriz.",
    fast: [
      { k: "Hayati tehlike", t: "112'yi arayın", d: "Bilinç kaybı, şiddetli göğüs ağrısı, ağır nefes darlığı, felç belirtileri veya durmayan kanamada önce 112.", cta: "112'yi ara" },
      { k: "Bugün ev ziyareti", t: "Telefonla arayın", d: "Aynı gün doktor veya hemşire ihtiyacında doğrudan arayın; adres ve durumu birlikte netleştirelim.", cta: "Hemen ara" },
      { k: "Reçete, fotoğraf, soru", t: "WhatsApp'tan yazın", d: "Reçetenizin veya doktor notunuzun fotoğrafını gönderebilir, sorularınızı yazılı iletebilirsiniz.", cta: "WhatsApp'ı aç" },
      { k: "Planlı randevu", t: "Online randevu", d: "Hizmeti, tarihi ve saati seçin; talebiniz WhatsApp mesajı olarak hazırlanır.", cta: "Randevu al" },
      { k: "Kurumsal ve evrak", t: "E-posta gönderin", d: "Kurumsal teklif, belge veya ayrıntılı bilgi talepleri için e-posta en uygun kanaldır.", cta: "E-posta yaz" },
    ],
    formTitle: "Mesaj gönderin",
    formLead: "Formu doldurduğunuzda mesajınız WhatsApp'ta hazır olarak açılır; göndermeniz yeterlidir. Ekibimiz size en kısa sürede dönüş yapar.",
    f1: "Kolay iletişim", f1d: "Mesajınız WhatsApp'ta hazır açılır",
    f2: "Gizlilik", f2d: "Bilgileriniz KVKK kapsamında korunur",
    f3: "7/24 destek", f3d: "Gece ve tatil günlerinde de ulaşın",
    email: "E-posta",
    firstName: "Adınız*", firstNamePh: "Adınız",
    lastName: "Soyadınız*", lastNamePh: "Soyadınız",
    emailLbl: "E-posta", emailPh: "E-posta adresiniz",
    phoneLbl: "Telefon*",
    subject: "Konu", subjectPh: "Konu seçin",
    subjects: { randevu: "Randevu Talebi", bilgi: "Bilgi Alma", sikayet: "Şikayet / Öneri", diger: "Diğer" },
    msg: "Mesajınız*", msgPh: "Mesajınızı yazın...",
    kvkk: "Bilgilerimin iletişim amacıyla işlenmesini kabul ediyorum.", kvkkLink: "KVKK Aydınlatma Metni",
    send: "WhatsApp ile Gönder", sending: "Hazırlanıyor...",
    errRequired: "Lütfen tüm zorunlu alanları doldurun.",
    errPhone: "Lütfen geçerli bir telefon numarası yazın.",
    errKvkk: "Devam etmek için KVKK aydınlatma metnini onaylayın.",
    success: "WhatsApp açıldı, mesajı göndermeniz yeterli. Teşekkürler!",
    msgTitle: "İletişim Formu",
    lName: "Ad Soyad", lPhone: "Telefon", lEmail: "E-posta", lSubject: "Konu", lMsg: "Mesaj",
    hoursBadge: "Çalışma saatleri",
    hoursTitle: "Ne zaman",
    hoursAccent: "ulaşabilirsiniz?",
    hoursRows: [
      { t: "Telefon ve WhatsApp", d: "Haftanın 7 günü, 24 saat" },
      { t: "Acil ev ziyaretleri", d: "Gece ve gündüz, ortalama 30-45 dakikada adreste" },
      { t: "Planlı ziyaretler", d: "Size uygun gün ve saat aralığında" },
      { t: "Resmî tatil ve bayramlar", d: "Hizmetimiz devam eder" },
    ],
    hoursNote: "Varış süresi trafik ve mesafeye göre değişebilir.",
    regionsTitle: "Hizmet verdiğimiz bölgeler",
    regions: ["Sakarya", "Düzce", "Kocaeli", "İstanbul"],
    hq: "Merkez",
    regionsText: "Ev, iş yeri ve otel adreslerine geliyoruz. Bölgeniz listede yoksa arayın, birlikte değerlendirelim.",
    faqBadge: "Kısa sorular",
    faqTitle: "İletişimle ilgili",
    faqAccent: "merak edilenler",
    faq: [
      { q: "Formu gönderince ne olur?", a: "Mesajınız WhatsApp'ta hazır olarak açılır. Göndere bastığınızda bize ulaşır ve ekibimiz size dönüş yapar. Sitemizde bilgileriniz saklanmaz." },
      { q: "Ücret bilgisi alabilir miyim?", a: "Ücret, hizmetin türüne ve süresine göre belirlenir. Net bilgi için bizi arayabilir veya WhatsApp'tan yazabilirsiniz." },
      { q: "Reçetemi nasıl iletebilirim?", a: "Reçetenizin veya doktor notunuzun fotoğrafını WhatsApp'tan göndermeniz yeterlidir; uygulama için uygun saat birlikte planlanır." },
      { q: "Acil bir durumda ne yapmalıyım?", a: "Hayati tehlike belirtilerinde vakit kaybetmeden 112'yi arayın. Acil ev ziyareti için bizi telefonla arayın; acil çağrılarda ortalama 30-45 dakika içinde adrese ulaşmaya çalışıyoruz." },
    ],
    mapTitle: "Bizi ziyaret edin",
    mapLead: "Sağlık hizmetinizi ayağınıza getirmek için buradayız.",
    mapFrame: "ETERNAL Sağlık Hizmetleri konumu – Semerciler Mah., Adapazarı / Sakarya",
    directions: "Yol tarifi al",
  },
  en: {
    seoTitle: "Contact",
    seoDesc: "Contact ETERNAL Health Services 24/7 by phone, WhatsApp or e-mail. Based in Semerciler, Sakarya, serving Sakarya, Düzce, Kocaeli and Istanbul.",
    badge: "Contact",
    title: "Get in",
    highlight: "touch",
    text: "Reach us 7 days a week, 24 hours a day with your questions, suggestions or appointment requests.",
    phone: "Phone", phoneSub: "Available 24/7",
    wa: "WhatsApp", waSub: "Send a message", waNote: "You can send prescriptions and photos",
    address: "Address", addressSub: "Sakarya, Düzce, Kocaeli, Istanbul",
    hours: "Opening hours", hoursVal: "7 days / 24 hours", hoursSub: "Including public holidays",
    fastBadge: "Which channel?",
    fastTitle: "What's the",
    fastAccent: "fastest way?",
    fastLead: "Choosing the right channel for your need helps us help you faster.",
    fast: [
      { k: "Life-threatening", t: "Call 112", d: "For loss of consciousness, severe chest pain, serious shortness of breath, signs of stroke or bleeding that won't stop, call 112 first.", cta: "Call 112" },
      { k: "Home visit today", t: "Phone us", d: "If you need a doctor or nurse the same day, call us directly and we'll confirm the address and situation together.", cta: "Call now" },
      { k: "Prescription, photo, question", t: "Message on WhatsApp", d: "Send a photo of your prescription or doctor's note, or write your questions down.", cta: "Open WhatsApp" },
      { k: "Planned appointment", t: "Book online", d: "Choose the service, date and time; your request is prepared as a WhatsApp message.", cta: "Book now" },
      { k: "Corporate & documents", t: "Send an e-mail", d: "E-mail is best for corporate quotes, documents or detailed information requests.", cta: "Write an e-mail" },
    ],
    formTitle: "Send a message",
    formLead: "When you fill in the form, your message opens ready-to-send in WhatsApp — just press send. Our team will get back to you as soon as possible.",
    f1: "Easy contact", f1d: "Your message opens ready in WhatsApp",
    f2: "Privacy", f2d: "Your data is protected under KVKK",
    f3: "24/7 support", f3d: "Reach us at night and on holidays too",
    email: "E-mail",
    firstName: "First name*", firstNamePh: "Your first name",
    lastName: "Surname*", lastNamePh: "Your surname",
    emailLbl: "E-mail", emailPh: "Your e-mail address",
    phoneLbl: "Phone*",
    subject: "Subject", subjectPh: "Choose a subject",
    subjects: { randevu: "Appointment request", bilgi: "Information request", sikayet: "Complaint / Suggestion", diger: "Other" },
    msg: "Your message*", msgPh: "Write your message...",
    kvkk: "I agree to my details being processed in order to contact me.", kvkkLink: "KVKK Privacy Notice",
    send: "Send via WhatsApp", sending: "Preparing...",
    errRequired: "Please fill in all required fields.",
    errPhone: "Please enter a valid phone number.",
    errKvkk: "Please accept the KVKK privacy notice to continue.",
    success: "WhatsApp has opened — just send the message. Thank you!",
    msgTitle: "Contact Form",
    lName: "Name", lPhone: "Phone", lEmail: "E-mail", lSubject: "Subject", lMsg: "Message",
    hoursBadge: "Opening hours",
    hoursTitle: "When can",
    hoursAccent: "you reach us?",
    hoursRows: [
      { t: "Phone and WhatsApp", d: "7 days a week, 24 hours a day" },
      { t: "Urgent home visits", d: "Day and night, at the address in 30–45 minutes on average" },
      { t: "Planned visits", d: "On a day and time that suits you" },
      { t: "Public and religious holidays", d: "Our service continues" },
    ],
    hoursNote: "Arrival times can vary with traffic and distance.",
    regionsTitle: "Areas we serve",
    regions: ["Sakarya", "Düzce", "Kocaeli", "Istanbul"],
    hq: "Base",
    regionsText: "We come to homes, workplaces and hotels. If your area isn't listed, call us and we'll see what we can do.",
    faqBadge: "Quick questions",
    faqTitle: "Questions about",
    faqAccent: "getting in touch",
    faq: [
      { q: "What happens when I send the form?", a: "Your message opens ready in WhatsApp. Once you press send it reaches us and our team will reply. Your details are not stored on our website." },
      { q: "Can I ask about prices?", a: "Prices depend on the type and length of the service. Call us or message us on WhatsApp for clear information." },
      { q: "How do I send my prescription?", a: "Just send a photo of your prescription or doctor's note on WhatsApp, and we'll plan a suitable time for the procedure together." },
      { q: "What should I do in an emergency?", a: "If there are signs of a life-threatening emergency, call 112 immediately. For an urgent home visit, phone us; for urgent calls we aim to reach the address in 30–45 minutes on average." },
    ],
    mapTitle: "Visit us",
    mapLead: "We're here to bring healthcare to your door.",
    mapFrame: "ETERNAL Health Services location – Semerciler, Adapazarı / Sakarya",
    directions: "Get directions",
  },
  ar: {
    seoTitle: "اتصل بنا",
    seoDesc: "تواصل مع إيترنال للخدمات الصحية على مدار الساعة عبر الهاتف أو واتساب أو البريد الإلكتروني. مقرنا في سميرجيلر، سكاريا، ونخدم سكاريا ودوزجه وكوجالي وإسطنبول.",
    badge: "اتصل بنا",
    title: "تواصل",
    highlight: "معنا",
    text: "يمكنك التواصل معنا ٧ أيام في الأسبوع و٢٤ ساعة في اليوم لأسئلتك أو اقتراحاتك أو طلبات المواعيد.",
    phone: "الهاتف", phoneSub: "متاح على مدار الساعة",
    wa: "واتساب", waSub: "أرسل رسالة", waNote: "يمكنك إرسال الوصفات والصور",
    address: "العنوان", addressSub: "سكاريا، دوزجه، كوجالي، إسطنبول",
    hours: "ساعات العمل", hoursVal: "٧ أيام / ٢٤ ساعة", hoursSub: "بما في ذلك أيام العطل",
    fastBadge: "أي قناة؟",
    fastTitle: "ما هي",
    fastAccent: "أسرع طريقة؟",
    fastLead: "اختيار القناة المناسبة لحاجتك يساعدنا على خدمتك بشكل أسرع.",
    fast: [
      { k: "خطر على الحياة", t: "اتصل بـ 112", d: "عند فقدان الوعي أو ألم الصدر الشديد أو ضيق التنفس الحاد أو علامات السكتة أو النزيف المستمر، اتصل أولًا بـ 112.", cta: "اتصل بـ 112" },
      { k: "زيارة منزلية اليوم", t: "اتصل بنا هاتفيًا", d: "إذا احتجت طبيبًا أو ممرضًا في اليوم نفسه فاتصل بنا مباشرة لنحدّد العنوان والحالة معًا.", cta: "اتصل الآن" },
      { k: "وصفة، صورة، سؤال", t: "راسلنا عبر واتساب", d: "أرسل صورة وصفتك أو ملاحظة الطبيب، أو اكتب أسئلتك.", cta: "افتح واتساب" },
      { k: "موعد مخطط", t: "احجز عبر الإنترنت", d: "اختر الخدمة والتاريخ والوقت، ويُجهَّز طلبك كرسالة واتساب.", cta: "احجز موعدًا" },
      { k: "الشركات والمستندات", t: "أرسل بريدًا إلكترونيًا", d: "البريد الإلكتروني هو الأنسب لعروض الشركات والمستندات وطلبات المعلومات التفصيلية.", cta: "اكتب بريدًا" },
    ],
    formTitle: "أرسل رسالة",
    formLead: "عند ملء النموذج تُفتح رسالتك جاهزة في واتساب، وما عليك إلا إرسالها. سيعاود فريقنا التواصل معك في أقرب وقت.",
    f1: "تواصل سهل", f1d: "تُفتح رسالتك جاهزة في واتساب",
    f2: "الخصوصية", f2d: "بياناتك محمية بموجب قانون KVKK",
    f3: "دعم على مدار الساعة", f3d: "تواصل معنا ليلًا وفي العطل أيضًا",
    email: "البريد الإلكتروني",
    firstName: "الاسم*", firstNamePh: "اسمك",
    lastName: "اللقب*", lastNamePh: "لقبك",
    emailLbl: "البريد الإلكتروني", emailPh: "عنوان بريدك الإلكتروني",
    phoneLbl: "الهاتف*",
    subject: "الموضوع", subjectPh: "اختر الموضوع",
    subjects: { randevu: "طلب موعد", bilgi: "طلب معلومات", sikayet: "شكوى / اقتراح", diger: "أخرى" },
    msg: "رسالتك*", msgPh: "اكتب رسالتك...",
    kvkk: "أوافق على معالجة بياناتي لغرض التواصل.", kvkkLink: "إشعار الخصوصية (KVKK)",
    send: "أرسل عبر واتساب", sending: "جارٍ التحضير...",
    errRequired: "يرجى ملء جميع الحقول الإلزامية.",
    errPhone: "يرجى إدخال رقم هاتف صحيح.",
    errKvkk: "يرجى الموافقة على إشعار الخصوصية (KVKK) للمتابعة.",
    success: "تم فتح واتساب، ما عليك إلا إرسال الرسالة. شكرًا لك!",
    msgTitle: "نموذج التواصل",
    lName: "الاسم الكامل", lPhone: "الهاتف", lEmail: "البريد الإلكتروني", lSubject: "الموضوع", lMsg: "الرسالة",
    hoursBadge: "ساعات العمل",
    hoursTitle: "متى يمكنك",
    hoursAccent: "التواصل معنا؟",
    hoursRows: [
      { t: "الهاتف وواتساب", d: "٧ أيام في الأسبوع، ٢٤ ساعة" },
      { t: "الزيارات المنزلية العاجلة", d: "ليلًا ونهارًا، نصل خلال ٣٠–٤٥ دقيقة في المتوسط" },
      { t: "الزيارات المخططة", d: "في اليوم والوقت المناسبين لك" },
      { t: "العطل الرسمية والأعياد", d: "تستمر خدماتنا" },
    ],
    hoursNote: "قد يختلف وقت الوصول حسب حركة المرور والمسافة.",
    regionsTitle: "المناطق التي نخدمها",
    regions: ["سكاريا", "دوزجه", "كوجالي", "إسطنبول"],
    hq: "المركز",
    regionsText: "نأتي إلى المنازل وأماكن العمل والفنادق. إن لم تكن منطقتك مدرجة فاتصل بنا لنبحث الأمر معًا.",
    faqBadge: "أسئلة سريعة",
    faqTitle: "أسئلة حول",
    faqAccent: "التواصل معنا",
    faq: [
      { q: "ماذا يحدث عند إرسال النموذج؟", a: "تُفتح رسالتك جاهزة في واتساب، وعند الضغط على إرسال تصل إلينا ويعاود فريقنا التواصل معك. لا تُحفظ بياناتك على موقعنا." },
      { q: "هل يمكنني معرفة الأسعار؟", a: "تُحدَّد الأسعار حسب نوع الخدمة ومدتها. اتصل بنا أو راسلنا عبر واتساب للحصول على معلومات واضحة." },
      { q: "كيف أرسل وصفتي الطبية؟", a: "يكفي إرسال صورة الوصفة أو ملاحظة الطبيب عبر واتساب، ونخطط معًا للوقت المناسب للإجراء." },
      { q: "ماذا أفعل في حالة طارئة؟", a: "عند ظهور علامات الخطر على الحياة اتصل فورًا بـ 112. ولزيارة منزلية عاجلة اتصل بنا هاتفيًا؛ ففي الحالات العاجلة نسعى للوصول خلال ٣٠–٤٥ دقيقة في المتوسط." },
    ],
    mapTitle: "زورونا",
    mapLead: "نحن هنا لنوصل الرعاية الصحية إلى بابك.",
    mapFrame: "موقع إيترنال للخدمات الصحية – سميرجيلر، أدابازاري / سكاريا",
    directions: "احصل على الاتجاهات",
  },
};

const FAST_ICONS = [Siren, Phone, WhatsappLogo, CalendarCheck, EnvelopeSimple];
const FAST_TONES = ["danger", "teal", "green", "violet", "blue"];
const HOURS_ICONS = [ChatsCircle, Moon, CalendarBlank, Sun];
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3021.401144126256!2d30.3928889!3d40.77519439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQ2JzMwLjciTiAzMMKwMjMnMzQuNCJF!5e0!3m2!1str!2saz!4v1734266122992!5m2!1str!2saz";
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`;

const Head = ({ badge, title, accent, lead }) => (
  <ScrollReveal>
    <div className={ui.sectionHead}>
      <span className={ui.badge}>{badge}</span>
      <h2>
        {title} <span className="accent">{accent}</span>
      </h2>
      {lead && <p>{lead}</p>}
    </div>
  </ScrollReveal>
);

const MiniFaq = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.faqList}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <ScrollReveal key={f.q} delay={i * 0.06}>
            <div className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}>
              <button type="button" className={styles.faqQ} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span>
                <CaretDown weight="bold" className={styles.faqCaret} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className={styles.faqA}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
};

const Contact = () => {
  const t = useT(dict);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gmail, setGmail] = useState("");
  const [message, setMessage] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [kvkk, setKvkk] = useState(false);

  const SUBJECTS = t("subjects");

  // No mail backend exists on the server, so the form opens a pre-filled WhatsApp message.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !message || !phonenumber) {
      alert(t("errRequired"));
      return;
    }
    if (!isValidPhone(phonenumber)) {
      alert(t("errPhone"));
      return;
    }
    if (!kvkk) {
      alert(t("errKvkk"));
      return;
    }
    setLoading(true);
    openWhatsApp(
      buildMessage(t("msgTitle"), {
        [t("lName")]: `${firstname} ${lastname}`,
        [t("lPhone")]: phonenumber,
        [t("lEmail")]: gmail,
        [t("lSubject")]: SUBJECTS[subject] || subject,
        [t("lMsg")]: message,
      })
    );
    trackEvent("generate_lead", { form: "contact", subject });
    setSuccessMessage(t("success"));
    toast({ title: "✓", text: t("success"), type: "success" });
    setFirstName(""); setLastName(""); setGmail("");
    setMessage(""); setPhone(""); setSubject(""); setKvkk(false);
    setLoading(false);
  };

  const fastHref = [
    "tel:112",
    `tel:${SITE.phones[0].tel}`,
    whatsappUrl(),
    "/randevu",
    `mailto:${SITE.email}`,
  ];

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/contact" />

      <Wrapper>
        {/* Info cards */}
        <Stagger className={styles.infoCards} gap={0.1}>
          <StaggerItem>
            <SpotlightCard className={styles.infoCard}>
              <span className={`${styles.infoIcon} ${styles.iconTeal}`}><Phone weight="duotone" /></span>
              <h3>{t("phone")}</h3>
              {SITE.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className={styles.infoLink}><bdi>{p.display}</bdi></a>
              ))}
              <span>{t("phoneSub")}</span>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
              <span className={`${styles.infoIcon} ${styles.iconGreen}`}><WhatsappLogo weight="duotone" /></span>
              <h3>{t("wa")}</h3>
              <p>{t("waSub")}</p>
              <span>{t("waNote")}</span>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard as="a" href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
              <span className={`${styles.infoIcon} ${styles.iconBlue}`}><MapPin weight="duotone" /></span>
              <h3>{t("address")}</h3>
              <p>{SITE.address}</p>
              <span>{t("addressSub")}</span>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard className={styles.infoCard}>
              <span className={`${styles.infoIcon} ${styles.iconAmber}`}><Clock weight="duotone" /></span>
              <h3>{t("hours")}</h3>
              <p>{t("hoursVal")}</p>
              <span>{t("hoursSub")}</span>
            </SpotlightCard>
          </StaggerItem>
        </Stagger>

        {/* Fastest channel */}
        <section className={ui.section}>
          <Head badge={t("fastBadge")} title={t("fastTitle")} accent={t("fastAccent")} lead={t("fastLead")} />
          <Stagger className={styles.fastGrid} gap={0.08}>
            {t("fast").map((f, i) => {
              const Icon = FAST_ICONS[i];
              const href = fastHref[i];
              const external = href.startsWith("http");
              const inner = (
                <>
                  <span className={styles.fastKicker}>{f.k}</span>
                  <span className={styles.fastIcon}><Icon weight={i === 0 ? "fill" : "duotone"} /></span>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                  <span className={styles.fastCta}><Lightning weight="fill" /> {f.cta}</span>
                </>
              );
              return (
                <StaggerItem key={f.k}>
                  {href.startsWith("/") ? (
                    <SpotlightCard as={Link} to={href} className={`${styles.fastCard} ${styles[FAST_TONES[i]]}`}>{inner}</SpotlightCard>
                  ) : (
                    <SpotlightCard as="a" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${styles.fastCard} ${styles[FAST_TONES[i]]}`}>
                      {inner}
                    </SpotlightCard>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        {/* Form */}
        <div className={styles.formSection}>
          <ScrollReveal direction="left" className={styles.formLeftWrap}>
            <div className={styles.formLeft}>
              <h2>{t("formTitle")}</h2>
              <p>{t("formLead")}</p>

              <div className={styles.features}>
                {[
                  { Icon: ChatsCircle, h: t("f1"), d: t("f1d") },
                  { Icon: ShieldCheck, h: t("f2"), d: t("f2d") },
                  { Icon: Clock, h: t("f3"), d: t("f3d") },
                ].map(({ Icon, h, d }) => (
                  <div className={styles.feature} key={h}>
                    <span className={styles.featureIcon}><Icon weight="duotone" /></span>
                    <div>
                      <h4>{h}</h4>
                      <span>{d}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.contactLinks}>
                <a href={`tel:${SITE.phones[0].tel}`} className={styles.contactLink}>
                  <span className={`${styles.contactLinkIcon} ${styles.iconTeal}`}><Phone weight="duotone" /></span>
                  <span className={styles.contactLinkText}>
                    <span>{t("phone")}</span>
                    <strong><bdi>{SITE.phones[0].display}</bdi></strong>
                  </span>
                </a>
                <a href={`mailto:${SITE.email}`} className={styles.contactLink}>
                  <span className={`${styles.contactLinkIcon} ${styles.iconBlue}`}><EnvelopeSimple weight="duotone" /></span>
                  <span className={styles.contactLinkText}>
                    <span>{t("email")}</span>
                    <strong>{SITE.email}</strong>
                  </span>
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <span className={`${styles.contactLinkIcon} ${styles.iconRose}`}><InstagramLogo weight="duotone" /></span>
                  <span className={styles.contactLinkText}>
                    <span>Instagram</span>
                    <strong>@sakaryaevdesaglik</strong>
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.formWrap}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <label>
                  <span>{t("firstName")}</span>
                  <input value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder={t("firstNamePh")} type="text" autoComplete="given-name" required />
                </label>
                <label>
                  <span>{t("lastName")}</span>
                  <input value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder={t("lastNamePh")} type="text" autoComplete="family-name" required />
                </label>
                <label>
                  <span>{t("emailLbl")}</span>
                  <input value={gmail} onChange={(e) => setGmail(e.target.value)} placeholder={t("emailPh")} type="email" autoComplete="email" />
                </label>
                <label>
                  <span>{t("phoneLbl")}</span>
                  <input value={phonenumber} onChange={(e) => setPhone(e.target.value)} placeholder="05xx xxx xx xx" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required />
                </label>
              </div>
              <label>
                <span>{t("subject")}</span>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className={styles.select}>
                  <option value="">{t("subjectPh")}</option>
                  <option value="randevu">{SUBJECTS.randevu}</option>
                  <option value="bilgi">{SUBJECTS.bilgi}</option>
                  <option value="sikayet">{SUBJECTS.sikayet}</option>
                  <option value="diger">{SUBJECTS.diger}</option>
                </select>
              </label>
              <label>
                <span>{t("msg")}</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("msgPh")} rows="6" required />
              </label>
              <label className={styles.kvkk}>
                <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} />
                <span>{t("kvkk")} <Link to="/kvkk">{t("kvkkLink")}</Link></span>
              </label>
              <div className={styles.formActions}>
                <AnimatePresence>
                  {successMessage && (
                    <motion.span className={styles.success} role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <CheckCircle weight="fill" /> {successMessage}
                    </motion.span>
                  )}
                </AnimatePresence>
                <Magnetic strength={0.2}>
                  <button type="submit" disabled={loading}>
                    <PaperPlaneTilt weight="duotone" className={styles.flip} />
                    {loading ? t("sending") : t("send")}
                  </button>
                </Magnetic>
              </div>
            </form>
          </ScrollReveal>
        </div>

        {/* Hours + regions */}
        <section className={ui.section}>
          <Head badge={t("hoursBadge")} title={t("hoursTitle")} accent={t("hoursAccent")} />
          <div className={styles.hoursLayout}>
            <Stagger className={styles.hoursList} gap={0.08}>
              {t("hoursRows").map((r, i) => {
                const Icon = HOURS_ICONS[i];
                return (
                  <StaggerItem key={r.t} className={styles.hoursRow}>
                    <span className={styles.hoursIcon}><Icon weight="duotone" /></span>
                    <div>
                      <strong>{r.t}</strong>
                      <span>{r.d}</span>
                    </div>
                    <span className={styles.liveDot} aria-hidden="true" />
                  </StaggerItem>
                );
              })}
              <p className={styles.hoursNote}><Info weight="duotone" /> {t("hoursNote")}</p>
            </Stagger>

            <ScrollReveal delay={0.1}>
              <div className={styles.regionsCard}>
                <h3><HouseLine weight="duotone" /> {t("regionsTitle")}</h3>
                <div className={styles.regionChips}>
                  {t("regions").map((r, i) => (
                    <span key={r} className={i === 0 ? styles.regionHq : undefined}>
                      <MapPin weight="fill" /> {r}
                      {i === 0 && <em>{t("hq")}</em>}
                    </span>
                  ))}
                </div>
                <p>{t("regionsText")}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Mini FAQ */}
        <section className={ui.section}>
          <Head badge={t("faqBadge")} title={t("faqTitle")} accent={t("faqAccent")} />
          <MiniFaq items={t("faq")} />
        </section>

        {/* Map */}
        <section className={styles.mapSection}>
          <ScrollReveal>
            <div className={styles.mapHeader}>
              <h2>{t("mapTitle")}</h2>
              <p>{t("mapLead")}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className={styles.mapFrame}>
              <iframe
                src={MAP_SRC}
                className={styles.map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapFrame")}
              />
              <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnPrimary} ${styles.mapBtn}`}>
                <NavigationArrow weight="fill" /> {t("directions")}
              </a>
            </div>
          </ScrollReveal>
        </section>
      </Wrapper>
    </>
  );
};

export default React.memo(Contact);
