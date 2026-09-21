# MediaSFU Flutter Quick Start

Flutter starter for building a MediaSFU-powered real-time audio/video room with `mediasfu_sdk@2.3.5`.

Use this app when you want a Dart-based mobile or web meeting room, education app, telehealth flow, creator product, or cross-platform collaboration experience from one Flutter codebase.

## What This App Demonstrates

- Installing the published MediaSFU Flutter SDK from pub.dev.
- Running a MediaSFU room from a Flutter app.
- Routing create and join through an authenticated application backend.
- Moving from prebuilt room UI to custom prejoin, `uiOverrides`, backend hooks, or custom layouts.

## Run

```bash
flutter pub get
flutter run
```

For web:

```bash
flutter run -d chrome
```

For Linux desktop:

```bash
flutter run -d linux
```

## Configure secure room access

Set the HTTPS application-backend URL in `lib/room_backend.dart` and attach the signed-in application's short-lived session in its HTTP layer. MediaSFU credentials never belong in Dart defines or the application bundle. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, observable result, failure cases, teardown, and release checklist.

## UI Paths

Start with `MediasfuGeneric` or `ModernMediasfuGeneric`. Then move to custom prejoin, `uiOverrides`, backend create/join hooks, or no-UI/source-parameter custom layouts.
