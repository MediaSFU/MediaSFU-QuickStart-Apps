# Secure room setup — Expo 2.5.4

This starter pins `mediasfu-reactnative-expo` `2.5.4`. Set the HTTPS application-backend base URL in `roomBackend.ts`. Implement authenticated create and join routes at `/api/mediasfu/rooms/create` and `/api/mediasfu/rooms/join`, and attach the application's short-lived user session in the mobile networking layer. MediaSFU credentials stay on the backend.

The adapter forwards only `options.payload`; the tab screen passes both callbacks to `MediasfuGeneric` while retaining prejoin, prebuilt UI, and no-UI state wiring. Invalid backend URLs and non-success responses throw.

Success means an authorized create or join action returns a usable room. Offline, expired-session, forbidden-action, invalid-payload, and timeout cases must show safe failures without automatic retry loops.

Before release:

- Exercise create and join on the supported Expo targets.
- Test offline mode, expired sessions, denial, malformed responses, and timeouts.
- Inspect release bundles and request bodies for credential fields.
- Verify leave stops microphone, camera, screen capture, and room transports.
- Run Expo type checks and release builds from a trusted dependency cache.
