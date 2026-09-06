"use client";

import Image from "next/image";

/**
 * The address is base64 here and rendered visually as an image, so neither the
 * HTML source nor a regex over the bundle yields a matchable email. Assembled
 * only on click. This is obfuscation, not security — anything running a real
 * browser can still read it.
 */
const ENCODED = "bG9nYW5raXNlcjA4QGdtYWlsLmNvbQ==";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  );
}

export function EmailLink({ className = "" }: { className?: string }) {
  const open = () => {
    window.location.href = `mailto:${atob(ENCODED)}`;
  };

  return (
    <button
      type="button"
      onClick={open}
      // Spoken form: read correctly by screen readers, not harvestable by a
      // scraper matching on an @ pattern.
      aria-label="Email Logan at logankiser08 at gmail dot com"
      className={`group relative inline-flex h-6 cursor-pointer items-center opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 ${className}`}
    >
      <span className="transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
        <MailIcon />
      </span>
      <Image
        src="/brand/email.png"
        alt=""
        width={400}
        height={36}
        aria-hidden="true"
        unoptimized
        // Eager: it's 10KB and revealed on hover, so lazy risks a blank
        // first reveal if the pointer arrives before it intersects.
        loading="eager"
        className="pointer-events-none absolute left-0 top-1/2 w-[200px] max-w-none -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </button>
  );
}
