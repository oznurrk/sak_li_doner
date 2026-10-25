import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import { toInternationalDisplay } from "@/lib/phone";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const metadataBase = siteConfig.publicSiteUrl
  ? new URL(siteConfig.publicSiteUrl)
  : undefined;

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: "SAK-LI DÖNER | Dijital Menü",
  description: siteConfig.metaDescription,
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  robots: { index: true, follow: true },
  openGraph: {
    title: "SAK-LI DÖNER | Dijital Menü",
    description: siteConfig.metaDescription,
    locale: "tr_TR",
    type: "website",
    siteName: siteConfig.brandName,
    ...(siteConfig.publicSiteUrl ? { url: siteConfig.publicSiteUrl } : {}),
    ...(metadataBase
      ? {
          images: [
            {
              url: "/images/logo.png",
              width: 150,
              height: 150,
              alt: "SAK-LI DÖNER tabela logosu",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary",
    title: "SAK-LI DÖNER | Dijital Menü",
    description: siteConfig.metaDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.brandName,
    servesCuisine: "Tavuk döner",
    telephone: toInternationalDisplay(siteConfig.phone),
    sameAs: [siteConfig.instagramUrl],
  };

  if (siteConfig.publicSiteUrl) {
    jsonLd.url = siteConfig.publicSiteUrl;
  }

  if (siteConfig.address) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: "TR",
    };
  }

  if (siteConfig.openingHoursSchema) {
    jsonLd.openingHours = siteConfig.openingHoursSchema;
  }

  return (
    <html lang="tr" className={`${dmSans.variable} h-full antialiased`}>
      <body
        className={`${dmSans.className} flex min-h-dvh flex-col bg-ink text-cream`}
      >
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
        >
          İçeriğe geç
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
