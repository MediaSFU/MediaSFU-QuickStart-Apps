<template>
  <component
    :is="selectedExperienceComponent"
    :PrejoinPage="preJoinRenderer" 
    :local-link="preset.localLink"
    :connect-media-s-f-u="preset.connectMediaSFU"
    :credentials="preset.credentials"
    :create-media-s-f-u-room="createRoomOnMediaSFU"
    :join-media-s-f-u-room="joinRoomOnMediaSFU"
    :ui-overrides="uiOverrides"
  />
</template>

<script setup lang="ts">
import { computed, h, type Component } from 'vue';
import {
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuWebinar,
  MediasfuConference,
  MediasfuChat,
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
  createRoomOnMediaSFU,
  joinRoomOnMediaSFU,
} from 'mediasfu-vue';

import type { Participant, ShowAlert, MediasfuUICustomOverrides } from 'mediasfu-vue';

type CustomVideoCardOptions = {
  customStyle?: Record<string, unknown>;
  containerProps?: Record<string, unknown>;
  cardProps?: Record<string, unknown>;
  nameContainerProps?: Record<string, unknown>;
  nameTextProps?: Record<string, unknown>;
  [key: string]: unknown;
};

type CustomAudioCardOptions = {
  barColor?: string;
  customStyle?: Record<string, unknown>;
  cardProps?: Record<string, unknown>;
  nameContainerProps?: Record<string, unknown>;
  nameTextProps?: Record<string, unknown>;
  [key: string]: unknown;
};

type CustomMiniCardOptions = {
  customStyle?: Record<string, unknown>;
  initials?: string;
  fontSize?: number;
  renderContainer?: (options: { defaultContainer: unknown; isImage: boolean }) => unknown;
  [key: string]: unknown;
};

type CustomComponentOptions = {
  parameters: {
    roomName?: string;
    participants?: Participant[];
    islevel?: string;
    meetingID?: string;
    showAlert?: ShowAlert;
    toggleMenuModal?: (options: { showMenuModal: boolean }) => void;
    [key: string]: unknown;
  };
};

type CustomVideoCardType = (options: CustomVideoCardOptions) => unknown;
type CustomAudioCardType = (options: CustomAudioCardOptions) => unknown;
type CustomMiniCardType = (options: CustomMiniCardOptions) => unknown;
type CustomComponentType = (options: CustomComponentOptions) => unknown;

// -----------------------------------------------------------------------------
// Toggle Configuration
// -----------------------------------------------------------------------------
type ConnectionScenario = 'cloud' | 'hybrid' | 'ce';
type ExperienceKey = 'generic' | 'broadcast' | 'webinar' | 'conference' | 'chat';

const connectionScenario: ConnectionScenario = 'cloud'; 
const selectedExperience: ExperienceKey = 'generic';

const showPrebuiltUI = true; // ✅ Changed to true to show PreJoinPage
// const enableFullCustomUI = false; // Reserved for custom workspace UI
const enableCardBuilders = true;
const enableUICoreOverrides = true;
const enableModalOverrides = true;
// const enableContainerStyling = true; // Reserved for container styling
// const enableBackendProxyHooks = false; // Reserved for future backend proxy hooks
// const enableNoUIPreJoin = false; // Reserved for future pre-join options
// const enableDebugPanel = false; // Reserved for future debug panel

