# MediaSFU Environment Setup

Use the root `.env.example` as the canonical template for all quick-start apps.

```bash
cp .env.example .env
```

## Variables

```env
MEDIASFU_API_USERNAME=your_api_username
MEDIASFU_API_KEY=your_64_character_api_key
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

| Variable | Purpose |
| --- | --- |
| `MEDIASFU_API_USERNAME` | MediaSFU Cloud API username. Keep real values out of committed files. |
| `MEDIASFU_API_KEY` | MediaSFU Cloud API key. Keep real values server-side for production apps. |
| `MEDIASFU_LOCAL_LINK` | Optional self-hosted MediaSFU CE server URL, such as `http://localhost:3000`. |
| `MEDIASFU_CONNECT_MEDIASFU` | `true` for Cloud or CE plus Cloud egress; `false` for CE-only mode. |

## Connection Modes

| Mode | Values |
| --- | --- |
| Cloud only | Real API username/key, empty `MEDIASFU_LOCAL_LINK`, `MEDIASFU_CONNECT_MEDIASFU=true`. |
| Self-hosted CE only | Empty or dummy credentials, CE URL in `MEDIASFU_LOCAL_LINK`, `MEDIASFU_CONNECT_MEDIASFU=false`. |
| CE plus Cloud egress | Dummy client credentials, CE URL in `MEDIASFU_LOCAL_LINK`, `MEDIASFU_CONNECT_MEDIASFU=true`; backend keeps real cloud credentials. |

## Framework Mapping

| App | Mapping |
| --- | --- |
| ReactJS / CRA | Use `REACT_APP_MEDIASFU_*` or map root values in app config before passing SDK props. |
| Vue / Vite | Use `VITE_MEDIASFU_*` variables. |
| React Native CLI | Uses `react-native-dotenv`; current config can read the root `.env`. |
| React Native Expo | Use `EXPO_PUBLIC_MEDIASFU_*` variables or Expo app config. |
| Angular | Use Angular environment files or a runtime config provider. |
| Flutter | Use `--dart-define=MEDIASFU_API_USERNAME=...` or generate a local config file. |
| Kotlin/Android | Pass Gradle properties or environment variables with the same root names. |

## Production Guidance

Do not ship real API credentials in browser or mobile bundles. For production, create backend endpoints that own the real MediaSFU credentials and pass custom create/join hooks to the SDK when the framework supports them.

Use dummy client credentials only when a UI surface requires a credential-shaped value before your backend proxy performs the real request.
