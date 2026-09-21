# Secure room setup — React Native 2.4.4

This starter pins `mediasfu-reactnative` `2.4.4`. Set the HTTPS application-backend base URL in `roomBackend.ts`, then provide authenticated `POST /api/mediasfu/rooms/create` and `POST /api/mediasfu/rooms/join` routes. Add the signed-in application's short-lived session token in the mobile networking layer; never add MediaSFU credentials to the app.

The adapter passes only `options.payload`. `App.tsx` supplies its callbacks to every selectable experience while preserving the custom cards, workspace, modal overrides, audio overrides, and debug panel. Invalid backend URLs and non-success responses throw before room setup continues.

Success means an authorized user can create and join from the app and receives a usable room response. Offline, expired-session, denied-action, invalid-payload, and timeout cases must show safe errors and leave the user able to retry deliberately.

Before release:

- Test create and join for Generic, Broadcast, Webinar, Conference, and Chat.
- Test offline mode, expired sessions, denial, malformed responses, and timeouts.
- Inspect the release bundle and captured request bodies for credential fields.
- Verify leave closes transports and stops camera, microphone, and screen capture.
- Build both Android and iOS release variants from a trusted dependency cache.