// -----------------------------------------------------------------------------
// Connection Presets
// -----------------------------------------------------------------------------
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
      apiUserName: import.meta.env.VITE_MEDIASFU_API_USERNAME || 'your_api_username',
      apiKey: import.meta.env.VITE_MEDIASFU_API_KEY || 'your_api_key',
    },
    localLink: '',
    connectMediaSFU: true,
  },
  hybrid: {
    credentials: {
      apiUserName: import.meta.env.VITE_MEDIASFU_API_USERNAME || 'your_api_username',
      apiKey: import.meta.env.VITE_MEDIASFU_API_KEY || 'your_api_key',
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

// -----------------------------------------------------------------------------
// Custom Card Components
// -----------------------------------------------------------------------------
const ShowcaseVideoCard: CustomVideoCardType = (props) => {
  const { customStyle, containerProps, cardProps, nameContainerProps, nameTextProps, ...rest } = props;

  return h(
    VideoCard as Component,
    {
      ...rest,
      customStyle: {
        ...(customStyle ?? {}),
        borderRadius: 24,
        border: '4px solid #f472b6',
        boxShadow: '0 24px 55px rgba(236, 72, 153, 0.35)',
        backgroundColor: '#1e1b4b',
        backgroundImage:
          'linear-gradient(140deg, rgba(76, 29, 149, 0.65), rgba(190, 24, 93, 0.55))',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      },
      containerProps: {
        ...(containerProps ?? {}),
        style: {
          ...(containerProps?.style as Record<string, unknown> ?? {}),
          borderRadius: '28px',
          padding: '6px',
          background:
            'linear-gradient(115deg, rgba(217, 70, 239, 0.35), rgba(14, 165, 233, 0.25))',
        },
      },
      cardProps: {
        ...(cardProps ?? {}),
        style: {
          ...(cardProps?.style as Record<string, unknown> ?? {}),
          padding: 22,
          gap: 16,
        },
      },
      nameContainerProps: {
        ...(nameContainerProps ?? {}),
        style: {
          ...(nameContainerProps?.style as Record<string, unknown> ?? {}),
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(236, 72, 153, 0.18)',
          padding: '8px 14px',
          borderRadius: '999px',
        },
      },
      nameTextProps: {
        ...(nameTextProps ?? {}),
        style: {
          ...(nameTextProps?.style as Record<string, unknown> ?? {}),
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: '#fdf4ff',
        },
      },
    } as Record<string, unknown>,
    {
      'extra-widgets': () =>
        h(
          'div',
          {
            style: {
              position: 'absolute',
              top: '14px',
              left: '16px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.85)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.35)',
            },
          },
          'Showcase Video'
        ),
    }
  );
};

const ShowcaseAudioCard: CustomAudioCardType = (props) => {
  const { barColor = '#16a34a', customStyle, cardProps, nameContainerProps, nameTextProps, ...rest } = props;

  const waveformContainerPropsOriginal = rest.waveformContainerProps as Record<string, unknown> | undefined;
  const waveformContainerStyleOriginal =
    (waveformContainerPropsOriginal?.style as Record<string, unknown>) ?? undefined;

  return h(
    AudioCard as Component,
    {
      ...rest,
      barColor,
      customStyle: {
        ...(customStyle ?? {}),
        borderRadius: 26,
        backgroundColor: '#052e16',
        backgroundImage: 'linear-gradient(160deg, rgba(22, 163, 74, 0.65), rgba(21, 128, 61, 0.55))',
        border: '4px solid rgba(22, 163, 74, 0.65)',
        boxShadow: '0 24px 55px rgba(22, 163, 74, 0.35)',
        overflow: 'hidden',
        position: 'relative',
      },
      cardProps: {
        ...(cardProps ?? {}),
        style: {
          ...(cardProps?.style as Record<string, unknown> ?? {}),
          padding: 24,
          gap: 18,
        },
      },
      nameContainerProps: {
        ...(nameContainerProps ?? {}),
        style: {
          ...(nameContainerProps?.style as Record<string, unknown> ?? {}),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: 'rgba(16, 185, 129, 0.25)',
          borderRadius: '18px',
          padding: '10px 16px',
        },
      },
      nameTextProps: {
        ...(nameTextProps ?? {}),
        style: {
          ...(nameTextProps?.style as Record<string, unknown> ?? {}),
          fontSize: 18,
          fontWeight: 700,
          color: '#d1fae5',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        },
      },
      waveformContainerProps: {
        ...(waveformContainerPropsOriginal ?? {}),
        style: {
          ...(waveformContainerStyleOriginal ?? {}),
          background: 'rgba(5, 46, 22, 0.45)',
          borderRadius: '14px',
          padding: '6px 12px',
        },
      },
    } as Record<string, unknown>,
    {
      default: () =>
        h(
          'div',
          {
            style: {
              position: 'absolute',
              inset: 'auto 16px 16px auto',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(34, 197, 94, 0.85)',
              color: '#022c22',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 10px 24px rgba(22, 163, 74, 0.35)',
            },
          },
          'Showcase Audio'
        ),
    }
  );
};

const ShowcaseMiniCard: CustomMiniCardType = (props) => {
  const { customStyle, initials, fontSize, renderContainer, ...rest } = props;

  const decorateContainer = ({
    defaultContainer,
  }: {
    defaultContainer: unknown;
    isImage: boolean;
  }) =>
    h(
      'div',
      {
        style: {
          display: 'grid',
          gap: '10px',
          justifyItems: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          padding: '14px',
          borderRadius: '20px',
          background:
            'linear-gradient(160deg, rgba(249, 115, 22, 0.35), rgba(249, 168, 37, 0.4))',
          boxShadow: '0 18px 40px rgba(217, 119, 6, 0.35)',
          position: 'relative',
        },
      },
      {
        default: () => [
          h(
            'span',
            {
              style: {
                position: 'absolute',
                top: '12px',
                right: '16px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(234, 88, 12, 0.85)',
                color: '#fff7ed',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              },
            },
            'Showcase Mini'
          ),
          defaultContainer,
        ],
      }
    );

  const combinedRenderContainer = (options: { defaultContainer: unknown; isImage: boolean }) => {
    const decorated = decorateContainer(options);
    return renderContainer
      ? renderContainer({ defaultContainer: decorated, isImage: options.isImage })
      : decorated;
  };

  return h(MiniCard as Component, {
    ...rest,
    initials: initials ?? '',
    fontSize: fontSize ?? 16,
    customStyle: {
      ...(customStyle ?? {}),
      borderRadius: 24,
      border: '3px dashed rgba(249, 115, 22, 0.85)',
      backgroundColor: '#451a03',
      backgroundImage: 'linear-gradient(145deg, rgba(249, 115, 22, 0.6), rgba(217, 119, 6, 0.55))',
      color: '#fffbeb',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      padding: '16px',
      display: 'grid',
      placeItems: 'center',
      gap: '8px',
      width: '100%',
      height: '100%',
      minHeight: '100%',
      boxSizing: 'border-box',
    },
    renderContainer: combinedRenderContainer,
  } as Record<string, unknown>);
};

// -----------------------------------------------------------------------------
// Custom Workspace Component (Reserved for future use)
// -----------------------------------------------------------------------------
// Uncomment to enable full custom workspace UI by setting enableFullCustomUI = true
// @ts-expect-error - Reserved for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomWorkspace: CustomComponentType = (props) => {
  const { parameters } = props;
  const { roomName, participants, islevel, meetingID, showAlert, toggleMenuModal } = parameters;

  return h(
    'div',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 320px) 1fr',
        gridTemplateRows: 'auto 1fr',
        height: '100vh',
        background: '#0f172a',
        color: '#f1f5f9',
      },
    },
    [
      h(
        'header',
        {
          style: {
            gridColumn: '1 / -1',
            padding: '24px 32px',
            borderBottom: '1px solid rgba(148, 163, 184, 0.3)',
          },
        },
        [
          h('h1', { style: { fontSize: '28px', marginBottom: '8px' } }, 'Custom Workspace'),
          h('p', { style: { margin: 0, fontSize: '14px', opacity: 0.8 } }, [
            'Room ',
            h('strong', roomName || 'Unnamed room'),
            ' · Meeting ID ',
            h('strong', meetingID || 'pending'),
            ' · Your role level: ',
            h('strong', islevel || 'viewer'),
          ]),
        ]
      ),
      h(
        'aside',
        { style: { padding: '24px', borderRight: '1px solid rgba(148, 163, 184, 0.2)' } },
        [
          h(
            'h2',
            { style: { fontSize: '16px', marginBottom: '12px' } },
            `Participants (${participants?.length ?? 0})`
          ),
          h(
            'ul',
            { style: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' } },
            (participants ?? []).map((person: Participant) =>
              h(
                'li',
                {
                  key: person.id ?? person.name,
                  style: {
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(79, 70, 229, 0.15)',
                    border: '1px solid rgba(79, 70, 229, 0.4)',
                  },
                },
                [
                  h('div', { style: { fontWeight: 600 } }, person.name),
                  h(
                    'div',
                    { style: { fontSize: '12px', opacity: 0.8 } },
                    `Level ${person.islevel ?? 'n/a'}`
                  ),
                ]
              )
            )
          ),
        ]
      ),
      h(
        'main',
        { style: { padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' } },
        [
          h(
            'section',
            {
              style: {
                padding: '24px',
                borderRadius: '18px',
                background:
                  'linear-gradient(135deg, rgba(79, 70, 229, 0.25), rgba(14, 165, 233, 0.25))',
                border: '1px solid rgba(79, 70, 229, 0.55)',
                boxShadow: '0 18px 45px rgba(15, 23, 42, 0.45)',
              },
            },
            [
              h('h2', { style: { marginBottom: '12px', fontSize: '18px' } }, 'Custom Controls'),
              h(
                'p',
                { style: { marginBottom: '18px', fontSize: '14px', maxWidth: '420px' } },
                [
                  'Trigger native alerts, switch MediaSFU menus, or call any exposed helper via ',
                  h('code', 'parameters'),
                  '.',
                ]
              ),
              h('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } }, [
                h(
                  'button',
                  {
                    type: 'button',
                    style: {
                      padding: '10px 18px',
                      borderRadius: '999px',
                      border: 'none',
                      background: '#22c55e',
                      color: '#022c22',
                      fontWeight: 600,
                      cursor: 'pointer',
                    },
                    onClick: () =>
                      showAlert?.({
                        message: 'Custom workspace calling back into MediaSFU!',
                        type: 'success',
                      }),
                  },
                  'Trigger success toast'
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    style: {
                      padding: '10px 18px',
                      borderRadius: '999px',
                      border: '1px solid rgba(148, 163, 184, 0.6)',
                      background: 'transparent',
                      color: '#e2e8f0',
                      fontWeight: 600,
                      cursor: 'pointer',
                    },
                    onClick: () => toggleMenuModal?.({ showMenuModal: true }),
                  },
                  'Open menu modal'
                ),
              ]),
            ]
          ),
          h(
            'footer',
            { style: { fontSize: '12px', opacity: 0.6 } },
            [
              'Built using ',
              h('code', 'customComponent'),
              '. Disable ',
              h('code', 'enableFullCustomUI'),
              ' to fall back to the standard UI.',
            ]
          ),
        ]
      ),
    ]
  );
};

