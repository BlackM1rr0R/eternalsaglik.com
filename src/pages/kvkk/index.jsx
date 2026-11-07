import React from "react";
import { motion } from "framer-motion";
import {
  IdentificationCard, Database, Target, Scales, Tray, ShareNetwork, Cookie, UserCircleGear, Info, Envelope, MapPin,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ScrollReveal from "../../components/scrollreveal";
import { Stagger, StaggerItem } from "../../components/motion";
import ui from "../../styles/ui.module.css";
import s from "./index.module.css";
import { SITE } from "../../config/site";
import { useT } from "../../i18n";

// Template privacy notice under Law No. 6698 (KVKK). It should be reviewed by the
// business's legal advisor before being relied on. The Turkish text is the reference version.
// Section shape: { id, h, p?: string | string[], list?: string[] }. {name} {email} {address} are filled in.
const dict = {
  tr: {
    badge: "KVKK",
    title: "Kişisel Verilerin Korunması",
    highlight: "ve Gizlilik",
    text: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni ve çerez politikası.",
    seoTitle: "KVKK Aydınlatma Metni ve Gizlilik Politikası",
    seoDesc: "ETERNAL Sağlık Hizmetleri KVKK aydınlatma metni: işlenen kişisel veriler, işleme amaçları, hukuki sebepler, aktarım, çerezler ve KVKK m.11 kapsamındaki haklarınız.",
    toc: "İçindekiler",
    contact: "Başvuru ve iletişim",
    translationNote: "",
    updated: "Son güncelleme: Kasım 2026",
    sections: [
      { id: "veri-sorumlusu", h: "1. Veri sorumlusu", p: "Kişisel verileriniz, veri sorumlusu sıfatıyla {name} (\"Eternal Sağlık\") tarafından aşağıda açıklanan kapsamda işlenmektedir. İletişim: {email} · {address}" },
      { id: "veriler", h: "2. İşlenen kişisel veriler", list: [
        "Kimlik ve iletişim bilgileri: ad soyad, telefon, e-posta, adres.",
        "Randevu bilgileri: talep edilen hizmet, tarih, saat ve notlar.",
        "Sağlık verileri (özel nitelikli): yalnızca hizmet sunumu için sizin paylaştığınız şikayet, reçete ve ölçüm bilgileri.",
        "İzin vermeniz halinde site kullanım verileri (analiz çerezleri).",
      ] },
      { id: "amaclar", h: "3. İşleme amaçları", list: [
        "Randevu taleplerinin alınması, planlanması ve sizinle iletişim kurulması,",
        "Evde sağlık hizmetinin sunulması ve takibi,",
        "Yasal yükümlülüklerin yerine getirilmesi,",
        "İzin vermeniz halinde web sitesinin geliştirilmesi için anonim istatistik oluşturulması.",
      ] },
      { id: "hukuki-sebepler", h: "4. Hukuki sebepler", p: "Kişisel verileriniz KVKK m.5/2 kapsamında sözleşmenin kurulması ve ifası, hukuki yükümlülük ve meşru menfaat sebeplerine; sağlık verileriniz KVKK m.6/3 kapsamında koruyucu hekimlik, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi amacıyla sır saklama yükümlülüğü altındaki kişilerce işlenmesi sebebine; analiz çerezleri ise açık rızanıza dayanır." },
      { id: "toplama", h: "5. Verilerin toplanma yöntemi", p: "Veriler web sitesindeki formlar, telefon ve WhatsApp üzerinden sizin tarafınızdan iletilir. Web sitesindeki formlar bilgileri sunucuya kaydetmez; doldurduğunuz bilgiler sizin onayınızla WhatsApp mesajı olarak hazırlanır ve gönderme işlemini siz yaparsınız. WhatsApp kullanımı WhatsApp'ın kendi gizlilik koşullarına tabidir." },
      { id: "aktarim", h: "6. Aktarım", p: "Verileriniz, hizmetin sunulması için gerekli olduğu ölçüde laboratuvarlar ve sağlık kuruluşları ile, yasal zorunluluk halinde yetkili kamu kurumlarıyla paylaşılabilir." },
      { id: "cerezler", h: "7. Çerezler", p: "Sitemiz, tercihlerinizi (tema, yazı boyutu, dil, çerez seçimi) tarayıcınızda saklamak için zorunlu yerel depolama kullanır. Google Analytics veya Meta Pixel gibi analiz araçları yalnızca çerez bildiriminde \"Kabul Et\" seçmeniz halinde yüklenir. Tercihinizi tarayıcınızın site verilerini temizleyerek sıfırlayabilirsiniz." },
      { id: "haklar", h: "8. Haklarınız (KVKK m.11)", p: "Verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme, aktarıldığı üçüncü kişileri bilme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı {email} adresine iletebilirsiniz." },
    ],
  },
  en: {
    badge: "Privacy",
    title: "Personal Data Protection",
    highlight: "and Privacy",
    text: "Privacy notice and cookie policy under the Turkish Personal Data Protection Law No. 6698 (KVKK).",
    seoTitle: "Privacy Notice (KVKK) and Privacy Policy",
    seoDesc: "ETERNAL Health Services privacy notice: personal data processed, purposes, legal grounds, transfers, cookies and your rights under Article 11 of the KVKK.",
    toc: "Contents",
    contact: "Requests and contact",
    translationNote: "This English version is provided for information. In case of any discrepancy, the Turkish text prevails.",
    updated: "Last updated: November 2026",
    sections: [
      { id: "veri-sorumlusu", h: "1. Data controller", p: "Your personal data is processed by {name} (\"Eternal Sağlık\") as data controller, within the scope described below. Contact: {email} · {address}" },
      { id: "veriler", h: "2. Personal data processed", list: [
        "Identity and contact details: name, phone, e-mail, address.",
        "Appointment details: requested service, date, time and notes.",
        "Health data (special category): only the complaints, prescriptions and readings you share for the purpose of providing the service.",
        "Site usage data, if you consent (analytics cookies).",
      ] },
      { id: "amaclar", h: "3. Purposes of processing", list: [
        "Receiving and planning appointment requests and contacting you,",
        "Providing and following up home healthcare services,",
        "Fulfilling legal obligations,",
        "If you consent, producing anonymous statistics to improve the website.",
      ] },
      { id: "hukuki-sebepler", h: "4. Legal grounds", p: "Your personal data is processed under KVKK Art. 5/2 on the grounds of entering into and performing a contract, legal obligation and legitimate interest; your health data under KVKK Art. 6/3 on the ground of processing by persons under a duty of confidentiality for preventive medicine, medical diagnosis, treatment and care services; and analytics cookies on the basis of your explicit consent." },
      { id: "toplama", h: "5. How data is collected", p: "Data is provided by you through forms on the website, by phone and via WhatsApp. The website's forms do not store information on a server; what you enter is prepared as a WhatsApp message with your approval, and you send it yourself. Use of WhatsApp is subject to WhatsApp's own privacy terms." },
      { id: "aktarim", h: "6. Transfers", p: "Your data may be shared with laboratories and healthcare institutions to the extent necessary to provide the service, and with authorised public bodies where required by law." },
      { id: "cerezler", h: "7. Cookies", p: "Our site uses essential local storage to keep your preferences (theme, text size, language, cookie choice) in your browser. Analytics tools such as Google Analytics or Meta Pixel are loaded only if you select \"Accept\" in the cookie notice. You can reset your choice by clearing the site data in your browser." },
      { id: "haklar", h: "8. Your rights (KVKK Art. 11)", p: "You have the right to learn whether your data is processed, to request information, to ask for it to be corrected or deleted, to know the third parties it has been transferred to, to object, and to claim compensation for damage. You can send your requests to {email}." },
    ],
  },
  ar: {
    badge: "الخصوصية",
    title: "حماية البيانات الشخصية",
    highlight: "والخصوصية",
    text: "إشعار الخصوصية وسياسة ملفات تعريف الارتباط وفق قانون حماية البيانات الشخصية التركي رقم 6698 (KVKK).",
    seoTitle: "إشعار الخصوصية (KVKK) وسياسة الخصوصية",
    seoDesc: "إشعار الخصوصية لإيترنال للخدمات الصحية: البيانات الشخصية المعالجة، أغراض المعالجة، الأسس القانونية، النقل، ملفات تعريف الارتباط وحقوقكم وفق المادة 11 من قانون KVKK.",
    toc: "المحتويات",
    contact: "الطلبات والتواصل",
    translationNote: "هذه النسخة العربية مقدمة للعلم فقط. وفي حال وجود أي اختلاف، يُعتمد النص التركي.",
    updated: "آخر تحديث: نوفمبر 2026",
    sections: [
      { id: "veri-sorumlusu", h: "1. المسؤول عن البيانات", p: "تُعالَج بياناتكم الشخصية من قِبل {name} (\"Eternal Sağlık\") بصفته المسؤول عن البيانات، وفي النطاق الموضح أدناه. التواصل: {email} · {address}" },
      { id: "veriler", h: "2. البيانات الشخصية المعالجة", list: [
        "بيانات الهوية والتواصل: الاسم الكامل، الهاتف، البريد الإلكتروني، العنوان.",
        "بيانات الموعد: الخدمة المطلوبة، التاريخ، الوقت والملاحظات.",
        "البيانات الصحية (فئة خاصة): فقط الشكاوى والوصفات والقياسات التي تشاركونها لغرض تقديم الخدمة.",
        "بيانات استخدام الموقع، في حال موافقتكم (ملفات تعريف الارتباط التحليلية).",
      ] },
      { id: "amaclar", h: "3. أغراض المعالجة", list: [
        "استقبال طلبات المواعيد وتخطيطها والتواصل معكم،",
        "تقديم خدمات الرعاية الصحية المنزلية ومتابعتها،",
        "الوفاء بالالتزامات القانونية،",
        "إعداد إحصاءات مجهولة الهوية لتحسين الموقع، في حال موافقتكم.",
      ] },
      { id: "hukuki-sebepler", h: "4. الأسس القانونية", p: "تُعالَج بياناتكم الشخصية بموجب المادة 5/2 من قانون KVKK استناداً إلى إبرام العقد وتنفيذه والالتزام القانوني والمصلحة المشروعة؛ وتُعالَج بياناتكم الصحية بموجب المادة 6/3 استناداً إلى معالجتها من قِبل أشخاص ملزمين بالسرية لأغراض الطب الوقائي والتشخيص الطبي والعلاج وخدمات الرعاية؛ أما ملفات تعريف الارتباط التحليلية فتستند إلى موافقتكم الصريحة." },
      { id: "toplama", h: "5. طريقة جمع البيانات", p: "تُقدَّم البيانات من قِبلكم عبر النماذج في الموقع والهاتف وواتساب. لا تحفظ نماذج الموقع المعلومات على خادم؛ بل تُجهَّز المعلومات التي تدخلونها كرسالة واتساب بموافقتكم، وتقومون أنتم بإرسالها. يخضع استخدام واتساب لشروط الخصوصية الخاصة به." },
      { id: "aktarim", h: "6. نقل البيانات", p: "قد تُشارَك بياناتكم مع المختبرات والمؤسسات الصحية بالقدر اللازم لتقديم الخدمة، ومع الجهات العامة المختصة عند وجود إلزام قانوني." },
      { id: "cerezler", h: "7. ملفات تعريف الارتباط", p: "يستخدم موقعنا تخزيناً محلياً ضرورياً لحفظ تفضيلاتكم (المظهر، حجم الخط، اللغة، اختيار ملفات تعريف الارتباط) في متصفحكم. لا تُحمَّل أدوات التحليل مثل Google Analytics أو Meta Pixel إلا إذا اخترتم \"قبول\" في إشعار ملفات تعريف الارتباط. يمكنكم إعادة ضبط اختياركم بمسح بيانات الموقع من متصفحكم." },
      { id: "haklar", h: "8. حقوقكم (المادة 11 من KVKK)", p: "لكم الحق في معرفة ما إذا كانت بياناتكم تُعالَج، وطلب المعلومات، وطلب تصحيحها أو حذفها، ومعرفة الأطراف الثالثة التي نُقلت إليها، والاعتراض، والمطالبة بالتعويض عن الضرر. يمكنكم إرسال طلباتكم إلى {email}." },
    ],
  },
};

const ICONS = {
  "veri-sorumlusu": IdentificationCard, veriler: Database, amaclar: Target, "hukuki-sebepler": Scales,
  toplama: Tray, aktarim: ShareNetwork, cerezler: Cookie, haklar: UserCircleGear,
};

const Kvkk = () => {
  const t = useT(dict);
  const vars = { name: SITE.name, email: SITE.email, address: SITE.address };
  const fill = (str) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
  const sections = t("sections");
  const note = t("translationNote");

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/kvkk" />
      <Wrapper>
        <section className={ui.section}>
          <div className={s.layout}>
            <aside className={s.toc} aria-label={t("toc")}>
              <ScrollReveal direction="right">
                <div className={`${ui.card} ${s.tocCard}`}>
                  <strong className={s.tocTitle}>{t("toc")}</strong>
                  <Stagger as="ol" className={s.tocList} gap={0.04}>
                    {sections.map((sec) => {
                      const Icon = ICONS[sec.id] || Info;
                      return (
                        <StaggerItem as="li" key={sec.id} y={10}>
                          <a href={`#${sec.id}`}><Icon /> {sec.h.replace(/^\d+\.\s*/, "")}</a>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>
              </ScrollReveal>
            </aside>

            <div className={`${ui.prose} ${s.body}`}>
              {note && <div className={ui.note} style={{ marginBottom: 24 }}><Info /> <span>{note}</span></div>}
              {sections.map((sec) => {
                const Icon = ICONS[sec.id] || Info;
                return (
                  <ScrollReveal key={sec.id} distance={24}>
                    <article id={sec.id} className={s.block}>
                      <h2><span className={s.icon}><Icon /></span> {sec.h}</h2>
                      {sec.p && <p>{fill(sec.p)}</p>}
                      {sec.list && <ul>{sec.list.map((li) => <li key={li}>{fill(li)}</li>)}</ul>}
                    </article>
                  </ScrollReveal>
                );
              })}

              <ScrollReveal>
                <motion.div className={`${ui.card} ${s.contact}`} whileHover={{ y: -3 }}>
                  <h3 style={{ marginTop: 0 }}>{t("contact")}</h3>
                  <p><Envelope /> <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a></p>
                  <p><MapPin /> {SITE.address}</p>
                </motion.div>
              </ScrollReveal>
              <p className={ui.muted}>{t("updated")}</p>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default Kvkk;
