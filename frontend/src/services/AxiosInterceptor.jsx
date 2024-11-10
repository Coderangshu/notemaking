import axios from "axios";

const authAxios = axios.create();

// Add a request interceptor to add access token
authAxios.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Angshuman");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
authAxios.interceptors.response.use((response) => response, async (error) => {
    const refreshToken = localStorage.getItem("refresh");
    if (error.response.status === 401) {
      try {
        const response = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        localStorage.setItem("access", newAccessToken);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;

