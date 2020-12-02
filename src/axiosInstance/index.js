import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000
});

// do something when request
axiosInstance.interceptors.request.use((config) => {
  return config;
});

// do something when response
axiosInstance.interceptors.response.use((response) => {
  // if status code 2xx
  if (response.status === 200) {
    return response.data;
  }

  return response;
}, (error) => {
  // do something if status code outside 2xx
  if (error.status === 401) {
    // authentication fail
  }
});
