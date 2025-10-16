/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { useMemo, useState } from 'react';

// optional: import reanimated warning suppression
import './reanimatedConfig.js';

// Import environment variables
import {
  MEDIASFU_API_USERNAME,
  MEDIASFU_API_KEY,
  MEDIASFU_LOCAL_LINK,
  MEDIASFU_CONNECT_MEDIASFU,
} from '@env';

// import { CreateMediaSFURoomOptions, createRoomOnMediaSFU, JoinMediaSFURoomOptions, joinRoomOnMediaSFU, MediasfuGeneric } from 'mediasfu-reactnative';

// // Import specific Mediasfu view components
// import { MediasfuBroadcast } from 'mediasfu-reactnative';
// import { MediasfuChat } from 'mediasfu-reactnative';
// import { MediasfuWebinar } from 'mediasfu-reactnative';
// import { MediasfuConference } from 'mediasfu-reactnative';

// // Import the PreJoinPage component for the Pre-Join Page use case
// import { PreJoinPage, PreJoinPageOptions } from 'mediasfu-reactnative';

// // Import methods for generating random participants, messages, requests, and waiting room lists if using seed data
// import { generateRandomParticipants } from 'mediasfu-reactnative';
// import { generateRandomMessages } from 'mediasfu-reactnative';
// import { generateRandomRequestList } from 'mediasfu-reactnative';
// import { generateRandomWaitingRoomList } from 'mediasfu-reactnative';



// /**
//  * App Component
//  *
//  * This component demonstrates how to:
//  * - Configure credentials for MediaSFU Cloud and/or Community Edition (CE).
//  * - Use MediaSFU with or without a custom server.
//  * - Integrate a pre-join page.
//  * - Return no UI and manage state through sourceParameters, allowing a fully custom frontend.
//  *
//  * Basic instructions:
//  * 1. Set `localLink` to your CE server if you have one, or leave it blank to use MediaSFU Cloud.
//  * 2. Set `connectMediaSFU` to determine whether you're connecting to MediaSFU Cloud services.
//  * 3. Provide credentials if using MediaSFU Cloud (dummy credentials are acceptable in certain scenarios).
//  * 4. If you prefer a custom UI, set `returnUI` to false and handle all interactions via `sourceParameters` and `updateSourceParameters`.
//  * 5. For secure production usage, consider using custom `createMediaSFURoom` and `joinMediaSFURoom` functions to forward requests through your backend.
//  */

// const App = () => {
//   // =========================================================
//   //                API CREDENTIALS CONFIGURATION
//   // =========================================================
//   //
//   // Scenario A: Not using MediaSFU Cloud at all.
//   // - No credentials needed. Just set localLink to your CE server.
//   // Example:
//   /*
//   const credentials = {};
//   // If using localhost; you might need your actual local ip address instead of localhost
//   // const localLink = 'http://100.xx.xx.xx:3000';
//   const localLink = 'http://your-ce-server.com'; //http://localhost:3000
//   const connectMediaSFU = localLink.trim() !== '';
//   */

//   // Scenario B: Using MediaSFU CE + MediaSFU Cloud for Egress only.
//   // - Use dummy credentials (8 chars for userName, 64 chars for apiKey).
//   // - Your CE backend will forward requests with your real credentials.
//   /*
//   const credentials = {
//     apiUserName: 'dummyUsr',
//     apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
//   };

//   // If using localhost; you might need your actual local ip address instead of localhost
//   // const localLink = 'http://100.xx.xx.xx:3000';
//   const localLink = 'http://your-ce-server.com'; //http://localhost:3000
//   const connectMediaSFU = localLink.trim() !== '';
//   */

//   // Scenario C: Using MediaSFU Cloud without your own server.
//   // - For development, use your actual or dummy credentials.
//   // - In production, securely handle credentials server-side and use custom room functions.
//   // - Credentials are read from .env file at the root, with fallback to default values
//   const credentials = {
//     apiUserName: MEDIASFU_API_USERNAME || 'dummyUsr', // 8 chars recommended for dummy
//     apiKey: MEDIASFU_API_KEY || '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // 64 chars
//   };

//   // Local link read from .env file, leave empty if not using your own server
//   const localLink = MEDIASFU_LOCAL_LINK || '';

//   // Connect to MediaSFU Cloud - read from .env file or default to true
//   const connectMediaSFU = MEDIASFU_CONNECT_MEDIASFU
//     ? MEDIASFU_CONNECT_MEDIASFU.toLowerCase() === 'true'
//     : true;

