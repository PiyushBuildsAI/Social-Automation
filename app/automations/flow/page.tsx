import Link from "next/link";
import type { ReactNode } from "react";

import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { Sparkle } from "@/components/app/ui";
import { PlusIcon, SendIcon, SparklesIcon, TagIcon, TrophyIcon } from "@/components/app/line-icons";
import { flowSteps, tintClasses, type FlowStep } from "@/lib/data";
import { requireSession } from "@/lib/session";

const stepIcons: Record<FlowStep["id"], ReactNode> = {
  f1: <SparklesIcon className="h-[20px] w-[20px]" />,
  f2: <SendIcon className="h-[15px] w-[15px]" />,
  f3: <TrophyIcon className="h-[20px] w-[20px]" />,
  f4: <TagIcon className="h-[20px] w-[20px]" />,
};

export default async function AutomationFlowScreen() {
  await requireSession();
  return (
    <ScreenShell className="pt-2">
      <ScreenHeader title="Automation Flow" back="/automations/new" />
      <Sparkle className="absolute top-[74px] right-8 h-5 w-5" />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <ol className="flex flex-col items-stretch">
          {flowSteps.map((step, i) => (
            <li key={step.id} className="flex flex-col items-center">
              <FlowCard step={step} icon={stepIcons[step.id]} />
              {i < flowSteps.length - 1 ? <Connector /> : null}
            </li>
          ))}
        </ol>

        <Link
          href="/automations/new"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-bright py-3.5 font-sans text-[14px] font-bold text-brand"
        >
          <PlusIcon className="h-4 w-4" />
          Add Step
        </Link>
      </div>
    </ScreenShell>
  );
}

function FlowCard({ step, icon }: { step: FlowStep; icon: ReactNode }) {
  const tint = tintClasses[step.tint];

  return (
    <div className={`w-full rounded-[20px] p-3.5 ${tint.soft}`}>
      <p className={`font-sans text-[11px] font-bold uppercase tracking-wide ${tint.ink}`}>
        {step.kind}
      </p>
      <div className="mt-1.5 flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white ${tint.ink}`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate font-sans text-[14px] font-bold text-ink">
            {step.title}
          </p>
          <p className="truncate font-sans text-[12px] font-semibold text-ink-soft">
            {step.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <span aria-hidden className="my-1 flex flex-col items-center">
      <span className="h-4 w-px bg-brand-bright/40" />
      <svg viewBox="0 0 16 12" className="h-3 w-4 text-brand-bright">
        <path
          d="M8 0v7M4 5l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
