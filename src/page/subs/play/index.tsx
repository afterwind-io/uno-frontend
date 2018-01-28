import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './play.scss';
import WebsocketService from 'service/websocket';

@Component
export default class PagePlay extends Vue {
  async startSingle() {
    WebsocketService.connect();
    await this.$store.dispatch('login', { username: 'doge', password: '123456' });
    const { uid } = await WebsocketService.send<any>('room/create', {
      owner: this.$store.getters.player.uid,
      maxPlayer: 6,
      password: '6p',
      mode: '赢者通吃',
      maxRounds: 1,
      maxScore: 1,
    });
    await WebsocketService.send('room/addbot', { roomId: uid });
    await WebsocketService.send('room/addbot', { roomId: uid });
    await WebsocketService.send('room/addbot', { roomId: uid });
    await WebsocketService.send('room/addbot', { roomId: uid });
    await WebsocketService.send('room/addbot', { roomId: uid });
    WebsocketService.send('game/start', { roomId: uid });
  }

  mounted() {
    // WebsocketService.connect();
  }

  public render(h) {
    return <div class="page page-play">
      <div class="mode-container">
        <div
          class="mode-box"
          onClick={() => this.startSingle()}>

          <div class="mode">
            <section class="mode-bg"></section>

            <section class="mode-info">
              <p class="mode-title">单机模式</p>
              <p class="mode-title--sub">与5名AI小姐姐一起玩耍（是真的）</p>

              <p class="mode-detail">什么情况下你应该选择这个？</p>
              <p class="mode-detail">- 需要熟悉游戏规则；</p>
              <p class="mode-detail">- 平时太寂寞，渴求小姐姐温暖一下心灵；</p>
              <p class="mode-detail">- 服务器太冷清，开发者还带着小姨子跑路了；</p>
            </section>
          </div>
        </div>

        <div class="mode-box">

          <div class="mode">
            <section class="mode-bg"></section>

            <section class="mode-info">
              <p class="mode-title">快速匹配</p>
              <p class="mode-title--sub">与5名真人玩家（大概）进行快速对战</p>

              <p class="mode-detail">统计页面里面是不是有个叫“排行榜”的东西？</p>
              <p class="mode-detail">知道里面的数据是怎么来的吗？</p>
              <p class="mode-detail">对，只有这个模式才会记录你的数据。</p>
              <p class="mode-detail">所以还看什么赶紧点吧。</p>
            </section>
          </div>
        </div>

        <div class="mode-box">

          <div class="mode">
            <section class="mode-bg"></section>

            <section class="mode-info">
              <p class="mode-title">随基模式</p>
              <p class="mode-title--sub">我没打错字</p>

              <p class="mode-detail">
                快速加入其他人创建的房间，
                与形形色色的陌生人踏上惊险刺激的旅途...什么的，
                打个牌而已别想太多了。
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>;
  }
}
