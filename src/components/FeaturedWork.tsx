"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Piece = { title: string; src?: string; alt?: string };

// Three real pieces so far. The rest are placeholders standing in for future
// uploads — swap each `src`/`alt` in as Logan's scans arrive.
const WORK: Piece[] = [
  { title: "Wildlife", src: "/artwork/fox.jpg", alt: "Charcoal drawing of a fox in profile" },
  { title: "Figures", src: "/artwork/spartan.jpg", alt: "Charcoal drawing of a helmeted Roman soldier" },
  { title: "Studies", src: "/artwork/stingray.jpg", alt: "Charcoal drawing of a manta ray gliding underwater" },
  ...Array.from({ length: 7 }, (_, i) => ({ title: `Artwork ${String(i + 4).padStart(2, "0")}` })),
];

export function FeaturedWork() {
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
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
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
          {WORK.map((piece) => (
            <li
              key={piece.title}
              className="w-[54%] shrink-0 snap-start sm:w-[37%] lg:w-[25%]"
            >
              {piece.src ? (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden bg-graphite/20">
                    <Image
                      src={piece.src}
                      alt={piece.alt ?? piece.title}
                      fill
                      sizes="(max-width: 640px) 54vw, (max-width: 1024px) 37vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="tracked mt-3 text-[0.62rem] font-semibold uppercase">
                    {piece.title}
                  </h3>
                </>
              ) : (
                <>
                  <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-charcoal/25 bg-charcoal/[0.04]">
                    <span className="tracked text-[0.55rem] uppercase text-charcoal/35">
                      {piece.title}
                    </span>
                  </div>
                  {/* Keeps the caption rhythm while the title is still unknown */}
                  <div
                    className="mt-3 h-[0.62rem] w-20 rounded-[1px] bg-charcoal/10"
                    aria-hidden="true"
                  />
                </>
              )}
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
