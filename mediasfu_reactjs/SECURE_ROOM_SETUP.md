# Secure room setup — ReactJS 4.3.5

This starter pins `mediasfu-reactjs` `4.3.5`. Before launching it, implement authenticated `POST /api/mediasfu/rooms/create` and `POST /api/mediasfu/rooms/join` routes on the same origin as the web app. Those routes validate the room payload and call MediaSFU with credentials held only by the server.

The app supplies `createRoomViaBackend` and `joinRoomViaBackend` from `src/roomBackend.ts` to `ModernMediasfuGeneric`. The adapter sends only `options.payload`, includes the current same-origin session, and throws for non-success HTTP responses.

Successful setup opens the prejoin flow and a create or join action returns a room without a browser request containing MediaSFU credentials. A rejected application session or invalid payload must produce a non-2xx response; show the resulting error without retrying indefinitely.

Before release:

- Test create and join with an authorized user, then with an expired session.
- Confirm server-side authorization, validation, CSRF protection, rate limits, and request timeouts.
- Inspect the built browser bundle and network request bodies for credential fields.
- Leave the room and stop local media tracks during teardown.
- Run `npm ci --offline`, `npm run build`, and the repository security checker from a trusted dependency cache.
