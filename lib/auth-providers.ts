/**
 * Which social providers can actually start an OAuth flow right now.
 *
 * Better Auth refuses to initialise a provider with missing credentials, so we
 * only register a provider once its env vars exist. The sign-in screen uses this
 * list to decide whether a button is live or shows the "add env" hint.
 */

export type SocialProvider = "google" | "facebook";

const ALL: SocialProvider[] = ["google", "facebook"];

export const enabledSocialProviders: SocialProvider[] = ALL.filter((provider) => {
  const prefix = provider.toUpperCase();
  return Boolean(process.env[`${prefix}_CLIENT_ID`] && process.env[`${prefix}_CLIENT_SECRET`]);
});

export const missingSocialProviders: SocialProvider[] = ALL.filter(
  (provider) => !enabledSocialProviders.includes(provider),
);

export const socialProviderLabels: Record<SocialProvider, string> = {
  google: "Google",
  facebook: "Facebook",
};

export const socialEnvVarNames: Record<SocialProvider, [string, string]> = {
  google: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
  facebook: ["FACEBOOK_CLIENT_ID", "FACEBOOK_CLIENT_SECRET"],
};
