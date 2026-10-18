type IconProps = {
  className?: string;
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 12h14" />
      <path d="m12.5 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function ChevronRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9.5 5 7 7-7 7" />
    </svg>
  );
}

/** Filled lightning bolt — the AutoMate mark. */
export function Bolt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M13.6 2 5 13.4h5.6L8.9 22l8.8-11.6h-5.6L13.6 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Sparkle wand — "Automate". */
export function Wand({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 20.5 13 11" strokeWidth="2.8" />
      <path d="M18.5 3.2v3.4M16.8 4.9h3.4" strokeWidth="2.1" />
      <path d="M11 3.6v2.2M9.9 4.7h2.2" strokeWidth="1.7" />
      <path d="M20.6 12.2v2.2M19.5 13.3h2.2" strokeWidth="1.7" />
    </svg>
  );
}

/** Small right-pointing caret used between paired fields (From → To). */
export function CaretSeparator({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 12 16"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3l5 5-5 5" />
    </svg>
  );
}

/** Rising bar chart with an arrow — "Grow". */
export function GrowChart({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20.5v-5M10 20.5v-8.5M16 20.5v-3.5" strokeWidth="3.1" />
      <path d="M4.5 9.8 9 5.6l3.4 2.6L19.4 3" strokeWidth="2.2" />
      <path d="M19.6 6.8V3h-3.8" strokeWidth="2.2" />
    </svg>
  );
}
