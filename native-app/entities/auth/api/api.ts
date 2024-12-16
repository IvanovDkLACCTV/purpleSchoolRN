import getEnvVars from "../../../config/environment"

const { apiUrl } = getEnvVars()

export const PREFIX = apiUrl

export const API = {
  profile: `${PREFIX}/user/profile`,
}
