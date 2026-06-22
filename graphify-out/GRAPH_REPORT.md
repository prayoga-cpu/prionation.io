# Graph Report - prionation.io  (2026-06-22)

## Corpus Check
- 123 files · ~212,429 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 644 nodes · 1252 edges · 43 communities (32 shown, 11 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b85734f7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Content Pages & Routing|Content Pages & Routing]]
- [[_COMMUNITY_Form Submission & Backend|Form Submission & Backend]]
- [[_COMMUNITY_Package Dependencies & Scripts|Package Dependencies & Scripts]]
- [[_COMMUNITY_Start Page & Discord Page|Start Page & Discord Page]]
- [[_COMMUNITY_Engage Forms & UI Tabs|Engage Forms & UI Tabs]]
- [[_COMMUNITY_Method Principles & System Overview|Method Principles & System Overview]]
- [[_COMMUNITY_SEOAEOGEO Strategy|SEO/AEO/GEO Strategy]]
- [[_COMMUNITY_Header, Modal & Motion Library|Header, Modal & Motion Library]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_JSON-LD Schema & Root Layout|JSON-LD Schema & Root Layout]]
- [[_COMMUNITY_Hiring Ad Campaign|Hiring Ad Campaign]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Anchor Landing Pages|Anchor Landing Pages]]
- [[_COMMUNITY_Higgsfield Ad Campaign|Higgsfield Ad Campaign]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Methodology Section & UI Atoms|Methodology Section & UI Atoms]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Hero Section & Animations|Hero Section & Animations]]
- [[_COMMUNITY_Community 22|Community 22]]
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
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]

