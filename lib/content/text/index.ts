import type { LocalePages } from "./types";
import { pagesEn } from "./en";
import { pagesFr } from "./fr";
import { pagesId } from "./id";

export type { LocalePages } from "./types";

// Cluster-page content keyed by locale, merged into next-intl messages under the
// "Pages" namespace (see i18n/request.ts).
export const pagesContent: Record<string, LocalePages> = {
  en: pagesEn,
  fr: pagesFr,
  id: pagesId,
};
