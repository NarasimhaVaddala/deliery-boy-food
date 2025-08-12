import axios from "axios";

const url = "http://localhost:5000";

export const API = axios.create({
  baseURL: url,
});

export const SOCKET_URL = url;

// Add a request interceptor to include the token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust the key if you're using something like 'accessToken' or JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const imageUrl = (image) => {
  return image ? `${url}/${image}` : null;
};
