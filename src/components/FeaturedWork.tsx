"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryPiece = {
  id: string;
  url: string;
  caption: string;
  medium?: string;
  dimensions?: string;
  aspect?: number;
};

// Used when a piece has no recorded aspect yet.
const FALLBACK_ASPECT = 0.8;

// Fallback for pieces with no medium recorded; per-piece values from the
// manifest take precedence.
const DEFAULT_MEDIUM = "Charcoal on paper";

// Filled charcoal discs: on the white panel an outline-only control at this
// size was almost invisible, which is what prompted the change.
const ARROW_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white transition-colors " +
  "hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-charcoal disabled:cursor-not-allowed disabled:bg-charcoal/15 " +
  "disabled:text-charcoal/40 disabled:hover:bg-charcoal/15";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export function FeaturedWork({ items }: { items: GalleryPiece[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // scroll-pl-* keeps snapping from eating the left padding, so the
    // resting position at the start is a true 0.
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    // Cards vary in width now, so step by a fraction of the viewport rather
    // than by one card.
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="work" className="grain relative bg-white py-14 text-charcoal lg:py-16">
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-6 px-6 sm:px-10 lg:px-14">
          <div className="flex items-center gap-4">
            <h2 className="tracked text-[0.66rem] font-semibold uppercase">Featured Work</h2>
            <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous artwork"
              className={ARROW_CLASS}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next artwork"
              className={ARROW_CLASS}
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          onScroll={sync}
          tabIndex={0}
          aria-label="Artwork gallery"
          className="mt-8 flex snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth pb-2 pl-6 scroll-pl-6 sm:pl-10 sm:scroll-pl-10 lg:pl-14 lg:scroll-pl-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((piece) => (
            <li key={piece.id} className="shrink-0 snap-start">
              {/* Fixed height, width derived from the artwork's own aspect —
                  so portraits and landscapes both show uncropped. */}
              <div
                className="relative h-56 overflow-hidden bg-graphite/20 sm:h-64 lg:h-[20rem]"
                style={{ aspectRatio: piece.aspect ?? FALLBACK_ASPECT }}
              >
                <Image
                  src={piece.url}
                  alt={piece.caption || "Charcoal drawing by Logan Kiser"}
                  fill
                  sizes="(max-width: 640px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                {/* Red as punctuation, not type. It clears AA on white
                    (4.92:1) but stays a rule here for consistency with the
                    charcoal panels, where it doesn't. */}
                <span className="block h-[2px] w-3 bg-accent" aria-hidden="true" />

                {piece.caption && (
                  <h3 className="tracked mt-2.5 text-[0.72rem] font-semibold uppercase leading-snug">
                    {piece.caption}
                  </h3>
                )}

                <p className="font-secondary mt-1.5 text-[0.7rem] leading-snug text-graphite">
                  {piece.medium || DEFAULT_MEDIUM}
                </p>
                {piece.dimensions && (
                  <p className="font-secondary mt-0.5 text-[0.66rem] leading-snug text-graphite/80">
                    {piece.dimensions}
                  </p>
                )}
              </div>
            </li>
          ))}
          {/* Right-edge gutter: gap-6 (24px) already trails the last card, so
              this makes up the remainder to match the left padding. */}
          <li aria-hidden="true" className="w-0 shrink-0 sm:w-4 lg:w-8" />
        </ul>
      </div>
    </section>
  );
}
