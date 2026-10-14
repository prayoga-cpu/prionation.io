import { describe, expect, it } from "vitest";
import { createTranslator } from "next-intl";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import id from "@/messages/id.json";
import { SHOWCASE_IMAGES } from "@/lib/content/pages";

const LOCALES = { en, fr, id } as const;
type Locale = keyof typeof LOCALES;
const ALL = Object.keys(LOCALES) as Locale[];

// Every key path, with array lengths, so a missing/extra translation — or a
// list with a different number of items — fails loudly.
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) {
    return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  }
  return [path];
}

// Dotted keys of every string read through t()/t.rich (arrays are read with t.raw).
function stringKeys(value: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(value).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") return [key];
    if (v && typeof v === "object" && !Array.isArray(v)) return stringKeys(v as Record<string, unknown>, key);
    return [];
  });
}

function lookup(value: Record<string, unknown>, key: string): unknown {
  return key.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], value);
}

describe("messages", () => {
  it.each(["fr", "id"] as const)("%s has exactly the same keys as en", (locale) => {
    expect(shape(LOCALES[locale]).sort()).toEqual(shape(en).sort());
  });

  // ShowcaseSlideshow reads one alt per image after the first; a missing one
  // would ship an image with alt={undefined}.
  it.each(ALL)("%s has an alt for every extra showcase image", (locale) => {
    const alts = LOCALES[locale].ShowcaseImages as Record<string, string[]>;
    for (const [slug, images] of Object.entries(SHOWCASE_IMAGES)) {
      expect(alts[slug] ?? [], slug).toHaveLength(images.length - 1);
      for (const a of alts[slug] ?? []) expect(a.trim(), slug).not.toBe("");
    }
  });
});

describe("Sales namespace (/start)", () => {
  it.each(ALL)("every %s string parses and formats as ICU", (locale) => {
    const errors: string[] = [];
    // Keys are computed at runtime, so drop next-intl's per-key typing.
    const t = createTranslator({
      locale,
      messages: LOCALES[locale] as Record<string, unknown>,
      onError: (error) => errors.push(error.message),
    }) as unknown as { rich: (key: string, values: Record<string, unknown>) => unknown };
    const keys = stringKeys(LOCALES[locale].Sales);
    expect(keys.length).toBeGreaterThan(40);
    for (const key of keys) {
      // {phone} / {email} are filled from lib/seo/site.ts by the page.
      t.rich(`Sales.${key}`, { strong: (chunks: unknown) => chunks, phone: "07 81 73 23 86", email: "consult@prionation.io" });
    }
    expect(errors).toEqual([]);
  });

  it.each(ALL)("%s keeps the <strong> emphasis in rich strings", (locale) => {
    for (const key of ["story.p2"]) {
      expect(lookup(LOCALES[locale].Sales, key)).toMatch(/<strong>[^<]+<\/strong>/);
    }
  });
});
