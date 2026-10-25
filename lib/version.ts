import pkg from "@/package.json";

/**
 * The versionName of the installed Android build.
 *
 * `scripts/build-mobile-web.sh` injects NEXT_PUBLIC_APP_VERSION from
 * `android/app/build.gradle` before the static export, so the JS bundle and the
 * APK always compare against the same version. The package version is only the
 * fallback for the normal web build.
 */
export const APP_VERSION =
  process.env.NEXT_PUBLIC_APP_VERSION?.trim() || pkg.version;
