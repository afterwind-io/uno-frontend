import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './style/global.scss';
import { WebsocketService } from 'service';
import * as UNO from 'store/uno';
import Room from 'model/room';

@Component
export default class App extends Vue {
  mounted() {
    WebsocketService.on('room/update', (roomDetail: Room) => {
      this.$store.commit('setRoomDetail', roomDetail);
    });

    WebsocketService.on('game/ready', (roomDetail: Room) => {
      this.$store.commit('setRoomDetail', roomDetail);
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
