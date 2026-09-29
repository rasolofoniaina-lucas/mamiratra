import { Camera, Clapperboard, PenTool } from "lucide-react";

export const services = [
  { id: "photos", icon: Camera, image: "/images/bakery.jpg" },
  { id: "videos", icon: Clapperboard, image: "/images/ceramics.jpg" },
  { id: "visuals", icon: PenTool, image: "/images/creator.jpg" },
] as const;
