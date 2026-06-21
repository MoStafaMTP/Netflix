import axios from 'axios';

/**
 * Pre-configured Axios instance.
 *
 * This frontend ships with mock JSON data, so no live backend is required.
 * The instance is wired up and ready: point `VITE_API_BASE_URL` at a real
 * API and the service layer can switch from local JSON to network calls
 * with minimal changes.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach an auth token (if present) to outgoing requests.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalise error handling in one place.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Unexpected error';
    return Promise.reject(new Error(message));
  },
);

export default api;
