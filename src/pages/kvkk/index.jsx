import React from "react";
import Wrapper from "../../components/UI/wrapper";
import PageHero from "../../components/pagehero";
import ui from "../../styles/ui.module.css";
import { SITE } from "../../config/site";

// Template privacy notice under Law No. 6698 (KVKK). It should be reviewed by the
// business's legal advisor before being relied on.
const Kvkk = () => (
  <>
    <PageHero
      badge="KVKK"
      title="Kişisel Verilerin Korunması"
      highlight="ve Gizlilik"
      text="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni ve çerez politikası."
      seoTitle="KVKK Aydınlatma Metni ve Gizlilik Politikası"
      path="/kvkk"
    />
    <Wrapper>
      <section className={ui.section}>
        <div className={ui.prose}>
          <h2>1. Veri sorumlusu</h2>
          <p>
            Kişisel verileriniz, veri sorumlusu sıfatıyla {SITE.name} ("Eternal Sağlık") tarafından aşağıda açıklanan
            kapsamda işlenmektedir. İletişim: {SITE.email} · {SITE.address}
          </p>

          <h2>2. İşlenen kişisel veriler</h2>
          <ul>
            <li>Kimlik ve iletişim bilgileri: ad soyad, telefon, e-posta, adres.</li>
            <li>Randevu bilgileri: talep edilen hizmet, tarih, saat ve notlar.</li>
            <li>Sağlık verileri (özel nitelikli): yalnızca hizmet sunumu için sizin paylaştığınız şikayet, reçete ve ölçüm bilgileri.</li>
            <li>İzin vermeniz halinde site kullanım verileri (analiz çerezleri).</li>
          </ul>

          <h2>3. İşleme amaçları</h2>
          <ul>
            <li>Randevu taleplerinin alınması, planlanması ve sizinle iletişim kurulması,</li>
            <li>Evde sağlık hizmetinin sunulması ve takibi,</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi,</li>
            <li>İzin vermeniz halinde web sitesinin geliştirilmesi için anonim istatistik oluşturulması.</li>
          </ul>

          <h2>4. Hukuki sebepler</h2>
          <p>
            Kişisel verileriniz KVKK m.5/2 kapsamında sözleşmenin kurulması ve ifası, hukuki yükümlülük ve meşru menfaat
            sebeplerine; sağlık verileriniz KVKK m.6/3 kapsamında koruyucu hekimlik, tıbbi teşhis, tedavi ve bakım
            hizmetlerinin yürütülmesi amacıyla sır saklama yükümlülüğü altındaki kişilerce işlenmesi sebebine; analiz
            çerezleri ise açık rızanıza dayanır.
          </p>

          <h2>5. Verilerin toplanma yöntemi</h2>
          <p>
            Veriler web sitesindeki formlar, telefon ve WhatsApp üzerinden sizin tarafınızdan iletilir. Web sitesindeki
            formlar bilgileri sunucuya kaydetmez; doldurduğunuz bilgiler sizin onayınızla WhatsApp mesajı olarak hazırlanır
            ve gönderme işlemini siz yaparsınız. WhatsApp kullanımı WhatsApp'ın kendi gizlilik koşullarına tabidir.
          </p>

          <h2>6. Aktarım</h2>
          <p>
            Verileriniz, hizmetin sunulması için gerekli olduğu ölçüde laboratuvarlar ve sağlık kuruluşları ile, yasal
            zorunluluk halinde yetkili kamu kurumlarıyla paylaşılabilir.
          </p>

          <h2>7. Çerezler</h2>
          <p>
            Sitemiz, tercihlerinizi (tema, yazı boyutu, çerez seçimi) tarayıcınızda saklamak için zorunlu yerel depolama
            kullanır. Google Analytics veya Meta Pixel gibi analiz araçları yalnızca çerez bildiriminde "Kabul Et"
            seçmeniz halinde yüklenir. Tercihinizi tarayıcınızın site verilerini temizleyerek sıfırlayabilirsiniz.
          </p>

          <h2>8. Haklarınız (KVKK m.11)</h2>
          <p>
            Verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme, aktarıldığı
            üçüncü kişileri bilme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı
            {" "}{SITE.email} adresine iletebilirsiniz.
          </p>
          <p className={ui.muted}>Son güncelleme: Kasım 2026</p>
        </div>
      </section>
    </Wrapper>
  </>
);

export default Kvkk;
