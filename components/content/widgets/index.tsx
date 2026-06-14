import { getWidgetText, type WidgetSlug } from "@/lib/content/widgets";
import { BuildVsBuyCalculator } from "./BuildVsBuyCalculator";
import { PodVsHireCalculator } from "./PodVsHireCalculator";
import { BuildReadinessChecklist } from "./BuildReadinessChecklist";

const WIDGET_SLUGS = new Set<string>([
  "ai-build-vs-buy-calculator",
  "pod-vs-hire-cost-model",
  "8-week-build-readiness-checklist",
]);

export function hasWidget(slug: string): boolean {
  return WIDGET_SLUGS.has(slug);
}

// Server component: picks the interactive widget for a framework slug and feeds
// it only the active locale's strings (logic config is imported by the widgets).
export function FrameworkWidget({
  slug,
  locale,
}: {
  slug: WidgetSlug | string;
  locale: string;
}) {
  const text = getWidgetText(locale);
  switch (slug) {
    case "ai-build-vs-buy-calculator":
      return <BuildVsBuyCalculator t={text.buildVsBuy} />;
    case "pod-vs-hire-cost-model":
      return <PodVsHireCalculator t={text.podVsHire} locale={locale} />;
    case "8-week-build-readiness-checklist":
      return <BuildReadinessChecklist t={text.readiness} />;
    default:
      return null;
  }
}
