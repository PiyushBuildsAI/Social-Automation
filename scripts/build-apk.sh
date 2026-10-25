#!/usr/bin/env bash
#
# Build a signed release APK from the static mobile web bundle.
#
# Usage:
#   bash scripts/build-apk.sh            # rebuild web bundle, sync, compile, sign
#   SKIP_WEB=1 bash scripts/build-apk.sh # reuse the current out/ directory
#
# The signing key stays outside the repository:
#   ~/.android/automate-release.jks
#   ~/.android/automate-release-password
# Keep those two files if you ever need to publish an update signed with the
# same key. Override the paths with AUTOMATE_KEYSTORE and
# AUTOMATE_KEYSTORE_PASSWORD_FILE (or set AUTOMATE_KEYSTORE_PASSWORD directly).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
BUILD_TOOLS_VERSION="${BUILD_TOOLS_VERSION:-34.0.0}"
BUILD_TOOLS="$ANDROID_HOME/build-tools/$BUILD_TOOLS_VERSION"

KEYSTORE="${AUTOMATE_KEYSTORE:-$HOME/.android/automate-release.jks}"
PASSWORD_FILE="${AUTOMATE_KEYSTORE_PASSWORD_FILE:-$HOME/.android/automate-release-password}"
KEY_ALIAS="${AUTOMATE_KEY_ALIAS:-automate}"

for tool in "$BUILD_TOOLS/zipalign" "$BUILD_TOOLS/apksigner"; do
  if [ ! -x "$tool" ]; then
    echo "Missing Android build tool: $tool" >&2
    echo "Install build-tools $BUILD_TOOLS_VERSION or set ANDROID_HOME." >&2
    exit 1
  fi
done

if [ "${SKIP_WEB:-0}" != "1" ]; then
  bash scripts/build-mobile-web.sh
fi

if [ ! -f out/index.html ]; then
  echo "out/index.html is missing; run the mobile web build first." >&2
  exit 1
fi

./node_modules/.bin/cap sync android

(
  cd android
  ./gradlew assembleRelease --no-daemon --console=plain
)

VERSION="$(sed -n 's/.*versionName "\(.*\)".*/\1/p' android/app/build.gradle | head -1)"
VERSION="${VERSION:-0.0.0}"
UNSIGNED="android/app/build/outputs/apk/release/app-release-unsigned.apk"
if [ ! -f "$UNSIGNED" ]; then
  echo "Release APK was not produced at $UNSIGNED" >&2
  exit 1
fi

mkdir -p dist
APK="dist/automate-v${VERSION}.apk"
ALIGNED="dist/automate-v${VERSION}-aligned.apk"

# Generate a release key the first time. The password is kept next to the key
# outside the repo so later builds can update the same installed app.
if [ ! -f "$KEYSTORE" ]; then
  mkdir -p "$(dirname "$KEYSTORE")"
  if [ -n "${AUTOMATE_KEYSTORE_PASSWORD:-}" ]; then
    PASSWORD="$AUTOMATE_KEYSTORE_PASSWORD"
  else
    PASSWORD="$(openssl rand -hex 24)"
    (umask 077 && printf '%s' "$PASSWORD" > "$PASSWORD_FILE")
    echo "Created release key: $KEYSTORE"
    echo "Password saved to:   $PASSWORD_FILE"
  fi
  keytool -genkeypair \
    -keystore "$KEYSTORE" \
    -storetype PKCS12 \
    -alias "$KEY_ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$PASSWORD" \
    -keypass "$PASSWORD" \
    -dname "CN=AutoMate, OU=Mobile, O=PiyushBuildsAI, L=India, ST=India, C=IN"
else
  if [ -n "${AUTOMATE_KEYSTORE_PASSWORD:-}" ]; then
    PASSWORD="$AUTOMATE_KEYSTORE_PASSWORD"
  elif [ -f "$PASSWORD_FILE" ]; then
    PASSWORD="$(cat "$PASSWORD_FILE")"
  else
    echo "Keystore exists but no password was provided or found at $PASSWORD_FILE." >&2
    echo "Set AUTOMATE_KEYSTORE_PASSWORD or restore the password file." >&2
    exit 1
  fi
fi

"$BUILD_TOOLS/zipalign" -p -f 4 "$UNSIGNED" "$ALIGNED"
rm -f "$APK"
"$BUILD_TOOLS/apksigner" sign \
  --ks "$KEYSTORE" \
  --ks-key-alias "$KEY_ALIAS" \
  --ks-pass "pass:$PASSWORD" \
  --key-pass "pass:$PASSWORD" \
  --out "$APK" \
  "$ALIGNED"
rm -f "$ALIGNED"

"$BUILD_TOOLS/apksigner" verify --verbose --print-certs "$APK"
(
  cd dist
  sha256sum "$(basename "$APK")" > "$(basename "$APK").sha256"
)

echo
echo "Signed APK: $ROOT/$APK"
echo "Checksum:   $ROOT/$APK.sha256"
