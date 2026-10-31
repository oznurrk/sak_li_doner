import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.publicSiteUrl) {
    return [];
  }

  return [
    {
      url: siteConfig.publicSiteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
