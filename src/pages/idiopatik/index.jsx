import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, WhatsappLogo, Clock, MapPin, ShieldCheck, PaperPlaneTilt, ChatCircleText, HouseLine, ClipboardText,
  Pill, FileText, TestTube, Warning, Buildings, IdentificationCard, HandHeart, Heartbeat, FirstAidKit, CheckCircle,
  ArrowsClockwise, LockKey, ArrowRight,
} from "@phosphor-icons/react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import DoctorProfile from "../../assets/images/doctor12.jpg";
import ScrollReveal from "../../components/scrollreveal";
import BookingForm from "../../components/bookingform";
import CallbackForm from "../../components/callbackform";
import { Stagger, StaggerItem, SpotlightCard, CountUp, Float } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import { SITE } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useLang, useT } from "../../i18n";

const dict = {
  tr: {
    badge: "Online Randevu",
    title: "Randevu",
    highlight: "Alın",
    text: "Formu doldurun, talebiniz WhatsApp ile bize ulaşsın. Dilerseniz hemen arayın ya da sizi arayalım.",
    seoTitle: "Randevu Al",
    seoDesc: "Evde doktor, hemşire, serum ve tahlil için online randevu alın. Sakarya, Düzce, Kocaeli ve İstanbul.",
    trust: ["7 gün · 24 saat", "Sakarya · Düzce · Kocaeli · İstanbul", "KVKK uyumlu"],
    waMsg: "Merhaba, randevu almak istiyorum.",
    wa: "WhatsApp'tan yazın",
    callbackTitle: "Form doldurmak istemiyor musunuz?",
    callbackSource: "Randevu sayfası",
    readyTitle: "Hazır bulundurmanız iyi olur",
    ready: [
      "Kullanılan ilaçların listesi veya kutuları",
      "Varsa reçete, doktor notu veya epikriz",
      "Son tahlil ve görüntüleme sonuçları",
      "Bilinen alerjiler ve kronik hastalıklar",
      "Kimlik bilgisi (gerekli işlemler için)",
      "Adres tarifi, kat ve asansör bilgisi",
    ],
    afterBadge: "Süreç",
    afterTitle: "Gönderdikten sonra ne olur?",
    afterText: "Talebiniz bir randevu isteğidir; saat ve ayrıntılar ekibimizle birlikte netleşir.",
    after: [
      { t: "Mesajı gönderirsiniz", d: "Form, bilgilerinizi hazır bir WhatsApp mesajına dönüştürür. İçeriği görüp düzenleyebilir, sonra gönderirsiniz." },
      { t: "Ekibimiz size döner", d: "Talebinizi inceler, gerekirse sağlık durumuyla ilgili birkaç soru sorar ve uygun saati sizinle netleştirir." },
      { t: "Evinize geliyoruz", d: "Sağlık personelimiz belirlenen saatte adresinize gelir; değerlendirme ve işlem hijyen kurallarına uygun yapılır." },
      { t: "Bilgilendirme ve takip", d: "Yapılan işlemler ve dikkat edilmesi gerekenler anlatılır. İsterseniz uzaktaki yakınınız da bilgilendirilir." },
    ],
    reassureBadge: "İçiniz rahat olsun",
    reassureTitle: "Neden güvenle randevu alabilirsiniz?",
    reassure: [
      { t: "Mesaj sizin kontrolünüzde", d: "Bilgileriniz sitede saklanmaz; doğrudan sizin telefonunuzdan WhatsApp ile bize ulaşır." },
      { t: "Bağlayıcı değil", d: "Talep göndermek sizi bir ödemeye bağlamaz; randevu ekibimizle konuşulduktan sonra kesinleşir." },
      { t: "Değiştirmek kolay", d: "Planınız değişirse telefonla veya WhatsApp'tan haber vermeniz yeterli." },
      { t: "Gizliliğiniz korunur", d: "Sağlık bilgileriniz 6698 sayılı KVKK kapsamında, yalnızca hizmet amacıyla işlenir." },
    ],
    stats: [
      { to: 15, suffix: "+", l: "yıllık deneyim" },
      { to: 98, prefix: "%", l: "memnuniyet" },
      { to: 937, suffix: "+", l: "ev ziyareti" },
      { to: 10348, suffix: "+", l: "hasta" },
    ],
    emergency: "Hayati tehlike varsa (bilinç kaybı, şiddetli göğüs ağrısı, ağır nefes darlığı) randevu beklemeyin, hemen 112'yi arayın.",
    doctorName: "Uzm. Dr. Atakan Bayrak",
    doctorText: "Uzman sağlık ekibimizle rahat bir nefes alın.",
    skillsBadge: "Uzmanlık Alanları",
    skillsTitle: "Hizmet Yelpazesi",
    skills: [
      "Evde Doktor Hizmeti", "I.V. Terapi", "Glutatyon Terapisi", "Yüksek Doz C Vitamin Terapisi", "Serum Tedavisi",
      "Evde Hemşirelik Hizmeti", "Sağlık Danışmanlık Hizmeti", "Hasta Bakım Refakat Hizmeti", "Yaşlı Bakım Destek Hizmeti",
      "Serum Takma", "Enjeksiyon", "Sonda Takma ve Değişimi", "Pansuman & Yara Bakımı", "Bası Yarası Pansumanı (Dekubit)",
      "Tansiyon Ölçümleri", "Glukoz (Şeker) Ölçümü & Takibi", "Oksijen & Buhar Uygulaması", "Evde & Hastanede Hemşire",
      "Göz & Kulak Lavajı (Yıkama)", "Cerrahi Müdahale", "Dikiş Atma ve Alma", "Buzlu Ağrı Kompresi & Masaj",
    ],
    clinicTitle: "ETERNAL Sağlık Hizmeti",
    clinicText: "Bu kurumda hastalar değil hastalıklar susturulur.",
  },
  en: {
    badge: "Online Booking",
    title: "Book an",
    highlight: "Appointment",
    text: "Fill in the form and your request reaches us via WhatsApp. Or call us right away, or let us call you.",
    seoTitle: "Book an Appointment",
    seoDesc: "Book a home doctor, nurse, IV drip or home blood test online. Sakarya, Düzce, Kocaeli and Istanbul.",
    trust: ["7 days · 24 hours", "Sakarya · Düzce · Kocaeli · Istanbul", "KVKK compliant"],
    waMsg: "Hello, I would like to book an appointment.",
    wa: "Message us on WhatsApp",
    callbackTitle: "Prefer not to fill in a form?",
    callbackSource: "Booking page",
    readyTitle: "Helpful to have ready",
    ready: [
      "A list of current medicines, or their boxes",
      "Any prescription, doctor's note or discharge summary",
      "Recent test and imaging results",
      "Known allergies and long-term conditions",
      "ID details (for procedures that require them)",
      "Directions, floor and lift information",
    ],
    afterBadge: "The process",
    afterTitle: "What happens after you send it?",
    afterText: "Your request is a booking enquiry; the time and details are confirmed together with our team.",
    after: [
      { t: "You send the message", d: "The form turns your details into a ready-made WhatsApp message. You can review and edit it, then send it." },
      { t: "Our team gets back to you", d: "We review your request, may ask a few questions about the patient's health, and confirm a suitable time with you." },
      { t: "We come to your home", d: "Our healthcare professional arrives at the agreed time; the assessment and procedure follow hygiene rules." },
      { t: "Information and follow-up", d: "We explain what was done and what to watch for. If you wish, a relative who lives far away can be updated too." },
    ],
    reassureBadge: "Peace of mind",
    reassureTitle: "Why you can book with confidence",
    reassure: [
      { t: "You control the message", d: "Your details are not stored on the website; they reach us directly from your phone via WhatsApp." },
      { t: "No commitment", d: "Sending a request does not commit you to any payment; the appointment is confirmed after talking with our team." },
      { t: "Easy to change", d: "If your plans change, just let us know by phone or WhatsApp." },
      { t: "Your privacy is protected", d: "Your health information is processed only to provide care, under Turkey's data protection law No. 6698 (KVKK)." },
    ],
    stats: [
      { to: 15, suffix: "+", l: "years of experience" },
      { to: 98, suffix: "%", l: "satisfaction" },
      { to: 937, suffix: "+", l: "home visits" },
      { to: 10348, suffix: "+", l: "patients" },
    ],
    emergency: "If life is in danger (loss of consciousness, severe chest pain, severe shortness of breath), do not wait for an appointment — call 112 immediately.",
    doctorName: "Dr. Atakan Bayrak, Specialist",
    doctorText: "Breathe easy with our expert healthcare team.",
    skillsBadge: "Areas of expertise",
    skillsTitle: "Our Range of Services",
    skills: [
      "Home Doctor Visits", "IV Therapy", "Glutathione Therapy", "High-Dose Vitamin C Therapy", "IV Drip Treatment",
      "Home Nursing", "Health Consultancy", "Patient Care & Companionship", "Elderly Care Support",
      "IV Cannula Insertion", "Injections", "Catheter Insertion & Change", "Dressings & Wound Care", "Pressure Sore (Bedsore) Dressing",
      "Blood Pressure Checks", "Blood Glucose Measurement & Monitoring", "Oxygen & Steam Therapy", "Nurse at Home & in Hospital",
      "Eye & Ear Irrigation", "Minor Surgical Procedures", "Stitching & Stitch Removal", "Cold Compress & Massage for Pain",
    ],
    clinicTitle: "ETERNAL Health Services",
    clinicText: "Here it is the illness that is silenced, never the patient.",
  },
  ar: {
    badge: "حجز إلكتروني",
    title: "احجز",
    highlight: "موعدك",
    text: "املأ النموذج ليصلنا طلبك عبر واتساب، أو اتصل بنا مباشرة، أو دعنا نتصل بك.",
    seoTitle: "احجز موعداً",
    seoDesc: "احجز إلكترونياً طبيباً منزلياً أو ممرضاً أو محلولاً وريدياً أو تحليلاً منزلياً. سكاريا ودوزجه وكوجالي وإسطنبول.",
    trust: ["7 أيام · 24 ساعة", "سكاريا · دوزجه · كوجالي · إسطنبول", "متوافق مع KVKK"],
    waMsg: "مرحباً، أرغب في حجز موعد.",
    wa: "راسلنا عبر واتساب",
    callbackTitle: "لا ترغب في تعبئة نموذج؟",
    callbackSource: "صفحة الحجز",
    readyTitle: "من المفيد تجهيز ما يلي",
    ready: [
      "قائمة الأدوية المستخدمة أو علبها",
      "الوصفة الطبية أو ملاحظة الطبيب أو تقرير الخروج إن وُجدت",
      "نتائج التحاليل والأشعة الأخيرة",
      "الحساسية المعروفة والأمراض المزمنة",
      "بيانات الهوية (للإجراءات التي تتطلبها)",
      "وصف العنوان والطابق ووجود مصعد",
    ],
    afterBadge: "الخطوات",
    afterTitle: "ماذا يحدث بعد الإرسال؟",
    afterText: "طلبك هو طلب موعد، ويُحدَّد الوقت والتفاصيل بالتنسيق مع فريقنا.",
    after: [
      { t: "ترسل الرسالة", d: "يحوّل النموذج بياناتك إلى رسالة واتساب جاهزة، يمكنك مراجعتها وتعديلها ثم إرسالها." },
      { t: "يتواصل معك فريقنا", d: "نراجع طلبك، وقد نطرح بعض الأسئلة عن الحالة الصحية، ونحدد معك الوقت المناسب." },
      { t: "نأتي إلى منزلك", d: "يصل طاقمنا الصحي في الموعد المتفق عليه، ويُجرى التقييم والإجراء وفق قواعد النظافة." },
      { t: "معلومات ومتابعة", d: "نشرح ما تم وما يجب الانتباه إليه، ويمكن إطلاع قريبك المقيم بعيداً إن رغبت." },
    ],
    reassureBadge: "اطمئن",
    reassureTitle: "لماذا يمكنك الحجز بثقة؟",
    reassure: [
      { t: "الرسالة تحت سيطرتك", d: "لا تُخزَّن بياناتك في الموقع، بل تصلنا مباشرة من هاتفك عبر واتساب." },
      { t: "دون التزام", d: "إرسال الطلب لا يُلزمك بأي دفع، ويتأكد الموعد بعد التحدث مع فريقنا." },
      { t: "سهولة التعديل", d: "إذا تغيّرت خططك يكفي أن تبلغنا هاتفياً أو عبر واتساب." },
      { t: "خصوصيتك محمية", d: "تُعالَج معلوماتك الصحية لغرض تقديم الخدمة فقط وفق قانون حماية البيانات التركي رقم 6698 (KVKK)." },
    ],
    stats: [
      { to: 15, suffix: "+", l: "عاماً من الخبرة" },
      { to: 98, suffix: "%", l: "نسبة الرضا" },
      { to: 937, suffix: "+", l: "زيارة منزلية" },
      { to: 10348, suffix: "+", l: "مريض" },
    ],
    emergency: "إذا كانت الحياة في خطر (فقدان الوعي، ألم شديد في الصدر، ضيق تنفس شديد) فلا تنتظر الموعد، واتصل بـ 112 فوراً.",
    doctorName: "الدكتور الأخصائي أتاكان بايراك",
    doctorText: "تنفّس بارتياح مع فريقنا الصحي المتخصص.",
    skillsBadge: "مجالات الخبرة",
    skillsTitle: "مجموعة خدماتنا",
    skills: [
      "خدمة الطبيب المنزلي", "العلاج الوريدي", "علاج الجلوتاثيون", "علاج فيتامين C بجرعات عالية", "العلاج بالمحاليل",
      "التمريض المنزلي", "الاستشارات الصحية", "رعاية المريض ومرافقته", "دعم رعاية كبار السن",
      "تركيب المحلول الوريدي", "الحقن", "تركيب القسطرة وتغييرها", "الضماد والعناية بالجروح", "ضماد قرح الفراش",
      "قياس ضغط الدم", "قياس سكر الدم ومتابعته", "العلاج بالأكسجين والبخار", "ممرض في المنزل والمستشفى",
      "غسل العين والأذن", "تدخلات جراحية بسيطة", "خياطة الجروح وإزالة الغرز", "كمادات باردة وتدليك للألم",
    ],
    clinicTitle: "إيترنال للخدمات الصحية",
    clinicText: "هنا نُسكت المرض، لا المريض.",
  },
};

