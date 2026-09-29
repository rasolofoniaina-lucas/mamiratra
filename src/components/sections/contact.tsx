import Image from "next/image";
import { ArrowUpRight, Camera, Globe, Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { getEmailUrl, getPhoneUrl, getSocialUrl, getWhatsAppUrl } from "@/lib/contact";
import { Accent } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export function Contact() {
  const t = useTranslations("contact");
  const whatsapp = getWhatsAppUrl(t("whatsappMessage"));
  const links = [
    { id: "phone" as const, href: getPhoneUrl(), icon: Phone, text: site.contact.phone },
    { id: "email" as const, href: getEmailUrl(), icon: Mail, text: site.contact.email },
    { id: "facebook" as const, href: getSocialUrl(site.contact.facebook), icon: Globe, text: t("facebook") },
    { id: "instagram" as const, href: getSocialUrl(site.contact.instagram), icon: Camera, text: t("instagram") },
  ].filter((link) => link.href);

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner" data-reveal>
        <Image src="/brand/mamiratra-icon.svg" alt="" width={58} height={58} unoptimized className="contact-symbol" />
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2>{t.rich("title", { em: (chunks) => <Accent>{chunks}</Accent> })}</h2>
        <p className="contact-description">{t("description")}</p>
        {whatsapp ? <ButtonLink href={whatsapp} variant="orange" arrow={false} target="_blank" rel="noopener noreferrer"><span className="whatsapp-button-content"><MessageCircle size={20} aria-hidden="true" />{t("whatsapp")}</span></ButtonLink> : <div className="contact-pending"><p className="contact-pending-title"><MessageCircle size={19} aria-hidden="true" />{t("whatsappPending")}</p><p>{links.length ? t("pending") : t("pendingDetail")}</p></div>}
        {links.length > 0 && <div className="contact-links">{links.map(({ id, href, icon: Icon, text }) => <a key={id} href={href!} aria-label={`${t(id)} — ${text}`} {...(href!.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}><Icon size={17} strokeWidth={1.5} aria-hidden="true" /><span>{text}</span><ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>}
      </div>
    </section>
  );
}
