import { Eye, HandHeart, Sprout } from "lucide-react";

export const values = [
  { id: "accessible", icon: Eye },
  { id: "local", icon: HandHeart },
  { id: "impact", icon: Sprout },
] as const;

export const steps = ["exchange", "create", "publish"] as const;
