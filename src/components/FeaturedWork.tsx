import Image from "next/image";

const WORK = [
  { title: "Wildlife", src: "/artwork/fox.jpg", alt: "Charcoal drawing of a fox in profile" },
  { title: "Figures", src: "/artwork/spartan.jpg", alt: "Charcoal drawing of a helmeted Roman soldier" },
  { title: "Studies", src: "/artwork/stingray.jpg", alt: "Charcoal drawing of a manta ray gliding underwater" },
];

export function FeaturedWork() {
  return (
    <section id="work" className="grain relative bg-paper px-6 py-14 text-charcoal sm:px-10 lg:px-14 lg:py-16">
      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <h2 className="tracked text-[0.66rem] font-semibold uppercase">Featured Work</h2>
          <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
        </div>

        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {WORK.map((piece) => (
            <li key={piece.title}>
              <a href="#work" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite/20">
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="tracked mt-4 text-[0.66rem] font-semibold uppercase">
                  {piece.title}
                </h3>
                <span className="font-secondary mt-1.5 inline-flex items-center gap-2 text-[0.8rem] opacity-70">
                  See More
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    &#8594;
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-end">
          <a href="#work" className="group inline-flex items-center gap-3">
            <span className="tracked text-[0.62rem] font-semibold uppercase">All Work</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &#8594;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
