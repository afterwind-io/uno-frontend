import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WebsocketService from './websocket';
import User from 'model/user';

@Component
class UserService extends Vue {
  private user: User = new User();

  get current(): User {
    return this.user;
  }

  async login(username: string, password: string) {
    const { token, user, player } = await WebsocketService.send('user/login', {
      anoanymous: false,
      username,
      password,
    });

    WebsocketService.setToken(token);
    this.user = user;
  }

  async register(username: string, password: string) {
    const { token, user, player } = await WebsocketService.send('user/register', {
      username,
      password,
    });

    WebsocketService.setToken(token);
    this.user = user;
  }
}

export default new UserService();
