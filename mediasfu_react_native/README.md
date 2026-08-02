# MediaSFU React Native CLI Quick Start

React Native CLI starter for building a native mobile MediaSFU room with `mediasfu-reactnative@2.3.7`.

Use this app when you need direct Android/iOS project control for a mobile video meeting app, telehealth flow, creator app, field-service workflow, or branded real-time communication product.

## What This App Demonstrates

- Installing the published MediaSFU React Native SDK from npm.
- Running a native mobile room with Metro and platform builds.
- Reading MediaSFU settings from `.env` with `react-native-dotenv`.
- Moving from prebuilt mobile UI to custom prejoin, `uiOverrides`, backend hooks, or no-UI mode.

## Run

```bash
npm install
npm start
```

In another terminal:

```bash
npm run android
# or, on macOS with Xcode/CocoaPods ready:
npm run ios
```

On Windows, keep the project path short if native build tooling hits path-length issues.

## Configure

This app uses `react-native-dotenv` and can read the root `.env` file:

```env
MEDIASFU_API_USERNAME=your_api_username
MEDIASFU_API_KEY=your_64_character_api_key
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

Restart Metro with `npm start -- --reset-cache` after changing env values.

## Connection Modes

- Cloud only: real credentials, empty local link, `connectMediaSFU=true`.
- Self-hosted CE only: CE URL, `connectMediaSFU=false`.
- CE plus Cloud egress: CE URL, dummy client credentials, backend keeps real credentials.

## UI Paths

Start with the SDK prebuilt UI. Then add custom prejoin, backend create/join hooks, `uiOverrides`, or `returnUI=false` plus source parameters for a native custom UI.

## Compatibility

This starter follows the SDK 2.3.7 peer range: React 19.2, React Native 0.86, React Native WebRTC 124.0.8, Reanimated 4.5, and Worklets 0.11. Use a clean native rebuild after changing these versions.
