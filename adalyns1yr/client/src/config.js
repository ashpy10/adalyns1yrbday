// API Configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://adalyns1yrbday.onrender.com'  // Your Render backend URL
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  RSVPS: `${API_BASE_URL}/api/rsvps`
}; 