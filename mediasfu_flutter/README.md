# MediaSFU Flutter Quick Start

Flutter starter for building a MediaSFU-powered real-time audio/video room with `mediasfu_sdk@2.2.8`.

Use this app when you want a Dart-based mobile or web meeting room, education app, telehealth flow, creator product, or cross-platform collaboration experience from one Flutter codebase.

## What This App Demonstrates

- Installing the published MediaSFU Flutter SDK from pub.dev.
- Running a MediaSFU room from a Flutter app.
- Passing MediaSFU settings with `--dart-define`.
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

## Configure

Flutter does not read `.env` automatically. Pass values with `--dart-define` or generate a local config file:

```bash
flutter run \
  --dart-define=MEDIASFU_API_USERNAME=your_api_username \
  --dart-define=MEDIASFU_API_KEY=your_64_character_api_key \
  --dart-define=MEDIASFU_LOCAL_LINK= \
  --dart-define=MEDIASFU_CONNECT_MEDIASFU=true
```

## Connection Modes

- Cloud only: real credentials, empty local link, `connectMediaSFU=true`.
- Self-hosted CE only: CE URL, `connectMediaSFU=false`.
- CE plus Cloud egress: CE URL, dummy client credentials, backend keeps real credentials.

## UI Paths

Start with `MediasfuGeneric` or `ModernMediasfuGeneric`. Then move to custom prejoin, `uiOverrides`, backend create/join hooks, or no-UI/source-parameter custom layouts.