//   // =========================================================
//   //                    UI RENDERING OPTIONS
//   // =========================================================
//   //
//   // If you want a fully custom UI (e.g., a custom layout inspired by WhatsApp):
//   // 1. Set `returnUI = false` to prevent the default MediaSFU UI from rendering.
//   // 2. Provide `noUIPreJoinOptions` to simulate what would have been entered on a pre-join page.
//   // 3. Use `sourceParameters` and `updateSourceParameters` to access and update state/actions.
//   // 4. No need for any of the above if you're using the default MediaSFU UI.
//   //
//   // Example noUIPreJoinOptions:
//   const noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
//     action: 'create',
//     capacity: 10,
//     duration: 15,
//     eventType: 'broadcast',
//     userName: 'Prince',
//   };

//   // Example for joining a room:
//   // const noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
//   //   action: 'join',
//   //   userName: 'Prince',
//   //   meetingID: 'yourMeetingID'
//   // };

//   const returnUI = true; // Set to false for custom UI, true for default MediaSFU UI

//   const [sourceParameters, setSourceParameters] = useState<{ [key: string]: any }>({});
//   const updateSourceParameters = (data: { [key: string]: any }) => {
//     setSourceParameters(data);
//   };

//   // =========================================================
//   //                CUSTOM ROOM FUNCTIONS (OPTIONAL)
//   // =========================================================
//   //
//   // To securely forward requests to MediaSFU:
//   // - Implement custom `createMediaSFURoom` and `joinMediaSFURoom` functions.
//   // - These functions send requests to your server, which then communicates with MediaSFU Cloud.
//   //
//   // Already imported `createRoomOnMediaSFU` and `joinRoomOnMediaSFU` are examples.
//   //
//   // If using MediaSFU CE backend, ensure your server endpoints:
//   // - Validate dummy credentials.
//   // - Forward requests to mediasfu.com with real credentials.

//   // =========================================================
//   //              CHOOSE A USE CASE / COMPONENT
//   // =========================================================
//   //
//   // Multiple components are available depending on your event type:
//   // MediasfuBroadcast, MediasfuChat, MediasfuWebinar, MediasfuConference
//   //
//   // By default, we'll use MediasfuGeneric with custom settings.



//   // =========================================================
//   //                    RENDER COMPONENT
//   // =========================================================
//   //
//   // The MediasfuGeneric component is used by default.
//   // You can replace it with any other component based on your event type.
//   // Example: <MediasfuBroadcast ... />
//   // Example: <MediasfuChat ... />
//   // Example: <MediasfuWebinar ... />
//   // Example: <MediasfuConference ... />
//   //
//   // The PreJoinPage component is displayed if `returnUI` is true.
//   // If `returnUI` is false, `noUIPreJoinOptions` is used as a substitute.
//   // You can also use `sourceParameters` to interact with MediaSFU functionalities directly.
//   // Avoid using `useLocalUIMode` or `useSeed` in new implementations.
//   // Ensure that real credentials are not exposed in the frontend.
//   // Use HTTPS and secure backend endpoints for production.

//   // Example of MediaSFU CE with no MediaSFU Cloud
//   // return (
//   //   <MediasfuGeneric
//   //     PrejoinPage={PreJoinPage}
//   //     localLink={localLink}
//   //     />
//   // );

//   // Example of MediaSFU CE + MediaSFU Cloud for Egress only
//   // return (
//   //   <MediasfuGeneric
//   //     PrejoinPage={PreJoinPage}
//   //     credentials={credentials}
//   //     localLink={localLink}
//   //     connectMediaSFU={connectMediaSFU}
//   //     />
//   // );

//   // Example of MediaSFU Cloud only
//   // return (
//   //   <MediasfuGeneric
//   //     PrejoinPage={PreJoinPage}
//   //     credentials={credentials}
//   //     connectMediaSFU={connectMediaSFU}
//   //     />
//   // );

//   // Example of MediaSFU CE + MediaSFU Cloud for Egress only with custom UI
//   // return (
//   //   <MediasfuGeneric
//   //     PrejoinPage={PreJoinPage}
//   //     credentials={credentials}
//   //     localLink={localLink}
//   //     connectMediaSFU={connectMediaSFU}
//   //     returnUI={false}
//   //     noUIPreJoinOptions={noUIPreJoinOptions}
//   //     sourceParameters={sourceParameters}
//   //     updateSourceParameters={updateSourceParameters}
//   //     createMediaSFURoom={createRoomOnMediaSFU}
//   //     joinMediaSFURoom={joinRoomOnMediaSFU}
//   //   />

