import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaCalendarCheck, FaAmbulance } from "react-icons/fa";
import w from "../../styles/widgets.module.css";
import { primaryPhone } from "../../config/site";
import { whatsappUrl } from "../../utils/whatsapp";
import { openEmergency } from "./emergency";

// Sticky bottom bar on phones: the four actions that bring patients in.
const MobileBar = () => (
  <nav className={w.mobileBar} aria-label="Hızlı iletişim">
    <a href={`tel:${primaryPhone.tel}`} className={`${w.barItem} ${w.barCall}`}>
      <FaPhoneAlt /> Ara
    </a>
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${w.barItem} ${w.barWa}`}>
      <FaWhatsapp /> WhatsApp
    </a>
    <Link to="/randevu" className={`${w.barItem} ${w.barBook}`}>
      <FaCalendarCheck /> Randevu
    </Link>
    <button type="button" onClick={openEmergency} className={`${w.barItem} ${w.barSos}`}>
      <FaAmbulance /> Acil
    </button>
  </nav>
);

export default MobileBar;
