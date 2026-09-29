import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? "section-heading-centered" : ""}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