//   // Example of MediaSFU Cloud only with custom UI
//   // return (
//   //   <MediasfuGeneric
//   //     PrejoinPage={PreJoinPage}
//   //     credentials={credentials}
//   //     connectMediaSFU={connectMediaSFU}
//   //     returnUI={false}
//   //     noUIPreJoinOptions={noUIPreJoinOptions}
//   //     sourceParameters={sourceParameters}
//   //     updateSourceParameters={updateSourceParameters}
//   //     createMediaSFURoom={createRoomOnMediaSFU}
//   //     joinMediaSFURoom={joinRoomOnMediaSFU}
//   //   />

//   // Example of using MediaSFU CE only with custom UI
//   // return (
//   //   <MediasfuGeneric
//   //     PrejoinPage={PreJoinPage}
//   //     localLink={localLink}
//   //     connectMediaSFU={false}
//   //     returnUI={false}
//   //     noUIPreJoinOptions={noUIPreJoinOptions}
//   //     sourceParameters={sourceParameters}
//   //     updateSourceParameters={updateSourceParameters}
//   //   />


//   return (
//     <MediasfuGeneric
//       // This pre-join page can be displayed if `returnUI` is true.
//       // If `returnUI` is false, `noUIPreJoinOptions` is used as a substitute.
//       PrejoinPage={PreJoinPage}
//       credentials={credentials}
//       localLink={localLink}
//       connectMediaSFU={connectMediaSFU}
//       returnUI={returnUI}
//       noUIPreJoinOptions={!returnUI ? noUIPreJoinOptions : undefined}
//       sourceParameters={!returnUI ? sourceParameters : undefined}
//       updateSourceParameters={!returnUI ? updateSourceParameters : undefined}
//       createMediaSFURoom={createRoomOnMediaSFU} // no need to specify if not using custom functions
//       joinMediaSFURoom={joinRoomOnMediaSFU} // no need to specify if not using custom functions
//     />
//   );
// };

// export default App;

// /**
//  * =========================================================
//  *                     ADDITIONAL NOTES
//  * =========================================================
//  *
//  * Handling Core Methods:
//  * Once `sourceParameters` is populated, you can call core methods like `clickVideo` or `clickAudio` directly:
//  * Example:
//  * sourceParameters.clickVideo({ ...sourceParameters });
//  * sourceParameters.clickAudio({ ...sourceParameters });
//  *
//  * This allows your custom UI to directly interact with MediaSFU functionalities.
//  *
//  * Deprecated Features (Seed Data):
//  * The seed data generation feature is deprecated. Avoid using `useLocalUIMode` or `useSeed` in new implementations.
//  *
//  * Security Considerations:
//  * - Do not expose real credentials in your frontend code in production.
//  * - Use HTTPS and secure backend endpoints.
//  * - Validate inputs and handle errors gracefully.
//  *
//  * Example CE Backend Setup:
//  * If using MediaSFU CE + MediaSFU Cloud, your backend might look like this:
//  *
//  * app.post("/createRoom", async (req, res) => {
//  *   // Validate incoming dummy credentials
//  *   // Forward request to mediasfu.com with real credentials
//  * });
//  *
//  * app.post("/joinRoom", async (req, res) => {
//  *   // Validate incoming dummy credentials
//  *   // Forward request to mediasfu.com with real credentials
//  * });
//  *
//  * By doing so, you keep real credentials secure on your server.
//  *
//  * End of Guide.
//  */



