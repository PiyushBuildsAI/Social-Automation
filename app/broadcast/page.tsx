import type { ReactNode } from "react";

import { FacebookGlyph, InstagramGlyph } from "@/components/automate-logo";
import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { ArrowRight } from "@/components/icons";
import { SendIcon } from "@/components/app/line-icons";
import { requireSession } from "@/lib/session";

const audiences = [
  { id: "all", label: "All Followers", hint: "12,480 contacts", defaultChecked: true },
  { id: "leads", label: "Existing Leads", hint: "1,248 contacts" },
  { id: "custom", label: "Custom List", hint: "Upload a CSV" },
];

export default async function BroadcastScreen() {
  await requireSession();
  return (
    <ScreenShell className="pt-2">
      <ScreenHeader
        title="Broadcast Message"
        back="/home"
        right={
          <span className="flex h-9 w-9 items-center justify-center rounded-full text-brand">
            <SendIcon className="h-[19px] w-[19px]" />
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="flex gap-2">
          <Channel defaultChecked label="Instagram">
            <InstagramGlyph className="h-[19px] w-[19px]" />
          </Channel>
          <Channel label="Facebook">
            <FacebookGlyph className="h-[19px] w-[19px]" />
          </Channel>
        </div>

        <h2 className="mt-5 font-display text-[15px] font-bold text-ink">Send to</h2>
        <div className="mt-2.5 flex flex-col gap-2">
          {audiences.map((audience) => (
            <label
              key={audience.id}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white p-3.5 transition-colors hover:bg-surface"
            >
              <input
                type="radio"
                name="audience"
                value={audience.id}
                defaultChecked={audience.defaultChecked}
                className="h-[18px] w-[18px] shrink-0 accent-[#7c3aed]"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-sans text-[14px] font-bold text-ink">
                  {audience.label}
                </span>
                <span className="block font-sans text-[11.5px] font-semibold text-ink-soft">
                  {audience.hint}
                </span>
              </span>
            </label>
          ))}
        </div>

        <h2 className="mt-5 font-display text-[15px] font-bold text-ink">Message</h2>
        <div className="mt-2.5 rounded-2xl border border-line bg-white p-3.5">
          <label htmlFor="broadcast" className="sr-only">
            Broadcast message
          </label>
          <textarea
            id="broadcast"
            rows={5}
            defaultValue={"Hey {{name}}! 👋\n\nHere's a new update for you 🚀"}
            className="w-full resize-none font-sans text-[14px] leading-relaxed font-semibold text-ink outline-none"
          />
          <p className="text-right font-sans text-[11px] font-semibold text-ink-faint">
            56/1000
          </p>
        </div>

        <p className="mt-2 font-sans text-[11.5px] font-semibold text-ink-soft">
          Use <span className="font-bold text-brand">{"{{name}}"}</span> to personalise
          each message.
        </p>
      </div>

      <div className="shrink-0 px-5 pt-2 pb-7">
        <button
          type="button"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[17px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(124,58,237,0.85)]"
        >
          Send Broadcast
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </ScreenShell>
  );
}

function Channel({
  label,
  children,
  defaultChecked = false,
}: {
  label: string;
  children: ReactNode;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-line bg-white px-3 py-3 font-sans text-[13.5px] font-bold text-ink transition-colors has-[:checked]:border-brand has-[:checked]:bg-brand-soft has-[:checked]:text-brand">
      <input
        type="radio"
        name="channel"
        defaultChecked={defaultChecked}
        className="sr-only"
      />
      {children}
      {label}
    </label>
  );
}
