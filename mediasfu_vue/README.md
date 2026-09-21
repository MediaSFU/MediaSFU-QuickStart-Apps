# MediaSFU Vue Quick Start

Vue 3 + Vite starter for building a MediaSFU-powered WebRTC room with `mediasfu-vue@1.2.0`.

Use this app when you want a lightweight Vue meeting room, creator tool, live learning product, or real-time collaboration interface that can start from a prebuilt MediaSFU room and grow into a custom Vue experience.

## What This App Demonstrates

- Installing the published MediaSFU Vue SDK from npm.
- Running a MediaSFU room in a Vue 3 + Vite app.
- Routing create and join through an authenticated application backend.
- Moving from prebuilt room UI to custom prejoin, `uiOverrides`, or source-parameter-driven UI.

## Run

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

## Configure secure room access

Implement authenticated same-origin create and join routes before running a room. `src/roomBackend.ts` forwards only the SDK payload; MediaSFU credentials belong on those server routes. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, observable result, failure cases, teardown, and release checklist.

## UI Paths

Use the prebuilt Vue components first. Move to custom prejoin, `uiOverrides`, backend create/join hooks, or source-parameter-driven custom UI after the default room path works.

With the camera on, open the background control and choose **Blur** or an image background. The classic and modern SDK background modals use the room's existing video-publishing lifecycle. Custom browser UIs can use the shared [`applyBackgroundBlur` helper](https://github.com/MediaSFU/MediaSFU-Shared) with current room parameters.
