// FAQ shown on /sss, the home page (first 5) and the services page; also emitted as FAQPage structured data.
// Every item has a stable `id` (used for translations and anchors) and a `cat` (category tab on /sss).
// No prices or promises here: payment questions point to "bilgi için yazın".

export const faqCategories = ["genel", "randevu", "serum", "tahlil", "odeme", "gizlilik", "acil"];

export const faqs = [
  {
    id: "neden-evde", cat: "genel",
    q: "Neden evde sağlık hizmeti almalıyım?",
    a: "Evde sağlık hizmetleri, hastaların hastane ortamına gitme gereksinimini azaltarak aileleriyle birlikte, tanıdık ortamlarında iyileşmelerini sağlar. Yol ve bekleme süresi ortadan kalkar, hastane enfeksiyonu riski azalır ve bakım kişiye özel planlanır.",
  },
  {
    id: "bolgeler", cat: "genel",
    q: "Hangi bölgelere hizmet veriyorsunuz?",
    a: "Sakarya, Düzce, Kocaeli ve İstanbul bölgesinde evde sağlık hizmeti sunuyoruz. Özel ambulans hizmetimiz ile daha geniş bölgelere de ulaşabiliyoruz.",
  },
  {
    id: "ucret", cat: "odeme",
    q: "Ücretlendirme nasıl yapılır?",
    a: "Ücret, hizmetin türüne ve süresine göre belirlenir. Size uygun paketi ve net bilgiyi almak için bizi aramanız veya WhatsApp'tan yazmanız yeterlidir.",
  },
  {
    id: "uzmanlik", cat: "genel",
    q: "Doktorlarınız hangi uzmanlık alanlarında?",
    a: "Ekibimizde dahiliye, acil tıp, fizik tedavi ve geleneksel tıp alanlarında doktorlar bulunmaktadır. Her hasta için en uygun uzman yönlendirilir.",
  },
  {
    id: "acil-sure", cat: "acil",
    q: "Acil durumlarda ne kadar sürede gelirsiniz?",
    a: "Acil çağrılarda ortalama 30-45 dakika içinde hasta adresine ulaşmaktayız. Hayati tehlike durumunda (bilinç kaybı, göğüs ağrısı, ağır nefes darlığı) lütfen önce 112'yi arayın.",
  },
  {
    id: "baska-sehir", cat: "randevu",
    q: "Başka şehirde yaşıyorum, annem/babam için hizmet alabilir miyim?",
    a: "Evet. Randevuyu telefonla veya WhatsApp'tan siz oluşturabilirsiniz. Ziyaret sonrasında yapılan işlemler ve ölçüm sonuçları hakkında sizi bilgilendiriyoruz.",
  },
  {
    id: "recete-igne", cat: "serum",
    q: "Doktorun yazdığı iğneyi veya serumu evde yaptırabilir miyim?",
    a: "Evet. Reçetenizin veya doktor notunun fotoğrafını WhatsApp'tan göndermeniz yeterlidir; hemşiremiz uygun saatte evinize gelerek uygulamayı yapar.",
  },
  {
    id: "serum-oncesi", cat: "serum",
    q: "Serum uygulamasından önce muayene gerekiyor mu?",
    a: "Serum uygulamasından önce sağlık durumunuz, kullandığınız ilaçlar ve alerjileriniz değerlendirilir. İçerik kişiye özel belirlenir.",
  },
  {
    id: "otel-ofis", cat: "genel",
    q: "Otelde veya ofiste hizmet veriyor musunuz?",
    a: "Evet. Sapanca, Kartepe ve çevresindeki otellerde konaklayan misafirlere, ayrıca şirketlere ofiste toplu serum ve sağlık hizmeti sunuyoruz.",
  },
  {
    id: "kvkk", cat: "gizlilik",
    q: "Kişisel ve sağlık verilerim nasıl korunuyor?",
    a: "Paylaştığınız bilgiler yalnızca size hizmet vermek amacıyla, 6698 sayılı KVKK kapsamında işlenir. Ayrıntılar KVKK ve Gizlilik sayfamızda yer alır.",
  },
  {
    id: "calisma-saatleri", cat: "genel",
    q: "Hangi gün ve saatlerde hizmet veriyorsunuz?",
    a: "Haftanın 7 günü, 24 saat ulaşılabiliriz; hafta sonu ve tatil günleri de dahil. Ziyaret saatini sizin ve hastanın düzenine göre birlikte belirleriz.",
  },
  {
    id: "randevu-nasil", cat: "randevu",
    q: "Nasıl randevu alabilirim?",
    a: "Bizi telefonla arayabilir, WhatsApp'tan yazabilir veya sitemizdeki online randevu formunu doldurabilirsiniz. Form, bilgilerinizi hazır bir WhatsApp mesajına dönüştürür; mesajı gönderdiğinizde ekibimiz uygun saati sizinle netleştirir.",
  },
  {
    id: "ziyaret-hazirlik", cat: "randevu",
    q: "Ziyaretten önce neleri hazırlamalıyım?",
    a: "Kullanılan ilaçların listesini (ya da kutularını), varsa reçete veya doktor notunu, son tahlil sonuçlarını ve bilinen alerjileri hazır tutmanız işinizi kolaylaştırır. Adres tarifi, kat ve asansör bilgisini de mesajınıza eklemeniz ekibin sizi kolay bulmasını sağlar.",
  },
  {
    id: "ziyaret-sureci", cat: "randevu",
    q: "Evde ziyaret nasıl geçiyor?",
    a: "Sağlık personelimiz belirlenen saatte adresinize gelir. Önce şikayetleriniz, kullandığınız ilaçlar ve genel durumunuz değerlendirilir; ardından gerekli işlem hijyen kurallarına uygun şekilde yapılır. Ziyaret sonunda yapılanlar ve dikkat edilmesi gerekenler hakkında bilgi verilir.",
  },
  {
    id: "ayni-gun", cat: "randevu",
    q: "Aynı gün içinde randevu alabilir miyim?",
    a: "Ekibimizin uygunluğuna göre aynı gün içinde de planlama yapılabilir. En hızlı bilgi için telefonla aramanızı öneririz.",
  },
  {
    id: "serum-sure", cat: "serum",
    q: "Serum uygulaması ne kadar sürer?",
    a: "Süre; serumun içeriğine, hacmine ve kişinin durumuna göre değişir. Uygulama boyunca genel durumunuz takip edilir; süre hakkında randevu sırasında bilgi verilir.",
  },
  {
    id: "serum-kimlere", cat: "serum",
    q: "Herkes serum yaptırabilir mi?",
    a: "Hayır, serum herkes için uygun olmayabilir. Hamilelik ve emzirme döneminde, böbrek, kalp veya karaciğer hastalığında ya da bilinen bir alerjiniz varsa mutlaka önceden belirtin. Uygunluk doktor değerlendirmesiyle belirlenir; düzenli kullandığınız ilaçlar için doktorunuza danışın.",
  },
  {
    id: "serum-sonrasi", cat: "serum",
    q: "Serumdan sonra nelere dikkat etmeliyim?",
    a: "Damar yolu bölgesinde hafif morarma olabilir. Kolda artan şişlik, ağrı veya kızarıklık, ateş ya da titreme olursa bize haber verin. Kaşıntı, döküntü veya nefes darlığı gibi alerji belirtilerinde hemen 112'yi arayın. Ayrıntılar için Serum Sonrası bakım rehberimize bakabilirsiniz.",
  },
  {
    id: "tahlil-aclik", cat: "tahlil",
    q: "Evde kan tahlili için aç olmam gerekiyor mu?",
    a: "Bazı tahliller (örneğin açlık kan şekeri ve kolesterol) için genellikle 8–12 saatlik açlık istenir; bu sürede su içebilirsiniz. Hangi tahlil için nasıl hazırlanmanız gerektiğini randevu sırasında söyleriz. Düzenli ilaçlarınızı doktorunuza danışmadan kesmeyin.",
  },
  {
    id: "tahlil-turleri", cat: "tahlil",
    q: "Evde hangi tahliller yapılabilir?",
    a: "Evde kan alma, idrar ve kültür testleri, check-up tahlil paketleri ve PCR testi yapılabilir. Doktorunuzun istediği tahlil listesini WhatsApp'tan gönderebilirsiniz.",
  },
  {
    id: "tahlil-sonuc", cat: "tahlil",
    q: "Tahlil sonuçlarımı nasıl alırım?",
    a: "Alınan örnekler laboratuvara ulaştırılır; sonuçlar hazır olduğunda size ve isterseniz doktorunuza iletilir. Sonuç süresi tahlilin türüne göre değişir. Sonuçların yorumu için doktorunuza danışın.",
  },
  {
    id: "odeme-yontem", cat: "odeme",
    q: "Ödemeyi nasıl yapabilirim?",
    a: "Ödeme seçenekleri hizmete göre değişebilir. Güncel bilgi için WhatsApp'tan yazmanız veya bizi aramanız yeterlidir.",
  },
  {
    id: "iptal", cat: "odeme",
    q: "Randevumu iptal edebilir veya erteleyebilir miyim?",
    a: "Evet. Planınız değişirse lütfen mümkün olduğunca erken telefonla veya WhatsApp'tan haber verin; yeni bir saati birlikte belirleriz. İptal koşulları hakkında bilgi için bize yazın.",
  },
  {
    id: "sigorta", cat: "odeme",
    q: "SGK veya özel sağlık sigortası masrafları karşılıyor mu?",
    a: "Bu durum hizmetin türüne ve poliçenizin kapsamına göre değişir. Bilgi için bize yazın; özel sigortanız varsa sigorta şirketinize de danışmanızı öneririz.",
  },
  {
    id: "veri-paylasim", cat: "gizlilik",
    q: "Sağlık bilgilerim yakınlarımla paylaşılır mı?",
    a: "KVKK gereği sağlık bilgileriniz onayınız olmadan üçüncü kişilerle paylaşılmaz. Başka şehirdeki bir yakınınızın ziyaret sonrası bilgilendirilmesini istiyorsanız bunu randevu sırasında belirtmeniz yeterlidir.",
  },
  {
    id: "whatsapp-form", cat: "gizlilik",
    q: "Formlar neden WhatsApp üzerinden gönderiliyor?",
    a: "Sitemizde form bilgilerini saklayan bir sunucu bulunmuyor. Bilgileriniz doğrudan kendi telefonunuzdan WhatsApp mesajı olarak bize ulaşır; göndermeden önce mesajın içeriğini görebilir ve düzenleyebilirsiniz.",
  },
  {
    id: "ne-zaman-112", cat: "acil",
    q: "Ne zaman 112'yi aramalıyım?",
    a: "Bilinç kaybı veya bayılma, ani ve şiddetli göğüs ağrısı, ağır nefes darlığı, yüzde kayma, konuşma bozukluğu, kol veya bacakta ani güçsüzlük, durdurulamayan kanama ve dudak ya da dil şişmesiyle gelen alerjik reaksiyonlarda beklemeden 112'yi arayın.",
  },
  {
    id: "ambulans-112", cat: "acil",
    q: "Özel ambulans ile 112 arasındaki fark nedir?",
    a: "112, hayati tehlike durumunda ilk aranması gereken acil sağlık hizmetidir. Özel ambulans hizmetimiz ise hastane–ev arası nakil, taburcu sonrası eve dönüş ve şehirlerarası transfer gibi planlı hasta nakilleri için kullanılır.",
  },
];

