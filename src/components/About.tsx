export function About() {
  return (
    <section id="about" className="grain relative bg-charcoal px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <span className="tracked text-[0.62rem] uppercase opacity-80">About</span>
          <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
        </div>

        <h2 className="mt-6 max-w-2xl text-[1.75rem] font-extrabold uppercase leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
          A different perspective drives everything.
        </h2>

        <p className="font-secondary mt-6 max-w-xl text-[0.95rem] leading-relaxed opacity-85">
          Kiser Studio is the home of artist Logan Kiser, where detailed realism
          meets curiosity, discipline, and a constant drive to see things
          differently.
        </p>

        <a
          href="mailto:logankiser08@gmail.com"
          className="font-secondary mt-8 inline-block border-b border-chalk/30 pb-1 text-[0.95rem] transition-colors hover:border-accent"
        >
          logankiser08@gmail.com
        </a>
      </div>
    </section>
  );
}
