import { useTranslations } from "next-intl";
import { values } from "@/data/mission";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function Mission() {
  const t = useTranslations("mission");

  return (
    <section id="mission" className="section mission-section">
      <div className="container">
        <div className="mission-intro">
          <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })} />
          <div className="mission-copy" data-reveal><p>{t("description")}</p><p className="mission-statement">{t("statement")}</p></div>
        </div>
        <div className="values-grid">
          {values.map(({ id, icon: Icon }, index) => (
            <article className="value" key={id} data-reveal>
              <div className="value-top"><Icon size={25} strokeWidth={1.35} aria-hidden="true" /><span>0{index + 1}</span></div>
              <h3>{t(`values.${id}.title`)}</h3><p>{t(`values.${id}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
