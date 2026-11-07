/* "Bir ziyaretin hikayesi" — scroll-telling section.
 * Desktop (≥ 960px, motion allowed): a sticky stage swaps five illustrated scenes as the section scrolls by;
 * each scene's own animation is tied to its slice of the section's scroll progress.
 * Mobile / reduced motion: the scenes stack vertically (animated when they enter view, or fully static).
 * All artwork is original inline SVG; it is decorative (aria-hidden) — the step texts carry the meaning. */
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChatCircleDots, CalendarCheck, Car, Stethoscope, UsersThree, Check } from "@phosphor-icons/react";
import ScrollReveal from "../scrollreveal";
import { useT } from "../../i18n";
import { useSettings } from "../../context/settings";
import ui from "../../styles/ui.module.css";
import styles from "./index.module.css";

const dict = {
  tr: {
    badge: "Adım adım",
    title: "Bir ziyaretin",
    accent: "hikayesi",
    lead: "İlk mesajınızdan ziyaret sonrası bilgilendirmeye kadar evde sağlık hizmetinin nasıl ilerlediğini sayfayı kaydırarak izleyin.",
    stepLabel: "Adım {n}",
    steps: [
      {
        title: "Bize ulaşın",
        text: "Telefonla arayın ya da WhatsApp'tan yazın. İhtiyacınızı, adresinizi ve size uygun zamanı dinleyelim.",
        chip: "Mesajınız ulaştı",
      },
      {
        title: "Planlama",
        text: "Hizmetin türüne göre uygun gün ve saat birlikte belirlenir; gerekiyorsa ziyaret öncesi hazırlık için bilgi verilir.",
        chip: "Saat onaylandı",
      },
      {
        title: "Ekibimiz yolda",
        text: "Ekibimiz gerekli malzemelerle adresinize doğru yola çıkar. Acil çağrılarda ortalama 30-45 dakika içinde ulaşmaya çalışıyoruz; hayati tehlike varsa önce 112'yi arayın.",
        chip: "Adresinize doğru",
      },
      {
        title: "Evde muayene",
        text: "Doktor ya da hemşiremiz evinizde değerlendirme yapar, temel yaşam bulgularını kontrol eder ve planlanan uygulamayı gerçekleştirir.",
        chip: "Yaşam bulguları",
      },
      {
        title: "Takip ve aileye bilgilendirme",
        text: "Ziyaret sonrası yapılanlar ve sonraki adımlar hasta ve yakınlarıyla paylaşılır; gerektiğinde takip ziyareti planlanır.",
        chip: "Aile bilgilendirildi",
      },
    ],
  },
  en: {
    badge: "Step by step",
    title: "The story of",
    accent: "a visit",
    lead: "Scroll to follow how home healthcare unfolds, from your first message to the update after the visit.",
    stepLabel: "Step {n}",
    steps: [
      {
        title: "Get in touch",
        text: "Call us or send a WhatsApp message. We listen to what you need, where you are and when suits you.",
        chip: "Message received",
      },
      {
        title: "Planning",
        text: "A suitable day and time are agreed together depending on the service; if needed, we explain how to prepare for the visit.",
        chip: "Time confirmed",
      },
      {
        title: "Our team is on the way",
        text: "Our team sets off to your address with the equipment needed. For urgent calls we aim to reach you within 30-45 minutes on average; if life is at risk, call 112 first.",
        chip: "Heading to you",
      },
      {
        title: "Care at home",
        text: "Our doctor or nurse carries out an assessment at home, checks basic vital signs and performs the planned procedure.",
        chip: "Vital signs",
      },
      {
        title: "Follow-up and family update",
        text: "After the visit, what was done and the next steps are shared with the patient and their family; a follow-up visit is arranged if needed.",
        chip: "Family updated",
      },
    ],
  },
  ar: {
    badge: "خطوة بخطوة",
    title: "قصة",
    accent: "زيارة",
    lead: "مرّر الصفحة لتتابع كيف تسير الرعاية الصحية المنزلية، من رسالتك الأولى حتى إطلاعكم على ما تمّ بعد الزيارة.",
    stepLabel: "الخطوة {n}",
    steps: [
      {
        title: "تواصل معنا",
        text: "اتصل بنا أو راسلنا عبر واتساب. نستمع إلى احتياجك وعنوانك والوقت المناسب لك.",
        chip: "وصلت رسالتك",
      },
      {
        title: "التخطيط",
        text: "يُحدَّد اليوم والوقت المناسبان معًا بحسب نوع الخدمة، ونشرح عند الحاجة كيفية الاستعداد للزيارة.",
        chip: "تم تأكيد الموعد",
      },
      {
        title: "فريقنا في الطريق",
        text: "ينطلق فريقنا إلى عنوانك ومعه المستلزمات اللازمة. وفي الحالات العاجلة نسعى للوصول خلال 30-45 دقيقة في المتوسط، وإذا كانت الحياة في خطر فاتصل أولًا بالرقم 112.",
        chip: "في الطريق إليك",
      },
      {
        title: "الفحص في المنزل",
        text: "يُجري الطبيب أو الممرض تقييمًا في منزلك، ويتحقق من العلامات الحيوية الأساسية، وينفّذ الإجراء المخطط له.",
        chip: "العلامات الحيوية",
      },
      {
        title: "المتابعة وإطلاع العائلة",
        text: "بعد الزيارة نشارك المريض وذويه ما تمّ والخطوات التالية، ونرتّب زيارة متابعة عند الحاجة.",
        chip: "تم إطلاع العائلة",
      },
    ],
  },
};

