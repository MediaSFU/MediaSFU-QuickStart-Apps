# MediaSFU iOS/KMP Bridge Reference

The current iOS path is a Kotlin Multiplatform bridge/sample scaffold, not a standalone polished Swift SDK quick-start. Treat it as a reference for teams validating the KMP-hosted MediaSFU UI on physical iOS devices.

## Current Direction

- Use the KMP shared module and generated iOS framework/pod integration.
- Host the shared MediaSFU UI from a SwiftUI container.
- Validate on a physical iOS device when WebRTC packaging is device-only.
- Avoid claiming simulator support unless the active WebRTC dependency chain supports it.

## Setup Shape

The iOS sample in the Kotlin SDK repo documents:

- CocoaPods workspace generation
- bridge installation
- SwiftUI host container scaffold
- session bootstrap fields
- ReplayKit and permission coordinator placeholders
- device validation caveats

## Validation Boundary

This reference should remain a scaffold entry until create/join, produce/consume, camera, microphone, screen share, and media controls are validated on device with the final bridge wiring.

## Links

- Kotlin SDK: [github.com/MediaSFU/mediasfu-sdk-kotlin](https://github.com/MediaSFU/mediasfu-sdk-kotlin)
- iOS sample notes: `ios-sample-app/README.md` in the Kotlin SDK repository
- App-facing Swift usage notes: `IOS_SWIFT_CLIENT_USAGE.md` in the Kotlin SDK repository