// /**
//  * =======================
//  * ====== EXTRA NOTES ======
//  * =======================
//  *
//  * ### Handling Core Methods
//  * With `sourceParameters`, you can access core methods such as `clickVideo` and `clickAudio`:
//  *
//  * ```typescript
//  * sourceParameters.clickVideo({ ...sourceParameters });
//  * sourceParameters.clickAudio({ ...sourceParameters });
//  * ```
//  *
//  * This allows your custom UI to interact with MediaSFU's functionalities seamlessly.
//  *
//  * ### Seed Data (Deprecated)
//  * The seed data functionality is deprecated and maintained only for legacy purposes.
//  * It is recommended to avoid using it in new implementations.
//  *
//  * ### Security Considerations
//  * - **Protect API Credentials:** Ensure that API credentials are not exposed in the frontend. Use environment variables and secure backend services to handle sensitive information.
//  * - **Use HTTPS:** Always use HTTPS to secure data transmission between the client and server.
//  * - **Validate Inputs:** Implement proper validation and error handling on both client and server sides to prevent malicious inputs.
//  *
//  * ### Custom Backend Example for MediaSFU CE
//  * Below is an example of how to set up custom backend endpoints for creating and joining rooms using MediaSFU CE:
//  *
//  * ```javascript
//  * // Endpoint for `createRoom`
//  * app.post("/createRoom", async (req, res) => {
//  *   try {
//  *     const payload = req.body;
//  *     const [apiUserName, apiKey] = req.headers.authorization
//  *       .replace("Bearer ", "")
//  *       .split(":");
//  *
//  *     // Verify temporary credentials
//  *     if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
//  *       return res.status(401).json({ error: "Invalid or expired credentials" });
//  *     }
//  *
//  *     const response = await fetch("https://mediasfu.com/v1/rooms/", {
//  *       method: "POST",
//  *       headers: {
//  *         "Content-Type": "application/json",
//  *         Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
//  *       },
//  *       body: JSON.stringify(payload),
//  *     });
//  *
//  *     const result = await response.json();
//  *     res.status(response.status).json(result);
//  *   } catch (error) {
//  *     console.error("Error creating room:", error);
//  *     res.status(500).json({ error: "Internal server error" });
//  *   }
//  * });
//  *
//  * // Endpoint for `joinRoom`
//  * app.post("/joinRoom", async (req, res) => {
//  *   try {
//  *     const payload = req.body;
//  *     const [apiUserName, apiKey] = req.headers.authorization
//  *       .replace("Bearer ", "")
//  *       .split(":");
//  *
//  *     // Verify temporary credentials
//  *     if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
//  *       return res.status(401).json({ error: "Invalid or expired credentials" });
//  *     }
//  *
//  *     const response = await fetch("https://mediasfu.com/v1/rooms", {
//  *       method: "POST",
//  *       headers: {
//  *         "Content-Type": "application/json",
//  *         Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
//  *       },
//  *       body: JSON.stringify(payload),
//  *     });
//  *
//  *     const result = await response.json();
//  *     res.status(response.status).json(result);
//  *   } catch (error) {
//  *     console.error("Error joining room:", error);
//  *     res.status(500).json({ error: "Internal server error" });
//  *   }
//  * });
//  * ```
//  *
//  * ### Custom Room Function Implementation
//  * Below are examples of how to implement custom functions for creating and joining rooms securely:
//  *
//  * ```typescript
//  * import { CreateJoinRoomError, CreateJoinRoomResponse, CreateJoinRoomType, CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';
//  *
//  *
//  * Async function to create a room on MediaSFU.
//  *
//  * @param {object} options - The options for creating a room.
//  * @param {CreateMediaSFURoomOptions} options.payload - The payload for the API request.
//  * @param {string} options.apiUserName - The API username.
//  * @param {string} options.apiKey - The API key.
//  * @param {string} options.localLink - The local link.
//  * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
//  * export const createRoomOnMediaSFU: CreateJoinRoomType = async ({
//  *     payload,
//  *     apiUserName,
//  *     apiKey,
//  *     localLink = '',
//  * }) => {
//  *     try {
//  *         let finalLink = 'https://mediasfu.com/v1/rooms/';
//  *
//  *         // Update finalLink if using a local server
//  *         if (localLink) {
//  *             finalLink = `${localLink}/createRoom`;
//  *         }
//  *
//  *         const response = await fetch(finalLink, {
//  *             method: 'POST',
//  *             headers: {
//  *                 'Content-Type': 'application/json',
//  *                 Authorization: `Bearer ${apiUserName}:${apiKey}`,
//  *             },
//  *             body: JSON.stringify(payload),
//  *         });
//  *
//  *         if (!response.ok) {
//  *             throw new Error(`HTTP error! Status: ${response.status}`);
//  *         }
//  *
//  *         const data: CreateJoinRoomResponse = await response.json();
//  *         return { data, success: true };
//  *     } catch (error) {
//  *         const errorMessage = (error as Error).message || 'unknown error';
//  *         return {
//  *             data: { error: `Unable to create room, ${errorMessage}` },
//  *             success: false,
//  *         };
//  *     }
//  * };
//  *
// *
// *  Async function to join a room on MediaSFU.
// *
// *  @param {object} options - The options for joining a room.
// *  @param {JoinMediaSFURoomOptions} options.payload - The payload for the API request.
// *  @param {string} options.apiUserName - The API username.
// *  @param {string} options.apiKey - The API key.
// *  @param {string} options.localLink - The local link.
// *  @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
// *
// * export const joinRoomOnMediaSFU: JoinRoomOnMediaSFUType = async ({
// *     payload,
// *     apiUserName,
// *     apiKey,
// *     localLink = '',
// * }) => {
// *     try {
// *         let finalLink = 'https://mediasfu.com/v1/rooms/join';
// *
// *         // Update finalLink if using a local server
// *         if (localLink) {
// *             finalLink = `${localLink}/joinRoom`;
// *         }
// *
// *         const response = await fetch(finalLink, {
// *             method: 'POST',
// *             headers: {
// *                 'Content-Type': 'application/json',
// *                 Authorization: `Bearer ${apiUserName}:${apiKey}`,
// *             },
// *             body: JSON.stringify(payload),
// *         });
// *
// *         if (!response.ok) {
// *             throw new Error(`HTTP error! Status: ${response.status}`);
// *         }
// *
// *         const data: CreateJoinRoomResponse = await response.json();
// *         return { data, success: true };
// *     } catch (error) {
// *         const errorMessage = (error as Error).message || 'unknown error';
// *         return {
// *             data: { error: `Unable to join room, ${errorMessage}` },
// *             success: false,
// *         };
// *     }
// * };
// * ```
// *
// * ### Example Usage of Core Methods
// * Core methods like `clickVideo` and `clickAudio` can now be accessed through `sourceParameters`:
// *
// * ```typescript
// * // Example of toggling video
// * sourceParameters.clickVideo({ ...sourceParameters });
// *
// * // Example of toggling audio
// * sourceParameters.clickAudio({ ...sourceParameters });
// * ```
// *
// * These methods allow your custom UI to interact with MediaSFU's functionalities seamlessly.
// *
// * ========================
// * ====== END OF GUIDE ======
// * ========================
// */


