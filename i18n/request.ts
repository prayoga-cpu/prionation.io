import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {pagesContent, type LocalePages} from '@/lib/content/text';

// Strip the heavy per-page body (intro/sections/faq) from the Pages namespace
// before it is serialized into the client bundle on EVERY page. Those fields are
// large (the full cluster-article copy) and only used by ContentArticle, which
// now receives them as props from its own route. Light fields (navLabel,
// seoTitle, metaDescription, badge, tldr, h1) stay here for server metadata,
// sidebars, and the article header — they are small and used cross-page.
function lightPages(full: LocalePages): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(full)) {
    if (key === 'common' || !value) {
      out[key] = value;
      continue;
    }
    const section: Record<string, unknown> = {};
    for (const [slug, page] of Object.entries(value)) {
      const {intro, sections, faq, ...light} = page;
      void [intro, sections, faq]; // stripped from the client payload by design
      section[slug] = light;
    }
    out[key] = section;
  }
  return out;
}

export default getRequestConfig(async ({requestLocale}) => {
  // This should typically correspond to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const base = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    // Cluster-page copy lives in lib/content/text and is merged under "Pages".
    // Only the light fields ship globally; bodies are passed per-page as props.
    messages: {...base, Pages: lightPages(pagesContent[locale])}
  };
});
