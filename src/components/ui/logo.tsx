import Image from "next/image";

type LogoProps = { variant?: "primary" | "white"; className?: string };

export function Logo({ variant = "primary", className = "" }: LogoProps) {
  return (
    <span className={`brand-logo ${className}`}>
      <Image
        src={`/brand/mamiratra-logo-${variant}.svg`}
        alt="Mamiratra"
        width={720}
        height={180}
        unoptimized
        loading="eager"
        className="brand-logo-image"
      />
    </span>
  );
}
