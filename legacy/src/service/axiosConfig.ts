import { useAuthStore } from "@/store/auth/slice";
import axios from "axios";
import { RefreshToken } from "./auth";

// Crear una instancia de axios con la URL base configurada
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_LOCAL,
});

// Variables para manejar la cola de peticiones durante el refresh del token
let isRefreshing = false;
let failedQueue: any[] = [];

// Función para procesar la cola de peticiones fallidas después de obtener un nuevo token
const processQueue = (error: any, token: string | null = null) => {
  // Procesa todas las promesas en cola, resolviéndolas o rechazándolas según el caso
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  // Limpia la cola después de procesarla
  failedQueue = [];
};

// Interceptor para las peticiones salientes
axiosInstance.interceptors.request.use(
  (config) => {
    // Añade el token de autorización a cada petición si existe
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para las respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Manejo de errores 401 (No autorizado) y renovación de token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Si ya hay un proceso de refresh en curso, añade la petición a la cola
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Reintenta la petición original con el nuevo token
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Marca la petición como reintento y el proceso de refresh como iniciado
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Intenta renovar el token usando el refresh_token
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await RefreshToken(refreshToken);

        // Almacena el nuevos token
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);

        // Actualiza el header por defecto con el nuevo token
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        // Procesa la cola de peticiones pendientes con el nuevo token
        processQueue(null, access_token);

        // Reintenta la petición original
        return axiosInstance(originalRequest);
      } catch (err) {
        // Si falla el refresh, procesa la cola con error y cierra sesión
        processQueue(err, null);
        useAuthStore.getState().logout();

        return Promise.reject(err);
      } finally {
        // Marca el proceso de refresh como completado
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
