import Vue from 'vue';
import router from './route';
import store from './store';
import App from './app';

export default new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
