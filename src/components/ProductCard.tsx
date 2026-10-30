import { MessageCircle, Phone } from "lucide-react";
import { ProductPhoto } from "@/components/ProductPhoto";
import { getWhatsAppPhone, siteConfig } from "@/data/site-config";
import { toTelHref } from "@/lib/phone";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { PublicMenuItem } from "@/types/menu";

type ProductCardProps = {
  item: PublicMenuItem;
  compact?: boolean;
};

export function ProductCard({ item, compact = false }: ProductCardProps) {
  const telHref = toTelHref(siteConfig.phone);
  const whatsappHref = buildWhatsAppUrl(
    getWhatsAppPhone(),
    buildOrderMessage(siteConfig.whatsappMessage, item.name),
  );

  return (
    <article
      className={
        compact
          ? "@container flex h-full min-w-0 flex-col rounded-2xl border border-gold/70 bg-card p-3"
          : "flex h-full flex-col rounded-2xl border border-line bg-card p-4 sm:p-5"
      }
    >
      {item.image ? (
        <ProductPhoto
          src={item.image}
          name={item.name}
          sample={item.imageIsSample}
          compact={compact}
        />
      ) : (
        <div
          className={
            compact
              ? "mb-3 flex w-full items-center justify-center rounded-xl bg-ink px-3 pb-[75%] text-center text-xs text-cream-soft"
              : "mb-4 flex aspect-[4/3] items-center justify-center rounded-xl bg-ink-raised px-3 text-center text-sm text-cream-soft"
          }
        >
          Görsel yok
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        {item.badge ? (
          <p className="text-xs font-semibold tracking-wide text-gold uppercase">
            {item.badge}
          </p>
        ) : null}
        <h4
          className={
            compact
              ? "line-clamp-2 min-h-12 text-base leading-snug font-semibold text-cream"
              : "text-xl font-semibold text-cream"
          }
        >
          {item.name}
        </h4>
        {item.description ? (
          <p className="text-sm leading-relaxed text-cream-soft">
            {item.description}
          </p>
        ) : null}
        <p
          className={
            item.priceConfirmed
              ? compact
                ? "text-base font-semibold text-gold"
                : "text-lg font-semibold text-gold"
              : compact
                ? "line-clamp-2 text-sm leading-snug text-cream-soft"
                : "text-sm leading-snug text-cream-soft"
          }
        >
          {item.priceLabel}
        </p>
      </div>
      <div
        className={
          compact
            ? "mt-auto grid grid-cols-1 gap-2 pt-3 @min-[15rem]:grid-cols-2"
            : "mt-4 grid grid-cols-2 gap-2"
        }
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.name} için WhatsApp'tan sipariş ver`}
          className={
            compact
              ? "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-3 text-sm font-semibold text-ink hover:bg-gold-deep"
              : "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-gold px-3 text-sm font-semibold text-ink hover:bg-gold-deep"
          }
        >
          <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
          WhatsApp
        </a>
        <a
          href={telHref}
          aria-label={`${item.name} için hemen ara`}
          className={
            compact
              ? "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border border-gold bg-ink px-3 text-sm font-semibold text-cream hover:bg-ink-raised"
              : "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-line px-3 text-sm font-semibold text-cream hover:border-gold"
          }
        >
          <Phone aria-hidden="true" className="size-4 shrink-0" />
          Ara
        </a>
      </div>
    </article>
  );
}
