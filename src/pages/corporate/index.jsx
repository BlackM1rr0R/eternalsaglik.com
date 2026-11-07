import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  BuildingApartment, Factory, Buildings, HouseLine, WhatsappLogo, Envelope, Check, Lightbulb, ListChecks, Handshake,
  Translate, Clock, MapPin, ShieldCheck, UsersThree, Info, CheckCircle,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import Icon3D from "../../components/icon3d";
import { Stagger, StaggerItem, SpotlightCard, Magnetic } from "../../components/motion";
import Faq from "../packages/faq";
import ui from "../../styles/ui.module.css";
import s from "./index.module.css";
import { SITE } from "../../config/site";
import { buildMessage, isValidPhone, openWhatsApp, whatsappUrl } from "../../utils/whatsapp";
import { trackEvent } from "../../utils/analytics";
import { useT } from "../../i18n";
import { toast } from "../../components/toast";

const SEG_META = [
  { id: "otel", icon: BuildingApartment, tone: "teal" },
  { id: "fabrika", icon: Factory, tone: "amber" },
  { id: "ofis", icon: Buildings, tone: "blue" },
  { id: "huzurevi", icon: HouseLine, tone: "rose" },
];
const SECTORS = ["otel", "fabrika", "ofis", "huzurevi", "okul", "diger"];
const SIZES = ["1-20", "21-50", "51-200", "200+"];
const NEEDS = ["hemsire", "doktor", "serum", "tarama", "tahlil", "misafir", "diger"];
const WHY_ICONS = [MapPin, Clock, Translate, ShieldCheck, UsersThree, Handshake];

