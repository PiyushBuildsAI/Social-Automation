#!/usr/bin/env bash
#
# Build the offline web bundle that ships inside the Android APK.
#
# The normal app is server-rendered: `requireSession()` reads cookies and
# `app/api` handles auth, neither of which exists inside an APK. For this build
# only we:
#   1. temporarily move `app/api` and `proxy.ts` out of the tree,
#   2. build a static export with a demo session (`MOBILE_DEMO=1`),
#   3. put them back, even if the build fails.
#
# Output: `out/` (then synced into the Capacitor Android project with `npx cap sync`).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

BACKUP="$(mktemp -d)"
restore() {
  if [ -f "$BACKUP/layout.tsx" ] && [ -f app/layout.tsx ]; then
    mv "$BACKUP/layout.tsx" app/layout.tsx
  fi
  if [ -d "$BACKUP/api" ] && [ ! -d app/api ]; then
    mv "$BACKUP/api" app/api
  fi
  if [ -f "$BACKUP/proxy.ts" ] && [ ! -f proxy.ts ]; then
    mv "$BACKUP/proxy.ts" proxy.ts
  fi
  rm -rf "$BACKUP"
}
trap restore EXIT

mv app/api "$BACKUP/api"
mv proxy.ts "$BACKUP/proxy.ts"

# `instant` is a cacheComponents-only route segment config. Static export has no
# PPR, so the mobile build removes it and restores the file afterwards.
cp app/layout.tsx "$BACKUP/layout.tsx"
sed -i 's|^export const instant = false;$|// export const instant = false; // removed for the static mobile export|' app/layout.tsx

# Stale generated route types still reference app/api, so start clean. Keep the
# Next upgrade-reminder retry receipt across runs: the first run stops once to
# show the advisory, and the retry is what lets the same build finish.
RETRY_CACHE="$BACKUP/next-agentic-upgrade-retries"
if [ -d .next/cache/next-agentic-upgrade-retries ]; then
  cp -a .next/cache/next-agentic-upgrade-retries "$RETRY_CACHE"
fi
rm -rf .next out
if [ -d "$RETRY_CACHE" ]; then
  mkdir -p .next/cache
  cp -a "$RETRY_CACHE" .next/cache/next-agentic-upgrade-retries
fi

run_build() {
  MOBILE_EXPORT=1 MOBILE_DEMO=1 NEXT_PUBLIC_MOBILE_DEMO=1 ./node_modules/.bin/next build
}

if ! run_build; then
  # Next 16.4.0 pauses once per fresh build to show a security advisory. The
  # retry receipt lives in .next/cache; retry immediately so this is one-shot.
  echo "Next paused for its security advisory; retrying the build..."
  run_build
fi

echo
echo "Static export written to $ROOT/out"
