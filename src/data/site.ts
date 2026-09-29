export const site = {
  name: "Mamiratra",
  program: "EJE Labs",
  // Set the final public domain here, or use NEXT_PUBLIC_SITE_URL.
  url: "",
  contact: {
    // International format, e.g. +261…, without spaces for WhatsApp.
    // Empty values never create links to an invented recipient.
    whatsapp: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
  },
  images: {
    hero: "/images/ceramics.jpg",
  },
} as const;

export const navigation = [
  { id: "home", href: "#accueil" },
  { id: "mission", href: "#mission" },
  { id: "services", href: "#services" },
  { id: "team", href: "#equipe" },
  { id: "contact", href: "#contact" },
] as const;
