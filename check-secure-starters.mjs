import assert from 'node:assert/strict';
import fs from 'node:fs';

const files = [
  'mediasfu_reactjs/src/App.tsx', 'mediasfu_reactjs/src/roomBackend.ts',
  'mediasfu_angular/src/app/app.component.ts', 'mediasfu_angular/src/app/room-backend.ts',
  'mediasfu_vue/src/App.vue', 'mediasfu_vue/src/roomBackend.ts',
  'mediasfu_react_native/App.tsx', 'mediasfu_react_native/roomBackend.ts',
  'mediasfu_react_native_expo/app/(tabs)/index.tsx', 'mediasfu_react_native_expo/roomBackend.ts',
  'mediasfu_flutter/lib/main.dart', 'mediasfu_flutter/lib/room_backend.dart',
  'mediasfu_kotlin_android/app/build.gradle.kts',
  'mediasfu_kotlin_android/app/src/main/java/com/mediasfu/quickstart/kotlin/MainActivity.kt',
  'mediasfu_kotlin_android/app/src/main/java/com/mediasfu/quickstart/kotlin/RoomBackend.kt',
];

const source = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
for (const forbidden of ['api' + 'Key', 'api' + 'UserName', 'MEDIASFU_API_' + 'KEY', 'MEDIASFU_API_' + 'USERNAME']) {
  assert.equal(source.includes(forbidden), false, `client credential field found: ${forbidden}`);
}
assert.equal(source.includes("postRoom('create'") || source.includes('_postRoom(\'create\''), true);
assert.equal(source.includes("postRoom('join'") || source.includes('_postRoom(\'join\''), true);
assert.equal(source.includes('JSON.stringify(payload)') || source.includes('jsonEncode(payload)'), true);

const versions = [
  ['mediasfu_reactjs/package.json', 'mediasfu-reactjs', '4.2.8'],
  ['mediasfu_angular/package.json', 'mediasfu-angular', '2.2.5'],
  ['mediasfu_vue/package.json', 'mediasfu-vue', '1.0.5'],
  ['mediasfu_react_native/package.json', 'mediasfu-reactnative', '2.3.7'],
  ['mediasfu_react_native_expo/package.json', 'mediasfu-reactnative-expo', '2.4.2'],
];
for (const [file, name, version] of versions) {
  assert.equal(JSON.parse(fs.readFileSync(file, 'utf8')).dependencies[name], version);
}
assert.match(fs.readFileSync('mediasfu_flutter/pubspec.yaml', 'utf8'), /mediasfu_sdk:\s+2\.2\.8/);
assert.match(fs.readFileSync('mediasfu_kotlin_android/app/build.gradle.kts', 'utf8'), /mediasfu-sdk-android:1\.0\.3/);

const uxMarkers = [
  ['mediasfu_reactjs/src/App.tsx', ['MyCustomPreJoinPage', 'ModernMediasfuGeneric']],
  ['mediasfu_angular/src/app/app.component.ts', ['CustomVideoCardTestComponent', 'MediasfuBroadcast', 'MediasfuConference', 'MediasfuWebinar', 'MediasfuChat']],
  ['mediasfu_vue/src/App.vue', ['CustomVideoCard', 'CustomAudioCard', 'CustomMiniCard']],
  ['mediasfu_react_native/App.tsx', ['CustomWorkspace', 'ShowcaseAudioCard', 'MediasfuBroadcast', 'MediasfuWebinar', 'MediasfuConference', 'MediasfuChat']],
  ['mediasfu_react_native_expo/app/(tabs)/index.tsx', ['PreJoinPage', 'noUIPreJoinOptions', 'sourceParameters']],
  ['mediasfu_flutter/lib/main.dart', ['myCustomPreJoinPage', 'optionsWithSeed', 'optionsWithCustomFunctions', 'optionsNoUI']],
  ['mediasfu_kotlin_android/app/src/main/java/com/mediasfu/quickstart/kotlin/MainActivity.kt', ['MediasfuGeneric']],
];
for (const [file, markers] of uxMarkers) {
  const value = fs.readFileSync(file, 'utf8');
  for (const marker of markers) assert.equal(value.includes(marker), true, `${file} lost UX marker ${marker}`);
}

for (const directory of ['mediasfu_reactjs', 'mediasfu_angular', 'mediasfu_vue', 'mediasfu_react_native', 'mediasfu_react_native_expo', 'mediasfu_flutter', 'mediasfu_kotlin_android']) {
  const guide = fs.readFileSync(`${directory}/SECURE_ROOM_SETUP.md`, 'utf8');
  for (const required of ['Success', 'Before release', 'create', 'join']) {
    assert.equal(guide.includes(required), true, `${directory} guide missing ${required}`);
  }
}

const publicGuides = ['README.md', 'ENV_SETUP.md',
  'mediasfu_reactjs/README.md', 'mediasfu_angular/README.md', 'mediasfu_vue/README.md',
  'mediasfu_react_native/README.md', 'mediasfu_react_native_expo/README.md',
  'mediasfu_flutter/README.md', 'mediasfu_kotlin_android/README.md'];
const publicText = publicGuides.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
for (const forbidden of ['MEDIASFU_API_' + 'KEY', 'MEDIASFU_API_' + 'USERNAME',
  'REACT_APP_MEDIASFU_', 'VITE_MEDIASFU_', 'EXPO_PUBLIC_MEDIASFU_', 'dummy credentials']) {
  assert.equal(publicText.includes(forbidden), false, `public guide contains unsafe client setup: ${forbidden}`);
}
console.log('secure starter contract checks passed');
