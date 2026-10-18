import { SignInFormWithSuspense } from "@/components/auth/sign-in-form";
import { enabledSocialProviders, missingSocialProviders } from "@/lib/auth-providers";

export const metadata = {
  title: "Sign in · AutoMate",
};

export default function SignInScreen() {
  return (
    <SignInFormWithSuspense
      enabled={enabledSocialProviders}
      missing={missingSocialProviders}
    />
  );
}
