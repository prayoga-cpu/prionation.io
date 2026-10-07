import { describe, expect, it } from "vitest";
import { createTranslator } from "next-intl";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import id from "@/messages/id.json";

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
});

describe("Sales namespace (/start)", () => {
  it.each(ALL)("every %s string parses and formats as ICU", (locale) => {
    const errors: string[] = [];
    // Keys are computed at runtime, so drop next-intl's per-key typing.
    const t = createTranslator({
      locale,
      messages: LOCALES[locale] as Record<string, unknown>,
      onError: (error) => errors.push(error.message),
    }) as unknown as { rich: (key: string, values: Record<string, (chunks: unknown) => unknown>) => unknown };
    const keys = stringKeys(LOCALES[locale].Sales);
    expect(keys.length).toBeGreaterThan(40);
    for (const key of keys) {
      t.rich(`Sales.${key}`, { strong: (chunks) => chunks });
    }
    expect(errors).toEqual([]);
  });

  it.each(ALL)("%s keeps the <strong> emphasis in rich strings", (locale) => {
    for (const key of ["hero.sub", "story.p2", "story.p3"]) {
      expect(lookup(LOCALES[locale].Sales, key)).toMatch(/<strong>[^<]+<\/strong>/);
    }
  });
});
