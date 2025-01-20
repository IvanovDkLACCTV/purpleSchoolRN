import getEnvVars from "../config/environment"

const { apiUrl } = getEnvVars()

export const FILE_API = {
  uploadImage: `${apiUrl}/files/upload-image`,
}

export const PREFIX = getEnvVars().apiUrl
