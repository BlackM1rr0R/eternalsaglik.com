// Printable home-care guides (/bakim-rehberi/:slug). General guidance only;
// every guide reminds the reader to follow their own doctor's instructions.
// `service` links the guide to the related service page (/hizmet/:service).
export const careGuides = [
  {
    slug: "ameliyat-sonrasi-yara-bakimi",
    service: "yara-bakimi",
    title: "Ameliyat Sonrası Yara Bakımı",
    summary: "Ameliyat yaranızın evde temiz ve güvenli iyileşmesi için temel adımlar.",
    sections: [
      { h: "Günlük bakım", items: ["Yaraya dokunmadan önce ellerinizi sabun ve suyla en az 20 saniye yıkayın.", "Pansumanı doktorunuzun veya hemşirenizin söylediği aralıklarla değiştirin.", "Yarayı kuru ve temiz tutun; izin verilene kadar küvete girmeyin, havuza ve denize girmeyin.", "Yara üzerine krem, pudra veya bitkisel karışım sürmeyin."] },
      { h: "Beslenme ve hareket", items: ["Bol su için, protein ve sebze ağırlıklı beslenin.", "Ağır kaldırmaktan ve yarayı geren hareketlerden kaçının.", "Doktorunuzun izin verdiği ölçüde kısa yürüyüşler yapın."] },
      { h: "Hemen haber verin", danger: true, items: ["Yarada artan kızarıklık, şişlik veya ısı artışı", "Sarı/yeşil akıntı veya kötü koku", "38°C ve üzeri ateş", "Dikişlerin açılması veya kanamanın durmaması"] },
    ],
  },
  {
    slug: "basi-yarasi-onleme",
    service: "evde-hasta-bakici",
    title: "Bası Yarasını (Dekubit) Önleme",
    summary: "Yatağa bağımlı hastalarda bası yarası riskini azaltmak için aileye yönelik rehber.",
    sections: [
      { h: "Pozisyon", items: ["Hastanın pozisyonunu en az 2 saatte bir değiştirin.", "Topuk, kalça, sakrum ve dirsek gibi kemik çıkıntılarının altına yastık destek koyun.", "Mümkünse havalı (basınç azaltıcı) yatak kullanın."] },
      { h: "Cilt bakımı", items: ["Cildi her gün kızarıklık açısından kontrol edin.", "Cildi kuru tutun; ıslak bez ve çarşafı hemen değiştirin.", "Kızarık bölgeye masaj yapmayın.", "Nemlendirici ile cildin kurumasını önleyin."] },
      { h: "Beslenme", items: ["Yeterli protein ve sıvı alımı yaranın oluşmasını ve ilerlemesini önlemeye yardım eder."] },
      { h: "Hemen haber verin", danger: true, items: ["Basınca rağmen beyazlaşmayan kızarıklık", "Ciltte açılma, su toplama veya morarma", "Yarada koku veya akıntı"] },
    ],
  },
  {
    slug: "diyabetik-ayak-bakimi",
    service: "yara-bakimi",
    title: "Diyabetik Ayak Bakımı",
    summary: "Şeker hastalarının ayak yaralarını önlemek için günlük kontrol listesi.",
    sections: [
      { h: "Her gün", items: ["Ayaklarınızı her gün ayna yardımıyla kontrol edin; parmak aralarına bakın.", "Ilık suyla yıkayın, özellikle parmak aralarını iyice kurulayın.", "Topuklara nemlendirici sürün, parmak aralarına sürmeyin."] },
      { h: "Ayakkabı ve çorap", items: ["Çıplak ayakla yürümeyin.", "Dikişsiz, pamuklu çorap ve rahat ayakkabı giyin.", "Ayakkabının içini giymeden önce kontrol edin."] },
      { h: "Kesinlikle yapmayın", items: ["Nasırları kendiniz kesmeyin veya nasır ilacı kullanmayın.", "Ayaklarınızı sobaya, termofora veya sıcak suya tutmayın."] },
      { h: "Hemen haber verin", danger: true, items: ["İyileşmeyen yara veya çatlak", "Ayakta renk değişikliği, şişlik veya ısı artışı", "Uyuşma ve his kaybında artış"] },
    ],
  },
  {
    slug: "serum-sonrasi",
    service: "evde-serum",
    title: "Serum Uygulaması Sonrası",
    summary: "Serum ve damar yolu uygulamasından sonra dikkat edilecekler.",
    sections: [
      { h: "İlk saatler", items: ["Damar yolu bölgesine birkaç dakika hafif baskı uygulayın.", "Bandı 1-2 saat çıkarmayın.", "Bol su için."] },
      { h: "Normal kabul edilenler", items: ["Bölgede hafif morarma", "Kısa süreli hafif yorgunluk"] },
      { h: "Hemen haber verin", danger: true, items: ["Kol veya elde şişlik, ağrı, kızarıklık", "Kaşıntı, döküntü, nefes darlığı (alerji belirtileri — acil durumda 112)", "Ateş veya titreme"] },
    ],
  },
  {
    slug: "dusmeleri-onleme",
    service: "evde-hasta-bakici",
    title: "Evde Yaşlı Bakımında Düşmeleri Önleme",
    summary: "Yaşlı yakınınızın evde düşme riskini azaltmak için oda oda kontrol listesi.",
    sections: [
      { h: "Ev düzeni", items: ["Halı kenarlarını sabitleyin ya da kaygan halıları kaldırın.", "Yürüme yolundaki kablo, eşya ve eşikleri ortadan kaldırın.", "Sık kullanılan eşyaları uzanmadan alınabilecek yüksekliğe koyun.", "Merdivenlerin iki yanına tutunma yeri ve kaymaz bant ekleyin."] },
      { h: "Aydınlatma", items: ["Yatak odasından banyoya giden yola gece lambası koyun.", "Işık düğmelerine yataktan ve kapı girişinden kolayca ulaşılabilsin.", "Merdivenlerin başında ve sonunda yeterli ışık olsun."] },
      { h: "Banyo", items: ["Duş ve küvet içine kaymaz paspas koyun.", "Klozet ve duş yanına tutunma barı taktırın.", "Gerekirse duş taburesi kullanın; banyo kapısını içeriden kilitlemeyin."] },
      { h: "Kişinin kendisi", items: ["Arkası kapalı, kaymaz tabanlı terlik veya ayakkabı giyin.", "Yataktan kalkarken önce birkaç dakika oturun, sonra yavaşça ayağa kalkın.", "Doktorunuzun önerdiği baston veya yürüteci kullanın.", "Baş dönmesi yapabilen ilaçları ve göz kontrollerini doktorunuzla gözden geçirin."] },
      { h: "Düşme olursa", items: ["Kişiyi hemen kaldırmaya çalışmayın; önce ağrı, kanama ve bilinç durumunu kontrol edin.", "Ağrı yoksa ve kişi kendini iyi hissediyorsa, sağlam bir sandalye yardımıyla yavaşça kalkmasına destek olun.", "Düşmeyi küçük görünse bile doktorunuza bildirin."] },
      { h: "Hemen 112'yi arayın", danger: true, items: ["Bilinç kaybı, uyku hali veya konfüzyon", "Başını çarptıktan sonra kusma veya şiddetli baş ağrısı", "Kalça veya bacakta şiddetli ağrı, bacağın kısalması ya da dönmesi", "Durdurulamayan kanama"] },
    ],
  },
  {
    slug: "sonda-bakimi",
    service: "evde-hemsire",
    title: "İdrar Sondası (Kateter) Bakımı",
    summary: "Evde idrar sondası kullanan hastalar ve bakım verenler için günlük bakım rehberi.",
    sections: [
      { h: "Temizlik", items: ["Sondaya ve torbaya dokunmadan önce ve sonra ellerinizi sabun ve suyla yıkayın.", "Sondanın çıktığı bölgeyi her gün ılık su ve sabunla nazikçe temizleyin, iyice kurulayın.", "Bölgeye pudra veya krem sürmeyin."] },
      { h: "Torba ve hortum", items: ["Torbayı her zaman mesane seviyesinin altında tutun; yere değdirmeyin.", "Hortumun bükülmemesine ve altında kalmamasına dikkat edin.", "Torbayı yarı dolduğunda veya hemşirenizin söylediği aralıklarla boşaltın.", "Sondayı ve torbayı gereksiz yere birbirinden ayırmayın."] },
      { h: "Günlük yaşam", items: ["Doktorunuz kısıtlamadıysa gün içine yayarak yeterince sıvı alın.", "Sondayı bacağa sabitleyerek çekilmesini önleyin.", "Sonda değişimini kendiniz yapmayın; değişim zamanını sağlık ekibinizle planlayın."] },
      { h: "Hemen haber verin", danger: true, items: ["Saatlerce idrar gelmemesi veya karında şişkinlik ve ağrı", "Ateş, titreme veya bulanık, kötü kokulu idrar", "İdrarda kan veya pıhtı", "Sondanın yerinden çıkması ya da çevresinden sürekli sızıntı"] },
    ],
  },
  {
    slug: "evde-ilac-duzeni",
    service: "evde-hemsire",
    title: "Evde İlaç Düzeni",
    summary: "Birden çok ilaç kullanan yakınınızın ilaçlarını güvenli ve düzenli almasına yardımcı olacak öneriler.",
    sections: [
      { h: "Güncel liste", items: ["Kullanılan tüm ilaçların adını, ne için kullanıldığını ve doktorun söylediği saatleri bir listeye yazın.", "Bitkisel ürün, vitamin ve reçetesiz ilaçları da listeye ekleyin.", "Listeyi her doktor ziyaretinde yanınızda götürün ve değişiklikleri işleyin."] },
      { h: "Düzenleme", items: ["Haftalık, sabah-öğle-akşam bölmeli ilaç kutusu kullanın.", "Kutuyu her hafta aynı gün, iyi aydınlatılmış bir yerde doldurun.", "Telefon alarmı veya bir takvim ile hatırlatma kurun.", "İlaçları orijinal kutularında, nemden, güneşten ve çocuklardan uzak saklayın."] },
      { h: "Dikkat edilecekler", items: ["Doktorunuza danışmadan ilaç dozunu değiştirmeyin veya ilacı bırakmayın.", "Bir doz atlandığında ne yapılacağını doktorunuza veya eczacınıza sorun; çift doz almayın.", "Son kullanma tarihi geçmiş ilaçları kullanmayın; eczaneye teslim edin.", "Benzer görünen kutuları ayrı yerlerde tutun."] },
      { h: "Hemen haber verin", danger: true, items: ["Yanlışlıkla fazla ilaç alındığından şüpheleniyorsanız (acil durumda 112)", "Yeni bir ilaçtan sonra döküntü, kaşıntı, dudak veya dil şişmesi, nefes darlığı (112)", "İlaç başladıktan sonra belirgin baş dönmesi, aşırı uyku hali veya düşmeler"] },
    ],
  },
  {
    slug: "ates-yonetimi",
    service: "evde-doktor",
    title: "Evde Ateş Takibi",
    summary: "Ateşi doğru ölçmek, evde rahatlatmak ve ne zaman doktora başvurmak gerektiğini bilmek için rehber.",
    sections: [
      { h: "Doğru ölçüm", items: ["Dijital bir termometre kullanın ve kullanım talimatına uyun.", "Sıcak içecekten, banyodan veya egzersizden hemen sonra ölçüm yapmayın.", "Ölçüm saatini ve sonucunu not edin; doktorunuzla paylaşmak işinizi kolaylaştırır."] },
      { h: "Evde rahatlatma", items: ["Bol sıvı alın; az ve sık içmek daha kolaydır.", "Hafif, ince giysiler giyin; kalın battaniyeye sarınmayın.", "Odayı serin ve havadar tutun, dinlenin.", "Ateş düşürücü ilaçları yalnızca doktorunuzun veya eczacınızın önerdiği doz ve aralıkta kullanın."] },
      { h: "Doktorunuza danışın", items: ["Ateş birkaç gün sürüyorsa veya tekrar ediyorsa", "Kronik hastalığı olan, yaşlı ya da bağışıklığı zayıf kişilerde", "Ateşle birlikte idrar yanması, kulak ağrısı veya inatçı öksürük varsa", "3 aydan küçük bebeklerde her ateşte"] },
      { h: "Hemen 112'yi arayın", danger: true, items: ["Bilinç bulanıklığı, aşırı uyku hali veya uyandırmakta güçlük", "Ense sertliği ya da bastırınca solmayan döküntü", "Nöbet (havale) geçirme", "Nefes almada belirgin güçlük veya morarma"] },
    ],
  },
  {
    slug: "evde-tansiyon-olcumu",
    service: "evde-doktor",
    title: "Evde Doğru Tansiyon Ölçümü",
    summary: "Evde tansiyon ölçerken güvenilir sonuç almak ve kayıt tutmak için adım adım rehber.",
    sections: [
      { h: "Ölçümden önce", items: ["Ölçümden önceki 30 dakika içinde kahve, sigara ve egzersizden kaçının.", "Tuvalet ihtiyacınızı giderin ve 5 dakika sessizce oturarak dinlenin.", "Kolunuza uygun boyutta manşonu olan, üst koldan ölçen bir cihaz tercih edin."] },
      { h: "Ölçüm sırasında", items: ["Sırtınız dayalı, ayaklarınız yere düz basacak şekilde oturun; bacak bacak üstüne atmayın.", "Kolunuzu kalp hizasında bir masaya koyun; manşonu çıplak kola takın.", "Ölçüm sırasında konuşmayın ve hareket etmeyin.", "1-2 dakika arayla iki ölçüm yapıp ikisini de kaydedin."] },
      { h: "Kayıt tutma", items: ["Doktorunuzun önerdiği günlerde sabah ve akşam aynı saatlerde ölçün.", "Tarih, saat, büyük ve küçük tansiyon ile nabız değerini not edin.", "Kayıtlarınızı kontrollerde doktorunuza gösterin; ilaç kararını tek bir ölçüme göre kendiniz vermeyin."] },
      { h: "Hemen 112'yi arayın", danger: true, items: ["Yüksek tansiyonla birlikte göğüs ağrısı veya nefes darlığı", "Yüzde kayma, konuşma bozukluğu, kolda veya bacakta ani güçsüzlük", "Ani ve çok şiddetli baş ağrısı ya da görme kaybı"] },
    ],
  },
];

