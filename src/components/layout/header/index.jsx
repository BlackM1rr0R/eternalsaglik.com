import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../UI/wrapper/index";
import Logo from "../../../assets/images/logoresmi.png";
import { Sling as Hamburger } from "hamburger-react";
import {

  InstagramIcon
} from "../../../icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.background}>
      <Wrapper>
        <div className={styles.control}>
          <Link to={"/"} className={styles.images}>
            <img src={Logo} alt="Logo" />
            <h2>ETERNAL</h2>
            <h2>Sağlık Hizmetleri</h2>
          </Link>
          <div className={styles.services}>
            <Link to={"/randevu"}>Randevu</Link>
            <Link to={"/hizmetlerimiz"}>Hizmetlerimiz</Link>
            <Link to={"/about"}>Hakkımda</Link>
            <Link to={"/serumlar"}>Serumlar</Link>
            <Link to={"/gallery"}>Blog</Link>
            <Link to={"/contact"}>Iletisim</Link>
          </div>
          <div className={styles.phoneHeader}>
            <h3 className={styles.h3}>ÖZEL</h3>
            <h1>ETERNAL</h1>
            <h2>Sağlık Hizmetleri</h2>
          </div>
          <Link to={"https://www.instagram.com/sakaryaevdesaglik.esh/"} className={styles.icons}>
            <InstagramIcon />

          </Link>
          <div className={styles.hamburger}>
            <Hamburger
              size={22}
              distance="lg"
              toggled={isMenuOpen}
              toggle={toggleMenu}
            />
          </div>
        </div>
        {isMenuOpen && (
          <div className={styles.overlay}>
            <div className={styles.services}>
              <Link to={"/about"} onClick={closeMenu}>Hakkımda</Link>
              <Link to={"/randevu"} onClick={closeMenu}>Randevu</Link>
              <Link to={"/hizmetlerimiz"} onClick={closeMenu}>Hizmetlerimiz</Link>
              <Link to={"/serumlar"}>Serumlar</Link>
              <Link to={"/gallery"} onClick={closeMenu}>Blog</Link>
              <Link to={"/contact"} onClick={closeMenu}>Iletisim</Link>
            </div>
            <Link to={"https://www.instagram.com/sakaryaevdesaglik.esh/"} className={styles.icons}>

              <InstagramIcon />


            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default React.memo(Header);
