import React from "react";
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

const STATS = [
  { Icon: Medal, end: 15, suffix: "+", tone: "teal" },
  { Icon: HouseLine, end: 937, suffix: "+", tone: "green" },
  { Icon: UsersThree, end: 10348, suffix: "+", tone: "blue" },
  { Icon: MapPinLine, end: 2, suffix: "+", tone: "amber" },
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
        {STATS.map(({ Icon, end, suffix, tone }, i) => (
          <StaggerItem key={end}>
            <SpotlightCard className={`${styles.card} ${styles[tone]}`}>
              <span className={styles.glow} aria-hidden="true" />
              <Icon3D icon={<Icon weight="duotone" />} tone={tone} size={58} />
              <strong className={styles.cardNumber}>
                <CountUp to={end} suffix={suffix} duration={2.4} locale={meta.locale} />
              </strong>
              <span className={styles.cardLabel}>{items[i].label}</span>
              <span className={styles.cardNote}>{items[i].note}</span>
              <span className={styles.bar} aria-hidden="true" />
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default React.memo(Main);
