"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { isMobileDemo } from "@/lib/mobile";

/** Clears the Better Auth session and returns to /signin. */
export function SignOutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    // The APK has no auth server; leave the demo by returning to the app home.
    if (isMobileDemo) {
      router.push("/home");
      return;
    }
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      disabled={busy}
      className={className}
    >
      {busy ? "Signing out..." : isMobileDemo ? "Back to Home" : "Log Out"}
    </button>
  );
}