## God Nodes (most connected - your core abstractions)
1. `getPublishedPages()` - 34 edges
2. `T` - 27 edges
3. `SiteFooter()` - 16 edges
4. `compilerOptions` - 16 edges
5. `ContentHeader()` - 15 edges
6. `getRelatedLinks()` - 14 edges
7. `Icon()` - 13 edges
8. `getPageBySlug()` - 13 edges
9. `buildContentMetadata()` - 12 edges
10. `shell()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/glossary/page.tsx → lib/notify/templates.ts
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/manifesto/page.tsx → lib/notify/templates.ts
- `generateMetadata()` --calls--> `T`  [INFERRED]
  app/[locale]/ai-product-engineering-for-mid-market-companies/page.tsx → lib/notify/templates.ts
- `TESTIMONIALS` --calls--> `T`  [INFERRED]
  components/sections/Testimonials.tsx → lib/notify/templates.ts
- `Owned Infrastructure (no vendor lock-in)` --semantically_similar_to--> `Supabase Storage (CV uploads)`  [INFERRED] [semantically similar]
  public/llms.txt → README.md

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

## Communities (43 total, 11 thin omitted)

### Community 0 - "Content Pages & Routing"
Cohesion: 0.13
Nodes (9): DiagnosticTab(), EMPTY_FORM, FormState, REQUIRED, MeetUsTab(), fadeIn, slideUp, Engage() (+1 more)

### Community 1 - "Form Submission & Backend"
Cohesion: 0.07
Nodes (66): POST(), POST(), VALID_BASE, VALID_BASE, evaluateDisqualification(), VALID_BASE, BookingPayload, bookingSchema (+58 more)

### Community 2 - "Package Dependencies & Scripts"
Cohesion: 0.05
Nodes (39): browserslist, dependencies, framer-motion, @marsidev/react-turnstile, next, next-intl, @notionhq/client, react (+31 more)

### Community 3 - "Start Page & Discord Page"
Cohesion: 0.15
Nodes (12): CareerForm, CareersTab(), EMPTY, POSITIONS, REQUIRED, formatDialCode(), formatEmail(), formatPhone() (+4 more)

### Community 5 - "Engage Forms & UI Tabs"
Cohesion: 0.70
Nodes (4): collectFromSitemap(), fetchText(), locs(), main()

### Community 6 - "Method Principles & System Overview"
Cohesion: 0.08
Nodes (29): Client Ownership / No Vendor Lock-in Principle, Engagement Flow (Diagnostic to Build to Retainer), Evals Before Features, Frameworks Cluster (Interactive Tools), Guides Cluster (Educational), Intelligence Cluster (Research), Lean Pods, Fixed Clocks, Methodology Content Cluster (4 pages) (+21 more)

### Community 7 - "SEO/AEO/GEO Strategy"
Cohesion: 0.16
Nodes (18): BRAND, buildXmp(), checkOnly, crc32(), CRC_TABLE, __dirname, filter, MANIFEST (+10 more)

### Community 8 - "Header, Modal & Motion Library"
Cohesion: 0.13
Nodes (14): Header(), backdrop, easeCinematic, easeFast, fadeUp, pageFade, slideDown, slideInLeft (+6 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "JSON-LD Schema & Root Layout"
Cohesion: 0.15
Nodes (10): ic(), Icon(), IconProps, Faq(), FaqItem, Foundation(), TeamMember, ICONS (+2 more)

### Community 11 - "Hiring Ad Campaign"
Cohesion: 0.11
Nodes (23): BUILD_VS_BUY_WEIGHTS, BuildVsBuyText, buildVsBuyVerdict(), BuyBuildVerdict, en, fr, getWidgetText(), id (+15 more)

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (59): generateMetadata(), generateStaticParams(), Page(), SECTION, generateMetadata(), generateStaticParams(), Page(), SECTION (+51 more)

### Community 13 - "Anchor Landing Pages"
Cohesion: 0.22
Nodes (8): #4 content-expansion checklist, AEO — answer engines & voice, GEO — generative-engine citation, Out of SEO/AEO/GEO scope (product / content backlog), PageSpeed / Core Web Vitals — live validation, Pre-push — verification gate, PRIONATION.io — SEO / AEO / GEO board, SEO — search ranking & indexing

### Community 14 - "Higgsfield Ad Campaign"
Cohesion: 0.14
Nodes (13): OrganizationSchema(), PEOPLE, ServiceSchema(), WebSiteSchema(), MotionProvider(), blackHanSans, OG_LOCALE, pressStart2P (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (17): AppShell(), ContentHighlight, Engage, Faq, Foundation, HowWeWork, Methodology, NotifyModal (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.23
Nodes (8): coreEntries(), Entry, esc(), GET(), renderEntry(), sectionEntries(), SITEMAP_IDS, SITEMAP_SECTIONS

### Community 17 - "Methodology Section & UI Atoms"
Cohesion: 0.29
Nodes (5): PlanData, Pricing(), SectionHead(), Dot(), Eyebrow()

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (7): generateMetadata(), OG_LOCALE, AnchorPage(), AnchorSection, Faq, SCHEMA_HUE, SECTIONS_META

### Community 21 - "Hero Section & Animations"
Cohesion: 0.10
Nodes (17): useCountUp(), riseIn, bodyStyle, buildBlueprint(), buildRoad(), errorLabel, eyebrowStyle, Hero() (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (9): staggerSlow, ContentHighlight(), getFeatured(), SCHEMA_HUE, CASE_DEMOS, CASE_IMGS, CASE_SLUGS, CaseData (+1 more)

### Community 24 - "Brand Mark & Favicons"
Cohesion: 0.70
Nodes (5): Apple Touch Icon (Brand Mark), Prionation Brand Mark (Periwinkle Squircle Glyph), Favicon 32x32 (Brand Mark), Favicon 64x64 (Brand Mark), App Icon 512 (Brand Mark)

### Community 25 - "PageSpeed Script"
Cohesion: 0.50
Nodes (3): pad(), run(), THRESHOLDS

### Community 27 - "Founders & Foundation"
Cohesion: 0.15
Nodes (12): Darwin Prayoga (Founder & CEO), Environment variables, Evan Cao (Chief Revenue Officer), Features, Form pipelines, Getting started, Notion setup, PRIONATION.io — v.3.1.0 (+4 more)

### Community 33 - "Community 33"
Cohesion: 0.32
Nodes (5): initials(), Testimonial, TestimonialCard(), TESTIMONIALS, Stars()

### Community 39 - "Community 39"
Cohesion: 0.29
Nodes (6): DiscordPageClient(), generateMetadata(), OG_LOCALE, generateMetadata(), T, HowWeWork()

### Community 43 - "Community 43"
Cohesion: 0.10
Nodes (17): ArticleSidebar(), SECTION_LABEL, SECTIONS, Faq, findPhrase(), isLetter(), renderWithLinks(), Section (+9 more)

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (3): ManifestoPage(), generateMetadata(), OG_LOCALE

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (4): GlossaryPage(), Term, generateMetadata(), OG_LOCALE

### Community 46 - "Community 46"
Cohesion: 0.38
Nodes (3): {Link, redirect, usePathname, useRouter, getPathname}, routing, config

## Knowledge Gaps
- **217 isolated node(s):** `OG_LOCALE`, `OG_LOCALE`, `OG_LOCALE`, `OG_LOCALE`, `SECTION` (+212 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `T` connect `Community 39` to `Content Pages & Routing`, `Form Submission & Backend`, `Community 33`, `Header, Modal & Motion Library`, `JSON-LD Schema & Root Layout`, `Community 12`, `Community 45`, `Community 44`, `Community 15`, `Methodology Section & UI Atoms`, `Community 18`, `Hero Section & Animations`, `Community 22`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `getPublishedPages()` connect `Community 12` to `Community 16`, `Community 18`, `Community 43`, `Community 22`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `SiteFooter()` connect `Community 12` to `Community 39`, `Community 44`, `Community 45`, `Community 15`, `Community 18`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `getPublishedPages()` (e.g. with `generateStaticParams()` and `generateStaticParams()`) actually correct?**
  _`getPublishedPages()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 26 inferred relationships involving `T` (e.g. with `generateMetadata()` and `Header()`) actually correct?**
  _`T` has 26 INFERRED edges - model-reasoned connections that need verification._
- **What connects `OG_LOCALE`, `OG_LOCALE`, `OG_LOCALE` to the rest of the system?**
  _220 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Content Pages & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.1323529411764706 - nodes in this community are weakly interconnected._