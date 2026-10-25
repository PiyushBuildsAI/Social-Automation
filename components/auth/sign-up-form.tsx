"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { FacebookGlyph, GoogleGlyph } from "@/components/automate-logo";
import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { PrimaryButton, Sparkle } from "@/components/app/ui";
import { LockIcon, MailIcon, UserIcon } from "@/components/app/form-icons";
import { authClient } from "@/lib/auth-client";
import { isMobileDemo } from "@/lib/mobile";
import { socialProviderLabels, type SocialProvider } from "@/lib/auth-providers";

export function SignUpForm({
  enabled,
  missing,
}: {
  enabled: SocialProvider[];
  missing: SocialProvider[];
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<null | "signup" | "google" | "facebook">(null);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (event: FormEvent) => {
    event.preventDefault();
    setBusy("signup");
    setError(null);

    // No auth server inside the APK; go straight to the demo app.
    if (isMobileDemo) {
      router.push("/home");
      return;
    }

    const res = await authClient.signUp.email({ name, email, password });
    if (res.error) {
      setBusy(null);
      setError(res.error.message ?? "Could not create your account.");
      return;
    }

    router.push("/connect");
    router.refresh();
  };

  const social = async (provider: SocialProvider) => {
    if (!enabled.includes(provider)) return;
    setBusy(provider);
    setError(null);
    if (isMobileDemo) {
      router.push("/home");
      return;
    }
    await authClient.signIn.social({ provider, callbackURL: "/connect" });
  };

  return (
    <ScreenShell className="px-6 pt-2 pb-7">
      <ScreenHeader title="Create your account" back="/welcome" />
      <Sparkle className="absolute top-[76px] right-7 h-5 w-5" />

      <form className="mt-3 flex flex-col gap-3.5" onSubmit={(e) => void createAccount(e)}>
        <Field
          icon={<UserIcon className="h-[19px] w-[19px]" />}
          label="Full Name"
        >
          <input
            id="name"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full bg-transparent font-sans text-[15px] font-semibold text-ink outline-none placeholder:text-ink-faint"
            placeholder="Full Name"
          />
        </Field>

        <Field icon={<MailIcon className="h-[19px] w-[19px]" />} label="Email address">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent font-sans text-[15px] font-semibold text-ink outline-none placeholder:text-ink-faint"
            placeholder="Email address"
          />
        </Field>

        <Field
          icon={<LockIcon className="h-[19px] w-[19px]" />}
          label="Password"
        >
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-transparent font-sans text-[15px] font-semibold tracking-[0.2em] text-ink outline-none"
            placeholder="Password"
          />
        </Field>

        {error ? (
          <p
            role="alert"
            className="rounded-xl bg-danger-soft px-3 py-2.5 font-sans text-[12.5px] font-bold text-danger"
          >
            {error}
          </p>
        ) : null}

        <PrimaryButton type="submit" className="mt-3">
          {busy === "signup" ? "Creating account..." : "Create Account"}
        </PrimaryButton>

        <div className="my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="font-sans text-[12.5px] font-semibold text-ink-faint">
            or continue with
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <SocialButton
          onClick={() => void social("google")}
          busy={busy === "google"}
          ready={enabled.includes("google")}
          hint="Add GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET to .env.local"
        >
          <GoogleGlyph className="h-[21px] w-[21px]" />
          Continue with Google
        </SocialButton>

        <SocialButton
          onClick={() => void social("facebook")}
          busy={busy === "facebook"}
          ready={enabled.includes("facebook")}
          hint="Add FACEBOOK_CLIENT_ID / FACEBOOK_CLIENT_SECRET to .env.local"
        >
          <FacebookGlyph className="h-[21px] w-[21px]" />
          Continue with Facebook
        </SocialButton>

        {missing.length > 0 ? (
          <p className="rounded-xl bg-surface px-3 py-2.5 font-sans text-[11.5px] leading-relaxed font-semibold text-ink-soft">
            {socialProviderLabels[missing[0]]} will switch on as soon as you add its
            credentials — email sign-up works today.
          </p>
        ) : null}

        <p className="mt-auto pt-4 text-center font-sans text-[12.5px] leading-relaxed font-semibold text-ink-soft">
          By continuing, you agree to our{" "}
          <Link href="#" className="font-bold text-brand underline decoration-[1.5px]">
            Terms
          </Link>{" "}
          &amp;{" "}
          <Link href="#" className="font-bold text-brand underline decoration-[1.5px]">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <p className="mt-4 text-center font-sans text-[13.5px] font-semibold text-ink-soft">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-bold text-brand underline decoration-[1.5px] underline-offset-[3px]"
        >
          Sign in
        </Link>
      </p>
    </ScreenShell>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex h-[56px] items-center gap-3 rounded-2xl border border-line bg-white px-4 transition-colors focus-within:border-brand-bright">
      <span className="text-ink-faint">{icon}</span>
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}

function SocialButton({
  onClick,
  busy,
  ready,
  hint,
  children,
}: {
  onClick: () => void;
  busy: boolean;
  ready: boolean;
  hint: string;
  children: ReactNode;
}) {
  if (!ready) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface px-4 py-2.5" title={hint}>
        <span className="flex items-center gap-3 font-sans text-[14px] font-bold text-ink-faint">
          <span className="opacity-40">{children}</span>
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
      {busy ? "Redirecting..." : null}
    </button>
  );
}
