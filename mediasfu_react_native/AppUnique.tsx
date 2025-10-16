/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

/**
 * AppUnique - React Native Version
 *
 * A toggle-driven cookbook that mirrors the guidance in `App.tsx`, while showcasing
 * the newer UI override hooks, custom cards, and fully custom render paths in one place.
 *
 * Adjust the booleans and selectors below to switch between common deployment scenarios
 * (Cloud, Community Edition, Hybrid), UI strategies (prebuilt UI, no-UI, or fully custom),
 * and customization layers (card builders, component overrides, container styling).
 *
 * Every configuration block is wrapped in a clearly named toggle so you can enable/disable
 * a feature by flipping a single value or commenting it out. The component is intentionally
 * verbose to double as living documentation that developers can copy, trim, or expand.
 *
 */

import React, { useMemo, useState } from 'react';
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
      apiUserName: 'yourDevUser',
      apiKey: 'yourDevApiKey1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
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

