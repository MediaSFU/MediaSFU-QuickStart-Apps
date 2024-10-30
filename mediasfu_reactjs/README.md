# MediaSFU ReactJS Starter App

This MediaSFU ReactJS starter application demonstrates how to integrate and use the **MediaSFU** packages effectively within a ReactJS project.

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

- **[Node.js](https://nodejs.org/)** (v14 or later)
- **[npm](https://www.npmjs.com/)** (comes with Node.js) or **[Yarn](https://yarnpkg.com/)**

## Getting Started

### Clone the Repository

If you haven't cloned the main repository yet, do so now:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps/mediasfu_reactjs
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
npm start
```

Or using **Yarn**:

```bash
yarn start
```

The application should now be running at `http://localhost:3000`.

## Example Modification

This starter app demonstrates how to integrate MediaSFU packages within a React.js application. Follow the steps below to modify:

1. **Primary File of Interest**

   The primary file you'll be working with is `App.js`, located in the `src` folder. In `App.js`, you can customize the app to render various views or enable specific modes based on your development needs. This example assumes you do not yet have your API credentials and will prompt you to scan/enter your meeting details after creating one on the MediaSFU frontend. However, if you do have your credentials, you can configure them as follows:

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

2. **Configuration**

   Ensure any necessary credentials or settings are configured based on the [MediaSFU Documentation](https://github.com/MediaSFU/MediaSFU-ReactJS) to enable full functionality of the MediaSFU components.


## Troubleshooting

- **Port Already in Use**

  If port `3000` is already in use, you can specify a different port:

  ```bash
  PORT=3001 npm start
  ```

- **Dependency Issues**

  If you encounter issues during installation, try deleting `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

## Learn More

- **[React Documentation](https://reactjs.org/)**
- **[MediaSFU Documentation](https://www.mediasfu.com/documentation/)**
- **[Create React App](https://create-react-app.dev/)**

---

*Happy Coding with React.js and MediaSFU! 🎉*