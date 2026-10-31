/**
 * İşletme ayarları.
 * İleride bu dosyanın yerini bir API veya veritabanı kaydı alabilir;
 * sayfalar işletme bilgisini buradan okumalı, metinleri bileşenlere gömmemelidir.
 *
 * null olan alanlar doğrulanmadığı için sitede gösterilmez.
 * Tahmini adres, saat veya fiyat yazmayın.
 */
export type SiteConfig = {
  brandName: string;
  slogan: string;
  businessType: string;
  metaDescription: string;
  instagramUrl: string;
  instagramHandle: string;
  /** Ekranda görünen ulusal telefon numarası. */
  phone: string;
  /**
   * WhatsApp sipariş hattı. null ise telefon numarası kullanılır.
   * Bu numaranın WhatsApp'ta açık olduğu doğrulanmadı.
   */
  whatsappPhone: string | null;
  whatsappVerified: boolean;
  whatsappMessage: string;
  /** Açık adres. null ise sitede gösterilmez. */
  address: {
    street: string;
    locality: string;
    region: string;
  } | null;
  /** Müşteriye görünen çalışma saati. null ise sitede gösterilmez. */
  openingHours: string | null;
  /** schema.org openingHours. Pazar kapalı olduğu için şemada yalnızca açık günler durur. */
  openingHoursSchema: string | null;
  /**
   * Yayındaki kalıcı menü adresi (https://...).
   * QR kod bu adresi açar. Kök adres www adresine yönlenir.
   */
  publicSiteUrl: string | null;
};

export const siteConfig: SiteConfig = {
  brandName: "SAK-LI DÖNER",
  slogan: "",
  businessType: "Tavuk döner",
  metaDescription:
    "Saklı Döner tavuk döner menüsü, Ferizli, Sakarya. Ürünleri inceleyin; siparişinizi telefon veya WhatsApp üzerinden verin.",
  instagramUrl: "https://www.instagram.com/sak_li_doner/",
  instagramHandle: "@sak_li_doner",
  phone: "0534 873 04 63",
  whatsappPhone: null,
  whatsappVerified: false,
  whatsappMessage:
    "Merhaba, Saklı Döner menüsünden sipariş vermek istiyorum.",
  address: {
    street: "Kemalpaşa Mah. Halit Molla Cd. No: 2B",
    locality: "Ferizli",
    region: "Sakarya",
  },
  openingHours: "Pazartesi–Cumartesi 10:00–18:00. Pazar: Kapalı.",
  openingHoursSchema: "Mo-Sa 10:00-18:00",
  publicSiteUrl: "https://www.saklidoner.com",
};

export function formatAddress(
  address: NonNullable<SiteConfig["address"]>,
): string {
  return `${address.street}, ${address.locality}, ${address.region}`;
}

export function buildGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function getWhatsAppPhone(config: SiteConfig = siteConfig): string {
  return config.whatsappPhone ?? config.phone;
}
