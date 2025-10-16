<!-- <script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import AppGeneric from './AppGeneric.vue'
import AppBroadcast from './AppBroadcast.vue'
import AppChat from './AppChat.vue'
import AppConference from './AppConference.vue'
import AppWebinar from './AppWebinar.vue'

const demos = [
  {
    id: 'generic',
    label: 'Generic (default)',
    blurb: 'All-in-one component with every control exposed.',
    component: AppGeneric as Component,
  },
  {
    id: 'broadcast',
    label: 'Broadcast',
    blurb: 'Host + viewers with HLS egress and recording tooling.',
    component: AppBroadcast as Component,
  },
  {
    id: 'chat',
    label: 'Chat',
    blurb: 'Moderated messaging room with optional AV.',
    component: AppChat as Component,
  },
  {
    id: 'webinar',
    label: 'Webinar',
    blurb: 'Structured stage management for presenters and attendees.',
    component: AppWebinar as Component,
  },
  {
    id: 'conference',
    label: 'Conference',
    blurb: 'Interactive collaboration with breakout rooms and co-hosts.',
    component: AppConference as Component,
  },
] as const

const selectedId = ref<typeof demos[number]['id']>('generic')

const selectedDemo = computed(() => demos.find((demo) => demo.id === selectedId.value) ?? demos[0])
</script>

<template>
  <div class="app-root">
    <aside class="app-root__sidebar">
      <h1>MediaSFU Vue SDK</h1>
      <p class="sidebar__lead">
        Pick a scenario to preview the mirrored Vue guide. To develop against a specific entry, point
        <code>src/main.ts</code> at the corresponding <code>App*.vue</code> file.
      </p>

      <nav class="demo-picker">
        <button
          v-for="demo in demos"
          :key="demo.id"
          class="demo-picker__item"
          :class="{ 'demo-picker__item--active': demo.id === selectedDemo.id }"
          type="button"
          @click="selectedId = demo.id"
        >
          <span class="demo-picker__label">{{ demo.label }}</span>
          <span class="demo-picker__blurb">{{ demo.blurb }}</span>
        </button>
      </nav>
    </aside>

    <section class="app-root__stage">
      <component :is="selectedDemo.component" />
    </section>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  background: #020617;
  color: #e2e8f0;
}

