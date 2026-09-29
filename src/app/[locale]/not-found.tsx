import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("common");
  const locale = await getLocale();
  return <main id="contenu" className="not-found container"><p className="eyebrow">404</p><h1>{t("notFoundTitle")}</h1><p>{t("notFoundDescription")}</p><a href={`/${locale}`} className="button button-dark">{t("backHome")}</a></main>;
}
