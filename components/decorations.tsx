type ClassName = { className?: string };

/**
 * The three/four slanted pen strokes that pepper the reference design
 * (`///` flourishes drawn in yellow and violet).
 */
export function SlashMarks({ className, strokes = 3 }: ClassName & { strokes?: number }) {
  const width = (strokes - 1) * 9 + 8;

  return (
    <svg
      viewBox={`0 0 ${width} 22`}
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        {Array.from({ length: strokes }, (_, i) => (
          <path key={i} d={`M${2 + i * 9} 18.5 L${7.4 + i * 9} 3.5`} />
        ))}
      </g>
    </svg>
  );
}

/** Hand-drawn tilde used under the "Less work. More you." tagline. */
export function Squiggle({ className }: ClassName) {
  return (
    <svg
      viewBox="0 0 60 10"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 7.2C7.5 1.4 13 1.6 18.4 6.2c4.6 4 9.4 3.6 14-1.2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Shallow yellow arc under the intro paragraph. */
export function UnderlineSwoosh({ className }: ClassName) {
  return (
    <svg
      viewBox="0 0 100 8"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 6.4C30 -1.2 70 -1.4 98 5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
