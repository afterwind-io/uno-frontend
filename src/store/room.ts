import { Module } from 'vuex';

interface IStoreRoom {
  roomId: string
}

export const room: Module<IStoreRoom, any> = {
  state: {
    roomId: ''
  },
  getters: {
    roomId(state): string {
      return state.roomId
    }
  },
  mutations: {
    setRoomId(state, roomId: string) {
      state.roomId = roomId
    }
  }
}