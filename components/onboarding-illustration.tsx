import type { ReactNode } from "react";

type IllustrationProps = {
  className?: string;
};

const INK = "#2b2340";
const ARROW = "#b3a5d6";

/** Rounded-square app card, like the doodled icons floating around the mascot. */
function AppCard({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-28"
        y="-28"
        width="56"
        height="56"
        rx="16"
        fill="#ffffff"
        stroke="#f1eef9"
        strokeWidth="1.5"
        filter="url(#am-card-shadow)"
      />
      {children}
    </g>
  );
}

/** Four-point sparkle. */
function sparklePath(x: number, y: number, s: number) {
  const k = s * 0.19;
  return [
    `M${x} ${y - s}`,
    `Q${x + k} ${y - k} ${x + s} ${y}`,
    `Q${x + k} ${y + k} ${x} ${y + s}`,
    `Q${x - k} ${y + k} ${x - s} ${y}`,
    `Q${x - k} ${y - k} ${x} ${y - s}`,
    "Z",
  ].join(" ");
}

function Sparkle({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <path
      d={sparklePath(x, y, s)}
      fill="#fbbf24"
      stroke={INK}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );
}

/**
 * Classic two-facet paper dart. Built pointing right (like a send glyph) and
 * rotated -135° so the nose points up-left, as in the reference.
 */
