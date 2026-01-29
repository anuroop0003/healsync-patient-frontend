import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.errors?.length) {
      const message = response.data.errors[0]?.message || "";
      return Promise.reject(new Error(message));
    }
    return response;
  },

  (error: AxiosError) => {
    console.error("Runtime API Error:", error);

    if (error.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();

      if (window.location.pathname !== "/") {
        window.location.replace("/");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
