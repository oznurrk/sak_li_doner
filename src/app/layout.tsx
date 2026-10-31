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

const shareImage = {
  url: "/images/logo2.png",
  width: 768,
  height: 768,
  alt: "SAK-LI DÖNER tabela logosu",
};

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  publisher: siteConfig.brandName,
  category: "restaurant",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(metadataBase ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    locale: "tr_TR",
    type: "website",
    siteName: siteConfig.brandName,
    ...(siteConfig.publicSiteUrl ? { url: siteConfig.publicSiteUrl } : {}),
    ...(metadataBase ? { images: [shareImage] } : {}),
  },
  twitter: {
    card: "summary",
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    ...(metadataBase ? { images: [shareImage.url] } : {}),
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
    servesCuisine: siteConfig.businessType,
    telephone: toInternationalDisplay(siteConfig.phone),
    sameAs: [siteConfig.instagramUrl],
    inLanguage: "tr-TR",
  };

  if (siteConfig.publicSiteUrl) {
    jsonLd["@id"] = siteConfig.publicSiteUrl;
    jsonLd.url = siteConfig.publicSiteUrl;
    jsonLd.image = `${siteConfig.publicSiteUrl}/images/logo2.png`;
    jsonLd.hasMenu = siteConfig.publicSiteUrl;
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
    jsonLd.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "18:00",
    };
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
