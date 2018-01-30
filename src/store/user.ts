import { Module } from 'vuex';
import { Player, DEFUALT_PLAYER } from '../model/player';
import { WebsocketService } from 'service';
import { deepclone } from 'util/common';

interface IStoreUser {
  me: Player;
}

export interface IParamLogin {
  username: string;
  password: string;
}

export interface IParamRegister extends IParamLogin { }

export const userInfo: Module<IStoreUser, any> = {
  state: {
    me: deepclone(DEFUALT_PLAYER),
  },
  getters: {
    me(state): Player {
      return state.me;
    },
  },
  mutations: {
    setUser(state, user: any) {
      state.me = user;
    },
  },
  actions: {
    async login({ state, commit }, { username, password }: IParamLogin) {
      const { token, me } = await WebsocketService.send('user/login', {
        anonymous: false,
        username,
        password,
      });

      WebsocketService.setToken(token);
      commit('setUser', me);
    },
    async register({ state, commit }, { username, password }: IParamRegister) {
      const { token, me } = await WebsocketService.send('user/register', {
        username,
        password,
      });

      WebsocketService.setToken(token);
      commit('setUser', me);
    },
  },
};
