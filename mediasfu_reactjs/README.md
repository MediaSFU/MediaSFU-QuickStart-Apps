# MediaSFU ReactJS Quick Start

Create React App starter for building a MediaSFU-powered WebRTC room with `mediasfu-reactjs@4.3.5`.

Use this app when you want a React browser meeting room, webinar room, dashboard embed, education portal, or custom real-time audio/video interface. It starts with the published MediaSFU ReactJS SDK and gives you a working baseline before you add branding, backend hooks, or custom room controls.

## What This App Demonstrates

- Installing MediaSFU from the public npm registry instead of a local tarball.
- Running a ReactJS room with the prebuilt MediaSFU UI.
- Routing create and join through an authenticated application backend.
- Moving from prebuilt UI to custom prejoin, `uiOverrides`, or no-UI mode.

## Run

```bash
npm install
npm start
```

Open the local URL printed by CRA, usually `http://localhost:3000`.

## Configure secure room access

Implement authenticated same-origin create and join routes before running the room flow. `src/roomBackend.ts` forwards only the SDK payload; MediaSFU credentials belong on those server routes. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, observable result, failure cases, teardown, and release checklist.

## UI Paths

Start with `ModernMediasfuGeneric` or `MediasfuGeneric` prebuilt UI. After the room flow works, try custom prejoin, `uiOverrides`, backend create/join hooks, or `returnUI=false` with source parameters for a fully custom workspace.

## Background blur

With the camera on, open the room's background control and select **Blur**. The SDK applies person-aware blur through its normal camera-publishing lifecycle, so there is no separate video pipeline to add. Image backgrounds remain available in the same control. For custom room layouts, use the SDK's [`ModernBackgroundModal` and headless background guide](https://github.com/MediaSFU/MediaSFU-ReactJS/blob/main/HEADLESS_GUIDE.md).

## Notes

The app now uses the registry package instead of a local SDK tarball. For local SDK development, temporarily point `mediasfu-reactjs` at your packed tarball and do not commit that local path.