.app-root__sidebar {
  padding: 2rem 1.75rem;
  border-right: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app-root__sidebar h1 {
  margin: 0;
  font-size: 1.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sidebar__lead {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(226, 232, 240, 0.75);
}

.demo-picker {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-picker__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  border: 1px solid transparent;
  background: rgba(2, 132, 199, 0.18);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.demo-picker__item:hover {
  border-color: rgba(96, 165, 250, 0.6);
  transform: translateY(-2px);
}

.demo-picker__item--active {
  border-color: rgba(14, 165, 233, 0.85);
  background: rgba(14, 165, 233, 0.25);
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.25);
}

.demo-picker__label {
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
}

.demo-picker__blurb {
  font-size: 0.8rem;
  color: rgba(226, 232, 240, 0.7);
}

.app-root__stage {
  min-height: 100vh;
  overflow: auto;
}

@media (max-width: 920px) {
  .app-root {
    grid-template-columns: 1fr;
  }

  .app-root__sidebar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(15, 23, 42, 0.95);
  }
}
</style> -->

<!-- eslint-disable -->
<!--
 * MediaSFU Component Configuration and Usage Guide
 *
 * The following code and comments will guide you through:
 * 1. Configuring the MediaSFU component with different server and credential setups.
 * 2. Handling API credentials securely depending on whether you use MediaSFU Cloud or your own MediaSFU CE server.
 * 3. Rendering custom UIs by disabling the default MediaSFU UI.
 * 4. Using custom "create room" and "join room" functions for secure, flexible integration.
 *
 * Note: All guide instructions are provided as code comments. They will not render to the user directly.
-->

<script setup lang="ts">
import 'mediasfu-vue/dist/mediasfu-vue.css';
import { ref, h, computed, type Component } from 'vue'
// MediaSFU view components (if you choose to use them)
import { MediasfuGeneric } from 'mediasfu-vue'
// import { MediasfuBroadcast } from 'mediasfu-vue'
// import { MediasfuChat } from 'mediasfu-vue'
// import { MediasfuWebinar } from 'mediasfu-vue'
// import { MediasfuConference } from 'mediasfu-vue'

import type { MediasfuUICustomOverrides } from 'mediasfu-vue'

// Pre-Join Page component (if you choose to use it)
import { PreJoinPage } from 'mediasfu-vue'

// Import custom "create" and "join" room functions
import { createRoomOnMediaSFU, joinRoomOnMediaSFU } from 'mediasfu-vue'
import type { CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from 'mediasfu-vue'

/**
 * App Component
 *
 * This component demonstrates how to:
 * - Configure credentials for MediaSFU Cloud and/or Community Edition (CE).
 * - Use MediaSFU with or without a custom server.
 * - Integrate a pre-join page.
 * - Return no UI and manage state through sourceParameters, allowing a fully custom frontend.
 *
 * Basic instructions:
 * 1. Set `localLink` to your CE server if you have one, or leave it blank to use MediaSFU Cloud.
 * 2. Set `connectMediaSFU` to determine whether you're connecting to MediaSFU Cloud services.
 * 3. Provide credentials if using MediaSFU Cloud (dummy credentials are acceptable in certain scenarios).
 * 4. If you prefer a custom UI, set `returnUI` to false and handle all interactions via `sourceParameters` and `updateSourceParameters`.
 * 5. For secure production usage, consider using custom `createMediaSFURoom` and `joinMediaSFURoom` functions to forward requests through your backend.
 */

// =========================================================
//                API CREDENTIALS CONFIGURATION
// =========================================================
//
// Scenario A: Not using MediaSFU Cloud at all.
// - No credentials needed. Just set localLink to your CE server.
// Example:
/*
const credentials = {};
const localLink = 'http://your-ce-server.com'; //http://localhost:3000
const connectMediaSFU = localLink.trim() !== '';
*/

// Scenario B: Using MediaSFU CE + MediaSFU Cloud for Egress only.
// - Use dummy credentials (8 chars for userName, 64 chars for apiKey).
// - Your CE backend will forward requests with your real credentials.
/*
const credentials = {
  apiUserName: 'dummyUsr',
  apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
};
const localLink = 'http://your-ce-server.com'; //http://localhost:3000
const connectMediaSFU = localLink.trim() !== '';
*/

// Scenario C: Using MediaSFU Cloud without your own server.
// - For development, use your actual or dummy credentials.
// - In production, securely handle credentials server-side and use custom room functions.
const credentials = {
  apiUserName: 'patience', // 8 chars recommended for dummy
  apiKey: 'e1eb5a3280d1f82997c2839d740579d6b8d416bc077b976e340f065d67351bd1', // 64 chars
}
const localLink = '' // Leave empty if not using your own server
const connectMediaSFU = true // Set to true if using MediaSFU Cloud since localLink is empty

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
// Example noUIPreJoinOptions:
const noUIPreJoinOptions = ref<CreateMediaSFURoomOptions | JoinMediaSFURoomOptions>({
  action: 'create',
  capacity: 10,
  duration: 15,
  eventType: 'broadcast',
  userName: 'Prince',
})

// Example for joining a room:
// const noUIPreJoinOptions = ref<CreateMediaSFURoomOptions | JoinMediaSFURoomOptions>({
//   action: 'join',
//   userName: 'Prince',
//   meetingID: 'yourMeetingID'
// });

const returnUI = true // Set to false for custom UI, true for default MediaSFU UI

const sourceParameters = ref<Record<string, any>>({})
const updateSourceParameters = (data: Record<string, any>) => {
  sourceParameters.value = data
}

// =========================================================
//              UI OVERRIDES CONFIGURATION
// =========================================================
//
// The MediaSFU Vue SDK now expects custom cards to flow through the
// consolidated `uiOverrides` object.
const uiOverrides = computed<MediasfuUICustomOverrides>(() => ({
  videoCard: { component: CustomVideoCard },
  audioCard: { component: CustomAudioCard },
  miniCard: { component: CustomMiniCard },
}))

// =========================================================
//                CUSTOM ROOM FUNCTIONS (OPTIONAL)
// =========================================================
//
// To securely forward requests to MediaSFU:
// - Implement custom `createMediaSFURoom` and `joinMediaSFURoom` functions.
// - These functions send requests to your server, which then communicates with MediaSFU Cloud.
//
// Already imported `createRoomOnMediaSFU` and `joinRoomOnMediaSFU` are examples.
//
// If using MediaSFU CE backend, ensure your server endpoints:
// - Validate dummy credentials.
// - Forward requests to mediasfu.com with real credentials.

// =========================================================
//              CUSTOM CARD COMPONENTS (OPTIONAL)
// =========================================================
//
// You can customize how individual video cards, audio cards, and mini cards
// are displayed by providing custom components. This is perfect for 
// implementing your own card layouts while keeping MediaSFU's core functionality.

// Custom Video Card Component (Vue 3 equivalent)
const CustomVideoCard: Component = {
  props: {
    participant: Object,
    stream: Object,
    width: [Number, String],
    height: [Number, String],
    doMirror: String,
    showControls: { type: Boolean, default: true },
    showInfo: { type: Boolean, default: true },
    name: String,
    backgroundColor: { type: String, default: '#2a2a2a' }
  },
  setup(props) {
    const videoRef = ref<HTMLVideoElement | null>(null)

    return () => h('div', {
      style: {
        backgroundColor: props.backgroundColor,
        borderRadius: '12px',
        border: '2px solid #4CAF50',
        padding: '10px',
        margin: '5px',
        position: 'relative',
        width: typeof props.width === 'number' ? `${props.width}px` : (props.width || '200px'),
        height: typeof props.height === 'number' ? `${props.height}px` : (props.height || '150px'),
      }
    }, [
      // Video container
      h('div', {
        style: {
          width: '100%',
          height: '80%',
          backgroundColor: '#000',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }
      }, [
        props.stream ? h('video', {
          ref: videoRef,
          autoplay: true,
          muted: props.participant?.muted || false,
          playsinline: true,
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: props.doMirror === 'true' ? 'scaleX(-1)' : 'none'
          },
          onVnodeMounted: (vnode: any) => {
            const video = vnode.el as HTMLVideoElement
            if (video && props.stream) {
              video.srcObject = props.stream as MediaStream
              video.play().catch(() => {})
            }
          }
        }) : null,
        // User info overlay
        props.showInfo && props.name ? h('div', {
          style: {
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        }, props.name) : null
      ]),
      // Controls
      props.showControls ? h('div', {
        style: {
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
          gap: '8px'
        }
      }, [
        h('button', {
          style: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '10px',
            cursor: 'pointer'
          }
        }, 'Custom Action')
      ]) : null
    ])
  }
}

// Custom Audio Card Component (Vue 3 equivalent)
const CustomAudioCard: Component = {
  props: {
    name: String,
    barColor: String,
    textColor: String,
    imageSource: String,
    roundedImage: Boolean,
    imageStyle: Object
  },
  setup(props) {
    return () => h('div', {
      style: {
        backgroundColor: '#1e1e1e',
        borderRadius: '25px',
        border: `2px solid ${props.barColor || '#ccc'}`,
        padding: '15px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minHeight: '60px',
      }
    }, [
      // Avatar or Image
      h('div', {
        style: {
          width: '40px',
          height: '40px',
          borderRadius: props.roundedImage ? '50%' : '8px',
          backgroundColor: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          ...(props.imageStyle || {})
        }
      }, [
        props.imageSource ? h('img', {
          src: props.imageSource,
          alt: props.name,
          style: {
            width: '100%',
            height: '100%',
            borderRadius: props.roundedImage ? '50%' : '8px',
            objectFit: 'cover'
          }
        }) : (props.name ? props.name.charAt(0).toUpperCase() : '')
      ]),
      // Info section
      h('div', { style: { flex: 1 } }, [
        h('div', {
          style: {
            color: props.textColor,
            fontWeight: 'bold',
            fontSize: '14px',
            marginBottom: '4px'
          }
        }, props.name),
        // Audio level visualization
        h('div', {
          style: {
            display: 'flex',
            gap: '2px',
            alignItems: 'end',
            height: '20px'
          }
        }, Array.from({ length: 8 }).map((_, i) => 
          h('div', {
            key: i,
            style: {
              width: '3px',
              height: `${Math.random() * 15 + 5}px`,
              backgroundColor: props.barColor || '#ccc',
              borderRadius: '1px',
              opacity: 0.7
            }
          })
        ))
      ]),
      // Status indicator
      h('div', {
        style: {
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: props.barColor || '#ccc',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }
      }, '🎤')
    ])
  }
}

// Custom Mini Card Component (Vue 3 equivalent)
const CustomMiniCard: Component = {
  props: {
    initials: String,
    fontSize: String,
    customStyle: Object,
    name: String,
    showVideoIcon: Boolean,
    showAudioIcon: Boolean,
    imageSource: String,
    roundedImage: Boolean,
    imageStyle: Object
  },
  setup(props) {
    const hover = ref(false)

    return () => h('div', {
      style: {
        width: '50px',
        height: '50px',
        borderRadius: props.roundedImage ? '50%' : '12px',
        background: props.customStyle ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#4CAF50',
        border: '2px solid #fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: props.fontSize || '14px',
        margin: '2px',
        boxShadow: hover.value ? '0 4px 12px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        transform: hover.value ? 'scale(1.1)' : 'scale(1)',
        ...(props.imageStyle || {})
      },
      title: props.name,
      onMouseenter: () => { hover.value = true },
      onMouseleave: () => { hover.value = false }
    }, [
      props.imageSource ? h('img', {
        src: props.imageSource,
        alt: props.name,
        style: {
          width: '100%',
          height: '100%',
          borderRadius: props.roundedImage ? '50%' : '8px',
          objectFit: 'cover'
        }
      }) : props.initials,
      // Video/Audio status icons
      h('div', {
        style: {
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          display: 'flex',
          gap: '2px'
        }
      }, [
        props.showVideoIcon ? h('div', {
          style: {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#4CAF50',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }, '📹') : null,
        props.showAudioIcon ? h('div', {
          style: {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#2196F3',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }, '🎤') : null
      ])
    ])
  }
}

// =========================================================
//              CHOOSE A USE CASE / COMPONENT
// =========================================================
//
// Multiple components are available depending on your event type:
// MediasfuBroadcast, MediasfuChat, MediasfuWebinar, MediasfuConference
//
// By default, we'll use MediasfuGeneric with custom settings.
</script>

<template>
  <!--
    =========================================================
                        RENDER COMPONENT
    =========================================================

    The MediasfuGeneric component is used by default.
    You can replace it with any other component based on your event type.
    Example: <MediasfuBroadcast ... />
    Example: <MediasfuChat ... />
    Example: <MediasfuWebinar ... />
    Example: <MediasfuConference ... />

    The PreJoinPage component is displayed if `returnUI` is true.
    If `returnUI` is false, `noUIPreJoinOptions` is used as a substitute.
    You can also use `sourceParameters` to interact with MediaSFU functionalities directly.
    Avoid using `useLocalUIMode` or `useSeed` in new implementations.
    Ensure that real credentials are not exposed in the frontend.
    Use HTTPS and secure backend endpoints for production.
  -->

  <!-- Example of MediaSFU CE with no MediaSFU Cloud -->
  <!-- 
  <MediasfuGeneric
    :PrejoinPage="PreJoinPage"
    :localLink="localLink"
  />
  -->

  <!-- Example of MediaSFU CE + MediaSFU Cloud for Egress only -->
  <!-- 
  <MediasfuGeneric
    :PrejoinPage="PreJoinPage"
    :credentials="credentials"
    :localLink="localLink"
    :connectMediaSFU="connectMediaSFU"
  />
  -->

  <!-- Example of MediaSFU Cloud only -->
  <!-- 
  <MediasfuGeneric
    :PrejoinPage="PreJoinPage"
    :credentials="credentials"
    :connectMediaSFU="connectMediaSFU"
  />
  -->

  <!-- Example of MediaSFU CE + MediaSFU Cloud for Egress only with custom UI -->
  <!-- 
  <MediasfuGeneric
    :PrejoinPage="PreJoinPage"
    :credentials="credentials"
    :localLink="localLink"
    :connectMediaSFU="connectMediaSFU"
    :returnUI="false"
    :noUIPreJoinOptions="noUIPreJoinOptions"
    :sourceParameters="sourceParameters"
    :updateSourceParameters="updateSourceParameters"
    :createMediaSFURoom="createRoomOnMediaSFU"
    :joinMediaSFURoom="joinRoomOnMediaSFU"
  />
  -->

  <!-- Example of MediaSFU Cloud only with custom UI -->
  <!-- 
  <MediasfuGeneric
    :PrejoinPage="PreJoinPage"
    :credentials="credentials"
    :connectMediaSFU="connectMediaSFU"
    :returnUI="false"
    :noUIPreJoinOptions="noUIPreJoinOptions"
    :sourceParameters="sourceParameters"
    :updateSourceParameters="updateSourceParameters"
    :createMediaSFURoom="createRoomOnMediaSFU"
    :joinMediaSFURoom="joinRoomOnMediaSFU"
  />
  -->

  <!-- Example of using MediaSFU CE only with custom UI -->
  <!-- 
  <MediasfuGeneric
    :PrejoinPage="PreJoinPage"
    :localLink="localLink"
    :connectMediaSFU="false"
    :returnUI="false"
    :noUIPreJoinOptions="noUIPreJoinOptions"
    :sourceParameters="sourceParameters"
    :updateSourceParameters="updateSourceParameters"
  />
  -->

  <MediasfuGeneric
    :prejoin-page="PreJoinPage"
    :credentials="credentials"
    :local-link="localLink"
    :connect-media-s-f-u="connectMediaSFU"
    :return-u-i="returnUI"
    :no-u-i-pre-join-options="!returnUI ? noUIPreJoinOptions : undefined"
    :source-parameters="!returnUI ? sourceParameters : undefined"
    :update-source-parameters="!returnUI ? updateSourceParameters : undefined"
    :create-media-s-f-u-room="createRoomOnMediaSFU"
    :join-media-s-f-u-room="joinRoomOnMediaSFU"
  />
</template>

<!--
  =========================================================
                      ADDITIONAL NOTES
  =========================================================

  Handling Core Methods:
  Once `sourceParameters` is populated, you can call core methods like `clickVideo` or `clickAudio` directly:
  Example:
  sourceParameters.value.clickVideo({ ...sourceParameters.value });
  sourceParameters.value.clickAudio({ ...sourceParameters.value });

  This allows your custom UI to directly interact with MediaSFU functionalities.

  Deprecated Features (Seed Data):
  The seed data generation feature is deprecated. Avoid using `useLocalUIMode` or `useSeed` in new implementations.

  Security Considerations:
  - Do not expose real credentials in your frontend code in production.
  - Use HTTPS and secure backend endpoints.
  - Validate inputs and handle errors gracefully.

  Example CE Backend Setup:
  If using MediaSFU CE + MediaSFU Cloud, your backend might look like this:

  app.post("/createRoom", async (req, res) => {
    // Validate incoming dummy credentials
    // Forward request to mediasfu.com with real credentials
  });

  app.post("/joinRoom", async (req, res) => {
    // Validate incoming dummy credentials
    // Forward request to mediasfu.com with real credentials
  });

  By doing so, you keep real credentials secure on your server.

  End of Guide.

  ========================
  ====== END OF GUIDE ======
  ========================
-->

