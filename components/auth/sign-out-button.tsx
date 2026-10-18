"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

/** Clears the Better Auth session and returns to /signin. */
export function SignOutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
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
      {busy ? "Signing out..." : "Log Out"}
    </button>
  );
}
