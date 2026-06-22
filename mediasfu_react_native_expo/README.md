# MediaSFU React Native Expo Quick Start

Expo starter for building a MediaSFU-powered mobile room with `mediasfu-reactnative-expo@2.4.1` on the Expo SDK 54 / React 19 line.

Use this app when you want an Expo-first path to a video meeting room, mobile event app, remote support app, or prototype that can graduate into an Expo dev client or native build when WebRTC features require native modules.

## What This App Demonstrates

- Installing the Expo-compatible MediaSFU React Native SDK from npm.
- Running the app through the Expo CLI.
- Mapping `EXPO_PUBLIC_MEDIASFU_*` variables into room settings.
- Understanding when Expo Go is enough and when a dev client or native build is required.

## Run

```bash
npm install
npm start
```

Then choose Android, iOS, or web from the Expo CLI. Native WebRTC flows generally require a dev client or native build, not plain Expo Go.

## Configure

Use Expo public variables or app config:

```env
EXPO_PUBLIC_MEDIASFU_API_USERNAME=your_api_username
EXPO_PUBLIC_MEDIASFU_API_KEY=your_64_character_api_key
EXPO_PUBLIC_MEDIASFU_LOCAL_LINK=
EXPO_PUBLIC_MEDIASFU_CONNECT_MEDIASFU=true
```

## Connection Modes

- Cloud only: real credentials, empty local link, `connectMediaSFU=true`.
- Self-hosted CE only: CE URL, `connectMediaSFU=false`.
- CE plus Cloud egress: CE URL, dummy client credentials, backend keeps real credentials.

## UI Paths

Start with the prebuilt Expo SDK room UI. Use custom prejoin, backend hooks, `uiOverrides`, or `returnUI=false` after the default room flow is stable.

## Dependency Notes

The dependency tree is aligned with Expo SDK 54 and React 19. If you upgrade Expo, rerun `npx expo-doctor` and check the native WebRTC packages before shipping a build.
