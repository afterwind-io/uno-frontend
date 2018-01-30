import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Anime from 'animejs';
import './room.scss';
import Avatar from 'ui/avatar/avatar';
import PlayerBanner from './component/playerBanner';
import { DEFUALT_PLAYER } from 'model/player';

@Component
export default class PageRoom extends Vue {
  public transfer() {

  }

  public kick() {

  }

  public leave() {

  }

  public mounted() {
    Anime({
      targets: '.player-banner',
      scale: [0.8, 1],
      opacity: [0, 1],
      delay(el, i, l) {
        return i * 100;
      },
      duration: 1000,
      elasticity: 500,
    });

    Anime({
      targets: '.config-box',
      translateX: ['-2rem', '0'],
      opacity: [0, 1],
      delay(el, i, l) {
        return 1000 + i * 100;
      },
    })
  }

  public render(h) {
    return (
      <div class="page page-room">
        <header>
          <h1>#Hoshimiya ichigo的房间</h1>
        </header>

        <aside>
          <div class="config-box config-rule">
            <header>计分规则</header>

            <main>
              <p>
                胜者为王
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
            <header>进行场次</header>

            <main>
              <p>不限</p>
            </main>
          </div>
        </aside>

        <main>
          <PlayerBanner
            owner
            player={DEFUALT_PLAYER}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}></PlayerBanner>
          <PlayerBanner
            mock
            player={DEFUALT_PLAYER}></PlayerBanner>
          <PlayerBanner
            placeholder></PlayerBanner>
          <PlayerBanner
            placeholder></PlayerBanner>
          <PlayerBanner
            placeholder></PlayerBanner>
          <PlayerBanner
            placeholder></PlayerBanner>
          <PlayerBanner
            placeholder></PlayerBanner>
        </main>
      </div>
    );
  }
}
