import getEnvVars from "../config/environment"

const { apiUrl } = getEnvVars()

export const FILE_API = {
  uploadImage: `${apiUrl}/files/upload-image`,
}

export const PREFIX = apiUrl

//export const PREFIX = `${process.env.EXPO_PUBLIC_DOMAIN}/api-v2`
