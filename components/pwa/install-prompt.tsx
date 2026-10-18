"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { AutoMateLogo } from "@/components/automate-logo";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "automate:install-dismissed";

const neverFires = () => () => {};

/**
 * "Install this app" card.
 *
 * Chromium fires `beforeinstallprompt`, which we replay on click. iOS Safari has
 * no such API, so it gets the Share-sheet instructions instead. Everything
 * browser-specific is derived during render from `mounted`, so nothing sets
 * state synchronously inside an effect.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [hidden, setHidden] = useState(false);
  const [installing, setInstalling] = useState(false);

  const mounted = useSyncExternalStore(neverFires, () => true, () => false);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferred(event as InstallEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  let dismissed = false;
  if (mounted) {
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* private mode — show it anyway */
    }
  }

  const standalone =
    mounted &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true);

  const isIos =
    mounted && /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  const mode: null | "prompt" | "ios" =
    hidden || standalone || dismissed
      ? null
      : deferred
        ? "prompt"
        : isIos
          ? "ios"
          : null;

  if (!mode) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    setInstalling(true);
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setInstalling(false);
    if (outcome === "accepted") dismiss();
  };

  return (
    <div className="mt-3 flex items-start gap-3 rounded-[20px] border border-brand-soft bg-brand-tint p-3.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-white">
        <AutoMateLogo className="h-7 w-7" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-sans text-[14px] font-bold text-ink">Install AutoMate</p>
        <p className="mt-0.5 font-sans text-[11.5px] leading-snug font-semibold text-ink-soft">
          {mode === "ios"
            ? "Tap Share, then “Add to Home Screen” for a full-screen app."
            : "Full-screen app on your home screen, with an offline screen built in."}
        </p>

        <div className="mt-2.5 flex items-center gap-2">
          {mode === "prompt" ? (
            <button
              type="button"
              onClick={() => void install()}
              disabled={installing}
              className="rounded-full bg-brand px-4 py-2 font-sans text-[12.5px] font-bold text-white transition-colors hover:bg-brand-bright disabled:opacity-60"
            >
              {installing ? "Installing..." : "Install app"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-line bg-white px-4 py-2 font-sans text-[12.5px] font-bold text-ink-soft transition-colors hover:bg-line"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