const ICONS = [ChatCircleDots, CalendarCheck, Car, Stethoscope, UsersThree];
const TONES = ["teal", "lavender", "peach", "teal", "lavender"];
const N = 5;

const useSeg = (p, a, b, from = 0, to = 1) => useTransform(p, [a, b], [from, to]);

const useDesktop = () => {
  const query = "(min-width: 960px)";
  const [ok, setOk] = useState(() => typeof window !== "undefined" && Boolean(window.matchMedia?.(query)?.matches));
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return ok;
};

/* ───────────────────────── Scenes (viewBox 400×300, p = 0…1) ───────────────────────── */

const SceneContact = ({ p, still }) => {
  const b1 = useSeg(p, 0.05, 0.3);
  const b1y = useSeg(p, 0.05, 0.3, 14, 0);
  const dots = useSeg(p, 0.3, 0.45);
  const dotsOut = useSeg(p, 0.5, 0.58, 1, 0);
  const b2 = useSeg(p, 0.55, 0.8);
  const b2y = useSeg(p, 0.55, 0.8, 14, 0);
  const tick = useSeg(p, 0.8, 1);
  const ring = useSeg(p, 0, 1, 0.6, 1.15);
  const dotsOpacity = useTransform([dots, dotsOut], ([a, b]) => Math.min(a, b));
  return (
    <svg viewBox="0 0 400 300" className={styles.svg} aria-hidden="true" focusable="false">
      <motion.circle cx="200" cy="150" r="128" className={styles.fillSoft} style={{ scale: ring }} />
      <circle cx="318" cy="64" r="14" className={styles.fillPeach} opacity="0.7" />
      <circle cx="78" cy="226" r="9" className={styles.fillLav} opacity="0.8" />
      {/* phone */}
      <rect x="138" y="28" width="124" height="244" rx="24" className={styles.device} />
      <rect x="148" y="46" width="104" height="208" rx="14" className={styles.screen} />
      <rect x="182" y="35" width="36" height="5" rx="2.5" className={styles.fillLine} />
      <rect x="148" y="46" width="104" height="26" rx="14" className={styles.fillTeal} />
      <rect x="148" y="60" width="104" height="12" className={styles.fillTeal} />
      <circle cx="164" cy="59" r="7" className={styles.fillWhite} />
      <rect x="176" y="55" width="40" height="5" rx="2.5" className={styles.fillWhite} opacity="0.85" />
      {/* incoming bubble */}
      <motion.g style={{ opacity: b1, y: b1y }}>
        <rect x="156" y="86" width="74" height="34" rx="12" className={styles.bubbleIn} />
        <rect x="165" y="96" width="52" height="5" rx="2.5" className={styles.fillLine} />
        <rect x="165" y="106" width="34" height="5" rx="2.5" className={styles.fillLine} />
      </motion.g>
      {/* typing dots */}
      <motion.g style={{ opacity: dotsOpacity }}>
        <rect x="186" y="132" width="44" height="22" rx="11" className={styles.bubbleOut} opacity="0.5" />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={198 + i * 10}
            cy="143"
            r="3"
            className={styles.fillTealDeep}
            animate={still ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </motion.g>
      {/* outgoing bubble with read ticks */}
      <motion.g style={{ opacity: b2, y: b2y }}>
        <rect x="166" y="162" width="78" height="44" rx="12" className={styles.bubbleOut} />
        <rect x="175" y="172" width="58" height="5" rx="2.5" className={styles.fillTealDeep} opacity="0.55" />
        <rect x="175" y="182" width="42" height="5" rx="2.5" className={styles.fillTealDeep} opacity="0.55" />
        <motion.path d="M214 196 l4 4 l7 -8 M222 196 l4 4 l7 -8" className={styles.strokeTeal} style={{ pathLength: tick }} />
      </motion.g>
      <rect x="156" y="226" width="88" height="18" rx="9" className={styles.fillSoft} />
      <circle cx="234" cy="235" r="6" className={styles.fillTeal} />
    </svg>
  );
};

const SceneCalendar = ({ p }) => {
  const grid = useSeg(p, 0, 0.3);
  const pick = useSeg(p, 0.3, 0.5);
  const slot = useSeg(p, 0.5, 0.72);
  const slotX = useSeg(p, 0.5, 0.72, 30, 0);
  const check = useSeg(p, 0.72, 0.95);
  const checkScale = useSeg(p, 0.7, 0.8, 0.4, 1);
  const cells = [];
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 6; c += 1) cells.push({ r, c });
  }
  return (
    <svg viewBox="0 0 400 300" className={styles.svg} aria-hidden="true" focusable="false">
      <circle cx="200" cy="150" r="126" className={styles.fillSoftLav} />
      <rect x="70" y="52" width="228" height="196" rx="20" className={styles.device} />
      <rect x="70" y="52" width="228" height="44" rx="20" className={styles.fillLavDeep} />
      <rect x="70" y="80" width="228" height="16" className={styles.fillLavDeep} />
      <rect x="104" y="40" width="8" height="26" rx="4" className={styles.fillLine} />
      <rect x="256" y="40" width="8" height="26" rx="4" className={styles.fillLine} />
      <rect x="92" y="68" width="70" height="7" rx="3.5" className={styles.fillWhite} opacity="0.9" />
      <motion.g style={{ opacity: grid }}>
        {cells.map(({ r, c }) => (
          <rect key={`${r}-${c}`} x={88 + c * 34} y={110 + r * 32} width="26" height="22" rx="6" className={styles.cell} />
        ))}
      </motion.g>
      <motion.rect x={88 + 3 * 34} y={110 + 32} width="26" height="22" rx="6" className={styles.fillTeal}
        style={{ opacity: pick, scale: pick }} />
      {/* time slot pill */}
      <motion.g style={{ opacity: slot, x: slotX }}>
        <rect x="250" y="160" width="110" height="40" rx="20" className={styles.pill} />
        <circle cx="272" cy="180" r="10" className={styles.fillPeach} />
        <path d="M272 174 v6 l4 3" className={styles.strokeWhite} />
        <rect x="290" y="172" width="52" height="6" rx="3" className={styles.fillLine} />
        <rect x="290" y="183" width="34" height="6" rx="3" className={styles.fillLine} opacity="0.6" />
      </motion.g>
      {/* confirmation */}
      <motion.g style={{ scale: checkScale, opacity: check }}>
        <circle cx="306" cy="244" r="24" className={styles.fillTeal} />
        <motion.path d="M295 244 l8 8 l15 -16" className={styles.strokeWhiteBold} style={{ pathLength: check }} />
      </motion.g>
    </svg>
  );
};

