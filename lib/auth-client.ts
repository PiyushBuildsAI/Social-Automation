import { createAuthClient } from "better-auth/react";

/** Browser-side auth client — no env required. */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

/** Dev account used by the one-click "Dev Access" button on /signin. */
export const devAccount = {
  name: "Dev Account",
  email: "dev@automate.local",
  password: "DevAccess123!",
} as const;
