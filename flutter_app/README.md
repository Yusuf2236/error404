# VIP UZBE — Flutter App

A native Flutter/Dart client for the VIP UZBE luxury hotel. It reuses the **existing
Next.js backend** (`../`) for bookings, live availability and real-time updates — so
the Flutter app, the web site and the admin panel all share one source of truth.

## Screens
- **Home** — hero, signature suites, why-us highlights
- **Rooms** — filter (all / rooms / suites), live "Booked" badges, pull-to-refresh
- **Room detail** — gallery header, amenities, sticky book bar
- **Book** — full reservation form → `POST /api/bookings`, instant confirmation
- **More** — Services, Gallery, About, Contact, language switch (EN / UZ / RU)

## Real-time
`AppState` opens an SSE connection to the backend's `/api/events`. When anyone books
(web, admin or this app), availability re-pulls automatically and the "Booked" badges
update live — the same mechanism the web site uses.

## Run it
The backend must be running first:
```bash
cd ..            # the Next.js project
npm run dev      # serves on :3000 (and your LAN IP)
```
Then launch the app, pointing it at the backend:
```bash
cd flutter_app

# On this machine (Linux desktop / Chrome):
flutter run -d linux  --dart-define=API_BASE=http://localhost:3000
flutter run -d chrome --dart-define=API_BASE=http://localhost:3000

# On a physical Android phone (same Wi-Fi — use your machine's LAN IP):
flutter run -d <device> --dart-define=API_BASE=http://192.168.20.158:3000

# Android emulator reaches the host at 10.0.2.2:
flutter run -d emulator --dart-define=API_BASE=http://10.0.2.2:3000
```
Without `--dart-define`, `API_BASE` defaults to `http://192.168.20.158:3000`
(see `lib/services/api_service.dart`).

## Build
```bash
flutter build apk --release --dart-define=API_BASE=https://vipuzbe.com
flutter build web        --dart-define=API_BASE=https://vipuzbe.com
```

## Structure
```
lib/
  main.dart            # app + bottom-nav shell
  app_state.dart       # language + live availability (SSE)
  theme.dart           # gold/navy brand theme (matches the web CSS vars)
  models/room.dart
  data/rooms.dart      # ported from ../src/lib/rooms.ts (ids match the backend)
  services/api_service.dart  # availability, createBooking, SSE stream
  widgets/room_card.dart
  screens/*.dart
```
