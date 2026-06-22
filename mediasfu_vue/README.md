# MediaSFU Vue Quick Start

Vue 3 + Vite starter for building a MediaSFU-powered WebRTC room with `mediasfu-vue@1.0.5`.

Use this app when you want a lightweight Vue meeting room, creator tool, live learning product, or real-time collaboration interface that can start from a prebuilt MediaSFU room and grow into a custom Vue experience.

## What This App Demonstrates

- Installing the published MediaSFU Vue SDK from npm.
- Running a MediaSFU room in a Vue 3 + Vite app.
- Mapping `VITE_MEDIASFU_*` variables into room settings.
- Moving from prebuilt room UI to custom prejoin, `uiOverrides`, or source-parameter-driven UI.

## Run

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

## Configure

Vite exposes client variables with the `VITE_` prefix:

```env
VITE_MEDIASFU_API_USERNAME=your_api_username
VITE_MEDIASFU_API_KEY=your_64_character_api_key
VITE_MEDIASFU_LOCAL_LINK=
VITE_MEDIASFU_CONNECT_MEDIASFU=true
```

## Connection Modes

- Cloud only: real credentials, empty local link, `connectMediaSFU=true`.
- Self-hosted CE only: CE URL, `connectMediaSFU=false`.
- CE plus Cloud egress: CE URL, dummy client credentials, backend keeps real credentials.

## UI Paths

Use the prebuilt Vue components first. Move to custom prejoin, `uiOverrides`, backend create/join hooks, or source-parameter-driven custom UI after the default room path works.
