import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const alt = "Mamiratra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale });
  const [icon, wordmark, font] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/mamiratra-icon.svg")),
    readFile(join(process.cwd(), "public/brand/mamiratra-wordmark.png")),
    readFile(join(process.cwd(), "public/fonts/dm-sans-og.ttf")),
  ]);

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#FFFDF9", padding: "65px 80px", fontFamily: "DM Sans", color: "#171717" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* ImageResponse uses native images of the official assets. */}
        <img src={`data:image/svg+xml;base64,${icon.toString("base64")}`} alt="" width={66} height={66} />
        <img src={`data:image/png;base64,${wordmark.toString("base64")}`} alt="Mamiratra" width={330} height={70} />
      </div>
      <div style={{ display: "flex", marginTop: 48, fontSize: locale === "en" ? 64 : 66, letterSpacing: "-3px", lineHeight: 1.08, maxWidth: 990 }}>
        {t.rich("hero.title", { em: (chunks) => chunks })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 28, borderTop: "1px solid #E9E5DE", fontSize: 19, color: "#6B6B6B" }}>
        <span>{t("footer.tagline")}</span><span style={{ color: "#A65013" }}>EJE Labs</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "DM Sans", data: font, weight: 700, style: "normal" }] },
  );
}
