import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api1.cppse.embrapa.br";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const AsyncStorage = (
        await import("@react-native-async-storage/async-storage")
      ).default;
      const token = await AsyncStorage.getItem("@app:token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(error);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      const originalUrl = (error.config as InternalAxiosRequestConfig)?.url;
      if (!originalUrl?.includes("/autenticar")) {
        try {
          const AsyncStorage = (
            await import("@react-native-async-storage/async-storage")
          ).default;
          await AsyncStorage.removeItem("@app:token");

          const { router } = await import("expo-router");
          router.replace("/login");
        } catch (err) {
          console.error(err);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
