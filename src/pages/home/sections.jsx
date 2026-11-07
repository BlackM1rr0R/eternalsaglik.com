// Extra home page sections: why us (bento), what home care is, trust & safety, regions ticker, final CTA.
import React from "react";
import { Link } from "react-router-dom";
import {
  HouseLine, Clock, FirstAidKit, ClipboardText, UsersThree, MapTrifold, Timer,
  Wheelchair, Bed, Heartbeat, Bandaids, TestTube, Syringe, Briefcase, Baby,
  HandSoap, Package, Signature, LockKey, Recycle, IdentificationCard,
  Check, Warning, MapPin, ArrowRight, Phone, WhatsappLogo, CalendarCheck, Sparkle,
  Stethoscope, Ambulance, Leaf,
} from "@phosphor-icons/react";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import { Stagger, StaggerItem, SpotlightCard, Parallax, Marquee, Magnetic, Float, CountUp } from "../../components/motion";
import { SITE, primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT, useLang } from "../../i18n";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";

const dict = {
  tr: {
    whyBadge: "Neden Eternal?",
    whyTitle: "Bakımı size getiren",
    whyAccent: "bir ekip",
    whyLead: "Hastaneye gitmenin zor, beklemenin yorucu olduğu anlarda; doktor, hemşire ve bakım hizmetlerini tek telefonla evinize planlıyoruz.",
    why: [
      { t: "Evinizin konforunda", d: "Yol, trafik ve bekleme salonu yok. Muayene, serum, tahlil ve bakım; hastanın kendini en güvende hissettiği yerde, tanıdık ortamında yapılır." },
      { t: "7 gün 24 saat", d: "Gece, hafta sonu ve bayram demeden telefon ve WhatsApp üzerinden ulaşabilirsiniz." },
      { t: "Tek ekipten çok hizmet", d: "Doktor ve hemşire ziyareti, IV serum, evde tahlil, yara bakımı, hasta bakımı ve özel ambulans." },
      { t: "Kişiye özel plan", d: "Önce dinliyoruz: hastanın durumu, ilaçları ve ihtiyacı netleştikten sonra ziyaret planlanır." },
      { t: "Aile her zaman bilgide", d: "Başka şehirde yaşasanız bile randevuyu siz oluşturabilir, ziyaret sonrası bilgilendirme alabilirsiniz." },
      { t: "Acil çağrıda ortalama", d: "dakika içinde adresteyiz. Hayati tehlikede önce 112'yi arayın." },
    ],
    regionsCount: "ilde hizmet",
    explBadge: "Rehber",
    explTitle: "Evde sağlık hizmeti nedir,",
    explAccent: "kimler için?",
    explText: "Evde sağlık hizmeti; muayene, tıbbi uygulama, numune alma ve bakım gibi işlemlerin bir doktor veya hemşire tarafından hastanın bulunduğu adreste yapılmasıdır. Hastanenin yerini tutmaz, ancak hastaneye gitmenin zor ya da gereksiz olduğu pek çok durumda konforlu ve pratik bir seçenektir.",
    whoTitle: "Kimler için uygun?",
    who: [
      "Hareket kısıtlılığı olan yaşlılar ve engelli bireyler",
      "Yatağa bağımlı hastalar ve uzun süreli bakım gerekenler",
      "Ameliyat sonrası iyileşme dönemindeki kişiler",
      "Tansiyon, şeker gibi düzenli takip gerektiren durumlar",
      "Yoğun çalışan, iş yerinde veya otelde hizmet isteyenler",
      "Yeni doğum yapmış anneler ve küçük çocuklu aileler",
    ],
    whatTitle: "Evde neler yapılabilir?",
    what: ["Doktor muayenesi", "Serum ve enjeksiyon", "Kan alma ve tahlil", "Yara bakımı ve pansuman", "Sonda ve bakım", "Tansiyon ve şeker takibi"],
    redTitle: "Evde beklemeyin, 112'yi arayın",
    redText: "Bilinç kaybı, şiddetli göğüs ağrısı, ağır nefes darlığı, felç belirtileri (yüzde kayma, konuşma bozukluğu) veya durmayan kanamada vakit kaybetmeden 112'yi arayın.",
    explMore: "Hizmetlerimizi inceleyin",
    trustBadge: "Güven ve güvenlik",
    trustTitle: "Evde de",
    trustAccent: "klinik özen",
    trustLead: "Evde yapılan her işlem, klinikte olduğu kadar özen ister. Güvenli bir ev ziyaretinin temel ilkeleri:",
    trust: [
      { t: "Hijyen", d: "İşlem öncesi ve sonrası el hijyeni, eldiven kullanımı ve temiz bir çalışma alanı hazırlanması." },
      { t: "Steril, tek kullanımlık malzeme", d: "İğne, kanül ve setler tek kullanımlıktır; ambalajı işlem sırasında açılır." },
      { t: "Bilgilendirme ve onam", d: "Uygulamadan önce ne yapılacağı, olası yan etkiler ve dikkat edilecekler anlatılır; onayınız alınır." },
      { t: "Hekim değerlendirmesi", d: "İlaç ve serum uygulamaları hekim önerisi veya reçeteye dayanır; uygun olmayan durumda işlem yapılmaz." },
      { t: "Tıbbi atık", d: "Kullanılan iğne ve malzemeler evde bırakılmaz, uygun şekilde toplanır." },
      { t: "KVKK ve mahremiyet", d: "Sağlık bilgileriniz yalnızca hizmet amacıyla, 6698 sayılı KVKK'ya uygun şekilde işlenir." },
    ],
    trustNote: "Her hastanın durumu farklıdır; tedavinizle ilgili kararlar için mutlaka doktorunuza danışın.",
    marqueeTitle: "Hizmet verdiğimiz bölgeler",
    hq: "Merkez",
    ctaEyebrow: "7 gün · 24 saat",
    ctaTitle: "Bugün bir ziyaret",
    ctaAccent: "planlayalım mı?",
    ctaText: "Online randevu formunu doldurun ya da arayın; hizmet, adres ve saati birlikte netleştirelim.",
    ctaBook: "Online Randevu",
    ctaCall: "Hemen arayın",
    ctaWa: "WhatsApp'tan yazın",
    waMsg: "Merhaba, evde sağlık hizmeti hakkında bilgi almak istiyorum.",
    services: ["Evde Doktor", "Evde Hemşire", "IV Serum", "Evde Tahlil", "Yara Bakımı", "Hasta Bakımı", "Özel Ambulans", "Geleneksel Tıp"],
  },
  en: {
    whyBadge: "Why Eternal?",
    whyTitle: "A team that brings",
    whyAccent: "care to you",
    whyLead: "When getting to hospital is hard and waiting is exhausting, we arrange doctor, nurse and care services at your home with a single call.",
    why: [
      { t: "In the comfort of home", d: "No travel, traffic or waiting rooms. Examinations, IV drips, lab tests and care take place where the patient feels safest, in familiar surroundings." },
      { t: "7 days, 24 hours", d: "Reach us by phone or WhatsApp at night, at weekends and on public holidays." },
      { t: "Many services, one team", d: "Doctor and nurse visits, IV drips, home lab tests, wound care, patient care and private ambulance." },
      { t: "A personal plan", d: "We listen first: the visit is planned once the patient's condition, medicines and needs are clear." },
      { t: "Family kept informed", d: "Even if you live in another city, you can book the visit yourself and receive an update afterwards." },
      { t: "Urgent calls: on average", d: "minutes to reach the address. In a life-threatening emergency, call 112 first." },
    ],
    regionsCount: "provinces served",
    explBadge: "Guide",
    explTitle: "What is home healthcare,",
    explAccent: "and who is it for?",
    explText: "Home healthcare means that examinations, medical procedures, sample collection and care are carried out by a doctor or nurse at the patient's address. It does not replace a hospital, but in many situations where going to hospital is difficult or unnecessary it is a comfortable, practical option.",
    whoTitle: "Who is it suitable for?",
    who: [
      "Older people and people with disabilities or limited mobility",
      "Bed-bound patients and those needing long-term care",
      "People recovering after surgery",
      "Conditions that need regular monitoring, such as blood pressure or diabetes",
      "Busy people who prefer a service at work or at their hotel",
      "New mothers and families with young children",
    ],
    whatTitle: "What can be done at home?",
    what: ["Doctor's examination", "IV drips and injections", "Blood draws and lab tests", "Wound care and dressings", "Catheter care", "Blood pressure and sugar checks"],
    redTitle: "Don't wait at home — call 112",
    redText: "For loss of consciousness, severe chest pain, serious shortness of breath, signs of stroke (facial drooping, slurred speech) or bleeding that will not stop, call 112 without delay.",
    explMore: "Explore our services",
    trustBadge: "Trust & safety",
    trustTitle: "Clinical care,",
    trustAccent: "at home too",
    trustLead: "Every procedure done at home deserves the same care as in a clinic. The core principles of a safe home visit:",
    trust: [
      { t: "Hygiene", d: "Hand hygiene before and after each procedure, gloves, and a clean working area." },
      { t: "Sterile, single-use materials", d: "Needles, cannulas and sets are single-use, and packs are opened at the time of the procedure." },
      { t: "Information and consent", d: "Before any procedure we explain what will be done, possible side effects and what to watch for, and ask for your consent." },
      { t: "Medical assessment", d: "Medicines and IV drips are based on a doctor's advice or prescription; if it is not appropriate, the procedure is not done." },
      { t: "Medical waste", d: "Used needles and materials are not left in the home; they are collected appropriately." },
      { t: "Privacy (KVKK)", d: "Your health information is processed only to provide the service, in line with Turkey's data protection law (KVKK, No. 6698)." },
    ],
    trustNote: "Every patient is different — always talk to your doctor about decisions regarding your treatment.",
    marqueeTitle: "Areas we serve",
    hq: "Base",
    ctaEyebrow: "7 days · 24 hours",
    ctaTitle: "Shall we plan",
    ctaAccent: "a visit today?",
    ctaText: "Fill in the online booking form or give us a call, and we'll confirm the service, address and time together.",
    ctaBook: "Book Online",
    ctaCall: "Call us now",
    ctaWa: "Message on WhatsApp",
    waMsg: "Hello, I'd like some information about home healthcare services.",
    services: ["Home Doctor", "Home Nurse", "IV Drips", "Home Lab Tests", "Wound Care", "Patient Care", "Private Ambulance", "Traditional Medicine"],
  },
  ar: {
    whyBadge: "لماذا إيترنال؟",
    whyTitle: "فريق يحمل",
    whyAccent: "الرعاية إليك",
    whyLead: "حين يصعب الذهاب إلى المستشفى ويُرهق الانتظار، ننظّم لك خدمات الطبيب والممرض والرعاية في منزلك بمكالمة واحدة.",
    why: [
      { t: "في راحة منزلك", d: "لا طريق ولا زحام ولا صالات انتظار. يُجرى الفحص والمحاليل والتحاليل والرعاية حيث يشعر المريض بأكبر قدر من الأمان، في محيطه المألوف." },
      { t: "٧ أيام، ٢٤ ساعة", d: "يمكنك التواصل معنا هاتفيًا أو عبر واتساب ليلًا وفي عطلات نهاية الأسبوع والأعياد." },
      { t: "خدمات كثيرة من فريق واحد", d: "زيارات الطبيب والممرض، والمحاليل الوريدية، والتحاليل المنزلية، والعناية بالجروح، ورعاية المرضى، والإسعاف الخاص." },
      { t: "خطة خاصة بكل مريض", d: "نستمع أولًا: تُخطَّط الزيارة بعد أن تتضح حالة المريض وأدويته واحتياجاته." },
      { t: "العائلة على اطلاع دائم", d: "حتى إن كنت تعيش في مدينة أخرى، يمكنك حجز الزيارة بنفسك وتلقي المعلومات بعدها." },
      { t: "في الحالات العاجلة نصل خلال", d: "دقيقة في المتوسط. في حالات الخطر على الحياة اتصل أولًا بالرقم 112." },
    ],
    regionsCount: "ولايات نخدمها",
    explBadge: "دليل",
    explTitle: "ما هي الرعاية الصحية المنزلية،",
    explAccent: "ولمن هي؟",
    explText: "الرعاية الصحية المنزلية تعني أن يقوم طبيب أو ممرض بالفحص والإجراءات الطبية وسحب العينات والرعاية في عنوان المريض. وهي لا تحلّ محل المستشفى، لكنها خيار مريح وعملي في كثير من الحالات التي يكون فيها الذهاب إلى المستشفى صعبًا أو غير ضروري.",
    whoTitle: "لمن تناسب؟",
    who: [
      "كبار السن وذوو الإعاقة أو محدودو الحركة",
      "المرضى طريحو الفراش ومن يحتاجون رعاية طويلة الأمد",
      "من هم في فترة التعافي بعد الجراحة",
      "الحالات التي تحتاج متابعة منتظمة مثل الضغط والسكري",
      "المشغولون الذين يفضّلون الخدمة في العمل أو الفندق",
      "الأمهات بعد الولادة والعائلات التي لديها أطفال صغار",
    ],
    whatTitle: "ما الذي يمكن إجراؤه في المنزل؟",
    what: ["فحص الطبيب", "المحاليل والحقن", "سحب الدم والتحاليل", "العناية بالجروح والضمادات", "العناية بالقسطرة", "متابعة الضغط والسكر"],
    redTitle: "لا تنتظر في المنزل — اتصل بـ 112",
    redText: "عند فقدان الوعي أو ألم الصدر الشديد أو ضيق التنفس الحاد أو علامات السكتة (ميلان الوجه، اضطراب الكلام) أو النزيف المستمر، اتصل بالرقم 112 فورًا.",
    explMore: "تعرّف على خدماتنا",
    trustBadge: "الثقة والسلامة",
    trustTitle: "عناية سريرية",
    trustAccent: "في المنزل أيضًا",
    trustLead: "كل إجراء يتم في المنزل يستحق العناية نفسها التي يحظى بها في العيادة. المبادئ الأساسية لزيارة منزلية آمنة:",
    trust: [
      { t: "النظافة", d: "تعقيم اليدين قبل كل إجراء وبعده، واستخدام القفازات، وتجهيز مكان عمل نظيف." },
      { t: "مواد معقّمة لاستخدام واحد", d: "الإبر والقنيات والأطقم تُستخدم مرة واحدة، وتُفتح عبوتها وقت الإجراء." },
      { t: "الشرح والموافقة", d: "قبل أي إجراء نشرح ما سيتم والآثار الجانبية المحتملة وما يجب الانتباه إليه، ونأخذ موافقتك." },
      { t: "تقييم الطبيب", d: "تستند الأدوية والمحاليل إلى توصية الطبيب أو الوصفة؛ وإن لم يكن الإجراء مناسبًا فلا يُجرى." },
      { t: "النفايات الطبية", d: "لا تُترك الإبر والمواد المستعملة في المنزل، بل تُجمع بالطريقة المناسبة." },
      { t: "الخصوصية (KVKK)", d: "تُعالَج بياناتك الصحية لغرض تقديم الخدمة فقط ووفق قانون حماية البيانات التركي رقم 6698." },
    ],
    trustNote: "تختلف حالة كل مريض؛ استشر طبيبك دائمًا في القرارات المتعلقة بعلاجك.",
    marqueeTitle: "المناطق التي نخدمها",
    hq: "المركز",
    ctaEyebrow: "٧ أيام · ٢٤ ساعة",
    ctaTitle: "هل نخطّط",
    ctaAccent: "لزيارة اليوم؟",
    ctaText: "املأ نموذج الحجز عبر الإنترنت أو اتصل بنا، ولنحدّد معًا الخدمة والعنوان والموعد.",
    ctaBook: "احجز عبر الإنترنت",
    ctaCall: "اتصل الآن",
    ctaWa: "راسلنا عبر واتساب",
    waMsg: "مرحبًا، أودّ الحصول على معلومات عن خدمات الرعاية الصحية المنزلية.",
    services: ["طبيب منزلي", "ممرض منزلي", "محاليل وريدية", "تحاليل منزلية", "العناية بالجروح", "رعاية المرضى", "إسعاف خاص", "الطب التقليدي"],
  },
};

