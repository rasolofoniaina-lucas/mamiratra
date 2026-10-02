import Image from "next/image";
import { useTranslations } from "next-intl";
import { team } from "@/data/team";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function Team() {
  const t = useTranslations();

  return (
    <section id="equipe" className="section team-section">
      <div className="container">
        <SectionHeading eyebrow={t("team.eyebrow")} title={t.rich("team.title", { em: (chunks) => <Accent>{chunks}</Accent> })} description={t("team.description")} centered />
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-member" key={member.id} data-reveal>
              {member.portrait ? (
                <div className="team-portrait">
                  <Image src={member.portrait} alt={t("common.portrait", { name: member.name })} fill sizes="142px" />
                </div>
              ) : (
                <div className="team-portrait team-portrait--pending">
                  <span>{t("common.portraitPending")}</span>
                </div>
              )}
              <h3>{member.name}</h3>
              <p className="team-role">{t(`team.${member.id}.role`)}</p>
              <p className="team-description">{t(`team.${member.id}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