// cubic bezier route for the car
const P0 = [52, 236];
const P1 = [130, 60];
const P2 = [250, 280];
const P3 = [318, 104];
const bez = (t, i) =>
  (1 - t) ** 3 * P0[i] + 3 * (1 - t) ** 2 * t * P1[i] + 3 * (1 - t) * t ** 2 * P2[i] + t ** 3 * P3[i];
const bezD = (t, i) =>
  3 * (1 - t) ** 2 * (P1[i] - P0[i]) + 6 * (1 - t) * t * (P2[i] - P1[i]) + 3 * t ** 2 * (P3[i] - P2[i]);
const ROUTE = `M${P0} C${P1} ${P2} ${P3}`;

const SceneRoute = ({ p }) => {
  const t = useSeg(p, 0.08, 0.85);
  const x = useTransform(t, (v) => bez(v, 0));
  const y = useTransform(t, (v) => bez(v, 1));
  const rotate = useTransform(t, (v) => (Math.atan2(bezD(v, 1), bezD(v, 0)) * 180) / Math.PI);
  const pinY = useTransform(p, [0, 0.82, 0.9, 0.96, 1], [-10, -10, 4, -3, 0]);
  const pinGlow = useSeg(p, 0.82, 1, 0, 1);
  return (
    <svg viewBox="0 0 400 300" className={styles.svg} aria-hidden="true" focusable="false">
      <rect x="20" y="20" width="360" height="260" rx="28" className={styles.mapBg} />
      {/* stylised blocks, park and river */}
      <path d="M20 190 C90 170 120 230 190 214 S320 160 380 182 V218 C320 196 260 248 190 252 S80 214 20 228 Z" className={styles.fillSoftLav} />
      <rect x="44" y="40" width="64" height="44" rx="10" className={styles.block} />
      <rect x="160" y="36" width="46" height="60" rx="10" className={styles.block} />
      <rect x="236" y="196" width="70" height="42" rx="10" className={styles.block} opacity="0.7" />
      <circle cx="96" cy="150" r="22" className={styles.fillSoft} />
      <circle cx="112" cy="140" r="14" className={styles.fillSoft} />
      <path d="M20 128 H380 M226 20 V280" className={styles.road} />
      {/* route */}
      <path d={ROUTE} className={styles.routeBase} />
      <motion.path d={ROUTE} className={styles.route} style={{ pathLength: t }} />
      <circle cx={P0[0]} cy={P0[1]} r="7" className={styles.fillTeal} />
      <circle cx={P0[0]} cy={P0[1]} r="3" className={styles.fillWhite} />
      {/* destination: house + pin */}
      <motion.circle cx={P3[0]} cy={P3[1] + 4} r="30" className={styles.glowPeach} style={{ opacity: pinGlow, scale: pinGlow }} />
      <g transform={`translate(${P3[0] - 18} ${P3[1] - 6})`}>
        <path d="M0 16 L18 2 L36 16 V36 H0 Z" className={styles.house} />
        <rect x="14" y="22" width="9" height="14" rx="2" className={styles.fillPeach} />
      </g>
      <motion.g style={{ y: pinY }}>
        <path d={`M${P3[0]} ${P3[1] - 18} c-10 -12 -16 -18 -16 -26 a16 16 0 0 1 32 0 c0 8 -6 14 -16 26z`} className={styles.fillRose} />
        <circle cx={P3[0]} cy={P3[1] - 44} r="6" className={styles.fillWhite} />
      </motion.g>
      {/* car */}
      <motion.g style={{ x, y, rotate }}>
        <g transform="translate(-16 -10)">
          <rect x="0" y="4" width="32" height="14" rx="6" className={styles.fillTeal} />
          <path d="M6 5 L10 -2 H22 L27 5 Z" className={styles.fillTealDeep} />
          <rect x="13" y="7" width="6" height="8" rx="1" className={styles.fillWhite} />
          <rect x="14.5" y="8.5" width="3" height="5" className={styles.fillRose} />
          <circle cx="8" cy="18" r="4" className={styles.wheel} />
          <circle cx="24" cy="18" r="4" className={styles.wheel} />
        </g>
      </motion.g>
    </svg>
  );
};

