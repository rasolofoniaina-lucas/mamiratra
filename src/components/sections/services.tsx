import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-top-row">
          <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })} description={t("description")} />
          <a href="#offres" className="text-link">{t("cta")}<ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="services-grid">
          {services.map(({ id, icon: Icon, image }, index) => (
            <article key={id} className="service-card" data-reveal>
              <div className="service-image"><Image src={image} alt={t(`${id}.alt`)} fill sizes="(max-width: 767px) 92vw, (max-width: 1099px) 30vw, 390px" className="object-cover" /><span className="service-icon"><Icon size={23} strokeWidth={1.4} aria-hidden="true" /></span></div>
              <div className="service-title"><h3>{t(`${id}.title`)}</h3><span>0{index + 1}</span></div>
              <p>{t(`${id}.description`)}</p><span className="service-detail">{t(`${id}.detail`)}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