//------------------------------------- End of Basic Usage Parts ------------------------------------//
//------------------------------------- End of Basic Usage Parts ------------------------------------//



//------------------------------------- Start of Cookbook Parts -------------------------------------//
//------------------------------------- Start of Cookbook Parts -------------------------------------//
//------------------------------------- AppUnique.tsx duplicates this part as well-------------------//



import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuChat,
  MediasfuWebinar,
  MediasfuConference,
  PreJoinPage,
  MainContainerComponent,
  Pagination,
  AlertComponent,
  MenuModal,
  ParticipantsModal,
  ConfirmExitModal,
  VideoCard,
  AudioCard,
  MiniCard,
  MiniAudio,
  MiniAudioPlayer,
  createRoomOnMediaSFU,
  joinRoomOnMediaSFU,
  CreateMediaSFURoomOptions,
  JoinMediaSFURoomOptions,
  CustomVideoCardType,
  CustomAudioCardType,
  CustomMiniCardType,
  CustomComponentType,
  MediasfuUICustomOverrides,
  Participant,
  MediasfuGenericOptions,
  CardVideoDisplay,
} from 'mediasfu-reactnative';


// -----------------------------------------------------------------------------
// Toggle Section
// -----------------------------------------------------------------------------
type ConnectionScenario = 'cloud' | 'hybrid' | 'ce';
type ExperienceKey = 'generic' | 'broadcast' | 'webinar' | 'conference' | 'chat';

// Switch deployment target: 'cloud' | 'hybrid' | 'ce'
const connectionScenario: ConnectionScenario = 'cloud';

// Select which prebuilt experience to render by default
// Options: 'generic', 'broadcast', 'webinar', 'conference', 'chat'
const selectedExperience: ExperienceKey = 'generic';

// UI strategy toggles
const showPrebuiltUI = true;           // Set false to bypass the default UI entirely
const enableFullCustomUI = false;      // Set true to mount the CustomWorkspace instead of MediaSFU UI
const enableNoUIPreJoin = !showPrebuiltUI || enableFullCustomUI; // auto-calculated helper

// Layered customization toggles
const enableCardBuilders = true;       // Enables custom video/audio/mini card components
const enableUICoreOverrides = false;    // Enables layout-centric overrides via uiOverrides
const enableModalOverrides = true;     // Enables modal overrides via uiOverrides
const enableAudioComponentOverrides = true; // Enables MiniAudio and MiniAudioPlayer overrides
const enableContainerStyling = true;   // Applies a custom containerStyle
const enableBackendProxyHooks = true;  // Hooks create/join calls through helper functions
const enableDebugPanel = true;         // Renders a JSON panel of live parameters on the right

