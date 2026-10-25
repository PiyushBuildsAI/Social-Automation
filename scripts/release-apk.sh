#!/usr/bin/env bash
#
# Build the signed APK and publish it as the latest GitHub release.
#
# Usage:
#   1. Bump the version in package.json and android/app/build.gradle.
#   2. Commit and push the source.
#   3. bun run release:apk
#
# The APK's versionName is read from build.gradle and injected into the bundled
# web app, so it matches the release tag that installed apps compare against.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

VERSION="$(node -p "require('./package.json').version")"
GRADLE_VERSION="$(sed -n 's/.*versionName "\(.*\)".*/\1/p' android/app/build.gradle | head -1)"

if [ "$VERSION" != "$GRADLE_VERSION" ]; then
  echo "Version mismatch:" >&2
  echo "  package.json:           $VERSION" >&2
  echo "  android/app/build.gradle: $GRADLE_VERSION" >&2
  echo "Bump both before releasing." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Commit and push the version bump first." >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required to publish the release." >&2
  exit 1
fi

TAG="v$VERSION"
if gh release view "$TAG" >/dev/null 2>&1; then
  echo "Release $TAG already exists. Bump the version before publishing." >&2
  exit 1
fi

bash scripts/build-apk.sh

APK="dist/automate-v$VERSION.apk"
CHECKSUM="$APK.sha256"
if [ ! -f "$APK" ] || [ ! -f "$CHECKSUM" ]; then
  echo "Expected build artifacts are missing: $APK / $CHECKSUM" >&2
  exit 1
fi

gh release create "$TAG" "$APK" "$CHECKSUM" \
  --title "AutoMate $TAG — Android APK" \
  --generate-notes

echo
echo "Published $TAG. Installed AutoMate builds will see it the next time they check."
