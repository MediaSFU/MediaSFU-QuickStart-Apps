# MediaSFU Vue Starter App

This MediaSFU Vue starter application demonstrates how to integrate and use the **MediaSFU** packages effectively within a Vue 3 project.

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

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or later)
- **[npm](https://www.npmjs.com/)** (comes with Node.js) or **[Yarn](https://yarnpkg.com/)**

## Getting Started

### Clone the Repository

If you haven't cloned the main repository yet, do so now:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps/mediasfu_vue
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

Using **npm**:

```bash
npm run dev
```

Or using **Yarn**:

```bash
yarn dev
```

The application should now be running at `http://localhost:5173` (or another available port if 5173 is in use).

## Example Modification

This starter app demonstrates how to integrate MediaSFU packages within a Vue 3 application. Follow the steps below to modify:

1. **Primary File of Interest**

   The primary file you'll be working with is `App.vue`, located in the `src` folder. In `App.vue`, you can customize the app to render various views or enable specific modes based on your development needs. This example assumes you do not yet have your API credentials and will prompt you to scan/enter your meeting details after creating one on the MediaSFU frontend. However, if you do have your credentials, you can configure them as follows:

   - **Update Credentials**: Locate the following lines in `App.vue`:
     ```typescript
     const credentials = {
       apiUserName: 'yourDevUser', // 8 chars recommended for dummy
       apiKey: 'yourDevApiKey1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // 64 chars
     }
     ```
     Replace `'yourDevUser'` and `'yourDevApiKey...'` with your actual credentials. This will allow the application to `programmatically make requests to MediaSFU to create/join rooms` (which is the ideal approach).

   - **Rendering Options**: You can configure different render modes:
     ```vue
     <MediasfuGeneric
       :prejoin-page="PreJoinPage"
       :credentials="credentials"
       :connect-media-s-f-u="connectMediaSFU"
     />
     ```
   
   You have the flexibility to use:
   
   - **Prejoin Page with Credentials**: Configure and use MediaSFU with authenticated access, ideal for production-ready setups.
   - **Local UI Development Mode**: Experiment with MediaSFU components locally without the need for pre-configuration, useful for testing and UI development.
   - **Custom UI Overrides**: The `AppUnique.vue` file demonstrates advanced customization with custom video cards, audio cards, mini cards, and modal overrides.

2. **Configuration**

   Ensure any necessary credentials or settings are configured based on the [MediaSFU Documentation](https://github.com/MediaSFU/MediaSFU-Vue) to enable full functionality of the MediaSFU components.

3. **Advanced Customization**

   For advanced UI customization examples, refer to `AppUnique.vue` which showcases:
   - Custom video, audio, and mini card components
   - Modal overrides (menu, participants, confirm exit, screenboard)
   - UI component overrides (pagination, alerts)
   - Different connection scenarios (cloud, hybrid, CE)

## Troubleshooting

- **Port Already in Use**

  If the default port is already in use, Vite will automatically select the next available port. You can also specify a custom port:

  ```bash
  npm run dev -- --port 3001
  ```

- **Dependency Issues**

  If you encounter issues during installation, try deleting `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

- **TypeScript Errors**

  If you encounter TypeScript errors related to `mediasfu-vue`, ensure the `mediasfu-vue.d.ts` declaration file exists in the `src` folder. This file provides type definitions for the MediaSFU Vue package.

## Learn More

- **[Vue 3 Documentation](https://vuejs.org/)**
- **[Vite Documentation](https://vitejs.dev/)**
- **[MediaSFU Documentation](https://www.mediasfu.com/documentation/)**
- **[MediaSFU Vue Package](https://www.npmjs.com/package/mediasfu-vue)**
- **[MediaSFU Vue GitHub](https://github.com/MediaSFU/MediaSFU-Vue)**

---

*Happy Coding with Vue 3 and MediaSFU! 🎉*
