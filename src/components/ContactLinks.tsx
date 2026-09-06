"use client";

import Image from "next/image";

/**
 * The email address is base64 here and shown only as an image, so neither the
 * HTML nor a regex over the bundle yields a matchable address; the mailto is
 * assembled on click. Obfuscation, not security — a real browser can still
 * read it. The Instagram URL is in the href as normal; its handle is an image
 * purely to match the email row.
 */
const ENCODED_EMAIL = "bG9nYW5raXNlcjA4QGdtYWlsLmNvbQ==";
const INSTAGRAM_HANDLE = "logankiser6";

const ICON = "h-5 w-5 shrink-0";
const LABEL = "h-[18px] w-auto max-w-none";
const ROW =
  "inline-flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContactLinks({ className = "" }: { className?: string }) {
  const openMail = () => {
    window.location.href = `mailto:${atob(ENCODED_EMAIL)}`;
  };

  return (
    <ul className={`flex flex-col items-start gap-3 ${className}`}>
      <li>
        <button
          type="button"
          onClick={openMail}
          // Spoken form: read correctly aloud, not matchable as an address.
          aria-label="Email Logan at logankiser08 at gmail dot com"
          className={`${ROW} cursor-pointer`}
        >
          <MailIcon />
          <Image
            src="/brand/email.png"
            alt=""
            width={400}
            height={36}
            aria-hidden="true"
            unoptimized
            loading="eager"
            className={LABEL}
          />
        </button>
      </li>

      <li>
        <a
          href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram — @${INSTAGRAM_HANDLE}`}
          className={ROW}
        >
          <InstagramIcon />
          <Image
            src="/brand/instagram-handle.png"
            alt=""
            width={216}
            height={36}
            aria-hidden="true"
            unoptimized
            loading="eager"
            className={LABEL}
          />
        </a>
      </li>
    </ul>
  );
}