const dict = {
  tr: {
    badge: "Kurumsal",
    title: "Kurumlar İçin",
    highlight: "Sağlık Çözümleri",
    text: "Oteller, fabrikalar, ofisler ve huzurevleri için sözleşmeli sağlık hizmeti. İhtiyacınızı yazın, size özel teklif hazırlayalım.",
    seoTitle: "Kurumsal Sağlık Hizmeti – Otel, Fabrika, Ofis, Huzurevi",
    seoDesc: "Sakarya ve çevresinde şirketlere sözleşmeli hemşire, ofiste serum günü, check-up, tahlil günü, huzurevlerine düzenli doktor ve hemşire ziyareti, otel misafirlerine sağlık hizmeti.",
    heroQuote: "Teklif İsteyin",
    heroWa: "WhatsApp'tan Yazın",
    heroWaText: "Merhaba, kurumumuz için sağlık hizmeti hakkında bilgi almak istiyorum.",
    segBadge: "Sektörler",
    segTitle: "Kurumunuza göre hizmet",
    segText: "Her kurumun ihtiyacı farklıdır. Sektörünüzü seçin, neler yapabileceğimizi görün.",
    useCases: "Kullanım örnekleri",
    included: "Neler dahil olabilir?",
    segments: {
      otel: {
        t: "Oteller",
        intro: "Misafiriniz odasında rahatsızlandığında hızlı ve sakin bir çözüm. Resepsiyonunuz bizi arar, ekibimiz odaya gelir.",
        uses: ["Gece rahatsızlanan bir misafir için oda ziyareti", "Uzun yolculuk sonrası yorgun misafire serum", "Yabancı misafirle kendi dilinde iletişim", "Hastaneye transfer gereken durumlarda ambulans koordinasyonu"],
        items: ["Misafirlere odada doktor ve serum", "Türkçe / İngilizce / Arapça iletişim", "7/24 çağrı", "Resepsiyon ekibi için kısa bir çağrı akışı"],
      },
      fabrika: {
        t: "Fabrikalar",
        intro: "Üretim temposunu bozmadan çalışanlarınıza sağlık desteği. Taramalar ve tahlil günleri işyerinizde planlanır.",
        uses: ["Vardiya düzenine göre planlanan tahlil günü", "Mevsim geçişlerinde genel sağlık taraması", "Belirli günlerde hemşire desteği", "Çalışanlar için toplu tansiyon / şeker ölçümü"],
        items: ["Sözleşmeli hemşire / sağlık personeli", "Periyodik sağlık taramaları", "İşyerinde tahlil günleri", "Sonuçların çalışana bireysel iletilmesi"],
      },
      ofis: {
        t: "Ofisler",
        intro: "Çalışan memnuniyetine yönelik, gönüllü katılımlı sağlık günleri. Ofisinizde küçük bir oda yeterli.",
        uses: ["Yoğun dönem öncesi ofiste serum günü", "Çalışanlar için check-up günü", "Grip mevsimi öncesi bilgilendirme ve destek programı", "Yönetici ekipler için randevulu check-up"],
        items: ["Ofiste serum günü", "Çalışan check-up paketleri", "Grip mevsimi bağışıklık programı", "Her katılımcı için ön değerlendirme"],
      },
      huzurevi: {
        t: "Huzurevleri",
        intro: "Sakinlerinizin düzenli takibine destek. Kurumunuzun sağlık ekibiyle uyumlu çalışan ziyaret planı.",
        uses: ["Haftalık doktor ve hemşire ziyareti", "Yatağa bağımlı sakinler için dekubit bakımı", "Kurumda kan alma ve tahlil takibi", "Taburcu olan sakinler için geçiş dönemi bakımı"],
        items: ["Düzenli doktor ve hemşire ziyareti", "Yara ve dekubit bakımı", "Tahlil ve ilaç takibi", "Bakım personeline uygulamalı bilgilendirme"],
      },
    },
    legal: "İş sağlığı ve güvenliği mevzuatından doğan yükümlülükler (işyeri hekimi, OSGB hizmetleri) ayrı bir konudur. Teklif aşamasında hangi hizmetin bu kapsamda olduğunu sizinle netleştiririz.",
    obBadge: "Başlangıç",
    obTitle: "Kurumsal çalışma nasıl başlar?",
    onboarding: [
      { t: "İhtiyacınızı yazın", d: "Formu doldurun veya WhatsApp'tan yazın: kurum, kişi sayısı ve beklentiniz." },
      { t: "Ön görüşme", d: "Telefonda veya yerinde kısa bir görüşmeyle ihtiyaçlarınızı netleştiririz." },
      { t: "Size özel teklif", d: "Hizmet kapsamı, sıklık ve takvimle birlikte yazılı teklif iletiriz." },
      { t: "Başlangıç ve takip", d: "Anlaşılan plana göre hizmet başlar; düzenli aralıklarla birlikte gözden geçiririz." },
    ],
    whyBadge: "Neden ETERNAL?",
    whyTitle: "Kurumlarla çalışırken önem verdiklerimiz",
    why: [
      { t: "Bölgesel hizmet", d: "Sakarya, Düzce, Kocaeli ve İstanbul." },
      { t: "7 gün / 24 saat", d: "Oteller ve acil çağrılar için kesintisiz iletişim." },
      { t: "Çok dilli iletişim", d: "Türkçe, İngilizce ve Arapça." },
      { t: "Gizlilik", d: "Çalışan ve misafir sağlık bilgileri KVKK'ya uygun şekilde korunur." },
      { t: "Esnek planlama", d: "Vardiya, sezon ve etkinlik takvimine göre." },
      { t: "Tek iletişim noktası", d: "Planlama ve takip için belirli bir iletişim kanalı." },
    ],
    formTitle: "Teklif isteyin",
    formText: "Bilgileriniz sunucuya kaydedilmez; WhatsApp veya e-posta mesajı olarak hazırlanır.",
    company: "Kurum adı",
    sector: "Sektör",
    size: "Çalışan / oda sayısı",
    name: "Yetkili adı",
    phone: "Telefon",
    email: "E-posta",
    needsLabel: "İhtiyacınız",
    note: "Not",
    sectors: { otel: "Otel", fabrika: "Fabrika", ofis: "Ofis", huzurevi: "Huzurevi", okul: "Okul", diger: "Diğer" },
    needs: { hemsire: "Sözleşmeli hemşire", doktor: "Doktor ziyareti", serum: "Toplu serum günü", tarama: "Sağlık taraması / check-up", tahlil: "Tahlil günü", misafir: "Misafir sağlık hizmeti (otel)", diger: "Diğer" },
    errReq: "Kurum ve yetkili adını yazın.",
    errPhone: "Geçerli bir telefon numarası yazın.",
    sent: "Teşekkürler! WhatsApp açıldı; mesajı göndermeniz yeterli.",
    sendWa: "WhatsApp ile Gönder",
    sendMail: "E-posta ile Gönder",
    msgTitle: "Kurumsal Teklif Talebi",
    mailSubject: "Kurumsal Teklif – {company}",
    faqBadge: "Sık sorulanlar",
    faqTitle: "Kurumsal hizmet hakkında",
    faq: [
      { q: "Teklif almak için ne kadar bilgi gerekiyor?", a: "Kurum türü, yaklaşık kişi / oda sayısı ve hangi hizmetle ilgilendiğiniz başlangıç için yeterli. Ayrıntıları ön görüşmede birlikte netleştiriyoruz." },
      { q: "Tek seferlik bir etkinlik için de çalışıyor musunuz?", a: "Evet. Ofiste serum günü, tahlil günü veya check-up günü gibi tek seferlik etkinlikler planlanabilir." },
      { q: "Çalışanların katılımı zorunlu mu?", a: "Hayır. Serum ve check-up gibi uygulamalara katılım gönüllüdür ve her katılımcı uygulama öncesinde ayrı ayrı değerlendirilir." },
      { q: "Çalışanların sağlık sonuçlarını işveren görebilir mi?", a: "Kişisel sağlık sonuçları ilgili kişiye iletilir. Kişinin açık rızası olmadan bu bilgiler işverenle paylaşılmaz; dilerseniz anonim ve genel bir özet hazırlanabilir." },
      { q: "Fiyatlandırma nasıl yapılıyor?", a: "Ücret; hizmetin kapsamına, kişi sayısına, sıklığa ve konuma göre değişir. Ön görüşmenin ardından yazılı teklif iletiyoruz." },
      { q: "Otel misafirleri için nasıl çağrı yapılır?", a: "Resepsiyonunuz telefon veya WhatsApp üzerinden misafirin oda numarasını ve kısa bir açıklamayı iletir; ziyaret saati teyit edilir. Hayati tehlike durumunda önce 112 aranmalıdır." },
    ],
  },
  en: {
    badge: "Corporate",
    title: "Healthcare Solutions",
    highlight: "for Organisations",
    text: "Contracted healthcare for hotels, factories, offices and care homes. Tell us what you need and we will prepare a tailored quote.",
    seoTitle: "Corporate Healthcare – Hotels, Factories, Offices, Care Homes",
    seoDesc: "Contracted nurses, office IV drip days, check-ups and lab test days for companies in Sakarya and nearby; regular doctor and nurse visits for care homes; healthcare for hotel guests.",
    heroQuote: "Request a Quote",
    heroWa: "Message on WhatsApp",
    heroWaText: "Hello, I would like information about healthcare services for our organisation.",
    segBadge: "Sectors",
    segTitle: "Services for your organisation",
    segText: "Every organisation has different needs. Choose your sector to see what we can do.",
    useCases: "Example use cases",
    included: "What can be included?",
    segments: {
      otel: {
        t: "Hotels",
        intro: "A quick, calm solution when a guest feels unwell in their room. Your reception calls us and our team comes to the room.",
        uses: ["A room visit for a guest who falls ill at night", "An IV drip for a guest worn out after a long journey", "Communicating with foreign guests in their language", "Ambulance coordination when a hospital transfer is needed"],
        items: ["Doctor and IV drips in guests' rooms", "Turkish / English / Arabic communication", "Calls 24/7", "A short call procedure for your reception team"],
      },
      fabrika: {
        t: "Factories",
        intro: "Health support for your staff without disrupting production. Screenings and lab test days are planned at your site.",
        uses: ["A lab test day planned around shift patterns", "General health screening at the change of seasons", "Nurse support on set days", "Group blood pressure / glucose checks for staff"],
        items: ["Contracted nurse / healthcare staff", "Periodic health screenings", "On-site lab test days", "Results given to each employee individually"],
      },
      ofis: {
        t: "Offices",
        intro: "Voluntary health days focused on employee wellbeing. A small room at your office is all we need.",
        uses: ["An IV drip day before a busy period", "A check-up day for employees", "An information and support programme before flu season", "Scheduled check-ups for management teams"],
        items: ["IV drip day at the office", "Employee check-up packages", "Flu season immunity programme", "Pre-assessment for every participant"],
      },
      huzurevi: {
        t: "Care Homes",
        intro: "Support for regular follow-up of your residents, with a visit plan that works alongside your own care team.",
        uses: ["Weekly doctor and nurse visits", "Pressure ulcer care for bed-bound residents", "On-site blood draws and test follow-up", "Transition care for residents returning from hospital"],
        items: ["Regular doctor and nurse visits", "Wound and pressure ulcer care", "Test and medication follow-up", "Hands-on guidance for care staff"],
      },
    },
    legal: "Obligations under occupational health and safety law (workplace physician, OSGB services) are a separate matter. During the quote stage we clarify with you which services fall within that scope.",
    obBadge: "Getting started",
    obTitle: "How does working together start?",
    onboarding: [
      { t: "Tell us your needs", d: "Fill in the form or message us on WhatsApp: organisation, number of people and what you expect." },
      { t: "Initial conversation", d: "A short call or on-site meeting to clarify your needs." },
      { t: "A tailored quote", d: "A written quote covering scope, frequency and schedule." },
      { t: "Start and review", d: "The service begins as agreed, and we review it together at regular intervals." },
    ],
    whyBadge: "Why ETERNAL?",
    whyTitle: "What matters to us when working with organisations",
    why: [
      { t: "Regional service", d: "Sakarya, Düzce, Kocaeli and Istanbul." },
      { t: "7 days / 24 hours", d: "Uninterrupted contact for hotels and urgent calls." },
      { t: "Multilingual", d: "Turkish, English and Arabic." },
      { t: "Confidentiality", d: "Staff and guest health data is protected in line with KVKK." },
      { t: "Flexible planning", d: "Around shifts, seasons and event calendars." },
      { t: "One point of contact", d: "A dedicated channel for planning and follow-up." },
    ],
    formTitle: "Request a quote",
    formText: "Your details are not stored on a server; they are prepared as a WhatsApp or e-mail message.",
    company: "Organisation name",
    sector: "Sector",
    size: "Employees / rooms",
    name: "Contact person",
    phone: "Phone",
    email: "E-mail",
    needsLabel: "What you need",
    note: "Note",
    sectors: { otel: "Hotel", fabrika: "Factory", ofis: "Office", huzurevi: "Care home", okul: "School", diger: "Other" },
    needs: { hemsire: "Contracted nurse", doktor: "Doctor visits", serum: "Group IV drip day", tarama: "Health screening / check-up", tahlil: "Lab test day", misafir: "Guest healthcare (hotel)", diger: "Other" },
    errReq: "Please enter the organisation and contact name.",
    errPhone: "Please enter a valid phone number.",
    sent: "Thank you! WhatsApp has opened; just send the message.",
    sendWa: "Send via WhatsApp",
    sendMail: "Send via E-mail",
    msgTitle: "Corporate Quote Request",
    mailSubject: "Corporate Quote – {company}",
    faqBadge: "FAQ",
    faqTitle: "About corporate services",
    faq: [
      { q: "How much information do you need for a quote?", a: "Your type of organisation, approximate number of people / rooms and the services you're interested in are enough to start. We clarify the details together in an initial conversation." },
      { q: "Do you also work on one-off events?", a: "Yes. One-off events such as an office drip day, lab test day or check-up day can be arranged." },
      { q: "Is participation compulsory for staff?", a: "No. Taking part in drips or check-ups is voluntary, and each participant is assessed individually beforehand." },
      { q: "Can the employer see employees' health results?", a: "Personal health results go to the individual. They are not shared with the employer without that person's explicit consent; an anonymous general summary can be prepared if you wish." },
      { q: "How is pricing worked out?", a: "The cost depends on scope, number of people, frequency and location. We send a written quote after the initial conversation." },
      { q: "How do hotels call for a guest?", a: "Your reception sends the guest's room number and a short description by phone or WhatsApp, and the visit time is confirmed. In a life-threatening situation, call 112 first." },
    ],
  },
  ar: {
    badge: "للشركات",
    title: "حلول صحية",
    highlight: "للمؤسسات",
    text: "خدمات صحية تعاقدية للفنادق والمصانع والمكاتب ودور رعاية المسنين. أخبرونا باحتياجكم لنعد لكم عرضاً خاصاً.",
    seoTitle: "خدمات صحية للمؤسسات – فنادق، مصانع، مكاتب، دور رعاية",
    seoDesc: "ممرضون بعقود، يوم محاليل في المكتب، فحوصات شاملة وأيام تحاليل للشركات في سكاريا وما حولها؛ زيارات منتظمة لطبيب وممرض لدور الرعاية؛ خدمة صحية لنزلاء الفنادق.",
    heroQuote: "اطلبوا عرض سعر",
    heroWa: "راسلونا على واتساب",
    heroWaText: "مرحباً، أود الاستفسار عن الخدمات الصحية لمؤسستنا.",
    segBadge: "القطاعات",
    segTitle: "خدمة تناسب مؤسستكم",
    segText: "لكل مؤسسة احتياجات مختلفة. اختاروا قطاعكم لتروا ما يمكننا تقديمه.",
    useCases: "أمثلة على الاستخدام",
    included: "ما الذي يمكن أن يشمله؟",
    segments: {
      otel: {
        t: "الفنادق",
        intro: "حل سريع وهادئ عندما يشعر ضيفكم بتوعك في غرفته. يتصل بنا الاستقبال ويأتي فريقنا إلى الغرفة.",
        uses: ["زيارة غرفة لضيف مرض ليلاً", "محلول وريدي لضيف مرهق بعد رحلة طويلة", "التواصل مع الضيوف الأجانب بلغتهم", "تنسيق الإسعاف عند الحاجة للنقل إلى المستشفى"],
        items: ["طبيب ومحاليل في غرف الضيوف", "التواصل بالتركية والإنجليزية والعربية", "استقبال المكالمات على مدار الساعة", "إجراء اتصال مختصر لفريق الاستقبال"],
      },
      fabrika: {
        t: "المصانع",
        intro: "دعم صحي لموظفيكم دون تعطيل الإنتاج. تُخطَّط الفحوصات وأيام التحاليل في موقعكم.",
        uses: ["يوم تحاليل حسب نظام الورديات", "فحص صحي عام عند تغير الفصول", "دعم تمريضي في أيام محددة", "قياس جماعي للضغط والسكر للموظفين"],
        items: ["ممرض / كادر صحي بعقد", "فحوصات صحية دورية", "أيام تحاليل في موقع العمل", "إبلاغ كل موظف بنتائجه بشكل فردي"],
      },
      ofis: {
        t: "المكاتب",
        intro: "أيام صحية بمشاركة اختيارية تهتم برفاهية الموظفين. تكفي غرفة صغيرة في مكتبكم.",
        uses: ["يوم محاليل قبل فترة عمل مزدحمة", "يوم فحص شامل للموظفين", "برنامج توعية ودعم قبل موسم الإنفلونزا", "فحوصات بمواعيد لفرق الإدارة"],
        items: ["يوم المحاليل في المكتب", "باقات فحص للموظفين", "برنامج المناعة لموسم الإنفلونزا", "تقييم مسبق لكل مشارك"],
      },
      huzurevi: {
        t: "دور رعاية المسنين",
        intro: "دعم للمتابعة المنتظمة للمقيمين، بخطة زيارات تعمل بالتنسيق مع فريق الرعاية لديكم.",
        uses: ["زيارة أسبوعية لطبيب وممرض", "العناية بقرح الفراش للمقيمين طريحي الفراش", "سحب الدم ومتابعة التحاليل في الدار", "رعاية انتقالية للمقيمين العائدين من المستشفى"],
        items: ["زيارات منتظمة لطبيب وممرض", "العناية بالجروح وقرح الفراش", "متابعة التحاليل والأدوية", "إرشاد عملي لكادر الرعاية"],
      },
    },
    legal: "الالتزامات الناشئة عن تشريعات الصحة والسلامة المهنية (طبيب مكان العمل، خدمات OSGB) مسألة منفصلة. نوضح معكم في مرحلة العرض أي الخدمات تقع ضمن هذا النطاق.",
    obBadge: "البداية",
    obTitle: "كيف يبدأ التعاون؟",
    onboarding: [
      { t: "أخبرونا باحتياجكم", d: "املؤوا النموذج أو راسلونا عبر واتساب: المؤسسة وعدد الأشخاص وتوقعاتكم." },
      { t: "محادثة أولية", d: "مكالمة قصيرة أو لقاء في الموقع لتوضيح احتياجاتكم." },
      { t: "عرض خاص بكم", d: "عرض مكتوب يتضمن نطاق الخدمة والتكرار والجدول الزمني." },
      { t: "البدء والمتابعة", d: "تبدأ الخدمة وفق الخطة المتفق عليها، ونراجعها معاً على فترات منتظمة." },
    ],
    whyBadge: "لماذا إيترنال؟",
    whyTitle: "ما نهتم به عند العمل مع المؤسسات",
    why: [
      { t: "خدمة إقليمية", d: "سكاريا ودوزجه وكوجالي وإسطنبول." },
      { t: "7 أيام / 24 ساعة", d: "تواصل دون انقطاع للفنادق والحالات العاجلة." },
      { t: "تواصل متعدد اللغات", d: "التركية والإنجليزية والعربية." },
      { t: "السرية", d: "تُحمى البيانات الصحية للموظفين والضيوف وفق قانون KVKK." },
      { t: "تخطيط مرن", d: "حسب الورديات والمواسم وجداول الفعاليات." },
      { t: "جهة تواصل واحدة", d: "قناة محددة للتخطيط والمتابعة." },
    ],
    formTitle: "اطلبوا عرض سعر",
    formText: "لا تُحفظ بياناتكم على خادم؛ بل تُجهَّز كرسالة واتساب أو بريد إلكتروني.",
    company: "اسم المؤسسة",
    sector: "القطاع",
    size: "عدد الموظفين / الغرف",
    name: "اسم المسؤول",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    needsLabel: "احتياجكم",
    note: "ملاحظة",
    sectors: { otel: "فندق", fabrika: "مصنع", ofis: "مكتب", huzurevi: "دار رعاية", okul: "مدرسة", diger: "أخرى" },
    needs: { hemsire: "ممرض بعقد", doktor: "زيارة طبيب", serum: "يوم محاليل جماعي", tarama: "فحص صحي / شامل", tahlil: "يوم تحاليل", misafir: "خدمة صحية للضيوف (فندق)", diger: "أخرى" },
    errReq: "يرجى كتابة اسم المؤسسة واسم المسؤول.",
    errPhone: "يرجى كتابة رقم هاتف صحيح.",
    sent: "شكراً لكم! فُتح واتساب، يكفي إرسال الرسالة.",
    sendWa: "إرسال عبر واتساب",
    sendMail: "إرسال بالبريد الإلكتروني",
    msgTitle: "طلب عرض سعر للمؤسسات",
    mailSubject: "عرض سعر للمؤسسة – {company}",
    faqBadge: "أسئلة شائعة",
    faqTitle: "حول خدمات المؤسسات",
    faq: [
      { q: "ما المعلومات المطلوبة للحصول على عرض؟", a: "نوع المؤسسة وعدد الأشخاص / الغرف التقريبي والخدمة التي تهمكم كافية للبداية. نوضح التفاصيل معاً في المحادثة الأولية." },
      { q: "هل تعملون في فعاليات لمرة واحدة؟", a: "نعم. يمكن تنظيم فعاليات لمرة واحدة مثل يوم محاليل أو يوم تحاليل أو يوم فحص شامل في المكتب." },
      { q: "هل مشاركة الموظفين إلزامية؟", a: "لا. المشاركة في المحاليل والفحوصات اختيارية، ويُقيَّم كل مشارك على حدة قبل التطبيق." },
      { q: "هل يمكن لصاحب العمل رؤية نتائج الموظفين الصحية؟", a: "تُرسل النتائج الصحية الشخصية إلى صاحبها. ولا تُشارك مع صاحب العمل دون موافقة صريحة من الشخص؛ ويمكن إعداد ملخص عام مجهول الهوية إن رغبتم." },
      { q: "كيف يتم التسعير؟", a: "تختلف التكلفة حسب نطاق الخدمة وعدد الأشخاص والتكرار والموقع. نرسل عرضاً مكتوباً بعد المحادثة الأولية." },
      { q: "كيف يطلب الفندق الخدمة لضيف؟", a: "يرسل الاستقبال رقم غرفة الضيف ووصفاً قصيراً عبر الهاتف أو واتساب، ويُؤكَّد موعد الزيارة. في الحالات المهددة للحياة يجب الاتصال أولاً بالرقم 112." },
    ],
  },
};

