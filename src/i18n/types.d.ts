import type messages from "@/messages/fr.json";
import type { Locale as SiteLocale } from "./routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: SiteLocale;
    Messages: typeof messages;
  }
}
