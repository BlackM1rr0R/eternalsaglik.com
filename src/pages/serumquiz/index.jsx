import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Lightning, ShieldPlus, FlowerLotus, Leaf, Barbell, Scissors, Briefcase, Airplane, CloudSun, PersonSimpleRun,
  ArrowClockwise, Crown, WhatsappLogo, Info, ArrowLeft, ArrowRight, Drop, Trophy, Check,
} from "@phosphor-icons/react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import Icon3D from "../../components/icon3d";
import SerumSVG from "../../components/serumcard";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";
import { serumList, listTranslations, categoryLabel } from "../../data/serums";
import { whatsappUrl } from "../../utils/whatsapp";
import { useT, useLang, useLocalized } from "../../i18n";

// Each answer adds points to serum ids from data/serums.js. Labels live in `dict` (Turkish labels must stay as they are).
const QUESTIONS = [
  {
    id: "need",
    options: [
      { id: "energy", icon: Lightning, tone: "amber", score: { 1: 3, 7: 3, 14: 3, 13: 2, 8: 2 } },
      { id: "immune", icon: ShieldPlus, tone: "teal", score: { 17: 3, 15: 3, 16: 2, 22: 2, 6: 1 } },
      { id: "beauty", icon: FlowerLotus, tone: "rose", score: { 10: 3, 3: 3, 12: 2, 19: 2 } },
      { id: "detox", icon: Leaf, tone: "green", score: { 18: 3, 2: 3, 23: 2, 5: 2, 12: 1 } },
      { id: "sport", icon: Barbell, tone: "blue", score: { 20: 3, 11: 3, 4: 2, 8: 1 } },
      { id: "hair", icon: Scissors, tone: "violet", score: { 9: 4, 7: 1, 3: 1 } },
    ],
  },
  {
    id: "life",
    options: [
      { id: "stress", icon: Briefcase, tone: "blue", score: { 4: 2, 7: 2, 14: 1, 13: 1 } },
      { id: "travel", icon: Airplane, tone: "teal", score: { 8: 3, 14: 1 } },
      { id: "season", icon: CloudSun, tone: "amber", score: { 15: 2, 17: 2, 16: 1, 21: 1 } },
      { id: "active", icon: PersonSimpleRun, tone: "green", score: { 20: 2, 11: 2, 8: 1 } },
    ],
  },
  {
    id: "plan",
    options: [
      { id: "single", icon: Lightning, tone: "amber", score: { 8: 1, 14: 1, 1: 1 } },
      { id: "course", icon: ArrowClockwise, tone: "teal", score: { 12: 1, 13: 1, 3: 1, 18: 1 } },
      { id: "premium", icon: Crown, tone: "violet", score: { 24: 3, 19: 1, 13: 1 } },
    ],
  },
];

