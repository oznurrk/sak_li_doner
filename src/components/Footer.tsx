import { Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import {
  buildGoogleMapsUrl,
  formatAddress,
  siteConfig,
} from "@/data/site-config";
import { toTelHref } from "@/lib/phone";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const weekdayHours = "Pazartesi – Cumartesi";
const weekdayTime = "10:00 – 18:00";
const sundayClosed = "Pazar: Kapalı";

export function Footer() {
  const address = siteConfig.address;
  const addressText = address ? formatAddress(address) : null;
  const telHref = toTelHref(siteConfig.phone);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo2.png"
              alt=""
              width={768}
              height={768}
              sizes="96px"
              className="h-12 w-12 shrink-0"
            />
            <div>
              <p className="text-base font-semibold tracking-wide text-gold">
                SAK-LI DÖNER
              </p>
              <p className="text-sm text-cream-soft">{siteConfig.slogan}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Dijital menü. Siparişler telefon veya WhatsApp ile alınır.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gold">İletişim</h2>
          <ul className="mt-4 space-y-3">
            {address ? (
              <li>
                <a
                  href={buildGoogleMapsUrl(addressText ?? "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm leading-relaxed text-cream-soft hover:text-gold"
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold"
                  />
                  <span>
                    {address.street}
                    <span className="block">
                      {address.locality}, {address.region}
                    </span>
                    <span className="sr-only"> Google Haritalar’da açılır</span>
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={telHref}
                className="flex items-center gap-2 text-sm text-cream-soft hover:text-gold"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cream-soft hover:text-gold"
              >
                <InstagramIcon />
                {siteConfig.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        {siteConfig.openingHours ? (
          <div>
            <h2 className="text-sm font-semibold text-gold">Çalışma Saatleri</h2>
            <div className="mt-4 flex items-start gap-2 text-sm text-cream-soft">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
              <div>
                <p>{weekdayHours}</p>
                <p className="font-semibold text-cream">{weekdayTime}</p>
                <p className="mt-2">{sundayClosed}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div>
          <h2 className="text-sm font-semibold text-gold">Menü QR Kodu</h2>
          <div className="mt-4 flex h-28 w-28 items-center justify-center rounded-lg bg-cream p-2 text-center text-[11px] leading-snug font-semibold text-ink">
            {siteConfig.publicSiteUrl
              ? "QR kodu yayın adresine bağlanır"
              : "Yayın adresinden sonra burada görünür"}
          </div>
          <p className="mt-2 max-w-40 text-xs leading-relaxed text-muted">
            Menüyü açmak için okutun
          </p>
        </div>
      </div>
    </footer>
  );
}
