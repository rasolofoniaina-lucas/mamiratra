import { site } from "@/data/site";

export function getWhatsAppUrl(message: string): string | null {
  const digits = site.contact.whatsapp.replace(/\D/g, "");
  if (!/^\d{7,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl(): string | null {
  const phone = site.contact.phone.replace(/[^+\d]/g, "");
  return phone ? `tel:${phone}` : null;
}

export function getEmailUrl(): string | null {
  return site.contact.email ? `mailto:${site.contact.email}` : null;
}

export function getSocialUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
