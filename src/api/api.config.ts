import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },

  async (error) => {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const token = localStorage.getItem('refresh');

        const resp = await instance.post('/user/api/token/refresh/', {
          refresh: token,
        });

        localStorage.setItem('token', resp.data.access);

        return instance.request(originalRequest);
      } catch (error) {
        console.log('AUTH ERROR');
      }
    }
    throw error;
  },
);
