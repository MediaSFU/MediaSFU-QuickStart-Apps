# MediaSFU QuickStart Apps

Build real-time audio and video rooms with MediaSFU SDKs for React, Angular, Vue, React Native, Expo, Flutter, Kotlin/Android, Unity, and iOS/KMP bridge paths.

This repository is the fastest way to try MediaSFU Cloud, self-hosted MediaSFU Community Edition, or a hybrid deployment from a working app. It includes runnable quick-start apps for mature SDKs, reference integrations for newer native paths, and practical guidance for prebuilt UI, custom prejoin pages, backend-proxied room creation, and fully custom WebRTC interfaces.

## What You Can Build

- WebRTC video conferencing apps for React, Angular, and Vue.
- Mobile video meeting apps with React Native CLI, React Native Expo, and Flutter.
- Android room experiences with the published Kotlin/Android SDK.
- Custom prejoin flows, branded meeting rooms, and no-UI SDK integrations.
- MediaSFU Cloud, self-hosted CE, and CE plus Cloud egress deployments.
- Production apps that keep MediaSFU API credentials on a backend service.
- Unity and iOS/KMP bridge integrations using the current reference paths.

## Choose Your SDK

| Platform | Folder or guide | Best fit | Status | First command |
| --- | --- | --- | --- | --- |
| ReactJS | [`mediasfu_reactjs`](./mediasfu_reactjs/README.md) | Browser video rooms, dashboards, portals, education, events | Full app | `npm install && npm start` |
| Angular | [`mediasfu_angular`](./mediasfu_angular/README.md) | Enterprise web apps and structured Angular workspaces | Full app | `npm install && npm start` |
| Vue | [`mediasfu_vue`](./mediasfu_vue/README.md) | Vite/Vue apps, creator tools, lightweight web products | Full app | `npm install && npm run dev` |
| React Native CLI | [`mediasfu_react_native`](./mediasfu_react_native/README.md) | Native mobile apps with direct iOS/Android control | Full app | `npm install && npm start` |
| React Native Expo | [`mediasfu_react_native_expo`](./mediasfu_react_native_expo/README.md) | Expo-first mobile apps and fast mobile prototyping | Full app | `npm install && npm start` |
| Flutter | [`mediasfu_flutter`](./mediasfu_flutter/README.md) | Cross-platform mobile/web apps from one Dart codebase | Full app | `flutter pub get && flutter run` |
| Kotlin/Android | [`mediasfu_kotlin_android`](./mediasfu_kotlin_android/README.md) | Android Compose apps using Maven artifacts | Full app | `./gradlew :app:assembleDebug` |
| Unity | [`docs/unity-reference.md`](./docs/unity-reference.md) | Custom Unity scenes and immersive app experiments | Reference | Unity Package Manager |
| iOS/KMP bridge | [`docs/ios-kmp-reference.md`](./docs/ios-kmp-reference.md) | Swift/iOS bridge work from the Kotlin Multiplatform SDK | Reference | Xcode/device validation |

## Quickest Path To A Room

Clone the repo, copy the environment template, then run the app for your framework:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps
cp .env.example .env
cd mediasfu_reactjs
npm install
npm start
```

For mobile and native apps, open the app folder README first because camera, microphone, simulator, emulator, signing, and device permissions vary by platform.

## Configure MediaSFU

All quick-starts share the same deployment model. Start with these canonical variables, then map them to the naming convention required by each framework:

```env
MEDIASFU_API_USERNAME=your_api_username
MEDIASFU_API_KEY=your_64_character_api_key
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

| Variable | What it controls |
| --- | --- |
| `MEDIASFU_API_USERNAME` | MediaSFU Cloud API username for cloud-backed room creation. |
| `MEDIASFU_API_KEY` | MediaSFU Cloud API key. Keep real values out of public client bundles in production. |
| `MEDIASFU_LOCAL_LINK` | Optional self-hosted MediaSFU CE URL, for example `http://localhost:3000`. |
| `MEDIASFU_CONNECT_MEDIASFU` | `true` for Cloud or CE plus Cloud egress, `false` for CE-only mode. |

## Deployment Modes

| Mode | Use when | `localLink` | `connectMediaSFU` | Credential model |
| --- | --- | --- | --- | --- |
| MediaSFU Cloud | You want the fastest hosted room path. | Empty | `true` | Real API username/key during local development. |
| Self-hosted CE | You are running your own Community Edition server. | CE server URL | `false` | Empty or dummy client values, depending on SDK UI requirements. |
| CE plus Cloud egress | You want local CE control with MediaSFU Cloud egress or services. | CE server URL | `true` | Dummy client values; real cloud credentials stay on your backend. |
| Backend proxy | You are shipping a production browser or mobile app. | App-specific | App-specific | Client calls your backend; backend owns the real MediaSFU credentials. |

For production, do not publish real MediaSFU API credentials in JavaScript, mobile bundles, or public repositories. Route create-room and join-room requests through your backend, then pass SDK hooks or endpoint responses into the app.

## Framework Environment Mapping

| App | Typical mapping |
| --- | --- |
| ReactJS / Create React App | `REACT_APP_MEDIASFU_*` variables or a local config mapping from `.env`. |
| Vue / Vite | `VITE_MEDIASFU_*` variables. |
| React Native CLI | `react-native-dotenv` can read the root `.env` values. |
| React Native Expo | `EXPO_PUBLIC_MEDIASFU_*` variables or Expo app config. |
| Angular | Angular environment files or a runtime config provider. |
| Flutter | `--dart-define=MEDIASFU_API_USERNAME=...` or a generated local config layer. |
| Kotlin/Android | Gradle properties or process environment variables with the canonical root names. |

