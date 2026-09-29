import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Accent } from "@/components/ui/section-heading";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="accueil" className="hero container" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" />{t("eyebrow")}</p>
          <h1 id="hero-title">{t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })}</h1>
          <p className="hero-description">{t("description")}</p>
          <div className="hero-actions">
            <ButtonLink href="#mission">{t("primaryCTA")}</ButtonLink>
            <a href="#services" className="text-link">{t("secondaryCTA")}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <Image src={site.images.hero} alt={t("imageAlt")} fill sizes="(max-width: 767px) 92vw, (max-width: 1099px) 45vw, 560px" loading="eager" fetchPriority="high" quality={85} className="object-cover" />
            <span className="photo-corner" aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.3} /></span>
          </div>
          <div className="hero-photo-note">
            <Image src="/brand/mamiratra-icon.svg" alt="" width={46} height={46} unoptimized loading="eager" />
            <div><p>{t("imageLabel")}</p><span>{t("imageCaption")}</span></div>
          </div>
          <span className="hero-visual-index" aria-hidden="true">01 / MAMIRATRA</span>
        </div>
      </div>
      <div className="hero-baseline">
        <div className="hero-program"><span className="program-label">{t("program")}</span><span className="baseline-dot">·</span><span>{t("location")}</span></div>
        <a href="#mission" className="scroll-link">{t("scroll")}<ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
