import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const locales = ["fr", "mg", "en"];
const messages = Object.fromEntries(locales.map((locale) => [locale, JSON.parse(readFileSync(`src/messages/${locale}.json`, "utf8"))]));

function flatten(value, prefix = "") {
  return Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof entry === "object" && entry !== null ? flatten(entry, path) : [[path, entry]];
  });
}

const reference = flatten(messages.fr);
for (const locale of locales) {
  const entries = flatten(messages[locale]);
  assert.deepEqual(entries.map(([key]) => key).sort(), reference.map(([key]) => key).sort(), `Translation keys differ in ${locale}`);
  for (const [key, value] of entries) {
    assert.ok(typeof value === "string" && value.trim().length > 0, `Empty translation: ${locale}.${key}`);
    const source = reference.find(([referenceKey]) => referenceKey === key)[1];
    const parameters = (text) => [...new Set([...text.matchAll(/\{(\w+)(?:[,}])/g)].map((match) => match[1]))].sort();
    assert.deepEqual(parameters(value), parameters(source), `ICU parameters differ: ${locale}.${key}`);
    assert.equal((value.match(/<em>/g) ?? []).length, (value.match(/<\/em>/g) ?? []).length, `Unclosed markup: ${locale}.${key}`);
  }
}

for (const path of [
  "public/brand/mamiratra-logo-primary.svg", "public/brand/mamiratra-logo-white.svg", "public/brand/mamiratra-icon.svg", "public/brand/mamiratra-wordmark.svg",
  ...["tonisoa", "abdi", "vahatra", "miranto", "lucas"].map((id) => `public/avatars/${id}.svg`),
  ...["bakery", "food", "ceramics", "creator"].map((id) => `public/images/${id}.jpg`),
]) assert.ok(existsSync(path), `Missing asset: ${path}`);

console.log(`Content verified: ${reference.length} translation keys in each of 3 languages; all required assets present.`);