function PaperPlane({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${-135 + rotate}) scale(1.15) translate(-12.5 -12)`}
    >
      <path
        d="M2 3 23 12 17 12 2 10Z"
        fill="#ffffff"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M2 14 17 12 23 12 2 21Z"
        fill="#a78bfa"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function OnboardingIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 234"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="am-card-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="2.5"
            stdDeviation="2.5"
            floodColor="#2b2340"
            floodOpacity="0.10"
          />
        </filter>
        <linearGradient id="am-ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.32" stopColor="#fa7e1e" />
          <stop offset="0.62" stopColor="#d62976" />
          <stop offset="1" stopColor="#962fbf" />
        </linearGradient>
        <marker
          id="am-arrow"
          viewBox="0 0 9 9"
          refX="6.5"
          refY="4.5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto"
        >
          <path
            d="M1 1.2 7.5 4.5 1 7.8"
            stroke={ARROW}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </marker>
      </defs>

      {/* soft halo + cloud */}
      <circle cx="150" cy="150" r="100" stroke="#ece6fb" strokeWidth="2" fill="none" />
      <g fill="#EDE8FC">
        <ellipse cx="180" cy="116" rx="108" ry="78" />
        <ellipse cx="106" cy="84" rx="62" ry="52" />
        <ellipse cx="256" cy="84" rx="58" ry="50" />
        <ellipse cx="112" cy="176" rx="58" ry="46" />
        <ellipse cx="254" cy="172" rx="60" ry="48" />
        <ellipse cx="182" cy="200" rx="78" ry="34" />
      </g>

      {/* dashed arrows radiating outward */}
      <g
        stroke={ARROW}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="5 6.5"
        fill="none"
      >
        <path d="M104 116 Q 88 92 82 78" markerEnd="url(#am-arrow)" />
        <path d="M196 112 Q 236 74 266 64" markerEnd="url(#am-arrow)" />
        <path d="M100 140 Q 78 132 68 126" markerEnd="url(#am-arrow)" />
        <path d="M196 146 Q 248 130 284 122" markerEnd="url(#am-arrow)" />
        <path d="M110 186 Q 96 186 92 178" markerEnd="url(#am-arrow)" />
        <path d="M180 192 Q 236 190 272 174" markerEnd="url(#am-arrow)" />
        <path d="M150 92 Q 156 62 190 54" markerEnd="url(#am-arrow)" />
      </g>

      <PaperPlane x={210} y={38} rotate={6} />

      {/* app cards */}
      <AppCard x={56} y={54}>
        <rect x="-19" y="-19" width="38" height="38" rx="12.5" fill="url(#am-ig)" />
        <rect
          x="-12"
          y="-12"
          width="24"
          height="24"
          rx="7.5"
          stroke="#ffffff"
          strokeWidth="2.7"
          fill="none"
        />
        <circle cx="0" cy="0" r="5.6" stroke="#ffffff" strokeWidth="2.7" fill="none" />
        <circle cx="6.6" cy="-6.6" r="1.9" fill="#ffffff" />
      </AppCard>

      <AppCard x={298} y={52}>
        <rect
          x="-16"
          y="-16"
          width="32"
          height="32"
          rx="7"
          fill="#ffffff"
          stroke="#e7e3f0"
          strokeWidth="1.8"
        />
        <path
          d="M-7 -9V9M-7 -9 7 9M7 -9V9"
          stroke="#111111"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </AppCard>

      <AppCard x={40} y={122}>
        <g transform="translate(-16 -14.5) scale(0.678)">
          <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
          <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
          <polygon
            fill="#e53935"
            points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
          />
          <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z" />
          <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 0 45 12.298z" />
        </g>
      </AppCard>

      <AppCard x={314} y={118}>
        <rect x="-11" y="-11" width="6.5" height="12" rx="3.2" fill="#36C5F0" />
        <rect x="0.5" y="-11" width="12" height="6.5" rx="3.2" fill="#2EB67D" />
        <rect x="4.5" y="-1" width="6.5" height="12" rx="3.2" fill="#ECB22E" />
        <rect x="-12.5" y="4.5" width="12" height="6.5" rx="3.2" fill="#E01E5A" />
      </AppCard>

      <AppCard x={58} y={180}>
        <rect x="-14" y="-15.5" width="28" height="31" rx="4.5" fill="#0f9d58" />
        <path
          d="M-14 -6H14M-14 1.5H14M-14 9H14M-4.5 -15.5V15.5M4.5 -15.5V15.5"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.85"
        />
      </AppCard>

      <AppCard x={306} y={178}>
        <circle cx="0" cy="0" r="17" fill="#25D366" />
        <g fill="#ffffff">
          <rect x="-11.5" y="-9.5" width="7.5" height="10.5" rx="3.4" transform="rotate(-34 -7.8 -4.3)" />
          <rect x="3.4" y="-1.5" width="7.5" height="10.5" rx="3.4" transform="rotate(-34 7.2 3.8)" />
          <rect x="-6.4" y="-2.4" width="12.8" height="5.4" rx="2.7" transform="rotate(-34 0 0.3)" />
        </g>
      </AppCard>

      {/* sparkles + dots */}
      <Sparkle x={228} y={94} s={9} />
      <Sparkle x={252} y={136} s={5.5} />
      <Sparkle x={206} y={216} s={8} />
      <Sparkle x={94} y={216} s={6} />
      <Sparkle x={94} y={54} s={6.5} />
      <circle cx="244" cy="122" r="2.6" fill="#fbbf24" />
      <circle cx="84" cy="142" r="2.4" fill="#fbbf24" />
      <circle cx="264" cy="206" r="2.4" fill="#fbbf24" />

      {/* mascot */}
      <g>
        {/* raised arm + hand */}
        <path
          d="M182 124C192 112 202 104 210 98"
          stroke={INK}
          strokeWidth="12.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M182 124C192 112 202 104 210 98"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="215" cy="94" r="7.5" fill="#ffffff" stroke={INK} strokeWidth="3.2" />
        <path d="M228 82 234 75M232 93 240 90" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />

        {/* body */}
        <ellipse cx="144" cy="148" rx="50" ry="44" fill="#ffffff" stroke={INK} strokeWidth="4" />

        {/* face */}
        <ellipse cx="128" cy="130" rx="4.8" ry="6" fill={INK} />
        <ellipse cx="162" cy="130" rx="4.8" ry="6" fill={INK} />
        <ellipse cx="112" cy="143" rx="7.4" ry="5.4" fill="#fac3d3" />
        <ellipse cx="178" cy="143" rx="7.4" ry="5.4" fill="#fac3d3" />
        <path
          d="M136.5 144.2c0 4.7 3.8 8.5 8.5 8.5s8.5-3.8 8.5-8.5Z"
          fill={INK}
          stroke={INK}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* crown */}
        <g transform="translate(110 96) rotate(-14)">
          <path
            d="M-16 10 -13 -8 -4 1 2 -11 8 1 16 -8 18 10Z"
            fill="#fbbf24"
            stroke={INK}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </g>

        {/* laptop */}
        <g transform="rotate(-4 148 179)">
          <rect x="104" y="154" width="88" height="50" rx="7" fill="#8b5cf6" stroke={INK} strokeWidth="3.4" />
          <path
            d="M157 163 142 182h10l-2.6 12.5 13-15h-9.2l1.8-11Z"
            fill="#fbbf24"
            stroke={INK}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </g>
        <rect x="94" y="202" width="112" height="9" rx="4.5" fill="#7c3aed" stroke={INK} strokeWidth="3" />
      </g>
    </svg>
  );
}
