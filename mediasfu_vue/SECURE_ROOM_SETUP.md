# Secure room setup — Vue 1.2.0

This starter pins `mediasfu-vue` `1.2.0`. Implement authenticated same-origin `POST /api/mediasfu/rooms/create` and `POST /api/mediasfu/rooms/join` routes. The server authorizes the application user, validates the room payload, and holds the MediaSFU credentials.

`src/roomBackend.ts` supplies the create and join callbacks used by `App.vue`. It forwards only `options.payload` and throws on non-success HTTP responses. The existing custom video, audio, and mini-card components remain intact.

Success means the prejoin page opens and an authorized create or join action returns a usable room. Expired sessions, denied actions, invalid payloads, and backend timeouts must return non-2xx responses and safe messages.

Before release:

- Exercise both create and join with the custom card overrides enabled.
- Verify authentication, authorization, validation, CSRF controls, rate limits, and timeouts.
- Inspect the built browser bundle and request bodies for credential fields.
- Verify leave closes the room and stops local media tracks.
- Run `npm ci --offline`, `npm run build`, and the repository security checker from a trusted cache.
