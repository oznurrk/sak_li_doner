import Image from "next/image";
import { OrderButtons } from "@/components/OrderButtons";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-[min(52%,40rem)]">
        <Image
          src="/images/menu/hero-doner.jpg"
          alt="Örnek tavuk döner şiş görseli. Saklı Döner’in gerçek fotoğrafı değildir."
          fill
          priority
          sizes="(min-width: 768px) 42vw, 100vw"
          className="object-cover object-[70%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/35 md:from-ink md:via-ink/40 md:to-transparent" />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 sm:py-16">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-gold uppercase">
            {siteConfig.businessType}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            Lezzeti Tadında Saklı
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-cream-soft">
            Tavuk döner menümüzü inceleyin. Siparişinizi
            telefonla veya WhatsApp üzerinden iletebilirsiniz.
          </p>
        </div>
        <OrderButtons showMenuLink />
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Çevrimiçi sepet veya ödeme yoktur. Sipariş, telefon ya da WhatsApp
          ile alınır.
        </p>
      </div>
    </section>
  );
}
