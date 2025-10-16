/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * AppUnique
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
 */

import React, { useMemo, useState } from "react";
// add all missing imports from 'mediasfu-reactjs' below
import {
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuChat,
  MediasfuWebinar,
  MediasfuConference,
  PreJoinPage,
  VideoCard,
  AudioCard,
  MiniCard,
  Pagination,
  AlertComponent,
  MenuModal,
  ParticipantsModal,
  ConfirmExitModal,
  ScreenboardModal,
  MainContainerComponent,
} from "mediasfu-reactjs";
import type { MediasfuGenericOptions } from "mediasfu-reactjs";

import {
  CreateMediaSFURoomOptions,
  JoinMediaSFURoomOptions,
  CustomVideoCardType,
  CustomAudioCardType,
  CustomMiniCardType,
  CustomComponentType,
  MediasfuUICustomOverrides,
  Participant,
} from "mediasfu-reactjs";

// -----------------------------------------------------------------------------
// Toggle Section
// -----------------------------------------------------------------------------
type ConnectionScenario = "cloud" | "hybrid" | "ce";
type ExperienceKey =
  | "generic"
  | "broadcast"
  | "webinar"
  | "conference"
  | "chat";

// Switch deployment target: 'cloud' | 'hybrid' | 'ce'
const connectionScenario: ConnectionScenario = "cloud";

// Select which prebuilt experience to render by default
// Options: 'generic', 'broadcast', 'webinar', 'conference', 'chat'
const selectedExperience: ExperienceKey = "generic";

// UI strategy toggles
const showPrebuiltUI = true; // Set false to bypass the default UI entirely
const enableFullCustomUI = false; // Set true to mount the CustomWorkspace instead of MediaSFU UI
const enableNoUIPreJoin = !showPrebuiltUI || enableFullCustomUI; // auto-calculated helper

// Layered customization toggles
const enableCardBuilders = true; // Enables custom video/audio/mini card components
const enableUICoreOverrides = false; // Enables layout-centric overrides via uiOverrides
const enableModalOverrides = true; // Enables modal overrides via uiOverrides
const enableContainerStyling = true; // Applies a custom containerStyle
const enableBackendProxyHooks = true; // Hooks create/join calls through helper functions
const enableDebugPanel = true; // Renders a JSON panel of live parameters on the right

const connectionPresets: Record<
  ConnectionScenario,
  {
    credentials?: { apiUserName: string; apiKey: string };
    localLink: string;
    connectMediaSFU: boolean;
  }
