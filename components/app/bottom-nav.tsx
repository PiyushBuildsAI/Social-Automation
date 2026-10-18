"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import {
  BoltIcon,
  ChatIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
  UsersIcon,
} from "@/components/app/line-icons";

const home = { href: "/home", label: "Home", Icon: HomeIcon };
const inbox = { href: "/inbox", label: "Inbox", Icon: ChatIcon };
const automations = { href: "/automations", label: "Automations", Icon: BoltIcon };
const leads = { href: "/leads", label: "Leads", Icon: UsersIcon };
const profile = { href: "/profile", label: "Profile", Icon: UserIcon };

export function BottomNav() {
  const pathname = usePathname();
  // The fourth slot is contextual: the Leads screen promotes Leads into it.
  const fourth = pathname.startsWith("/leads") ? leads : automations;

  const slots = [home, inbox, fourth, profile];

  return (
    <nav className="mt-auto shrink-0 border-t border-line bg-white px-5 pt-2.5 pb-4">
      <ul className="flex items-center">
        {slots.slice(0, 2).map((slot) => (
          <NavItem key={slot.href} {...slot} active={pathname.startsWith(slot.href)} />
        ))}

        <li className="flex flex-1 justify-center">
          <Link
            href="/automations/select-post"
            aria-label="Create automation"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[16px] bg-brand text-white shadow-[0_10px_20px_-8px_rgba(124,58,237,0.9)] transition-transform active:scale-95"
          >
            <PlusIcon className="h-[24px] w-[24px]" />
          </Link>
        </li>

        {slots.slice(2).map((slot) => (
          <NavItem key={slot.href} {...slot} active={pathname.startsWith(slot.href)} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: (props: { className?: string }) => ReactElement;
  active: boolean;
}) {
  return (
    <li className="flex-1">
      <Link
        href={href}
        className={`flex flex-col items-center gap-1 rounded-2xl py-1 ${
          active ? "text-brand" : "text-ink-faint"
        }`}
      >
        <Icon className="h-[23px] w-[23px]" />
        <span className="font-sans text-[10.5px] leading-none font-bold">{label}</span>
      </Link>
    </li>
  );
}
