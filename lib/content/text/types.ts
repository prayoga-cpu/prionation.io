// Shape of the cluster-page content merged into next-intl under the "Pages"
// namespace (see i18n/request.ts). Authoring lives in en.ts / fr.ts / id.ts.

export type PageContent = {
  navLabel: string;
  seoTitle: string;
  metaDescription: string;
  badge: string;
  tldr: string;
  h1: string;
  intro: string[];
  sections: { h2: string; body: string[] }[];
  faq: { q: string; a: string }[];
};

export type SectionContent = Record<string, PageContent>;

export type CommonContent = {
  backToHome: string;
  faqTitle: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  anchorLabel: string;
};

export type LocalePages = {
  common: CommonContent;
  methodology?: SectionContent;
  showcases?: SectionContent;
  frameworks?: SectionContent;
  guides?: SectionContent;
  intelligence?: SectionContent;
};
