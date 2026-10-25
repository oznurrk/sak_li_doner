import type { MenuItem } from "@/types/menu";

export const PRICE_ON_REQUEST = "Fiyat bilgisi için iletişime geçin";

export function formatTry(amount: number): string {
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} TL`;
}

/**
 * needsConfirmation true ise veya tutar yoksa sayısal fiyat dönülmez.
 * Taslak tutarlar veri dosyasında durur; müşteri metninde görünmez.
 */
export function getPriceLabel(
  item: Pick<MenuItem, "price" | "needsConfirmation">,
): { confirmed: boolean; label: string } {
  if (item.needsConfirmation || item.price === null) {
    return { confirmed: false, label: PRICE_ON_REQUEST };
  }

  return { confirmed: true, label: formatTry(item.price) };
}
