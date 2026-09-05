import { SOCIALS } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-rule-dark px-6 py-8 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
      <p className="tracked text-[0.62rem] uppercase">Kiser Studio</p>

      <p className="tracked hidden text-[0.58rem] uppercase opacity-60 md:block">
        Art builds a brighter perspective.
      </p>

      <div className="flex items-center gap-5">
        {SOCIALS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
}
