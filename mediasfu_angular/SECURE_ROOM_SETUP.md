# Secure room setup — Angular 2.4.0

This starter pins `mediasfu-angular` `2.4.0`. Provide authenticated same-origin `POST /api/mediasfu/rooms/create` and `POST /api/mediasfu/rooms/join` routes. The backend validates and authorizes each request and adds MediaSFU credentials only on the server.

`src/app/room-backend.ts` exports the callbacks bound to every Generic, Broadcast, Conference, Webinar, and Chat experience in `app.component.ts`. Each callback forwards only the SDK room payload and throws on a non-success response. All card, container, modal, and prejoin overrides remain available.

Success means each experience reaches prejoin and an authorized create or join action returns a usable room. An expired session, forbidden action, or invalid payload must fail with a non-2xx response and a safe user-facing message.

Before release:

- Exercise create and join across the five selectable experiences.
- Verify backend authentication, authorization, validation, CSRF controls, rate limits, and timeouts.
- Confirm the compiled browser bundle and request bodies contain no MediaSFU credentials.
- Verify participant leave stops local tracks and closes room resources.
- Run `npm ci --offline`, `npm run build`, and the repository security checker from a trusted cache.