> = {
  cloud: {
    credentials: {
      apiUserName: "yourDevUser",
      apiKey:
        "yourDevApiKey1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    localLink: "",
    connectMediaSFU: true,
  },
  hybrid: {
    credentials: {
      apiUserName: "dummyUsr",
      apiKey:
        "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    localLink: "http://localhost:3000",
    connectMediaSFU: true,
  },
  ce: {
    credentials: undefined,
    localLink: "http://localhost:3000",
    connectMediaSFU: false,
  },
};

const experienceComponentMap: Record<
  ExperienceKey,
  React.ComponentType<MediasfuGenericOptions>
> = {
  generic: MediasfuGeneric,
  broadcast: MediasfuBroadcast,
  webinar: MediasfuWebinar,
  conference: MediasfuConference,
  chat: MediasfuChat,
};

// -----------------------------------------------------------------------------
// Demo Custom Components (Cards + Full UI)
// -----------------------------------------------------------------------------
const ShowcaseVideoCard: CustomVideoCardType = ({
  customStyle,
  containerProps,
  infoOverlayProps,
  controlsOverlayProps,
  backgroundColor,
  name,
  participant,
  videoStream,
  ...rest
}) => {
  return (
    <VideoCard
      {...rest}
      name={name}
      participant={participant}
      videoStream={videoStream}
      backgroundColor={backgroundColor}
      customStyle={{
        borderRadius: 20,
        border: `3px solid #4c1d95`,
        overflow: "hidden",
        boxShadow: "0 28px 65px rgba(76, 29, 149, 0.35)",
        backgroundColor: backgroundColor ?? "#0f172a",
        ...customStyle,
      }}
      containerProps={{
        ...(containerProps ?? {}),
        style: {
          background:
            "linear-gradient(140deg, rgba(15, 23, 42, 0.78), rgba(30, 64, 175, 0.45))",
          borderRadius: 26,
          ...(containerProps?.style ?? {}),
        },
      }}
      infoOverlayProps={{
        ...(infoOverlayProps ?? {}),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 16px",
          borderRadius: 999,
          background: "rgba(79, 70, 229, 0.9)",
          color: "#f8fafc",
          fontWeight: 600,
          letterSpacing: 0.35,
          ...(infoOverlayProps?.style ?? {}),
        },
      }}
      controlsOverlayProps={{
        ...(controlsOverlayProps ?? {}),
        style: {
          background: "rgba(15, 23, 42, 0.55)",
          borderRadius: 16,
          backdropFilter: "blur(8px)",
          ...(controlsOverlayProps?.style ?? {}),
        },
      }}
    />
  );
};

const ShowcaseAudioCard: CustomAudioCardType = ({
  customStyle,
  cardProps,
  nameContainerProps,
  nameTextProps,
  barColor,
  ...rest
}) => {
  const accent = barColor ?? "#22c55e";

  return (
    <AudioCard
      {...rest}
      barColor={accent}
      customStyle={{
        borderRadius: 22,
        border: `2px solid ${accent}`,
        background:
          "linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(21, 128, 61, 0.45))",
        boxShadow: "0 18px 40px rgba(21, 128, 61, 0.25)",
        ...customStyle,
      }}
      cardProps={{
        ...(cardProps ?? {}),
        style: {
          padding: 18,
          gap: 14,
          ...(cardProps?.style ?? {}),
        },
      }}
      nameContainerProps={{
        ...(nameContainerProps ?? {}),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          ...(nameContainerProps?.style ?? {}),
        },
      }}
      nameTextProps={{
        ...(nameTextProps ?? {}),
        style: {
          fontSize: 16,
          fontWeight: 600,
          color: "#14532d",
          ...(nameTextProps?.style ?? {}),
        },
      }}
    />
  );
};

const ShowcaseMiniCard: CustomMiniCardType = ({
  customStyle,
  initials,
  fontSize,
  renderContainer,
  ...rest
}) => {
  const decorateContainer = ({
    defaultContainer,
  }: {
    defaultContainer: React.ReactNode;
    isImage: boolean;
  }) => (
    <div
      style={{
        display: "grid",
        gap: 6,
        justifyItems: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {defaultContainer}
    </div>
  );

  const combinedRenderContainer = (options: {
    defaultContainer: React.ReactNode;
    isImage: boolean;
  }) => {
    const decorated = decorateContainer(options);
    return renderContainer
      ? renderContainer({
          defaultContainer: decorated,
          isImage: options.isImage,
        })
      : decorated;
  };

  return (
    <MiniCard
      {...rest}
      initials={initials}
      fontSize={fontSize ?? 16}
      customStyle={{
        borderRadius: 16,
        border: "2px dashed #f59e0b",
        background: "#fff7ed",
        color: "#b45309",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 1,
        padding: 12,
        display: "grid",
        placeItems: "center",
        gap: 6,
        width: "100%",
        height: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
        ...customStyle,
      }}
      renderContainer={combinedRenderContainer}
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(260px, 320px) 1fr",
        gridTemplateRows: "auto 1fr",
        height: "100vh",
        background: "#0f172a",
        color: "#f1f5f9",
      }}
    >
      <header
        style={{
          gridColumn: "1 / -1",
          padding: "24px 32px",
          borderBottom: "1px solid rgba(148, 163, 184, 0.3)",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Custom Workspace</h1>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
          Room <strong>{roomName || "Unnamed room"}</strong> · Meeting ID{" "}
          <strong>{meetingID || "pending"}</strong> · Your role level:{" "}
          <strong>{islevel || "viewer"}</strong>
        </p>
      </header>

      <aside
        style={{
          padding: 24,
          borderRight: "1px solid rgba(148, 163, 184, 0.2)",
        }}
      >
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>
          Participants ({participants?.length ?? 0})
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: 8,
          }}
        >
          {(participants ?? []).map((person: Participant) => (
            <li
              key={person.id ?? person.name}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(79, 70, 229, 0.15)",
                border: "1px solid rgba(79, 70, 229, 0.4)",
              }}
            >
              <div style={{ fontWeight: 600 }}>{person.name}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                Level {person.islevel ?? "n/a"}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main
        style={{
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <section
          style={{
            padding: 24,
            borderRadius: 18,
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.25), rgba(14, 165, 233, 0.25))",
            border: "1px solid rgba(79, 70, 229, 0.55)",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.45)",
          }}
        >
          <h2 style={{ marginBottom: 12, fontSize: 18 }}>Custom Controls</h2>
          <p style={{ marginBottom: 18, fontSize: 14, maxWidth: 420 }}>
            Trigger native alerts, switch MediaSFU menus, or call any exposed
            helper via <code>parameters</code>.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                background: "#22c55e",
                color: "#022c22",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() =>
                showAlert?.({
                  message: "Custom workspace calling back into MediaSFU!",
                  type: "success",
                })
              }
            >
              Trigger success toast
            </button>
            <button
              type="button"
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(148, 163, 184, 0.6)",
                background: "transparent",
                color: "#e2e8f0",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => toggleMenuModal?.({ showMenuModal: true })}
            >
              Open menu modal
            </button>
          </div>
        </section>
        <footer style={{ fontSize: 12, opacity: 0.6 }}>
          Built using <code>customComponent</code>. Disable{" "}
          <code>enableFullCustomUI</code> to fall back to the standard UI.
        </footer>
      </main>
    </div>
  );
};

