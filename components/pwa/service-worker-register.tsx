"use client";

import { useEffect, useState } from "react";

/**
 * Registers the service worker (production only — in dev a cached worker fights
 * hot reload and can serve stale CSS) and surfaces an "update ready" pill when a
 * new version has been installed in the background.
 */
export function ServiceWorkerRegistrar() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (cancelled) return;

        if (registration.waiting && navigator.serviceWorker.controller) {
          setWaiting(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaiting(installing);
            }
          });
        });
      } catch (error) {
        // A failed registration must never break the app.
        console.warn("[pwa] service worker registration failed", error);
      }
    };

    void register();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!waiting) return null;

  const applyUpdate = () => {
    waiting.postMessage("automate:skip-waiting");
    waiting.addEventListener("statechange", () => window.location.reload(), {
      once: true,
    });
    // Belt and braces: reload even if the statechange never lands.
    window.setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-4 text-white shadow-[0_14px_30px_-12px_rgba(43,35,64,0.85)]">
        <span className="font-sans text-[12.5px] font-bold">
          A new version is ready
        </span>
        <button
          type="button"
          onClick={applyUpdate}
          className="rounded-full bg-white/15 px-3 py-1.5 font-sans text-[12px] font-bold transition-colors hover:bg-white/25"
        >
          Reload
        </button>
        <button
          type="button"
          onClick={() => setWaiting(null)}
          aria-label="Dismiss update notice"
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white"
        >
          <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5">
            <path
              d="M3 3l10 10M13 3L3 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
