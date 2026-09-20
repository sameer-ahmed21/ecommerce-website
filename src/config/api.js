// Central place for the backend base URL. Set VITE_API_URL in a .env file to
// override for staging/production; falls back to local dev server.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
