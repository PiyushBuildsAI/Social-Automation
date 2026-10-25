import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/**
 * Read the current session from the request cookies.
 * Wrapped in React `cache` so a page can call it more than once per request.
 *
 * `MOBILE_DEMO` is set only by the offline mobile build (`scripts/build-mobile-web.sh`).
 * That build is a static export bundled inside the Android app, where there is no
 * Next.js server or SQLite database, so it renders every screen for a demo user.
 */
export const getSession = cache(async () => {
  if (process.env.MOBILE_DEMO === "1") {
    return {
      user: {
        id: "demo-user",
        name: "Piyush",
        email: "piyush@example.com",
        emailVerified: true,
        image: null,
        createdAt: new Date(0),
        updatedAt: new Date(0),
      },
      session: {
        id: "demo-session",
        token: "demo",
        userId: "demo-user",
        expiresAt: new Date("2030-01-01T00:00:00.000Z"),
        createdAt: new Date(0),
        updatedAt: new Date(0),
        ipAddress: "",
        userAgent: "",
      },
    } as Awaited<ReturnType<typeof auth.api.getSession>>;
  }

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