const TRUST_ICONS = [Clock, MapPin, ShieldCheck];
const READY_ICONS = [Pill, FileText, TestTube, Warning, IdentificationCard, Buildings];
const AFTER_ICONS = [PaperPlaneTilt, ChatCircleText, HouseLine, ClipboardText];
const REASSURE_ICONS = [LockKey, CheckCircle, ArrowsClockwise, ShieldCheck];
const SKILL_ICONS = [FirstAidKit, Heartbeat, HandHeart];

const Idiopatik = () => {
  const { state } = useLocation();
  const t = useT(dict);
  const { lang, meta } = useLang();
  const numLocale = lang === "ar" ? "en-GB" : meta.locale;

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        text={t("text")}
        seoTitle={t("seoTitle")}
        seoDesc={t("seoDesc")}
        path="/randevu"
      >
        <div className={styles.heroBtns}>
          {SITE.phones.map((p, i) => (
            <a key={p.tel} href={`tel:${p.tel}`} className={`${ui.btn} ${i === 0 ? ui.btnPrimary : ui.btnGhost}`}>
              <Phone /> <span dir="ltr">{p.display}</span>
            </a>
          ))}
          <a href={whatsappUrl(t("waMsg"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
            <WhatsappLogo /> {t("wa")}
          </a>
        </div>
        <Stagger className={styles.trust}>
          {t("trust").map((x, i) => {
            const Ico = TRUST_ICONS[i];
            return <StaggerItem key={x} className={styles.trustPill}><Ico aria-hidden="true" /> {x}</StaggerItem>;
          })}
        </Stagger>
      </PageHero>

      <section className={styles.page}>
        <Wrapper>
          <div className={styles.bookingGrid}>
            <ScrollReveal>
              <div id="randevu-formu" className={styles.formAnchor} />
              <BookingForm defaultService={state?.service || ""} />
            </ScrollReveal>
            <div className={styles.side}>
              <ScrollReveal delay={0.1}>
                <div id="geri-arama">
                  <CallbackForm compact title={t("callbackTitle")} source={t("callbackSource")} />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className={`${ui.card} ${styles.ready}`}>
                  <h2 className={styles.cardTitle}><ClipboardText aria-hidden="true" /> {t("readyTitle")}</h2>
                  <Stagger as="ul" className={styles.readyList} gap={0.05}>
                    {t("ready").map((r, i) => {
                      const Ico = READY_ICONS[i];
                      return <StaggerItem as="li" key={r} y={10}><Ico aria-hidden="true" /> <span>{r}</span></StaggerItem>;
                    })}
                  </Stagger>
                </div>
              </ScrollReveal>
              <div className={`${ui.note} ${ui.noteDanger}`}>
                <Warning aria-hidden="true" />
                <span>{t("emergency")} <a href="tel:112" className={styles.sos}>112</a></span>
              </div>
            </div>
          </div>
        </Wrapper>

        {/* After you send */}
        <div className={styles.afterSection}>
          <Wrapper>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("afterBadge")}</span>
              <h2>{t("afterTitle")}</h2>
              <p>{t("afterText")}</p>
            </div>
            <Stagger className={styles.timeline} gap={0.12}>
              {t("after").map((a, i) => {
                const Ico = AFTER_ICONS[i];
                return (
                  <StaggerItem key={a.t} className={styles.tlItem}>
                    <div className={styles.tlIconWrap}>
                      <Float amplitude={4} duration={5} delay={i * 0.4}>
                        <span className={styles.tlIcon}><Ico weight="duotone" aria-hidden="true" /></span>
                      </Float>
                      <span className={styles.tlNum}>{i + 1}</span>
                    </div>
                    <h3>{a.t}</h3>
                    <p>{a.d}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Wrapper>
        </div>

        {/* Reassurance */}
        <Wrapper>
          <section className={styles.reassure}>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("reassureBadge")}</span>
              <h2>{t("reassureTitle")}</h2>
            </div>
            <div className={styles.stats}>
              {t("stats").map((s) => (
                <div key={s.l} className={styles.stat}>
                  <strong dir="ltr"><CountUp to={s.to} prefix={s.prefix || ""} suffix={s.suffix || ""} locale={numLocale} /></strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
            <Stagger className={styles.reassureGrid}>
              {t("reassure").map((r, i) => {
                const Ico = REASSURE_ICONS[i];
                return (
                  <StaggerItem key={r.t} style={{ height: "100%" }}>
                    <SpotlightCard className={`${ui.card} ${styles.reassureCard}`}>
                      <span className={styles.reassureIcon}><Ico weight="duotone" aria-hidden="true" /></span>
                      <h3>{r.t}</h3>
                      <p>{r.d}</p>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </section>
        </Wrapper>

        {/* Doctor */}
        <Wrapper>
          <ScrollReveal>
            <div className={styles.doctorCard}>
              <img src={DoctorProfile} alt={t("doctorName")} className={styles.doctorImg} loading="lazy" />
              <div className={styles.doctorInfo}>
                <h2>{t("doctorName")}</h2>
                <span className={styles.doctorBadge}>{SITE.name}</span>
                <p>{t("doctorText")}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <div className={styles.skillsSection}>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("skillsBadge")}</span>
              <h2>{t("skillsTitle")}</h2>
            </div>
            <Stagger className={styles.skillsGrid} gap={0.025}>
              {t("skills").map((skill, i) => {
                const SkillIcon = SKILL_ICONS[i % SKILL_ICONS.length];
                return (
                  <StaggerItem key={skill} y={12}>
                    <motion.div className={styles.skillTag} whileHover={{ scale: 1.04, y: -2 }} transition={{ duration: 0.2 }}>
                      <SkillIcon aria-hidden="true" />
                      {skill}
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <ScrollReveal>
            <div className={styles.clinicBox}>
              <Heartbeat weight="duotone" className={styles.clinicIcon} aria-hidden="true" />
              <h2>{t("clinicTitle")}</h2>
              <p>{t("clinicText")}</p>
              <a href="#randevu-formu" onClick={(e) => { e.preventDefault(); document.getElementById("randevu-formu")?.scrollIntoView({ behavior: "smooth" }); }} className={`${ui.btn} ${ui.btnPrimary}`}>
                {t("badge")} <ArrowRight className={styles.arrow} />
              </a>
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default React.memo(Idiopatik);