const connectionPresets: Record<ConnectionScenario, {
  credentials?: { apiUserName: string; apiKey: string };
  localLink: string;
  connectMediaSFU: boolean;
}> = {
  cloud: {
    credentials: {
      apiUserName: 'dummyUsr',
      apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    localLink: '',
    connectMediaSFU: true,
  },
  hybrid: {
    credentials: {
      apiUserName: 'dummyUsr',
      apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    localLink: 'http://localhost:3000',
    connectMediaSFU: true,
  },
  ce: {
    credentials: undefined,
    localLink: 'http://localhost:3000',
    connectMediaSFU: false,
  },
};

const experienceComponentMap: Record<ExperienceKey, React.ComponentType<MediasfuGenericOptions>> = {
  generic: MediasfuGeneric,
  broadcast: MediasfuBroadcast,
  webinar: MediasfuWebinar,
  conference: MediasfuConference,
  chat: MediasfuChat,
};

// -----------------------------------------------------------------------------
// Demo Custom Components (Cards + Full UI) - React Native Version
// -----------------------------------------------------------------------------
// Simple styled wrappers - just add custom borders and shadows around default rendering


const ShowcaseAudioCard: CustomAudioCardType = (props) => {
  // Just pass custom style props - simplest approach
  return (
    <AudioCard
      {...props.parameters}
      name={props.name}
      barColor="#22c55e"
      textColor="#ffffff"
      imageSource={props.imageSource}
      roundedImage={props.roundedImage}
      customStyle={{
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#22c55e',
        backgroundColor: '#1f2937',
        shadowColor: '#15803d',
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        elevation: 10,
        overflow: 'hidden',
      }}
    />
  );
};

const ShowcaseMiniCard: CustomMiniCardType = (props) => {
  // Just pass custom style props - simplest approach
  return (
    <MiniCard
      {...props.parameters}
      initials={props.initials}
      fontSize={typeof props.fontSize === 'number' ? props.fontSize : typeof props.fontSize === 'string' ? parseInt(props.fontSize, 10) : 14}
      name={props.name}
      showVideoIcon={props.showVideoIcon}
      showAudioIcon={props.showAudioIcon}
      imageSource={props.imageSource}
      roundedImage={props.roundedImage}
      customStyle={[
        props.customStyle,
        {
          borderRadius: 16,
          borderWidth: 2,
          borderColor: '#f59e0b',
          backgroundColor: '#fff7ed',
          overflow: 'hidden',
        },
      ]}
    />
  );
};

const ShowcaseMiniAudio = (props: React.ComponentProps<typeof MiniAudio>) => {
  return (
    <MiniAudio
      {...props}
      customStyle={[
        props.customStyle,
        {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: 8,
          padding: 4,
        },
      ]}
    />
  );
};

const ShowcaseMiniAudioPlayer = (props: React.ComponentProps<typeof MiniAudioPlayer>) => {
  return (
    <MiniAudioPlayer
      {...props}
      MiniAudioComponent={ShowcaseMiniAudio}
    />
  );
};

const CustomWorkspace: CustomComponentType = ({ parameters }) => {
  const {
    roomName,
    participants,
    islevel,
    meetingID,
    showAlert,
    toggleMenuModal,
  } = parameters;

  return (
    <View style={styles.workspaceContainer}>
      {/* Header */}
      <View style={styles.workspaceHeader}>
        <Text style={styles.workspaceTitle}>Custom Workspace</Text>
        <Text style={styles.workspaceSubtitle}>
          Room <Text style={styles.bold}>{roomName || 'Unnamed room'}</Text> · Meeting ID{' '}
          <Text style={styles.bold}>{meetingID || 'pending'}</Text> · Your role level:{' '}
          <Text style={styles.bold}>{islevel || 'viewer'}</Text>
        </Text>
      </View>

      <View style={styles.workspaceContent}>
        {/* Sidebar */}
        <View style={styles.workspaceSidebar}>
          <Text style={styles.sidebarTitle}>Participants ({participants?.length ?? 0})</Text>
          <ScrollView style={styles.participantsList}>
            {(participants ?? []).map((person: Participant) => (
              <View key={person.id ?? person.name} style={styles.participantCard}>
                <Text style={styles.participantName}>{person.name}</Text>
                <Text style={styles.participantLevel}>Level {person.islevel ?? 'n/a'}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.workspaceMain}>
          <View style={styles.controlsSection}>
            <Text style={styles.controlsTitle}>Custom Controls</Text>
            <Text style={styles.controlsDescription}>
              Trigger native alerts, switch MediaSFU menus, or call any exposed helper via parameters.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.successButton}
                onPress={() =>
                  showAlert?.({ message: 'Custom workspace calling back into MediaSFU!', type: 'success' })
                }
              >
                <Text style={styles.successButtonText}>Trigger success toast</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => toggleMenuModal?.({ showMenuModal: true })}
              >
                <Text style={styles.secondaryButtonText}>Open menu modal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.footer}>
            Built using customComponent. Disable enableFullCustomUI to fall back to the standard UI.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const EnhancedMainContainer: React.FC<React.ComponentProps<typeof MainContainerComponent>> = (props) => (
  <View style={styles.enhancedMainContainer}>
    <Text style={styles.enhancedMainContainerLabel}>
      Custom main container wrapper (uiOverrides.mainContainer)
    </Text>
    <MainContainerComponent {...props} />
  </View>
);

const EnhancedPagination: React.FC<React.ComponentProps<typeof Pagination>> = (props) => (
  <View style={styles.enhancedPaginationContainer}>
    <Text style={styles.enhancedPaginationLabel}>Custom pagination shell</Text>
    <Pagination {...props} />
  </View>
);

// Note: These enhanced components are simplified for React Native
// The original web version used prop drilling (containerProps, contentProps, etc.)
// which is not supported in the React Native versions of these components.
// For React Native, you would need to use the customComponent approach instead
// to achieve similar styling customization.

const EnhancedAlert: React.FC<React.ComponentProps<typeof AlertComponent>> = (props) => (
  <View style={{
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(249, 115, 22, 0.6)',
    overflow: 'hidden',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.25,
    shadowRadius: 38,
    elevation: 8,
  }}>
    <AlertComponent {...props} />
  </View>
);

const FrostedMenuModal: React.FC<React.ComponentProps<typeof MenuModal>> = (props) => (
  <View style={{
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.35)',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.35,
    shadowRadius: 60,
    elevation: 12,
    overflow: 'hidden',
  }}>
    <MenuModal {...props} />
  </View>
);

const NeonParticipantsModal: React.FC<React.ComponentProps<typeof ParticipantsModal>> = (props) => (
  <View style={{
    borderRadius: 26,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.35)',
    overflow: 'hidden',
  }}>
    <ParticipantsModal {...props} />
  </View>
);

const SoftConfirmExitModal: React.FC<React.ComponentProps<typeof ConfirmExitModal>> = (props) => (
  <View style={{
    borderRadius: 24,
    backgroundColor: '#fdf2f8',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.35)',
    overflow: 'hidden',
  }}>
    <ConfirmExitModal {...props} />
  </View>
);

