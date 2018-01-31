import { Module } from 'vuex';
import WebsocketService from 'service/websocket';
import Room, { UNOMode } from 'model/room';

interface IStoreRoom {
  room: Room;
  lobby: Room[];
}

export const room: Module<IStoreRoom, any> = {
  state: {
    room: null,
    lobby: [],
  },
  getters: {
    room(state): Room {
      return state.room;
    },
    lobby(state): Room[] {
      return state.lobby;
    }
  },
  mutations: {
    setRoomDetail(state, roomDetail: any) {
      state.room = roomDetail;
    },
    setLobbyDetails(state, lobbyDetails: any[]) {
      state.lobby = lobbyDetails;
    }
  },
  actions: {
    async lobbyFetchList({ commit }) {
      const details = await WebsocketService.send('room/list');

      commit('setLobbyDetails', details)
    },
    async roomCreate({ commit, rootGetters }, option: {
      name: string,
      maxPlayers: number,
      password: string,
      mode: UNOMode,
      maxRounds: number,
      maxScore: number,
    }) {
      const detail = await WebsocketService.send('room/create', Object.assign({
        owner: rootGetters.me.uid,
      }, option));

      commit('setRoomDetail', detail);
    },
    async roomLeave({ state, commit, rootGetters }) {
      const { uid: roomId } = state.room;
      const { uid: playerId } = rootGetters.me;

      await WebsocketService.send('room/leave', { roomId, playerId });
      commit('setRoomDetail', null);
    },
    async roomAddBot({ state, commit }) {
      const { uid: roomId } = state.room;
      const roomDetail = await WebsocketService.send('room/addbot', { roomId });

      commit('setRoomDetail', roomDetail);
    },
    async roomKick({ state, commit }, playerId) {
      const { uid: roomId } = state.room;
      const roomDetail = await WebsocketService.send('room/kick', { roomId, playerId });

      commit('setRoomDetail', roomDetail);
    },
    async roomStartGame({ state, commit }) {
      const { uid: roomId } = state.room;
      const roomDetail = await WebsocketService.send('game/start', { roomId });
    },
  },
};
