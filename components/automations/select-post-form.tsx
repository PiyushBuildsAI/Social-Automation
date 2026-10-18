"use client";

import Link from "next/link";
import { useState } from "react";

import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { TabPills } from "@/components/app/ui";
import { ArrowRight } from "@/components/icons";
import { CheckIcon } from "@/components/app/line-icons";
import { posts, tintClasses, type Post } from "@/lib/data";

export function SelectPostForm() {
  return (
    <ScreenShell surface>
      <ScreenHeader
        title="Select Post"
        back="/automations"
        subtitle="Choose which post will trigger this automation."
      />

      <div className="flex-1 overflow-y-auto px-5">
        <TabPills
          tabs={[{ label: "Recent Posts" }, { label: "All Posts" }]}
          className="mb-4"
        />

        <div className="grid grid-cols-2 gap-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} defaultSelected={i === 0} />
          ))}
        </div>
      </div>

      <div className="shrink-0 px-5 pt-4 pb-7">
        <Link
          href="/automations/flow"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[17px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(124,58,237,0.85)] transition-transform active:scale-[0.99]"
        >
          Next
          <ArrowRight className="h-[21px] w-[21px]" />
        </Link>
      </div>
    </ScreenShell>
  );
}

function PostCard({ post, defaultSelected }: { post: Post; defaultSelected: boolean }) {
  const [selected, setSelected] = useState(defaultSelected);
  const tint = tintClasses[post.tint];

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => setSelected(!selected)}
      className={`overflow-hidden rounded-[22px] border-2 bg-white text-left transition-colors ${
        selected ? "border-brand" : "border-transparent"
      }`}
    >
      <div className={`relative flex h-[112px] items-end p-3 ${tint.soft}`}>
        <span
          className={`rounded-full bg-white/80 px-2.5 py-1 font-sans text-[10.5px] font-bold ${tint.ink}`}
        >
          {post.tag}
        </span>
        {selected ? (
          <span className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </div>
      <p
        className={`px-3 py-2.5 font-sans text-[12.5px] font-bold ${
          selected ? "text-brand" : "text-ink"
        }`}
      >
        {selected ? "Selected" : post.title}
      </p>
    </button>
  );
}
