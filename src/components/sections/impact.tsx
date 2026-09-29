import { useLocale, useTranslations } from "next-intl";
import { impact } from "@/data/impact";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function Impact() {
  const t = useTranslations("impact");
  const locale = useLocale();

  return (
    <section className="section impact-section">
      <div className="container">
        <div className="impact-intro"><SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })} /><p className="section-description" data-reveal>{t("description")}</p></div>
        <dl className="impact-grid">{impact.map((metric) => <div key={metric.id} data-reveal><dd>{metric.value === null ? <span className="metric-pending">{t("upcoming")}</span> : <>{new Intl.NumberFormat(locale).format(metric.value)}{metric.currency && <span className="metric-currency"> Ar</span>}</>}</dd><dt>{t(metric.id)}</dt></div>)}</dl>
        <p className="impact-note">{t("note")}</p>
      </div>
    </section>
  );
}
