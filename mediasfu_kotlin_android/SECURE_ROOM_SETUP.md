# Secure room setup — Kotlin Android 1.0.3

This starter pins `com.mediasfu:mediasfu-sdk-android:1.0.3`. Set `MEDIASFU_BACKEND_BASE_URL` in `app/build.gradle.kts` to the application's HTTPS backend. Implement authenticated create and join routes at `/api/mediasfu/rooms/create` and `/api/mediasfu/rooms/join`, then add the application's short-lived user session header in `RoomBackend.kt`. MediaSFU credentials stay on the backend.

`RoomBackend.create` and `RoomBackend.join` serialize only the SDK payload and return `CreateJoinRoomResult`; `MainActivity` injects both callbacks into `MediasfuGenericOptions`. Invalid URLs and non-success responses produce explicit failures.

Success means an authorized create or join action returns a usable room. Offline state, expired sessions, denial, invalid payloads, malformed JSON, and timeouts must show safe errors.

Before release:

- Exercise create and join on supported Android API levels.
- Test offline, expired-session, denial, malformed-response, and timeout paths.
- Inspect the release APK/AAB and captured request bodies for credential fields.
- Verify leave closes transports and stops camera, microphone, and screen capture.
- Run the offline Kotlin compile, unit tests, lint, and release build from a trusted cache.
