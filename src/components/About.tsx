export function About() {
  return (
    <section id="about" className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* Placeholder: awaiting the charcoal-tools photograph from the board */}
      <div className="grain relative flex min-h-[260px] items-end bg-graphite/25 p-8 sm:p-12">
        <p className="tracked relative z-10 text-[0.62rem] uppercase leading-[2.2] opacity-60">
          Traditional
          <br />
          tools.
          <br />
          Limitless
          <br />
          possibilities.
        </p>
      </div>

      <div className="bg-charcoal px-8 py-14 sm:px-12 lg:px-16 lg:py-20">
        <div className="flex items-center gap-4">
          <span className="tracked text-[0.62rem] uppercase opacity-70">About</span>
          <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
        </div>

        <h2 className="mt-6 max-w-md text-[1.75rem] font-extrabold uppercase leading-[1.1] sm:text-4xl">
          A different perspective drives everything.
        </h2>

        <p className="font-secondary mt-6 max-w-lg text-[0.95rem] leading-relaxed opacity-75">
          Kiser Studio is the home of artist Logan Kiser, where detailed realism
          meets curiosity, discipline, and a constant drive to see things
          differently.
        </p>

        <a
          href="#process"
          className="group mt-9 inline-flex items-center gap-4 border border-rule-dark px-7 py-3.5 transition-colors hover:border-chalk"
        >
          <span className="tracked text-[0.62rem] uppercase">Learn More</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &#8594;
          </span>
        </a>
      </div>
    </section>
  );
}