const REGION_NAMES = {
  tr: SITE.regions,
  en: ["Sakarya", "Düzce", "Kocaeli", "Istanbul"],
  ar: ["سكاريا", "دوزجه", "كوجالي", "إسطنبول"],
};

const WHY_ICONS = [HouseLine, Clock, FirstAidKit, ClipboardText, UsersThree, Timer];
const WHY_TONES = ["teal", "violet", "blue", "amber", "rose", "green"];
const WHO_ICONS = [Wheelchair, Bed, Bandaids, Heartbeat, Briefcase, Baby];
const WHAT_ICONS = [Stethoscope, Syringe, TestTube, Bandaids, FirstAidKit, Heartbeat];
const TRUST_ICONS = [HandSoap, Package, Signature, IdentificationCard, Recycle, LockKey];
const SERVICE_ICONS = [Stethoscope, FirstAidKit, Syringe, TestTube, Bandaids, Bed, Ambulance, Leaf];

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

export const WhyEternal = () => {
  const t = useT(dict);
  const { meta } = useLang();
  const why = t("why");
  return (
    <section className={ui.section}>
      <Head badge={t("whyBadge")} title={t("whyTitle")} accent={t("whyAccent")} lead={t("whyLead")} />
      <Stagger className={styles.bento} gap={0.09}>
        {why.map((w, i) => {
          const Icon = WHY_ICONS[i];
          return (
            <StaggerItem key={i} className={`${styles.bentoItem} ${styles[`b${i}`]}`}>
              <SpotlightCard className={styles.bentoCard}>
                <Icon3D icon={<Icon weight="duotone" />} tone={WHY_TONES[i]} size={i === 0 ? 68 : 54} />
                {i === 5 ? (
                  <>
                    <h3>{w.t}</h3>
                    <p className={styles.bigNum}>
                      <CountUp from={0} to={30} duration={1.6} locale={meta.locale} />–<CountUp to={45} duration={2} locale={meta.locale} />
                    </p>
                    <p>{w.d}</p>
                  </>
                ) : (
                  <>
                    <h3>{w.t}</h3>
                    <p>{w.d}</p>
                  </>
                )}
                {i === 0 && (
                  <div className={styles.bentoChips}>
                    {t("services").slice(0, 6).map((s) => (
                      <span key={s}><Check weight="bold" /> {s}</span>
                    ))}
                  </div>
                )}
                {i === 1 && (
                  <Float className={styles.clockBadge} amplitude={6}>
                    <strong><bdi>24/7</bdi></strong>
                  </Float>
                )}
                {i === 4 && (
                  <p className={styles.regionsCount}>
                    <strong><CountUp to={SITE.regions.length} locale={meta.locale} /></strong> {t("regionsCount")}
                  </p>
                )}
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
};

export const HomeCareExplainer = () => {
  const t = useT(dict);
  const who = t("who");
  return (
    <section className={ui.section}>
      <div className={styles.explain}>
        <div className={styles.explainCopy}>
          <ScrollReveal>
            <span className={ui.badge}>{t("explBadge")}</span>
            <h2 className={styles.h2}>
              {t("explTitle")} <span className="accent">{t("explAccent")}</span>
            </h2>
            <p className={styles.lead}>{t("explText")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className={styles.h3}>{t("whatTitle")}</h3>
            <div className={styles.whatChips}>
              {t("what").map((w, i) => {
                const Icon = WHAT_ICONS[i];
                return <span key={w}><Icon weight="duotone" /> {w}</span>;
              })}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className={`${ui.note} ${ui.noteDanger} ${styles.red}`} role="note">
              <Warning weight="fill" />
              <div>
                <strong>{t("redTitle")}</strong>
                <p>{t("redText")}</p>
              </div>
            </div>
            <Link to="/hizmetlerimiz" className={`${ui.btn} ${ui.btnGhost} ${styles.moreBtn}`}>
              {t("explMore")} <ArrowRight weight="bold" className={styles.flip} />
            </Link>
          </ScrollReveal>
        </div>
        <Parallax speed={0.12} className={styles.explainSide}>
          <div className={styles.whoCard}>
            <h3 className={styles.h3}>{t("whoTitle")}</h3>
            <Stagger as="ul" className={styles.whoList} gap={0.07}>
              {who.map((w, i) => {
                const Icon = WHO_ICONS[i];
                return (
                  <StaggerItem as="li" key={w} y={16}>
                    <span className={styles.whoIcon}><Icon weight="duotone" /></span>
                    {w}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export const TrustSafety = () => {
  const t = useT(dict);
  return (
    <section className={`${ui.section} ${styles.trustSection}`}>
      <Head badge={t("trustBadge")} title={t("trustTitle")} accent={t("trustAccent")} lead={t("trustLead")} />
      <Stagger className={styles.trustGrid} gap={0.08}>
        {t("trust").map((it, i) => {
          const Icon = TRUST_ICONS[i];
          return (
            <StaggerItem key={it.t}>
              <SpotlightCard className={styles.trustCard}>
                <span className={styles.trustIcon}><Icon weight="duotone" /></span>
                <div>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </div>
                <span className={styles.trustNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
      <ScrollReveal>
        <p className={styles.trustNote}><Sparkle weight="fill" /> {t("trustNote")}</p>
      </ScrollReveal>
    </section>
  );
};

export const RegionsMarquee = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const regions = REGION_NAMES[lang] || REGION_NAMES.tr;
  const regionItems = [];
  for (let k = 0; k < 3; k += 1) {
    regions.forEach((r, i) => {
      regionItems.push(
        <span className={styles.regionPill} key={`${k}-${r}`}>
          <MapPin weight="fill" /> {r}
          {i === 0 && <em>{t("hq")}</em>}
        </span>
      );
    });
  }
  const services = t("services").map((s, i) => {
    const Icon = SERVICE_ICONS[i];
    return (
      <span className={styles.servicePill} key={s}>
        <Icon weight="duotone" /> {s}
      </span>
    );
  });
  return (
    <section className={styles.marqueeSection} aria-label={t("marqueeTitle")}>
      <ScrollReveal>
        <p className={styles.marqueeTitle}>{t("marqueeTitle")}</p>
      </ScrollReveal>
      <Marquee items={regionItems} speed={46} />
      <Marquee items={services} speed={52} reverse className={styles.marqueeB} />
    </section>
  );
};

export const FinalCta = () => {
  const t = useT(dict);
  return (
    <section className={ui.sectionTight}>
      <ScrollReveal>
        <div className={styles.cta}>
          <span className={`${styles.ctaOrb} ${styles.ctaOrbA}`} aria-hidden="true" />
          <span className={`${styles.ctaOrb} ${styles.ctaOrbB}`} aria-hidden="true" />
          <span className={styles.ctaEyebrow}><span className={styles.live} /> {t("ctaEyebrow")}</span>
          <h2>
            {t("ctaTitle")} <span className={styles.ctaAccent}>{t("ctaAccent")}</span>
          </h2>
          <p>{t("ctaText")}</p>
          <div className={styles.ctaRow}>
            <Magnetic>
              <Link to="/randevu" className={`${ui.btn} ${styles.ctaPrimary}`}>
                <CalendarCheck weight="duotone" /> {t("ctaBook")}
              </Link>
            </Magnetic>
            <a href={`tel:${primaryPhone.tel}`} className={`${ui.btn} ${styles.ctaGhost}`}>
              <Phone weight="duotone" /> <span>{t("ctaCall")} · <bdi>{primaryPhone.display}</bdi></span>
            </a>
            <a href={whatsappUrl(t("waMsg"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
              <WhatsappLogo weight="fill" /> {t("ctaWa")}
            </a>
          </div>
          <MapTrifold className={styles.ctaDeco} weight="duotone" aria-hidden="true" />
        </div>
      </ScrollReveal>
    </section>
  );
};
