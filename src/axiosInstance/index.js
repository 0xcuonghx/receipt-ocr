import axios from 'axios';
import asyncStorageUtils from '../utils/asyncStorageUtils';
import { AccessToken, BackendUrl } from '../constraint';

const axiosInstance = axios.create({
  baseURL: BackendUrl,
  headers: {
    // Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  timeout: 60000
});

// do something when request
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await asyncStorageUtils.getItem(AccessToken);
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    }
  };
  return newConfig;
});

// do something when response
axiosInstance.interceptors.response.use((response) => {
  // if status code 2xx
  if (response.status === 200) {
    console.log('Api Success:', response.data);
    return response.data;
  }

  return response;
}, (error) => {
  // do something if status code outside 2xx
  if (error.status === 401) {
    // authentication fail
  }
  console.log('Network Error:', JSON.stringify(error));
  return Promise.reject(error);
});

export default axiosInstance;
