
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GenerateRandomParticipants,
  GenerateRandomMessages,
  GenerateRandomRequestList,
  GenerateRandomWaitingRoomList,
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuChat,
  MediasfuWebinar,
  MediasfuConference,
  PreJoinPage,
  CreateRoomOnMediaSFU,
  JoinRoomOnMediaSFU,
  CreateMediaSFURoomOptions, JoinMediaSFURoomOptions
} from 'mediasfu-angular';
import { AppUniqueComponent } from '../../test-overrides/app-unique.component';

/**
 * AppComponent
 *
 * This component demonstrates how to:
 * - Configure credentials for MediaSFU Cloud and/or Community Edition (CE).
 * - Use MediaSFU with or without a custom server.
 * - Integrate a pre-join page.
 * - Disable the default MediaSFU UI and manage state through `sourceParameters` for a fully custom frontend.
 *
 * Basic instructions:
 * 1. Set `localLink` to your CE server if you have one, or leave it blank to use MediaSFU Cloud.
 * 2. Set `connectMediaSFU` to determine whether you're connecting to MediaSFU Cloud services.
 * 3. Provide credentials if using MediaSFU Cloud (dummy credentials are acceptable in certain scenarios).
 * 4. If you prefer a custom UI, set `returnUI` to false and handle all interactions via `sourceParameters` and `updateSourceParameters`.
 * 5. For secure production usage, use custom `createMediaSFURoom` and `joinMediaSFURoom` functions to forward requests through your backend.
 */
@Component({
  selector: 'app-root',
  imports: [CommonModule, MediasfuGeneric, AppUniqueComponent],
  template: `
    <!-- Toggle between default and demo view -->
    <div style="position: fixed; top: 10px; right: 10px; z-index: 9999;">
      <button (click)="showDemo = !showDemo"
              style="padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px;">
        {{ showDemo ? 'Show Default App' : 'Show Demo App' }}
      </button>
    </div>

    <!-- Default MediaSFU App -->
    <app-mediasfu-generic
      *ngIf="!showDemo"
      [PrejoinPage]="PreJoinPage"
      [credentials]="credentials"
      [localLink]="localLink"
      [connectMediaSFU]="connectMediaSFU"
      [returnUI]="returnUI"
      [noUIPreJoinOptions]="!returnUI ? noUIPreJoinOptions : undefined"
      [sourceParameters]="!returnUI ? sourceParameters : undefined"
      [updateSourceParameters]="!returnUI ? updateSourceParameters : undefined"
      [createMediaSFURoom]="createRoomOnMediaSFU.createRoomOnMediaSFU"
      [joinMediaSFURoom]="joinRoomOnMediaSFU.joinRoomOnMediaSFU">
    </app-mediasfu-generic>

    <!-- Demo/Test App (app-unique) -->
    <app-unique-demo *ngIf="showDemo"></app-unique-demo>
  `,
  providers: [
    GenerateRandomParticipants,
    GenerateRandomMessages,
    GenerateRandomRequestList,
    GenerateRandomWaitingRoomList
  ],
})
export class AppComponent implements OnInit {
  // Toggle between default app and demo
  showDemo = false;

  // =========================================================
  //                API CREDENTIALS CONFIGURATION
  // =========================================================
  //
  // Scenario A: Not using MediaSFU Cloud at all.
  // - No credentials needed. Just set localLink to your CE server.
  // Example:
  /*
  credentials = {};
  localLink = 'http://your-ce-server.com'; // e.g., 'http://localhost:3000'
  connectMediaSFU = localLink.trim() !== '';
  */

  // Scenario B: Using MediaSFU CE + MediaSFU Cloud for Egress only.
  // - Use dummy credentials (8 characters for userName, 64 characters for apiKey).
  // - Your CE backend will forward requests with your real credentials.
  /*
  credentials = {
    apiUserName: 'dummyUsr', // 8 characters
    apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // 64 characters
  };
  localLink = 'http://your-ce-server.com'; // e.g., 'http://localhost:3000'
  connectMediaSFU = localLink.trim() !== '';
  */

  // Scenario C: Using MediaSFU Cloud without your own server.
  // - For development, use your actual or dummy credentials.
  // - In production, securely handle credentials server-side and use custom room functions.
  credentials = {
    apiUserName: 'dummyUsr', // 8 characters
    apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // 64 characters
  };
  localLink = ''; // Leave empty if not using your own server
  connectMediaSFU = true; // Set to true if using MediaSFU Cloud since localLink is empty

