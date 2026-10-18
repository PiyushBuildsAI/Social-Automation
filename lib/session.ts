import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/**
 * Read the current session from the request cookies.
 * Wrapped in React `cache` so a page can call it more than once per request.
 */
export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});

/** Real server-side gate for app screens: redirects to /signin when signed out. */
export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  return session;
}
