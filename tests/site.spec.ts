import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const locales = ["fr", "mg", "en"] as const;
const viewports = [320, 375, 390, 430, 768, 1024, 1440, 1920];

for (const locale of locales) {
  test(`${locale}: responsive layout, metadata, assets and accessibility`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", { fr: "fr_FR", mg: "mg_MG", en: "en_US" }[locale]);
    await expect(page.locator(".team-member")).toHaveCount(5);
    await expect(page.locator(".offer-card")).toHaveCount(3);
    await expect(page.locator(".portfolio-card")).toHaveCount(4);
    await expect(page.locator(".intro")).not.toBeVisible();

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const overflows = await page.evaluate(() => {
        const screenWidth = document.documentElement.clientWidth;
        return Array.from(document.querySelectorAll("main *, header, footer")).filter((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.width > 0 && (bounds.left < -1 || bounds.right > screenWidth + 1);
        }).map((element) => element.className);
      });
      expect(overflows, `${locale} at ${width}px`).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
      await Promise.all(images.map(async (image) => { image.loading = "eager"; try { await image.decode(); } catch { /* Report failed images below. */ } }));
    });
    const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => !(image as HTMLImageElement).naturalWidth).map((image) => (image as HTMLImageElement).src));
    expect(brokenImages).toEqual([]);
    const a11y = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(a11y.violations.map(({ id, nodes }) => ({ id, elements: nodes.map((node) => node.target) }))).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("mobile menu, keyboard, section-preserving language choice and saved preference", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr$/);
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".mobile-navigation a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.locator('.mobile-navigation a[href="#services"]').click();
  await expect(page).toHaveURL(/#services$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.locator(".mobile-menu .language-switcher").getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en#services$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("portfolio comparison works independently, and contact never points at a dummy number", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr");
  const cards = page.locator(".portfolio-card");
  const first = cards.first();
  await first.locator("button").first().click();
  await expect(first.locator(".portfolio-image")).toHaveClass(/is-before/);
  await expect(first.locator("button").first()).toHaveAttribute("aria-pressed", "true");
  await expect(cards.nth(1).locator(".portfolio-image")).toHaveClass(/is-enhanced/);
  await first.locator("button").last().click();
  await expect(first.locator(".portfolio-image")).toHaveClass(/is-enhanced/);

  const whatsapp = page.locator('a[href^="https://wa.me/"]');
  for (const href of await whatsapp.evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href))) {
    expect(href).toMatch(/^https:\/\/wa\.me\/\d{7,15}\?text=.+/);
    expect(href).not.toMatch(/wa\.me\/0+\?/);
  }
  if ((await whatsapp.count()) === 0) {
    await expect(page.locator(".contact-pending")).toBeVisible();
    await expect(page.locator(".offer-card .button").first()).toHaveAttribute("href", "#contact");
  }
});

test("intro lasts at most 1.5 seconds and does not replay in the session", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/fr");
  await expect(page.locator(".intro")).toBeHidden({ timeout: 1500 });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-intro", "skip");
  await expect(page.locator(".intro")).toBeHidden();
  expect(errors).toEqual([]);
});

test("unknown pages return 404, and robots and sitemap are available", async ({ page, request }) => {
  const response = await page.goto("/fr/page-inexistante");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Retour à l’accueil" })).toBeVisible();
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('hreflang="mg"');
  for (const locale of locales) {
    const image = await request.get(`/${locale}/opengraph-image`);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
  }
});
