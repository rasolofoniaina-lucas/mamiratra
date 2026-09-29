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
          {team.map((member) => <article className="team-member" key={member.id} data-reveal><div className="team-avatar"><Image src={member.avatar} alt={t("common.avatar", { name: member.name })} width={200} height={200} unoptimized /></div><h3>{member.name}</h3><p className="team-role">{t(`team.${member.id}.role`)}</p><p className="team-description">{t(`team.${member.id}.description`)}</p></article>)}
        </div>
      </div>
    </section>
  );
}
