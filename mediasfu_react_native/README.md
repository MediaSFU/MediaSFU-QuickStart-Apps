# MediaSFU React Native Starter App

This MediaSFU React Native starter application demonstrates how to integrate and use the **MediaSFU** packages within a React Native project, enabling seamless development for both iOS and Android platforms.

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

- **[Node.js](https://nodejs.org/)** (v14 or later)
- **[npm](https://www.npmjs.com/)** (comes with Node.js) or **[Yarn](https://yarnpkg.com/)**
- **[React Native CLI](https://reactnative.dev/docs/environment-setup)**
- **[Xcode](https://developer.apple.com/xcode/)** (for iOS development, macOS only)
- **[Android Studio](https://developer.android.com/studio)** (for Android development)
- **[VS Code](https://code.visualstudio.com/)** or **[Atom](https://atom.io/)** (recommended IDEs)

## Getting Started

### Clone the Repository

If you haven't cloned the main repository yet, do so now:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps/mediasfu_react_native
```
> **Note**: React Native may encounter issues when building from long path names. To avoid potential errors, it's recommended to copy the `mediasfu_react_native` folder to a shorter directory (e.g., `C:/Projects/mediasfu_react_native` on Windows) before proceeding with setup and builds.

### Install Dependencies

Using **npm**:

```bash
npm install
```

Or using **Yarn**:

```bash
yarn install
```

### Run the Application

#### For iOS

Ensure you have Xcode installed. Then, run:

```bash
npx react-native run-ios
```

#### For Android

Ensure you have an Android emulator running or a device connected. Then, run:

```bash
npx react-native run-android
```

The application should now be running on your selected device or emulator.

## Example Modification

This starter app demonstrates how to integrate **MediaSFU** packages within a React Native environment. Follow the steps below to customize the app:

### 1. Primary File of Interest

The primary file you'll be working with is `App.tsx`, located in the root of the project directory. In `App.tsx`, you can customize the app to render various views or enable specific modes based on your development needs. This example assumes you do not yet have your API credentials and will prompt you to scan or enter your meeting details after creating one on the MediaSFU frontend. However, if you do have your credentials, you can configure them as follows:

   - **Update Credentials**: Locate the following line in `App.js`:
     ```javascript
     const credentials = { apiUserName: 'your_api_username', apiKey: 'your_api_key' };
     ```
     Replace `'your_api_username'` and `'your_api_key'` with your actual credentials. This will allow the application to `programmatically make requests to MediaSFU to create/join rooms` (which is the ideal approach).

   - **Rendering Options**: You can configure different render modes:
     ```javascript
     // Uses a pre-join page that requires users to enter credentials
     return <MediasfuGeneric PrejoinPage={PreJoinPage} credentials={credentials} />;
     ```
   
   You have the flexibility to use:
   
   - **Prejoin Page with Credentials**: Configure and use MediaSFU with authenticated access, ideal for production-ready setups.
   - **Local UI Development Mode**: Experiment with MediaSFU components locally without the need for pre-configuration, useful for testing and UI development.


### 2. Additional Customizations

Depending on your project's requirements, you might want to:

- **Customize UI Elements**: Modify styles, layouts, and other UI components to match your application's design.
- **Handle State Management**: Integrate with state management libraries like Redux or Context API for better state handling.
- **Implement Navigation**: Use React Navigation or similar libraries to handle in-app navigation.

Ensure that any additional customizations are aligned with the MediaSFU package requirements and best practices.

## Troubleshooting

- **Port Already in Use**

  If port `8081` (default React Native port) is already in use, you can specify a different port by modifying the command (e.g use 8008):
  
  ```bash
  npx react-native start --reset-cache --port 8008
  ```

- **Dependency Issues**

  If you encounter issues during installation, try deleting `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

  Or with Yarn:

  ```bash
  rm -rf node_modules
  yarn install
  ```

- **iOS Build Issues**

  Ensure that you have the latest Xcode installed and that you have accepted the Xcode license agreements:

  ```bash
  sudo xcodebuild -license
  ```

- **Android Build Issues**

  Ensure that your Android SDK is up to date and that the `ANDROID_HOME` environment variable is set correctly.


- **Clear Android Studio Cache**
  - Open Android Studio.
  - Go to **File** > **Invalidate Caches / Restart**.
  - Select **Invalidate and Restart** to clear cached files and restart Android Studio.

- **Metro Bundler Issues**

  If the Metro bundler hangs or crashes, try resetting the cache:

  ```bash
  npx react-native start --reset-cache
  ```

## Learn More

- **[React Native Documentation](https://reactnative.dev/docs/getting-started)**
- **[MediaSFU Documentation](https://www.mediasfu.com/documentation/)**
- **[React Native CLI](https://reactnative.dev/docs/environment-setup)**
- **[React Navigation](https://reactnavigation.org/)**
- **[Redux Documentation](https://redux.js.org/)** (if using Redux)
- **[Context API](https://reactjs.org/docs/context.html)** (for state management)

---

*Happy Coding with React Native and MediaSFU! 📱🎉*