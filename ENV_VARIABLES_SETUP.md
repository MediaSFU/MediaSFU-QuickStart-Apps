# Environment Variables Setup Summary

This repo now uses one root environment template for all quick-start apps: `.env.example`.

## Canonical Template

```env
MEDIASFU_API_USERNAME=your_api_username
MEDIASFU_API_KEY=your_64_character_api_key
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

Copy it before running examples:

```bash
cp .env.example .env
```

## App-Specific Notes

- React Native CLI already uses `react-native-dotenv` and can read the root `.env`.
- Vue should expose values as `VITE_MEDIASFU_*` when reading them through `import.meta.env`.
- ReactJS should expose values as `REACT_APP_MEDIASFU_*` when using Create React App env injection.
- Expo should use `EXPO_PUBLIC_MEDIASFU_*` or app config.
- Angular should map values through environment files or a runtime config provider.
- Flutter should receive values through `--dart-define` or a generated local config file.
- Kotlin/Android reads the same names from Gradle properties or process environment variables.

## Security Rule

Real MediaSFU API credentials belong on your backend in production. Client apps can use custom create/join hooks or proxy endpoints so room requests are signed server-side.

## Refresh Status

The old React-Native-only environment setup has been consolidated into the root docs. Keep future SDK-specific env notes short and point back to `ENV_SETUP.md`.
