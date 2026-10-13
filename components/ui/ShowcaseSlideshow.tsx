import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SHOWCASE_IMAGES } from "@/lib/content/pages";

/**
 * A showcase's case-study image(s), filling its `relative`, sized parent.
 *
 * One image renders as a plain cover image. Several (Epidom: website, phone
 * ordering, POS, customer display) slide forward one by one forever, so the
 * product reads as one app with several surfaces. Pure CSS for any number of
 * images (globals.css → .showcase-step / .showcase-slide): no JS, pauses on
 * hover, and holds on the first image under prefers-reduced-motion. Works in
 * server and client components.
 *
 * `alt` describes the first image; later images take theirs from
 * messages/*.json → ShowcaseImages.<slug>.
 */
export function ShowcaseSlideshow({
  slug,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  slug: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const t = useTranslations("ShowcaseImages");
  const images = SHOWCASE_IMAGES[slug];

  if (images.length === 1) {
    return <Image src={images[0]} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover object-top ${className}`} />;
  }

  // Frames = every image + a clone of the first, so the loop always slides
  // forward and restarts seamlessly. The clone is hidden from assistive tech.
  const alts = [alt, ...(t.raw(slug) as string[])];
  const frames = [...images.map((src, i) => ({ src, alt: alts[i] })), { src: images[0], alt: "" }];
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="showcase-step h-full" style={{ "--frames": images.length } as CSSProperties}>
        <div className="showcase-slide flex h-full">
          {frames.map((f, i) => (
            <div key={i} className="relative h-full w-full shrink-0" aria-hidden={i === images.length || undefined}>
              <Image src={f.src} alt={f.alt} fill sizes={sizes} priority={priority && i === 0} className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
