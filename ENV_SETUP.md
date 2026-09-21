# MediaSFU server configuration boundary

MediaSFU service credentials belong only in the application backend's secret store. Do not put them in browser variables, mobile environment files, Dart defines, Gradle properties, BuildConfig, source code, screenshots, or client logs.

Every runnable starter calls authenticated application routes:

- `POST /api/mediasfu/rooms/create`
- `POST /api/mediasfu/rooms/join`

The client sends only the SDK room payload plus its normal application session. The backend authenticates the application user, authorizes the requested room action, validates and rate-limits the payload, adds MediaSFU credentials while making the server-to-server request, and returns the SDK-compatible response.

For browser apps, prefer same-origin secure cookies and enforce CSRF protection. For mobile apps, use the product's short-lived user session over HTTPS. Configure request deadlines, bounded retry behavior, safe error bodies, and audit logs that omit secrets and room secrets.

Each starter's `SECURE_ROOM_SETUP.md` contains its exact URL configuration, callback file, success signal, failure cases, teardown expectations, and release checklist.
