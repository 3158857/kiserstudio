const EMAIL = "logankiser08@gmail.com";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  );
}

/**
 * Shows an envelope that swaps to the address on hover or keyboard focus.
 * The address is absolutely positioned so revealing it doesn't reflow the
 * surrounding copy, and the link works on touch regardless of hover.
 */
export function EmailLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={`mailto:${EMAIL}`}
      aria-label={`Email ${EMAIL}`}
      className={`group relative inline-flex h-6 items-center opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 ${className}`}
    >
      <span className="transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
        <MailIcon />
      </span>
      <span
        aria-hidden="true"
        className="font-secondary pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap border-b border-chalk/30 pb-0.5 text-[0.95rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {EMAIL}
      </span>
    </a>
  );
}
