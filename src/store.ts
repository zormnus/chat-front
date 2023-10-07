import { makeAutoObservable, runInAction, action } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { instance } from './api/api.config';

import AuthService from './api/api.auth';
import { LoginFields, IChat } from './types';

class Store {
  isAuth = false;
  isAuthInProgress = false;
  username = '';
  rooms: IChat[] = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'isAuth',
      properties: ['isAuth', 'username'],
      storage: window.localStorage,
    });
  }

  async deleteRoom(uuid: string) {
    const { data } = await instance.get(`chats/chat/id/${uuid}`);

    await instance.delete(`chats/chats_manage/chats/${data.id}`);

    runInAction(() => {
      this.rooms = this.rooms.filter((room) => room.uuid !== uuid);
    });
  }

  async addRoom(uuid: string) {
    const newRoom = { uuid };
    const { data } = await instance.post('chats/chats_manage/chats/', newRoom);

    runInAction(() => this.rooms.push(data));
  }

  async getRooms() {
    const { data } = await instance.get<IChat[]>('chats/chats_manage/chats/');

    runInAction(() => (this.rooms = data));
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

export default new Store();
