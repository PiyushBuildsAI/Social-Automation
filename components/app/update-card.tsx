"use client";

import { useEffect, useState } from "react";

import {
  CheckIcon,
  DownloadIcon,
  RefreshIcon,
} from "@/components/app/line-icons";
import { checkForUpdate, type UpdateCheck } from "@/lib/updates";
import { APP_VERSION } from "@/lib/version";

type CheckState = { status: "checking" } | UpdateCheck;

const DISMISS_KEY = "automate:update-dismissed";

function useUpdateCheck() {
  const [state, setState] = useState<CheckState>({ status: "checking" });

  useEffect(() => {
    let active = true;

    const check = () => {
      void checkForUpdate().then((result) => {
        if (active) setState(result);
      });
    };

    check();

    // Re-check when the app comes back to the foreground, but let the five-
    // minute cache absorb normal Home/Profile navigation.
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const refresh = () => {
    setState({ status: "checking" });
    void checkForUpdate(true).then(setState);
  };

  return { state, refresh };
}

function versionLabel(version: string) {
  return version.startsWith("v") ? version : `v${version}`;
}

function statusText(state: CheckState) {
  switch (state.status) {
    case "checking":
      return "Checking for the latest build…";
    case "current":
      return "You're on the latest version of AutoMate.";
    case "available":
      return "A newer build is ready for your phone.";
    case "error":
      return state.message;
  }
}

/** Compact, dismissible update prompt for the Home screen. */
export function UpdateBanner() {
  const { state } = useUpdateCheck();
  const [dismissedVersion, setDismissedVersion] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(DISMISS_KEY);
    } catch {
      return null;
    }
  });

  if (state.status !== "available") return null;
  if (dismissedVersion === state.update.version) return null;

  const dismiss = () => {
    setDismissedVersion(state.update.version);
    try {
      window.localStorage.setItem(DISMISS_KEY, state.update.version);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mt-4 flex items-start gap-3 rounded-[20px] border border-brand-soft bg-brand-tint p-3.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-white text-brand">
        <DownloadIcon className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-sans text-[14px] font-bold text-ink">
            Update available
          </p>
          <span className="rounded-full bg-brand px-2 py-0.5 font-sans text-[9.5px] font-extrabold text-white">
            {versionLabel(state.update.version)}
          </span>
        </div>
        <p className="mt-0.5 font-sans text-[11.5px] leading-snug font-semibold text-ink-soft">
          Download the new APK, then open it to finish installing.
        </p>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <a
            href={state.update.downloadUrl}
            rel="noreferrer"
            className="rounded-full bg-brand px-4 py-2 font-sans text-[12.5px] font-bold text-white transition-colors hover:bg-brand-bright"
          >
            Download update
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-line bg-white px-4 py-2 font-sans text-[12.5px] font-bold text-ink-soft transition-colors hover:bg-line"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

/** Persistent update status + manual check for the Profile screen. */
export function UpdateCard() {
  const { state, refresh } = useUpdateCheck();
  const available = state.status === "available";
  const current = state.status === "current";
  const checking = state.status === "checking";
  const error = state.status === "error";

  const iconTone = available
    ? "bg-white text-brand"
    : current
      ? "bg-mint-soft text-mint"
      : error
        ? "bg-danger-soft text-danger"
        : "bg-brand-soft text-brand";

  return (
    <div
      className={`mt-3 rounded-[20px] border p-3.5 ${
        available
          ? "border-brand-soft bg-brand-tint"
          : "border-line bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] ${iconTone}`}
        >
          {current ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <DownloadIcon className={`h-5 w-5 ${checking ? "animate-pulse" : ""}`} />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-sans text-[14px] font-bold text-ink">App updates</p>
            <span
              className={`shrink-0 rounded-full px-2 py-1 font-sans text-[9.5px] font-extrabold ${
                available ? "bg-white text-brand" : "bg-line text-ink-soft"
              }`}
            >
              {versionLabel(APP_VERSION)}
            </span>
          </div>

          <p
            aria-live="polite"
            className="mt-0.5 font-sans text-[11.5px] leading-snug font-semibold text-ink-soft"
          >
            {statusText(state)}
          </p>

          {available ? (
            <>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <a
                  href={state.update.downloadUrl}
                  rel="noreferrer"
                  className="rounded-full bg-brand px-4 py-2 font-sans text-[12.5px] font-bold text-white transition-colors hover:bg-brand-bright"
                >
                  Download {versionLabel(state.update.version)}
                </a>
                <a
                  href={state.update.releaseUrl}
                  rel="noreferrer"
                  className="rounded-full border border-line bg-white px-4 py-2 font-sans text-[12.5px] font-bold text-ink-soft transition-colors hover:bg-line"
                >
                  What&apos;s new
                </a>
              </div>
              <p className="mt-2 font-sans text-[10.5px] font-semibold text-ink-soft">
                After downloading, open the APK to finish installing.
              </p>
            </>
          ) : (
            <button
              type="button"
              onClick={refresh}
              disabled={checking}
              className="mt-2.5 flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 font-sans text-[11.5px] font-bold text-ink-soft transition-colors hover:bg-line disabled:opacity-60"
            >
              <RefreshIcon
                className={`h-3.5 w-3.5 ${checking ? "animate-spin" : ""}`}
              />
              {checking ? "Checking..." : error ? "Try again" : "Check again"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
