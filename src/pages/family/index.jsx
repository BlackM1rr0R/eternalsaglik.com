import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  WhatsappLogo, ChatsCircle, ClipboardText, HouseLine, Checks, Stethoscope, FirstAid, PersonSimpleWalk, HandHeart,
  Gift, ArrowRight, Check, Pill, Scales, PersonSimple, Brain, ForkKnife, Thermometer, Bed, Bandaids, CalendarCheck,
  WarningCircle, Ambulance, ListChecks, Heartbeat,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import TiltCard from "../../components/tiltcard";
import CallbackForm from "../../components/callbackform";
import { Stagger, StaggerItem, SpotlightCard, Magnetic } from "../../components/motion";
import Faq from "../packages/faq";
import ui from "../../styles/ui.module.css";
import s from "./index.module.css";
import DoctorPhoto from "../../assets/images/doctor12.jpg";
import { packageGroups, translations as pkgTr } from "../../data/packages";
import { whatsappUrl } from "../../utils/whatsapp";
import { localize, useLang, useT } from "../../i18n";

const dict = {
  tr: {
    badge: "Aileniz İçin",
    title: "Uzakta Olsanız Bile",
    highlight: "Anneniz, Babanız Güvende",
    text: "Başka şehirde ya da yurt dışında yaşıyor olabilirsiniz. Yakınınızın sağlık ihtiyaçlarını siz planlayın, ekibimiz yanında olsun.",
    seoTitle: "Anne Babam İçin Evde Sağlık Hizmeti",
    seoDesc: "Başka şehirde yaşayanlar için yaşlı anne babaya evde doktor, hemşire ve düzenli takip. Ziyaret sonrası aileye WhatsApp bilgilendirmesi, ilk ziyaret kontrol listesi ve sık sorulanlar.",
    wa: "Yakınım İçin Yaz",
    waText: "Merhaba, başka şehirde yaşıyorum. Annem/babam için evde sağlık hizmeti almak istiyorum.",
    bookBtn: "Randevu Oluştur",
    signsBadge: "Fark etmek",
    signsTitle: "Yakınınızın evde desteğe ihtiyacı olabileceğini gösteren işaretler",
    signsText: "Bu işaretler tek başına bir hastalık anlamına gelmez; ancak bir sağlık değerlendirmesi için iyi bir başlangıç noktasıdır.",
    signs: [
      { t: "İlaçlarını karıştırıyor", d: "Dozları atlıyor, iki kez alıyor ya da hangi ilacı ne zaman alacağını hatırlamakta zorlanıyor." },
      { t: "Kilo kaybı veya iştahsızlık", d: "Buzdolabı boş kalıyor, öğünleri atlıyor ya da kıyafetleri bol gelmeye başladı." },
      { t: "Hareket etmekte zorlanıyor", d: "Kalkarken destek arıyor, sık sık sendeliyor ya da son zamanlarda düştü." },
      { t: "Unutkanlık ve dalgınlık", d: "Konuşmaları tekrar ediyor, randevuları kaçırıyor ya da günleri karıştırıyor." },
      { t: "Kişisel bakımı aksıyor", d: "Banyo yapmakta, giyinmekte ya da ev işlerinde zorlanmaya başladı." },
      { t: "Kontrolleri ertelemek", d: "Tansiyon, şeker ölçümlerini ya da doktor kontrollerini uzun süredir yaptırmıyor." },
      { t: "Yara veya cilt değişiklikleri", d: "İyileşmeyen yaralar, uzun süre yatmaya bağlı kızarıklıklar fark ettiniz." },
      { t: "Yeni taburcu oldu", d: "Hastaneden yeni çıktı ve evde ilaç, pansuman ya da serum ihtiyacı var." },
    ],
    signsNote: "Ani konuşma bozukluğu, yüzde kayma, bilinç bulanıklığı, şiddetli göğüs ağrısı veya nefes darlığı varsa beklemeden 112'yi arayın.",
    howBadge: "Nasıl çalışır?",
    howTitle: "4 adımda uzaktan bakım",
    howText: "Sizin bulunduğunuz yer önemli değil; planlama telefon ve WhatsApp üzerinden yürür.",
    steps: [
      { t: "Bize yazın veya arayın", d: "Nerede olursanız olun; yakınınızın adresini ve ihtiyacını WhatsApp'tan iletin." },
      { t: "Bakımı birlikte planlayalım", d: "Tek seferlik ziyaret mi, düzenli takip mi? Size uygun planı birlikte belirleyelim." },
      { t: "Ekibimiz yakınınızı ziyaret eder", d: "Doktor veya hemşiremiz belirlenen saatte evine gider, işlemleri yapar." },
      { t: "Size bilgi veririz", d: "Ziyaret sonrası yapılanlar hakkında WhatsApp'tan bilgilendiriliyorsunuz." },
    ],
    remote: [
      "Randevu saati sizinle ve yakınınızla birlikte belirlenir; yakınınız ziyaretten önce haberdar edilir.",
      "Bilgilendirme yapılacak kişiyi siz seçersiniz; birden fazla aile üyesi de olabilir.",
      "Yakınınızın onayı olmadan sağlık bilgileri üçüncü kişilerle paylaşılmaz.",
    ],
    afterBadge: "Ziyaret sonrası",
    afterTitle: "İçiniz rahat olsun",
    afterText: "Ziyaret bittiğinde size kısa bir bilgilendirme iletilir. Böylece yakınınızın durumunu uzaktan da takip edebilirsiniz. Dikkat gerektiren bir durum varsa sizinle iletişime geçilir.",
    afterList: [
      "Ziyarette yapılan işlemler",
      "Yapıldıysa ölçümlerin genel durumu",
      "Dikkat edilmesi gereken noktalar ve öneriler",
      "Gerekirse doktora başvuru önerisi",
      "Bir sonraki ziyaretin planı",
    ],
    chatHead: "Örnek bilgilendirme mesajı",
    chatTitle: "Ziyaret Özeti",
    chatItems: ["Yapılan işlemler", "Ölçümler ve genel durum", "Öneriler", "Sonraki ziyaret"],
    chatNote: "Bu görsel temsilidir; içerik her ziyarete göre değişir.",
    checkBadge: "Hazırlık",
    checkTitle: "İlk ziyaret için kontrol listesi",
    checkText: "Bunları önceden hazırlamak ziyaretin daha verimli geçmesine yardım eder. İşaretleyerek ilerleyebilirsiniz.",
    check: [
      "Kullandığı tüm ilaçların listesi (kutularıyla birlikte)",
      "Son reçeteler ve varsa epikriz (taburcu raporu)",
      "Son tahlil ve görüntüleme sonuçları",
      "Bilinen alerjiler ve kronik hastalıklar",
      "Takip eden doktorunun adı ve iletişim bilgisi",
      "Açık adres, kat / kapı bilgisi, gerekiyorsa bina giriş tarifi",
      "Ziyarette evde bulunacak kişinin adı ve telefonu",
      "Bilgilendirme yapılacak aile üyesinin numarası",
    ],
    checkProgress: "{done} / {total} hazır",
    checkWa: "Listeyi WhatsApp'tan Gönder",
    checkWaText: "Merhaba, annem/babam için ilk ziyareti planlamak istiyorum. Hazırladıklarım:",
    teamBadge: "Evinize kim gelecek?",
    teamTitle: "Ekibimizle tanışın",
    company: "ETERNAL Sağlık Hizmetleri",
    team: [
      { t: "Doktor", d: "Muayene, değerlendirme ve tedavi planı" },
      { t: "Hemşire", d: "Enjeksiyon, serum, sonda ve pansuman uygulamaları" },
      { t: "Fizik tedavi", d: "Evde egzersiz ve hareket desteği" },
      { t: "Hasta bakımı", d: "Günlük bakım, hijyen ve pozisyon desteği" },
      { t: "Ambulans ekibi", d: "Hastane, kontrol veya şehirler arası transfer" },
    ],
    pkgBadge: "Düzenli takip",
    pkgTitle: "Düzenli takip paketleri",
    pkgMore: "Detaylar",
    allPkgs: "Tüm paketler",
    gift: "Hediye Et",
    giftText: "Merhaba, bir yakınıma sağlık paketi hediye etmek istiyorum.",
    faqBadge: "Aileler soruyor",
    faqTitle: "Ailelerden gelen sorular",
    faq: [
      { q: "Ben başka şehirdeyim, randevuyu nasıl ayarlarım?", a: "WhatsApp'tan yakınınızın adresini, ihtiyacını ve uygun zamanları yazmanız yeterli. Saati sizinle ve yakınınızla birlikte teyit ederiz." },
      { q: "Ziyaret sırasında yakınımın yanında birinin olması gerekir mi?", a: "Zorunlu değildir; ancak özellikle ilk ziyarette yakınınızı tanıyan birinin evde olması, ilaç ve geçmiş bilgilerinin doğru aktarılmasına yardımcı olur." },
      { q: "Ziyaretten sonra bana nasıl bilgi veriliyor?", a: "Ziyaret bittiğinde belirlediğiniz kişiye WhatsApp veya telefonla genel bir bilgilendirme yapılır. Bilgilendirmenin kime yapılacağını siz belirlersiniz." },
      { q: "Annem / babam evde sağlık hizmeti istemiyor, ne yapabilirim?", a: "Bu çok sık karşılaşılan bir durum. İlk ziyareti kısa bir tanışma ve genel kontrol olarak planlamak çoğu zaman güven oluşturur. Yakınınızın rızası her zaman önceliğimizdir." },
      { q: "Ödemeyi ben uzaktan yapabilir miyim?", a: "Ödeme seçeneklerini WhatsApp'tan bize sorabilirsiniz; planlama sırasında size uygun yolu birlikte netleştiririz." },
      { q: "Düzenli takip ne sıklıkla olmalı?", a: "Bu, yakınınızın durumuna ve doktorunun önerisine bağlıdır. Haftalık veya aylık planlar yapılabilir; ihtiyaç değiştikçe plan güncellenir." },
      { q: "Hastaneye gitmesi gereken bir durum olursa?", a: "Ekibimiz gerekli gördüğünde hastaneye başvurmayı önerir ve sizi bilgilendirir. İsterseniz özel ambulans ile transfer de planlanabilir. Acil durumlarda 112 aranmalıdır." },
    ],
    cbTitle: "Sizi arayalım, birlikte planlayalım",
  },
  en: {
    badge: "For Your Family",
    title: "Even When You're Far Away,",
    highlight: "Your Parents Are in Good Hands",
    text: "You may live in another city or abroad. You plan your relative's health needs; our team is there by their side.",
    seoTitle: "Home Healthcare for My Parents",
    seoDesc: "Home doctor, nurse and regular follow-up for older parents, arranged by family members living elsewhere. Updates to the family after each visit, a first-visit checklist and FAQ.",
    wa: "Message Us About My Relative",
    waText: "Hello, I live in another city. I would like home healthcare for my mother/father.",
    bookBtn: "Book a Visit",
    signsBadge: "Noticing the signs",
    signsTitle: "Signs your relative may need support at home",
    signsText: "None of these signs means an illness on its own, but they are a good reason to arrange a health check.",
    signs: [
      { t: "Mixing up medicines", d: "Missing doses, taking them twice or struggling to remember what to take when." },
      { t: "Weight loss or poor appetite", d: "The fridge stays empty, meals are skipped or clothes have become loose." },
      { t: "Difficulty getting around", d: "Needing support to stand, often unsteady or a recent fall." },
      { t: "Forgetfulness", d: "Repeating conversations, missing appointments or mixing up days." },
      { t: "Personal care slipping", d: "Finding it hard to bathe, dress or manage housework." },
      { t: "Putting off check-ups", d: "No blood pressure or glucose readings or doctor's visits for a long time." },
      { t: "Wounds or skin changes", d: "Wounds that don't heal, or redness from lying in bed for long periods." },
      { t: "Recently discharged", d: "Just home from hospital and needing medicines, dressings or IV fluids." },
    ],
    signsNote: "Sudden difficulty speaking, a drooping face, confusion, severe chest pain or difficulty breathing: call 112 straight away.",
    howBadge: "How it works",
    howTitle: "Remote care in 4 steps",
    howText: "Wherever you are, planning happens by phone and WhatsApp.",
    steps: [
      { t: "Message or call us", d: "Wherever you are, send us your relative's address and what they need on WhatsApp." },
      { t: "We plan the care together", d: "A one-off visit or regular follow-up? We agree on the plan that suits you." },
      { t: "Our team visits your relative", d: "Our doctor or nurse goes to their home at the agreed time and carries out the care." },
      { t: "We keep you informed", d: "After the visit you receive an update on WhatsApp about what was done." },
    ],
    remote: [
      "The visit time is agreed with you and your relative; your relative is told before we arrive.",
      "You choose who receives updates; it can be more than one family member.",
      "Health information is not shared with third parties without your relative's consent.",
    ],
    afterBadge: "After the visit",
    afterTitle: "Peace of mind",
    afterText: "When the visit ends, you receive a short update, so you can follow your relative's situation from afar. If anything needs attention, we contact you.",
    afterList: [
      "What was done during the visit",
      "The general picture from any readings taken",
      "Points to watch and recommendations",
      "Advice to see a doctor, if needed",
      "The plan for the next visit",
    ],
    chatHead: "Sample update message",
    chatTitle: "Visit Summary",
    chatItems: ["Care provided", "Readings and general condition", "Recommendations", "Next visit"],
    chatNote: "Illustrative only; the content varies with each visit.",
    checkBadge: "Getting ready",
    checkTitle: "Checklist for the first visit",
    checkText: "Having these ready helps the visit go smoothly. Tick them off as you go.",
    check: [
      "A list of all current medicines (with their boxes)",
      "Recent prescriptions and any discharge summary",
      "Recent test and imaging results",
      "Known allergies and long-term conditions",
      "Name and contact details of their doctor",
      "Full address, floor / door and directions to the entrance if needed",
      "Name and phone number of whoever will be at home",
      "Number of the family member who should receive updates",
    ],
    checkProgress: "{done} / {total} ready",
    checkWa: "Send the List on WhatsApp",
    checkWaText: "Hello, I would like to plan a first visit for my mother/father. What I have ready:",
    teamBadge: "Who will visit?",
    teamTitle: "Meet our team",
    company: "ETERNAL Health Services",
    team: [
      { t: "Doctor", d: "Examination, assessment and treatment plan" },
      { t: "Nurse", d: "Injections, IV drips, catheter care and dressings" },
      { t: "Physiotherapy", d: "Exercise and mobility support at home" },
      { t: "Patient care", d: "Daily care, hygiene and positioning support" },
      { t: "Ambulance team", d: "Transfers to hospital, check-ups or other cities" },
    ],
    pkgBadge: "Regular follow-up",
    pkgTitle: "Regular follow-up packages",
    pkgMore: "Details",
    allPkgs: "All packages",
    gift: "Give as a Gift",
    giftText: "Hello, I would like to give a health package to a relative as a gift.",
    faqBadge: "Families ask",
    faqTitle: "Questions from families",
    faq: [
      { q: "I live in another city. How do I arrange a visit?", a: "Just send us your relative's address, what they need and convenient times on WhatsApp. We confirm the time with you and your relative." },
      { q: "Does someone need to be with my relative during the visit?", a: "It isn't required, but especially for the first visit it helps to have someone at home who knows your relative, so medicines and history are passed on accurately." },
      { q: "How will I be updated after the visit?", a: "When the visit ends, the person you choose receives a general update by WhatsApp or phone. You decide who receives it." },
      { q: "My mother / father doesn't want home care. What can I do?", a: "This is very common. Planning the first visit as a short introduction and general check often builds trust. Your relative's consent always comes first." },
      { q: "Can I pay remotely?", a: "Ask us about payment options on WhatsApp; we agree on the most convenient way with you when planning." },
      { q: "How often should follow-up visits be?", a: "It depends on your relative's condition and their doctor's advice. Weekly or monthly plans are possible and are updated as needs change." },
      { q: "What if they need to go to hospital?", a: "If our team thinks it necessary, they will advise a hospital visit and let you know. A private ambulance transfer can be arranged if you wish. In an emergency, call 112." },
    ],
    cbTitle: "Let us call you and plan together",
  },
  ar: {
    badge: "لعائلتك",
    title: "حتى وإن كنتم بعيدين،",
    highlight: "والداكم في أيدٍ أمينة",
    text: "قد تعيشون في مدينة أخرى أو خارج البلاد. خططوا أنتم لاحتياجات قريبكم الصحية، وفريقنا سيكون بجانبه.",
    seoTitle: "رعاية صحية منزلية لوالديّ",
    seoDesc: "طبيب وممرض ومتابعة منتظمة في المنزل للوالدين المسنين، يرتبها أفراد العائلة المقيمون بعيداً. إبلاغ العائلة بعد كل زيارة وقائمة تحضير للزيارة الأولى وأسئلة شائعة.",
    wa: "راسلونا بشأن قريبي",
    waText: "مرحباً، أعيش في مدينة أخرى وأرغب في خدمة صحية منزلية لوالدتي/والدي.",
    bookBtn: "احجز زيارة",
    signsBadge: "ملاحظة العلامات",
    signsTitle: "علامات تدل على أن قريبكم قد يحتاج إلى دعم في المنزل",
    signsText: "لا تعني هذه العلامات وحدها وجود مرض، لكنها سبب جيد لترتيب فحص صحي.",
    signs: [
      { t: "الخلط بين الأدوية", d: "ينسى الجرعات أو يأخذها مرتين أو يصعب عليه تذكر مواعيدها." },
      { t: "فقدان الوزن أو الشهية", d: "الثلاجة فارغة، أو يتخطى الوجبات، أو أصبحت ملابسه واسعة." },
      { t: "صعوبة في الحركة", d: "يحتاج إلى مساعدة للنهوض، أو يتعثر كثيراً، أو سقط مؤخراً." },
      { t: "النسيان والشرود", d: "يكرر الأحاديث أو يفوّت المواعيد أو يخلط بين الأيام." },
      { t: "تراجع العناية الشخصية", d: "يجد صعوبة في الاستحمام أو ارتداء الملابس أو الأعمال المنزلية." },
      { t: "تأجيل الفحوصات", d: "لم يقس الضغط أو السكر أو يراجع الطبيب منذ مدة طويلة." },
      { t: "جروح أو تغيرات في الجلد", d: "جروح لا تلتئم أو احمرار بسبب الاستلقاء الطويل." },
      { t: "خرج حديثاً من المستشفى", d: "عاد للتو إلى المنزل ويحتاج أدوية أو ضمادات أو محاليل." },
    ],
    signsNote: "عند صعوبة مفاجئة في الكلام، أو ميلان في الوجه، أو تشوش الوعي، أو ألم شديد في الصدر، أو ضيق في التنفس: اتصلوا فوراً بالرقم 112.",
    howBadge: "كيف تعمل؟",
    howTitle: "رعاية عن بُعد في 4 خطوات",
    howText: "أينما كنتم، يتم التخطيط عبر الهاتف وواتساب.",
    steps: [
      { t: "راسلونا أو اتصلوا بنا", d: "أينما كنتم، أرسلوا عنوان قريبكم واحتياجه عبر واتساب." },
      { t: "نخطط للرعاية معاً", d: "زيارة واحدة أم متابعة منتظمة؟ نتفق على الخطة المناسبة لكم." },
      { t: "يزور فريقنا قريبكم", d: "يذهب طبيبنا أو الممرض إلى منزله في الوقت المحدد ويقدم الرعاية." },
      { t: "نبقيكم على اطلاع", d: "بعد الزيارة تصلكم معلومات عبر واتساب عما تم." },
    ],
    remote: [
      "يُحدَّد موعد الزيارة معكم ومع قريبكم، ويُبلَّغ قريبكم قبل وصولنا.",
      "أنتم تختارون من يتلقى المعلومات، ويمكن أن يكون أكثر من فرد في العائلة.",
      "لا تُشارَك المعلومات الصحية مع أطراف أخرى دون موافقة قريبكم.",
    ],
    afterBadge: "بعد الزيارة",
    afterTitle: "اطمئنوا",
    afterText: "عند انتهاء الزيارة تصلكم معلومات موجزة، لتتابعوا حالة قريبكم عن بُعد. وإذا كان هناك ما يستدعي الانتباه نتواصل معكم.",
    afterList: [
      "الإجراءات التي تمت خلال الزيارة",
      "الصورة العامة للقياسات إن أُجريت",
      "نقاط تستحق الانتباه وتوصيات",
      "نصيحة بمراجعة الطبيب عند الحاجة",
      "خطة الزيارة التالية",
    ],
    chatHead: "مثال على رسالة المعلومات",
    chatTitle: "ملخص الزيارة",
    chatItems: ["الإجراءات المقدمة", "القياسات والحالة العامة", "التوصيات", "الزيارة التالية"],
    chatNote: "صورة توضيحية فقط؛ يختلف المحتوى حسب كل زيارة.",
    checkBadge: "التحضير",
    checkTitle: "قائمة التحضير للزيارة الأولى",
    checkText: "تجهيز هذه الأمور مسبقاً يساعد على أن تكون الزيارة أكثر فائدة. ضعوا علامة على ما أنجزتموه.",
    check: [
      "قائمة بجميع الأدوية المستخدمة (مع العلب)",
      "آخر الوصفات وتقرير الخروج من المستشفى إن وجد",
      "نتائج آخر التحاليل والأشعة",
      "الحساسية المعروفة والأمراض المزمنة",
      "اسم الطبيب المتابع ورقم التواصل معه",
      "العنوان الكامل والطابق والباب ووصف المدخل عند الحاجة",
      "اسم ورقم الشخص الذي سيكون في المنزل",
      "رقم فرد العائلة الذي سيتلقى المعلومات",
    ],
    checkProgress: "{done} / {total} جاهز",
    checkWa: "أرسل القائمة عبر واتساب",
    checkWaText: "مرحباً، أود ترتيب الزيارة الأولى لوالدتي/والدي. ما جهزته:",
    teamBadge: "من سيزوركم؟",
    teamTitle: "تعرّفوا على فريقنا",
    company: "إيترنال للخدمات الصحية",
    team: [
      { t: "الطبيب", d: "الفحص والتقييم وخطة العلاج" },
      { t: "الممرض", d: "الحقن والمحاليل والقسطرة والضمادات" },
      { t: "العلاج الطبيعي", d: "دعم التمارين والحركة في المنزل" },
      { t: "رعاية المريض", d: "الرعاية اليومية والنظافة وتغيير الوضعية" },
      { t: "فريق الإسعاف", d: "النقل إلى المستشفى أو المراجعة أو مدينة أخرى" },
    ],
    pkgBadge: "متابعة منتظمة",
    pkgTitle: "باقات المتابعة المنتظمة",
    pkgMore: "التفاصيل",
    allPkgs: "كل الباقات",
    gift: "أهدِ الآن",
    giftText: "مرحباً، أود إهداء باقة صحية لأحد أقاربي.",
    faqBadge: "أسئلة العائلات",
    faqTitle: "أسئلة من العائلات",
    faq: [
      { q: "أعيش في مدينة أخرى، كيف أرتب الموعد؟", a: "يكفي أن ترسلوا عبر واتساب عنوان قريبكم واحتياجه والأوقات المناسبة. نؤكد الموعد معكم ومع قريبكم." },
      { q: "هل يجب أن يكون أحد مع قريبي أثناء الزيارة؟", a: "ليس إلزامياً، لكن وجود شخص يعرف قريبكم، خاصة في الزيارة الأولى، يساعد على نقل معلومات الأدوية والتاريخ الصحي بدقة." },
      { q: "كيف أُبلَّغ بعد الزيارة؟", a: "عند انتهاء الزيارة يتلقى الشخص الذي تحددونه معلومات عامة عبر واتساب أو الهاتف. أنتم تقررون من يتلقاها." },
      { q: "والدتي / والدي لا يرغب في الرعاية المنزلية، ماذا أفعل؟", a: "هذا أمر شائع جداً. غالباً ما يبني التخطيط للزيارة الأولى كتعارف قصير وفحص عام الثقة. موافقة قريبكم تأتي دائماً أولاً." },
      { q: "هل يمكنني الدفع عن بُعد؟", a: "اسألونا عن خيارات الدفع عبر واتساب، ونتفق معكم على الطريقة الأنسب أثناء التخطيط." },
      { q: "كم مرة يجب أن تكون المتابعة؟", a: "يعتمد ذلك على حالة قريبكم وتوصية طبيبه. يمكن وضع خطط أسبوعية أو شهرية، وتُحدَّث مع تغير الاحتياج." },
      { q: "ماذا لو احتاج الذهاب إلى المستشفى؟", a: "إذا رأى فريقنا ذلك ضرورياً، ينصح بمراجعة المستشفى ويبلغكم. ويمكن ترتيب النقل بإسعاف خاص إن رغبتم. في الطوارئ اتصلوا بالرقم 112." },
    ],
    cbTitle: "دعونا نتصل بكم ونخطط معاً",
  },
};

