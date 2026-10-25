import { toE164Digits } from "./phone";

/** Ürün adı verilirse başlangıç mesajının sonuna eklenir. */
export function buildOrderMessage(
  baseMessage: string,
  productName?: string,
): string {
  const name = productName?.trim();
  if (!name) {
    return baseMessage;
  }

  return `${baseMessage} Ürün: ${name}`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = toE164Digits(phone);
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}
