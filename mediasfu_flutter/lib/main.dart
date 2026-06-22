// ignore_for_file: unused_shown_name, unused_import, dead_code, unused_local_variable
import 'package:flutter/material.dart';
import 'package:mediasfu_sdk/mediasfu_sdk.dart';

// Import modern components
import 'package:mediasfu_sdk/components_modern/components_modern.dart';
import 'package:mediasfu_sdk/components_modern/mediasfu_components/modern_mediasfu_generic.dart';

void main() {
  runApp(const MyApp());
}

/// A custom pre-join page widget that can be used instead of the default Mediasfu pre-join page.
///
/// This widget displays a personalized welcome message and includes a button to proceed to the session.
///
/// **Note:** Ensure this widget is passed to [ModernMediasfuGenericOptions] only when you intend to use a custom pre-join page.
Widget myCustomPreJoinPage({
  PreJoinPageOptions? options,
  required Credentials credentials,
}) {
  return Scaffold(
    appBar: AppBar(
      title: const Text('Welcome to MediaSFU Modern'),
    ),
    body: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Hello, ${credentials.apiUserName}!',
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),
          const Text(
            'Get ready to join your modern session.',
            style: TextStyle(fontSize: 18),
          ),
          const SizedBox(height: 40),
          ElevatedButton(
            onPressed: () {
              // Proceed to the session by updating the validation status
              if (options != null) {
                options.parameters.updateValidated(true);
              }
            },
            child: const Text('Join Now'),
          ),
        ],
      ),
    ),
  );
}