const Corporate = () => {
  const t = useT(dict);
  const [seg, setSeg] = useState("otel");
  const [f, setF] = useState({ company: "", sector: "otel", size: "1-20", name: "", phone: "", email: "", needs: [], note: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k, v) => setF((st) => ({ ...st, [k]: v }));
  const toggle = (n) => set("needs", f.needs.includes(n) ? f.needs.filter((x) => x !== n) : [...f.needs, n]);

  const sectors = t("sectors");
  const needs = t("needs");
  const segments = t("segments");
  const current = segments[seg];
  const meta = SEG_META.find((m) => m.id === seg);
  const SegIcon = meta.icon;

  const message = () =>
    buildMessage(t("msgTitle"), {
      [t("company")]: f.company, [t("sector")]: sectors[f.sector], [t("size")]: f.size, [t("name")]: f.name,
      [t("phone")]: f.phone, [t("email")]: f.email, [t("needsLabel")]: f.needs.map((n) => needs[n]).join(", "), [t("note")]: f.note,
    });

  const valid = () => {
    let msg = "";
    if (!f.company.trim() || !f.name.trim()) msg = t("errReq");
    else if (!isValidPhone(f.phone)) msg = t("errPhone");
    setErr(msg);
    return !msg;
  };

  const sendWa = (e) => {
    e.preventDefault();
    if (!valid()) return;
    openWhatsApp(message());
    trackEvent("generate_lead", { form: "corporate" });
    toast({ title: "✓", text: t("sent"), type: "success" });
    setSent(true);
  };
  const mailHref = `mailto:${SITE.email}?subject=${encodeURIComponent(t("mailSubject", { company: f.company }))}&body=${encodeURIComponent(message().replace(/\*/g, ""))}`;

  const pickSegment = (id) => {
    setSeg(id);
    if (["otel", "fabrika", "ofis", "huzurevi"].includes(id)) set("sector", id);
  };

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/kurumsal">
        <div className={ui.btnRow}>
          <Magnetic><a href="#teklif" className={`${ui.btn} ${ui.btnPrimary}`}><Envelope /> {t("heroQuote")}</a></Magnetic>
          <a href={whatsappUrl(t("heroWaText"))} target="_blank" rel="noopener noreferrer" className={`${ui.btn} ${ui.btnWa}`}>
            <WhatsappLogo /> {t("heroWa")}
          </a>
        </div>
      </PageHero>

      <Wrapper>
        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("segBadge")}</span>
              <h2>{t("segTitle")}</h2>
              <p>{t("segText")}</p>
            </div>
          </ScrollReveal>

          <LayoutGroup>
            <div className={s.segTabs} role="tablist" aria-label={t("segTitle")}>
              {SEG_META.map((m) => {
                const Icon = m.icon;
                const active = seg === m.id;
                return (
                  <button key={m.id} type="button" role="tab" aria-selected={active} aria-controls="seg-panel"
                    className={`${s.segTab} ${active ? s.segTabActive : ""}`} onClick={() => pickSegment(m.id)}>
                    {active && <motion.span layoutId="segPill" className={s.segPill} transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className={s.segIcon}><Icon /></span>
                    <span>{segments[m.id].t}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="wait">
            <motion.div key={seg} id="seg-panel" role="tabpanel"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <div className={s.panelHead}>
                <Icon3D icon={<SegIcon />} tone={meta.tone} size={70} float />
                <div>
                  <h2>{current.t}</h2>
                  <p>{current.intro}</p>
                </div>
              </div>
              <div className={s.panel}>
                <SpotlightCard className={`${ui.card} ${s.col}`}>
                  <h3><Lightbulb /> {t("useCases")}</h3>
                  <ul>{current.uses.map((x) => <li key={x}><Check weight="bold" /> {x}</li>)}</ul>
                </SpotlightCard>
                <SpotlightCard className={`${ui.card} ${ui.glowBorder} ${s.col}`}>
                  <h3><ListChecks /> {t("included")}</h3>
                  <ul>{current.items.map((x) => <li key={x}><Check weight="bold" /> {x}</li>)}</ul>
                </SpotlightCard>
              </div>
            </motion.div>
          </AnimatePresence>
          {seg === "fabrika" && (
            <div className={ui.note} style={{ marginTop: 18 }}><Info /> <span>{t("legal")}</span></div>
          )}
        </section>

        <section className={ui.sectionTight}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("obBadge")}</span>
              <h2>{t("obTitle")}</h2>
            </div>
          </ScrollReveal>
          <Stagger className={s.onboard}>
            {t("onboarding").map((st, i) => (
              <StaggerItem key={st.t} className={`${ui.card} ${s.obStep}`}>
                <div className={s.obNum}>{i + 1}</div>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className={ui.section}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("whyBadge")}</span>
              <h2>{t("whyTitle")}</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className={`${ui.card} ${ui.glass}`}>
              <Stagger className={s.why} gap={0.06}>
                {t("why").map((w, i) => {
                  const Icon = WHY_ICONS[i];
                  return (
                    <StaggerItem key={w.t} y={14} className={s.whyItem}>
                      <Icon />
                      <div><strong>{w.t}</strong><span>{w.d}</span></div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </ScrollReveal>
        </section>

        <section id="teklif" className={`${ui.sectionTight} ${s.formWrap}`}>
          <ScrollReveal>
            <form className={`${ui.card} ${ui.glass} ${ui.form}`} onSubmit={sendWa} noValidate>
              <div>
                <h2 style={{ margin: 0 }}>{t("formTitle")}</h2>
                <p className={ui.hint} style={{ margin: "6px 0 0" }}>{t("formText")}</p>
              </div>
              <AnimatePresence>
                {sent && (
                  <motion.p role="status" className={s.sent} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <CheckCircle /> {t("sent")}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className={ui.row}>
                <div className={ui.field}><label htmlFor="co-company">{t("company")}</label><input id="co-company" value={f.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" /></div>
                <div className={ui.field}>
                  <label htmlFor="co-sector">{t("sector")}</label>
                  <select id="co-sector" value={f.sector} onChange={(e) => set("sector", e.target.value)}>
                    {SECTORS.map((x) => <option key={x} value={x}>{sectors[x]}</option>)}
                  </select>
                </div>
                <div className={ui.field}>
                  <label htmlFor="co-size">{t("size")}</label>
                  <select id="co-size" value={f.size} onChange={(e) => set("size", e.target.value)}>
                    {SIZES.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div className={ui.row}>
                <div className={ui.field}><label htmlFor="co-name">{t("name")}</label><input id="co-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></div>
                <div className={ui.field}><label htmlFor="co-phone">{t("phone")}</label><input id="co-phone" dir="ltr" value={f.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" /></div>
                <div className={ui.field}><label htmlFor="co-email">{t("email")}</label><input id="co-email" dir="ltr" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></div>
              </div>
              <span className={ui.label}>{t("needsLabel")}</span>
              <div className={ui.chips}>
                {NEEDS.map((n) => (
                  <motion.button type="button" key={n} aria-pressed={f.needs.includes(n)} whileTap={{ scale: 0.94 }}
                    className={`${ui.chip} ${f.needs.includes(n) ? ui.chipActive : ""}`} onClick={() => toggle(n)}>
                    {needs[n]}
                  </motion.button>
                ))}
              </div>
              <div className={ui.field}><label htmlFor="co-note">{t("note")}</label><textarea id="co-note" value={f.note} onChange={(e) => set("note", e.target.value)} /></div>
              {err && <p className={ui.error} role="alert">{err}</p>}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="submit" className={`${ui.btn} ${ui.btnWa}`}><WhatsappLogo /> {t("sendWa")}</button>
                <a href={mailHref} className={`${ui.btn} ${ui.btnGhost}`} onClick={(e) => { if (!valid()) e.preventDefault(); else trackEvent("generate_lead", { form: "corporate_email" }); }}>
                  <Envelope /> {t("sendMail")}
                </a>
              </div>
            </form>
          </ScrollReveal>
        </section>

        <section className={ui.sectionTight} style={{ paddingBottom: 90 }}>
          <ScrollReveal>
            <div className={ui.sectionHead}>
              <span className={ui.badge}>{t("faqBadge")}</span>
              <h2>{t("faqTitle")}</h2>
            </div>
          </ScrollReveal>
          <Faq items={t("faq")} />
        </section>
      </Wrapper>
    </>
  );
};

export default Corporate;
