import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { offers } from "@/data/offers";
import { getWhatsAppUrl } from "@/lib/contact";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export function Offers() {
  const t = useTranslations("offers");
  const locale = useLocale();

  return (
    <section id="offres" className="section offers-section">
      <div className="container">
        <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })} description={t("description")} centered />
        <div className="offers-grid">
          {offers.map((offer) => {
            const name = t(`${offer.id}.name`);
            const whatsapp = getWhatsAppUrl(t("whatsappMessage", { pack: name }));
            const features = (["photos", "reels", "visuals"] as const).filter((feature) => offer[feature] > 0);
            return (
              <article key={offer.id} className={`offer-card ${offer.featured ? "offer-featured" : ""}`} data-reveal>
                {offer.featured && <span className="offer-badge"><span className="status-dot" />{t("popular")}</span>}
                <h3>{name}</h3><p className="offer-description">{t(`${offer.id}.description`)}</p>
                <div className="offer-price"><span>{new Intl.NumberFormat(locale).format(offer.price)}</span><span className="offer-currency">Ar</span></div>
                <span className="offer-per-pack">{t("perPack")}</span>
                <ul className="offer-features">{features.map((feature) => <li key={feature}><Check size={17} strokeWidth={1.7} aria-hidden="true" />{t(feature, { count: offer[feature] })}</li>)}</ul>
                <ButtonLink href={whatsapp || "#contact"} variant={offer.featured ? "orange" : "outline"} aria-label={t("ctaLabel", { pack: name })} {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{t("cta")}</ButtonLink>
              </article>
            );
          })}
        </div>
        <p className="offers-note">{t("note")}</p>
      </div>
    </section>
  );
}
