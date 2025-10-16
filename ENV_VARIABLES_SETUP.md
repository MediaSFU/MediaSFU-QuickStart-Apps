# Environment Variables Setup - Summary

**Date:** October 14, 2025

## Overview

Successfully configured environment variables support for the MediaSFU React Native project with fallback to default values.

---

## Files Created/Modified

### Root Level Files
1. **`.env`** - Root environment file (gitignored)
2. **`.env.example`** - Template for environment variables
3. **`.gitignore`** - Added to ignore .env files
4. **`ENV_SETUP.md`** - Comprehensive guide for environment setup

### React Native Project Files
1. **`mediasfu_react_native/.env.example`** - Project-specific env example
2. **`mediasfu_react_native/babel.config.js`** - Updated with react-native-dotenv plugin
3. **`mediasfu_react_native/env.d.ts`** - TypeScript declarations for @env module
4. **`mediasfu_react_native/App.tsx`** - Updated to read from env variables
5. **`mediasfu_react_native/.gitignore`** - Updated to ignore .env files

---

## Changes Made

### 1. Root Configuration

**`.env` and `.env.example` files:**
```env
MEDIASFU_API_USERNAME=yourDevUser
MEDIASFU_API_KEY=yourDevApiKey1234567890abcdef...
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

**`.gitignore` at root:**
```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

### 2. React Native Setup

**Installed Package:**
```bash
npm install react-native-dotenv
```

**babel.config.js Configuration:**
```javascript
[
  'module:react-native-dotenv',
  {
    envName: 'APP_ENV',
    moduleName: '@env',
    path: '../.env',  // Points to root .env
    safe: false,
    allowUndefined: true,
    verbose: false,
  },
]
```

**TypeScript Declaration (env.d.ts):**
```typescript
declare module '@env' {
  export const MEDIASFU_API_USERNAME: string;
  export const MEDIASFU_API_KEY: string;
  export const MEDIASFU_LOCAL_LINK: string;
  export const MEDIASFU_CONNECT_MEDIASFU: string;
}
```

**App.tsx Updates:**
```typescript
// Import environment variables
import {
  MEDIASFU_API_USERNAME,
  MEDIASFU_API_KEY,
  MEDIASFU_LOCAL_LINK,
  MEDIASFU_CONNECT_MEDIASFU,
} from '@env';

// Use with fallback to defaults
const credentials = {
  apiUserName: MEDIASFU_API_USERNAME || 'yourDevUser',
  apiKey: MEDIASFU_API_KEY || 'yourDevApiKey...',
};

const localLink = MEDIASFU_LOCAL_LINK || '';

const connectMediaSFU = MEDIASFU_CONNECT_MEDIASFU
  ? MEDIASFU_CONNECT_MEDIASFU.toLowerCase() === 'true'
  : true;
```

---

## How It Works

### Environment Variable Loading
1. **Development:** 
   - React Native reads from `../. env` (root level)
   - Falls back to hardcoded defaults if env vars are undefined
   
2. **Production:**
   - Set environment variables in your deployment environment
   - Consider using a backend proxy for credentials

### Fallback Strategy
```typescript
const value = ENV_VARIABLE || 'default_value';
```

This ensures the app works even if:
- `.env` file is missing
- Environment variables are not set
- Running in a new environment

---

## Usage Instructions

### 1. Initial Setup

```bash
# Navigate to the project root
cd /path/to/MediaSFU-QuickStart-Apps

# Create .env file from example
cp .env.example .env

# Edit with your credentials
nano .env  # or use your favorite editor
```

### 2. Configure Credentials

Edit `.env`:
```env
MEDIASFU_API_USERNAME=yourActualUsername
MEDIASFU_API_KEY=your64CharacterAPIKey
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

### 3. Run React Native App

```bash
cd mediasfu_react_native

# Clean cache and start
npm start -- --reset-cache

# In another terminal, run the app
npm run android  # or npm run ios
```

---

## Connection Scenarios

### Scenario A: MediaSFU Cloud Only
```env
MEDIASFU_API_USERNAME=yourUsername
MEDIASFU_API_KEY=yourAPIKey...
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

### Scenario B: MediaSFU CE + Cloud (Egress)
```env
MEDIASFU_API_USERNAME=dummyUsr
MEDIASFU_API_KEY=1234567890abcdef...
MEDIASFU_LOCAL_LINK=http://your-ce-server.com
MEDIASFU_CONNECT_MEDIASFU=true
```

### Scenario C: MediaSFU CE Only
```env
MEDIASFU_API_USERNAME=
MEDIASFU_API_KEY=
MEDIASFU_LOCAL_LINK=http://your-ce-server.com
MEDIASFU_CONNECT_MEDIASFU=false
```

---

## Security Features

✅ **`.env` files are gitignored** - Credentials never committed to Git  
✅ **Fallback to safe defaults** - App works without .env file  
✅ **Template provided** - `.env.example` shows required format  
✅ **TypeScript support** - Type-safe environment variables  
✅ **Flexible configuration** - Works with Cloud, CE, or Hybrid setups  

---

## Troubleshooting

### Environment Variables Not Loading

1. **Restart Metro with cache clear:**
   ```bash
   npm start -- --reset-cache
   ```

2. **Verify babel.config.js:**
   - Check `react-native-dotenv` is listed in plugins
   - Verify path points to `../.env`

3. **Check .env file location:**
   - Should be at project root: `MediaSFU-QuickStart-Apps/.env`
   - Not in `mediasfu_react_native/.env`

4. **Rebuild the app:**
   ```bash
   # iOS
   cd ios && pod install && cd ..
   npm run ios

   # Android
   npm run android
   ```

### Values Showing as Undefined

- Ensure variable names match exactly (case-sensitive)
- Check `.env` file syntax (no quotes needed for values)
- Verify the import statement in App.tsx
- Make sure babel plugin is before `react-native-reanimated/plugin`

---

## Next Steps

### ✅ Completed - React Native
- [x] Created root .env and .env.example
- [x] Updated root .gitignore
- [x] Installed react-native-dotenv
- [x] Configured babel.config.js
- [x] Created TypeScript declarations
- [x] Updated App.tsx to read env variables
- [x] Updated project .gitignore
- [x] Created documentation

### 🔄 Next - ReactJS Project
- [ ] Install dotenv for ReactJS
- [ ] Create .env.example in reactjs project
- [ ] Update src/App.tsx to read env variables
- [ ] Update reactjs .gitignore
- [ ] Test environment variable loading
- [ ] Document ReactJS-specific setup

### 📋 Testing Checklist
- [ ] Test React Native app with .env file
- [ ] Test React Native app without .env file (fallback)
- [ ] Test with different connection scenarios
- [ ] Verify credentials are never logged/exposed
- [ ] Test production build with env vars

---

## Package Dependencies

### React Native
```json
{
  "react-native-dotenv": "^3.4.11"
}
```

### Configuration
- **Babel Plugin:** `module:react-native-dotenv`
- **Module Name:** `@env`
- **Env File Path:** `../. env` (points to root)

---

## References

- [ENV_SETUP.md](./ENV_SETUP.md) - Comprehensive setup guide
- [React Native Dotenv](https://github.com/goatandsheep/react-native-dotenv)
- [MediaSFU Documentation](https://mediasfu.com/docs)

---

**Status:** ✅ React Native environment variables configured successfully  
**Next:** Configure ReactJS project with similar setup
