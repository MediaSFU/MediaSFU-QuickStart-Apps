This Angular starter application demonstrates how to integrate and use the **MediaSFU** packages within an Angular project, providing a robust framework for building dynamic web applications.

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
- **[Angular CLI](https://angular.io/cli)**

## Getting Started

### Clone the Repository

If you haven't cloned the main repository yet, do so now:

```bash
git clone https://github.com/MediaSFU/MediaSFU-QuickStart-Apps.git
cd MediaSFU-QuickStart-Apps/mediasfu_angular
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

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your web browser. The application will automatically reload if you change any of the source files.

## Example Modification

This starter app demonstrates how to integrate MediaSFU packages within an Angular environment. Follow the steps below to modify:

1. **Primary File of Interest**

   The primary file you'll be working with is `AppComponent (app.component.ts)`, located in the `src/app` folder. In `AppComponent`, you can customize the app to render various views or enable specific modes based on your development needs. This example assumes you do not yet have your API credentials and will prompt you to scan or enter your meeting details after creating one on the MediaSFU frontend. However, if you do have your credentials, you can configure them as follows:

   - **Update Credentials**: Locate and add your credentials within the `AppComponent` or the service managing MediaSFU requests:
     ```typescript
     const credentials = { apiUserName: 'your_api_username', apiKey: 'your_api_key' };
     ```
     Replace `'your_api_username'` and `'your_api_key'` with your actual credentials. This will allow the application to `programmatically make requests to MediaSFU to create or join rooms` (the ideal approach).

   - **Rendering Options**: You can configure different render modes directly in `AppComponent`’s template:
     ```html
     <!-- Uses a pre-join page that requires users to enter credentials -->
     <app-mediasfu-generic [PrejoinPage]="PreJoinPage" [credentials]="credentials"></app-mediasfu-generic>
     ```

   You have the flexibility to use:
   
   - **Prejoin Page with Credentials**: Configure and use MediaSFU with authenticated access, ideal for production-ready setups.
   - **Local UI Development Mode**: Experiment with MediaSFU components locally without the need for pre-configuration, useful for testing and UI development.

2. **Configuration**

   Ensure any necessary credentials or settings are configured based on the [MediaSFU Documentation](https://github.com/MediaSFU/MediaSFU-Angular) to enable full functionality of the MediaSFU components.

## Troubleshooting

- **Angular CLI Not Found**

  If you encounter an error related to Angular CLI, install it globally:

  ```bash
  npm install -g @angular/cli
  ```

- **Dependency Issues**

  If you encounter issues during installation, try deleting `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

- **Port Already in Use**

  If port `4200` is already in use, specify a different port:

  ```bash
  ng serve --port 4300
  ```

## Learn More

- **[Angular Documentation](https://angular.io/docs)**
- **[MediaSFU Documentation](https://mediasfu-docs.com/)**
- **[Angular CLI](https://angular.io/cli)**
- **[Angular Material](https://material.angular.io/)** (if applicable)

---

*Happy Coding with Angular and MediaSFU! 🚀🌐*
