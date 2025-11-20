import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.15.7:3333";

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
      console.warn(error);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        try {
          const AsyncStorage = (
            await import("@react-native-async-storage/async-storage")
          ).default;
          await AsyncStorage.removeItem("@app:token");

          const { router } = await import("expo-router");
          router.replace("/");
        } catch (err) {
          console.warn(err);
        }
        break;

      case 403:
        console.log("Forbidden - Sem permissão");
        break;

      case 404:
        console.log("Not Found - Recurso não encontrado");
        break;

      case 500:
        console.log("Server Error - Erro interno do servidor");
        break;

      default:
        console.log("Erro desconhecido");
    }

    return Promise.reject(error);
  },
);

export default api;
