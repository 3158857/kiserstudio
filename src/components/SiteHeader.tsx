const NAV = ["Work", "About", "Process", "Contact"];

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
export const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "YouTube", Icon: YouTube },
  { label: "TikTok", Icon: TikTok },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`shrink-0 leading-none ${className}`}>
      <span className="block text-xl font-extrabold tracking-[0.14em] sm:text-2xl">
        KISER
      </span>
      <span className="tracked-wide mt-1 block text-[0.58rem] opacity-70 sm:text-[0.62rem]">
        STUDIO
      </span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-30 flex items-center justify-between gap-6 px-6 py-7 sm:px-10 lg:px-14">
      <Wordmark />

      <nav className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {NAV.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="tracked text-[0.66rem] uppercase opacity-70 transition-opacity hover:opacity-100"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-5">
        <span className="hidden h-[2px] w-10 bg-accent lg:block" aria-hidden="true" />

        <details className="relative lg:hidden">
          <summary
            className="flex cursor-pointer list-none items-center marker:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </summary>
          <ul className="absolute right-0 z-40 mt-4 w-48 border border-rule-dark bg-charcoal/95 p-5 backdrop-blur">
            {NAV.map((item) => (
              <li key={item} className="py-2">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="tracked text-[0.66rem] uppercase opacity-70 hover:opacity-100"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="hidden items-center gap-5 sm:flex">
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
      </div>
    </header>
  );
}
