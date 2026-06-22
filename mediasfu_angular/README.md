# MediaSFU Angular Quick Start

Angular starter for building a MediaSFU-powered WebRTC room with `mediasfu-angular@2.2.5`.

Use this app when your product already lives in Angular and you want a working video meeting room, webinar experience, support workflow, or enterprise collaboration page without leaving Angular conventions.

## What This App Demonstrates

- Installing the published MediaSFU Angular SDK from npm.
- Running a MediaSFU room inside an Angular app.
- Mapping Angular environment values into SDK configuration.
- Extending from prebuilt components toward backend hooks or custom UI.

## Run

```bash
npm install
npm start
```

The Angular dev server usually opens at `http://localhost:4200`.

## Configure

Use Angular environment files or an injected runtime config service to map the shared MediaSFU settings:

```ts
export const environment = {
  mediasfuApiUsername: 'your_api_username',
  mediasfuApiKey: 'your_64_character_api_key',
  mediasfuLocalLink: '',
  mediasfuConnectMediaSFU: true,
};
```

## Connection Modes

- Cloud only: real credentials, empty local link, `connectMediaSFU=true`.
- Self-hosted CE only: CE URL, `connectMediaSFU=false`.
- CE plus Cloud egress: CE URL, dummy client credentials, backend keeps real credentials.

## UI Paths

Begin with the prebuilt Angular MediaSFU components. Then add custom component overrides, backend create/join hooks, or no-UI/source-parameter flows when the app needs a fully custom experience.