const SceneVisit = ({ p, still }) => {
  const fig = useSeg(p, 0, 0.25);
  const figY = useSeg(p, 0, 0.25, 16, 0);
  const steth = useSeg(p, 0.15, 0.45);
  const ecg = useSeg(p, 0.35, 0.85);
  const bar1 = useSeg(p, 0.45, 0.7);
  const bar2 = useSeg(p, 0.55, 0.8);
  const bar3 = useSeg(p, 0.65, 0.9);
  const card = useSeg(p, 0.25, 0.45);
  return (
    <svg viewBox="0 0 400 300" className={styles.svg} aria-hidden="true" focusable="false">
      <circle cx="160" cy="160" r="120" className={styles.fillSoft} />
      {/* room hint */}
      <path d="M30 262 H370" className={styles.road} />
      <rect x="40" y="70" width="60" height="70" rx="10" className={styles.block} />
      <path d="M70 70 V140 M40 105 H100" className={styles.strokeLine} />
      {/* clinician figure */}
      <motion.g style={{ opacity: fig, y: figY }}>
        <path d="M110 262 C110 196 128 170 166 166 C204 170 222 196 222 262 Z" className={styles.fillTeal} />
        <path d="M150 168 L166 192 L182 168" className={styles.fillWhite} />
        <rect x="158" y="146" width="16" height="22" rx="6" className={styles.skin} />
        <circle cx="166" cy="124" r="28" className={styles.skin} />
        <path d="M138 122 C138 96 194 92 194 122 C188 106 148 104 138 122 Z" className={styles.hair} />
        <rect x="186" y="208" width="22" height="16" rx="3" className={styles.fillWhite} opacity="0.85" />
        <path d="M193 216 h8 M197 212 v8" className={styles.strokeRose} />
        <motion.path d="M146 170 C140 200 152 222 166 222 C180 222 192 200 186 170" className={styles.steth} style={{ pathLength: steth }} />
        <motion.circle cx="166" cy="226" r="6" className={styles.fillLavDeep} style={{ opacity: steth }} />
      </motion.g>
      {/* vitals monitor */}
      <motion.g style={{ opacity: card }}>
        <rect x="226" y="58" width="150" height="128" rx="18" className={styles.device} />
        <motion.path
          d="M266 82 c-4 -6 -14 -4 -14 4 c0 7 14 14 14 14 s14 -7 14 -14 c0 -8 -10 -10 -14 -4z"
          className={styles.fillRose}
          animate={still ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="290" y="80" width="66" height="7" rx="3.5" className={styles.fillLine} />
        <rect x="290" y="92" width="44" height="7" rx="3.5" className={styles.fillLine} opacity="0.6" />
        <path d="M240 128 H362" className={styles.strokeLine} />
        <motion.path
          d="M240 128 H270 L278 112 L288 146 L298 118 L304 128 H322 L328 120 L334 128 H362"
          className={styles.ecg}
          style={{ pathLength: ecg }}
        />
        <rect x="240" y="152" width="34" height="8" rx="4" className={styles.barTrack} />
        <rect x="282" y="152" width="34" height="8" rx="4" className={styles.barTrack} />
        <rect x="324" y="152" width="34" height="8" rx="4" className={styles.barTrack} />
        <motion.rect x="240" y="152" width="34" height="8" rx="4" className={styles.fillTeal} style={{ scaleX: bar1, originX: 0 }} />
        <motion.rect x="282" y="152" width="34" height="8" rx="4" className={styles.fillLavDeep} style={{ scaleX: bar2, originX: 0 }} />
        <motion.rect x="324" y="152" width="34" height="8" rx="4" className={styles.fillPeach} style={{ scaleX: bar3, originX: 0 }} />
      </motion.g>
      <circle cx="350" cy="232" r="10" className={styles.fillLav} opacity="0.8" />
      <circle cx="320" cy="250" r="6" className={styles.fillPeach} opacity="0.8" />
    </svg>
  );
};

const SceneFamily = ({ p, still }) => {
  const card = useSeg(p, 0, 0.25);
  const cardY = useSeg(p, 0, 0.25, 18, 0);
  const c1 = useSeg(p, 0.25, 0.45);
  const c2 = useSeg(p, 0.42, 0.62);
  const c3 = useSeg(p, 0.59, 0.79);
  const fam = useSeg(p, 0.7, 0.95);
  const famY = useSeg(p, 0.7, 0.95, 14, 0);
  const rows = [c1, c2, c3];
  return (
    <svg viewBox="0 0 400 300" className={styles.svg} aria-hidden="true" focusable="false">
      <circle cx="200" cy="150" r="126" className={styles.fillSoftLav} />
      <motion.g style={{ opacity: card, y: cardY }}>
        <rect x="56" y="54" width="190" height="192" rx="20" className={styles.device} />
        <circle cx="84" cy="82" r="12" className={styles.fillTeal} />
        <path d="M78 82 h12 M84 76 v12" className={styles.strokeWhite} />
        <rect x="104" y="74" width="90" height="7" rx="3.5" className={styles.fillLine} />
        <rect x="104" y="86" width="60" height="6" rx="3" className={styles.fillLine} opacity="0.6" />
        {rows.map((mv, i) => (
          <g key={i}>
            <rect x="74" y={118 + i * 38} width="154" height="28" rx="10" className={styles.cell} />
            <motion.circle cx="90" cy={132 + i * 38} r="8" className={styles.fillTeal} style={{ opacity: mv }} />
            <motion.path d={`M86 ${132 + i * 38} l3 3 l6 -6`} className={styles.strokeWhite} style={{ pathLength: mv }} />
            <rect x="106" y={128 + i * 38} width={96 - i * 18} height="7" rx="3.5" className={styles.fillLine} />
          </g>
        ))}
      </motion.g>
      {/* family */}
      <motion.g style={{ opacity: fam, y: famY }}>
        <path d="M262 250 C262 212 276 196 296 196 C316 196 330 212 330 250 Z" className={styles.fillLavDeep} />
        <circle cx="296" cy="178" r="17" className={styles.skin} />
        <path d="M318 250 C318 220 330 206 348 206 C366 206 378 220 378 250 Z" className={styles.fillPeach} />
        <circle cx="348" cy="190" r="14" className={styles.skin} />
        <path d="M300 250 C300 232 308 224 318 224 C328 224 336 232 336 250 Z" className={styles.fillTeal} />
        <circle cx="318" cy="212" r="10" className={styles.skin} />
        <motion.path
          d="M322 146 c-5 -8 -18 -5 -18 5 c0 9 18 18 18 18 s18 -9 18 -18 c0 -10 -13 -13 -18 -5z"
          className={styles.fillRose}
          animate={still ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
};

const SCENES = [SceneContact, SceneCalendar, SceneRoute, SceneVisit, SceneFamily];

const Chip = ({ index, label, opacity }) => {
  const Icon = ICONS[index];
  return (
    <motion.span className={`${styles.chip} ${styles[TONES[index]]}`} style={{ opacity }}>
      <Icon weight="duotone" aria-hidden="true" />
      {label}
      <Check weight="bold" className={styles.chipCheck} aria-hidden="true" />
    </motion.span>
  );
};

/* ───────────────────────── Desktop: sticky stage ───────────────────────── */

const StageScene = ({ index, progress, active, label }) => {
  const start = index / N;
  const p = useTransform(progress, [start + 0.01, start + 0.8 / N], [0, 1]);
  const chip = useTransform(p, [0.75, 0.95], [0, 1]);
  const Scene = SCENES[index];
  const on = active === index;
  return (
    <motion.div
      className={styles.scene}
      initial={false}
      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.94, y: on ? 0 : active > index ? -24 : 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!on}
    >
      <Scene p={p} still={false} />
      <Chip index={index} label={label} opacity={chip} />
    </motion.div>
  );
};

const Pinned = ({ steps, t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActive((cur) => (cur === next ? cur : next));
  });

  return (
    <div ref={ref} className={styles.track} style={{ "--steps": N }}>
      <div className={styles.sticky}>
        <div className={styles.layout}>
          <div className={styles.stepsWrap}>
          <span className={styles.rail} aria-hidden="true">
            <motion.span className={styles.railFill} style={{ scaleY: fill }} />
          </span>
          <ol className={styles.steps}>
            {steps.map((s, i) => {
              const Icon = ICONS[i];
              const state = i === active ? styles.stepActive : i < active ? styles.stepDone : "";
              return (
                <li key={i} className={`${styles.step} ${state}`} aria-current={i === active ? "step" : undefined}>
                  <span className={`${styles.dot} ${styles[TONES[i]]}`} aria-hidden="true">
                    {i < active ? <Check weight="bold" /> : <Icon weight="duotone" />}
                  </span>
                  <div className={styles.stepBody}>
                    <span className={styles.stepNum}>{t("stepLabel", { n: i + 1 })}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          </div>
          <div className={styles.stage}>
            <span className={styles.stageGlow} aria-hidden="true" />
            {steps.map((s, i) => (
              <StageScene key={i} index={i} progress={scrollYProgress} active={active} label={s.chip} />
            ))}
            <div className={styles.pager} aria-hidden="true">
              {steps.map((_, i) => (
                <span key={i} className={i === active ? styles.pagerOn : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Mobile / reduced motion: stacked ───────────────────────── */

const StackedScene = ({ index, step, still, t }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const p = useMotionValue(still ? 1 : 0);
  const chip = useTransform(p, [0.75, 0.95], [0, 1]);
  useEffect(() => {
    if (still) {
      p.set(1);
      return undefined;
    }
    if (!inView) return undefined;
    const c = animate(p, 1, { duration: 2.2, ease: [0.33, 1, 0.68, 1] });
    return () => c.stop();
  }, [inView, still, p]);
  const Scene = SCENES[index];
  const Icon = ICONS[index];
  return (
    <li ref={ref} className={styles.card}>
      <div className={styles.cardStage}>
        <Scene p={p} still={still} />
        <Chip index={index} label={step.chip} opacity={chip} />
      </div>
      <div className={styles.cardText}>
        <span className={`${styles.dot} ${styles[TONES[index]]}`} aria-hidden="true">
          <Icon weight="duotone" />
        </span>
        <div className={styles.stepBody}>
          <span className={styles.stepNum}>{t("stepLabel", { n: index + 1 })}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      </div>
    </li>
  );
};

const VisitStory = () => {
  const t = useT(dict);
  const steps = t("steps");
  const osReduce = useReducedMotion();
  const settingsCtx = useSettings();
  const still = Boolean(osReduce || settingsCtx?.settings?.reduceMotion);
  const desktop = useDesktop();

  return (
    <section className={`${ui.section} ${styles.section}`} aria-labelledby="visit-story-title">
      <ScrollReveal>
        <div className={ui.sectionHead}>
          <span className={ui.badge}>{t("badge")}</span>
          <h2 id="visit-story-title">
            {t("title")} <span className="accent">{t("accent")}</span>
          </h2>
          <p>{t("lead")}</p>
        </div>
      </ScrollReveal>

      {desktop && !still ? (
        <Pinned steps={steps} t={t} />
      ) : (
        <ol className={styles.stack}>
          {steps.map((s, i) => (
            <StackedScene key={i} index={i} step={s} still={still} t={t} />
          ))}
        </ol>
      )}
    </section>
  );
};

export default React.memo(VisitStory);