  // =========================================================
  //                    UI RENDERING OPTIONS
  // =========================================================
  //
  // If you want a fully custom UI (e.g., a custom layout inspired by WhatsApp):
  // 1. Set `returnUI = false` to prevent the default MediaSFU UI from rendering.
  // 2. Provide `noUIPreJoinOptions` to simulate what would have been entered on a pre-join page.
  // 3. Use `sourceParameters` and `updateSourceParameters` to access and update state/actions.
  // 4. No need for any of the above if you're using the default MediaSFU UI.
  //
  // Example noUIPreJoinOptions for creating a room:
  noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
    action: 'create',
    capacity: 10,
    duration: 15,
    eventType: 'broadcast',
    userName: 'Prince',
  };

  // Example noUIPreJoinOptions for joining a room:
  // noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
  //   action: 'join',
  //   userName: 'Prince',
  //   meetingID: 'yourMeetingID'
  // };

  returnUI = true; // Set to false for custom UI, true for default MediaSFU UI

  sourceParameters: { [key: string]: any } = {};

  /**
   * Function to update sourceParameters state.
   *
   * @param data - The data to update sourceParameters with.
   */
  updateSourceParameters = (data: { [key: string]: any }) => {
    this.sourceParameters = data;
  };

  // =========================================================
  //                CUSTOM ROOM FUNCTIONS (OPTIONAL)
  // =========================================================
  //
  // To securely forward requests to MediaSFU:
  // - Implement custom `createMediaSFURoom` and `joinMediaSFURoom` functions.
  // - These functions send requests to your server, which then communicates with MediaSFU Cloud.
  //
  // The imported `createRoomOnMediaSFU` and `joinRoomOnMediaSFU` are examples.
  //
  // If using MediaSFU CE backend, ensure your server endpoints:
  // - Validate dummy credentials.
  // - Forward requests to mediasfu.com with real credentials.

  // =========================================================
  //              COMPONENT SELECTION AND RENDERING
  // =========================================================
  //
  // Multiple components are available depending on your event type:
  // MediasfuBroadcast, MediasfuChat, MediasfuWebinar, MediasfuConference
  //
  // By default, we'll use MediasfuGeneric with custom settings.
  //
  // Uncomment the desired component below and comment out the others as needed.
  //
  // Example of MediaSFU CE with no MediaSFU Cloud
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [localLink]="localLink">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU CE + MediaSFU Cloud for Egress only
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [localLink]="localLink"
  //     [connectMediaSFU]="connectMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU Cloud only
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [connectMediaSFU]="connectMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU CE + MediaSFU Cloud for Egress only with custom UI
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [localLink]="localLink"
  //     [connectMediaSFU]="connectMediaSFU"
  //     [returnUI]="false"
  //     [noUIPreJoinOptions]="noUIPreJoinOptions"
  //     [sourceParameters]="sourceParameters"
  //     [updateSourceParameters]="updateSourceParameters"
  //     [createMediaSFURoom]="createRoomOnMediaSFU"
  //     [joinMediaSFURoom]="joinRoomOnMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU Cloud only with custom UI
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [connectMediaSFU]="connectMediaSFU"
  //     [returnUI]="false"
  //     [noUIPreJoinOptions]="noUIPreJoinOptions"
  //     [sourceParameters]="sourceParameters"
  //     [updateSourceParameters]="updateSourceParameters"
  //     [createMediaSFURoom]="createRoomOnMediaSFU"
  //     [joinMediaSFURoom]="joinRoomOnMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of using MediaSFU CE only with custom UI
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [localLink]="localLink"
  //     [connectMediaSFU]="false"
  //     [returnUI]="false"
  //     [noUIPreJoinOptions]="noUIPreJoinOptions"
  //     [sourceParameters]="sourceParameters"
  //     [updateSourceParameters]="updateSourceParameters">
  //   </app-mediasfu-generic>
  // );

  /**
   * Default Rendering: MediasfuGeneric with Updated Configuration
   *
   * Renders the MediasfuGeneric component with specified server and cloud connection settings.
   * Configured for custom UI usage if `returnUI` is set to false.
   */
  ngOnInit(): void {
    // Deprecated Feature: useSeed and seedData for generating random participants and messages
    // Uncomment and configure the following section if you intend to use seed data

    /*
    if (this.useSeed) {
      const memberName = 'Alice';
      const hostName = 'Fred';

      // Generate random participants
      const participants_ = this.generateRandomParticipants.generateRandomParticipants({
        member: memberName,
        coHost: '',
        host: hostName,
        forChatBroadcast: this.eventType === 'broadcast' || this.eventType === 'chat',
      });

      // Generate random messages
      const messages_ = this.generateRandomMessages.generateRandomMessages({
        participants: participants_,
        member: memberName,
        host: hostName,
        forChatBroadcast: this.eventType === 'broadcast' || this.eventType === 'chat',
      });

      // Generate random request list
      const requests_ = this.generateRandomRequestList.generateRandomRequestList({
        participants: participants_,
        hostName: memberName,
        coHostName: '',
        numberOfRequests: 3,
      });

      // Generate random waiting room list
      const waitingList_ = this.generateRandomWaitingRoomList.generateRandomWaitingRoomList();

      // Assign generated data to seedData
      this.seedData = {
        participants: participants_,
        messages: messages_,
        requests: requests_,
        waitingList: waitingList_,
        member: memberName,
        host: hostName,
        eventType: this.eventType,
      };
    }

    // Determine whether to use local UI mode
    this.useLocalUIMode = this.useSeed;
    */
  }

  // ========================
  // ====== COMPONENT SELECTION ======
  // ========================

  /**
   * Choose the Mediasfu component based on the event type and use case.
   * Uncomment the component corresponding to your specific use case.
   */

  // ------------------------
  // ====== SIMPLE USE CASE ======
  // ------------------------

  /**
   * **Simple Use Case (Welcome Page)**
   *
   * Renders the default welcome page.
   * No additional inputs required.
   */
  // return <MediasfuWebinar />;

  // ------------------------
  // ====== PRE-JOIN USE CASE ======
  // ------------------------

  /**
   * **Use Case with Pre-Join Page (Credentials Required)**
   *
   * Uses a pre-join page that requires users to enter credentials.
   */
  // return <MediasfuWebinar PrejoinPage={PreJoinPage} credentials={credentials} />;

  // ------------------------
  // ====== SEED DATA USE CASE ======
  // ------------------------

  /**
   * **Use Case with Seed Data (Deprecated)**
   *
   * Runs the application using seed data.
   *
   * @deprecated Due to updates for strong typing, this feature is deprecated.
   */
  // return <MediasfuWebinar useSeed={useSeed} seedData={useSeed ? seedData : {}} />;

  // ------------------------
  // ====== WEBINAR EVENT TYPE ======
  // ------------------------

  /**
   * **MediasfuWebinar Component**
   *
   * Uncomment to use the webinar event type.
   */
  /*
  return (
    <MediasfuWebinar
      credentials={credentials}
      localLink={localLink}
      connectMediaSFU={connectMediaSFU}
      // seedData={useSeed ? seedData : {}}
    />
  );
  */

  // ========================
  // ====== DEFAULT COMPONENT ======
  // ========================

  /**
   * **Default to MediasfuWebinar with Updated Configuration**
   *
   * Renders the MediasfuWebinar component with specified server and cloud connection settings.
   * This is the default use case if no specific event type is selected.
   */

  // Reference to the PreJoinPage component
  PreJoinPage = PreJoinPage;

  constructor(
    private generateRandomParticipants: GenerateRandomParticipants,
    private generateRandomMessages: GenerateRandomMessages,
    private generateRandomRequestList: GenerateRandomRequestList,
    private generateRandomWaitingRoomList: GenerateRandomWaitingRoomList,
    public createRoomOnMediaSFU: CreateRoomOnMediaSFU,
    public joinRoomOnMediaSFU: JoinRoomOnMediaSFU
  ) { }

  // Deprecated Feature: useSeed and seedData for generating random participants and messages
  // Uncomment and configure the following section if you intend to use seed data

  // useSeed = false;
  // eventType = 'webinar';
  // useLocalUIMode = false;

}

