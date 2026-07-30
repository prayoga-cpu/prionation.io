import "server-only";
import type { PageObjectResponse } from "@notionhq/client";

type Props = PageObjectResponse["properties"];

// Every extractor returns null on missing/mismatched data rather than
// coercing to 0 — the aggregation layer decides how to treat nulls, so
// missing figures never silently masquerade as real zeros.

export function title(props: Props, key: string): string {
  const p = props[key];
  if (!p || p.type !== "title") return "";
  return p.title.map((t) => t.plain_text).join("");
}

export function richText(props: Props, key: string): string {
  const p = props[key];
  if (!p || p.type !== "rich_text") return "";
  return p.rich_text.map((t) => t.plain_text).join("");
}

export function num(props: Props, key: string): number | null {
  const p = props[key];
  if (!p || p.type !== "number") return null;
  return p.number;
}

export function formulaNumber(props: Props, key: string): number | null {
  const p = props[key];
  if (!p || p.type !== "formula" || p.formula.type !== "number") return null;
  return p.formula.number;
}

export function rollupNumber(props: Props, key: string): number | null {
  const p = props[key];
  if (!p || p.type !== "rollup" || p.rollup.type !== "number") return null;
  return p.rollup.number;
}

export function selectName(props: Props, key: string): string | null {
  const p = props[key];
  if (!p || p.type !== "select") return null;
  return p.select?.name ?? null;
}

export function checkbox(props: Props, key: string): boolean {
  const p = props[key];
  if (!p || p.type !== "checkbox") return false;
  return p.checkbox;
}

export function dateStart(props: Props, key: string): string | null {
  const p = props[key];
  if (!p || p.type !== "date") return null;
  return p.date?.start ?? null;
}

export function relationIds(props: Props, key: string): string[] {
  const p = props[key];
  if (!p || p.type !== "relation") return [];
  return p.relation.map((r) => r.id);
}

export function filesPresent(props: Props, key: string): boolean {
  const p = props[key];
  if (!p || p.type !== "files") return false;
  return p.files.length > 0;
}
