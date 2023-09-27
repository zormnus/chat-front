import { AxiosError } from 'axios';
import axios from 'axios';

export default async function checkToken() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    await axios.post('http://127.0.0.1:8000/user/api/token/verify/', {
      token: accessToken,
    });

    return true;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 401) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/user/api/token/refresh/',
          {
            refresh: refreshToken,
          },
        );

        localStorage.setItem('accessToken', response.data.access);

        return true;
      } catch (error) {
        return false;
      }
    } else {
      console.log(error);

      return false;
    }
  }
}
