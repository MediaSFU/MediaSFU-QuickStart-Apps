# MediaSFU React Native Expo Quick Start

Expo starter for building a MediaSFU-powered mobile room with `mediasfu-reactnative-expo@2.5.4` on the Expo SDK 57 / React Native 0.86 line.

Use this app when you want an Expo-first path to a video meeting room, mobile event app, remote support app, or prototype that can graduate into an Expo dev client or native build when WebRTC features require native modules.

## What This App Demonstrates

- Installing the Expo-compatible MediaSFU React Native SDK from npm.
- Starting from `ModernMediasfuGeneric`, the current full-room experience.
- Running the app through the Expo CLI.
- Routing create and join through an authenticated application backend.
- Understanding when Expo Go is enough and when a dev client or native build is required.

## Run

```bash
npm install
npm start
```

Then choose Android, iOS, or web from the Expo CLI. Native WebRTC flows generally require a dev client or native build, not plain Expo Go.

## Configure secure room access

Set the HTTPS application-backend URL in `roomBackend.ts` and attach the signed-in application's short-lived session in its networking layer. MediaSFU credentials never belong in Expo public configuration. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, observable result, failure cases, teardown, and release checklist.

## UI Paths

Start with `ModernMediasfuGeneric`, the prebuilt Expo SDK room UI used by this
starter. Use custom prejoin, backend hooks, `uiOverrides`, or `returnUI=false`
after the default room flow is stable. Follow the published SDK's headless
guide when building a custom room interface.

Expo Web is useful for layout, prejoin, backend-proxy, and browser WebRTC
acceptance. It does not prove Android/iOS camera capture, audio routing,
background behavior, or native teardown. Use an Expo development build on an
emulator/device for those release checks.

## Dependency Notes

The dependency tree is aligned with Expo SDK 57, React 19.2, React Native 0.86, and React Native WebRTC 124.0.8. Native WebRTC flows require a development build or native build; run `npx expo-doctor` after dependency changes.