See [`ENV_SETUP.md`](./ENV_SETUP.md) for copy-paste examples and production notes.

## UI Approach

Start with the prebuilt UI first. It verifies credentials, signaling, media permissions, and the basic room lifecycle before you spend time on custom controls.

| Pattern | Use it for |
| --- | --- |
| Prebuilt UI | Fastest working MediaSFU room with default lobby and meeting controls. |
| Custom prejoin | Branded lobby, role selection, display name capture, device selection, or consent screens. |
| `uiOverrides` | Targeted styling, labels, layout options, and component-level customization without rebuilding the room UI. |
| Backend create/join hooks | Secure production flows where the client never sees real cloud credentials. |
| `returnUI=false` or no-UI mode | Fully custom room interfaces that use SDK state, source parameters, and media controls directly. |

The recommended path is: prebuilt UI, custom prejoin, focused `uiOverrides`, backend hooks, then no-UI/custom UI when your product needs total control.

## Current SDK Versions

These versions were checked against the public package registries before the quick-start manifests were updated.

| SDK | Package | Version | Validation path |
| --- | --- | --- | --- |
| ReactJS | `mediasfu-reactjs` | `4.2.8` | `npm install`, `npm run build` |
| Angular | `mediasfu-angular` | `2.2.5` | `npm install`, `npm run build` |
| Vue | `mediasfu-vue` | `1.0.5` | `npm install`, `npm run build` |
| React Native CLI | `mediasfu-reactnative` | `2.3.6` | `npm install`, `npm test`, `npm run lint` |
| React Native Expo | `mediasfu-reactnative-expo` | `2.4.1` | `npm install`, `npx expo-doctor` |
| Flutter | `mediasfu_sdk` | `2.2.8` | `flutter pub get`, `flutter analyze`, `flutter test` |
| Kotlin/Android | `com.mediasfu:mediasfu-sdk-android` | `1.0.3` | `./gradlew :app:assembleDebug` |
| Kotlin Multiplatform | `com.mediasfu:mediasfu-sdk` | `1.0.3` | Reference for KMP/iOS bridge work |
| Unity | `com.mediasfu.unity` | `0.1.0-preview.1` | UPM install and scene integration reference |

Unity and iOS/KMP are intentionally listed as reference integrations until full native media validation is part of the routine release flow.

## App Folder Guide

Each full app includes the same basic journey: install dependencies, configure MediaSFU, run a room, then customize the UI.

- [`mediasfu_reactjs`](./mediasfu_reactjs/README.md): ReactJS browser app using the published `mediasfu-reactjs` package.
- [`mediasfu_angular`](./mediasfu_angular/README.md): Angular app for teams already using Angular modules, services, and environment files.
- [`mediasfu_vue`](./mediasfu_vue/README.md): Vue/Vite app for fast web integration and modern frontend workflows.
- [`mediasfu_react_native`](./mediasfu_react_native/README.md): React Native CLI app for native mobile builds.
- [`mediasfu_react_native_expo`](./mediasfu_react_native_expo/README.md): Expo starter for the Expo-compatible MediaSFU SDK.
- [`mediasfu_flutter`](./mediasfu_flutter/README.md): Flutter app for Dart-based mobile and web experiments.
- [`mediasfu_kotlin_android`](./mediasfu_kotlin_android/README.md): Android Compose app using Maven Central artifacts.
- [`docs/unity-reference.md`](./docs/unity-reference.md): Unity Package Manager and custom-scene reference.
- [`docs/ios-kmp-reference.md`](./docs/ios-kmp-reference.md): Kotlin Multiplatform and Swift bridge reference for iOS.

## Common Troubleshooting

| Symptom | Check |
| --- | --- |
| Room does not create | Confirm `MEDIASFU_API_USERNAME`, `MEDIASFU_API_KEY`, and `MEDIASFU_CONNECT_MEDIASFU`. |
| Self-hosted CE does not connect | Confirm `MEDIASFU_LOCAL_LINK`, CE server reachability, CORS, and HTTP/HTTPS expectations. |
| Camera or microphone is blank | Grant browser or device permissions; on mobile, test on a real device when simulator media support is limited. |
| Mobile build fails after dependency updates | Clean native build caches and rerun install steps for the specific app folder. |
| Expo doctor reports native package warnings | Check the Expo app README and installed SDK compatibility before upgrading Expo. |
| Browser app builds but room is empty | Test first with the prebuilt UI, then add custom prejoin or no-UI code once the base room works. |

## Related MediaSFU Resources

- MediaSFU website: [mediasfu.com](https://www.mediasfu.com/)
- Documentation: [mediasfu.com/docs](https://www.mediasfu.com/docs)
- Community forum: [mediasfu.com/forums](https://www.mediasfu.com/forums)
- MediaSFU GitHub: [github.com/MediaSFU](https://github.com/MediaSFU)
- VOIP reference suite: [github.com/MediaSFU/VOIP](https://github.com/MediaSFU/VOIP)
- Multimodal agents: [github.com/MediaSFU/Agents](https://github.com/MediaSFU/Agents)
- Telephony/SIP docs: [mediasfu.com/telephony](https://mediasfu.com/telephony)

## Contributing

Contributions are welcome. When changing SDK versions, keep the package manifest, lockfile, app README, root version table, and validation command results aligned in the same pull request.

## License

MIT. See [`LICENSE`](./LICENSE).
