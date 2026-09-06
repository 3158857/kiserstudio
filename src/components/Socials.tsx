const INSTAGRAM_HANDLE = "logankiser6";

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-6 ${className}`}>
      <li>
        <a
          href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram — @${INSTAGRAM_HANDLE}`}
          className="inline-block opacity-75 transition-opacity hover:opacity-100"
        >
          <Instagram />
        </a>
      </li>
    </ul>
  );
}
