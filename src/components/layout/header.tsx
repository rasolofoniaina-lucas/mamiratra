"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    // Let the opening styles become visible before moving keyboard focus.
    let focusFrame = requestAnimationFrame(() => {
      focusFrame = requestAnimationFrame(() => focusable?.[0]?.focus());
    });

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [buttonRef.current, ...Array.from(focusable ?? [])].filter((item): item is HTMLElement => item !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href={`/${locale}#accueil`} aria-label={t("common.home")} className="logo-link" onClick={closeMenu}>
          <Logo />
        </a>
        <nav className="desktop-navigation" aria-label={t("common.menuOpen")}>
          {navigation.map((item) => <a key={item.id} href={item.href}>{t(`nav.${item.id}`)}</a>)}
        </nav>
        <div className="desktop-actions">
          <LanguageSwitcher label={t("common.language")} />
          <a href="#contact" className="header-contact">{t("common.contact")}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <button
          type="button"
          ref={buttonRef}
          className="menu-toggle"
          aria-label={t(open ? "common.menuClose" : "common.menuOpen")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div id="mobile-menu" ref={panelRef} className={`mobile-menu ${open ? "is-open" : ""}`} inert={!open}>
        <nav aria-label={t("common.menuOpen")} className="mobile-navigation">
          {navigation.map((item, index) => (
            <a key={item.id} href={item.href} onClick={closeMenu}>
              <span className="mobile-nav-number">0{index + 1}</span>{t(`nav.${item.id}`)}<ArrowUpRight size={20} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mobile-menu-bottom">
          <LanguageSwitcher label={t("common.language")} onSelect={closeMenu} />
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </header>
  );
}
