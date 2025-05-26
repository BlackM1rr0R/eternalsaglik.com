import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logoeternal.png";
import {  InstagramIcon  } from "../../../icons";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.background}>
      <div className={styles.hr}>
        <hr />
      </div>
      <Wrapper>
        <div className={styles.control}>
          <div className={styles.line1}>
            <img src={Logo} alt="" />
            <h2>ETERNAL
              Sağlık Hizmetleri</h2>
            <p>
              Siz neredeyseniz biz oradayız.
            </p>
          </div>
          <div className={styles.line2}>
            <h2>Sayfalar</h2>
            <ul>
              <Link to={"https://www.hemsirenburada.com/"} target="_blank">İstanbul Sağlık Sitemiz</Link>
              <Link to={"https://kantahlilim.com/"}>Kan Tahlili Sitemiz</Link>
              <Link to={"/"}>Ana Sayfa</Link>
              <Link to={"/randevu"}>Randevu</Link>
              <Link to={"/hizmetlerimiz"}>Hizmetlerimiz</Link>
              <Link to={"/about"}>Hakkımızda</Link>
              <Link to={"/gallery"}>Blog</Link>
              <Link to={"/contact"}>İletişim</Link>
            </ul>
          </div>
          <div className={styles.line2}>
            <h2>Hizmetler</h2>
            <ul>
               <Link to={"/serumlar"}>Serumlar</Link>
              <Link to={"/details/15"}>IV Serumlar</Link>
              <Link to={"/details/16"}>IV Terapiler</Link>
              <Link to={"/details/17"}>Laboratuvar Paketleri</Link>
              <Link to={"/details/18"}>Sağlıklı Yaşam</Link>
              <Link to={"/details/19"}>SSS</Link>

            </ul>
          </div>
          <div className={styles.line3}>
            <h2>Genel Merkez</h2>
            <ul>
              <li> Sakarya,Semerciler Mahallesi</li>
              <a href="tel:0552 518 96 54">0552 518 96 54</a>

            </ul>
            <div className={styles.icons}>
              <Link to={"https://www.instagram.com/sakaryaevdesaglik.esh/"} className={styles.linkedin}>
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default React.memo(Footer);
