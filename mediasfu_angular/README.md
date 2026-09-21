# MediaSFU Angular Quick Start

Angular starter for building a MediaSFU-powered WebRTC room with `mediasfu-angular@2.4.0`.

Use this app when your product already lives in Angular and you want a working video meeting room, webinar experience, support workflow, or enterprise collaboration page without leaving Angular conventions.

## What This App Demonstrates

- Installing the published MediaSFU Angular SDK from npm.
- Running a MediaSFU room inside an Angular app.
- Routing create and join through an authenticated application backend.
- Extending from prebuilt components toward backend hooks or custom UI.

## Run

```bash
npm install
npm start
```

The Angular dev server usually opens at `http://localhost:4200`.

## Configure secure room access

Implement authenticated same-origin create and join routes before running a room. `src/app/room-backend.ts` forwards only the SDK payload; MediaSFU credentials belong on those server routes. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, all five experience bindings, observable result, failure cases, teardown, and release checklist.

## UI Paths

Begin with the prebuilt Angular MediaSFU components. Then add custom component overrides, backend create/join hooks, or no-UI/source-parameter flows when the app needs a fully custom experience.

With the camera on, open the SDK background dialog and choose **Blur** or an image background. For custom browser interfaces, the shared [`applyBackgroundBlur` helper](https://github.com/MediaSFU/MediaSFU-Shared) works with current room parameters and publishes the processed camera feed.
