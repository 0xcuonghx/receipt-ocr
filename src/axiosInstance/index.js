import axios from 'axios';
import asyncStorageUtils from '../utils/asyncStorageUtils';
import { AccessToken, BackendUrl } from '../constraint';

const axiosInstance = axios.create({
  baseURL: BackendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000
});

// do something when request
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await asyncStorageUtils.getItem(AccessToken);
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: accessToken
    }
  };
  return newConfig;
});

// do something when response
axiosInstance.interceptors.response.use((response) => {
  // if status code 2xx
  console.log('----------------------');
  console.log(JSON.stringify(response));
  if (response.status === 200) {
    if (response?.data?.message !== 'successful' && response?.data?.message !== 'success') {
      throw Error('Something went wrong');
    }
    return response.data.result;
  }
  throw Error('Something went wrong');
}, (error) => {
  // do something if status code outside 2xx
  if (error.status === 401) {
    // authentication fail
  }
  return Promise.reject(error);
});

export default axiosInstance;
