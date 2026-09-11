import Image from "next/image";

import { ContactLinks } from "./ContactLinks";

export function About() {
  return (
    <section id="about" className="grain relative isolate bg-charcoal">
      {/* Photo bleeds off the right like the hero's artwork. Logan sits at the
          right of the frame, so fading from the left keeps his face clear of
          the scrim; fading the other way buried him. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        <div className="relative order-first aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] lg:order-last lg:aspect-auto lg:min-h-[40rem]">
          {/* The photo is taller than every crop it lands in, so object-cover
              keeps the full width and trims top and bottom. 42% centres the
              band holding his hand, the charcoal and his face. */}
          <Image
            src="/brand/bio.jpg"
            alt="Logan Kiser shading a large charcoal drawing of an armored soldier"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
            style={{ objectPosition: "50% 42%" }}
          />

          {/* Scrims live inside the image box for the same reason as the
              hero's: anchored to the section they lighten before reaching the
              photograph's edge and the seam shows as a hard line. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/15 to-charcoal/45 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(17,17,17,1) 0%, rgba(17,17,17,0.55) 22%, rgba(17,17,17,0.12) 52%, rgba(17,17,17,0) 78%)",
            }}
          />
        </div>

        <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
          <div className="flex items-center gap-4">
            <span className="tracked text-[0.62rem] uppercase opacity-80">About</span>
            <span className="h-[3px] w-10 bg-accent" aria-hidden="true" />
          </div>

          <h2 className="mt-6 max-w-2xl text-[1.75rem] font-extrabold uppercase leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
            A different perspective drives everything.
          </h2>

          <div className="font-secondary mt-6 max-w-xl space-y-4 text-[0.95rem] leading-relaxed opacity-85">
            <p>
              I’m Logan Kiser, an artist who has been creating art for over 10
              years. I primarily work in black-and-white charcoal, focusing on
              detailed studies of animals and nature as well as bold graphic
              compositions.
            </p>
            <p>
              I’m drawn to charcoal because of its strong contrast, texture, and
              ability to create both realistic detail and dramatic impact. I enjoy
              challenging myself with each piece and finding new ways to capture
              character, movement, and emotion. My goal is to create artwork that
              makes an immediate impression while also giving viewers something to
              discover when they look closer.
            </p>
          </div>

          <ContactLinks className="mt-8" />
        </div>
      </div>
    </section>
  );
}
