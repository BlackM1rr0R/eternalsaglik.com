import React from "react";
import { motion } from "framer-motion";
import { Medal, HouseLine, UsersThree, MapPinLine } from "@phosphor-icons/react";
import Icon3D from "../icon3d";
import ScrollReveal from "../scrollreveal";
import { Stagger, StaggerItem, SpotlightCard, CountUp } from "../motion";
import { useT, useLang } from "../../i18n";
import styles from "./index.module.css";

const dict = {
  tr: {
    badge: "Rakamlarla biz",
    title: "Rakamlarla",
    accent: "Eternal Sağlık",
    lead: "Yılların deneyimi ve evinize taşıdığımız binlerce ziyaretin özeti.",
    items: [
      { label: "Yıllık deneyim", note: "Evde sağlık alanında birikim" },
      { label: "Evde sağlık ziyareti", note: "Doktor ve hemşire ziyaretleri" },
      { label: "Hizmet verdiğimiz hasta", note: "Hastalar ve aileleriyle birlikte" },
      { label: "Hizmet adresimiz", note: "Sakarya merkezli ekip" },
    ],
  },
  en: {
    badge: "In numbers",
    title: "Eternal Health",
    accent: "in numbers",
    lead: "A snapshot of our years of experience and the thousands of visits we have brought to people's homes.",
    items: [
      { label: "Years of experience", note: "Built up in home healthcare" },
      { label: "Home healthcare visits", note: "Doctor and nurse visits" },
      { label: "Patients served", note: "Together with their families" },
      { label: "Service locations", note: "A Sakarya-based team" },
    ],
  },
  ar: {
    badge: "بالأرقام",
    title: "إيترنال للصحة",
    accent: "بالأرقام",
    lead: "لمحة عن سنوات خبرتنا وآلاف الزيارات التي قدّمناها في منازل المرضى.",
    items: [
      { label: "سنة من الخبرة", note: "خبرة متراكمة في الرعاية المنزلية" },
      { label: "زيارة رعاية منزلية", note: "زيارات أطباء وممرضين" },
      { label: "مريض قدّمنا له الخدمة", note: "برفقة عائلاتهم" },
      { label: "عنوان لخدماتنا", note: "فريق مقرّه سكاريا" },
    ],
  },
};

const ease = [0.16, 1, 0.3, 1];

/* Decorative motifs — purely ornamental, no axes, values or trends. Each one only echoes the
 * idea of its number (15 marks for 15 years, a pulse line, a crowd of dots, two linked pins). */

const YearsMotif = () => (
  <svg viewBox="0 0 200 44" className={styles.motif} aria-hidden="true" focusable="false">
    {Array.from({ length: 15 }, (_, i) => (
      <motion.rect
        key={i}
        x={9 + i * 12.4}
        y="12"
        width="6"
        height="20"
        rx="3"
        className={i === 14 ? styles.mStrong : styles.mSoft}
        variants={{ hidden: { opacity: 0, scaleY: 0.2 }, show: { opacity: 1, scaleY: 1 } }}
        transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.05 }}
        style={{ originY: "50%" }}
      />
    ))}
  </svg>
);

const PULSE = "M0 26 H46 L54 14 L62 36 L70 8 L78 30 L84 26 H120 L128 18 L134 30 L140 26 H200";

const VisitsMotif = () => (
  <svg viewBox="0 0 200 44" className={styles.motif} aria-hidden="true" focusable="false">
    <path d="M0 26 H200" className={styles.mBase} />
    <motion.path
      d={PULSE}
      className={styles.mLine}
      variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
      transition={{ duration: 1.6, ease, delay: 0.3 }}
    />
    <circle cx="70" cy="8" r="3.5" className={`${styles.mStrong} ${styles.blip}`} />
  </svg>
);

const DOTS = Array.from({ length: 3 * 16 }, (_, i) => ({ r: Math.floor(i / 16), c: i % 16, k: (i * 7) % 5 }));

const PatientsMotif = () => (
  <svg viewBox="0 0 200 44" className={styles.motif} aria-hidden="true" focusable="false">
    {DOTS.map(({ r, c, k }, i) => (
      <motion.circle
        key={i}
        cx={10 + c * 12} cy={10 + r * 12} r="3.4"
        className={k === 0 ? styles.mStrong : k === 1 ? styles.mAlt : styles.mSoft}
        variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.4, ease, delay: 0.2 + ((c + r * 3) % 16) * 0.035 }}
      />
    ))}
  </svg>
);

const Pin = ({ x, delay }) => (
  <motion.g
    className={styles.pin}
    variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay }}
  >
    <path d={`M${x} 36 c-6 -7 -10 -11 -10 -16 a10 10 0 0 1 20 0 c0 5 -4 9 -10 16z`} className={styles.mStrong} />
    <circle cx={x} cy="20" r="3.6" className={styles.mHole} />
  </motion.g>
);

const AddressesMotif = () => (
  <svg viewBox="0 0 200 44" className={styles.motif} aria-hidden="true" focusable="false">
    <motion.path
      d="M58 34 C80 6 120 6 142 34"
      className={styles.mDash}
      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
      transition={{ duration: 1.1, ease, delay: 0.55 }}
    />
    <Pin x={58} delay={0.25} />
    <Pin x={142} delay={0.4} />
  </svg>
);

const STATS = [
  { Icon: Medal, end: 15, suffix: "+", tone: "teal", Motif: YearsMotif },
  { Icon: HouseLine, end: 937, suffix: "+", tone: "green", Motif: VisitsMotif },
  { Icon: UsersThree, end: 10348, suffix: "+", tone: "blue", Motif: PatientsMotif },
  { Icon: MapPinLine, end: 2, suffix: "+", tone: "amber", Motif: AddressesMotif },
];

const Main = () => {
  const t = useT(dict);
  const { meta } = useLang();
  const items = t("items");

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <span className={styles.badge}>{t("badge")}</span>
          <h2>
            {t("title")} <span className="accent">{t("accent")}</span>
          </h2>
          <p>{t("lead")}</p>
        </div>
      </ScrollReveal>

      <Stagger className={styles.grid} gap={0.12}>
        {STATS.map(({ Icon, end, suffix, tone, Motif }, i) => (
          <StaggerItem key={end}>
            <SpotlightCard className={`${styles.card} ${styles[tone]}`}>
              <span className={styles.glow} aria-hidden="true" />
              <motion.div
                className={styles.inner}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <span className={styles.iconWrap}>
                  <svg viewBox="0 0 100 100" className={styles.ring} aria-hidden="true" focusable="false">
                    <circle cx="50" cy="50" r="46" className={styles.ringTrack} />
                    <motion.circle
                      cx="50" cy="50" r="46"
                      className={styles.ringArc}
                      variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
                      transition={{ duration: 1.8, ease, delay: 0.15 + i * 0.1 }}
                    />
                    <circle cx="96" cy="50" r="3.5" className={styles.ringDot} />
                  </svg>
                  <Icon3D icon={<Icon weight="duotone" />} tone={tone} size={58} />
                </span>
                <strong className={styles.cardNumber}>
                  <CountUp to={end} suffix={suffix} duration={2.4} locale={meta.locale} />
                </strong>
                <span className={styles.cardLabel}>{items[i].label}</span>
                <span className={styles.cardNote}>{items[i].note}</span>
                <Motif />
              </motion.div>
              <span className={styles.bar} aria-hidden="true" />
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default React.memo(Main);
