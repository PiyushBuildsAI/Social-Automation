/**
 * True only in the static bundle embedded in the Android APK.
 *
 * That build has no Next.js server, so `/api/auth` does not exist. Screens use
 * this flag to skip the dead auth calls and enter the demo session instead.
 */
export const isMobileDemo = process.env.NEXT_PUBLIC_MOBILE_DEMO === "1";
