import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.15.7:3333";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      if (
        originalRequest.url?.includes("/token/refresh") ||
        originalRequest.url?.includes("/sessions")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const AsyncStorage = (
          await import("@react-native-async-storage/async-storage")
        ).default;
        const refreshToken = await AsyncStorage.getItem("@app:refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.patch(`${API_URL}/token/refresh`, null, {
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });

        const { token: newToken } = response.data;

        await AsyncStorage.setItem("@app:token", newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);

        try {
          const AsyncStorage = (
            await import("@react-native-async-storage/async-storage")
          ).default;
          await AsyncStorage.multiRemove(["@app:token", "@app:refreshToken"]);

          const { router } = await import("expo-router");
          router.replace("/login");
        } catch (err) {
          console.warn(err);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    switch (status) {
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
        if (status !== 401) {
          console.log("Erro desconhecido");
        }
    }

    return Promise.reject(error);
  },
);

export default api;
