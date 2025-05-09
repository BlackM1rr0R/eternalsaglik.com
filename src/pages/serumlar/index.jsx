import React, { useMemo } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SerumPhoto1 from '../../assets/images/serum1.webp';
import SerumPhoto2 from '../../assets/images/serum2.webp';
import SerumPhoto3 from '../../assets/images/serum3.webp';
import SerumPhoto4 from '../../assets/images/serum4.webp';
import SerumPhoto5 from '../../assets/images/serum5.webp';
import SerumPhoto6 from '../../assets/images/serum6.webp';
import SerumPhoto7 from '../../assets/images/serum7.webp';
import SerumPhoto8 from '../../assets/images/serum8.webp';
import SerumPhoto9 from '../../assets/images/serum9.webp';
import SerumPhoto10 from '../../assets/images/serum10.webp';
import SerumPhoto11 from '../../assets/images/serum11.webp';
import SerumPhoto12 from '../../assets/images/serum12.webp';
import SerumPhoto13 from '../../assets/images/serum13.webp';
import SerumPhoto14 from '../../assets/images/serum14.webp';
import SerumPhoto15 from '../../assets/images/serum15.webp';
import SerumPhoto16 from '../../assets/images/serum16.webp';

const Serumlar = () => {
  const navigate = useNavigate();

  const photos = useMemo(
    () => [
       
            {
              id: 1,
              images: `${SerumPhoto1}`,
              info: "Atom Serum",
            },
            {
              id: 2,
              images: `${SerumPhoto2}`,
              info: "Fat Burning Slim Boost",
            },
            {
              id: 3,
              images: `${SerumPhoto3}`,
              info: "Collagen Booster",
            },
            {
              id: 4,
              images: `${SerumPhoto4}`,
              info: "Magnezyum IV Terapi",
            },
            {
              id: 5,
              images: `${SerumPhoto5}`,
              info: "Alfa Lipoik Asit IV Terapi",
            },
            {
              id: 6,
              images: `${SerumPhoto6}`,
              info: "Selenyum IV Terapi",
            },
            {
              id: 7,
              images: `${SerumPhoto7}`,
              info: "B Vitamin Kompleksi",
            },
            {
              id: 8,
              images: `${SerumPhoto8}`,
              info: "Hidrasyon IV Terapi",
            },
            {
              id: 9,
              images: `${SerumPhoto9}`,
              info: "Saç ve Tırnak Canlılığı IV Terapi",
            },
            {
              id: 10,
              images: `${SerumPhoto10}`,
              info: "Beauty Kokteyl IV Terapi",
            },
            {
              id: 11,
              images: `${SerumPhoto11}`,
              info: "Amino Asit Kokteyl",
            },
            {
              id: 12,
              images: `${SerumPhoto12}`,
              info: "Glutatyon IV Serum",
            },
            {
              id: 13,
              images: `${SerumPhoto13}`,
              info: "NAD+",
            },
            {
              id: 14,
              images: `${SerumPhoto14}`,
              info: "Myers Kokteyli IV Terapi",
            },
            {
              id: 15,
              images: `${SerumPhoto15}`,
              info: "Yüksek Doz C Vitamini Kokteyli",
            },
            {
              id: 16,
              images: `${SerumPhoto16}`,
              info: "Çinko IV Terapi",
            },
       ],
    []
  );

  const handleNavigate = (id) => {
    navigate(`/serumlar/${id}`);
  };

  return (
    <>
    <Helmet>
    <title>Serumlar | Eternal Sağlık Hizmetleri</title>
    <meta
      name="description"
      content="Eternal Sağlık Hizmetleri, çeşitli hastalıklar hakkında bilgi sağlar ve tedavi seçenekleri sunar."
    />
    <meta
      name="keywords"
      content="Serumlar, Sağlık, ETERNAL, Tedavi, Klinik, Serumlar Tedavisi"
    />
    <link rel="canonical" href="https://www.eternal.com/hastaliklar" />
  </Helmet>
    <div className={styles.background}>
      <Wrapper>
        <div className={styles.headers}>
          <h2>ETERNAL IV TERAPI Tedavileri</h2>
          <p>Serumlar hakkında okuya bilirsiniz.</p>
        </div>
        <div className={styles.boxs}>
          {photos.map((item) => (
            <div
              key={item.id}
              className={styles.border}
              onClick={() => handleNavigate(item.id)}
            >
              <img src={item.images} alt={`Slide ${item.id}`} />
              <h2>{item.info}</h2>
          
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
    </>

  );
};

export default React.memo(Serumlar);
