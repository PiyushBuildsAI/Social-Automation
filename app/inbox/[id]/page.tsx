import Link from "next/link";
import type { ReactNode } from "react";

import { ScreenShell } from "@/components/app/shell";
import { Avatar } from "@/components/app/ui";
import {
  ChatIcon,
  ChevronLeft,
  KebabIcon,
  SendIcon,
} from "@/components/app/line-icons";
import { requireSession } from "@/lib/session";
import { chatWithPriya, conversations, tintClasses, type ChatMessage } from "@/lib/data";

export function generateStaticParams() {
  return conversations.map((conversation) => ({ id: conversation.id }));
}

export default async function ConversationScreen({
  params,
}: PageProps<"/inbox/[id]">) {
  await requireSession();
  const { id } = await params;
  const conversation =
    conversations.find((item) => item.id === id) ?? conversations[0];

  return (
    <ScreenShell surface>
      <header className="flex shrink-0 items-center gap-3 border-b border-line bg-white px-5 py-3.5">
        <Link
          href="/inbox"
          aria-label="Back to inbox"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-line"
        >
          <ChevronLeft className="h-[22px] w-[22px]" />
        </Link>
        <Avatar name={conversation.name} tint={conversation.tint} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[16px] font-extrabold text-ink">
            {conversation.name}
          </p>
          <p className="font-sans text-[11.5px] font-bold text-mint">Active now</p>
        </div>
        <button
          type="button"
          aria-label="Conversation options"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-line"
        >
          <KebabIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-3.5">
          {chatWithPriya.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-line bg-white px-4 pt-3 pb-5">
        <form className="flex items-center gap-2.5">
          <label htmlFor="message" className="sr-only">
            Type a message
          </label>
          <input
            id="message"
            placeholder="Type a message..."
            className="h-[46px] flex-1 rounded-full border border-line bg-surface px-4 font-sans text-[14px] font-semibold text-ink outline-none placeholder:text-ink-faint focus:border-brand-bright"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-brand text-white"
          >
            <SendIcon className="h-[18px] w-[18px]" />
          </button>
        </form>
      </div>
    </ScreenShell>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const mine = message.from === "me";

  return (
    <div className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[86%] rounded-[20px] px-4 py-2.5 font-sans text-[13.5px] leading-relaxed font-semibold whitespace-pre-line ${
          mine
            ? "bg-gradient-to-br from-brand to-brand-bright text-white"
            : "border border-line bg-white text-ink"
        }`}
      >
        {message.text}
      </div>

      {message.link ? (
        <div className="mt-2 w-[86%] overflow-hidden rounded-[18px] border border-line bg-white">
          <div className={`flex h-[104px] items-center justify-center ${tintClasses[message.link.tint].soft}`}>
            <BookGlyph className="h-14 w-14 text-brand" />
          </div>
          <div className="p-3">
            <p className="font-sans text-[13px] font-bold text-ink">
              {message.link.title}
            </p>
            <p className="mt-0.5 font-sans text-[11.5px] font-semibold text-ink-soft">
              {message.link.caption}
            </p>
          </div>
        </div>
      ) : null}

      <span className="mt-1 flex items-center gap-1 font-sans text-[11px] font-semibold text-ink-faint">
        {mine ? <ChatIcon className="h-3 w-3" /> : null}
        {message.time}
      </span>
    </div>
  );
}

/** The little dark guide card shown inside the DM bubble. */
function BookGlyph({ className }: { className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <rect x="10" y="6" width="28" height="36" rx="6" fill="#2b2340" />
      <rect x="16" y="14" width="16" height="3.4" rx="1.7" fill="#ffffff" />
      <rect x="16" y="21" width="11" height="3.4" rx="1.7" fill="#ffffff" opacity="0.6" />
      <path
        d="M28.5 27c1 6.2 3 9.6 8.5 10.6-5.5 1-7.5 4.4-8.5 10.6-1-6.2-3-9.6-8.5-10.6 5.5-1 7.5-4.4 8.5-10.6Z"
        fill="#fbbf24"
        transform="translate(0 -6)"
      />
    </svg>
  );
}
