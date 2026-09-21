# MediaSFU React Native CLI Quick Start

React Native CLI starter for building a native mobile MediaSFU room with `mediasfu-reactnative@2.4.4`.

Use this app when you need direct Android/iOS project control for a mobile video meeting app, telehealth flow, creator app, field-service workflow, or branded real-time communication product.

## What This App Demonstrates

- Installing the published MediaSFU React Native SDK from npm.
- Running a native mobile room with Metro and platform builds.
- Routing create and join through an authenticated application backend.
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

## Configure secure room access

Set the HTTPS application-backend URL in `roomBackend.ts` and attach the signed-in application's short-lived session in its networking layer. MediaSFU credentials never belong in the mobile app. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, five experience bindings, observable result, failure cases, teardown, and release checklist.

## UI Paths

Start with the SDK prebuilt UI. Then add custom prejoin, backend create/join hooks, `uiOverrides`, or `returnUI=false` plus source parameters for a native custom UI.

## Compatibility

This starter follows the SDK 2.4.4 peer range: React 19.2, React Native 0.86, React Native WebRTC 124.0.8, Reanimated 4.5, and Worklets 0.11. Use a clean native rebuild after changing these versions.
