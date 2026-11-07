import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaArrowRight, FaPhoneAlt, FaCheck, FaHeartbeat, FaUserMd, FaSyringe, FaStar, FaShieldAlt,
  FaVials, FaBandAid, FaAmbulance, FaHandHoldingHeart, FaStethoscope, FaClipboardCheck, FaLeaf,
} from "../../icons/modern";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import AnimatedText from "../animatedtext";
import DoctorPhoto from "../../assets/images/doctor12.jpg";
import { primaryPhone } from "../../config/site";
import { useT } from "../../i18n";

const dict = {
  tr: {
    eyebrow: "7/24 açığız · Ekibimiz şu an hizmette",
    t1: "Aradığınız Sağlık,", t2: "Sağlıklı Gelecek",
    lead: "Uzman doktor ve hemşirelerimiz evinize, otelinize ya da ofisinize gelir. Muayene, serum, tahlil ve bakım — hastane kuyruğu olmadan, evinizin konforunda.",
    book: "Online Randevu", callNow: "Hemen arayın",
    s1: "Acil bakım", s2: "Memnuniyet", s3: "Yıl deneyim",
    heart: "Kalp ritmi", booked: "Randevu onaylandı", bookedSub: "Evde serum · Bugün 18:30",
    iv: "IV Terapi", ivSub: "24 serum", trust: "Güvenilir evde sağlık", services: "Hizmetlerimiz",
    m: ["Evde Doktor", "Evde Hemşire", "IV Serum", "Evde Tahlil", "Yara Bakımı", "Check-Up", "Hasta Bakımı", "Özel Ambulans", "Geleneksel Tıp"],
  },
  en: {
    eyebrow: "Open 24/7 · Our team is on duty now",
    t1: "The Care You Need,", t2: "A Healthier Future",
    lead: "Our doctors and nurses come to your home, hotel or office. Examinations, IV drips, lab tests and care — no hospital queues, in the comfort of your own space.",
    book: "Book Online", callNow: "Call us now",
    s1: "Urgent care", s2: "Satisfaction", s3: "Years of experience",
    heart: "Heart rate", booked: "Appointment confirmed", bookedSub: "IV drip at home · Today 18:30",
    iv: "IV Therapy", ivSub: "24 drips", trust: "Trusted home healthcare", services: "Our services",
    m: ["Home Doctor", "Home Nurse", "IV Drips", "Home Lab Tests", "Wound Care", "Check-Up", "Patient Care", "Private Ambulance", "Traditional Medicine"],
  },
  ar: {
    eyebrow: "نعمل على مدار الساعة · فريقنا في الخدمة الآن",
    t1: "الرعاية التي تبحث عنها،", t2: "لمستقبل أكثر صحة",
    lead: "يأتي أطباؤنا وممرضونا إلى منزلك أو فندقك أو مكتبك. فحص، محاليل وريدية، تحاليل ورعاية — دون طوابير المستشفى وفي راحة مكانك.",
    book: "احجز عبر الإنترنت", callNow: "اتصل الآن",
    s1: "رعاية عاجلة", s2: "رضا المرضى", s3: "سنة خبرة",
    heart: "نبض القلب", booked: "تم تأكيد الموعد", bookedSub: "محلول في المنزل · اليوم 18:30",
    iv: "العلاج الوريدي", ivSub: "٢٤ محلولاً", trust: "رعاية منزلية موثوقة", services: "خدماتنا",
    m: ["طبيب منزلي", "ممرض منزلي", "محاليل وريدية", "تحاليل منزلية", "العناية بالجروح", "فحص شامل", "رعاية المرضى", "إسعاف خاص", "الطب التقليدي"],
  },
};

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const MARQUEE_ICONS = [FaUserMd, FaStethoscope, FaSyringe, FaVials, FaBandAid, FaClipboardCheck, FaHandHoldingHeart, FaAmbulance, FaLeaf];

