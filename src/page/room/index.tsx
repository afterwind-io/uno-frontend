import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Anime from 'animejs';
import './room.scss';
import Avatar from 'ui/avatar/avatar';
import PlayerBanner from './component/playerBanner';
import { DEFUALT_PLAYER, Player } from 'model/player';
import Room from 'model/room';
import WebsocketService from 'service/websocket';

@Component
export default class PageRoom extends Vue {
  get room(): Room {
    return this.$store.getters.room;
  }

  get players(): Player[] {
    const players: Player[] = this.$store.getters.room.players;
    const slots = this.room.maxPlayers;

    return players.length < slots
      ? players.concat(Array.from({ length: slots - players.length }))
      : players;
  }

  public transfer() {
    // TODO
  }

  public async kick(player: Player) {
    await this.$store.dispatch('roomKick', player.uid);
  }

  public async addBot() {
    await this.$store.dispatch('roomAddBot');
  }

  public async start() {
    await this.$store.dispatch('roomStartGame');
  }

  public async leave() {
    await this.$store.dispatch('roomLeave');

    this.$router.push('lobby');
  }

  public mounted() {
    // Anime({
    //   targets: '.player-banner',
    //   scale: [0.8, 1],
    //   opacity: [0, 1],
    //   delay(el, i, l) {
    //     return i * 100;
    //   },
    //   duration: 1000,
    //   elasticity: 500,
    // });

    // Anime({
    //   targets: '.config-box',
    //   translateX: ['-2rem', '0'],
    //   opacity: [0, 1],
    //   delay(el, i, l) {
    //     return 1000 + i * 100;
    //   },
    // });
  }

  public render(h) {
    return (
      <div class="page page-room">
        <header>
          <h1>#{this.room.name}</h1>
        </header>

        <aside>
          <div class="config-box config-rule">
            <header>计分规则</header>

            <main>
              <p>
                {this.room.mode}
                <br />
                <span><span style="text-decoration: line-through;">大吉大利，今晚吃鸡</span>总之看谁赢得多</span>
              </p>

              {/* <div class="rule">
                  <h1>赢者通吃</h1>
                  <h2>每局的赢者获得所有玩家剩余手牌的分数，分多者胜</h2>
                </div>

                <div class="rule">
                  <h1>大隐于市</h1>
                  <h2>所有玩家根据剩余手牌独立计算分数，分少者胜</h2>
                </div>

                <div class="rule">
                  <h1>打发时间</h1>
                  <h2>我就想随便玩玩</h2>
                </div> */}
            </main>
          </div>

          <div class="config-box config-condition">
            <header>获胜条件</header>

            <main>
              <p>率先获取3场胜利</p>
              {/* <p>率先获得<span>500</span>分</p>
                <p>连续进行<span>5场比赛</span></p>
                <p>赢了就行</p> */}
            </main>
          </div>

          <div class="config-box config-rounds">
            <header>最大场次</header>

            <main>
              <p>不限</p>
            </main>
          </div>

          <div class="ops">
            <div
              class="op"
              onClick={this.leave}>离开</div>
            <div
              class="op"
              onClick={this.start}>开始</div>
          </div>
        </aside>

        <main>
          {this.players.map((player) =>
            player === void 0
              ? <PlayerBanner
                placeholder
                whenAddBot={this.addBot}></PlayerBanner>
              : <PlayerBanner
                owner={player.uid === this.room.owner.uid}
                player={player}
                whenKick={this.kick}></PlayerBanner>,
          )}
          {/* <PlayerBanner
            owner
            player={DEFUALT_PLAYER}
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            placeholder
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            placeholder
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            placeholder
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            placeholder
            whenAddBot={this.addBot}></PlayerBanner>
          <PlayerBanner
            placeholder
            whenAddBot={this.addBot}></PlayerBanner> */}
        </main>
      </div>
    );
  }
}
