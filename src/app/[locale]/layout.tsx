import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Intro } from "@/components/ui/intro";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const dmSans = localFont({
  src: "../../../public/fonts/dm-sans-latin.woff2",
  variable: "--font-dm-sans",
  weight: "400 700",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

type LayoutProps = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const base = getSiteUrl();
  const ogLocales: Record<Locale, string> = { fr: "fr_FR", mg: "mg_MG", en: "en_US" };

  return {
    metadataBase: base,
    title: t("title"),
    description: t("description"),
    applicationName: "Mamiratra",
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", mg: "/mg", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      type: "website",
      siteName: "Mamiratra",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    icons: { icon: "/brand/mamiratra-icon.svg", apple: "/apple-icon.png" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={dmSans.variable} suppressHydrationWarning>
      <body>
        <Script id="mamiratra-intro-session" strategy="beforeInteractive">
          {`try { if (sessionStorage.getItem('mamiratra-intro')) { document.documentElement.dataset.intro = 'skip'; } else { sessionStorage.setItem('mamiratra-intro', 'seen'); } } catch (_) { document.documentElement.dataset.intro = 'skip'; }`}
        </Script>
        <a className="skip-link" href="#contenu">{t("skip")}</a>
        <Intro />
        <NextIntlClientProvider messages={{ common: messages.common, nav: messages.nav, footer: messages.footer }}>
          <Header />
        </NextIntlClientProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}
