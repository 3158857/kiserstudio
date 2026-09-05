"use client";

import Image from "next/image";
import { useState } from "react";

const SLIDES = [
  { src: "/artwork/cat.jpg", alt: "Charcoal drawing of a cat looking upward", position: "50% 35%" },
  { src: "/artwork/fox.jpg", alt: "Charcoal drawing of a fox in profile", position: "55% 40%" },
  { src: "/artwork/spartan.jpg", alt: "Charcoal drawing of a helmeted Roman soldier", position: "50% 35%" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const move = (d: number) => setIndex((i) => (i + d + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden lg:min-h-[86vh]">
      {/* Artwork bleeds off the right edge, fading into the charcoal ground */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 64vw"
          className="object-cover"
          style={{ objectPosition: slide.position }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/25 lg:via-charcoal/55 lg:to-transparent"
          aria-hidden="true"
        />
        {/* Keeps the right rail legible where it crosses the artwork */}
        <div
          className="absolute inset-y-0 right-0 w-[26%] bg-gradient-to-l from-charcoal/85 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 grid items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-14 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-[2.6rem] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl lg:text-[4.4rem]">
            Art builds a<br />
            brighter
            <br />
            perspective.
          </h1>

          <span className="mt-7 block h-[4px] w-20 bg-accent" aria-hidden="true" />

          <p className="font-secondary mt-7 text-base leading-relaxed opacity-75 sm:text-lg">
            Realistic artwork.
            <br />
            Expansive possibilities.
          </p>

          <a
            href="#work"
            className="group mt-10 inline-flex items-center gap-4 border border-rule-dark px-8 py-4 transition-colors hover:border-chalk"
          >
            <span className="tracked text-[0.66rem] uppercase">View Work</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &#8594;
            </span>
          </a>
        </div>

        {/* Right rail */}
        <div className="flex items-end justify-between gap-8 lg:flex-col lg:items-end lg:gap-14">
          <p className="tracked text-[0.62rem] uppercase leading-[2.4] opacity-70 lg:text-right">
            Draw
            <br />
            Explore
            <br />
            Create
            <br />
            What&apos;s next.
          </p>
          <div className="flex items-center gap-5 lg:flex-col lg:items-end lg:gap-6">
            <span className="tracked whitespace-nowrap text-[0.62rem] opacity-55">
              0{index + 1} / 0{SLIDES.length}
            </span>
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous artwork"
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                &#8592;
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next artwork"
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
