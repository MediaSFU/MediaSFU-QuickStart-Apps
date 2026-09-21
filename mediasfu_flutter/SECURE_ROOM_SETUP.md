# Secure room setup — Flutter 2.3.5

This starter pins `mediasfu_sdk` `2.3.5` and `http` `1.6.0`. Set the HTTPS application-backend base URL in `lib/room_backend.dart`. Implement authenticated create and join routes at `/api/mediasfu/rooms/create` and `/api/mediasfu/rooms/join`; attach the application's short-lived session in its HTTP layer. MediaSFU credentials stay on the backend.

`createRoomViaBackend` and `joinRoomViaBackend` serialize only the SDK payload and return `CreateJoinRoomResult`. `main.dart` supplies them to the modern UI while retaining the custom-prejoin, seed-data, custom-function, and no-UI examples.

Success means an authorized create or join action returns a usable room response. Invalid URLs, offline state, expired sessions, denied actions, malformed JSON, and timeouts must become safe user-visible failures.

Before release:

- Exercise create and join on every platform you ship.
- Test offline, expired-session, denial, malformed-response, and timeout paths.
- Inspect release artifacts and request bodies for credential fields.
- Verify leave stops microphone, camera, screen capture, and room transports.
- Run `flutter pub get --offline`, `flutter analyze`, tests, and release builds from a trusted cache.
