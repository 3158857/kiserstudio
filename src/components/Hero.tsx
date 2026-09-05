import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate min-h-[58vh] overflow-hidden lg:min-h-[64vh]">
      {/* Artwork bleeds off the right edge, fading into the charcoal ground */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
        <Image
          src="/artwork/cat.jpg"
          alt="Charcoal drawing of a cat looking upward"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 64vw"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
        {/* Vertical scrim on narrow screens so the artwork isn't dimmed from
            the left; horizontal on desktop where the copy sits beside it. */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/55 to-charcoal/5 lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/55 lg:to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-[2.1rem] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]">
            Same subject.
            <br />
            Different
            <br />
            perspective.
          </h1>

          <span className="mt-6 block h-[3px] w-16 bg-accent" aria-hidden="true" />

          <span
            className="signature mt-7 block w-44 text-chalk sm:w-56"
            role="img"
            aria-label="Logan Kiser's signature"
          />
        </div>
      </div>
    </section>
  );
}
