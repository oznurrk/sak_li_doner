import { MessageCircle, Phone } from "lucide-react";
import { getWhatsAppPhone, siteConfig } from "@/data/site-config";
import { toTelHref } from "@/lib/phone";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

type OrderButtonsProps = {
  showMenuLink?: boolean;
  productName?: string;
};

const primaryClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 text-base font-semibold text-ink hover:bg-gold-deep sm:w-auto";

const secondaryClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-ink-raised px-5 text-base font-semibold text-cream hover:border-gold sm:w-auto";

export function OrderButtons({
  showMenuLink = false,
  productName,
}: OrderButtonsProps) {
  const telHref = toTelHref(siteConfig.phone);
  const whatsappHref = buildWhatsAppUrl(
    getWhatsAppPhone(),
    buildOrderMessage(siteConfig.whatsappMessage, productName),
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {showMenuLink ? (
        <a href="#menu" className={primaryClass}>
          Menüyü İncele
        </a>
      ) : null}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={showMenuLink ? secondaryClass : primaryClass}
      >
        <MessageCircle aria-hidden="true" className="size-5" />
        WhatsApp&apos;tan Sipariş
      </a>
      <a href={telHref} className={secondaryClass}>
        <Phone aria-hidden="true" className="size-5" />
        Hemen Ara
      </a>
    </div>
  );
}
