# Environment Variables Configuration

This project uses environment variables to configure MediaSFU API credentials and connection settings.

## Setup Instructions

### 1. Create Environment File

Copy the example environment file:

```bash
# For React Native project
cp .env.example mediasfu_react_native/.env

# Or copy from root
cp .env mediasfu_react_native/.env
```

### 2. Configure Your Credentials

Edit the `.env` file with your actual MediaSFU credentials:

```env
# API Username (8 characters minimum)
MEDIASFU_API_USERNAME=yourActualUsername

# API Key (64 characters)
MEDIASFU_API_KEY=your64characterAPIkeyFromMediaSFU

# MediaSFU CE Server (optional)
MEDIASFU_LOCAL_LINK=

# Connect to MediaSFU Cloud
MEDIASFU_CONNECT_MEDIASFU=true
```

### 3. Get Your Credentials

Get your MediaSFU API credentials from:
- **Production:** [https://mediasfu.com](https://mediasfu.com)
- **Development:** Use dummy credentials (8 chars username, 64 chars API key)

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MEDIASFU_API_USERNAME` | Your MediaSFU API username (8+ characters) | `yourDevUser` | Yes |
| `MEDIASFU_API_KEY` | Your MediaSFU API key (64 characters) | `yourDevApiKey...` | Yes |
| `MEDIASFU_LOCAL_LINK` | Your MediaSFU CE server URL | `""` (empty) | No |
| `MEDIASFU_CONNECT_MEDIASFU` | Connect to MediaSFU Cloud services | `true` | No |

## Connection Scenarios

### Scenario A: MediaSFU CE Only
```env
MEDIASFU_API_USERNAME=
MEDIASFU_API_KEY=
MEDIASFU_LOCAL_LINK=http://your-ce-server.com
MEDIASFU_CONNECT_MEDIASFU=false
```

### Scenario B: MediaSFU CE + Cloud (Egress)
```env
MEDIASFU_API_USERNAME=dummyUsr
MEDIASFU_API_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
MEDIASFU_LOCAL_LINK=http://your-ce-server.com
MEDIASFU_CONNECT_MEDIASFU=true
```

### Scenario C: MediaSFU Cloud Only
```env
MEDIASFU_API_USERNAME=yourRealUsername
MEDIASFU_API_KEY=yourRealAPIkey1234567890abcdef1234567890abcdef1234567890abcdef
MEDIASFU_LOCAL_LINK=
MEDIASFU_CONNECT_MEDIASFU=true
```

## Security Best Practices

1. **Never commit `.env` files** to version control
   - The `.env` file is already in `.gitignore`
   - Always use `.env.example` as a template

2. **Use dummy credentials in development**
   - Real credentials should only be used in production
   - Consider using a backend proxy for credential handling

3. **Rotate credentials regularly**
   - Change your API keys periodically
   - Use different credentials for dev/staging/production

4. **Backend Proxy (Recommended for Production)**
   - Implement server endpoints that forward requests to MediaSFU
   - Keep real credentials on your secure backend
   - Send dummy credentials from the frontend

## Troubleshooting

### Environment variables not loading

1. **Restart Metro bundler:**
   ```bash
   npm start -- --reset-cache
   ```

2. **Clean and rebuild:**
   ```bash
   # iOS
   cd ios && pod install && cd ..
   npm run ios

   # Android
   npm run android
   ```

3. **Verify babel.config.js:**
   - Ensure `react-native-dotenv` is configured
   - Check the path points to the correct `.env` file

### Variables showing as undefined

- Check that variable names match exactly (case-sensitive)
- Ensure `.env` file is in the correct location
- Verify the babel configuration in `babel.config.js`
- Restart your development server after changing `.env`

## React Native Specific

The React Native project uses `react-native-dotenv` to load environment variables. The configuration is in `babel.config.js`:

```javascript
[
  'module:react-native-dotenv',
  {
    envName: 'APP_ENV',
    moduleName: '@env',
    path: '../.env',  // Points to root .env file
    safe: false,
    allowUndefined: true,
    verbose: false,
  },
]
```

## More Information

- [MediaSFU Documentation](https://mediasfu.com/docs)
- [React Native Environment Variables](https://github.com/goatandsheep/react-native-dotenv)
