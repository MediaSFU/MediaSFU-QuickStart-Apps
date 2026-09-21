# Secure room creation and joining

Every starter sends room requests to an application backend. MediaSFU service credentials stay on that backend and never ship in a browser, mobile bundle, repository, screenshot, or log.

Implement these authenticated application endpoints:

- `POST /api/mediasfu/rooms/create`
- `POST /api/mediasfu/rooms/join`

The request body is the SDK room payload. The backend must authenticate the application user, authorize the requested action, validate and rate-limit the payload, add MediaSFU credentials only while calling MediaSFU, and return the SDK-compatible JSON response. Web apps use the existing same-origin session; mobile apps should add the application's short-lived user session token in their networking layer. Never return MediaSFU credentials to the client.

Use HTTPS outside local development. Keep error bodies free of secrets, handle CSRF for cookie-authenticated web sessions, and configure request timeouts and retry policy appropriate to your product.

## Pinned SDK versions

| Starter | SDK version |
| --- | --- |
| ReactJS | `mediasfu-reactjs` `4.2.8` |
| Angular | `mediasfu-angular` `2.2.5` |
| Vue | `mediasfu-vue` `1.0.5` |
| React Native | `mediasfu-reactnative` `2.3.7` |
| Expo | `mediasfu-reactnative-expo` `2.4.2` |
| Flutter | `mediasfu_sdk` `2.2.8` |
| Kotlin Android | `com.mediasfu:mediasfu-sdk-android:1.0.3` |

Replace `https://your-app.example/api/mediasfu` in mobile starters with your application backend base URL. Do not put a username, password, query string, or fragment in that URL.
