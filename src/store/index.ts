import Vue from 'vue';
import Vuex from 'vuex';
import * as VuexHelper from './util';
import { uno } from './uno';
import { room } from './room';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    room,
    uno,
  },
});

VuexHelper.open(store);

export default store;
