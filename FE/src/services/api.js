import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update with actual backend URL later
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

export default api;
