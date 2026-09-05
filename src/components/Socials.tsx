function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14.3 2h2.5c.2 1.6 1.1 3 2.5 3.7.6.3 1.2.5 1.9.5v2.6a7.3 7.3 0 0 1-4.3-1.5v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.7a3.3 3.3 0 1 0 2.4 3.1V2z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "YouTube", Icon: YouTube },
  { label: "TikTok", Icon: TikTok },
];

export function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-6 ${className}`}>
      {SOCIALS.map(({ label, Icon }) => (
        <li key={label}>
          <a
            href="#"
            aria-label={label}
            className="inline-block opacity-75 transition-opacity hover:opacity-100"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