// Note: ScreenboardModal component not available in this SDK version
// const SlateScreenboardModal: React.FC<React.ComponentProps<typeof ScreenboardModal>> = (props) => (
//   <ScreenboardModal
//     {...props}
//     backgroundColor={props.backgroundColor ?? 'rgba(15, 23, 42, 0.9)'}
//     position={props.position ?? 'center'}
//   />
// );





// -----------------------------------------------------------------------------
// AppUnique Component
// -----------------------------------------------------------------------------
const AppUnique: React.FC = () => {
  const [sourceParameters, setSourceParameters] = useState<{ [key: string]: any }>({});
  const updateSourceParameters = (data: { [key: string]: any }) => {
    setSourceParameters(data);
  };

  // ---------------------------------------------------------------------------
  // Connection Scenarios
  // ---------------------------------------------------------------------------
  const preset = connectionPresets[connectionScenario];
  const { credentials, localLink, connectMediaSFU } = preset;

  // When the UI is bypassed, simulate pre-join input here
  const noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | undefined = enableNoUIPreJoin
    ? {
        action: 'create',
        capacity: 12,
        duration: 30,
        eventType: 'conference',
        userName: 'Demo Host',
      }
    : undefined;

  const cardOverrides = useMemo<
    Partial<Pick<MediasfuGenericOptions, 'customVideoCard' | 'customAudioCard' | 'customMiniCard'>>
  >(() => {
    if (!enableCardBuilders) {
      return {};
    }

    return {
      customAudioCard: ShowcaseAudioCard,
      customMiniCard: ShowcaseMiniCard,
    };
  }, []);

  const uiOverrides = useMemo<MediasfuUICustomOverrides | undefined>(() => {
    if (!enableUICoreOverrides && !enableModalOverrides && !enableAudioComponentOverrides) {
      return undefined;
    }

    const overrides: MediasfuUICustomOverrides = {};

    if (enableUICoreOverrides) {
      overrides.mainContainer = EnhancedMainContainer;
      overrides.pagination = EnhancedPagination;
      overrides.alert = EnhancedAlert;
    }

    if (enableModalOverrides) {
      overrides.menuModal = FrostedMenuModal;
      overrides.participantsModal = NeonParticipantsModal;
      overrides.confirmExitModal = SoftConfirmExitModal;
      // overrides.screenboardModal = SlateScreenboardModal; // Not available
    }

    if (enableAudioComponentOverrides) {
      overrides.miniAudio = ShowcaseMiniAudio;
      overrides.miniAudioPlayer = ShowcaseMiniAudioPlayer;
    }

    return Object.keys(overrides).length > 0 ? overrides : undefined;
  }, []);

  const containerStyle = enableContainerStyling
    ? {
        backgroundColor: '#e0f2fe',
        borderRadius: 32,
        padding: 12,
        paddingBottom: 24,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.18,
        shadowRadius: 48,
        elevation: 10,
      }
    : undefined;

  const ExperienceComponent = experienceComponentMap[selectedExperience];

  const preJoinRenderer = showPrebuiltUI
    ? (options: React.ComponentProps<typeof PreJoinPage>) => <PreJoinPage {...options} />
    : undefined;

  const customComponent = enableFullCustomUI ? CustomWorkspace : undefined;

  return (
      <ExperienceComponent
        PrejoinPage={preJoinRenderer}
        localLink={localLink}
        connectMediaSFU={connectMediaSFU}
        credentials={credentials}
        // returnUI={!enableFullCustomUI && showPrebuiltUI}
        // noUIPreJoinOptions={noUIPreJoinOptions}
        // sourceParameters={sourceParameters}
        // updateSourceParameters={updateSourceParameters}
        // customComponent={customComponent}
        // containerStyle={containerStyle}
        uiOverrides={uiOverrides}
        // createMediaSFURoom={enableBackendProxyHooks ? createRoomOnMediaSFU : undefined}
        // joinMediaSFURoom={enableBackendProxyHooks ? joinRoomOnMediaSFU : undefined}
        {...cardOverrides}
      />

  );
};

