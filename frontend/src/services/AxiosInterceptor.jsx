import axios from "axios";

const authAxios = axios.create();

// Add a request interceptor to add access token
authAxios.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
authAxios.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const response = await axios.post("/api/token/refresh/", { refresh: refreshToken });
          const newAccessToken = response.data.access;
          localStorage.setItem("access", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return authAxios(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear storage and redirect to login
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    // Return the error if it’s not a 401 or if there's another issue
    return Promise.reject(error);
  }
);

export default authAxios;
