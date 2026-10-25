import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { getWhatsAppPhone, siteConfig } from "@/data/site-config";
import { toTelHref } from "@/lib/phone";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const menuLinks = [
  { href: "#menu", label: "Menü" },
  { href: "#doner", label: "Döner" },
  { href: "#icecekler", label: "İçecekler" },
  { href: "#tatlilar", label: "Tatlılar" },
];

export function Header() {
  const telHref = toTelHref(siteConfig.phone);
  const whatsappHref = buildWhatsAppUrl(
    getWhatsAppPhone(),
    siteConfig.whatsappMessage,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="h-1 bg-gold" aria-hidden="true" />
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="SAK-LI DÖNER tabela logosu"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
            priority
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide text-gold">
              SAK-LI DÖNER
            </p>
            <p className="truncate text-[11px] text-muted sm:text-xs">
              {siteConfig.slogan}
            </p>
          </div>
        </div>

        <nav
          aria-label="Sayfa bölümleri"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex"
        >
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={telHref}
            aria-label={`Hemen ara: ${siteConfig.phone}`}
            className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gold text-cream hover:bg-ink-raised sm:w-auto sm:px-3.5"
          >
            <Phone aria-hidden="true" className="size-4" />
            <span className="hidden text-sm font-semibold sm:inline">
              {siteConfig.phone}
            </span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp'tan sipariş"
            className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-ink hover:bg-gold-deep md:w-auto md:px-4"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
