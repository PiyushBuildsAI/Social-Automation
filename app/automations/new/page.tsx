import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { Toggle } from "@/components/app/ui";
import {
  ArrowRight,
  Bolt,
} from "@/components/icons";
import { ChevronDown, PlusIcon, SendIcon, SparklesIcon } from "@/components/app/line-icons";
import { tintClasses } from "@/lib/data";
import { requireSession } from "@/lib/session";

export default async function NewAutomationScreen() {
  await requireSession();
  return (
    <ScreenShell className="pt-2">
      <ScreenHeader
        title="Create Automation"
        back="/automations"
        right={
          <button
            type="button"
            className="rounded-full bg-brand px-4 py-2 font-sans text-[13px] font-bold text-white"
          >
            Save
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <label
          htmlFor="automation-name"
          className="font-sans text-[13px] font-bold text-ink-soft"
        >
          Automation Name
        </label>
        <input
          id="automation-name"
          defaultValue="Send Guide on Comment"
          className="mt-2 h-[54px] w-full rounded-2xl border border-line bg-white px-4 font-sans text-[15px] font-semibold text-ink outline-none focus:border-brand-bright"
        />

        <div className="mt-5 rounded-[22px] border border-line bg-white p-4">
          <h2 className="font-display text-[15px] font-bold text-ink">
            When this happens
          </h2>
          <button
            type="button"
            className="mt-3 flex h-[52px] w-full items-center gap-3 rounded-2xl bg-surface px-3.5 text-left"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-[11px] ${tintClasses.pink.soft} ${tintClasses.pink.ink}`}
            >
              <SparklesIcon className="h-[17px] w-[17px]" />
            </span>
            <span className="flex-1 font-sans text-[14px] font-bold text-ink">
              Someone comments on a post
            </span>
            <ChevronDown className="h-5 w-5 text-ink-faint" />
          </button>

          <label
            htmlFor="keyword"
            className="mt-4 block font-sans text-[13px] font-bold text-ink-soft"
          >
            Keyword
          </label>
          <input
            id="keyword"
            defaultValue="GUIDE"
            className="mt-2 h-[52px] w-full rounded-2xl border border-line bg-white px-4 font-sans text-[15px] font-bold tracking-wide text-ink outline-none focus:border-brand-bright"
          />
        </div>

        <div className="mt-4 rounded-[22px] border border-line bg-white p-4">
          <h2 className="font-display text-[15px] font-bold text-ink">
            Then do this
          </h2>
          <div className="mt-3 rounded-2xl bg-surface p-3.5">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-[11px] ${tintClasses.sky.soft} ${tintClasses.sky.ink}`}
              >
                <SendIcon className="h-[15px] w-[15px]" />
              </span>
              <span className="flex-1 font-sans text-[14px] font-bold text-ink">
                Send a DM
              </span>
              <ChevronDown className="h-5 w-5 text-ink-faint" />
            </div>
            <label htmlFor="dm" className="sr-only">
              DM message
            </label>
            <textarea
              id="dm"
              rows={4}
              defaultValue={
                "Hi {{name}}! 👋\nThanks for commenting!\nHere's your free guide: {{link}}"
              }
              className="mt-3 w-full resize-none rounded-xl bg-white p-3 font-sans text-[13px] leading-relaxed font-semibold text-ink outline-none focus:ring-1 focus:ring-brand-bright"
            />
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-bright py-3 font-sans text-[13.5px] font-bold text-brand"
          >
            <PlusIcon className="h-4 w-4" />
            Add Step
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-[22px] border border-line bg-white p-4">
          <Toggle defaultOn />
          <span className="font-sans text-[14px] font-bold text-ink">
            Automation Active
          </span>
        </div>
      </div>

      <div className="shrink-0 px-5 pt-2 pb-6">
        <button
          type="button"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[17px] font-bold text-white"
        >
          <Bolt className="h-5 w-5" />
          Review Flow
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </ScreenShell>
  );
}