const SIGN_ICONS = [Pill, Scales, PersonSimple, Brain, HandHeart, Thermometer, Bandaids, Bed];
const STEP_ICONS = [ChatsCircle, ClipboardText, HouseLine, Checks];
const STEP_TONES = ["teal", "blue", "amber", "green"];
const TEAM_ICONS = [Stethoscope, FirstAid, PersonSimpleWalk, HandHeart, Ambulance];
const CHAT_ICONS = [Check, Heartbeat, ListChecks, CalendarCheck];

const Family = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const [done, setDone] = useState([]);
  const regular = useMemo(() => {
    const g = packageGroups.find((x) => x.id === "duzenli");
    return { ...localize(g, pkgTr, lang, "id"), items: g.items.map((it) => localize(it, pkgTr, lang, "id")) };
  }, [lang]);

  const checklist = t("check");
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const checkMsg = `${t("checkWaText")}\n${checklist.map((c, i) => `${done.includes(i) ? "✓" : "○"} ${c}`).join("\n")}`;

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/aileniz-icin">
        <div className={ui.btnRow}>
          <Magnetic>
            <a href={whatsappUrl(t("waText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
              <WhatsappLogo /> {t("wa")}
            </a>
          </Magnetic>
          <Link to="/randevu" state={{ service: "Evde Doktor Hizmeti" }} className={`${ui.btn} ${ui.btnGhost}`}>{t("bookBtn")}</Link>
        </div>
      </PageHero>

      <Wrapper>
        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("signsBadge")}</span>
              <h2>{t("signsTitle")}</h2>
              <p>{t("signsText")}</p>
            </div>
          </ScrollReveal>
          <Stagger className={s.signs} gap={0.06}>
            {t("signs").map((x, i) => {
              const Icon = SIGN_ICONS[i] || ForkKnife;
              return (
                <StaggerItem key={x.t} y={20}>
                  <div className={s.sign}>
                    <Icon />
                    <div><strong>{x.t}</strong><span>{x.d}</span></div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <ScrollReveal>
            <div className={`${ui.note} ${ui.noteDanger}`} style={{ marginTop: 22 }}>
              <WarningCircle /> <span>{t("signsNote")}</span>
            </div>
          </ScrollReveal>
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("howBadge")}</span>
              <h2>{t("howTitle")}</h2>
              <p>{t("howText")}</p>
            </div>
          </ScrollReveal>
          <Stagger className={ui.grid}>
            {t("steps").map((st, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <StaggerItem key={st.t}>
                  <SpotlightCard className={ui.card} style={{ height: "100%" }}>
                    <span className={s.stepNo}>0{i + 1}</span>
                    <div style={{ marginTop: 10 }}><Icon3D icon={<Icon />} tone={STEP_TONES[i]} size={56} /></div>
                    <h3>{st.t}</h3>
                    <p>{st.d}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
          <ScrollReveal>
            <ul className={s.receive} style={{ maxWidth: 760, margin: "28px auto 0" }}>
              {t("remote").map((x) => <li key={x}><Check weight="bold" /> {x}</li>)}
            </ul>
          </ScrollReveal>
        </section>

        <section className={ui.section}>
          <div className={ui.grid2} style={{ alignItems: "center" }}>
            <ScrollReveal direction="right">
              <div>
                <span className={ui.badge}>{t("afterBadge")}</span>
                <h2 style={{ color: "var(--text)" }}>{t("afterTitle")}</h2>
                <p style={{ color: "var(--text-secondary)" }}>{t("afterText")}</p>
                <ul className={s.receive}>
                  {t("afterList").map((x) => <li key={x}><Check weight="bold" /> {x}</li>)}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              {/* Illustrative example of the post-visit message; no real patient data. */}
              <motion.div className={`${ui.card} ${s.chat}`} initial={{ rotate: -2 }} whileHover={{ rotate: 0, scale: 1.02 }}>
                <p className={s.chatHead}><WhatsappLogo style={{ color: "var(--wa)" }} /> {t("chatHead")}</p>
                <div className={s.bubble}>
                  <strong>{t("chatTitle")}</strong>
                  <ul>
                    {t("chatItems").map((x, i) => {
                      const Icon = CHAT_ICONS[i];
                      return (
                        <motion.li key={x} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.15 }}>
                          <Icon /> {x}
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
                <p className={ui.hint} style={{ margin: "10px 0 0" }}>{t("chatNote")}</p>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("checkBadge")}</span>
              <h2>{t("checkTitle")}</h2>
              <p>{t("checkText")}</p>
            </div>
          </ScrollReveal>
          <p className={s.progressText} aria-live="polite">{t("checkProgress", { done: done.length, total: checklist.length })}</p>
          <div className={s.progress}>
            <motion.span animate={{ width: `${(done.length / checklist.length) * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 22 }} />
          </div>
          <Stagger className={s.check} gap={0.05}>
            {checklist.map((c, i) => {
              const on = done.includes(i);
              return (
                <StaggerItem key={c} y={14}>
                  <button type="button" className={`${s.checkItem} ${on ? s.checkDone : ""}`} aria-pressed={on} onClick={() => toggle(i)}>
                    <span className={s.box}>
                      {on && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: "grid" }}>
                          <Check weight="bold" size={14} />
                        </motion.span>
                      )}
                    </span>
                    <span>{c}</span>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className={ui.btnRow}>
            <a href={whatsappUrl(checkMsg)} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
              <WhatsappLogo /> {t("checkWa")}
            </a>
          </div>
        </section>

        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("teamBadge")}</span>
              <h2>{t("teamTitle")}</h2>
            </div>
          </ScrollReveal>
          <div className={ui.grid2} style={{ alignItems: "stretch" }}>
            <ScrollReveal direction="right">
              <TiltCard className={`${ui.card} ${s.doctor}`}>
                <img src={DoctorPhoto} alt="Uzm. Dr. Atakan Bayrak" loading="lazy" />
                <div>
                  <h3 style={{ marginTop: 0 }}>Uzm. Dr. Atakan Bayrak</h3>
                  <p>{t("company")}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <div className={ui.card} style={{ height: "100%" }}>
                {t("team").map((m, i) => {
                  const Icon = TEAM_ICONS[i];
                  return (
                    <div key={m.t} className={s.role}>
                      <Icon3D icon={<Icon />} size={44} tone={STEP_TONES[i % STEP_TONES.length]} />
                      <div><strong>{m.t}</strong><p>{m.d}</p></div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("pkgBadge")}</span>
              <h2>{t("pkgTitle")}</h2>
              <p>{regular.subtitle}</p>
            </div>
          </ScrollReveal>
          <Stagger className={ui.grid}>
            {regular.items.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.id}>
                  <TiltCard className={`${ui.card} ${ui.glowBorder}`} style={{ height: "100%" }} max={5}>
                    <div className={s.pkg}>
                      <div><Icon3D icon={<Icon />} tone={p.tone} size={50} /></div>
                      <h3>{p.name}</h3>
                      <span className={ui.hint}>{p.period}</span>
                      <p>{p.desc}</p>
                      <Link to={`/paketler#${p.id}`} className={s.pkgLink}>{t("pkgMore")} <ArrowRight /></Link>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className={ui.btnRow}>
            <Link to="/paketler" className={`${ui.btn} ${ui.btnPrimary}`}>{t("allPkgs")} <ArrowRight /></Link>
            <a href={whatsappUrl(t("giftText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnGhost}`}>
              <Gift /> {t("gift")}
            </a>
          </div>
        </section>

        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("faqBadge")}</span>
              <h2>{t("faqTitle")}</h2>
            </div>
          </ScrollReveal>
          <Faq items={t("faq")} />
        </section>

        <CallbackForm title={t("cbTitle")} source="Aileniz için" />
      </Wrapper>
    </>
  );
};

export default Family;