// -----------------------------------------------------------------------------
// StyleSheet - React Native Styles
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  // Custom Workspace Styles
  workspaceContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  workspaceHeader: {
    padding: 24,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.3)',
  },
  workspaceTitle: {
    fontSize: 28,
    color: '#f1f5f9',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  workspaceSubtitle: {
    fontSize: 14,
    color: '#f1f5f9',
    opacity: 0.8,
  },
  bold: {
    fontWeight: 'bold',
  },
  workspaceContent: {
    flex: 1,
    flexDirection: 'row',
  },
  workspaceSidebar: {
    width: 320,
    padding: 24,
    borderRightWidth: 1,
    borderRightColor: 'rgba(148, 163, 184, 0.2)',
  },
  sidebarTitle: {
    fontSize: 16,
    color: '#f1f5f9',
    marginBottom: 12,
    fontWeight: '600',
  },
  participantsList: {
    flex: 1,
  },
  participantCard: {
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.4)',
    marginBottom: 8,
  },
  participantName: {
    color: '#f1f5f9',
    fontWeight: '600',
  },
  participantLevel: {
    fontSize: 12,
    color: '#f1f5f9',
    opacity: 0.8,
  },
  workspaceMain: {
    flex: 1,
    padding: 32,
  },
  controlsSection: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: 'rgba(79, 70, 229, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.55)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.45,
    shadowRadius: 45,
    elevation: 10,
    marginBottom: 16,
  },
  controlsTitle: {
    fontSize: 18,
    color: '#f1f5f9',
    marginBottom: 12,
    fontWeight: '600',
  },
  controlsDescription: {
    fontSize: 14,
    color: '#f1f5f9',
    marginBottom: 18,
    maxWidth: 420,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  successButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
  successButtonText: {
    color: '#022c22',
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.6)',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#f1f5f9',
    opacity: 0.6,
  },

  // Enhanced Component Styles
  enhancedMainContainer: {
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: 'rgba(139, 92, 246, 0.8)',
    borderRadius: 28,
    padding: 16,
    backgroundColor: 'rgba(244, 244, 255, 0.55)',
  },
  enhancedMainContainerLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#6b21a8',
    marginBottom: 8,
  },
  enhancedPaginationContainer: {
    backgroundColor: '#0ea5e9',
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  enhancedPaginationLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#f8fafc',
    marginBottom: 8,
  },
});

export default AppUnique;
