import axios from "axios";

let url;

if (import.meta.env.MODE === "development") {
  url = "http://localhost:5000";
} else {
  url = "https://backendchalabagundhi.nuhvin.com";
}

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
