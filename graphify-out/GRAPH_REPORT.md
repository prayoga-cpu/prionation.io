# Graph Report - prionation.io  (2026-07-13)

## Corpus Check
- 152 files · ~238,787 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 781 nodes · 1517 edges · 57 communities (46 shown, 11 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f571a72b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Content Pages & Routing|Content Pages & Routing]]
- [[_COMMUNITY_Form Submission & Backend|Form Submission & Backend]]
- [[_COMMUNITY_Package Dependencies & Scripts|Package Dependencies & Scripts]]
- [[_COMMUNITY_Start Page & Discord Page|Start Page & Discord Page]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Engage Forms & UI Tabs|Engage Forms & UI Tabs]]
- [[_COMMUNITY_Method Principles & System Overview|Method Principles & System Overview]]
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
- [[_COMMUNITY_Framer Motion System|Framer Motion System]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]

## God Nodes (most connected - your core abstractions)
1. `getPublishedPages()` - 35 edges
2. `T` - 30 edges
3. `SiteFooter()` - 16 edges
4. `compilerOptions` - 16 edges
5. `ContentHeader()` - 15 edges
6. `getRelatedLinks()` - 14 edges
7. `rateLimit()` - 13 edges
8. `Icon()` - 13 edges
9. `getPageBySlug()` - 13 edges
10. `verifyTurnstile()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/glossary/page.tsx → lib/notify/templates.ts
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/manifesto/page.tsx → lib/notify/templates.ts
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/page.tsx → lib/notify/templates.ts
- `generateStaticParams()` --calls--> `getPublishedPages()`  [INFERRED]
  app/[locale]/frameworks/[slug]/page.tsx → lib/content/pages.ts
- `generateStaticParams()` --calls--> `getPublishedPages()`  [INFERRED]
  app/[locale]/guides/[slug]/page.tsx → lib/content/pages.ts

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

## Communities (57 total, 11 thin omitted)

### Community 0 - "Content Pages & Routing"
Cohesion: 0.28
Nodes (7): Consent, setConsent(), useConsent(), usePixelAllowed(), useShowConsentBanner(), ConsentBanner(), MetaPixel()

### Community 1 - "Form Submission & Backend"
Cohesion: 0.07
Nodes (69): POST(), POST(), VALID_BASE, VALID_BASE, evaluateDisqualification(), VALID_BASE, BookingPayload, bookingSchema (+61 more)

### Community 2 - "Package Dependencies & Scripts"
Cohesion: 0.05
Nodes (43): browserslist, dependencies, @anthropic-ai/sdk, framer-motion, @marsidev/react-turnstile, next, next-intl, @notionhq/client (+35 more)

### Community 3 - "Start Page & Discord Page"
Cohesion: 0.12
Nodes (11): CareersTab(), DiagnosticTab(), EMPTY_FORM, FormState, REQUIRED, MeetUsTab(), fadeIn, slideUp (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.27
Nodes (6): Faq(), FaqItem, PlanData, SectionHead(), Dot(), Eyebrow()

### Community 5 - "Engage Forms & UI Tabs"
Cohesion: 0.70
Nodes (4): collectFromSitemap(), fetchText(), locs(), main()

### Community 6 - "Method Principles & System Overview"
Cohesion: 0.29
Nodes (8): DiagnosticRequest, diagnosticRequestSchema, mapUpstreamError(), client, jsonError(), looksGarbled(), normalizeWebsite(), POST()

### Community 7 - "SEO/AEO/GEO Strategy"
Cohesion: 0.16
Nodes (18): BRAND, buildXmp(), checkOnly, crc32(), CRC_TABLE, __dirname, filter, MANIFEST (+10 more)

### Community 8 - "Header, Modal & Motion Library"
Cohesion: 0.12
Nodes (15): backdrop, easeCinematic, easeFast, fadeUp, pageFade, riseIn, slideDown, slideInLeft (+7 more)

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
Nodes (26): generateMetadata(), generateStaticParams(), Page(), SECTION, generateMetadata(), generateStaticParams(), Page(), SECTION (+18 more)

### Community 13 - "Anchor Landing Pages"
Cohesion: 0.22
Nodes (8): #4 content-expansion checklist, AEO — answer engines & voice, GEO — generative-engine citation, Out of SEO/AEO/GEO scope (product / content backlog), PageSpeed / Core Web Vitals — live validation, Pre-push — verification gate, PRIONATION.io — SEO / AEO / GEO board, SEO — search ranking & indexing

### Community 14 - "Community 14"
Cohesion: 0.28
Nodes (7): ic(), Icon(), IconProps, COPY, NotifyModal(), NotifyVariant, scaleIn

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (16): AppShell(), ContentHighlight, Engage, Faq, Foundation, HowWeWork, Methodology, NotifyModal (+8 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (15): BACKLOG, GROUND TRUTH (verified — do not re-derive), HARD RULES (non-negotiable — violating any aborts the cycle with STATUS=aborted), ONE-TIME BOOTSTRAP (human/console only — surface as QUESTIONS, never automate), Open (work top-down, ONE logical change per cycle), PHASE 0 — RESUME, PHASE 1 — CRAWL (read GSC), PHASE 2 — AUDIT (pick ONE change) (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.23
Nodes (11): PRIVACY, PrivacyBlock, PrivacyDoc, PrivacyLocale, PrivacySection, Block(), generateMetadata(), OG_LOCALE (+3 more)

### Community 18 - "Community 18"
Cohesion: 0.16
Nodes (12): ArticleSidebar(), Faq, findPhrase(), isLetter(), renderWithLinks(), Section, SECTION_LABEL, VALID_ARTICLE_TYPE (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.14
Nodes (7): generateMetadata(), OG_LOCALE, AnchorPage(), AnchorSection, Faq, SCHEMA_HUE, SECTIONS_META

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
Cohesion: 0.12
Nodes (14): OrganizationSchema(), PEOPLE, ServiceSchema(), WebSiteSchema(), MotionProvider(), blackHanSans, generateMetadata(), OG_LOCALE (+6 more)

### Community 24 - "Brand Mark & Favicons"
Cohesion: 0.70
Nodes (5): Apple Touch Icon (Brand Mark), Prionation Brand Mark (Periwinkle Squircle Glyph), Favicon 32x32 (Brand Mark), Favicon 64x64 (Brand Mark), App Icon 512 (Brand Mark)

### Community 25 - "PageSpeed Script"
Cohesion: 0.50
Nodes (3): pad(), run(), THRESHOLDS

### Community 27 - "Founders & Foundation"
Cohesion: 0.17
Nodes (11): Analytics & consent, Environment variables, Features, Form pipelines, Getting started, Notion setup, PRIONATION.io — v.3.1.0, Project structure (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.32
Nodes (5): initials(), Testimonial, TestimonialCard(), TESTIMONIALS, Stars()

### Community 34 - "Framer Motion System"
Cohesion: 0.25
Nodes (6): buildDiagnosticPdf(), FONT_FILES, LABELS, loadFonts(), PdfLabels, ConsultLocale

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (7): DIAGNOSTIC_OUTPUT_SCHEMA, DIAGNOSTIC_SYSTEM_PROMPTS, DiagnosticResult, LANGUAGE_LINES, OFFER_NAMES, offerLines, teamLine

### Community 39 - "Community 39"
Cohesion: 0.16
Nodes (10): Header(), ConsultPageClient(), generateMetadata(), OG_LOCALE, DiscordPageClient(), generateMetadata(), OG_LOCALE, T (+2 more)

### Community 40 - "Community 40"
Cohesion: 0.13
Nodes (16): generateStaticParams(), ContentHeader(), getAllSlugs(), getPublishedPages(), SectionIndex(), Page(), SECTION, Page() (+8 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (9): CONTENT-LOOP OPERATOR — prionation.io, CURRENT DIAL & STAGE (decided by user), DISTRIBUTION (higher ROI than more pages), NON-NEGOTIABLE CONTEXT, PIPELINE (one run = at most ONE piece advanced), SECTIONS, STAGE GRADUATION, TAKEDOWN / KILL-SWITCH (built; use if anything looks wrong) (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.16
Nodes (10): SECTION_LABEL, SECTIONS, PageAudience, PageMeta, pages, PageSection, PageStatus, ALL_SECTIONS (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.16
Nodes (11): CONSULT_SYSTEM_PROMPTS, client, encoder, jsonError(), POST(), SSE_HEADERS, sseFrame(), consultMessage (+3 more)

### Community 44 - "Community 44"
Cohesion: 0.29
Nodes (6): CADENCE, DISTRIBUTION REPURPOSER — prionation.io, GROUND TRUTH, MEASUREMENT, PIPELINE (one run = ONE page repurposed), STAGE (current = A)

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (9): CareerForm, EMPTY, POSITIONS, REQUIRED, formatDialCode(), formatEmail(), formatPhone(), formatUrlForce() (+1 more)

### Community 46 - "Community 46"
Cohesion: 0.24
Nodes (10): latestPublishedDate(), coreEntries(), Entry, esc(), GET(), renderEntry(), sectionEntries(), SITEMAP_IDS (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.32
Nodes (3): FloatingShareDesktop(), FloatingShareMobile(), usePageUrl()

### Community 48 - "Community 48"
Cohesion: 0.21
Nodes (11): EventParams, trackEvent(), ConsultChatPanel(), ModelPicker(), Props, consultErrorKey(), ConsultMsg, ConsultStatus (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (4): GlossaryPage(), Term, generateMetadata(), OG_LOCALE

### Community 50 - "Community 50"
Cohesion: 0.11
Nodes (16): ManifestoPage(), {Link, redirect, usePathname, useRouter, getPathname}, routing, generateMetadata(), OG_LOCALE, config, CONSENT_REQUIRED, intlMiddleware (+8 more)

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (4): Attribution, captureAttribution(), classifyChannel(), getAttribution()

### Community 53 - "Community 53"
Cohesion: 0.50
Nodes (4): staggerSlow, ContentHighlight(), getFeatured(), SCHEMA_HUE

### Community 55 - "Community 55"
Cohesion: 0.40
Nodes (3): ICONS, Methodology(), PrincipleData

## Knowledge Gaps
- **277 isolated node(s):** `Features`, `Tech stack`, `Project structure`, `Environment variables`, `Analytics & consent` (+272 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `T` connect `Community 39` to `Form Submission & Backend`, `Community 33`, `Start Page & Discord Page`, `Community 4`, `Community 40`, `Header, Modal & Motion Library`, `Community 12`, `Community 15`, `Community 48`, `Community 49`, `Community 50`, `Community 19`, `Hero Section & Animations`, `Community 54`, `Community 23`, `Community 55`, `Community 56`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `getPublishedPages()` connect `Community 40` to `Community 42`, `Community 12`, `Community 46`, `Community 18`, `Community 19`, `Community 53`, `Community 56`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `IntakePayload` connect `Form Submission & Backend` to `Start Page & Discord Page`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `getPublishedPages()` (e.g. with `generateStaticParams()` and `generateStaticParams()`) actually correct?**
  _`getPublishedPages()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 29 inferred relationships involving `T` (e.g. with `generateMetadata()` and `Header()`) actually correct?**
  _`T` has 29 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Features`, `Tech stack`, `Project structure` to the rest of the system?**
  _277 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Form Submission & Backend` be split into smaller, more focused modules?**
  _Cohesion score 0.06716604244694133 - nodes in this community are weakly interconnected._