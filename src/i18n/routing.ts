import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "mg", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  mg: "Malagasy",
  en: "English",
};
