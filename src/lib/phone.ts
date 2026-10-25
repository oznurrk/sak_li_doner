/**
 * Ulusal telefon numarasını ülke kodlu rakam dizisine çevirir.
 * Türkiye varsayılan ülke kodu 90'dır.
 * Baştaki trunk sıfır atılır: 0534 873 04 63 → 905348730463.
 * Numara zaten 90 ile başlıyorsa ülke kodu ikinci kez eklenmez.
 */
export function toE164Digits(phone: string, countryCode = "90"): string {
  const digits = phone.replace(/\D/g, "");

  if (!digits) {
    throw new Error("Telefon numarası boş olamaz.");
  }

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  const nationalLength = 10;
  if (
    digits.startsWith(countryCode) &&
    digits.length >= countryCode.length + nationalLength
  ) {
    return digits;
  }

  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return `${countryCode}${national}`;
}

export function toTelHref(phone: string): string {
  return `tel:+${toE164Digits(phone)}`;
}

export function toInternationalDisplay(phone: string): string {
  return `+${toE164Digits(phone)}`;
}
