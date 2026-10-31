import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteConfig.publicSiteUrl
      ? { sitemap: `${siteConfig.publicSiteUrl}/sitemap.xml` }
      : {}),
  };
}
