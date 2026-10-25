# SAK-LI DÖNER Dijital Menü

Tavuk döner restoranı için tek sayfalık, mobil öncelikli menü. Sipariş telefon veya WhatsApp ile verilir. Bu sürümde yönetim paneli, üyelik, veritabanı, sepet ve çevrimiçi ödeme yoktur.

Ürünler `src/data/menu.ts`, işletme ayarları `src/data/site-config.ts` dosyasındadır. İleride bu dosyaların yerini bir API alabilir; sayfalar veriyi bu katmandan okur.

## Çalıştırma

Gereksinim: Node.js 20 veya daha yeni.

```bash
npm install
npm run dev
```

Yerel önizleme adresi `http://localhost:3000` olur. Bu adres yalnızca geliştirme içindir. QR koda veya Instagram biyografisine yazılmamalıdır.

Diğer komutlar:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start`, önce `npm run build` alınmış üretim derlemesini çalıştırır.

Telefon biçimi ve fiyat gizleme kurallarını denetlemek için:

```bash
npx tsx scripts/check-contact.ts
```

## İşletme bilgilerinin durumu

| Bilgi | Durum | Ne yapmalısınız |
| --- | --- | --- |
| Ürün fiyatları | Onaylandı. Tutarı olan ürünlerde satış fiyatı görünür. | Yeni fiyat için `price` alanını güncelleyin. |
| Kemalpaşa fiyatı | Hâlâ yok. Kartta tutar yerine iletişim cümlesi görünür. | Rakamı yazıp `needsConfirmation` değerini `false` yapın. |
| "Link" adlı ürün | Menüde 20 TL ile duruyor. Ad hâlâ notlardaki “Link”. | Gerçek adı `name` alanından düzeltin. Yanlışsa `available` değerini `false` yapın. |
| Kola ve Fanta | 330 ml kola ve 330 ml fanta, ikisi de 70 TL. | Hacim veya ad yanlışsa `name` alanını düzeltin. |
| WhatsApp hattı | `0534 873 04 63` numarasından bağlantı üretiliyor. Bu hattın WhatsApp'ta açık olduğu doğrulanmadı. | Telefonda WhatsApp ile kendinize mesaj açıldığını deneyin. Farklı bir hat varsa `whatsappPhone` alanına yazın. |
| Açık adres | Kemalpaşa Mah. Halit Molla Cd. No: 2B, Ferizli, Sakarya. | Değişirse `address` alanını güncelleyin. |
| Çalışma saatleri | Pazartesi–Cumartesi 10:00–18:00. Pazar: Kapalı. | Değişirse `openingHours` ve `openingHoursSchema` alanlarını birlikte güncelleyin. |
| Ürün fotoğrafları | Tasarım denemesi için örnek görseller var. Gerçek ürün fotoğrafı değildir. | Gerçek fotoğrafı `public/images/menu/` altına koyun, `image` yolunu değiştirin ve `imageIsSample` değerini `false` yapın. |
| Logo | Verilen tabela fotoğrafı, 150×150 piksel. Küçük gösteriliyor. | Daha net bir dosyanız varsa `public/images/logo.png` ve `src/app/icon.png` dosyalarını birlikte değiştirin. |
| Yayındaki adres | Henüz yok. | Yayınladıktan sonra kalıcı `https://` adresini `publicSiteUrl` alanına yazın. |

`whatsappVerified` alanı yalnızca sizin kaydınızdır. `true` yapınca sitede ayrı bir rozet çıkmaz. Bağlantı, numara dolu olduğu sürece üretilir.

## Fiyatlar

Tutarlar TL cinsinden sayı olarak durur. Örnek: `120` → onaydan sonra `120 TL`. Binlik ayırıcı Türkçe biçimdedir.

Onaylanmamış veya tutarı olmayan üründe müşteri şunu görür: **Fiyat bilgisi için iletişime geçin.** Taslak rakam satış fiyatı gibi yazılmaz.

Onay örneği:

```ts
{
  id: "durum-doner",
  name: "Dürüm Döner",
  price: 120,
  needsConfirmation: false,
}
```

Yeni açıklama, gramaj veya porsiyon eklemeyin. Elinizde doğrulanmış kısa bir açıklama varsa `description` alanına yazın. Etiket kullanacaksanız `badge` alanına yazın; boş etiket uydurulmaz.

