"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryPiece = {
  id: string;
  url: string;
  caption: string;
  aspect?: number;
};

// Used when a piece has no recorded aspect yet.
const FALLBACK_ASPECT = 0.8;

// Everything Logan makes is charcoal on paper, so this is a default rather
// than a per-piece field. Move it into the manifest if that ever changes.
const MEDIUM = "Charcoal on paper";

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
    <section id="work" className="grain relative bg-paper py-14 text-charcoal lg:py-16">
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-6 px-6 sm:px-10 lg:px-14">
          <div className="flex items-center gap-4">
            <h2 className="tracked text-[0.66rem] font-semibold uppercase">Featured Work</h2>
            <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous artwork"
              className="text-xl transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next artwork"
              className="text-xl transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
            >
              &#8594;
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
          {items.map((piece, i) => (
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
              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {piece.caption && (
                    <h3 className="tracked text-[0.72rem] font-semibold uppercase leading-snug">
                      {piece.caption}
                    </h3>
                  )}
                  <p className="font-secondary mt-1.5 text-[0.7rem] leading-snug opacity-55">
                    {MEDIUM}
                  </p>
                </div>
                <span className="tracked shrink-0 pt-0.5 text-[0.58rem] tabular-nums opacity-35">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
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
