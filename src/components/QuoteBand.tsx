import Image from "next/image";

export function QuoteBand() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="grain relative flex items-center bg-chalk px-8 py-16 text-charcoal sm:px-12 lg:px-16 lg:py-24">
        <div className="relative z-10">
          <blockquote className="text-[1.7rem] font-extrabold uppercase leading-[1.12] sm:text-4xl">
            <span className="text-accent" aria-hidden="true">
              &ldquo;
            </span>
            Same subject.
            <br />
            Different
            <br />
            perspective.
            <span className="text-accent" aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>
          <figcaption className="tracked mt-7 flex items-center gap-4 text-[0.62rem] uppercase opacity-70">
            <span className="h-px w-6 bg-charcoal" aria-hidden="true" />
            Logan
          </figcaption>
        </div>
      </div>

      {/* Tight crop on the fox's eye, echoing the board's detail panel */}
      <div className="relative min-h-[280px] overflow-hidden bg-charcoal lg:min-h-0">
        <Image
          src="/artwork/fox.jpg"
          alt="Detail of a charcoal drawing, focused on the eye"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="scale-[2.1] object-cover"
          style={{ objectPosition: "62% 34%" }}
        />
      </div>
    </section>
  );
}
