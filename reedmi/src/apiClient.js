import axios from 'axios';

// The purpose of this file is to create a single axios instance that we can use throughout our application
// Based on the environment we're running in, we can set the baseURL to be different
// We also set withCredentials to true so that our browser will send cookies

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://reedmi-test.onrender.com'

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});



export default apiClient;
