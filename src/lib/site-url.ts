import { site } from "@/data/site";

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  if (url) return new URL(url);

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000");
}
