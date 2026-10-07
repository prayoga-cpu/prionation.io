# Graph Report - prionation.io  (2026-10-08)

## Corpus Check
- 204 files · ~274,392 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 992 nodes · 1955 edges · 51 communities (42 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `67dae96a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Form Submission & Backend|Form Submission & Backend]]
- [[_COMMUNITY_Package Dependencies & Scripts|Package Dependencies & Scripts]]
- [[_COMMUNITY_Start Page & Discord Page|Start Page & Discord Page]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Engage Forms & UI Tabs|Engage Forms & UI Tabs]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_SEOAEOGEO Strategy|SEO/AEO/GEO Strategy]]
- [[_COMMUNITY_Header, Modal & Motion Library|Header, Modal & Motion Library]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_JSON-LD Schema & Root Layout|JSON-LD Schema & Root Layout]]
- [[_COMMUNITY_Hiring Ad Campaign|Hiring Ad Campaign]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Anchor Landing Pages|Anchor Landing Pages]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Hero Section & Animations|Hero Section & Animations]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Brand Mark & Favicons|Brand Mark & Favicons]]
- [[_COMMUNITY_PageSpeed Script|PageSpeed Script]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Founders & Foundation|Founders & Foundation]]
- [[_COMMUNITY_Team Portraits|Team Portraits]]
- [[_COMMUNITY_Vercel Config|Vercel Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]

## God Nodes (most connected - your core abstractions)
1. `getPublishedPages()` - 35 edges
2. `T` - 27 edges
3. `useCurrency()` - 17 edges
4. `SiteFooter()` - 16 edges
5. `compilerOptions` - 16 edges
6. `ContentHeader()` - 15 edges
7. `getRelatedLinks()` - 14 edges
8. `aggregateFinance()` - 14 edges
9. `Icon()` - 13 edges
10. `getPageBySlug()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/glossary/page.tsx → lib/notify/templates.ts
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/page.tsx → lib/notify/templates.ts
- `generateStaticParams()` --calls--> `getPublishedPages()`  [INFERRED]
  app/[locale]/frameworks/[slug]/page.tsx → lib/content/pages.ts
- `generateStaticParams()` --calls--> `getPublishedPages()`  [INFERRED]
  app/[locale]/intelligence/[slug]/page.tsx → lib/content/pages.ts
- `generateStaticParams()` --calls--> `getPublishedPages()`  [INFERRED]
  app/[locale]/methodology/[slug]/page.tsx → lib/content/pages.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **The PRIONATION Method — Four Core Principles** — public_llms_evals_before_features, public_llms_telemetry_day_one, public_llms_owned_infrastructure, public_llms_lean_pods_fixed_clocks [EXTRACTED 1.00]
- **SEO/AEO/GEO Optimisation Targets** — todo_seo, todo_aeo, todo_geo [EXTRACTED 1.00]
- **Form Pipeline Backend Stack** — readme_form_integration_backend, readme_notion_db, readme_resend_email, readme_turnstile, readme_upstash_rate_limit [EXTRACTED 1.00]
- **Prionation brand mark icon variants across resolutions** — public_apple_touch_icon_logo, public_favicon_32x32_logo, public_favicon_64x64_logo, public_icon_512_logo, public_brandmark_logo [INFERRED 0.85]
- **Bug Hunt Offer: headline, prize, and target audience** — ads_bugbounty_campaign_headline, ads_bugbounty_campaign_prize, ads_bugbounty_campaign_audience [INFERRED 0.85]
- **Size variants of one shared campaign concept** — ads_bug_bounty_campaign_1080x1350, ads_bug_bounty_campaign_1080x1920, ads_bugbounty_campaign [EXTRACTED 1.00]
- **Creative identity: brand, visual design, and CTA** — ads_bugbounty_campaign_brand, ads_bugbounty_campaign_visual_design, ads_bugbounty_campaign_cta [INFERRED 0.75]
- **Competition core offer: brief, grand prize, CTA** — ads_higgsfield_campaign_brief, ads_higgsfield_campaign_prize, ads_higgsfield_campaign_cta [INFERRED 0.85]
- **Size variants of one campaign concept** — ads_higgsfield_motion_competition_ad_1080x1350_variant, ads_higgsfield_motion_competition_ad_1080x1920_variant, ads_higgsfield_campaign [EXTRACTED 1.00]
- **Brand partnership framing: PRIONATION hosts, Higgsfield sponsors prize** — ads_higgsfield_campaign_brand_prionation, ads_higgsfield_campaign_brand_higgsfield, ads_higgsfield_campaign_prize [INFERRED 0.85]
- **Size variants of one hiring campaign** — ads_hiring_campaign, ads_hiring_ai_roles_ad_1080x1350, ads_hiring_ai_roles_ad_1080x1920 [INFERRED 0.95]
- **AI-native role upgrade set offered to traditional talent** — ads_hiring_campaign_role_mapping, ads_hiring_campaign_role_ai_product_engineer, ads_hiring_campaign_role_ai_experience_designer, ads_hiring_campaign_role_ai_delivery_lead, ads_hiring_campaign_role_ai_growth_operator, ads_hiring_campaign_role_ai_content_distributor, ads_hiring_campaign_role_prompt_strategist [EXTRACTED 1.00]
- **Recruiting creative messaging (headline, value prop, CTA, audience)** — ads_hiring_campaign_headline, ads_hiring_campaign_value_prop, ads_hiring_campaign_cta, ads_hiring_campaign_audience [INFERRED 0.85]
- **Team Members Group** — team_darwin_portrait, team_evan_portrait [INFERRED 0.75]
- **Prionation Portfolio Work Items** — work_epidom_product, work_expeditoo_product, work_lead_agent_product [INFERRED 0.85]
- **SaaS Landing Page Designs** — work_epidom_product, work_expeditoo_product, work_lead_agent_product [INFERRED 0.75]

## Communities (51 total, 9 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (71): BudgetLines, BudgetVsActual(), ChartTooltip(), Props, CurrencyContext, CurrencyContextValue, CurrencyProvider(), useCurrency() (+63 more)

### Community 1 - "Form Submission & Backend"
Cohesion: 0.07
Nodes (66): POST(), POST(), VALID_BASE, VALID_BASE, evaluateDisqualification(), VALID_BASE, BookingPayload, bookingSchema (+58 more)

### Community 2 - "Package Dependencies & Scripts"
Cohesion: 0.05
Nodes (43): browserslist, dependencies, framer-motion, jose, @marsidev/react-turnstile, next, next-intl, @notionhq/client (+35 more)

### Community 3 - "Start Page & Discord Page"
Cohesion: 0.09
Nodes (21): Attribution, captureAttribution(), classifyChannel(), getAttribution(), EventParams, trackEvent(), NotifyModal(), CareerForm (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (23): Consent, setConsent(), usePixelAllowed(), useShowConsentBanner(), ConsentBanner(), OrganizationSchema(), PEOPLE, ServiceSchema() (+15 more)

### Community 5 - "Engage Forms & UI Tabs"
Cohesion: 0.70
Nodes (4): collectFromSitemap(), fetchText(), locs(), main()

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (10): ic(), Icon(), IconProps, Faq(), FaqItem, Foundation(), TeamMember, ICONS (+2 more)

### Community 7 - "SEO/AEO/GEO Strategy"
Cohesion: 0.16
Nodes (18): BRAND, buildXmp(), checkOnly, crc32(), CRC_TABLE, __dirname, filter, MANIFEST (+10 more)

### Community 8 - "Header, Modal & Motion Library"
Cohesion: 0.11
Nodes (17): Header(), backdrop, easeCinematic, easeFast, fadeUp, pageFade, riseIn, slideDown (+9 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "JSON-LD Schema & Root Layout"
Cohesion: 0.12
Nodes (10): byChannel, byStage, byStatus, channelOf(), lines, pipelineValue, report, today (+2 more)

### Community 11 - "Hiring Ad Campaign"
Cohesion: 0.11
Nodes (23): BUILD_VS_BUY_WEIGHTS, BuildVsBuyText, buildVsBuyVerdict(), BuyBuildVerdict, en, fr, getWidgetText(), id (+15 more)

### Community 12 - "Community 12"
Cohesion: 0.14
Nodes (26): generateMetadata(), generateStaticParams(), Page(), SECTION, generateMetadata(), Page(), SECTION, generateMetadata() (+18 more)

### Community 13 - "Anchor Landing Pages"
Cohesion: 0.09
Nodes (22): 2026-07-29 — Bing Webmaster Tools audit (D11), 2026-07-29 — GSC Page Indexing audit (D10), D1 · Unique title + meta description per page, per locale, D2 · Canonical + hreflang on every page, D3 · UTM + referrer attribution → Notion (Phase A1), D4 · Link GA4 to Google Ads, import the lead conversion, D5 · IndexNow (clears Bing's High flag, instant re-crawl), D6 · GSC validate fix + resubmit (after D1 ships) (+14 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (7): generateMetadata(), OG_LOCALE, AnchorPage(), AnchorSection, Faq, SCHEMA_HUE, SECTIONS_META

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (16): AppShell(), ContentHighlight, Engage, Faq, Foundation, HowWeWork, Methodology, NotifyModal (+8 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (15): BACKLOG, GROUND TRUTH (verified — do not re-derive), HARD RULES (non-negotiable — violating any aborts the cycle with STATUS=aborted), ONE-TIME BOOTSTRAP (human/console only — surface as QUESTIONS, never automate), Open (work top-down, ONE logical change per cycle), PHASE 0 — RESUME, PHASE 1 — CRAWL (read GSC), PHASE 2 — AUDIT (pick ONE change) (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (10): staggerSlow, ContentHighlight(), getFeatured(), SCHEMA_HUE, PlanData, Pricing(), Btn(), SectionHead() (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (8): DiscordPageClient(), generateMetadata(), OG_LOCALE, generateMetadata(), generateMetadata(), T, Engage(), SelectedWork()

### Community 19 - "Community 19"
Cohesion: 0.14
Nodes (15): generateStaticParams(), ArticleSidebar(), SECTION_LABEL, SECTIONS, getAllSlugs(), getPublishedPages(), PageAudience, PageMeta (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.29
Nodes (6): DELIVERY / GUARDRAILS, GO-TO-MARKET FUNNEL OPERATOR — prionation.io, GROUND TRUTH (verified — do not re-derive), HARD RULES, PHASE A — INSTRUMENT (one-time, build-gated commits to main; do in this order), PHASE B — MEASURE & REPORT (recurring, e.g. weekly)

### Community 21 - "Hero Section & Animations"
Cohesion: 0.09
Nodes (17): useCountUp(), bodyStyle, buildBlueprint(), buildRoad(), errorLabel, eyebrowStyle, headlineStyle, Hero() (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.25
Nodes (5): SHOWCASE_IMAGES, CASE_DEMOS, CASE_IMGS, CASE_SLUGS, CaseData

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (3): ALL, Locale, LOCALES

### Community 24 - "Brand Mark & Favicons"
Cohesion: 0.70
Nodes (5): Apple Touch Icon (Brand Mark), Prionation Brand Mark (Periwinkle Squircle Glyph), Favicon 32x32 (Brand Mark), Favicon 64x64 (Brand Mark), App Icon 512 (Brand Mark)

### Community 25 - "PageSpeed Script"
Cohesion: 0.50
Nodes (3): pad(), run(), THRESHOLDS

### Community 27 - "Founders & Foundation"
Cohesion: 0.17
Nodes (11): Analytics & consent, Environment variables, Features, Form pipelines, Getting started, Notion setup, PRIONATION.io — v.3.9.1, Project structure (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.06
Nodes (32): POST(), getFinanceSession(), FinanceSessionClaims, secretKey(), signFinanceSession(), verifyFinanceSession(), AcknowledgeButton(), Acknowledgment (+24 more)

### Community 35 - "Community 35"
Cohesion: 0.09
Nodes (15): Case, CASE_IMAGES, CLIENT_LOGOS, Faq, GLYPHS, Item, QUOTES, Row (+7 more)

### Community 39 - "Community 39"
Cohesion: 0.07
Nodes (33): logSuccessfulLogin(), attemptsKey(), FinanceRole, generateCode(), hashCode(), otpKey(), redis, storeOtp() (+25 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (9): CONTENT-LOOP OPERATOR — prionation.io, CURRENT DIAL & STAGE (decided by user), DISTRIBUTION (higher ROI than more pages), NON-NEGOTIABLE CONTEXT, PIPELINE (one run = at most ONE piece advanced), SECTIONS, STAGE GRADUATION, TAKEDOWN / KILL-SWITCH (built; use if anything looks wrong) (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (11): Faq, findPhrase(), isLetter(), renderWithLinks(), Section, SECTION_LABEL, VALID_ARTICLE_TYPE, Interlink (+3 more)

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (5): DiagnosticTab(), MeetUsTab(), fadeIn, slideUp, Tab

### Community 44 - "Community 44"
Cohesion: 0.32
Nodes (3): FloatingShareDesktop(), FloatingShareMobile(), usePageUrl()

### Community 45 - "Community 45"
Cohesion: 0.23
Nodes (11): PRIVACY, PrivacyBlock, PrivacyDoc, PrivacyLocale, PrivacySection, Block(), generateMetadata(), OG_LOCALE (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.09
Nodes (25): latestPublishedDate(), {Link, redirect, usePathname, useRouter, getPathname}, routing, coreEntries(), Entry, esc(), GET(), renderEntry() (+17 more)

### Community 47 - "Community 47"
Cohesion: 0.33
Nodes (4): metadata, pressStart2P, rubik, viewport

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (6): CADENCE, DISTRIBUTION REPURPOSER — prionation.io, GROUND TRUTH, MEASUREMENT, PIPELINE (one run = ONE page repurposed), STAGE (current = A)

### Community 49 - "Community 49"
Cohesion: 0.10
Nodes (16): ContentHeader(), ManifestoPage(), ALL_SECTIONS, SCHEMA_HUE, SECTION_META, SectionIndex(), Page(), SECTION (+8 more)

### Community 51 - "Community 51"
Cohesion: 0.22
Nodes (6): OG_LOCALE, ARCHIVED_VERSIONS, ArchivedVersion, ChangelogEntry, SemverBump, V3_ENTRIES

### Community 53 - "Community 53"
Cohesion: 0.32
Nodes (5): initials(), Testimonial, TestimonialCard(), TESTIMONIALS, Stars()

## Knowledge Gaps
- **331 isolated node(s):** `Features`, `Tech stack`, `Project structure`, `Environment variables`, `Analytics & consent` (+326 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `T` connect `Community 18` to `Form Submission & Backend`, `Community 4`, `Community 6`, `Header, Modal & Motion Library`, `Community 12`, `Community 14`, `Community 15`, `Community 49`, `Community 17`, `Community 19`, `Hero Section & Animations`, `Community 53`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `PillLogo()` connect `Community 39` to `Community 35`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `verifyFinanceSession()` connect `Community 33` to `Community 46`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `getPublishedPages()` (e.g. with `generateStaticParams()` and `generateStaticParams()`) actually correct?**
  _`getPublishedPages()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 26 inferred relationships involving `T` (e.g. with `generateMetadata()` and `Header()`) actually correct?**
  _`T` has 26 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Features`, `Tech stack`, `Project structure` to the rest of the system?**
  _331 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.052360338074623786 - nodes in this community are weakly interconnected._