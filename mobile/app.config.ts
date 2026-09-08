import { ExpoConfig, getDefaultConfig } from 'expo/config';

const config: ExpoConfig = {
  ...getDefaultConfig(__dirname),
  name: 'AgroPush',
  slug: 'agropush-mobile',
  version: '0.1.0',
  scheme: 'agropush',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  entryPoint: './src/index.tsx',
  ios: {
    supportsTabletMode: true,
    bundleIdentifier: 'com.agropush.mobile',
  },
  android: {
    package: 'com.agropush.mobile',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
};

export default config;
