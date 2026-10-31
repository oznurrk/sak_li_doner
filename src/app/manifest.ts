import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.metaTitle,
    short_name: siteConfig.brandName,
    description: siteConfig.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0b09",
    theme_color: "#0c0b09",
    lang: "tr",
    icons: [
      {
        src: "/images/logo2.png",
        sizes: "768x768",
        type: "image/png",
      },
    ],
  };
}
