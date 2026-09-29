import { useTranslations } from "next-intl";
import { portfolio } from "@/data/portfolio";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { PortfolioCard } from "./portfolio-card";

export function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })} description={t("description")} />
        <div className="portfolio-grid">
          {portfolio.map(({ id, image }) => {
            const title = t(`${id}.title`);
            return <PortfolioCard key={id} image={image} title={title} category={t(`${id}.category`)} description={t(`${id}.description`)} alt={t(`${id}.alt`)} labels={{ before: t("before"), after: t("after"), beforeLabel: t("beforeLabel", { name: title }), afterLabel: t("afterLabel", { name: title }), comparison: t("comparison", { name: title }), demo: t("demo") }} />;
          })}
        </div>
        <p className="portfolio-note">{t("note")}</p>
      </div>
    </section>
  );
}
