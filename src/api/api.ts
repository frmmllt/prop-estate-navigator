
import axios from "axios";

const baseURL = "https://api.example.com"; // <- Replace with your real backend later

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    // Attach JWT token if available
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally handle logout/refresh here
      localStorage.removeItem("jwtToken");
    }
    return Promise.reject(error);
  }
);

export default api;
