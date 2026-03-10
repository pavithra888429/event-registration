import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerForEvent = async (registrationData) => {
  try {
    const response = await api.post('/api/register', registrationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchRegistrations = async () => {
  try {
    const response = await api.get('/api/registrations');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