const EnhancedMainContainer: React.FC<
  React.ComponentProps<typeof MainContainerComponent>
> = (props) => (
  <div
    style={{
      border: "4px dashed rgba(139, 92, 246, 0.8)",
      borderRadius: 28,
      padding: 16,
      background: "rgba(244, 244, 255, 0.55)",
    }}
  >
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        color: "#6b21a8",
        marginBottom: 8,
      }}
    >
      Custom main container wrapper (uiOverrides.mainContainer)
    </div>
    <MainContainerComponent {...props} />
  </div>
);

const EnhancedPagination: React.FC<React.ComponentProps<typeof Pagination>> = (
  props
) => (
  <div
    style={{
      display: "grid",
      gap: 8,
      background: "#0ea5e9",
      padding: "10px 14px",
      borderRadius: 16,
      color: "#f8fafc",
    }}
  >
    <span
      style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}
    >
      Custom pagination shell
    </span>
    <Pagination {...props} />
  </div>
);

const EnhancedAlert: React.FC<React.ComponentProps<typeof AlertComponent>> = (
  props
) => (
  <AlertComponent
    {...props}
    containerProps={{
      ...props.containerProps,
      style: {
        ...(props.containerProps?.style ?? {}),
        borderRadius: 20,
        border: "2px solid rgba(249, 115, 22, 0.6)",
        boxShadow: "0 18px 38px rgba(249, 115, 22, 0.25)",
        overflow: "hidden",
      },
    }}
  />
);

const FrostedMenuModal: React.FC<React.ComponentProps<typeof MenuModal>> = (
  props
) => (
  <MenuModal
    {...props}
    overlayProps={{
      ...(props.overlayProps ?? {}),
      style: {
        backdropFilter: "blur(16px)",
        background: "rgba(15, 23, 42, 0.45)",
        ...(props.overlayProps?.style ?? {}),
      },
    }}
    contentProps={{
      ...(props.contentProps ?? {}),
      style: {
        borderRadius: 28,
        border: "1px solid rgba(148, 163, 184, 0.35)",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.35)",
        background:
          "linear-gradient(160deg, rgba(244, 244, 255, 0.92), rgba(224, 231, 255, 0.9))",
        color: "#0f172a",
        ...(props.contentProps?.style ?? {}),
      },
    }}
  />
);

const NeonParticipantsModal: React.FC<
  React.ComponentProps<typeof ParticipantsModal>
> = (props) => (
  <ParticipantsModal
    {...props}
    contentProps={{
      ...(props.contentProps ?? {}),
      style: {
        borderRadius: 26,
        background: "#0f172a",
        color: "#e2e8f0",
        border: "1px solid rgba(59, 130, 246, 0.35)",
        ...(props.contentProps?.style ?? {}),
      },
    }}
    headerProps={{
      ...(props.headerProps ?? {}),
      style: {
        ...(props.headerProps?.style ?? {}),
        borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
        padding: "18px 22px",
      },
    }}
    bodyProps={{
      ...(props.bodyProps ?? {}),
      style: {
        ...(props.bodyProps?.style ?? {}),
        background:
          "radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 70%)",
      },
    }}
  />
);

