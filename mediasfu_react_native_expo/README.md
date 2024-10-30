# MediaSFU React Native Expo Starter App

This MediaSFU React Native Expo starter application demonstrates how to integrate and use the **MediaSFU** packages within an Expo-managed React Native project, simplifying development and deployment processes.

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
- **[Expo CLI](https://docs.expo.dev/get-started/installation/)**
- **[Expo Go](https://expo.dev/client)** app installed on your iOS or Android device (optional, for testing on physical devices)

## Getting Started

### Clone the Repository

If you haven't cloned the main repository yet, do so now:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps/mediasfu_react_native_expo
```

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

Start the Expo development server:

```bash
npx expo start
```

This will open the Expo Dev Tools in your browser. From here, you can:

- **Run on Web**: Press `w`
- **Run on Android Emulator**: Press `a`
- **Run on iOS Simulator**: Press `i` (macOS only)
- **Run on Physical Device**: Scan the QR code using the Expo Go app

The application should now be running on your selected device or emulator.

## Example Modification

This starter app demonstrates how to integrate MediaSFU packages within an Expo-managed React Native environment. Follow the steps below to customize the app:

### 1. Primary and Secondary Files of Interest

With the new Expo folder structure, the primary and secondary files you'll be working with are:

- **Primary File**: `./app/(tabs)/index.tsx`
- **Secondary File**: `./app/_layout.tsx`

### 2. Importing the MediaSFU Component

In the **Primary File** (`./app/(tabs)/index.tsx`), you can import and use the MediaSFU component as follows:

```javascript
import { MediasfuGeneric } from 'mediasfu-reactnative-expo';

const App = () => {
  return (
    <MediasfuGeneric />
  );
};


export default App;
```

### 3. Updating the Layout with ThemeProvider

In the **Secondary File** (`./app/_layout.tsx`), wrap the `App` component with the `ThemeProvider` to manage theming based on the user's color scheme:

```javascript
import React from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import App from './(tabs)/index';

const Layout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <App />
    </ThemeProvider>
  );
};

export default Layout;
```

### 4. Configuring MediaSFU Credentials

To enable authenticated access and programmatic requests to MediaSFU, configure your API credentials:

1. **Locate Credentials Configuration**: In `./app/(tabs)/index.tsx` or a dedicated configuration file, add your credentials:

   ```javascript
   const credentials = { apiUserName: 'your_api_username', apiKey: 'your_api_key' };
   ```

2. **Pass Credentials to MediaSFU Component**: Update the MediaSFU component to use the credentials:

   ```javascript
   <MediaSFUComponent credentials={credentials} />
   ```

   This allows the application to programmatically make requests to MediaSFU to create or join rooms, enhancing security and automation.

### 5. Rendering Options

You have the flexibility to configure different rendering modes based on your development needs:

- **Prejoin Page with Credentials**: For authenticated access, ideal for production environments.

  ```javascript
  return (
    <MediaSFUComponent
      preJoinPage={PreJoinPage}
      credentials={credentials}
    />
  );
  ```
  Ensure that the `PreJoinPage` component is properly defined and imported if you choose to use the pre-join page.

- **Local UI Development Mode**: For testing and UI development without pre-configuration.



### 6. Final Configuration

Ensure any necessary credentials or settings are configured based on the [MediaSFU Documentation](https://www.mediasfu.com/documentation/) to enable full functionality of the MediaSFU components.

## Troubleshooting

- **Expo CLI Not Found**

  If you encounter an error related to Expo CLI, install it globally:

  ```bash
  npm install -g expo-cli
  ```

- **Dependency Issues**

  If you encounter issues during installation, try deleting `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

- **Metro Bundler Issues**

  If the Metro bundler hangs or crashes, try resetting the cache:

  ```bash
  npx expo start -c
  ```

## Learn More

- **[Expo Documentation](https://docs.expo.dev/)**
- **[React Native Documentation](https://reactnative.dev/docs/getting-started)**
- **[MediaSFU Documentation](https://www.mediasfu.com/documentation/)**
- **[React Navigation](https://reactnavigation.org/)**
- **[ThemeProvider Documentation](https://reactnavigation.org/docs/themes/)**

---

*Happy Coding with Expo and MediaSFU! 🚀📱*

