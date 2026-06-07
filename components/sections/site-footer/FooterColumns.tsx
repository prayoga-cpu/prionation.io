"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Dot } from "../../ui/Atoms";
import { getPublishedPages, type PageSection } from "@/lib/content/pages";

const LINK_CLS = "text-[13px] text-muted hover:text-white transition-colors";

function SectionLink({
  isHome,
  id,
  children,
}: {
  isHome: boolean;
  id: string;
  children: React.ReactNode;
}) {
  if (isHome) {
    return (
      <a href={`#${id}`} className={LINK_CLS}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${id}`} className={LINK_CLS}>
      {children}
    </Link>
  );
}

function EngageLink({
  isHome,
  tab,
  children,
}: {
  isHome: boolean;
  tab: string;
  children: React.ReactNode;
}) {
  if (isHome) {
    return (
      <a
        href={`#engage?tab=${tab}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.hash = `engage?tab=${tab}`;
          document
            .getElementById("engage")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className={LINK_CLS}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href="/#engage" className={LINK_CLS}>
      {children}
    </Link>
  );
}

function publishedLinks(section: PageSection) {
  return getPublishedPages(section).map((p) => (
    <li key={p.slug}>
      <Link href={`/${section}/${p.slug}`} className={LINK_CLS}>
        {p.slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")}
      </Link>
    </li>
  ));
}

export function FooterColumns() {
  const t = useTranslations("Footer");
  const isHome = usePathname() === "/";

  const showcaseLinks = publishedLinks("showcases");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
      {/* Product */}
      <div>
        <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {t("labels.product")}
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          <li>
            <SectionLink isHome={isHome} id="how-we-work">
              SKU 01 · Diagnostic
            </SectionLink>
          </li>
          <li>
            <SectionLink isHome={isHome} id="how-we-work">
              SKU 02 · Build
            </SectionLink>
          </li>
          <li>
            <SectionLink isHome={isHome} id="how-we-work">
              SKU 03 · Retainer
            </SectionLink>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[13px] text-muted">Express Site</span>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
              {" "}
              soon
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[13px] text-muted">AI Consultation</span>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
              {" "}
              soon
            </span>
          </li>
        </ul>
      </div>

      {/* Resources — homepage section shortcuts */}
      <div>
        <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {t("labels.resources")}
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          <li>
            <SectionLink isHome={isHome} id="how-we-work">
              {t("nav.how_we_work")}
            </SectionLink>
          </li>
          <li>
            <SectionLink isHome={isHome} id="methodology">
              {t("nav.methodology")}
            </SectionLink>
          </li>
          <li>
            <SectionLink isHome={isHome} id="selected-work">
              {t("nav.selected_work")}
            </SectionLink>
          </li>
          <li>
            <SectionLink isHome={isHome} id="pricing">
              {t("nav.pricing")}
            </SectionLink>
          </li>
          <li>
            <SectionLink isHome={isHome} id="foundation">
              {t("nav.foundation")}
            </SectionLink>
          </li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {t("labels.connect")}
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          <li>
            <EngageLink isHome={isHome} tab="meet">
              {t("nav.meet_us")}
            </EngageLink>
          </li>
          <li>
            <EngageLink isHome={isHome} tab="diagnostic">
              {t("nav.diagnostic_form")}
            </EngageLink>
          </li>
          <li>
            <EngageLink isHome={isHome} tab="careers">
              {t("nav.careers")}
            </EngageLink>
          </li>
          <li>
            <a href="mailto:consult@prionation.io" className={LINK_CLS}>
              consult@prionation.io
            </a>
          </li>
          <li>
            <a
              href="https://maps.app.goo.gl/Dyu3N2rVPCw8UdGx9"
              className={LINK_CLS}
            >
              {t("nav.location")}
            </a>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
              {" "}
              map
            </span>
          </li>
          <li className="text-line-soft font-pixel text-[8px] tracking-[0.12em] uppercase mt-3">
            {t("nav.response")}
          </li>
        </ul>
      </div>

      {/* AI Product Engineering — category listing pages */}
      <div>
        <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {t("labels.use_cases")}
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          <li>
            <Link
              href="/ai-product-engineering-for-mid-market-companies"
              className={LINK_CLS}
            >
              Overview
            </Link>
          </li>


          <li>
            <Link href="/methodology" className={LINK_CLS}>
              Methodology
            </Link>
          </li>
          <li>
            <Link href="/showcases" className={LINK_CLS}>
              Showcases
            </Link>
          </li>
          <li>
            <Link href="/frameworks" className={LINK_CLS}>
              Frameworks
            </Link>
          </li>
          <li>
            <Link href="/guides" className={LINK_CLS}>
              Guides
            </Link>
          </li>
          <li>
            <Link href="/intelligence" className={LINK_CLS}>
              Intelligence
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[13px] text-muted">Transparency</span>
            <span className="font-pixel text-[8px] tracking-[0.12em] text-line-soft uppercase">
              {" "}
              soon
            </span>
          </li>
        </ul>
      </div>

      {/* Delivered */}
      <div>
        <h4 className="m-[0_0_16px] font-sans font-bold text-[12px] text-white tracking-[0.06em] uppercase flex items-center gap-2.5">
          <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
          {t("labels.delivered")}
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          {showcaseLinks.length > 0 ? (
            showcaseLinks
          ) : (
            <>
              <li>
                <SectionLink isHome={isHome} id="selected-work">
                  Epidom
                </SectionLink>
              </li>
              <li>
                <SectionLink isHome={isHome} id="selected-work">
                  Expeditoo
                </SectionLink>
              </li>
              <li>
                <SectionLink isHome={isHome} id="selected-work">
                  The Lead Agent
                </SectionLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
