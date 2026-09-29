import { useTranslations } from "next-intl";
import { steps } from "@/data/mission";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  const t = useTranslations("process");

  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })} centered />
        <ol className="process-grid">
          {steps.map((id, index) => <li key={id} data-reveal><span className="step-number">0{index + 1}</span><h3>{t(`${id}.title`)}</h3><p>{t(`${id}.description`)}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
