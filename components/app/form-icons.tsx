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

export const MailIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="m4 8 7.1 4.6a1.7 1.7 0 0 0 1.8 0L20 8" />
  </Stroke>
);

export const LockIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="3" />
    <path d="M8 10V7.8a4 4 0 0 1 8 0V10" />
  </Stroke>
);

export const UserIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20.5c0-3.7 3.4-6.2 7.5-6.2s7.5 2.5 7.5 6.2" />
  </Stroke>
);
