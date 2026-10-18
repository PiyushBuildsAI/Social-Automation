type IconProps = {
  className?: string;
};

/** The AutoMate mark: a violet four-point bloom holding a yellow bolt. */
export function AutoMateLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <path
        d="M24 3.5c3.1 9.6 8.4 15.4 20.5 20.5C32.4 29.1 27.1 34.9 24 44.5 20.9 34.9 15.6 29.1 3.5 24 15.6 18.9 20.9 13.1 24 3.5Z"
        fill="#ffffff"
        stroke="#8b5cf6"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M27.4 11.5 14.6 25.9h6.8l-2.2 10.6 13.6-15.2h-6.6l1.2-9.8Z"
        fill="#fbbf24"
        stroke="#2b2340"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn crown used as a doodle accent. */
export function Crown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 30" fill="none" aria-hidden className={className}>
      <path
        d="M3 25 6 7l8 9 6-13 6 13 8-9 3 18Z"
        fill="#fbbf24"
        stroke="#2b2340"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Simplified Instagram camera glyph on a gradient tile. */
export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <defs>
        <linearGradient id="am-ig-glyph" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.32" stopColor="#fa7e1e" />
          <stop offset="0.62" stopColor="#d62976" />
          <stop offset="1" stopColor="#962fbf" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#am-ig-glyph)" />
      <rect
        x="12"
        y="12"
        width="24"
        height="24"
        rx="8"
        stroke="#ffffff"
        strokeWidth="2.8"
        fill="none"
      />
      <circle cx="24" cy="24" r="5.6" stroke="#ffffff" strokeWidth="2.8" fill="none" />
      <circle cx="31" cy="17" r="1.9" fill="#ffffff" />
    </svg>
  );
}

/** Messenger glyph — the lightning bolt inside a gradient circle. */
export function MessengerGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <defs>
        <linearGradient id="am-msg-glyph" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00c6ff" />
          <stop offset="0.5" stopColor="#0078ff" />
          <stop offset="1" stopColor="#a033ff" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill="url(#am-msg-glyph)" />
      <path
        d="M14 26c0-.6.4-1 .9-1.2l5.5-3 5.6 2.4 4.6-2.6c.6-.3 1.4.2 1.4.9v5c0 .6-.4 1-.9 1.2l-5.5 3L20 29l-4.6 2.6c-.6.3-1.4-.2-1.4-.9v-4.8Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** Facebook glyph. */
export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <circle cx="24" cy="24" r="24" fill="#1877f2" />
      <path
        d="M27 40V26h5l.8-5.6H27v-3.6c0-1.6.5-2.7 2.8-2.7h3V9.1c-.5-.1-2.2-.2-4.2-.2-4.2 0-7 2.5-7 7.2v4.3h-5V26h5v14h5.4Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** Google "G" for the OAuth button. */
export function GoogleGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285f4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.02.15 3.5 2.7.24.02c2.2-2 3.5-5 3.5-8.6Z"
      />
      <path
        fill="#34a853"
        d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.7-2.9c-1 .7-2.3 1.2-4.1 1.2a7.2 7.2 0 0 1-6.8-5l-.14.01-3.6 2.8-.05.13A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#fbbc05"
        d="M5.2 14.4a7.4 7.4 0 0 1 0-4.7l-.01-.16-3.6-2.8-.12.06a12 12 0 0 0 0 10.5l3.73-2.9Z"
      />
      <path
        fill="#ea4335"
        d="M12 4.7c2.3 0 3.8 1 4.7 1.8l3.4-3.3A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.5 6.8l3.7 2.9A7.2 7.2 0 0 1 12 4.7Z"
      />
    </svg>
  );
}

/** Apple glyph for the OAuth button. */
export function AppleGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M17.05 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5.02-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.2 1.1-.04 1.6-.7 3-.7s1.8.7 3 .7c1.2-.02 2-1.1 2.8-2.2.9-1.3 1.2-2.6 1.2-2.7 0-.03-2.3-.9-2.3-3.4ZM14.9 5.2c.6-.8 1.1-1.9 1-3-1 .04-2.1.65-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.08 2.2-.55 2.8-1.3Z"
      />
    </svg>
  );
}