export default AppComponent;

/**
 * =========================================================
 *                     ADDITIONAL NOTES
 * =========================================================
 *
 * Handling Core Methods:
 * Once `sourceParameters` is populated, you can call core methods like `clickVideo` or `clickAudio` directly:
 * Example:
 * sourceParameters.clickVideo({ ...sourceParameters });
 * sourceParameters.clickAudio({ ...sourceParameters });
 *
 * This allows your custom UI to directly interact with MediaSFU functionalities.
 *
 * Deprecated Features (Seed Data):
 * The seed data generation feature is deprecated. Avoid using `useLocalUIMode` or `useSeed` in new implementations.
 *
 * Security Considerations:
 * - **Protect API Credentials:** Ensure that API credentials are not exposed in the frontend. Use environment variables and secure backend services to handle sensitive information.
 * - **Use HTTPS:** Always use HTTPS to secure data transmission between the client and server.
 * - **Validate Inputs:** Implement proper validation and error handling on both client and server sides to prevent malicious inputs.
 *
 * Example CE Backend Setup:
 * If using MediaSFU CE + MediaSFU Cloud, your backend might look like this:
 *
 * ```javascript
 * // Endpoint for `createRoom`
 * app.post("/createRoom", async (req, res) => {
 *   try {
 *     const payload = req.body;
 *     const [apiUserName, apiKey] = req.headers.authorization
 *       .replace("Bearer ", "")
 *       .split(":");
 *
 *     // Verify temporary credentials
 *     if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
 *       return res.status(401).json({ error: "Invalid or expired credentials" });
 *     }
 *
 *     const response = await fetch("https://mediasfu.com/v1/rooms/", {
 *       method: "POST",
 *       headers: {
 *         "Content-Type": "application/json",
 *         Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
 *       },
 *       body: JSON.stringify(payload),
 *     });
 *
 *     const result = await response.json();
 *     res.status(response.status).json(result);
 *   } catch (error) {
 *     console.error("Error creating room:", error);
 *     res.status(500).json({ error: "Internal server error" });
 *   }
 * });
 *
 * // Endpoint for `joinRoom`
 * app.post("/joinRoom", async (req, res) => {
 *   try {
 *     const payload = req.body;
 *     const [apiUserName, apiKey] = req.headers.authorization
 *       .replace("Bearer ", "")
 *       .split(":");
 *
 *     // Verify temporary credentials
 *     if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
 *       return res.status(401).json({ error: "Invalid or expired credentials" });
 *     }
 *
 *     const response = await fetch("https://mediasfu.com/v1/rooms", {
 *       method: "POST",
 *       headers: {
 *         "Content-Type": "application/json",
 *         Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
 *       },
 *       body: JSON.stringify(payload),
 *     });
 *
 *     const result = await response.json();
 *     res.status(response.status).json(result);
 *   } catch (error) {
 *     console.error("Error joining room:", error);
 *     res.status(500).json({ error: "Internal server error" });
 *   }
 * });
 * ```
 *
 * Custom Room Function Implementation:
 * Below are examples of how to implement custom functions for creating and joining rooms securely:
 *
 * ```typescript
 * import { CreateJoinRoomError, CreateJoinRoomResponse, CreateJoinRoomType, CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';
 *
 *
 *  * Async function to create a room on MediaSFU.
 *  *
 *  * @param {object} options - The options for creating a room.
 *  * @param {CreateMediaSFURoomOptions} options.payload - The payload for the API request.
 *  * @param {string} options.apiUserName - The API username.
 *  * @param {string} options.apiKey - The API key.
 *  * @param {string} options.localLink - The local link.
 *  * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
 *
 * export const createRoomOnMediaSFU: CreateJoinRoomType = async ({
 *     payload,
 *     apiUserName,
 *     apiKey,
 *     localLink = '',
 * }) => {
 *     try {
 *         let finalLink = 'https://mediasfu.com/v1/rooms/';
 *
 *         // Update finalLink if using a local server
 *         if (localLink) {
 *             finalLink = `${localLink}/createRoom`;
 *         }
 *
 *         const response = await fetch(finalLink, {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *                 Authorization: `Bearer ${apiUserName}:${apiKey}`,
 *             },
 *             body: JSON.stringify(payload),
 *         });
 *
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! Status: ${response.status}`);
 *         }
 *
 *         const data: CreateJoinRoomResponse = await response.json();
 *         return { data, success: true };
 *     } catch (error) {
 *         const errorMessage = (error as Error).message || 'unknown error';
 *         return {
 *             data: { error: `Unable to create room, ${errorMessage}` },
 *             success: false,
 *         };
 *     }
 * };
 *
 *
 *  * Async function to join a room on MediaSFU.
 *  *
 *  * @param {object} options - The options for joining a room.
 *  * @param {JoinMediaSFURoomOptions} options.payload - The payload for the API request.
 *  * @param {string} options.apiUserName - The API username.
 *  * @param {string} options.apiKey - The API key.
 *  * @param {string} options.localLink - The local link.
 *  * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
 *
 * export const joinRoomOnMediaSFU: JoinRoomOnMediaSFUType = async ({
 *     payload,
 *     apiUserName,
 *     apiKey,
 *     localLink = '',
 * }) => {
 *     try {
 *         let finalLink = 'https://mediasfu.com/v1/rooms/join';
 *
 *         // Update finalLink if using a local server
 *         if (localLink) {
 *             finalLink = `${localLink}/joinRoom`;
 *         }
 *
 *         const response = await fetch(finalLink, {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *                 Authorization: `Bearer ${apiUserName}:${apiKey}`,
 *             },
 *             body: JSON.stringify(payload),
 *         });
 *
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! Status: ${response.status}`);
 *         }
 *
 *         const data: CreateJoinRoomResponse = await response.json();
 *         return { data, success: true };
 *     } catch (error) {
 *         const errorMessage = (error as Error).message || 'unknown error';
 *         return {
 *             data: { error: `Unable to join room, ${errorMessage}` },
 *             success: false,
 *         };
 *     }
 * };
 * ```
 *
 * =======================
 * ====== END OF GUIDE ======
 * =======================
 */
