import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://reedmi-test.onrender.com',
  withCredentials: true, 
});

export default apiClient;
