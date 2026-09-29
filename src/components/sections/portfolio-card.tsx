"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type PortfolioCardProps = {
  image: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  labels: { before: string; after: string; beforeLabel: string; afterLabel: string; comparison: string; demo: string };
};

export function PortfolioCard({ image, title, category, description, alt, labels }: PortfolioCardProps) {
  const [enhanced, setEnhanced] = useState(true);

  return (
    <article className="portfolio-card" data-reveal>
      <div className={`portfolio-image ${enhanced ? "is-enhanced" : "is-before"}`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 767px) 92vw, (max-width: 1099px) 45vw, 585px" className="object-cover" />
        <span className="demo-label">{labels.demo}</span>
        <div className="portfolio-treatment" aria-hidden="true">
          <span>{category}</span><p>{title}</p><ArrowUpRight size={27} strokeWidth={1.3} />
        </div>
      </div>
      <div className="portfolio-caption">
        <div><p className="portfolio-category">{category}</p><h3>{title}</h3></div>
        <div className="comparison-toggle" role="group" aria-label={labels.comparison}>
          <button type="button" onClick={() => setEnhanced(false)} aria-pressed={!enhanced} aria-label={labels.beforeLabel}>{labels.before}</button>
          <button type="button" onClick={() => setEnhanced(true)} aria-pressed={enhanced} aria-label={labels.afterLabel}>{labels.after}</button>
        </div>
      </div>
      <p className="portfolio-description">{description}</p>
    </article>
  );
}
