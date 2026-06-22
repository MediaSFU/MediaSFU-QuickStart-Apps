# MediaSFU Unity Reference

Unity is currently a custom-scene integration path, not a prebuilt meeting-app UI kit. Use it when you want MediaSFU room orchestration inside a Unity app, game, simulator, training tool, virtual event surface, or 3D experience.

## Packages

Install the companion media client first, then the Unity SDK:

```text
https://github.com/MediaSFU/mediasfu-mediasoup-client-unity.git
https://github.com/MediaSFU/mediasfu-unity-sdk.git
```

Verified package metadata:

```text
com.mediasfu.unity@0.1.0-preview.1
```

## First Flow

Use the SDK sample flow to prove:

- room create/join
- Socket.IO connection
- media bridge attachment
- chat, moderation, and recording controls that are relevant to your app

After that, build scene-specific UI and controls around your own Unity objects.

## Validation Boundary

Do not present Unity as a full quick-start meeting app until a real media backend and native bridge validation path are green for the target platform. Keep claims tied to the validation docs in the Unity SDK repository.

## Links

- Unity SDK: [github.com/MediaSFU/mediasfu-unity-sdk](https://github.com/MediaSFU/mediasfu-unity-sdk)
- Companion media client: [github.com/MediaSFU/mediasfu-mediasoup-client-unity](https://github.com/MediaSFU/mediasfu-mediasoup-client-unity)
- Public docs: [mediasfu.com/docs/sdks/unity](https://www.mediasfu.com/docs/sdks/unity)
