import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-hero-ground relative isolate flex min-h-[68vh] flex-col justify-between overflow-hidden px-6 py-12 sm:px-10 lg:min-h-[64vh] lg:justify-start lg:px-14 lg:py-16">
      {/* Artwork bleeds off the right edge. The ground behind it is sampled
          from the artwork's own backdrop rather than the page charcoal, so
          there's no black slab beside the photo to fade into. */}
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

        {/* Both scrims live inside the image box, so on desktop the gradient
            starts fully opaque at the artwork's own left edge and hides the
            seam. Anchored to the section instead, it lightens before it gets
            there and the edge shows as a hard line.

            Tinted to --hero-ground, not black: the artwork's backdrop is a
            warm near-black, and a neutral scrim over it read as shading. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(45,39,25,0.78) 0%, rgba(45,39,25,0.18) 30%, rgba(45,39,25,0) 52%, rgba(45,39,25,0.50) 100%)",
          }}
        />
        {/* Only wide enough to dissolve the seam. The artwork's left edge is
            lighter across its upper third than lower down, so the ramp has to
            carry past the first 10% to avoid a visible step. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(45,39,25,1) 0%, rgba(45,39,25,0.55) 10%, rgba(45,39,25,0.15) 22%, rgba(45,39,25,0) 38%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-[7vw] font-extrabold uppercase leading-[0.98] tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]">
          Same subject
          <br />
          with different
          <br />
          perspectives.
        </h1>
      </div>

      {/* Sits at the foot of the hero on mobile; tucks under the headline on
          desktop, where the copy is a single block beside the artwork. */}
      <div className="relative z-10 max-w-2xl lg:mt-7">
        <span className="block h-[3px] w-16 bg-accent" aria-hidden="true" />
        <span
          className="signature mt-6 block w-36 text-chalk sm:w-56"
          role="img"
          aria-label="Logan Kiser's signature"
        />
      </div>
    </section>
  );
}
