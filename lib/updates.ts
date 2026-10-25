import { APP_VERSION } from "@/lib/version";

const REPOSITORY = "PiyushBuildsAI/Social-Automation";
const LATEST_RELEASE_API = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;
const RELEASES_URL = `https://github.com/${REPOSITORY}/releases`;
const CACHE_MS = 5 * 60 * 1000;

export type UpdateInfo = {
  version: string;
  downloadUrl: string;
  releaseUrl: string;
};

export type UpdateCheck =
  | { status: "current"; currentVersion: string; latestVersion: string }
  | { status: "available"; update: UpdateInfo }
  | { status: "error"; currentVersion: string; message: string };

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type CachedCheck = {
  at: number;
  result: UpdateCheck;
};

let cachedCheck: CachedCheck | null = null;
let inFlight: Promise<UpdateCheck> | null = null;

/** `v0.3.0` -> `0.3.0`, so tags and versionName compare cleanly. */
export function normalizeVersion(version: string): string {
  return version.trim().replace(/^v/i, "").split("+")[0];
}

/** Numeric semver comparison. Returns 1 when `a` is newer, -1 when older. */
export function compareVersions(a: string, b: string): number {
  const [aCore, aPre] = normalizeVersion(a).split("-", 2);
  const [bCore, bPre] = normalizeVersion(b).split("-", 2);
  const aParts = aCore.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = bCore.split(".").map((part) => Number.parseInt(part, 10) || 0);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i += 1) {
    const delta = (aParts[i] ?? 0) - (bParts[i] ?? 0);
    if (delta !== 0) return delta > 0 ? 1 : -1;
  }

  if (aPre && !bPre) return -1;
  if (!aPre && bPre) return 1;
  if (aPre && bPre) return aPre.localeCompare(bPre);
  return 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readAsset(value: unknown): ReleaseAsset | null {
  if (!isRecord(value)) return null;
  const { name, browser_download_url: downloadUrl } = value;
  if (typeof name !== "string" || typeof downloadUrl !== "string") return null;
  return { name, browser_download_url: downloadUrl };
}

async function runUpdateCheck(): Promise<UpdateCheck> {
  let timedOut = false;
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 12_000);

  try {
    const response = await fetch(LATEST_RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      const message =
        response.status === 403
          ? "GitHub is limiting update checks right now. Try again later."
          : response.status === 404
            ? "No AutoMate release has been published yet."
            : "Couldn't check for updates. Try again.";
      return { status: "error", currentVersion: APP_VERSION, message };
    }

    const release: unknown = await response.json();
    if (!isRecord(release) || typeof release.tag_name !== "string") {
      return {
        status: "error",
        currentVersion: APP_VERSION,
        message: "The latest release has no version tag.",
      };
    }

    const latestVersion = normalizeVersion(release.tag_name);
    if (!latestVersion) {
      return {
        status: "error",
        currentVersion: APP_VERSION,
        message: "The latest release has no version tag.",
      };
    }

    if (compareVersions(latestVersion, APP_VERSION) <= 0) {
      return {
        status: "current",
        currentVersion: APP_VERSION,
        latestVersion,
      };
    }

    const assets = Array.isArray(release.assets)
      ? release.assets
          .map(readAsset)
          .filter((asset): asset is ReleaseAsset => asset !== null)
      : [];
    const apk =
      assets.find(
        (asset) =>
          asset.name.toLowerCase().endsWith(".apk") &&
          asset.name.toLowerCase().includes("automate"),
      ) ??
      assets.find((asset) => asset.name.toLowerCase().endsWith(".apk"));

    if (!apk) {
      return {
        status: "error",
        currentVersion: APP_VERSION,
        message: "The new release is missing its APK. Try again later.",
      };
    }

    const releaseUrl =
      typeof release.html_url === "string"
        ? release.html_url
        : `${RELEASES_URL}/tag/${release.tag_name}`;

    return {
      status: "available",
      update: {
        version: latestVersion,
        downloadUrl: apk.browser_download_url,
        releaseUrl,
      },
    };
  } catch {
    const offline =
      typeof navigator !== "undefined" && navigator.onLine === false;
    return {
      status: "error",
      currentVersion: APP_VERSION,
      message: offline
        ? "You're offline. Connect to the internet to check for updates."
        : timedOut
          ? "The update check timed out. Try again."
          : "Couldn't check for updates. Try again.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetches the latest public release. Results are shared for five minutes so
 * Home and Profile do not each spend a request from GitHub's unauthenticated
 * rate limit. Errors are not cached, so the retry button can try again at once.
 */
export function checkForUpdate(force = false): Promise<UpdateCheck> {
  if (!force && cachedCheck && Date.now() - cachedCheck.at < CACHE_MS) {
    return Promise.resolve(cachedCheck.result);
  }

  if (inFlight) return inFlight;

  inFlight = runUpdateCheck()
    .catch(
      (): UpdateCheck => ({
        status: "error",
        currentVersion: APP_VERSION,
        message: "Couldn't check for updates. Try again.",
      }),
    )
    .then((result) => {
      cachedCheck =
        result.status === "error" ? null : { at: Date.now(), result };
      return result;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
