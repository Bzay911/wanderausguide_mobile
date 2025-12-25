const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API URL is not defined");
}

export const API = {
  BASE_URL: API_URL,
  TIMEOUT: 10000,
};