/// The main application widget for MediaSFU Modern UI.
///
/// This widget initializes the necessary credentials and configuration for the MediaSFU application
/// using the Modern UI components with glassmorphic design.
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // Provides access to the source parameters if not using the default UI (returnUI = false in options).
  final ValueNotifier<MediasfuParameters?> sourceParameters =
      ValueNotifier(null);

  // Update function to update source parameters if not using the default UI.
  void updateSourceParameters(MediasfuParameters? parameters) {
    sourceParameters.value = parameters;
  }

  @override
  void initState() {
    super.initState();

    // Attach the listener
    sourceParameters.addListener(() {
      _onSourceParametersChanged(sourceParameters.value);
    });
  }

  @override
  void dispose() {
    sourceParameters.removeListener(() {
      _onSourceParametersChanged(sourceParameters.value);
    });
    sourceParameters.dispose();
    super.dispose();
  }

  /// Listener for changes in sourceParameters.
  void _onSourceParametersChanged(MediasfuParameters? parameters) {
    if (parameters != null) {
      // Add custom logic here
    }
  }

  @override
  Widget build(BuildContext context) {
    // =========================================================
    //                API CREDENTIALS CONFIGURATION
    // =========================================================

    /**
     * Scenario A: Not using MediaSFU Cloud at all.
     * - Dummy credentials are needed to render PreJoinPage.
     */
    /*
    final credentials = Credentials(
      apiUserName: 'dummyUsr',
      apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    );
    final localLink = 'http://your-ce-server.com';
    final connectMediaSFU = false;
    */

    /**
     * Scenario B: Using MediaSFU CE + MediaSFU Cloud for Egress only.
     */
    /*
    final credentials = Credentials(
      apiUserName: 'dummyUsr',
      apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    );
    final localLink = 'http://your-ce-server.com';
    final connectMediaSFU = true;
    */

    /**
     * Scenario C: Using MediaSFU Cloud without your own server.
     */
    final credentials = Credentials(
      apiUserName: 'yourDevUser', // 8 chars recommended for dummy
      apiKey:
          'yourDevApiKey1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdeg', // 64 chars
    );
    const localLink =
        'http://192.168.1.133:3000/'; // Leave empty if not using your own server
    const connectMediaSFU =
        false; // Set to true if using MediaSFU Cloud since localLink is empty

    // =========================================================
    //                    UI RENDERING OPTIONS
    // =========================================================

    // Example noUIPreJoinOptions for creating a room
    final CreateMediaSFURoomOptions noUIPreJoinOptionsCreate =
        CreateMediaSFURoomOptions(
      action: 'create',
      capacity: 10,
      duration: 15,
      eventType: EventType.broadcast,
      userName: 'Prince',
    );

    const bool returnUI = true;

    // =========================================================
    //           MODERN MEDIASFU GENERIC CONFIGURATION
    // =========================================================

    /**
     * ModernMediasfuGeneric uses the new glassmorphic UI design.
     *
     * Key differences from MediasfuGeneric:
     * - Modern control bar with glassmorphic effects
     * - Modern modals with animations and blur effects
     * - Dark mode by default with enableGlassmorphism option
     *
     * All the same functionality as MediasfuGeneric but with
     * the new modern UI components.
     */

    // Basic Modern MediaSFU configuration
    // When preJoinPageWidget is not provided, the default PreJoinPage is used internally
    final options = ModernMediasfuGenericOptions(
      // Pass your Credentials if you will be using MediaSFU Cloud
      credentials: credentials,
      connectMediaSFU: connectMediaSFU,

      // Modern UI specific options:
      // isDarkMode: true, // Enable dark mode (default: true)
      // enableGlassmorphism: true, // Enable glassmorphic effects (default: true)

      // Use your own MediaSFU server link if using MediaSFU Community Edition
      localLink: localLink,

      // Set to false to use a custom UI, true to use the default MediaSFU UI
      returnUI: returnUI,

      // Provide pre-join options if not using the default UI (if creating a room)
      noUIPreJoinOptionsCreate: !returnUI ? noUIPreJoinOptionsCreate : null,

      // Provide custom room functions
      // createMediaSFURoom: createRoomOnMediaSFU,
      // joinMediaSFURoom: joinRoomOnMediaSFU,
    );

    /*
    // Example with custom pre-join page
    final optionsCustomPreJoin = ModernMediasfuGenericOptions(
      preJoinPageWidget: ({PreJoinPageOptions? options}) {
        return myCustomPreJoinPage(
          options: options,
          credentials: credentials,
        );
      },
      credentials: credentials,
      connectMediaSFU: connectMediaSFU,
    );
    */

    /*
    // Example with seed data for testing
    final optionsWithSeed = ModernMediasfuGenericOptions(
      preJoinPageWidget: PreJoinPage(),
      credentials: credentials,
      connectMediaSFU: connectMediaSFU,
      useSeed: true,
      seedData: SeedData(
        member: 'TestUser',
        host: 'TestHost',
        eventType: EventType.webinar,
        participants: generateRandomParticipants(
          GenerateRandomParticipantsOptions(
            member: 'TestUser',
            coHost: '',
            host: 'TestHost',
            forChatBroadcast: false,
          ),
        ),
        messages: generateRandomMessages(
          GenerateRandomMessagesOptions(
            member: 'TestUser',
            host: 'TestHost',
            forChatBroadcast: false,
          ),
        ),
        requests: generateRandomRequestList(
          GenerateRandomRequestListOptions(
            member: 'TestUser',
            host: 'TestHost',
            coHost: '',
            forChatBroadcast: false,
          ),
        ),
        waitingList: generateRandomWaitingRoomList(),
      ),
    );
    */

    /*
    // Example with custom room functions
    final optionsWithCustomFunctions = ModernMediasfuGenericOptions(
      preJoinPageWidget: PreJoinPage(),
      credentials: credentials,
      connectMediaSFU: connectMediaSFU,
      createMediaSFURoom: createRoomOnMediaSFU,
      joinMediaSFURoom: joinRoomOnMediaSFU,
    );
    */

    /*
    // Example with returnUI = false for custom UI
    final optionsNoUI = ModernMediasfuGenericOptions(
      preJoinPageWidget: PreJoinPage(),
      credentials: credentials,
      connectMediaSFU: connectMediaSFU,
      returnUI: false,
      noUIPreJoinOptions: noUIPreJoinOptionsCreate,
      sourceParameters: sourceParameters.value,
      updateSourceParameters: updateSourceParameters,
    );
    */

    return MaterialApp(
      title: 'MediaSFU Modern',
      theme: ThemeData(
        // Modern dark theme to complement the glassmorphic UI
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: const Color(0xFF1A1A2E),
      ),
      home: ModernMediasfuGeneric(options: options),
    );
  }
}
