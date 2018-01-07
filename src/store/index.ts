import Vue from 'vue';
import Vuex from 'vuex';
import * as VuexHelper from './util';
import { uno } from './uno';

Vue.use(Vuex);

const store = new Vuex.Store(Object.assign({}, uno));

VuexHelper.open(store);

export default store;
