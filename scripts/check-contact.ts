import { menuCategories, menuItems } from "../src/data/menu";
import {
  buildGoogleMapsUrl,
  formatAddress,
  siteConfig,
} from "../src/data/site-config";
import { getPublicMenu } from "../src/lib/menu";
import { formatTry, getPriceLabel, PRICE_ON_REQUEST } from "../src/lib/price";
import { toE164Digits, toTelHref } from "../src/lib/phone";
import { buildOrderMessage, buildWhatsAppUrl } from "../src/lib/whatsapp";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const digits = toE164Digits("0534 873 04 63");
assert(digits === "905348730463", `ülke kodu hatalı: ${digits}`);
assert(
  toE164Digits("+90 534 873 04 63") === "905348730463",
  "90 ile başlayan numara tekrar eklenmemeli",
);
assert(toTelHref(siteConfig.phone) === "tel:+905348730463", "tel bağlantısı hatalı");

const message = siteConfig.whatsappMessage;
const url = buildWhatsAppUrl("0534 873 04 63", message);
assert(
  url === `https://wa.me/905348730463?text=${encodeURIComponent(message)}`,
  `WhatsApp bağlantısı hatalı: ${url}`,
);
assert(
  buildOrderMessage(message, "Dürüm Döner") ===
    `${message} Ürün: Dürüm Döner`,
  "ürün mesajı hatalı",
);
assert(formatTry(120) === "120 TL", "fiyat biçimi hatalı");
assert(formatTry(1230) === "1.230 TL", "binlik ayırıcı hatalı");

for (const item of menuItems) {
  const label = getPriceLabel(item);
  if (item.price === null || item.needsConfirmation) {
    assert(label.label === PRICE_ON_REQUEST, `${item.id} fiyatı gizli kalmalı`);
  } else {
    assert(label.confirmed, `${item.id} onaylı olmalı`);
    assert(label.label === formatTry(item.price), `${item.id} fiyatı hatalı`);
  }
}

assert(siteConfig.address?.locality === "Ferizli", "ilçe eksik");
assert(siteConfig.address?.region === "Sakarya", "il eksik");
assert(
  siteConfig.openingHours === "Pazartesi–Cumartesi 10:00–18:00. Pazar: Kapalı.",
  "çalışma saati hatalı",
);
if (siteConfig.address) {
  const mapsUrl = buildGoogleMapsUrl(formatAddress(siteConfig.address));
  assert(
    mapsUrl.startsWith("https://www.google.com/maps/search/?api=1&query="),
    "harita bağlantısı hatalı",
  );
  assert(mapsUrl.includes(encodeURIComponent("Ferizli")), "harita sorgusu eksik");
}

const groups = getPublicMenu(menuItems, menuCategories);
const names = groups.flatMap((group) => group.items.map((item) => item.name));
assert(names.includes("Link"), "Link menüde olmalı");
assert(!names.includes("Lavaş"), "Lavaş menüde olmamalı");
assert(names.includes("Dürüm Döner"), "Dürüm Döner eksik");
assert(!names.includes("Kemalpaşa"), "Kemalpaşa menüde olmamalı");
const doner = groups.find((group) => group.id === "doner");
assert(doner?.layout === "feature", "döner düzeni 3 sütun tipi olmalı");
assert(groups.find((group) => group.id === "icecekler")?.layout === "compact", "içecek düzeni kompakt olmalı");
assert(
  groups.every((group) => group.items.length > 0),
  "boş kategori yayınlanmamalı",
);
const durum = groups
  .flatMap((group) => group.items)
  .find((item) => item.name === "Dürüm Döner");
assert(durum?.priceLabel === "120 TL", "Dürüm Döner fiyatı görünmüyor");

console.log("iletişim ve fiyat kontrolleri geçti");
console.log(url);
