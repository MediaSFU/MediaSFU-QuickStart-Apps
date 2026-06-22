# MediaSFU Kotlin/Android Quick Start

Android Compose starter for building a MediaSFU-powered room with the published Kotlin/Android SDK.

Use this app when you want a native Android video meeting room, mobile support flow, education app, or custom Kotlin interface backed by MediaSFU Cloud, MediaSFU CE, or a backend-proxied room service.

## What This App Demonstrates

- Installing MediaSFU Android artifacts from Maven Central.
- Running a minimal Android Compose room with `MediasfuGeneric`.
- Passing MediaSFU settings with Gradle properties or environment variables.
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

## Configure

You can pass the same root environment values as Gradle properties or process environment variables:

```bash
MEDIASFU_API_USERNAME=your_api_username
MEDIASFU_API_KEY=your_64_character_api_key
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

For local Gradle properties, create `local.properties` or pass `-P` values:

```bash
./gradlew :app:assembleDebug -PMEDIASFU_API_USERNAME=your_api_username -PMEDIASFU_API_KEY=your_64_character_api_key
```

## Run

Open this folder in Android Studio and run the `app` configuration, or build from the command line:

```bash
./gradlew :app:assembleDebug
```

## Usage Notes

The app mounts `MediasfuGeneric` directly. Start here to validate room connectivity, then move custom controls into your own Compose UI once the default room flow is working.

Connection modes match the rest of this repo:

- Cloud only: real credentials, empty `MEDIASFU_LOCAL_LINK`, `MEDIASFU_CONNECT_MEDIASFU=true`.
- Self-hosted CE only: CE server URL, `MEDIASFU_CONNECT_MEDIASFU=false`.
- CE plus Cloud egress: CE server URL, dummy client credentials, real credentials on your backend.