const SoftConfirmExitModal: React.FC<
  React.ComponentProps<typeof ConfirmExitModal>
> = (props) => (
  <ConfirmExitModal
    {...props}
    contentProps={{
      ...(props.contentProps ?? {}),
      style: {
        borderRadius: 24,
        background: "#fdf2f8",
        border: "1px solid rgba(236, 72, 153, 0.35)",
        ...(props.contentProps?.style ?? {}),
      },
    }}
    confirmButtonProps={{
      ...(props.confirmButtonProps ?? {}),
      style: {
        ...(props.confirmButtonProps?.style ?? {}),
        background: "#f97316",
        color: "#0f172a",
        borderRadius: 999,
        padding: "10px 22px",
        fontWeight: 600,
      },
    }}
    cancelButtonProps={{
      ...(props.cancelButtonProps ?? {}),
      style: {
        ...(props.cancelButtonProps?.style ?? {}),
        borderRadius: 999,
        padding: "10px 22px",
      },
    }}
  />
);

const SlateScreenboardModal: React.FC<
  React.ComponentProps<typeof ScreenboardModal>
> = (props) => (
  <ScreenboardModal
    {...props}
    backgroundColor={props.backgroundColor ?? "rgba(15, 23, 42, 0.9)"}
    position={props.position ?? "center"}
  />
);

// -----------------------------------------------------------------------------
// AppUnique Component
// -----------------------------------------------------------------------------
const AppUnique: React.FC = () => {
  const [sourceParameters, setSourceParameters] = useState<{
    [key: string]: any;
  }>({});
  const updateSourceParameters = (data: { [key: string]: any }) => {
    setSourceParameters(data);
  };

  // ---------------------------------------------------------------------------
  // Connection Scenarios
  // ---------------------------------------------------------------------------
  const preset = connectionPresets[connectionScenario];
  const { credentials, localLink, connectMediaSFU } = preset;

  // When the UI is bypassed, simulate pre-join input here
  const noUIPreJoinOptions:
    | CreateMediaSFURoomOptions
    | JoinMediaSFURoomOptions
    | undefined = enableNoUIPreJoin
    ? {
        action: "create",
        capacity: 12,
        duration: 30,
        eventType: "conference",
        userName: "Demo Host",
      }
    : undefined;

  const cardOverrides = useMemo<
    Partial<
      Pick<
        MediasfuGenericOptions,
        "customVideoCard" | "customAudioCard" | "customMiniCard"
      >
    >
  >(() => {
    if (!enableCardBuilders) {
      return {};
    }

    return {
      customVideoCard: ShowcaseVideoCard,
      customAudioCard: ShowcaseAudioCard,
      customMiniCard: ShowcaseMiniCard,
    };
  }, []);

  const uiOverrides = useMemo<MediasfuUICustomOverrides | undefined>(() => {
    if (!enableUICoreOverrides && !enableModalOverrides) {
      return undefined;
    }

    const overrides: MediasfuUICustomOverrides = {};

    if (enableUICoreOverrides) {
      overrides.mainContainer = { component: EnhancedMainContainer };
      overrides.pagination = { component: EnhancedPagination };
      overrides.alert = { component: EnhancedAlert };
    }

    if (enableModalOverrides) {
      overrides.menuModal = { component: FrostedMenuModal };
      overrides.participantsModal = { component: NeonParticipantsModal };
      overrides.confirmExitModal = { component: SoftConfirmExitModal };
      overrides.screenboardModal = { component: SlateScreenboardModal };
    }

    return Object.keys(overrides).length > 0 ? overrides : undefined;
  }, []);

  const containerStyle = enableContainerStyling
    ? {
        background:
          "linear-gradient(135deg, #f9fafb 0%, #e0f2fe 45%, #ede9fe 100%)",
        borderRadius: 32,
        padding: "12px 12px 24px",
        boxShadow: "0 18px 48px rgba(15, 23, 42, 0.18)",
      }
    : undefined;

  const ExperienceComponent = experienceComponentMap[selectedExperience];

  const preJoinRenderer = showPrebuiltUI
    ? (options: React.ComponentProps<typeof PreJoinPage>) => (
        <PreJoinPage {...options} />
      )
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

export default AppUnique;
