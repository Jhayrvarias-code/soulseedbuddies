import axios from "axios";

// 🔹 Create an Axios instance with the backend base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api", // <-- change if your backend URL is different
});

// 🔹 Automatically add the Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Here you could log out the user if token expired, etc.
    return Promise.reject(error);
  },
);

export const userProfile = () => api.get("/users");

// Dashboard / Match APIs
export const fetchDiscoverUsers = () => api.get("/discover");
export const fetchMatches = () => api.get("/matches");
export const likeUser = (toUserId) => api.post(`/likes/${toUserId}`);
export const unmatchUser = (userId) => api.post(`/matches/${userId}/unmatch`);

// Auth APIs (example)
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

export default api;
