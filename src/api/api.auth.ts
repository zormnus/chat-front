import { instance } from './api.config';
import { LoginFields } from '../types';

export default class AuthService {
  static login(headers: LoginFields) {
    return instance.post('/user/api/token/', headers);
  }

  static verifyToken(token: string) {
    return instance.post('/user/api/token/verify/', { token });
  }

  static refreshToken(token: string) {
    return instance.post('/user/api/token/refresh/', { refresh: token });
  }

  static logout() {
    return instance.post('/user/api/logout/');
  }
}
