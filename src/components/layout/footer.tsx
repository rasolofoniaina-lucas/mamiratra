import { ArrowUp, Camera, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { navigation, site } from "@/data/site";
import { getSocialUrl } from "@/lib/contact";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const t = useTranslations();
  const facebook = getSocialUrl(site.contact.facebook);
  const instagram = getSocialUrl(site.contact.instagram);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand"><Logo /><p>{t("footer.tagline")}</p></div>
          <nav className="footer-navigation" aria-label={t("common.menuOpen")}>
            {navigation.filter((item) => item.id !== "home").map((item) => <a key={item.id} href={item.href}>{t(`nav.${item.id}`)}</a>)}
          </nav>
          <div className="footer-socials">
            {facebook && <a href={facebook} aria-label={t("contact.facebook")} target="_blank" rel="noopener noreferrer"><Globe size={19} /></a>}
            {instagram && <a href={instagram} aria-label={t("contact.instagram")} target="_blank" rel="noopener noreferrer"><Camera size={19} /></a>}
            <a href="#accueil" className="back-top" aria-label={t("footer.backTop")}><ArrowUp size={19} /></a>
          </div>
        </div>
        <div className="footer-bottom"><p>{t("footer.copyright", { year: new Date().getFullYear() })}</p><p>{t("footer.program")}</p></div>
      </div>
    </footer>
  );
}
