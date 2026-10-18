"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { tintClasses, type Tint } from "@/lib/data";

/** Pill tab row, e.g. "All (24) | Unread (8) | Leads (12)". */
export function TabPills({
  tabs,
  initial = 0,
  className = "",
}: {
  tabs: { label: string; count?: number | string }[];
  initial?: number;
  className?: string;
}) {
  const [active, setActive] = useState(initial);

  return (
    <div className={`flex gap-2 overflow-x-auto ${className}`} role="tablist">
      {tabs.map((tab, i) => {
        const isActive = i === active;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-4 py-[9px] font-sans text-[13px] font-bold whitespace-nowrap transition-colors ${
              isActive
                ? "bg-brand text-white shadow-[0_8px_16px_-8px_rgba(124,58,237,0.9)]"
                : "bg-white text-ink-soft hover:bg-line"
            }`}
          >
            {tab.label}
            {tab.count !== undefined ? ` (${tab.count})` : ""}
          </button>
        );
      })}
    </div>
  );
}

/** Rounded tinted tile holding an icon. */
export function IconTile({
  tint,
  children,
  className = "h-11 w-11",
}: {
  tint: Tint;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-[15px] ${tintClasses[tint].soft} ${tintClasses[tint].ink} ${className}`}
    >
      {children}
    </span>
  );
}

/** Metric card: label, big value, coloured delta. */
export function StatCard({
  label,
  value,
  delta,
  trend,
  tint,
  icon,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  tint: Tint;
  icon?: ReactNode;
  /** Set when "down" is actually good news, e.g. lower response time. */
  positive?: boolean;
}) {
  const isGood = positive ?? trend !== "down";
  const deltaTone =
    trend === "flat" ? "text-ink-soft" : isGood ? "text-mint" : "text-danger";

  return (
    <div className={`rounded-[20px] p-3.5 ${tintClasses[tint].soft}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="font-sans text-[12px] leading-tight font-bold text-ink-soft">
          {label}
        </p>
        {icon ? <span className={tintClasses[tint].ink}>{icon}</span> : null}
      </div>
      <p className="mt-1.5 font-display text-[26px] leading-none font-extrabold text-ink">
        {value}
      </p>
      <p className={`mt-1 font-sans text-[11.5px] font-bold ${deltaTone}`}>
        {trend === "up" ? "↗ " : trend === "down" ? "↘ " : ""}
        {delta}
      </p>
    </div>
  );
}

/** Initials avatar with a tinted background. */
export function Avatar({
  name,
  tint,
  size = 44,
}: {
  name: string;
  tint: Tint;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-extrabold ${tintClasses[tint].soft} ${tintClasses[tint].ink}`}
    >
      {initials}
    </span>
  );
}

/** Small status pill. */
export function Badge({ tint, children }: { tint: Tint; children: ReactNode }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-sans text-[11px] font-bold ${tintClasses[tint].soft} ${tintClasses[tint].ink}`}
    >
      {children}
    </span>
  );
}

/** Primary violet pill button. */
export function PrimaryButton({
  children,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[17px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(124,58,237,0.85)] transition-transform active:scale-[0.99] ${className}`}
    >
      {children}
    </button>
  );
}

/** Four-point sparkle doodle used to decorate headers. */
export function Sparkle({
  className,
  color = "#fbbf24",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 2c.8 5.3 2.6 8.6 10 10-7.4 1.4-9.2 4.7-10 10-.8-5.3-2.6-8.6-10-10 7.4-1.4 9.2-4.7 10-10Z"
        fill={color}
      />
    </svg>
  );
}

/** Toggle switch used by the automation / schedule / profile screens. */
export function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors ${
        on ? "bg-mint" : "bg-[#d9d7e2]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

/** Selectable chip (days of week, categories). */
export function Chip({
  children,
  defaultSelected = false,
  className = "",
}: {
  children: ReactNode;
  defaultSelected?: boolean;
  className?: string;
}) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => setSelected(!selected)}
      className={`rounded-full px-4 py-2 font-sans text-[13px] font-bold transition-colors ${
        selected ? "bg-brand text-white" : "bg-white text-ink-soft hover:bg-line"
      } ${className}`}
    >
      {children}
    </button>
  );
}
