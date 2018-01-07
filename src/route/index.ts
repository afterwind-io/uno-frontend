import Vue from 'vue';
import VueRouter from 'vue-router';
import WebsocketService from 'service/websocket';

Vue.use(VueRouter);

const PageLanding = () => import(/* webpackChunkName: "landing" */'page/landing');
const PageHome = () => import(/* webpackChunkName: "home" */'page/home');
const PageLobby = () => import(/* webpackChunkName: "home" */'page/subs/lobby');
const PagePlay = () => import(/* webpackChunkName: "play" */'page/subs/play');
const PageRoom = () => import(/* webpackChunkName: "room" */'page/room');
const PageGame = () => import(/* webpackChunkName: "room" */'page/game');

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    { path: '/welcome', name: 'landing', component: PageLanding },
    {
      path: `/`,
      name: 'home',
      component: PageHome,
      children: [
        {
          path: '/play',
          name: 'play',
          component: PagePlay,
        },
        {
          path: '/lobby',
          name: 'lobby',
          component: PageLobby,
        },
      ],
    },
    {
      path: `/room`,
      name: 'room',
      component: PageRoom,
    },
    {
      path: `/game`,
      name: 'game',
      component: PageGame,
    },
    // { path: `/oops`, name: '404', component: Page404 },
    {
      path: '*',
      redirect: '/welcome',
    },
  ],
});

router.beforeEach((to, form, next) => {
  if (to.name === 'home') {
    next('play');
  } else {
    next();
  }
});

export default router;
