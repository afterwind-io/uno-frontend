import { Module } from 'vuex';
import User from '../model/user';
import { Player, DEFUALT_PLAYER } from '../model/player';
import { WebsocketService } from 'service';
import { deepclone } from 'util/common';

interface IStoreUser {
  user: User;
  player: Player;
}

export interface IParamLogin {
  username: string;
  password: string;
}

export interface IParamRegister extends IParamLogin { }

export const userInfo: Module<IStoreUser, any> = {
  state: {
    user: null,
    player: deepclone(DEFUALT_PLAYER),
  },
  getters: {
    user(state): User {
      return state.user;
    },
    player(state): Player {
      return state.player;
    },
  },
  mutations: {
    setUser(state, user: any) {
      state.user = user;
    },
    setPlayer(state, player: any) {
      state.player = player;
    },
  },
  actions: {
    async login({ state, commit }, { username, password }: IParamLogin) {
      const { token, user, player } = await WebsocketService.send('user/login', {
        anonymous: false,
        username,
        password,
      });

      WebsocketService.setToken(token);
      commit('setUser', user);
      commit('setPlayer', player);
    },
    async register({ state, commit }, { username, password }: IParamRegister) {
      const { token, user, player } = await WebsocketService.send('user/register', {
        username,
        password,
      });

      WebsocketService.setToken(token);
      commit('setUser', user);
      commit('setPlayer', player);
    },
  },
};