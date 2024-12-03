import getEnvVars from '../../../config/environment';

const { apiUrl } = getEnvVars();

export const PREFIX = apiUrl;

export const API = {
  login: `${PREFIX}/auth/login`,
};