export const getFaq = (id) => faqs.find((f) => f.id === id);

export const translations = {
  en: {
    "neden-evde": {
      q: "Why choose healthcare at home?",
      a: "Home healthcare reduces the need to travel to hospital, so patients can recover in familiar surroundings with their family. There is no travel or waiting time, the risk of hospital-acquired infection is lower and care is planned around the individual.",
    },
    bolgeler: {
      q: "Which areas do you cover?",
      a: "We provide home healthcare in Sakarya, Düzce, Kocaeli and Istanbul. With our private ambulance service we can also reach a wider area.",
    },
    ucret: {
      q: "How are fees calculated?",
      a: "Fees depend on the type and length of the service. Just call us or send a WhatsApp message to get clear information and the package that suits you.",
    },
    uzmanlik: {
      q: "What are your doctors' specialities?",
      a: "Our team includes doctors in internal medicine, emergency medicine, physical therapy and traditional medicine. Each patient is referred to the most suitable specialist.",
    },
    "acil-sure": {
      q: "How quickly can you come in an urgent situation?",
      a: "For urgent calls we reach the patient's address in 30–45 minutes on average. If life is in danger (loss of consciousness, chest pain, severe shortness of breath), please call 112 first.",
    },
    "baska-sehir": {
      q: "I live in another city. Can I arrange care for my mother or father?",
      a: "Yes. You can book the visit yourself by phone or WhatsApp. After the visit we let you know what was done and share the measurement results.",
    },
    "recete-igne": {
      q: "Can I have an injection or drip prescribed by my doctor given at home?",
      a: "Yes. Simply send a photo of your prescription or doctor's note via WhatsApp; our nurse will come to your home at a convenient time and administer it.",
    },
    "serum-oncesi": {
      q: "Is an assessment needed before an IV drip?",
      a: "Before an IV drip, your health, the medicines you take and any allergies are reviewed. The contents are chosen for you individually.",
    },
    "otel-ofis": {
      q: "Do you come to hotels or offices?",
      a: "Yes. We serve guests staying in hotels in and around Sapanca and Kartepe, and we offer group IV drips and health services at company offices.",
    },
    kvkk: {
      q: "How are my personal and health data protected?",
      a: "The information you share is processed only to provide your care, in line with Turkey's Personal Data Protection Law No. 6698 (KVKK). Details are on our KVKK & Privacy page.",
    },
    "calisma-saatleri": {
      q: "On which days and at what times are you available?",
      a: "You can reach us 7 days a week, 24 hours a day, including weekends and public holidays. We agree the visit time together to suit you and the patient.",
    },
    "randevu-nasil": {
      q: "How do I book an appointment?",
      a: "You can call us, message us on WhatsApp or fill in the online booking form on our website. The form turns your details into a ready-to-send WhatsApp message; once you send it, our team confirms a suitable time with you.",
    },
    "ziyaret-hazirlik": {
      q: "What should I have ready before the visit?",
      a: "It helps to have a list of current medicines (or their boxes), any prescription or doctor's note, recent test results and known allergies ready. Adding directions, the floor and lift information to your message helps the team find you easily.",
    },
    "ziyaret-sureci": {
      q: "What happens during a home visit?",
      a: "Our healthcare professional arrives at your address at the agreed time. First your symptoms, medicines and general condition are assessed; then the necessary procedure is carried out following hygiene rules. At the end you are told what was done and what to look out for.",
    },
    "ayni-gun": {
      q: "Can I get a same-day appointment?",
      a: "Depending on our team's availability, a visit can also be arranged on the same day. For the quickest answer we recommend calling us.",
    },
    "serum-sure": {
      q: "How long does an IV drip take?",
      a: "It depends on the contents and volume of the drip and on the person. Your general condition is monitored throughout, and you will be told how long it is expected to take when booking.",
    },
    "serum-kimlere": {
      q: "Can anyone have an IV drip?",
      a: "No, a drip may not be suitable for everyone. Always tell us beforehand if you are pregnant or breastfeeding, have kidney, heart or liver disease, or have a known allergy. Suitability is decided by a doctor's assessment; ask your doctor about any medicines you take regularly.",
    },
    "serum-sonrasi": {
      q: "What should I watch for after a drip?",
      a: "Slight bruising where the cannula was placed can happen. Let us know if swelling, pain or redness in the arm increases, or if you have a fever or chills. For signs of allergy such as itching, a rash or shortness of breath, call 112 immediately. See our After an IV Drip care guide for details.",
    },
    "tahlil-aclik": {
      q: "Do I need to fast before a home blood test?",
      a: "Some tests (for example fasting blood sugar and cholesterol) usually require 8–12 hours of fasting; you may drink water during this time. We will tell you how to prepare for your specific tests when you book. Do not stop your regular medicines without asking your doctor.",
    },
    "tahlil-turleri": {
      q: "Which tests can be done at home?",
      a: "We can take blood samples at home and carry out urine and culture tests, check-up test panels and PCR tests. You can send us the list of tests your doctor requested via WhatsApp.",
    },
    "tahlil-sonuc": {
      q: "How do I receive my test results?",
      a: "Samples are taken to the laboratory, and the results are sent to you — and to your doctor if you wish — once they are ready. The time needed depends on the type of test. Please ask your doctor to interpret the results.",
    },
    "odeme-yontem": {
      q: "How can I pay?",
      a: "Payment options may vary by service. For up-to-date information just message us on WhatsApp or give us a call.",
    },
    iptal: {
      q: "Can I cancel or reschedule my appointment?",
      a: "Yes. If your plans change, please let us know by phone or WhatsApp as early as possible and we will agree a new time together. Message us for information on cancellation terms.",
    },
    sigorta: {
      q: "Does SGK or private health insurance cover the costs?",
      a: "This depends on the type of service and the scope of your policy. Message us for information; if you have private insurance, we also recommend checking with your insurer.",
    },
    "veri-paylasim": {
      q: "Will my health information be shared with my relatives?",
      a: "Under KVKK, your health information is not shared with third parties without your consent. If you would like a relative in another city to be updated after the visit, simply tell us when you book.",
    },
    "whatsapp-form": {
      q: "Why are the forms sent via WhatsApp?",
      a: "Our website has no server that stores form data. Your details reach us directly from your own phone as a WhatsApp message, and you can see and edit the message before sending it.",
    },
    "ne-zaman-112": {
      q: "When should I call 112?",
      a: "Call 112 without delay for loss of consciousness or fainting, sudden severe chest pain, severe shortness of breath, a drooping face, slurred speech, sudden weakness in an arm or leg, bleeding that will not stop, or an allergic reaction with swelling of the lips or tongue.",
    },
    "ambulans-112": {
      q: "What is the difference between a private ambulance and 112?",
      a: "112 is the emergency medical service and the first number to call when life is in danger. Our private ambulance service is for planned patient transport, such as hospital-to-home transfers, going home after discharge and transfers between cities.",
    },
  },
  ar: {
    "neden-evde": {
      q: "لماذا أختار الرعاية الصحية في المنزل؟",
      a: "تقلّل الرعاية الصحية المنزلية من حاجة المريض للذهاب إلى المستشفى، فيتعافى في بيئته المألوفة بين أفراد عائلته. لا وقت يضيع في الطريق أو الانتظار، ويقلّ خطر عدوى المستشفيات، وتُخطَّط الرعاية بحسب حالة كل شخص.",
    },
    bolgeler: {
      q: "ما المناطق التي تقدّمون فيها خدماتكم؟",
      a: "نقدّم الرعاية الصحية المنزلية في سكاريا ودوزجه وكوجالي وإسطنبول، ويمكننا الوصول إلى مناطق أوسع من خلال خدمة الإسعاف الخاص.",
    },
    ucret: {
      q: "كيف تُحدَّد الأسعار؟",
      a: "تُحدَّد الأجرة بحسب نوع الخدمة ومدتها. يكفي أن تتصل بنا أو تراسلنا عبر واتساب لتحصل على معلومات واضحة والباقة المناسبة لك.",
    },
    uzmanlik: {
      q: "ما تخصصات أطبائكم؟",
      a: "يضم فريقنا أطباء في الأمراض الباطنية وطب الطوارئ والعلاج الطبيعي والطب التقليدي، ويُوجَّه كل مريض إلى الأخصائي الأنسب لحالته.",
    },
    "acil-sure": {
      q: "كم تستغرقون للوصول في الحالات العاجلة؟",
      a: "في الاتصالات العاجلة نصل إلى عنوان المريض خلال 30 إلى 45 دقيقة في المتوسط. إذا كانت الحياة في خطر (فقدان الوعي، ألم في الصدر، ضيق تنفس شديد) فاتصل أولاً بالرقم 112.",
    },
    "baska-sehir": {
      q: "أعيش في مدينة أخرى، هل يمكنني طلب الخدمة لوالدتي أو والدي؟",
      a: "نعم. يمكنك حجز الموعد بنفسك عبر الهاتف أو واتساب، وبعد الزيارة نُطلعك على ما تم من إجراءات ونتائج القياسات.",
    },
    "recete-igne": {
      q: "هل يمكنني أخذ الحقنة أو المحلول الذي وصفه الطبيب في المنزل؟",
      a: "نعم. يكفي أن ترسل صورة الوصفة الطبية أو ملاحظة الطبيب عبر واتساب، وتأتي ممرضتنا إلى منزلك في الوقت المناسب لإعطائها.",
    },
    "serum-oncesi": {
      q: "هل يلزم فحص قبل المحلول الوريدي؟",
      a: "قبل إعطاء المحلول تُقيَّم حالتك الصحية والأدوية التي تتناولها وأي حساسية لديك، ويُحدَّد المحتوى بشكل شخصي.",
    },
    "otel-ofis": {
      q: "هل تقدّمون الخدمة في الفنادق أو المكاتب؟",
      a: "نعم. نخدم النزلاء المقيمين في فنادق سبانجا وكارتبه وما حولها، كما نقدّم للشركات محاليل وريدية جماعية وخدمات صحية في مكاتبها.",
    },
    kvkk: {
      q: "كيف تُحمى بياناتي الشخصية والصحية؟",
      a: "تُعالَج المعلومات التي تشاركها لغرض تقديم الخدمة لك فقط، وفق قانون حماية البيانات الشخصية التركي رقم 6698 (KVKK). التفاصيل في صفحة الخصوصية لدينا.",
    },
    "calisma-saatleri": {
      q: "في أي أيام وساعات تعملون؟",
      a: "يمكنك التواصل معنا 7 أيام في الأسبوع و24 ساعة في اليوم، بما في ذلك عطلات نهاية الأسبوع والأعياد. ونحدّد موعد الزيارة معك بما يناسبك ويناسب المريض.",
    },
    "randevu-nasil": {
      q: "كيف أحجز موعداً؟",
      a: "يمكنك الاتصال بنا أو مراسلتنا عبر واتساب أو تعبئة نموذج الحجز الإلكتروني في موقعنا. يحوّل النموذج بياناتك إلى رسالة واتساب جاهزة، وبعد إرسالها يؤكّد فريقنا معك الوقت المناسب.",
    },
    "ziyaret-hazirlik": {
      q: "ماذا أجهّز قبل الزيارة؟",
      a: "يفيد أن تجهّز قائمة بالأدوية التي تُستخدم (أو علبها)، والوصفة الطبية أو ملاحظة الطبيب إن وُجدت، ونتائج التحاليل الأخيرة، وأي حساسية معروفة. كما أن إضافة وصف العنوان والطابق ووجود المصعد إلى رسالتك يسهّل على الفريق الوصول إليك.",
    },
    "ziyaret-sureci": {
      q: "كيف تجري الزيارة المنزلية؟",
      a: "يصل أحد أفراد طاقمنا الصحي إلى عنوانك في الموعد المتفق عليه. تُقيَّم أولاً شكواك والأدوية التي تتناولها وحالتك العامة، ثم يُجرى الإجراء اللازم وفق قواعد النظافة، وفي النهاية تُعطى معلومات عمّا تم وما ينبغي الانتباه إليه.",
    },
    "ayni-gun": {
      q: "هل يمكنني الحصول على موعد في اليوم نفسه؟",
      a: "يمكن ترتيب الزيارة في اليوم نفسه بحسب توفر فريقنا. وللحصول على أسرع إجابة ننصحك بالاتصال بنا هاتفياً.",
    },
    "serum-sure": {
      q: "كم يستغرق المحلول الوريدي؟",
      a: "تختلف المدة بحسب محتوى المحلول وحجمه وحالة الشخص. تُتابَع حالتك العامة طوال فترة الإعطاء، ونخبرك بالمدة المتوقعة عند الحجز.",
    },
    "serum-kimlere": {
      q: "هل يمكن لأي شخص أخذ المحلول الوريدي؟",
      a: "لا، قد لا يكون المحلول مناسباً للجميع. أخبرنا مسبقاً إذا كنتِ حاملاً أو مرضعة، أو لديك مرض في الكلى أو القلب أو الكبد، أو حساسية معروفة. تُحدَّد الملاءمة بتقييم الطبيب، واستشر طبيبك بشأن الأدوية التي تتناولها بانتظام.",
    },
    "serum-sonrasi": {
      q: "ما الذي يجب الانتباه إليه بعد المحلول؟",
      a: "قد تظهر كدمة خفيفة في مكان القسطرة. أخبرنا إذا زاد التورم أو الألم أو الاحمرار في الذراع، أو ظهرت حرارة أو قشعريرة. وعند ظهور علامات الحساسية مثل الحكة أو الطفح أو ضيق التنفس اتصل فوراً بالرقم 112. للتفاصيل راجع دليل العناية بعد المحلول الوريدي.",
    },
    "tahlil-aclik": {
      q: "هل يجب أن أكون صائماً قبل تحليل الدم المنزلي؟",
      a: "بعض التحاليل (مثل سكر الدم الصيامي والكوليسترول) تتطلب عادةً صياماً من 8 إلى 12 ساعة، ويمكنك شرب الماء خلال ذلك. نخبرك عند الحجز كيف تستعد لكل تحليل. لا توقف أدويتك المعتادة دون استشارة طبيبك.",
    },
    "tahlil-turleri": {
      q: "ما التحاليل التي يمكن إجراؤها في المنزل؟",
      a: "يمكن سحب الدم في المنزل وإجراء تحاليل البول والمزارع وباقات تحاليل الفحص الشامل واختبار PCR. ويمكنك إرسال قائمة التحاليل التي طلبها طبيبك عبر واتساب.",
    },
    "tahlil-sonuc": {
      q: "كيف أحصل على نتائج التحاليل؟",
      a: "تُنقل العينات إلى المختبر، وعند جاهزية النتائج تُرسَل إليك وإلى طبيبك إن رغبت. تختلف المدة بحسب نوع التحليل. استشر طبيبك لتفسير النتائج.",
    },
    "odeme-yontem": {
      q: "كيف يمكنني الدفع؟",
      a: "قد تختلف خيارات الدفع بحسب الخدمة. للحصول على معلومات محدّثة يكفي أن تراسلنا عبر واتساب أو تتصل بنا.",
    },
    iptal: {
      q: "هل يمكنني إلغاء الموعد أو تأجيله؟",
      a: "نعم. إذا تغيّرت خططك فأبلغنا هاتفياً أو عبر واتساب في أقرب وقت ممكن، ونحدّد معك موعداً جديداً. راسلنا لمعرفة شروط الإلغاء.",
    },
    sigorta: {
      q: "هل يغطي الضمان الاجتماعي (SGK) أو التأمين الصحي الخاص التكاليف؟",
      a: "يعتمد ذلك على نوع الخدمة ونطاق وثيقة التأمين لديك. راسلنا للحصول على المعلومات، وإن كان لديك تأمين خاص فننصحك بمراجعة شركة التأمين أيضاً.",
    },
    "veri-paylasim": {
      q: "هل تُشارَك معلوماتي الصحية مع أقاربي؟",
      a: "بموجب قانون KVKK لا تُشارَك معلوماتك الصحية مع أطراف ثالثة دون موافقتك. وإذا أردت إطلاع قريب لك في مدينة أخرى بعد الزيارة فيكفي أن تذكر ذلك عند الحجز.",
    },
    "whatsapp-form": {
      q: "لماذا تُرسَل النماذج عبر واتساب؟",
      a: "لا يوجد في موقعنا خادم يخزّن بيانات النماذج. تصلنا بياناتك مباشرة من هاتفك على شكل رسالة واتساب، ويمكنك رؤية محتوى الرسالة وتعديله قبل إرسالها.",
    },
    "ne-zaman-112": {
      q: "متى يجب أن أتصل بالرقم 112؟",
      a: "اتصل بالرقم 112 دون تأخير عند فقدان الوعي أو الإغماء، أو ألم الصدر المفاجئ والشديد، أو ضيق التنفس الشديد، أو ميلان الوجه وصعوبة الكلام وضعف مفاجئ في الذراع أو الساق، أو نزيف لا يتوقف، أو تفاعل تحسسي مع تورم الشفتين أو اللسان.",
    },
    "ambulans-112": {
      q: "ما الفرق بين الإسعاف الخاص والرقم 112؟",
      a: "الرقم 112 هو خدمة الطوارئ الطبية وأول رقم يجب الاتصال به عندما تكون الحياة في خطر. أما خدمة الإسعاف الخاص لدينا فهي لنقل المرضى المخطط له، مثل النقل بين المستشفى والمنزل والعودة إلى المنزل بعد الخروج من المستشفى والنقل بين المدن.",
    },
  },
};
