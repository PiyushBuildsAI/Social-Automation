import { SignUpForm } from "@/components/auth/sign-up-form";
import { enabledSocialProviders, missingSocialProviders } from "@/lib/auth-providers";

export const metadata = {
  title: "Create your account · AutoMate",
};

export default function SignupScreen() {
  return (
    <SignUpForm enabled={enabledSocialProviders} missing={missingSocialProviders} />
  );
}
