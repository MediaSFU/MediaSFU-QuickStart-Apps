
import { Component, OnInit } from '@angular/core';
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
} from 'mediasfu-angular';


/**
 * The main application component for MediaSFU.
 *
 * This component initializes the necessary configuration and credentials for the MediaSFU application.
 * Users can specify their own Community Edition (CE) server, utilize MediaSFU Cloud by default, or enable MediaSFU Cloud for egress features.
 *
 * @remarks
 * - **Using Your Own Community Edition (CE) Server**: Set the `localLink` to point to your CE server.
 * - **Using MediaSFU Cloud by Default**: If not using a custom server (`localLink` is empty), the application connects to MediaSFU Cloud.
 * - **MediaSFU Cloud Egress Features**: To enable cloud recording, capturing, and returning real-time images and audio buffers,
 *   set `connectMediaSFU` to `true` in addition to specifying your `localLink`.
 * - **Credentials Requirement**: If not using your own server, provide `apiUserName` and `apiKey`. The same applies when using MediaSFU Cloud for egress.
 * - **Deprecated Feature**: `useLocalUIMode` is deprecated due to updates for strong typing and improved configuration options.
 *
 * @component
 * @example
 * ```typescript
 * // Example usage of the AppComponent
 * @NgModule({
 *   declarations: [AppComponent],
 *   imports: [BrowserModule, MediasfuWebinar],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule { }
 * ```
 */
@Component({
  selector: 'app-root',
  imports: [MediasfuWebinar],
  template: `
      <app-mediasfu-webinar
        [credentials]="credentials"
        [localLink]="localLink"
        [connectMediaSFU]="connectMediaSFU"
        [PrejoinPage]="PreJoinPage"
      >
      </app-mediasfu-webinar>
  `,
  providers: [
    GenerateRandomParticipants,
    GenerateRandomMessages,
    GenerateRandomRequestList,
    GenerateRandomWaitingRoomList
  ],
})
export class AppComponent implements OnInit {
  // ========================
  // ====== CONFIGURATION ======
  // ========================

  /**
   * Mediasfu account credentials.
   * Replace 'your_api_username' and 'your_api_key' with your actual credentials.
   * Not needed if using a custom server without MediaSFU Cloud Egress features.
   */
  credentials = {
    apiUserName: 'your_api_username',
    apiKey: 'your_api_key',
  };

  /**
   * Specify your Community Edition (CE) server link.
   * Leave as an empty string if not using a custom server.
   */
  localLink = 'http://localhost:3000'; // Set to '' if not using your own server

  /**
   * Automatically set `connectMediaSFU` to `true` if `localLink` is provided,
   * indicating the use of MediaSFU Cloud by default.
   *
   * - If `localLink` is not empty, MediaSFU Cloud will be used for additional features.
   * - If `localLink` is empty, the application will connect to MediaSFU Cloud by default.
   */
  connectMediaSFU = this.localLink.trim() !== ''; // set to false if not using MediaSFU Cloud for Main Server or Egress

  // ========================
  // ====== USE CASES ======
  // ========================

  // Deprecated Feature: useLocalUIMode
  // This feature is deprecated due to updates for strong typing.
  // It is no longer required and should not be used in new implementations.

  /**
   * Uncomment and configure the following section if you intend to use seed data
   * for generating random participants and messages.
   *
   * Note: This is deprecated and maintained only for legacy purposes.
   */
  /*
  useSeed = false;
  seedData: any = {};

  ngOnInit(): void {
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
  }
  */

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
  seedData: any = {}; // Initialize seedData as empty object

  // Reference to the PreJoinPage component
  PreJoinPage = PreJoinPage;

  constructor(
    private generateRandomParticipants: GenerateRandomParticipants,
    private generateRandomMessages: GenerateRandomMessages,
    private generateRandomRequestList: GenerateRandomRequestList,
    private generateRandomWaitingRoomList: GenerateRandomWaitingRoomList
  ) { }

  // Deprecated Feature: useSeed and seedData for generating random participants and messages
  // Uncomment and configure the following section if you intend to use seed data

  // useSeed = false;
  // eventType = 'webinar';
  // useLocalUIMode = false;

  ngOnInit(): void {
    // If using seed data, generate random participants and messages - DEPRECATED FEATURE
    // Note: This feature is deprecated and maintained only for legacy purposes.
    // Uncomment and configure the following section if you intend to use seed data

    // if (this.useSeed) {
    //   const memberName = 'Alice';
    //   const hostName = 'Fred';

    //   // Generate random participants
    //   const participants_ = this.generateRandomParticipants.generateRandomParticipants({
    //     member: memberName,
    //     coHost: '',
    //     host: hostName,
    //     forChatBroadcast: this.eventType === 'broadcast' || this.eventType === 'chat',
    //   });

    //   // Generate random messages
    //   const messages_ = this.generateRandomMessages.generateRandomMessages({
    //     participants: participants_,
    //     member: memberName,
    //     host: hostName,
    //     forChatBroadcast: this.eventType === 'broadcast' || this.eventType === 'chat',
    //   });

    //   // Generate random request list
    //   const requests_ = this.generateRandomRequestList.generateRandomRequestList({
    //     participants: participants_,
    //     hostName: memberName,
    //     coHostName: '',
    //     numberOfRequests: 3,
    //   });

    //   // Generate random waiting room list
    //   const waitingList_ = this.generateRandomWaitingRoomList.generateRandomWaitingRoomList();

    //   // Assign generated data to seedData
    //   this.seedData = {
    //     participants: participants_,
    //     messages: messages_,
    //     requests: requests_,
    //     waitingList: waitingList_,
    //     member: memberName,
    //     host: hostName,
    //     eventType: this.eventType,
    //   };
    // }

    // Determine whether to use local UI mode, deprecated feature
    // this.useLocalUIMode = this.useSeed;
  }
}