// -----------------------------------------------------------------------------
// UI Override Components
// -----------------------------------------------------------------------------

const EnhancedPagination = (props: Record<string, unknown>) => {
  return h(
    'div',
    {
      style: {
        display: 'grid',
        gap: '8px',
        background: '#0ea5e9',
        padding: '10px 14px',
        borderRadius: '16px',
        color: '#f8fafc',
      },
    },
    [
      h(
        'span',
        { style: { fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' } },
        'Custom pagination shell'
      ),
      h(Pagination as Component, props as Record<string, unknown>),
    ]
  );
};

const EnhancedAlert = (props: Record<string, unknown>) => {
  return h(AlertComponent as Component, {
    ...props,
    containerProps: {
      ...(props.containerProps as Record<string, unknown>),
      style: {
        ...((props.containerProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
        borderRadius: '20px',
        border: '2px solid rgba(249, 115, 22, 0.6)',
        boxShadow: '0 18px 38px rgba(249, 115, 22, 0.25)',
        overflow: 'hidden',
      },
    },
  } as Record<string, unknown>);
};

const FrostedMenuModal = (props: Record<string, unknown>) => {
  return h(MenuModal as Component, {
    ...props,
    overlayProps: {
      ...(props.overlayProps as Record<string, unknown> ?? {}),
      style: {
        backdropFilter: 'blur(16px)',
        background: 'rgba(15, 23, 42, 0.45)',
        ...((props.overlayProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
      },
    },
    contentProps: {
      ...(props.contentProps as Record<string, unknown> ?? {}),
      style: {
        borderRadius: '28px',
        border: '1px solid rgba(148, 163, 184, 0.35)',
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.35)',
        background:
          'linear-gradient(160deg, rgba(244, 244, 255, 0.92), rgba(224, 231, 255, 0.9))',
        color: '#0f172a',
        ...((props.contentProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
      },
    },
  } as Record<string, unknown>);
};

const NeonParticipantsModal = (props: Record<string, unknown>) => {
  return h(ParticipantsModal as Component, {
    ...props,
    contentProps: {
      ...(props.contentProps as Record<string, unknown> ?? {}),
      style: {
        borderRadius: '26px',
        background: '#0f172a',
        color: '#e2e8f0',
        border: '1px solid rgba(59, 130, 246, 0.35)',
        ...((props.contentProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
      },
    },
    headerProps: {
      ...(props.headerProps as Record<string, unknown> ?? {}),
      style: {
        ...((props.headerProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
        borderBottom: '1px solid rgba(148, 163, 184, 0.35)',
        padding: '18px 22px',
      },
    },
    bodyProps: {
      ...(props.bodyProps as Record<string, unknown> ?? {}),
      style: {
        ...((props.bodyProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
        background: 'radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 70%)',
      },
    },
  } as Record<string, unknown>);
};

const SoftConfirmExitModal = (props: Record<string, unknown>) => {
  return h(ConfirmExitModal as Component, {
    ...props,
    contentProps: {
      ...(props.contentProps as Record<string, unknown> ?? {}),
      style: {
        borderRadius: '24px',
        background: '#fdf2f8',
        border: '1px solid rgba(236, 72, 153, 0.35)',
        ...((props.contentProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
      },
    },
    confirmButtonProps: {
      ...(props.confirmButtonProps as Record<string, unknown> ?? {}),
      style: {
        ...((props.confirmButtonProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
        background: '#f97316',
        color: '#0f172a',
        borderRadius: '999px',
        padding: '10px 22px',
        fontWeight: 600,
      },
    },
    cancelButtonProps: {
      ...(props.cancelButtonProps as Record<string, unknown> ?? {}),
      style: {
        ...((props.cancelButtonProps as Record<string, unknown>)?.style as Record<string, unknown> ?? {}),
        borderRadius: '999px',
        padding: '10px 22px',
      },
    },
  } as Record<string, unknown>);
};

const SlateScreenboardModal = (props: Record<string, unknown>) => {
  return h(ScreenboardModal as Component, {
    ...props,
    backgroundColor: props.backgroundColor ?? 'rgba(15, 23, 42, 0.9)',
    position: props.position ?? 'center',
  } as Record<string, unknown>);
};

// -----------------------------------------------------------------------------
// Experience Component Mapping
// -----------------------------------------------------------------------------
const experienceComponentMap: Record<ExperienceKey, Component> = {
  generic: MediasfuGeneric,
  broadcast: MediasfuBroadcast,
  webinar: MediasfuWebinar,
  conference: MediasfuConference,
  chat: MediasfuChat,
};

// -----------------------------------------------------------------------------
// Computed Properties
// -----------------------------------------------------------------------------
const preset = computed(() => connectionPresets[connectionScenario]);
console.log('Using connection scenario:', connectionScenario, preset.value);

// Reserved for future pre-join options - uncomment when needed
// const noUIPreJoinOptions = computed<
//   CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | undefined
// >(() => {
//   if (!enableNoUIPreJoin) {
//     return undefined;
//   }
//   return {
//     action: 'create',
//     capacity: 12,
//     duration: 30,
//     eventType: 'conference',
//     userName: 'Demo Host',
//   } as CreateMediaSFURoomOptions;
// });

// ✅ Integrated UI Overrides (combines card overrides + UI/modal overrides)
const uiOverrides = computed<MediasfuUICustomOverrides | undefined>(() => {
  if (!enableCardBuilders && !enableUICoreOverrides && !enableModalOverrides) {
    return undefined;
  }

  const overrides: MediasfuUICustomOverrides = {};

  // ✅ NEW: Integrate custom cards into uiOverrides (not separate prop)
  if (enableCardBuilders) {
    overrides.videoCard = { component: ShowcaseVideoCard as Component };
    overrides.audioCard = { component: ShowcaseAudioCard as Component };
    overrides.miniCard = { component: ShowcaseMiniCard as Component };
  }

  if (enableUICoreOverrides) {
    overrides.pagination = { component: EnhancedPagination as Component };
    overrides.alert = { component: EnhancedAlert as Component };
  }

  if (enableModalOverrides) {
    overrides.menuModal = { component: FrostedMenuModal as Component };
    overrides.participantsModal = { component: NeonParticipantsModal as Component };
    overrides.confirmExitModal = { component: SoftConfirmExitModal as Component };
    overrides.screenboardModal = { component: SlateScreenboardModal as Component };
  }

  return Object.keys(overrides).length > 0 ? overrides : undefined;
});

// Reserved for future container styling - uncomment when needed
// const containerStyle = computed(() => {
//   if (!enableContainerStyling) {
//     return undefined;
//   }
//   return {
//     background: 'linear-gradient(135deg, #f9fafb 0%, #e0f2fe 45%, #ede9fe 100%)',
//     borderRadius: '32px',
//     padding: '12px 12px 24px',
//     boxShadow: '0 18px 48px rgba(15, 23, 42, 0.18)',
//   };
// });

const selectedExperienceComponent = computed(() => experienceComponentMap[selectedExperience]);

// ✅ PreJoinPage should be passed directly as a component, not wrapped in h()
const preJoinRenderer = computed(() => {
  if (!showPrebuiltUI) {
    return undefined;
  }
  return PreJoinPage;
});

// Reserved for full custom UI - uncomment when needed
// const customComponent = computed(() => (enableFullCustomUI ? CustomWorkspace : undefined));

// Reactive state (reserved for future use) - uncomment when needed
// const sourceParameters = ref<Record<string, unknown>>({});
// const updateSourceParameters = (data: Record<string, unknown>) => {
//   sourceParameters.value = data;
// };
</script>

<style scoped>
/* Global scoped styles if needed */
</style>
