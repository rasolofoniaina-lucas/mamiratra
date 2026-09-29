import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = ComponentProps<"a"> & {
  children: ReactNode;
  variant?: "dark" | "orange" | "outline" | "light";
  arrow?: boolean;
};

export function ButtonLink({ children, variant = "dark", arrow = true, className = "", ...props }: ButtonLinkProps) {
  return (
    <a className={`button button-${variant} ${className}`} {...props}>
      <span>{children}</span>
      {arrow && <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />}
    </a>
  );
}
