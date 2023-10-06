import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import AuthService from './api/api.auth';
import { LoginFields } from './types';

class AuthStore {
  isAuth = false;
  isAuthInProgress = false;
  username = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'isAuth',
      properties: ['isAuth', 'username'],
      storage: window.localStorage,
    });
  }

  async login(headers: LoginFields) {
    runInAction(() => (this.isAuthInProgress = true));

    try {
      const resp = await AuthService.login(headers);

      localStorage.setItem('token', resp.data.access);
      localStorage.setItem('refresh', resp.data.refresh);

      runInAction(() => {
        this.isAuth = true;

        if (headers.username) this.username = headers.username.toString();
      });
    } catch (err) {
      throw Error('Login and password incorrect');
    } finally {
      runInAction(() => (this.isAuthInProgress = false));
    }
  }

  async checkAuth() {
    runInAction(() => (this.isAuthInProgress = true));

    try {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) throw Error('no token');

      await AuthService.verifyToken(accessToken);

      runInAction(() => (this.isAuth = true));
    } catch (err) {
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) throw Error('no refresh token');

        const resp = await AuthService.refreshToken(refreshToken);

        localStorage.setItem('token', resp.data.access);

        runInAction(() => (this.isAuth = true));
      } catch (error) {
        runInAction(() => (this.isAuth = false));
      }
    } finally {
      runInAction(() => (this.isAuthInProgress = false));
    }
  }

  async logout() {
    runInAction(() => (this.isAuthInProgress = true));

    try {
      await AuthService.logout();

      runInAction(() => (this.isAuth = false));

      localStorage.removeItem('token');
    } catch (err) {
      throw Error('Error');
    } finally {
      runInAction(() => (this.isAuthInProgress = false));
    }
  }
}

export default new AuthStore();
