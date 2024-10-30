import { MediasfuGeneric } from 'mediasfu-reactjs';

// Import specific Mediasfu view components
import { MediasfuBroadcast } from 'mediasfu-reactjs';
import { MediasfuChat } from 'mediasfu-reactjs';
import { MediasfuWebinar } from 'mediasfu-reactjs';
import { MediasfuConference } from 'mediasfu-reactjs';

// Import the PreJoinPage component for the Pre-Join Page use case
import { PreJoinPage } from 'mediasfu-reactjs';

// Import methods for generating random participants, messages, requests, and waiting room lists if using seed data
import { generateRandomParticipants } from 'mediasfu-reactjs';
import { generateRandomMessages } from 'mediasfu-reactjs';
import { generateRandomRequestList } from 'mediasfu-reactjs';
import { generateRandomWaitingRoomList } from 'mediasfu-reactjs';



const App = () => {
  // Mediasfu account credentials
  // Replace 'your_api_username' and 'your_api_key' with your actual credentials
  const credentials = { apiUserName: 'your_api_username', apiKey: 'your_api_key' };

  // Whether to use seed data for generating random participants and messages
  // Set to true if you want to run the application in local UI mode with seed data
  const useSeed = false;
  let seedData = {};

  // Event type ('broadcast', 'chat', 'webinar', 'conference')
  // Set this to match the component you are using
  let eventType = 'broadcast';

  // If using seed data, generate random participants and messages
  if (useSeed) {
    // Name of the member
    const memberName = 'Prince';

    // Name of the host
    const hostName = 'Fred';

    // Generate random participants
    const participants_ = generateRandomParticipants({
      member: memberName,
      coHost: '',
      host: hostName,
      forChatBroadcast: eventType === 'broadcast' || eventType === 'chat',
    });

    // Generate random messages
    const messages_ = generateRandomMessages({
      participants: participants_,
      member: memberName,
      host: hostName,
      forChatBroadcast: eventType === 'broadcast' || eventType === 'chat',
    });

    // Generate random requests
    const requests_ = generateRandomRequestList({
      participants: participants_,
      hostName: memberName,
      coHostName: '',
      numberOfRequests: 3,
    });

    // Generate random waiting list
    const waitingList_ = generateRandomWaitingRoomList();

    // Assign generated data to seedData
    seedData = {
      participants: participants_,
      messages: messages_,
      requests: requests_,
      waitingList: waitingList_,
      member: memberName,
      host: hostName,
      eventType: eventType,
    };
  }

  // Whether to use local UI mode; prevents making requests to the Mediasfu servers during UI development
  const useLocalUIMode = useSeed;

  // Choose the Mediasfu component based on the event type
  // Uncomment the component corresponding to your use case

  // Simple Use Case (Welcome Page)
  // Renders the default welcome page
  // No additional inputs required
  // return <MediasfuGeneric />;

  // Use Case with Pre-Join Page (Credentials Required)
  // Uses a pre-join page that requires users to enter credentials
  // return <MediasfuGeneric PrejoinPage={PreJoinPage} credentials={credentials} />;

  // Use Case with Local UI Mode (Seed Data Required)
  // Runs the application in local UI mode using seed data
  // return <MediasfuGeneric useLocalUIMode={true} useSeed={true} seedData={seedData} />;

  // MediasfuBroadcast Component
  // Uncomment to use the broadcast event type
  // return (
  //   <MediasfuBroadcast
  //     credentials={credentials}
  //     useLocalUIMode={useLocalUIMode}
  //     useSeed={useSeed}
  //     seedData={useSeed ? seedData : {}}
  //   />
  // );

  // MediasfuChat Component
  // Uncomment to use the chat event type
  // return (
  //   <MediasfuChat
  //     credentials={credentials}
  //     useLocalUIMode={useLocalUIMode}
  //     useSeed={useSeed}
  //     seedData={useSeed ? seedData : {}}
  //   />
  // );

  // MediasfuWebinar Component
  // Uncomment to use the webinar event type
  // return (
  //   <MediasfuWebinar
  //     credentials={credentials}
  //     useLocalUIMode={useLocalUIMode}
  //     useSeed={useSeed}
  //     seedData={useSeed ? seedData : {}}
  //   />
  // );

  // MediasfuConference Component
  // Uncomment to use the conference event type
  // return (
  //   <MediasfuConference
  //     credentials={credentials}
  //     useLocalUIMode={useLocalUIMode}
  //     useSeed={useSeed}
  //     seedData={useSeed ? seedData : {}}
  //   />
  // );

  // Default to MediasfuGeneric without any props
  // This will render the welcome page
  return <MediasfuGeneric />;
};

export default App;