import 'package:flutter/material.dart';
import 'package:mediasfu_sdk/mediasfu_sdk.dart';

void main() {
  runApp(const MyApp());
}

// Global credentials used for authentication
final credentials = {
  'apiUserName': "your_api_user_name",
  'apiKey': "your_api_key",
};

/// The main application widget responsible for setting up the UI and navigation.
///
/// Users have the option to use a custom prejoin page or the default prejoin page provided by Mediasfu.
/// Custom prejoin pages require user credentials to create/join an event.
/// If no custom prejoin page is provided, a default welcome page is presented where users can scan their access code
/// obtained from the Mediasfu website.

class MyApp extends StatelessWidget {
  /// Indicates whether to use seed data for generating random participants and messages.
  final bool useSeed = true;

  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Name of the member
    const String memberName = 'Alice';

    // Name of the host (same as member if the member is the host)
    const String hostName = 'Fred';

    // Generate random participants with Alice as member and Fred as host
    final participants = useSeed
        ? generateRandomParticipants(memberName, '', hostName,
            forChatBroadcast: true)
        : [];

    // Generate random messages for the generated participants
    final messages = useSeed
        ? generateRandomMessages(participants, memberName, '', hostName,
            forChatBroadcast: true)
        : [];

    // Assign the generated participants and messages to seedData
    final seedData = {
      'participants': participants,
      'messages': messages,
      'member': memberName,
      'host': hostName,
    };

    // Whether to use local UI mode; prevents making requests to the Mediasfu servers during UI development
    final useLocalUIMode = useSeed;

    // Uncomment one of the sections below for the corresponding use case

    // Simple Use Case (Welcome Page)
    // Renders the default welcome page with no additional inputs
    // return MaterialApp(
    //   title: 'Mediasfu Welcome',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuGeneric(),
    // );

    // Use Case with Pre-Join Page (Credentials Required)
    // Uses a pre-join page that requires users to enter credentials
    // return MaterialApp(
    //   title: 'Mediasfu Pre-Join Page',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuGeneric(
    //     PrejoinPage: ({
    //       required Map<String, dynamic> credentials,
    //       required Map<String, dynamic> parameters,
    //     }) {
    //       return PreJoinPage(credentials: credentials, parameters: parameters);
    //     },
    //     credentials: credentials,
    //   ),
    // );

    // Use Case with Local UI Mode (Seed Data Required)
    // Runs the application in local UI mode using seed data
    // return MaterialApp(
    //   title: 'Mediasfu Local UI Mode',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuGeneric(
    //     useLocalUIMode: true,
    //     useSeed: true,
    //     seedData: seedData,
    //   ),
    // );

    // MediasfuBroadcast Component
    // For using the broadcast event type
    // return MaterialApp(
    //   title: 'Mediasfu Broadcast',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuBroadcast(
    //     PrejoinPage: ({
    //       required Map<String, dynamic> credentials,
    //       required Map<String, dynamic> parameters,
    //     }) {
    //       return PreJoinPage(credentials: credentials, parameters: parameters);
    //     },
    //     useLocalUIMode: useLocalUIMode,
    //     useSeed: useSeed,
    //     seedData: useSeed ? seedData : {},
    //     credentials: credentials,
    //   ),
    // );

    // MediasfuChat Component
    // For using the chat event type
    // return MaterialApp(
    //   title: 'Mediasfu Chat',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuChat(
    //     PrejoinPage: ({
    //       required Map<String, dynamic> credentials,
    //       required Map<String, dynamic> parameters,
    //     }) {
    //       return PreJoinPage(credentials: credentials, parameters: parameters);
    //     },
    //     useLocalUIMode: useLocalUIMode,
    //     useSeed: useSeed,
    //     seedData: useSeed ? seedData : {},
    //     credentials: credentials,
    //   ),
    // );

    // MediasfuWebinar Component
    // For using the webinar event type
    // return MaterialApp(
    //   title: 'Mediasfu Webinar',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuWebinar(
    //     PrejoinPage: ({
    //       required Map<String, dynamic> credentials,
    //       required Map<String, dynamic> parameters,
    //     }) {
    //       return PreJoinPage(credentials: credentials, parameters: parameters);
    //     },
    //     useLocalUIMode: useLocalUIMode,
    //     useSeed: useSeed,
    //     seedData: useSeed ? seedData : {},
    //     credentials: credentials,
    //   ),
    // );

    // MediasfuConference Component
    // For using the conference event type
    // return MaterialApp(
    //   title: 'Mediasfu Conference',
    //   theme: ThemeData(primarySwatch: Colors.blue),
    //   home: MediasfuConference(
    //     PrejoinPage: ({
    //       required Map<String, dynamic> credentials,
    //       required Map<String, dynamic> parameters,
    //     }) {
    //       return PreJoinPage(credentials: credentials, parameters: parameters);
    //     },
    //     useLocalUIMode: useLocalUIMode,
    //     useSeed: useSeed,
    //     seedData: useSeed ? seedData : {},
    //     credentials: credentials,
    //   ),
    // );

    // Default to MediasfuGeneric without any props
    // This will render the welcome page
    return MaterialApp(
      title: 'Mediasfu Default',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MediasfuGeneric(),
    );
  }
}
