import fs from "node:fs";
import path from "node:path";

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

// Relative import on purpose: the Better Auth CLI loads this file directly and
// does not resolve the `@/` alias.
import { enabledSocialProviders } from "./auth-providers";

/**
 * Auth runs with **zero environment variables** right now: the secret falls back
 * to a dev constant and the database is a local SQLite file. Everything here is
 * overridable later by adding .env.local — see .env.example.
 */
const DEV_SECRET = "automate-dev-only-secret-change-me-in-production-0123456789";
const DEV_URL = "http://localhost:3000";

const databaseFile =
  process.env.AUTH_DB_FILE ?? path.join(process.cwd(), "data", "automate.auth.db");

fs.mkdirSync(path.dirname(databaseFile), { recursive: true });

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

if (enabledSocialProviders.includes("google")) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  };
}

if (enabledSocialProviders.includes("facebook")) {
  socialProviders.facebook = {
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
  };
}

export const auth = betterAuth({
  appName: "AutoMate",
  secret: process.env.BETTER_AUTH_SECRET ?? DEV_SECRET,
  baseURL: process.env.BETTER_AUTH_URL ?? DEV_URL,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? DEV_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],

  database: new Database(databaseFile),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },

  socialProviders,

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  user: {
    deleteUser: { enabled: false },
  },

  // nextCookies must stay last.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
