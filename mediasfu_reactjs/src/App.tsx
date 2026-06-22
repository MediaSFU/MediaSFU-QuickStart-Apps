import React from 'react';
import { useCallback, useRef } from 'react';
import {
  ModernMediasfuGeneric,
  PreJoinPageOptions,
  WelcomePageOptions,
  CreateMediaSFURoomOptions,
} from 'mediasfu-reactjs';

/**
 * A custom pre-join page widget that can be used instead of the default MediaSFU pre-join page.
 *
 * This component displays a personalized welcome message and includes a button to proceed to the session.
 *
 * **Note:** Ensure this component is passed to ModernMediasfuGeneric only when you intend to use a custom pre-join page.
 */
const MyCustomPreJoinPage: React.FC<{
  options?: PreJoinPageOptions | WelcomePageOptions;
  credentials: { apiUserName: string; apiKey: string };
}> = ({ options, credentials }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1A1A2E',
        color: 'white',
      }}
    >
      {/* App Bar */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(26, 26, 46, 0.8)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
          Welcome to MediaSFU Modern
        </h1>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Hello, {credentials.apiUserName}!
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '40px',
          }}
        >
          Get ready to join your modern session.
        </p>
        <button
          onClick={() => {
            // Proceed to the session by updating the validation status
            if (options && 'parameters' in options && options.parameters) {
              options.parameters.updateValidated(true);
            }
          }}
          style={{
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
          }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

/**
 * The main application component for MediaSFU Modern UI.
 *
 * This component initializes the necessary credentials and configuration for the MediaSFU application
 * using the Modern UI components with glassmorphic design.
 */
const AppModern: React.FC = () => {
  // =========================================================
  //                API CREDENTIALS CONFIGURATION
  // =========================================================

  /**
   * Scenario A: Not using MediaSFU Cloud at all.
   * - Dummy credentials are needed to render PreJoinPage.
   */
  /*
  const credentials = {
    apiUserName: 'dummyUsr',
    apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  } as const;
  const localLink = 'http://your-ce-server.com';
  const connectMediaSFU = false;
  */

  /**
   * Scenario B: Using MediaSFU CE + MediaSFU Cloud for Egress only.
   */
  /*
  const credentials = {
    apiUserName: 'dummyUsr',
    apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  } as const;
  const localLink = 'http://your-ce-server.com';
  const connectMediaSFU = true;
  */

  /**
   * Scenario C: Using MediaSFU Cloud without your own server.
   */
  const credentials = {
    apiUserName: 'yourDevUser',
    apiKey: 'yourDevApiKey1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  } as const;
  const localLink = 'http://localhost:3000';
  const connectMediaSFU = false;

  // =========================================================
  //                    UI RENDERING OPTIONS
  // =========================================================

  // Example noUIPreJoinOptions for creating a room
  const noUIPreJoinOptionsCreate: CreateMediaSFURoomOptions = {
    action: 'create',
    capacity: 10,
    duration: 15,
    eventType: 'broadcast',
    userName: 'Prince',
  };

  const returnUI = true;

  // State for source parameters when not using the default UI
  const sourceParameters = useRef<Record<string, unknown>>({}).current;

  // Update function to update source parameters if not using the default UI
  const updateSourceParameters = useCallback((data: Record<string, unknown>) => {
    Object.assign(sourceParameters, data);
    // Add custom logic here when source parameters change
    if (data) {
      // console.log('Source parameters updated:', data);
    }
  }, []);

  // =========================================================
  //              DEPRECATED SEED DATA EXAMPLE (OPTIONAL)
  // =========================================================

  // =========================================================
  //           MODERN MEDIASFU GENERIC CONFIGURATION
  // =========================================================

  /**
   * ModernMediasfuGeneric uses the new glassmorphic UI design.
   *
   * Key differences from MediasfuGeneric:
   * - Modern control bar with glassmorphic effects
   * - Modern modals with animations and blur effects
   * - Dark mode by default
   *
   * All the same functionality as MediasfuGeneric but with
   * the new modern UI components.
   */

  // =========================================================
  //                    RENDER COMPONENT
  // =========================================================

  // Basic Modern MediaSFU configuration
  // When PrejoinPage is not provided, the default WelcomePage is used internally
  return (
    <ModernMediasfuGeneric
      // Pass your Credentials if you will be using MediaSFU Cloud
      credentials={credentials}
      connectMediaSFU={connectMediaSFU}
      // Use your own MediaSFU server link if using MediaSFU Community Edition
      localLink={localLink}
      // Set to false to use a custom UI, true to use the default MediaSFU UI
      returnUI={returnUI}
      // Provide pre-join options if not using the default UI (if creating a room)
      noUIPreJoinOptions={!returnUI ? noUIPreJoinOptionsCreate : undefined}
      // Source parameters for custom UI integration
      sourceParameters={!returnUI ? sourceParameters : undefined}
      updateSourceParameters={!returnUI ? updateSourceParameters : undefined}
      // Provide custom room functions
      // createMediaSFURoom={createRoomOnMediaSFU}
      // joinMediaSFURoom={joinRoomOnMediaSFU}
      // Optional: Container styling for custom layouts
    />
  );

  // =========================================================
  //                    ALTERNATIVE EXAMPLES
  // =========================================================

  /*
  // Example with custom pre-join page
  return (
    <ModernMediasfuGeneric
      PrejoinPage={({ options }) => (
        <MyCustomPreJoinPage options={options} credentials={credentials} />
      )}
      credentials={credentials}
      connectMediaSFU={connectMediaSFU}
    />
  );
  */

  /*
  // Example with Modern PreJoinPage component
  return (
    <ModernMediasfuGeneric
      PrejoinPage={ModernPreJoinPage}
      credentials={credentials}
      connectMediaSFU={connectMediaSFU}
      localLink={localLink}
      createMediaSFURoom={createRoomOnMediaSFU}
      joinMediaSFURoom={joinRoomOnMediaSFU}
    />
  );
  */


  /*
  // Example with returnUI = false for custom UI
  return (
    <ModernMediasfuGeneric
      PrejoinPage={PreJoinPage}
      credentials={credentials}
      connectMediaSFU={connectMediaSFU}
      returnUI={false}
      noUIPreJoinOptions={noUIPreJoinOptionsCreate}
      sourceParameters={sourceParameters}
      updateSourceParameters={updateSourceParameters}
    />
  );
  */

  /*
  // Example with custom video/audio/mini cards for Modern styling
  // You can import Modern card components and use them as custom cards
  import { ModernVideoCard, ModernAudioCard, ModernMiniCard } from './components_modern/mediasfu_components/ModernMediasfuGeneric';

  const modernVideoCard: CustomVideoCardType = (props) => (
    <ModernVideoCard {...props} isDarkMode={true} />
  );

  const modernAudioCard: CustomAudioCardType = (props) => (
    <ModernAudioCard {...props} isDarkMode={true} />
  );

  const modernMiniCard: CustomMiniCardType = (props) => (
    <ModernMiniCard {...props} isDarkMode={true} />
  );

  return (
    <ModernMediasfuGeneric
      credentials={credentials}
      connectMediaSFU={connectMediaSFU}
      customVideoCard={modernVideoCard}
      customAudioCard={modernAudioCard}
      customMiniCard={modernMiniCard}
    />
  );
  */
};

export default AppModern;
