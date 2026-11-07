import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaCalendarCheck, FaAmbulance } from "../../icons/modern";
import w from "../../styles/widgets.module.css";
import { primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { openEmergency } from "./emergency";
import { useT } from "../../i18n";
import common from "../../i18n/common";

// Sticky bottom bar on phones: the four actions that bring patients in.
const MobileBar = () => {
  const t = useT(common);
  return (
  <nav className={w.mobileBar} aria-label={t("quickContact")}>
    <a href={`tel:${primaryPhone.tel}`} className={`${w.barItem} ${w.barCall}`}>
      <FaPhoneAlt /> {t("call")}
    </a>
    <a href={whatsappUrl(t("waDefault"))} target="_blank" rel="noopener noreferrer" className={`${w.barItem} ${w.barWa}`}>
      <FaWhatsapp /> {t("whatsapp")}
    </a>
    <Link to="/randevu" className={`${w.barItem} ${w.barBook}`}>
      <FaCalendarCheck /> {t("book")}
    </Link>
    <button type="button" onClick={openEmergency} className={`${w.barItem} ${w.barSos}`}>
      <FaAmbulance /> {t("emergency")}
    </button>
  </nav>
  );
};

export default MobileBar;
