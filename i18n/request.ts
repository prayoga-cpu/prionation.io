import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {pagesContent} from '@/lib/content/text';

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
    messages: {...base, Pages: pagesContent[locale]}
  };
});
