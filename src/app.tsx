import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './app.scss';
import { WebsocketService } from 'service';

@Component
export default class App extends Vue {
  mounted() {
    WebsocketService.on('game/ready', () => {
      this.$router.push('game');
    });

    WebsocketService.on('game/pick', (cards: any[]) => {
      this.$store.commit('pick', cards);
    });

    WebsocketService.on('game/update', (snapshot: any) => {
      this.$store.dispatch('cacheState', snapshot)
    });
  }

  public render() {
    return <div class="site">
      <router-view></router-view>
    </div>;
  }
}