const dict = {
  tr: {
    badge: "Serum Testi",
    title: "Hangi Serum",
    highlight: "Bana Uygun?",
    text: "3 kısa soruyu yanıtlayın, ihtiyacınıza uygun serumları önerelim. Kesin içerik, doktor değerlendirmesinden sonra belirlenir.",
    seoTitle: "Hangi Serum Bana Uygun? Serum Testi",
    seoDesc: "3 soruda size uygun IV serumu bulun: enerji, bağışıklık, güzellik, detoks ve sporcu serumları. Evde serum uygulaması.",
    q: { need: "En çok neye ihtiyaç duyuyorsunuz?", life: "Hangisi sizi daha iyi anlatıyor?", plan: "Nasıl bir uygulama düşünüyorsunuz?" },
    o: {
      energy: "Enerji, yorgunlukla mücadele", immune: "Bağışıklık desteği", beauty: "Cilt ve güzellik", detox: "Detoks / kilo kontrolü",
      sport: "Kas, spor performansı", hair: "Saç ve tırnak", stress: "Yoğun iş temposu, stres", travel: "Seyahat ediyorum / tatildeyim",
      season: "Sık hastalanıyorum, mevsim geçişi", active: "Düzenli spor yapıyorum", single: "Tek seans, hızlı destek",
      course: "Birkaç seanslık kür", premium: "Kapsamlı / premium paket",
    },
    progress: "Soru {n} / {total}",
    back: "Geri",
    analysing: "Yanıtlarınız değerlendiriliyor…",
    resultTitle: "Size önerdiğimiz serumlar",
    yourChoices: "Seçimleriniz",
    best: "En uygun",
    match: "Uyum",
    details: "Detaylar",
    note: "Bu öneri bilgilendirme amaçlıdır. Hamilelik, kronik hastalık, böbrek/kalp rahatsızlığı veya düzenli ilaç kullanımı varsa mutlaka belirtin; uygulama öncesi doktor değerlendirmesi yapılır.",
    send: "Sonucu WhatsApp'tan Gönder",
    retry: "Tekrar Çöz",
    all: "Tüm serumları gör",
    waMsg: "Merhaba, serum testini çözdüm.\nSeçimlerim: {choices}\nÖnerilen: {results}\nBilgi almak istiyorum.",
    perks: ["Sadece 3 soru", "Yaklaşık 30 saniye", "Kişisel veri istemez"],
  },
  en: {
    badge: "Drip Quiz",
    title: "Which Drip",
    highlight: "Suits Me?",
    text: "Answer 3 short questions and we will suggest drips that match your needs. The exact content is decided after a doctor's assessment.",
    seoTitle: "Which IV Drip Suits Me? Drip Quiz",
    seoDesc: "Find a suitable IV drip in 3 questions: energy, immunity, beauty, detox and athlete drips. IV drips at home.",
    q: { need: "What do you need most?", life: "Which describes you best?", plan: "What kind of plan do you have in mind?" },
    o: {
      energy: "Energy, fighting tiredness", immune: "Immune support", beauty: "Skin and beauty", detox: "Detox / weight control",
      sport: "Muscles, sports performance", hair: "Hair and nails", stress: "Busy work life, stress", travel: "I'm travelling / on holiday",
      season: "I get ill often, seasonal changes", active: "I exercise regularly", single: "A single session, quick support",
      course: "A course of a few sessions", premium: "Comprehensive / premium package",
    },
    progress: "Question {n} of {total}",
    back: "Back",
    analysing: "Reviewing your answers…",
    resultTitle: "Drips we suggest for you",
    yourChoices: "Your choices",
    best: "Best match",
    match: "Match",
    details: "Details",
    note: "This suggestion is for information only. Please mention pregnancy, chronic illness, kidney or heart problems, or regular medication; a doctor's assessment is done before any drip.",
    send: "Send the result on WhatsApp",
    retry: "Start again",
    all: "See all drips",
    waMsg: "Hello, I took the drip quiz.\nMy choices: {choices}\nSuggested: {results}\nI would like more information.",
    perks: ["Only 3 questions", "About 30 seconds", "No personal data needed"],
  },
  ar: {
    badge: "اختبار المحاليل",
    title: "أي محلول",
    highlight: "يناسبني؟",
    text: "أجب عن 3 أسئلة قصيرة وسنقترح عليك محاليل تناسب احتياجاتك. ويُحدَّد المحتوى الدقيق بعد تقييم الطبيب.",
    seoTitle: "أي محلول وريدي يناسبني؟ اختبار المحاليل",
    seoDesc: "اعثر على المحلول الوريدي المناسب في 3 أسئلة: محاليل الطاقة والمناعة والجمال والديتوكس والرياضيين، في منزلك.",
    q: { need: "ما أكثر ما تحتاج إليه؟", life: "أيّ مما يلي يصفك أكثر؟", plan: "ما نوع الخطة التي تفكر فيها؟" },
    o: {
      energy: "الطاقة ومواجهة التعب", immune: "دعم المناعة", beauty: "البشرة والجمال", detox: "ديتوكس / التحكم بالوزن",
      sport: "العضلات والأداء الرياضي", hair: "الشعر والأظافر", stress: "ضغط العمل والتوتر", travel: "أنا مسافر / في عطلة",
      season: "أمرض كثيرًا مع تغيّر الفصول", active: "أمارس الرياضة بانتظام", single: "جلسة واحدة ودعم سريع",
      course: "برنامج من عدة جلسات", premium: "باقة شاملة / مميزة",
    },
    progress: "السؤال {n} من {total}",
    back: "رجوع",
    analysing: "جارٍ تقييم إجاباتك…",
    resultTitle: "المحاليل التي نقترحها لك",
    yourChoices: "اختياراتك",
    best: "الأنسب",
    match: "التوافق",
    details: "التفاصيل",
    note: "هذا الاقتراح للمعلومات فقط. يُرجى ذكر الحمل أو الأمراض المزمنة أو مشكلات الكلى أو القلب أو الأدوية المنتظمة، إذ يُجرى تقييم طبي قبل أي محلول.",
    send: "أرسل النتيجة عبر واتساب",
    retry: "أعد الاختبار",
    all: "عرض جميع المحاليل",
    waMsg: "مرحبًا، أجريت اختبار المحاليل.\nاختياراتي: {choices}\nالمقترح: {results}\nأودّ الحصول على مزيد من المعلومات.",
    perks: ["3 أسئلة فقط", "نحو 30 ثانية", "لا يتطلب بيانات شخصية"],
  },
};

