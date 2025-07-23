import axios from 'axios';

// The production URL will be set in Netlify's environment variables
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.onrender.com/api' // We will get this URL from Render later
  : 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to every request if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;