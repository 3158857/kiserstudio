import { ArtPlaceholder } from "./ArtPlaceholder";

const WORK = [
  { title: "Wildlife", medium: "Charcoal on paper" },
  { title: "Figures", medium: "Charcoal on paper" },
  { title: "Studies", medium: "Charcoal on paper" },
];

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="grain wash relative border-t border-rule bg-bg-panel px-6 py-16 sm:px-10 lg:px-14 lg:py-20"
    >
      {/* Vertical spine, echoing the concept's left edge */}
      <span
        className="tracked absolute left-4 top-24 hidden text-[0.6rem] uppercase text-ink-faint lg:block"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        aria-hidden="true"
      >
        Kiser Studio
      </span>

      <div className="relative z-10 lg:pl-10">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
            <h2 className="tracked text-[0.66rem] uppercase text-ink-muted">
              Featured Work
            </h2>
          </div>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 text-ink-muted transition-colors hover:text-ink"
          >
            <span className="tracked text-[0.62rem] uppercase">All Work</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &#8594;
            </span>
          </a>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-14">
          <ul className="grid gap-8 sm:grid-cols-3">
            {WORK.map((piece) => (
              <li key={piece.title}>
                <a href="#work" className="group block">
                  <ArtPlaceholder
                    label={`${piece.title} artwork`}
                    className="transition-opacity group-hover:opacity-90"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="tracked text-[0.66rem] uppercase">
                        {piece.title}
                      </h3>
                      <p className="mt-1.5 text-[0.8rem] text-ink-muted">
                        {piece.medium}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-ink"
                    >
                      &#8594;
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <figure className="lg:pt-2">
            <blockquote className="font-serif text-[1.9rem] leading-[1.28] lg:text-[2.1rem]">
              “A different perspective drives everything.”
            </blockquote>
            <span className="mt-6 block h-[3px] w-12 bg-accent" aria-hidden="true" />
            <figcaption className="tracked mt-4 text-[0.62rem] uppercase text-ink-muted">
              — Logan
            </figcaption>
          </figure>
        </div>

        <p className="tracked mt-16 text-right text-[0.58rem] uppercase text-ink-faint">
          kiserstudio.com
        </p>
      </div>
    </section>
  );
}
