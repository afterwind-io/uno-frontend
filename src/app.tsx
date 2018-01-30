import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './style/global.scss';
import { WebsocketService } from 'service';
import * as UNO from 'store/uno';

@Component
export default class App extends Vue {
  mounted() {
    WebsocketService.on('game/ready', (roomId: string) => {
      this.$store.commit('setRoomId', roomId)
      this.$router.push('game');
    });

    WebsocketService.on('game/pick', (cards: any[]) => {
      this.$store.commit('pick', cards);
    });

    WebsocketService.on('game/update', (snapshot: any) => {
      UNO.cacheSnapshot(snapshot);
    });
  }

  public render() {
    return <div class="site">
      <router-view></router-view>
    </div>;
  }
}
