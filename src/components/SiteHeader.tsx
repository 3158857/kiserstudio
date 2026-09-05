import Image from "next/image";

const NAV = ["Work", "About"];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`shrink-0 leading-none ${className}`} aria-label="Kiser Studio — home">
      <Image
        src="/artwork/logo.png"
        alt="Kiser Studio"
        width={900}
        height={254}
        priority
        className="h-9 w-auto sm:h-11"
      />
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-6 bg-chalk px-6 py-5 text-charcoal sm:px-10 lg:px-14">
      {/* Torn lower edge, continuing the bar's chalk past the header box */}
      <span
        aria-hidden="true"
        className="torn-edge pointer-events-none absolute inset-x-0 top-full -mt-px h-16 bg-chalk"
      />

      <Wordmark />

      <div className="flex items-center gap-8">
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="tracked text-[0.68rem] font-semibold uppercase opacity-85 transition-opacity hover:opacity-100"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

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
          <ul className="absolute right-0 z-40 mt-4 w-48 border border-rule-light bg-chalk p-5 shadow-lg">
            {NAV.map((item) => (
              <li key={item} className="py-2">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="tracked text-[0.68rem] font-semibold uppercase opacity-85 hover:opacity-100"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </header>
  );
}
