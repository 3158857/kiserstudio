import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[68vh] flex-col justify-between overflow-hidden px-6 py-12 sm:px-10 lg:min-h-[64vh] lg:justify-start lg:px-14 lg:py-16">
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

        {/* Both scrims live inside the image box, so on desktop the gradient
            starts fully opaque at the artwork's own left edge and hides the
            seam. Anchored to the section instead, it lightens before it gets
            there and the edge shows as a hard line. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.10) 34%, rgba(17,17,17,0.10) 58%, rgba(17,17,17,0.90) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-charcoal via-charcoal/55 to-transparent lg:block"
        />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-[7vw] font-extrabold uppercase leading-[0.98] tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]">
          Same subject.
          <br />
          Different
          <br />
          perspective.
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
