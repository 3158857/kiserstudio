const NAV = ["Work", "About", "Process", "Commissions", "Contact"];

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M14.3 2h2.5c.2 1.6 1.1 3 2.5 3.7.6.3 1.2.5 1.9.5v2.6a7.3 7.3 0 0 1-4.3-1.5v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.7a3.3 3.3 0 1 0 2.4 3.1V2z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "YouTube", Icon: YouTube },
  { label: "TikTok", Icon: TikTok },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-6 px-6 py-7 sm:px-10 lg:px-14">
      <a href="#" className="shrink-0 leading-none">
        <span className="block font-display text-2xl tracking-[0.16em] sm:text-[1.7rem]">
          KISER
        </span>
        <span className="tracked-wide mt-1 block text-[0.6rem] text-ink-muted sm:text-[0.65rem]">
          STUDIO
        </span>
      </a>

      <nav className="hidden lg:block">
        <ul className="flex items-center gap-9">
          {NAV.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="tracked text-[0.66rem] uppercase text-ink-muted transition-colors hover:text-ink"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-5">
        {/* Small-screen menu. <details> keeps this JS-free. */}
        <details className="group relative lg:hidden">
          <summary
            className="tracked flex cursor-pointer list-none items-center gap-2 text-[0.62rem] uppercase text-ink-muted marker:hidden hover:text-ink"
            aria-label="Toggle navigation menu"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </summary>
          <ul className="absolute right-0 z-30 mt-4 w-48 border border-rule bg-bg-panel/95 p-5 backdrop-blur">
            {NAV.map((item) => (
              <li key={item} className="py-2">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="tracked text-[0.66rem] uppercase text-ink-muted hover:text-ink"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <span className="hidden h-px w-12 bg-rule lg:block" aria-hidden="true" />
        {SOCIALS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="text-ink-muted transition-colors hover:text-ink"
          >
            <Icon />
          </a>
        ))}
      </div>
    </header>
  );
}
