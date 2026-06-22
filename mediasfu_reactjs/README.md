# MediaSFU ReactJS Quick Start

Create React App starter for building a MediaSFU-powered WebRTC room with `mediasfu-reactjs@4.2.8`.

Use this app when you want a React browser meeting room, webinar room, dashboard embed, education portal, or custom real-time audio/video interface. It starts with the published MediaSFU ReactJS SDK and gives you a working baseline before you add branding, backend hooks, or custom room controls.

## What This App Demonstrates

- Installing MediaSFU from the public npm registry instead of a local tarball.
- Running a ReactJS room with the prebuilt MediaSFU UI.
- Mapping Create React App environment variables into MediaSFU room parameters.
- Moving from prebuilt UI to custom prejoin, `uiOverrides`, or no-UI mode.

## Run

```bash
npm install
npm start
```

Open the local URL printed by CRA, usually `http://localhost:3000`.

## Configure

For CRA environment injection, use `REACT_APP_*` names or map the root `.env` values before passing SDK props:

```env
REACT_APP_MEDIASFU_API_USERNAME=your_api_username
REACT_APP_MEDIASFU_API_KEY=your_64_character_api_key
REACT_APP_MEDIASFU_LOCAL_LINK=
REACT_APP_MEDIASFU_CONNECT_MEDIASFU=true
```

Connection modes match the root README:

- Cloud only: real credentials, empty local link, `connectMediaSFU=true`.
- Self-hosted CE only: CE URL, `connectMediaSFU=false`.
- CE plus Cloud egress: CE URL, dummy client credentials, backend keeps real credentials.

## UI Paths

Start with `ModernMediasfuGeneric` or `MediasfuGeneric` prebuilt UI. After the room flow works, try custom prejoin, `uiOverrides`, backend create/join hooks, or `returnUI=false` with source parameters for a fully custom workspace.

## Notes

The app now uses the registry package instead of a local SDK tarball. For local SDK development, temporarily point `mediasfu-reactjs` at your packed tarball and do not commit that local path.
