import { Platform } from "react-native"

const ENV = {
  dev: {
    apiUrl: "http://localhost:3030/api-v2",
  },
  prod: {
    apiUrl: "https://192.168.1.143:3030/api-v2",
  },
}

const getEnvVars = () => {
  const isWeb = Platform.OS === "web"

  if (__DEV__) {
    return {
      ...ENV.dev,
      apiUrl: Platform.select({
        ios: "http://localhost:3030/api-v2",
        android: "http://192.168.1.143:3030/api-v2", // Special alias for Android emulator
        default: isWeb
          ? "http://192.168.1.143:3030/api-v2" // Web uses a specific host
          : "http://localhost:3030/api-v2",
      }),
    }
  }
  return ENV.prod
}

export const PREFIX = getEnvVars().apiUrl

export default getEnvVars
