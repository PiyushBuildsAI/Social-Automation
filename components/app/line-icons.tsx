import type { ReactNode } from "react";

type IconProps = { className?: string };

function Stroke({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const HomeIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M3.5 10.5 12 3.8l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-3.6V14h-6.8v6.5H5A1.5 1.5 0 0 1 3.5 19v-8.5Z" />
  </Stroke>
);

export const ChatIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M20.5 11.8c0 4.3-3.8 7.7-8.5 7.7-1 0-2-.2-2.9-.5L4 21l1.3-3.6A7.3 7.3 0 0 1 3.5 11.8C3.5 7.5 7.3 4 12 4s8.5 3.5 8.5 7.8Z" />
  </Stroke>
);

export const BoltIcon = ({ className }: IconProps) => (
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

export const UsersIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="9.5" cy="8" r="3.6" />
    <path d="M3 20c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6" />
    <path d="M16 5.4a3.6 3.6 0 0 1 0 7M17.6 14.9c2.1.5 3.6 2.1 3.6 4.4" />
  </Stroke>
);

export const UserIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20.5c0-3.7 3.4-6.2 7.5-6.2s7.5 2.5 7.5 6.2" />
  </Stroke>
);

export const PlusIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
);

export const SearchIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="10.8" cy="10.8" r="6.3" />
    <path d="m15.6 15.6 4 4" />
  </Stroke>
);

export const FilterIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 6.5h16M7 12h10M10 17.5h4" />
  </Stroke>
);

export const ChevronLeft = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="m14.5 5-7 7 7 7" />
  </Stroke>
);

export const ChevronDown = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="m5 9.5 7 7 7-7" />
  </Stroke>
);

export const KebabIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <circle cx="12" cy="5.5" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="12" cy="18.5" r="1.7" />
  </svg>
);

export const SendIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M3.4 20.6 22 12 3.4 3.4 3.4 10.2 15.6 12 3.4 13.8Z" />
  </svg>
);

export const CalendarIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3.5V7M16 3.5V7" />
  </Stroke>
);

export const ChartIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 20.5v-5M10 20.5v-9M16 20.5v-3.5M21 20.5H3" />
  </Stroke>
);

export const BellIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5S6.5 14 6.5 10Z" />
    <path d="M10 19a2.2 2.2 0 0 0 4 0" />
  </Stroke>
);

export const SettingsIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 14.5a1.7 1.7 0 0 0 .3 1.9l.1.1a1.5 1.5 0 1 1-2.1 2.1l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.5 1.5 0 1 1-3 0v-.1a1.7 1.7 0 0 0-2.9-1.3l-.1.1a1.5 1.5 0 1 1-2.1-2.1l.1-.1a1.7 1.7 0 0 0-1.2-2.9h-.2a1.5 1.5 0 1 1 0-3h.1a1.7 1.7 0 0 0 1.3-2.9l-.1-.1a1.5 1.5 0 1 1 2.1-2.1l.1.1a1.7 1.7 0 0 0 2.9-1.2v-.2a1.5 1.5 0 1 1 3 0v.1a1.7 1.7 0 0 0 2.9 1.3l.1-.1a1.5 1.5 0 1 1 2.1 2.1l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.5 1.5 0 1 1 0 3h-.1a1.7 1.7 0 0 0-1.6 1Z" />
  </Stroke>
);

export const PencilIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M16.5 4.4 19.6 7.5 8.1 19H5v-3.1L16.5 4.4Z" />
  </Stroke>
);

export const LinkIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M10 13.7a3.6 3.6 0 0 0 5.2 0l3.1-3.1a3.7 3.7 0 0 0-5.2-5.2l-1.2 1.2" />
    <path d="M14 10.3a3.6 3.6 0 0 0-5.2 0l-3.1 3.1a3.7 3.7 0 0 0 5.2 5.2l1.2-1.2" />
  </Stroke>
);

export const TagIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 11.4V4.5A1.5 1.5 0 0 1 5.5 3h6.9c.4 0 .8.2 1 .4l7 7a1.5 1.5 0 0 1 0 2.1l-6.9 6.9a1.5 1.5 0 0 1-2.1 0l-7-7a1.5 1.5 0 0 1-.4-1Z" />
    <circle cx="8.4" cy="7.8" r="1.4" />
  </Stroke>
);

export const MegaphoneIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H8l7 4V5l-7 4H5.5A1.5 1.5 0 0 0 4 10.5Z" />
    <path d="M18 9.5a4 4 0 0 1 0 5" />
  </Stroke>
);

export const TrophyIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M7 4h10v4.5a5 5 0 0 1-10 0V4Z" />
    <path d="M7 5.5H4.5V8A3.5 3.5 0 0 0 8 11.4M17 5.5h2.5V8a3.5 3.5 0 0 1-3.5 3.4M12 13.5V17M8.5 20.5h7" />
  </Stroke>
);

export const SparklesIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z" />
    <path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
  </Stroke>
);

export const ClockIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3.2 2" />
  </Stroke>
);

export const CheckIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Stroke>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5" />
    <path d="M4.5 16.5v2A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
  </Stroke>
);

export const RefreshIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M20 7v5h-5" />
    <path d="M19.2 12a7.2 7.2 0 1 1-1.7-4.7L20 12" />
  </Stroke>
);

export const TrendingUp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M3.5 18.5h3v-5h-3v5Zm5 0h3V9.5h-3v9Zm5 0h3v-7h-3v7Zm5 0h3V5.5h-3v13Z" opacity="0.45" />
    <path
      d="M3 9.2 9 5l3.6 2.8L20.8 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M21 5.6V2h-3.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const GaugeIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 17a9 9 0 1 1 16 0" />
    <path d="m12 12.5 3.4-3.4" />
  </Stroke>
);

export const CardIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="M3 10h18M6.5 14.5h3" />
  </Stroke>
);

export const HelpIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.8c0 1.7-2.4 2-2.4 3.6" />
    <path d="M12 17.2h.01" />
  </Stroke>
);

export const UserPlusIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="9.5" cy="8" r="3.6" />
    <path d="M3 20c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6" />
    <path d="M18 6.5v5M20.5 9h-5" />
  </Stroke>
);
