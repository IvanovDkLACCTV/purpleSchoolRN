import Constants from 'expo-constants';
import { Platform } from 'react-native';

const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api-v2',
  },
  prod: {
    apiUrl: 'https://your-production-api.com/api-v2',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return {
      ...ENV.dev,
      apiUrl: Platform.select({
        ios: 'http://localhost:3000/api-v2',
        android: 'http://192.168.3.12:3000/api-v2', // Special alias for Android emulator
        default: 'http://localhost:3000/api-v2',
      }),
    };
  }
  return ENV.prod;
};

export default getEnvVars;