const SerumQuiz = () => {
  const t = useT(dict);
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const items = useLocalized(serumList, listTranslations, "id");
  const [answers, setAnswers] = useState([]);
  const [analysing, setAnalysing] = useState(false);
  const step = answers.length;
  const finished = step === QUESTIONS.length;
  const total = QUESTIONS.length;

  // Short "thinking" moment before revealing the results.
  useEffect(() => {
    if (!analysing) return undefined;
    const timer = setTimeout(() => setAnalysing(false), 900);
    return () => clearTimeout(timer);
  }, [analysing]);

  const choose = (o) => {
    setAnswers((a) => [...a, o]);
    if (step + 1 === total && !reduce) setAnalysing(true);
  };
  const restart = () => {
    setAnalysing(false);
    setAnswers([]);
  };

  const results = useMemo(() => {
    if (!finished) return [];
    const totals = {};
    answers.forEach((a) => Object.entries(a.score).forEach(([id, pts]) => { totals[id] = (totals[id] || 0) + pts; }));
    // Best achievable score for these answers → used for the match bar.
    const max = answers.reduce((sum, a) => sum + Math.max(...Object.values(a.score)), 0) || 1;
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, pts]) => {
        const s = items.find((x) => x.id === Number(id));
        return s ? { ...s, pct: Math.max(35, Math.round((pts / max) * 100)) } : null;
      })
      .filter(Boolean);
  }, [answers, finished, items]);

  const labels = t("o");
  const questions = t("q");
  const summary = answers.map((a) => labels[a.id]).join(", ");
  const progress = Math.round((step / total) * 100);

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} highlight={t("highlight")} text={t("text")}
        seoTitle={t("seoTitle")} seoDesc={t("seoDesc")} path="/serum-testi">
        <ul className={styles.perks}>
          {t("perks").map((p, i) => <li key={i}><Check weight="bold" /> {p}</li>)}
        </ul>
      </PageHero>
      <Wrapper>
        <section className={`${ui.section} ${styles.wrap}`}>
          {/* Progress */}
          <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step}>
            <div className={styles.progressTrack}>
              <motion.div className={styles.progressFill} initial={false} animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            </div>
            <div className={styles.dots} aria-hidden="true">
              {QUESTIONS.map((q, i) => (
                <motion.span key={q.id} className={`${styles.dot} ${i < step ? styles.dotDone : ""} ${i === step ? styles.dotNow : ""}`}
                  animate={{ scale: i === step ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                  {i < step ? <Check weight="bold" /> : i + 1}
                </motion.span>
              ))}
              <span className={`${styles.dot} ${finished ? styles.dotDone : ""}`}><Trophy weight="fill" /></span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!finished && (
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                <p className={ui.hint}>{t("progress", { n: step + 1, total })}</p>
                <h2 className={styles.question}>{questions[QUESTIONS[step].id]}</h2>
                <motion.div className={styles.options} initial="hidden" animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
                  {QUESTIONS[step].options.map((o) => {
                    const Icon = o.icon;
                    return (
                      <motion.button key={o.id} type="button"
                        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -5 }} whileTap={{ scale: 0.96 }}
                        className={`${ui.card} ${ui.glowBorder} ${styles.option}`}
                        onClick={() => choose(o)}>
                        <Icon3D icon={<Icon />} tone={o.tone} size={56} />
                        <h3>{labels[o.id]}</h3>
                      </motion.button>
                    );
                  })}
                </motion.div>
                {step > 0 && (
                  <button type="button" className={`${ui.btn} ${ui.btnGhost} ${styles.backBtn}`} onClick={() => setAnswers((a) => a.slice(0, -1))}>
                    <ArrowLeft className={styles.flip} /> {t("back")}
                  </button>
                )}
              </motion.div>
            )}

            {finished && analysing && (
              <motion.div key="analysing" className={styles.analysing} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                <motion.span className={styles.pulse} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                  <Drop weight="duotone" />
                </motion.span>
                <p>{t("analysing")}</p>
              </motion.div>
            )}

            {finished && !analysing && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className={`${ui.center} ${styles.resultTitle}`}>{t("resultTitle")}</h2>
                <p className={`${ui.center} ${ui.hint}`}>{t("yourChoices")}: {summary}</p>
                <div className={styles.results}>
                  {results.map((s, i) => (
                    <motion.div key={s.id}
                      initial={{ opacity: 0, y: 40, rotateX: reduce ? 0 : -20, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.1 + i * 0.15 }}
                      className={`${ui.card} ${styles.resultCard} ${i === 0 ? `${ui.featured} ${styles.top}` : ""}`}>
                      {i === 0 && <span className={ui.ribbon}>{t("best")}</span>}
                      <div className={styles.resultImg}><SerumSVG name={s.info} category={s.category} label={categoryLabel(s.category, lang)} /></div>
                      <h3>{s.info}</h3>
                      <p>{s.desc}</p>
                      <div className={styles.match}>
                        <span>{t("match")}</span>
                        <div className={styles.matchTrack}>
                          <motion.div className={styles.matchFill} initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} />
                        </div>
                        <strong>{s.pct}%</strong>
                      </div>
                      <Link to={`/serumlar/${s.id}`} className={`${ui.btn} ${ui.btnGhost} ${ui.btnBlock} ${styles.detailBtn}`}>
                        {t("details")} <ArrowRight className={styles.flip} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div className={ui.note} style={{ marginTop: 26 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  <Info />
                  <span>{t("note")}</span>
                </motion.div>
                <div className={ui.btnRow}>
                  <a className={`${ui.btn} ${ui.btnWa}`} target="_blank" rel="noopener noreferrer"
                    href={whatsappUrl(t("waMsg", { choices: summary, results: results.map((r) => r.info).join(", ") }))}>
                    <WhatsappLogo weight="fill" /> {t("send")}
                  </a>
                  <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={restart}><ArrowClockwise /> {t("retry")}</button>
                  <Link to="/serumlar" className={`${ui.btn} ${ui.btnGhost}`}>{t("all")}</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </Wrapper>
    </>
  );
};

export default SerumQuiz;
