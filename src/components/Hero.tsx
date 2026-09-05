"use client";

import { useState } from "react";
import { ArtPlaceholder } from "./ArtPlaceholder";
import { BrushStroke } from "./BrushStroke";

const SLIDES = [
  { caption: "Hero artwork 01" },
  { caption: "Hero artwork 02" },
  { caption: "Hero artwork 03" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const move = (delta: number) =>
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative grid items-center gap-12 px-6 pb-20 pt-8 sm:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.12fr)_auto] lg:gap-10 lg:px-14 lg:pb-28">
      {/* Copy */}
      <div className="relative z-10 max-w-xl">
        <p className="tracked text-[0.68rem] uppercase leading-[2.1] text-ink-muted">
          Same subject.
          <br />
          Different
          <br />
          Perspective.
        </p>

        <span className="mt-6 block h-[3px] w-16 bg-accent" aria-hidden="true" />

        <h1 className="mt-5">
          <span className="textured-type block font-display text-[19vw] leading-[0.82] tracking-[0.02em] sm:text-[13vw] lg:text-[8.6rem]">
            KISER
          </span>
          <span className="tracked-wide mt-3 block text-[1.05rem] sm:text-[1.5rem] lg:text-[1.9rem]">
            STUDIO
          </span>
        </h1>

        <p className="relative mt-2 font-script text-5xl leading-none text-ink sm:text-6xl">
          Logan
          <span
            className="absolute -bottom-1 left-2 h-px w-40 bg-ink/70 sm:w-56"
            aria-hidden="true"
          />
        </p>

        <p className="tracked mt-10 text-[0.66rem] uppercase text-ink-muted">
          Art builds a brighter perspective.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-8">
          <a
            href="#work"
            className="group inline-flex items-center gap-4 border border-rule px-7 py-4 transition-colors hover:border-ink"
          >
            <span className="tracked text-[0.66rem] uppercase">View Work</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &#8594;
            </span>
          </a>
          <a
            href="#about"
            className="tracked border-b border-rule pb-1 text-[0.66rem] uppercase text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Artwork */}
      <div className="relative">
        <BrushStroke className="pointer-events-none absolute -top-[10%] left-[-26%] z-0 h-[124%] w-[74%] opacity-95" />
        <ArtPlaceholder
          label={SLIDES[index].caption}
          ratio="aspect-[4/5] sm:aspect-[5/5]"
          className="relative z-10"
        />
      </div>

      {/* Right rail */}
      <div className="flex items-center gap-6 lg:flex-col lg:items-end lg:gap-10">
        <span className="hidden h-28 w-px bg-rule lg:block" aria-hidden="true" />
        <p className="tracked text-[0.62rem] uppercase leading-[2.2] text-ink-muted lg:text-right">
          Draw.
          <br className="hidden lg:block" /> Explore.
          <br className="hidden lg:block" /> Create.
          <br className="hidden lg:block" /> What&apos;s next.
        </p>
        <div className="flex items-center gap-6 lg:flex-col lg:items-end">
          <span className="tracked whitespace-nowrap text-[0.62rem] text-ink-faint">
            0{index + 1} / 0{SLIDES.length}
          </span>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous artwork"
              className="text-ink-muted transition-colors hover:text-ink"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next artwork"
              className="text-ink-muted transition-colors hover:text-ink"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
