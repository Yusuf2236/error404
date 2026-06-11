# VIP UZBE — Native App (Capacitor)

The site is wrapped as a native Android app with [Capacitor](https://capacitorjs.com).
Because the app needs a live server (booking APIs + real-time SSE), the native shell
**loads the running site** via `server.url` instead of bundling static files.

## Toolchain (already installed on this machine)
The command-line Android build needs a JDK 21 (the system Java 25 is too new for
Gradle 8.11) and the Android SDK. Both are installed under `~/.local`, no sudo,
no Android Studio:
- JDK 21 → `~/.local/android-toolchain/jdk-21.0.11+10`
- Android SDK (platform-35, build-tools 35, platform-tools) → `~/.local/android-sdk`

`native/build-apk.sh` points at these by default; override with `JAVA_HOME` / `ANDROID_HOME`.

## Point the app at your server
Edit `capacitor.config.ts` → `SERVER_URL`, or override per-command:

```bash
# Local testing on the same Wi-Fi (use your machine's LAN IP):
CAP_SERVER_URL=http://192.168.20.158:3000 npm run cap:sync

# Production:
CAP_SERVER_URL=https://vipuzbe.com npm run cap:sync
```

> For an `https://` production URL you can remove `android:usesCleartextTraffic="true"`
> from `android/app/src/main/AndroidManifest.xml` (it's only needed for plain-http LAN dev).

## Build the APK (no Android Studio)
```bash
npm run dev            # 1. start the site so the app has something to load
npm run cap:apk        # 2. sync + gradlew assembleDebug → ./vipuzbe-debug.apk
```
Then install on a phone (same Wi-Fi as this machine, dev server running):
```bash
adb install -r vipuzbe-debug.apk      # USB debugging on, or:
# just copy vipuzbe-debug.apk to the phone and tap to install
```

> The APK loads `server.url` from `capacitor.config.ts`. The default
> `http://192.168.20.158:3000` is **this machine's current LAN IP** — if your IP
> changes, rebuild with `CAP_SERVER_URL=http://NEW_IP:3000 npm run cap:apk`.
> The Next dev server must be running and reachable from the phone.

### Alternative: Android Studio
`npm run cap:open` opens the project in Android Studio (if installed) → Run ▶.

## What's already configured
- App ID: `com.vipuzbe.app`  ·  Name: **VIP UZBE**
- Gold-crown launcher icons (all densities) + dark adaptive background `#08080c`
- Cleartext enabled for LAN dev; `server.url` drives which site loads
- Splash/offline fallback at `native/www/index.html`

## iOS (optional)
```bash
npm i -D @capacitor/ios && npx cap add ios && npx cap open ios   # needs macOS + Xcode
```
