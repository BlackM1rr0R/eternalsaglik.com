// Illustration and category icon for each health article (shared by the blog list, article page and home slider).
import { Stethoscope, HouseLine, FirstAidKit, Pill, TestTube, Leaf, Question } from "@phosphor-icons/react";
import IllStomach from "../../assets/illustrations/stomach.svg";
import IllDiabetes from "../../assets/illustrations/diabetes.svg";
import IllBreathing from "../../assets/illustrations/breathing.svg";
import IllHeart from "../../assets/illustrations/heart-health.svg";
import IllSkin from "../../assets/illustrations/skin-care.svg";
import IllVirus from "../../assets/illustrations/virus.svg";
import IllInjection from "../../assets/illustrations/injection.svg";
import IllInflammation from "../../assets/illustrations/inflammation.svg";
import IllUrinary from "../../assets/illustrations/urinary.svg";
import IllBlood from "../../assets/illustrations/blood-test.svg";
import IllWound from "../../assets/illustrations/wound-care.svg";
import IllPhysio from "../../assets/illustrations/physio.svg";
import IllSerum from "../../assets/illustrations/serum-iv.svg";
import IllLab from "../../assets/illustrations/lab-test.svg";
import IllWellness from "../../assets/illustrations/wellness.svg";
import IllFAQ from "../../assets/illustrations/faq.svg";
import IllImmunity from "../../assets/illustrations/serum-immunity.svg";
import IllVitamin from "../../assets/illustrations/serum-vitamin.svg";
import IllMedical from "../../assets/illustrations/medical-general.svg";

const imageMap = {
  1: IllStomach, 2: IllDiabetes, 3: IllBreathing, 4: IllHeart,
  5: IllSkin, 6: IllVirus, 7: IllInjection, 8: IllInflammation,
  9: IllUrinary, 10: IllBlood, 11: IllWound, 12: IllBreathing,
  13: IllHeart, 14: IllPhysio, 15: IllSerum, 16: IllSerum,
  17: IllLab, 18: IllWellness, 19: IllFAQ,
  20: IllSerum, // dehydration
  21: IllHeart, // high blood pressure
  22: IllImmunity, // seasonal flu
  23: IllPhysio, // fall prevention
  24: IllMedical, // recovery after surgery
  25: IllVitamin, // B12 / vitamin D
};

export const articleImage = (id) => imageMap[id] || IllMedical;

// Icon for each article category (keys are the Turkish category names stored on articles).
export const CATEGORY_ICONS = {
  "Hastalık": Stethoscope, "Evde Bakım": HouseLine, "Hizmet": FirstAidKit, "Tedavi": Pill,
  "Tahlil": TestTube, "Yaşam": Leaf, "SSS": Question,
};