export const getCareGuide = (slug) => careGuides.find((g) => g.slug === slug);

export const translations = {
  en: {
    "ameliyat-sonrasi-yara-bakimi": {
      title: "Wound Care After Surgery",
      summary: "Key steps to help your surgical wound heal cleanly and safely at home.",
      sections: [
        { h: "Daily care", items: ["Wash your hands with soap and water for at least 20 seconds before touching the wound.", "Change the dressing as often as your doctor or nurse has advised.", "Keep the wound clean and dry; do not take baths, swim in pools or the sea until you are allowed to.", "Do not apply creams, powders or herbal mixtures to the wound."] },
        { h: "Nutrition and movement", items: ["Drink plenty of water and eat a diet rich in protein and vegetables.", "Avoid heavy lifting and movements that stretch the wound.", "Take short walks as far as your doctor allows."] },
        { h: "Tell us straight away", items: ["Increasing redness, swelling or warmth around the wound", "Yellow/green discharge or a bad smell", "A temperature of 38°C or above", "Stitches opening or bleeding that will not stop"] },
      ],
    },
    "basi-yarasi-onleme": {
      title: "Preventing Pressure Sores (Bedsores)",
      summary: "A guide for families to lower the risk of pressure sores in bed-bound patients.",
      sections: [
        { h: "Positioning", items: ["Change the patient's position at least every 2 hours.", "Place pillows under bony areas such as the heels, hips, lower back and elbows.", "Use an air (pressure-relieving) mattress if possible."] },
        { h: "Skin care", items: ["Check the skin for redness every day.", "Keep the skin dry; change wet pads and sheets straight away.", "Do not massage red areas.", "Use a moisturiser to stop the skin drying out."] },
        { h: "Nutrition", items: ["Enough protein and fluids help prevent sores from forming and getting worse."] },
        { h: "Tell us straight away", items: ["Redness that does not turn pale when pressed", "Broken skin, blisters or bruising", "A smell or discharge from a wound"] },
      ],
    },
    "diyabetik-ayak-bakimi": {
      title: "Diabetic Foot Care",
      summary: "A daily checklist to help people with diabetes prevent foot wounds.",
      sections: [
        { h: "Every day", items: ["Check your feet every day using a mirror; look between your toes.", "Wash them in lukewarm water and dry carefully, especially between the toes.", "Apply moisturiser to your heels but not between your toes."] },
        { h: "Shoes and socks", items: ["Do not walk barefoot.", "Wear seamless cotton socks and comfortable shoes.", "Check inside your shoes before putting them on."] },
        { h: "Never", items: ["Cut corns yourself or use corn remedies.", "Hold your feet near a stove, hot-water bottle or in hot water."] },
        { h: "Tell us straight away", items: ["A wound or crack that does not heal", "Colour change, swelling or warmth in the foot", "Increasing numbness or loss of feeling"] },
      ],
    },
    "serum-sonrasi": {
      title: "After an IV Drip",
      summary: "What to watch for after an IV drip or cannula.",
      sections: [
        { h: "First few hours", items: ["Press gently on the cannula site for a few minutes.", "Leave the plaster on for 1–2 hours.", "Drink plenty of water."] },
        { h: "What is normal", items: ["Slight bruising at the site", "Brief, mild tiredness"] },
        { h: "Tell us straight away", items: ["Swelling, pain or redness in the arm or hand", "Itching, rash or shortness of breath (signs of allergy — in an emergency call 112)", "Fever or chills"] },
      ],
    },
    "dusmeleri-onleme": {
      title: "Preventing Falls in Elderly Care at Home",
      summary: "A room-by-room checklist to reduce the risk of your elderly relative falling at home.",
      sections: [
        { h: "Around the home", items: ["Fix rug edges down or remove slippery rugs.", "Clear cables, clutter and raised thresholds from walkways.", "Keep everyday items at a height that can be reached without stretching.", "Add handrails on both sides of the stairs and non-slip strips on the steps."] },
        { h: "Lighting", items: ["Put a night light along the route from the bedroom to the bathroom.", "Make sure light switches can be reached easily from the bed and the doorway.", "Ensure there is enough light at the top and bottom of the stairs."] },
        { h: "Bathroom", items: ["Put non-slip mats inside the shower and bath.", "Have grab bars fitted next to the toilet and shower.", "Use a shower stool if needed; do not lock the bathroom door from the inside."] },
        { h: "The person themselves", items: ["Wear closed-back slippers or shoes with non-slip soles.", "When getting out of bed, sit for a few minutes first, then stand up slowly.", "Use the walking stick or frame your doctor recommends.", "Review medicines that can cause dizziness, and eye checks, with your doctor."] },
        { h: "If a fall happens", items: ["Do not rush to lift the person; first check for pain, bleeding and consciousness.", "If there is no pain and they feel well, help them get up slowly using a sturdy chair.", "Tell your doctor about the fall, even if it seems minor."] },
        { h: "Call 112 immediately", items: ["Loss of consciousness, drowsiness or confusion", "Vomiting or severe headache after hitting the head", "Severe pain in the hip or leg, or a leg that looks shortened or turned", "Bleeding that will not stop"] },
      ],
    },
    "sonda-bakimi": {
      title: "Urinary Catheter Care",
      summary: "A daily care guide for patients using a urinary catheter at home and the people caring for them.",
      sections: [
        { h: "Cleanliness", items: ["Wash your hands with soap and water before and after touching the catheter or bag.", "Gently clean the area where the catheter enters the body every day with warm water and soap, and dry it well.", "Do not apply powder or cream to the area."] },
        { h: "Bag and tubing", items: ["Always keep the bag below the level of the bladder and off the floor.", "Make sure the tubing is not kinked or trapped underneath the person.", "Empty the bag when it is half full or as often as your nurse advises.", "Do not disconnect the catheter from the bag unless necessary."] },
        { h: "Daily life", items: ["Unless your doctor has limited fluids, drink enough spread across the day.", "Secure the catheter to the leg so it is not pulled.", "Do not change the catheter yourself; plan changes with your healthcare team."] },
        { h: "Tell us straight away", items: ["No urine draining for several hours, or a swollen, painful abdomen", "Fever, chills, or cloudy, bad-smelling urine", "Blood or clots in the urine", "The catheter coming out, or constant leaking around it"] },
      ],
    },
    "evde-ilac-duzeni": {
      title: "Managing Medicines at Home",
      summary: "Tips to help a relative who takes several medicines take them safely and on time.",
      sections: [
        { h: "An up-to-date list", items: ["Write down every medicine: its name, what it is for and the times your doctor gave.", "Add herbal products, vitamins and over-the-counter medicines to the list too.", "Take the list to every doctor's appointment and note any changes."] },
        { h: "Organising", items: ["Use a weekly pill organiser with morning, midday and evening compartments.", "Fill it on the same day each week, in a well-lit place.", "Set reminders with a phone alarm or a calendar.", "Store medicines in their original boxes, away from damp, sunlight and children."] },
        { h: "Things to watch", items: ["Do not change a dose or stop a medicine without asking your doctor.", "Ask your doctor or pharmacist what to do if a dose is missed; do not take a double dose.", "Do not use expired medicines; return them to a pharmacy.", "Keep boxes that look alike in separate places."] },
        { h: "Tell us straight away", items: ["If you suspect too much medicine has been taken by mistake (in an emergency call 112)", "Rash, itching, swollen lips or tongue, or shortness of breath after a new medicine (call 112)", "Marked dizziness, excessive sleepiness or falls after starting a medicine"] },
      ],
    },
    "ates-yonetimi": {
      title: "Managing a Fever at Home",
      summary: "How to measure a temperature correctly, ease discomfort at home and know when to see a doctor.",
      sections: [
        { h: "Measuring correctly", items: ["Use a digital thermometer and follow its instructions.", "Do not measure straight after a hot drink, a bath or exercise.", "Note the time and the reading; this is useful to share with your doctor."] },
        { h: "Easing discomfort at home", items: ["Drink plenty of fluids; small, frequent sips are easier.", "Wear light, thin clothing; do not wrap up in thick blankets.", "Keep the room cool and airy, and rest.", "Use fever-reducing medicines only at the dose and interval your doctor or pharmacist advises."] },
        { h: "Talk to your doctor", items: ["If the fever lasts several days or keeps coming back", "In older people, those with chronic illness or a weakened immune system", "If the fever comes with burning when passing urine, earache or a persistent cough", "For any fever in a baby under 3 months"] },
        { h: "Call 112 immediately", items: ["Confusion, unusual drowsiness or difficulty waking", "A stiff neck or a rash that does not fade when pressed", "A seizure (fit)", "Marked difficulty breathing or bluish skin"] },
      ],
    },
    "evde-tansiyon-olcumu": {
      title: "Measuring Blood Pressure Correctly at Home",
      summary: "A step-by-step guide to getting reliable blood pressure readings at home and keeping a record.",
      sections: [
        { h: "Before measuring", items: ["Avoid coffee, smoking and exercise for 30 minutes beforehand.", "Use the toilet first, then sit quietly and rest for 5 minutes.", "Choose an upper-arm monitor with a cuff that fits your arm."] },
        { h: "While measuring", items: ["Sit with your back supported and feet flat on the floor; do not cross your legs.", "Rest your arm on a table at heart level and put the cuff on your bare arm.", "Do not talk or move during the measurement.", "Take two readings 1–2 minutes apart and record both."] },
        { h: "Keeping a record", items: ["Measure in the morning and evening at the same times, on the days your doctor recommends.", "Write down the date, time, upper and lower readings and pulse.", "Show your record to your doctor at check-ups; do not make medicine decisions yourself based on a single reading."] },
        { h: "Call 112 immediately", items: ["High blood pressure with chest pain or shortness of breath", "A drooping face, slurred speech, or sudden weakness in an arm or leg", "A sudden, very severe headache or loss of vision"] },
      ],
    },
  },
  ar: {
    "ameliyat-sonrasi-yara-bakimi": {
      title: "العناية بالجرح بعد العملية الجراحية",
      summary: "خطوات أساسية لمساعدة جرح العملية على الالتئام في المنزل بنظافة وأمان.",
      sections: [
        { h: "العناية اليومية", items: ["اغسل يديك بالماء والصابون مدة 20 ثانية على الأقل قبل لمس الجرح.", "غيّر الضماد في الأوقات التي حددها طبيبك أو الممرض.", "حافظ على الجرح نظيفاً وجافاً؛ لا تستحم في حوض ولا تسبح في المسبح أو البحر حتى يُسمح لك.", "لا تضع على الجرح كريمات أو بودرة أو خلطات عشبية."] },
        { h: "التغذية والحركة", items: ["اشرب كمية وافرة من الماء وتناول غذاءً غنياً بالبروتين والخضار.", "تجنّب حمل الأشياء الثقيلة والحركات التي تشدّ الجرح.", "امشِ مسافات قصيرة بالقدر الذي يسمح به طبيبك."] },
        { h: "أبلغنا فوراً", items: ["زيادة الاحمرار أو التورم أو السخونة حول الجرح", "إفرازات صفراء أو خضراء أو رائحة كريهة", "حرارة 38 درجة مئوية أو أكثر", "انفتاح الغرز أو نزيف لا يتوقف"] },
      ],
    },
    "basi-yarasi-onleme": {
      title: "الوقاية من قرح الفراش (قرح الضغط)",
      summary: "دليل للعائلات لتقليل خطر قرح الضغط لدى المرضى طريحي الفراش.",
      sections: [
        { h: "تغيير الوضعية", items: ["غيّر وضعية المريض مرة كل ساعتين على الأقل.", "ضع وسائد تحت المناطق العظمية البارزة مثل الكعبين والوركين وأسفل الظهر والمرفقين.", "استخدم فرشة هوائية (مخففة للضغط) إن أمكن."] },
        { h: "العناية بالجلد", items: ["افحص الجلد يومياً بحثاً عن الاحمرار.", "حافظ على جفاف الجلد، وغيّر الحفاضات والشراشف المبتلة فوراً.", "لا تدلّك المناطق المحمرّة.", "استخدم مرطّباً لمنع جفاف الجلد."] },
        { h: "التغذية", items: ["يساعد تناول ما يكفي من البروتين والسوائل على منع تكوّن القرح وتفاقمها."] },
        { h: "أبلغنا فوراً", items: ["احمرار لا يبيضّ عند الضغط عليه", "تشقق الجلد أو ظهور فقاعات أو كدمات", "رائحة أو إفرازات من الجرح"] },
      ],
    },
    "diyabetik-ayak-bakimi": {
      title: "العناية بالقدم السكرية",
      summary: "قائمة فحص يومية تساعد مرضى السكري على الوقاية من جروح القدم.",
      sections: [
        { h: "كل يوم", items: ["افحص قدميك يومياً بمساعدة مرآة، وانظر بين أصابعك.", "اغسلهما بماء فاتر وجففهما جيداً، خاصة بين الأصابع.", "ضع المرطّب على الكعبين لا بين الأصابع."] },
        { h: "الحذاء والجوارب", items: ["لا تمشِ حافي القدمين.", "ارتدِ جوارب قطنية بلا خياطة وحذاءً مريحاً.", "افحص داخل الحذاء قبل ارتدائه."] },
        { h: "لا تفعل ذلك أبداً", items: ["لا تقصّ مسامير القدم بنفسك ولا تستخدم أدوية إزالتها.", "لا تقرّب قدميك من المدفأة أو قربة الماء الساخن ولا تضعهما في ماء ساخن."] },
        { h: "أبلغنا فوراً", items: ["جرح أو تشقق لا يلتئم", "تغيّر لون القدم أو تورمها أو سخونتها", "ازدياد التنميل أو فقدان الإحساس"] },
      ],
    },
    "serum-sonrasi": {
      title: "بعد المحلول الوريدي",
      summary: "ما يجب الانتباه إليه بعد المحلول الوريدي أو تركيب القسطرة.",
      sections: [
        { h: "الساعات الأولى", items: ["اضغط برفق على مكان القسطرة لبضع دقائق.", "لا تنزع اللاصق قبل ساعة إلى ساعتين.", "اشرب كمية وافرة من الماء."] },
        { h: "ما يُعدّ طبيعياً", items: ["كدمة خفيفة في مكان الإبرة", "تعب خفيف لفترة قصيرة"] },
        { h: "أبلغنا فوراً", items: ["تورم أو ألم أو احمرار في الذراع أو اليد", "حكة أو طفح أو ضيق تنفس (علامات حساسية — في الطوارئ اتصل بـ 112)", "حرارة أو قشعريرة"] },
      ],
    },
    "dusmeleri-onleme": {
      title: "الوقاية من السقوط في رعاية كبار السن بالمنزل",
      summary: "قائمة فحص لكل غرفة لتقليل خطر سقوط قريبك المسن في المنزل.",
      sections: [
        { h: "ترتيب المنزل", items: ["ثبّت أطراف السجاد أو أزل السجاد الزلق.", "أزل الأسلاك والأغراض والعتبات من ممرات المشي.", "ضع الأغراض المستخدمة كثيراً على ارتفاع يمكن الوصول إليه دون تمدد.", "أضف درابزيناً على جانبي الدرج وشرائط مانعة للانزلاق على الدرجات."] },
        { h: "الإضاءة", items: ["ضع ضوءاً ليلياً على الطريق من غرفة النوم إلى الحمام.", "اجعل مفاتيح الإضاءة سهلة الوصول من السرير ومن مدخل الباب.", "تأكد من وجود إضاءة كافية في أعلى الدرج وأسفله."] },
        { h: "الحمام", items: ["ضع حصيرة مانعة للانزلاق داخل الدش وحوض الاستحمام.", "ركّب مقابض للإمساك بجانب المرحاض والدش.", "استخدم كرسي استحمام عند الحاجة، ولا تقفل باب الحمام من الداخل."] },
        { h: "الشخص نفسه", items: ["ارتدِ نعالاً مغلقة من الخلف أو حذاءً بنعل مانع للانزلاق.", "عند النهوض من السرير اجلس بضع دقائق أولاً ثم قف ببطء.", "استخدم العصا أو المشاية التي يوصي بها طبيبك.", "راجع مع طبيبك الأدوية التي قد تسبب الدوار، وفحوصات النظر."] },
        { h: "إذا حدث سقوط", items: ["لا تسارع إلى رفع الشخص؛ تحقق أولاً من الألم والنزيف ومستوى الوعي.", "إذا لم يكن هناك ألم وشعر بأنه بخير، فساعده على النهوض ببطء مستعيناً بكرسي متين.", "أخبر طبيبك بالسقوط حتى لو بدا بسيطاً."] },
        { h: "اتصل بـ 112 فوراً", items: ["فقدان الوعي أو النعاس الشديد أو التشوش", "قيء أو صداع شديد بعد ارتطام الرأس", "ألم شديد في الورك أو الساق، أو ساق تبدو أقصر أو ملتوية", "نزيف لا يتوقف"] },
      ],
    },
    "sonda-bakimi": {
      title: "العناية بالقسطرة البولية",
      summary: "دليل عناية يومية للمرضى الذين يستخدمون قسطرة بولية في المنزل ولمن يعتنون بهم.",
      sections: [
        { h: "النظافة", items: ["اغسل يديك بالماء والصابون قبل لمس القسطرة أو الكيس وبعده.", "نظّف مكان خروج القسطرة يومياً برفق بماء دافئ وصابون، وجففه جيداً.", "لا تضع بودرة أو كريماً على المنطقة."] },
        { h: "الكيس والأنبوب", items: ["أبقِ الكيس دائماً أسفل مستوى المثانة ولا تتركه يلامس الأرض.", "تأكد من أن الأنبوب غير منثنٍ وغير محصور تحت جسم المريض.", "أفرغ الكيس عندما يمتلئ إلى النصف أو بحسب ما يوصي به الممرض.", "لا تفصل القسطرة عن الكيس دون ضرورة."] },
        { h: "الحياة اليومية", items: ["ما لم يقيّد طبيبك السوائل، اشرب كمية كافية موزعة على اليوم.", "ثبّت القسطرة على الساق لتجنّب شدّها.", "لا تغيّر القسطرة بنفسك؛ خطّط لتغييرها مع فريقك الصحي."] },
        { h: "أبلغنا فوراً", items: ["عدم نزول البول لعدة ساعات أو انتفاخ البطن وألمه", "حرارة أو قشعريرة أو بول عكر كريه الرائحة", "دم أو جلطات في البول", "خروج القسطرة من مكانها أو تسرب مستمر حولها"] },
      ],
    },
    "evde-ilac-duzeni": {
      title: "تنظيم الأدوية في المنزل",
      summary: "نصائح لمساعدة قريبك الذي يتناول عدة أدوية على أخذها بأمان وانتظام.",
      sections: [
        { h: "قائمة محدّثة", items: ["اكتب جميع الأدوية: اسم الدواء ودواعي استعماله والأوقات التي حددها الطبيب.", "أضف إلى القائمة المنتجات العشبية والفيتامينات والأدوية التي تُصرف دون وصفة.", "خذ القائمة معك في كل زيارة للطبيب وسجّل أي تغيير."] },
        { h: "التنظيم", items: ["استخدم علبة أدوية أسبوعية مقسّمة إلى صباح وظهر ومساء.", "املأ العلبة في اليوم نفسه من كل أسبوع وفي مكان جيد الإضاءة.", "اضبط تذكيراً بمنبّه الهاتف أو بالتقويم.", "احفظ الأدوية في علبها الأصلية بعيداً عن الرطوبة والشمس والأطفال."] },
        { h: "أمور يجب الانتباه إليها", items: ["لا تغيّر الجرعة ولا توقف الدواء دون استشارة طبيبك.", "اسأل طبيبك أو الصيدلي عمّا يجب فعله عند نسيان جرعة، ولا تأخذ جرعة مضاعفة.", "لا تستخدم الأدوية منتهية الصلاحية، وسلّمها إلى الصيدلية.", "احفظ العلب المتشابهة في أماكن منفصلة."] },
        { h: "أبلغنا فوراً", items: ["إذا اشتبهت في تناول كمية زائدة من الدواء عن طريق الخطأ (في الطوارئ اتصل بـ 112)", "طفح أو حكة أو تورم الشفتين أو اللسان أو ضيق تنفس بعد دواء جديد (اتصل بـ 112)", "دوار واضح أو نعاس مفرط أو حالات سقوط بعد البدء بدواء"] },
      ],
    },
    "ates-yonetimi": {
      title: "التعامل مع الحمّى في المنزل",
      summary: "كيف تقيس الحرارة بشكل صحيح، وتخفف الانزعاج في المنزل، ومتى تراجع الطبيب.",
      sections: [
        { h: "القياس الصحيح", items: ["استخدم ميزان حرارة رقمياً واتبع تعليمات استعماله.", "لا تقِس الحرارة بعد مشروب ساخن أو استحمام أو تمرين مباشرة.", "سجّل وقت القياس ونتيجته؛ فذلك يفيد عند مشاركته مع طبيبك."] },
        { h: "تخفيف الانزعاج في المنزل", items: ["اشرب كمية وافرة من السوائل؛ الرشفات الصغيرة المتكررة أسهل.", "ارتدِ ملابس خفيفة ورقيقة ولا تلتفّ ببطانيات سميكة.", "حافظ على برودة الغرفة وتهويتها، واسترح.", "استخدم خافضات الحرارة فقط بالجرعة والفاصل الزمني اللذين يوصي بهما طبيبك أو الصيدلي."] },
        { h: "استشر طبيبك", items: ["إذا استمرت الحمّى عدة أيام أو تكررت", "لدى كبار السن ومرضى الأمراض المزمنة وضعاف المناعة", "إذا رافقت الحمّى حرقة في البول أو ألم في الأذن أو سعال مستمر", "عند أي حمّى لدى رضيع عمره أقل من 3 أشهر"] },
        { h: "اتصل بـ 112 فوراً", items: ["تشوش أو نعاس غير معتاد أو صعوبة في الاستيقاظ", "تيبّس الرقبة أو طفح لا يختفي عند الضغط عليه", "نوبة تشنج", "صعوبة واضحة في التنفس أو ازرقاق الجلد"] },
      ],
    },
    "evde-tansiyon-olcumu": {
      title: "قياس ضغط الدم بشكل صحيح في المنزل",
      summary: "دليل خطوة بخطوة للحصول على قراءات موثوقة لضغط الدم في المنزل وتسجيلها.",
      sections: [
        { h: "قبل القياس", items: ["تجنّب القهوة والتدخين والتمارين خلال 30 دقيقة قبل القياس.", "ادخل الحمام أولاً، ثم اجلس بهدوء واسترح 5 دقائق.", "اختر جهازاً يقيس من أعلى الذراع بكُمّ يناسب مقاس ذراعك."] },
        { h: "أثناء القياس", items: ["اجلس مسنداً ظهرك وقدماك مستويتان على الأرض، ولا تضع ساقاً فوق أخرى.", "ضع ذراعك على طاولة بمستوى القلب، وثبّت الكُمّ على ذراع عارية.", "لا تتكلم ولا تتحرك أثناء القياس.", "خذ قراءتين بفاصل دقيقة إلى دقيقتين وسجّل كلتيهما."] },
        { h: "تسجيل القراءات", items: ["قِس صباحاً ومساءً في الأوقات نفسها، في الأيام التي يوصي بها طبيبك.", "سجّل التاريخ والوقت والضغط الانقباضي والانبساطي والنبض.", "اعرض سجلك على طبيبك في المراجعات، ولا تتخذ قرار الدواء بنفسك بناءً على قراءة واحدة."] },
        { h: "اتصل بـ 112 فوراً", items: ["ارتفاع الضغط مع ألم في الصدر أو ضيق في التنفس", "ميلان الوجه أو صعوبة الكلام أو ضعف مفاجئ في الذراع أو الساق", "صداع مفاجئ شديد جداً أو فقدان البصر"] },
      ],
    },
  },
};

// Merges translated title/summary/section texts onto a guide while keeping
// structural fields (slug, service, section `danger` flags) from the Turkish base.
export const localizeGuide = (g, lang) => {
  const tr = g && lang !== "tr" ? translations[lang]?.[g.slug] : null;
  if (!tr) return g;
  return {
    ...g,
    title: tr.title || g.title,
    summary: tr.summary || g.summary,
    sections: g.sections.map((s, i) => ({ ...s, ...(tr.sections?.[i] || {}) })),
  };
};
