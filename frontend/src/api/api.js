import axios from 'axios';

// In development, falls back to localhost. In production (Vercel), set
// VITE_API_URL in your project's Environment Variables to your Render
// backend URL, e.g. https://shawahiq-backend.onrender.com/api
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
});

// Attach admin token automatically if it exists (for protected routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;