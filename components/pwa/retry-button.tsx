"use client";

import { useEffect, useSyncExternalStore } from "react";

/** Reload button for the offline screen; also reloads itself once back online. */
export function RetryButton() {
  const online = useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true,
  );

  useEffect(() => {
    const back = () => window.location.reload();
    window.addEventListener("online", back);
    return () => window.removeEventListener("online", back);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-6 flex h-[52px] w-full max-w-[260px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[16px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(124,58,237,0.85)] transition-transform active:scale-[0.99]"
    >
      {online ? "Try again" : "Waiting for connection..."}
    </button>
  );
}

function subscribeOnline(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}
