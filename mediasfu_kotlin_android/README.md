# MediaSFU Kotlin/Android Quick Start

Android Compose starter for building a MediaSFU-powered room with the published Kotlin/Android SDK.

Use this app when you want a native Android video meeting room, mobile support flow, education app, or custom Kotlin interface backed by MediaSFU Cloud, MediaSFU CE, or a backend-proxied room service.

## What This App Demonstrates

- Installing MediaSFU Android artifacts from Maven Central.
- Running a minimal Android Compose room with `MediasfuGeneric`.
- Routing create and join through an authenticated application backend.
- Validating the Android SDK path before building a fully custom Compose UI.

## Requirements

- Android Studio or Gradle with Android SDK installed
- JDK 17
- Android device or emulator with camera/microphone support

## Install

This sample uses the published Maven artifacts:

```kotlin
implementation("com.mediasfu:mediasfu-sdk-android:1.0.3")
implementation("com.mediasfu:mediasoup-client:1.0.2")
```

## Configure secure room access

Set `MEDIASFU_BACKEND_BASE_URL` in `app/build.gradle.kts` to the application's HTTPS backend and attach the signed-in application's short-lived session in `RoomBackend.kt`. MediaSFU credentials never belong in Gradle properties, BuildConfig, the APK, or the AAB. Follow [Secure room setup](./SECURE_ROOM_SETUP.md) for the exact endpoints, observable result, failure cases, teardown, and release checklist.

## Run

Open this folder in Android Studio and run the `app` configuration, or build from the command line:

```bash
./gradlew :app:assembleDebug
```

## Usage Notes

The app mounts `MediasfuGeneric` directly. Start here to validate room connectivity, then move custom controls into your own Compose UI once the default room flow is working.
