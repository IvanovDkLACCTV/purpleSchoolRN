import { Platform } from "react-native"

const ENV = {
  dev: {
    apiUrl: "http://localhost:3030/api-v2",
  },
  prod: {
    apiUrl: "https://localhost:3030/api-v2",
  },
}

const getEnvVars = () => {
  if (__DEV__) {
    return {
      ...ENV.dev,
      apiUrl: Platform.select({
        ios: "http://localhost:3030/api-v2",
        android: "http://192.168.1.143:3030/api-v2", // Special alias for Android emulator
        default: "http://localhost:3030/api-v2",
      }),
    }
  }
  return ENV.prod
}

export default getEnvVars
