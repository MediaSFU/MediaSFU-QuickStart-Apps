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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MediasfuGeneric,
    MediasfuBroadcast,
    MediasfuChat,
    MediasfuWebinar,
    MediasfuConference,
    PreJoinPage,
  ],
  template: `
    <app-mediasfu-generic [PrejoinPage]="PreJoinPage" [credentials]="credentials"></app-mediasfu-generic>

    <!--
    Welcome to the Mediasfu Angular Application!

    Below are different use cases you can run. Uncomment the one you want to try.

    1. Simple Use Case (Welcome Page)
       - Renders the default welcome page.
       - No additional inputs required.

    <app-mediasfu-generic></app-mediasfu-generic>

    -------------------------------------------------

    2. Use Case with Pre-Join Page (Credentials Required)
       - Uses a pre-join page that requires users to enter credentials.
       - Provide your Mediasfu API username and key in the 'credentials' object.

    <app-mediasfu-generic
      [PrejoinPage]="PreJoinPage"
      [credentials]="credentials"
    ></app-mediasfu-generic>

    -------------------------------------------------

    3. Use Case with Local UI Mode (Seed Data Required)
       - Runs the application in local UI mode using seed data.
       - Set 'useSeed' to true and provide seed data in 'seedData'.

    <app-mediasfu-generic
      [useLocalUIMode]="true"
      [useSeed]="true"
      [seedData]="seedData"
    ></app-mediasfu-generic>

    -------------------------------------------------

    4. Use Specific Event Type Components
       - Uncomment the component corresponding to the event type you want to use.
       - Options are 'broadcast', 'chat', 'webinar', 'conference'.
       - Remember to set the 'eventType' property in the class.

    Example for 'broadcast':

    <app-mediasfu-broadcast
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-broadcast>

    -->

    <!-- Uncomment one of the options below to run the corresponding use case -->

    <!-- Simple Use Case (Welcome Page) -->
    <!--
    <app-mediasfu-generic></app-mediasfu-generic>
    -->

    <!-- Use Case with Pre-Join Page (Credentials Required) -->
    <!--
    <app-mediasfu-generic
      [PrejoinPage]="PreJoinPage"
      [credentials]="credentials"
    ></app-mediasfu-generic>
    -->

    <!-- Use Case with Local UI Mode (Seed Data Required) -->
    <!--
    <app-mediasfu-generic
      [useLocalUIMode]="true"
      [useSeed]="true"
      [seedData]="seedData"
    ></app-mediasfu-generic>
    -->

    <!-- MediasfuBroadcast Component -->
    <!-- Uncomment to use the broadcast event type -->
    <!--
    <app-mediasfu-broadcast
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-broadcast>
    -->

    <!-- MediasfuChat Component -->
    <!-- Uncomment to use the chat event type -->
    <!--
    <app-mediasfu-chat
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-chat>
    -->

    <!-- MediasfuWebinar Component -->
    <!-- Uncomment to use the webinar event type -->
    <!--
    <app-mediasfu-webinar
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-webinar>
    -->

    <!-- MediasfuConference Component -->
    <!-- Uncomment to use the conference event type -->
    <!--
    <app-mediasfu-conference
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-conference>
    -->
  `
})
export class AppComponent implements OnInit {
  // Reference to the PreJoinPage component
  PreJoinPage = PreJoinPage;

  // Mediasfu account credentials
  // Replace 'your_api_username' and 'your_api_key' with your actual credentials
  // Only if you are using the PreJoinPage component
  credentials = {
    apiUserName: 'your_api_username',
    apiKey: 'your_api_key',
  };

  // Whether to use seed data for generating random participants and messages
  // Set to true if you want to run the application in local UI mode with seed data
  useSeed = false;
  seedData: any = {};

  // Event type ('broadcast', 'chat', 'webinar', 'conference')
  // Set this to match the component you are using
  eventType: string = 'broadcast';

  // Whether to use local UI mode (prevents requests to Mediasfu servers)
  // Automatically set to true if 'useSeed' is true
  useLocalUIMode: boolean = false;

  // Inject the services in the constructor
  constructor(
    private generateRandomParticipants: GenerateRandomParticipants,
    private generateRandomMessages: GenerateRandomMessages,
    private generateRandomRequestList: GenerateRandomRequestList,
    private generateRandomWaitingRoomList: GenerateRandomWaitingRoomList
  ) { }

  ngOnInit(): void {
    // If using seed data, generate random participants and messages
    if (this.useSeed) {
      const memberName = 'Prince';
      const hostName = 'Fred';

      // Generate random participants
      const participants_ =
        this.generateRandomParticipants.generateRandomParticipants({
          member: memberName,
          coHost: '',
          host: hostName,
          forChatBroadcast:
            this.eventType === 'broadcast' || this.eventType === 'chat',
        });

      // Generate random messages
      const messages_ = this.generateRandomMessages.generateRandomMessages({
        participants: participants_,
        member: memberName,
        host: hostName,
        forChatBroadcast:
          this.eventType === 'broadcast' || this.eventType === 'chat',
      });

      // Generate random request list
      const requests_ =
        this.generateRandomRequestList.generateRandomRequestList({
          participants: participants_,
          hostName: memberName,
          coHostName: '',
          numberOfRequests: 3,
        });

      // Generate random waiting room list
      const waitingList_ =
        this.generateRandomWaitingRoomList.generateRandomWaitingRoomList();

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
}
