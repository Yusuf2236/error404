#!/usr/bin/env bash
# Build the VIP UZBE Android APK from the command line (no Android Studio needed).
# Uses the local JDK 21 + Android SDK installed under ~/.local. Override either
# path with JAVA_HOME / ANDROID_HOME if you keep them elsewhere.
set -e

export JAVA_HOME="${JAVA_HOME:-$HOME/.local/android-toolchain/jdk-21.0.11+10}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/.local/android-sdk}"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "▶ JAVA_HOME=$JAVA_HOME"
echo "▶ ANDROID_HOME=$ANDROID_HOME"

# Keep the native project in sync with capacitor.config.ts before building.
npx cap sync android

# Ensure the SDK location is recorded for Gradle.
printf 'sdk.dir=%s\n' "$ANDROID_HOME" > android/local.properties

cd android
chmod +x gradlew
./gradlew assembleDebug --no-daemon

APK="app/build/outputs/apk/debug/app-debug.apk"
cp "$APK" "$ROOT/vipuzbe-debug.apk"
echo ""
echo "✅ APK built: $ROOT/vipuzbe-debug.apk"
echo "   Install on a connected device:  adb install -r vipuzbe-debug.apk"
