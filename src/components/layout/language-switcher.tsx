"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({ label, onSelect }: { label: string; onSelect?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchLanguage(event: React.MouseEvent<HTMLAnchorElement>, nextLocale: Locale) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (nextLocale === locale || pending) return;

    const hash = window.location.hash;
    const search = window.location.search;
    startTransition(() => {
      router.replace(`${pathname}${search}${hash}`, { locale: nextLocale, scroll: false });
    });
    onSelect?.();
  }

  return (
    <nav className="language-switcher" aria-label={label} aria-busy={pending}>
      {routing.locales.map((language) => (
        <Link
          key={language}
          href={pathname}
          locale={language}
          lang={language}
          hrefLang={language}
          aria-label={localeNames[language]}
          aria-current={language === locale ? "true" : undefined}
          onClick={(event) => switchLanguage(event, language)}
        >
          {language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