Ürünü geçici olarak menüden çıkarmak için `available: false` yapın. İçinde satışa açık ürün kalmayan kategori sitede görünmez.

## Telefon ve WhatsApp

Ekrandaki numara: `0534 873 04 63`.

Bağlantı üretilirken rakam dışındaki karakterler silinir, baştaki `0` atılır ve ülke kodu `90` eklenir:

- Arama: `tel:+905348730463`
- WhatsApp: `https://wa.me/905348730463?text=...`

Başlangıç mesajı: `Merhaba, Saklı Döner menüsünden sipariş vermek istiyorum.`

Ürün kartındaki WhatsApp bağlantısı aynı cümleyle başlar ve sonuna ürün adını ekler. Mesaj `encodeURIComponent` ile kodlanır. Numara zaten `90` ile başlıyorsa ülke kodu ikinci kez eklenmez.

Bu bağlantılar sipariş sistemine kayıt düşmez. Müşteri sizi arar veya WhatsApp'tan yazar.

## Görseller

`public/images/menu/` altındaki ürün fotoğrafları tasarım denemesi için üretilmiş örnek görsellerdir. Gerçek Saklı Döner ürün fotoğrafı değildir. Kartlarda “Örnek görsel” etiketi bulunur. Gerçek fotoğrafı koyunca `src/data/menu.ts` içinde yolu güncelleyin ve `imageIsSample` değerini `false` yapın. Görsel yüklenemezse kartta yedek metin görünür.

## QR kod ve Instagram

QR kodu sabit bir geliştirme adresine bağlamayın. `localhost`, önizleme veya sonradan değişecek bir bağlantı kullanmayın.

1. Siteyi kalıcı bir `https://` adresinde yayınlayın.
2. Bu adresi telefondan, mobil veriyle açıp menünün geldiğini doğrulayın.
3. Aynı adresi `src/data/site-config.ts` içindeki `publicSiteUrl` alanına yazıp yeniden derleyin. Open Graph ve yapılandırılmış veri bu adresi ancak o zaman kullanır.
4. QR kodu yalnızca bu kalıcı adresten üretin. Üreteci siz seçebilirsiniz; kodun içindeki metin, tarayıcıda açtığınız adresin aynısı olmalıdır.
5. Basılı kodu bir telefonla okutup menünün açıldığını yeniden deneyin.
6. Instagram biyografisine de aynı adresi yazın: [instagram.com/sak_li_doner](https://www.instagram.com/sak_li_doner/).

Henüz yayında bir site adresi yoktur. Bu depodaki hiçbir bağlantı canlı menü adresi değildir.

## Barındırma

Uygulama Next.js sunucusu olarak çalışır: `npm run build`, ardından `npm start`.

Vercel, Next.js ile doğrudan kullanılabilir. [Hobby planı](https://vercel.com/docs/plans/hobby) kişisel ve ticari olmayan kullanım içindir. [Adil kullanım kuralları](https://vercel.com/docs/limits/fair-use-guidelines) ürün veya hizmet satışını tanıtan siteleri ticari kullanıma sayar. Bir restoran menüsü bu kapsamdadır. Vercel kullanılacaksa Pro veya Enterprise planı gerekir. Yayınlamadan önce güncel koşulları [hizmet şartlarından](https://vercel.com/legal/terms) ve [fiyat sayfasından](https://vercel.com/pricing) tekrar kontrol edin; plan adları değişebilir.

Node.js çalıştıran kendi sunucunuz da kullanılabilir. Başka bir barındırıcı seçecekseniz ticari kullanıma izin verip vermediğine bakın.

Gizli anahtar veya harici API gerekmez.

## Proje yapısı

```text
src/
  app/                sayfa, düzen, stil, favicon
  components/         başlık, karşılama, menü, ürün kartı, alt bilgi
  data/menu.ts        kategoriler ve ürünler
  data/site-config.ts işletme ayarları
  lib/                telefon, WhatsApp, fiyat ve menü yardımcıları
  types/menu.ts       veri alanları
public/images/        logo ve ileride ürün fotoğrafları
```

Ürün alanları: `id`, `name`, `category`, `price`, `description`, `image`, `available`, `needsConfirmation`, `badge`, `sortOrder`.
