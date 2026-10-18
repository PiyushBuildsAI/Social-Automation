"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { ReactNode } from "react";

import { FacebookGlyph, GoogleGlyph } from "@/components/automate-logo";
import { Bolt } from "@/components/icons";
import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { MailIcon, LockIcon } from "@/components/app/form-icons";
import { authClient, devAccount } from "@/lib/auth-client";
import { socialProviderLabels, type SocialProvider } from "@/lib/auth-providers";

type Busy = null | "signin" | "signup" | "dev" | SocialProvider;

export function SignInForm({
  enabled,
  missing,
}: {
  enabled: SocialProvider[];
  missing: SocialProvider[];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from") ?? "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);

  const finish = () => {
    router.push(from);
    router.refresh();
  };

  const fail = (message: string | null) => {
    setBusy(null);
    setError(message);
  };

  const withEmail = async (mode: "signin" | "signup") => {
    setBusy(mode);
    setError(null);

    if (mode === "signin") {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) return fail(res.error.message ?? "Could not sign you in.");
      return finish();
    }

    const res = await authClient.signUp.email({
      name: email.split("@")[0] || "AutoMate user",
      email,
      password,
    });
    if (res.error) return fail(res.error.message ?? "Could not create your account.");
    return finish();
  };

  /**
   * One-click dev access: sign in with the preconfigured dev account, creating it
   * on first use so the app is usable without filling in anything.
   */
  const devAccess = async () => {
    setBusy("dev");
    setError(null);

    const signIn = await authClient.signIn.email({
      email: devAccount.email,
      password: devAccount.password,
    });
    if (!signIn.error) return finish();

    const created = await authClient.signUp.email({
      name: devAccount.name,
      email: devAccount.email,
      password: devAccount.password,
    });
    if (created.error) return fail(created.error.message ?? "Dev access failed.");
    return finish();
  };

  const social = async (provider: SocialProvider) => {
    if (!enabled.includes(provider)) return;
    setBusy(provider);
    setError(null);
    const res = await authClient.signIn.social({ provider, callbackURL: from });
    if (res.error) return fail(res.error.message ?? `Could not sign in with ${provider}.`);
    // OAuth redirects away; the pending state is cleared on failure only.
    return undefined;
  };

  return (
    <ScreenShell className="px-6 pt-2 pb-7">
      <ScreenHeader title="Welcome back" back="/welcome" />

      <p className="mt-1 font-sans text-[13.5px] leading-relaxed font-semibold text-ink-soft">
        Sign in to keep your automations running.
      </p>

      <form
        className="mt-6 flex flex-col gap-3.5"
        onSubmit={(event) => {
          event.preventDefault();
          void withEmail("signin");
        }}
      >
        <label className="flex h-[56px] items-center gap-3 rounded-2xl border border-line bg-white px-4 focus-within:border-brand-bright">
          <MailIcon className="h-[19px] w-[19px] text-ink-faint" />
          <span className="sr-only">Email address</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="w-full bg-transparent font-sans text-[15px] font-semibold text-ink outline-none placeholder:text-ink-faint"
          />
        </label>

        <label className="flex h-[56px] items-center gap-3 rounded-2xl border border-line bg-white px-4 focus-within:border-brand-bright">
          <LockIcon className="h-[19px] w-[19px] text-ink-faint" />
          <span className="sr-only">Password</span>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full bg-transparent font-sans text-[15px] font-semibold text-ink outline-none placeholder:text-ink-faint"
          />
        </label>

        <button
          type="submit"
          disabled={busy !== null}
          className="mt-2 flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[17px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(124,58,237,0.85)] transition-transform active:scale-[0.99] disabled:opacity-60"
        >
          {busy === "signin" ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Dev access — the one-click way in. */}
      <button
        type="button"
        onClick={() => void devAccess()}
        disabled={busy !== null}
        className="mt-3 flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-sun bg-amber-soft py-3 transition-transform active:scale-[0.99] disabled:opacity-60"
      >
        <span className="flex items-center gap-2 font-display text-[16px] font-bold text-amber-ink">
          <Bolt className="h-[17px] w-[17px]" />
          {busy === "dev" ? "Setting up dev account..." : "Dev Access — jump straight in"}
        </span>
        <span className="mt-0.5 font-sans text-[11.5px] font-semibold text-ink-soft">
          {devAccount.email} · {devAccount.password}
        </span>
      </button>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="font-sans text-[12.5px] font-semibold text-ink-faint">
          or continue with
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="flex flex-col gap-2.5">
        <SocialButton
          label="Continue with Google"
          ready={enabled.includes("google")}
          busy={busy === "google"}
          hint="Add GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET to .env.local"
          onClick={() => void social("google")}
        >
          <GoogleGlyph className="h-[21px] w-[21px]" />
        </SocialButton>

        <SocialButton
          label="Continue with Facebook"
          ready={enabled.includes("facebook")}
          busy={busy === "facebook"}
          hint="Add FACEBOOK_CLIENT_ID / FACEBOOK_CLIENT_SECRET to .env.local"
          onClick={() => void social("facebook")}
        >
          <FacebookGlyph className="h-[21px] w-[21px]" />
        </SocialButton>
      </div>

      {missing.length > 0 ? (
        <p className="mt-3 rounded-xl bg-surface px-3 py-2.5 font-sans text-[11.5px] leading-relaxed font-semibold text-ink-soft">
          {socialProviderLabels[missing[0]]} will switch on as soon as you add its
          credentials — email and Dev Access work today.
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-danger-soft px-3 py-2.5 font-sans text-[12.5px] font-bold text-danger"
        >
          {error}
        </p>
      ) : null}

      <p className="mt-5 text-center font-sans text-[13.5px] font-semibold text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-brand underline decoration-[1.5px] underline-offset-[3px]"
        >
          Sign up
        </Link>
      </p>
    </ScreenShell>
  );
}

function SocialButton({
  label,
  ready,
  busy,
  hint,
  onClick,
  children,
}: {
  label: string;
  ready: boolean;
  busy: boolean;
  hint: string;
  onClick: () => void;
  children: ReactNode;
}) {
  if (!ready) {
    return (
      <div
        className="flex flex-col rounded-2xl border border-dashed border-line bg-surface px-4 py-2.5"
        title={hint}
      >
        <span className="flex items-center gap-3 font-sans text-[14px] font-bold text-ink-faint">
          <span className="opacity-40">{children}</span>
          {label}
        </span>
        <span className="mt-0.5 font-sans text-[10.5px] font-semibold text-ink-faint">
          Credentials not set yet
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-line bg-white font-sans text-[15px] font-bold text-ink transition-colors hover:bg-surface disabled:opacity-60"
    >
      {children}
      {busy ? "Redirecting..." : label}
    </button>
  );
}

/**
 * `useSearchParams()` needs a Suspense boundary, so this is the export the page
 * uses.
 */
export function SignInFormWithSuspense(props: {
  enabled: SocialProvider[];
  missing: SocialProvider[];
}) {
  return (
    <Suspense fallback={null}>
      <SignInForm {...props} />
    </Suspense>
  );
}
