import { EmailLink } from "./EmailLink";
import { Socials } from "./Socials";

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

        {/* Instagram first: the email's revealed address is absolutely
            positioned, so it needs clear space to its right. */}
        <div className="mt-8 flex items-center gap-7">
          <Socials />
          <EmailLink />
        </div>
      </div>
    </section>
  );
}