// Glass card that drifts with the pointer by `depth`.
const Float = ({ mx, my, depth, className, children, delay = 0 }) => {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }} initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const t = useT(dict);
  const MARQUEE = MARQUEE_ICONS.map((i, k) => ({ i, t: t("m")[k] }));
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    myRaw.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section className={styles.hero} ref={ref} onPointerMove={onMove}>
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orbA}`} />
        <span className={`${styles.orb} ${styles.orbB}`} />
        <span className={`${styles.orb} ${styles.orbC}`} />
        <span className={styles.grid} />
      </div>

      <Wrapper>
        <div className={styles.layout}>
          <motion.div className={styles.copy} style={{ y: textY }}>
            <motion.div className={styles.eyebrow} {...fadeUp(0)}>
              <span className={styles.live} /> {t("eyebrow")}
            </motion.div>

            <AnimatedText
              className={styles.title}
              key={t("t1")}
              lines={[t("t1"), { text: t("t2"), accent: true }]}
              delay={0.15}
            />

            <motion.p className={styles.lead} {...fadeUp(0.55)}>
              {t("lead")}
            </motion.p>

            <motion.div className={styles.ctas} {...fadeUp(0.7)}>
              <Link to="/randevu" className={styles.primary}>
                {t("book")} <span className={styles.primaryIcon}><FaArrowRight /></span>
              </Link>
              <a href={`tel:${primaryPhone.tel}`} className={styles.secondary}>
                <span className={styles.secondaryIcon}><FaPhoneAlt /></span>
                <span><small>{t("callNow")}</small><bdi>{primaryPhone.display}</bdi></span>
              </a>
            </motion.div>

            <motion.dl className={styles.stats} {...fadeUp(0.85)}>
              <div><dt><CountUp end={24} duration={2.4} />/7</dt><dd>{t("s1")}</dd></div>
              <div><dt>%<CountUp end={98} duration={2.4} /></dt><dd>{t("s2")}</dd></div>
              <div><dt><CountUp end={15} duration={2.4} />+</dt><dd>{t("s3")}</dd></div>
            </motion.dl>
          </motion.div>

          <motion.div className={styles.visual} style={{ y: visualY }} aria-hidden="true">
            <motion.div className={styles.blobWrap} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }}>
              <div className={styles.blob}>
                <img src={DoctorPhoto} alt="" />
              </div>
              <span className={styles.ring} />
              <span className={`${styles.ring} ${styles.ring2}`} />
            </motion.div>

            <Float mx={mx} my={my} depth={-18} className={`${styles.card} ${styles.cardEcg}`} delay={0.6}>
              <div className={styles.cardHead}>
                <span className={styles.cardIcon} style={{ background: "var(--rose-50)", color: "var(--rose-500)" }}><FaHeartbeat /></span>
                <div><small>{t("heart")}</small><strong>72 <em>bpm</em></strong></div>
              </div>
              <svg viewBox="0 0 200 44" className={styles.ecg}>
                <path className={styles.ecgBase} d="M0 26 H54 L64 10 L76 40 L86 4 L96 34 L104 26 H200" />
                <path className={styles.ecgLine} d="M0 26 H54 L64 10 L76 40 L86 4 L96 34 L104 26 H200" />
              </svg>
            </Float>

            <Float mx={mx} my={my} depth={22} className={`${styles.card} ${styles.cardBooking}`} delay={0.85}>
              <span className={styles.check}><FaCheck /></span>
              <div><strong>{t("booked")}</strong><small>{t("bookedSub")}</small></div>
            </Float>

            <Float mx={mx} my={my} depth={-26} className={`${styles.card} ${styles.cardIv}`} delay={1}>
              <span className={styles.cardIcon} style={{ background: "var(--lavender-50)", color: "var(--lavender-500)" }}><FaSyringe /></span>
              <div><small>{t("iv")}</small><strong>{t("ivSub")}</strong></div>
              <span className={styles.drip}><i /></span>
            </Float>

            <Float mx={mx} my={my} depth={14} className={`${styles.card} ${styles.cardTrust}`} delay={1.15}>
              <div className={styles.stars}>{[0, 1, 2, 3, 4].map((i) => <FaStar key={i} />)}</div>
              <small><FaShieldAlt /> {t("trust")}</small>
            </Float>
          </motion.div>
        </div>
      </Wrapper>

      <div className={styles.marquee} aria-label={t("services")}>
        <div className={styles.track}>
          {[...MARQUEE, ...MARQUEE].map((m, i) => {
            const Icon = m.i;
            return (
              <span key={i} className={styles.mItem} aria-hidden={i >= MARQUEE.length}>
                <Icon /> {m.t}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
