# MediaSFU Flutter Starter App

This MediaSFU Flutter starter application demonstrates how to integrate and use the **MediaSFU** packages within a Flutter project, enabling cross-platform mobile development for both iOS and Android.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Run the Application](#run-the-application)
- [Example Modification](#example-modification)
- [Troubleshooting](#troubleshooting)
- [Learn More](#learn-more)

## Prerequisites

Before you begin, ensure you have the following installed and set up:

- **[Flutter SDK](https://flutter.dev/docs/get-started/install)** (version 2.0 or later)
- **[Dart SDK](https://dart.dev/get-dart)** (comes with Flutter)
- **[Android Studio](https://developer.android.com/studio)** or **[Xcode](https://developer.apple.com/xcode/)** (for iOS development)
- **[VS Code](https://code.visualstudio.com/)** or **[Android Studio](https://developer.android.com/studio)** (recommended IDEs)

## Getting Started

### Clone the Repository

If you haven't cloned the main repository yet, do so now:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps/mediasfu_flutter
```

### Install Dependencies

Fetch the required packages using Flutter's package manager:

```bash
flutter pub get
```

### Run the Application

#### On an Emulator or Physical Device

1. **Start an Emulator**: Launch an Android emulator or connect a physical device.
2. **Run the App**:

   ```bash
   flutter run
   ```

   To avoid a lot of logs in terminal for mobile testing; you may use:
   ```bash
   flutter run | sed '/^.\// { /^\(V\|I\|W\|E\)\/flutter/!d }'
   ```

   This will build and install the app on the selected device.

#### On Web (Optional)

Flutter also supports web deployment. To run the app on a web browser (example: edge browser):

```bash
flutter run -d edge
```

The application should now be running on your selected device or emulator.

## Example Modification

This starter app demonstrates how to integrate **MediaSFU** packages within a Flutter environment. Follow the steps below to customize the app based on your specific development needs.

### 1. Primary and Secondary Files of Interest

In the standard Flutter project structure, the main file of interest for configuring MediaSFU is:

- **Primary File**: `./lib/main.dart`

   In `main.dart`, you can customize the app to render various views or enable specific modes for your integration with MediaSFU. This example assumes you may or may not have API credentials initially. If you don’t, you’ll be prompted to scan or enter your meeting details after creating one on the MediaSFU frontend. However, if you have your credentials, you can programmatically configure them as follows:

### 2. Update Credentials

   To connect the application directly with MediaSFU, locate the following line in `main.dart`:

   ```dart
   final Map<String, dynamic> credentials = {'apiUserName': 'your_api_username', 'apiKey': 'your_api_key'};
   ```

   Replace `'your_api_username'` and `'your_api_key'` with your actual credentials. By setting these, the application can make requests to MediaSFU for creating or joining rooms, which is ideal for seamless, authenticated access.

### 3. Rendering Options

   Flutter allows flexible rendering, and you can configure different views based on your use case. Below are some common configurations:

   - **Pre-Join Page with Credentials**: You can use a pre-join page that requires users to enter credentials before accessing MediaSFU features, making it suitable for production.

     ```dart
     return MaterialApp(
       title: 'Mediasfu App',
       home: MediasfuGeneric(
         PrejoinPage: ({
           required Map<String, dynamic> credentials,
           required Map<String, dynamic> parameters,
         }) {
           return PreJoinPage(credentials: credentials, parameters: parameters);
         },
         credentials: credentials,
       ),
     );
     ```

   - **Local UI Development Mode**: Enable local UI mode for experimenting with MediaSFU components without making server requests. This mode is especially useful for testing and UI development.

     ```dart
     return MaterialApp(
       title: 'Mediasfu UI Dev Mode',
       home: MediasfuGeneric(
         useLocalUIMode: true,
         useSeed: true, // Optionally include seed data if needed
         seedData: seedData, // Pass generated seed data if required
       ),
     );
     ```

### 4. Final Configuration

Ensure any necessary credentials or settings are configured based on the [MediaSFU Documentation](https://www.mediasfu.com/documentation/) to enable full functionality of the MediaSFU components.

## Troubleshooting

- **Flutter SDK Issues**

  Ensure that the Flutter SDK is correctly installed and added to your system's `PATH`. Verify by running:

  ```bash
  flutter doctor
  ```

  Address any issues highlighted by the `flutter doctor` command.

- **Dependency Conflicts**

  If you encounter dependency conflicts, try running:

  ```bash
  flutter pub upgrade
  ```

- **Build Failures**

  Clean the build cache and rebuild:

  ```bash
  flutter clean
  flutter pub get
  flutter run
  ```

- **iOS Build Issues**

  Ensure that you have the latest Xcode installed and that you have accepted the Xcode license agreements:

  ```bash
  sudo xcodebuild -license
  ```

- **Android Build Issues**

  Ensure that your Android SDK is up to date and that the `ANDROID_HOME` environment variable is set correctly.

## Learn More

- **[Flutter Documentation](https://flutter.dev/docs)**
- **[Dart Documentation](https://dart.dev/guides)**
- **[MediaSFU Documentation](https://www.mediasfu.com/documentation/)**
- **[Flutter Packages](https://pub.dev/)**
- **[Flutter Theming](https://flutter.dev/docs/cookbook/design/themes)**

---

*Happy Coding with Flutter and MediaSFU! 🚀📱*
