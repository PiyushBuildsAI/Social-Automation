import Link from "next/link";
import type { ReactNode } from "react";

import { Crown } from "@/components/automate-logo";
import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { Toggle } from "@/components/app/ui";
import {
  BellIcon,
  BoltIcon,
  CardIcon,
  ChatIcon,
  HelpIcon,
  LinkIcon,
  PencilIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
} from "@/components/app/line-icons";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { requireSession } from "@/lib/session";

const rows: { label: string; hint: string; href?: string; icon: ReactNode }[] = [
  {
    label: "Account & Profile",
    hint: "Manage your profile and details",
    icon: <SettingsIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Connected Accounts",
    hint: "Instagram, Facebook and more",
    href: "/connect",
    icon: <LinkIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Automations Settings",
    hint: "Default behavior and preferences",
    href: "/automations",
    icon: <BoltIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Message Settings",
    hint: "Reply style, delays and limits",
    icon: <ChatIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Team & Access",
    hint: "Manage team members and roles",
    icon: <UsersIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Notifications",
    hint: "See your latest activity and alerts",
    href: "/notifications",
    icon: <BellIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Billing & Plans",
    hint: "Manage subscription and invoices",
    icon: <CardIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "App Preferences",
    hint: "Theme, language and more",
    icon: <SparklesIcon className="h-[21px] w-[21px]" />,
  },
  {
    label: "Help & Support",
    hint: "Get help and contact support",
    icon: <HelpIcon className="h-[21px] w-[21px]" />,
  },
];

export default async function ProfileScreen() {
  const { user } = await requireSession();
  const initials =
    user.name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";
  return (
    <ScreenShell surface className="pt-2">
      <ScreenHeader title="Profile" back="/home" right={<Crown className="mr-1 h-7 w-9" />} />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex items-center gap-3.5 rounded-[22px] border border-line bg-white p-4">
          <span className="relative">
            <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-brand-soft font-display text-[22px] font-extrabold text-brand">
              {initials}
            </span>
            <span className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand text-white">
              <PencilIcon className="h-3 w-3" />
            </span>
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[18px] font-extrabold text-ink">
              {user.name}
            </p>
            <p className="truncate font-sans text-[12.5px] font-semibold text-ink-soft">
              {user.email}
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {rows.map((row) => {
            const content = (
              <>
                <span className="text-ink-soft">{row.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-sans text-[14px] font-bold text-ink">
                    {row.label}
                  </span>
                  <span className="block font-sans text-[11.5px] font-semibold text-ink-soft">
                    {row.hint}
                  </span>
                </span>
                {row.href ? (
                  <svg viewBox="0 0 12 16" aria-hidden className="h-4 w-3 text-ink-faint">
                    <path
                      d="M2 3l5 5-5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="rounded-full bg-brand-soft px-2 py-1 font-sans text-[9px] font-extrabold tracking-wide text-brand uppercase">
                    Soon
                  </span>
                )}
              </>
            );

            return (
              <li key={row.label}>
                {row.href ? (
                  <Link
                    href={row.href}
                    className="flex items-center gap-3.5 rounded-[20px] border border-line bg-white p-3.5 transition-colors hover:bg-brand-tint"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3.5 rounded-[20px] border border-line bg-white p-3.5">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <InstallPrompt />

        <div className="mt-3 flex items-center gap-3 rounded-[20px] border border-line bg-white p-4">
          <span className="flex-1">
            <span className="block font-sans text-[14px] font-bold text-ink">
              Theme Mode
            </span>
            <span className="block font-sans text-[11.5px] font-semibold text-ink-soft">
              Switch between light and dark
            </span>
          </span>
          <Toggle />
        </div>

        <SignOutButton
          className="mt-4 flex w-full items-center justify-center rounded-[20px] border border-danger-soft bg-danger-soft py-4 font-display text-[16px] font-bold text-danger transition-colors hover:bg-danger hover:text-white disabled:opacity-60"
        />
      </div>
    </ScreenShell>
  );
}
