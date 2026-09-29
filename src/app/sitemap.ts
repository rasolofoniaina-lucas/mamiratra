import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, base).href,
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((language) => [language, new URL(`/${language}`, base).href])),
    },
  }));
}
