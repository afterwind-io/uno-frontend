import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './room.scss';

@Component
export default class PageRoom extends Vue {
  public render(h) {
    return (
      <div class="page-room">
        <header class="room-title">
          <div class="avatar"></div>
          <h1>
            #这个是房间名
        </h1>
        </header>

        <aside class="room-config">
          <div class="config-box config-rule">
            <header>
              计分规则
              </header>

            <main>
              <div class="rule">
                <h1>胜者为王</h1>
                <h2><span style="text-decoration: line-through;">大吉大利，今晚吃鸡</span>总之看谁赢得多</h2>
              </div>

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
            <header>
              胜利条件
            </header>

            <main>
              <p>率先获取<span>3</span>场胜利</p>
              {/* <p>率先获得<span>500</span>分</p>
              <p>连续进行<span>5场比赛</span></p>
              <p>赢了就行</p> */}
            </main>
          </div>

          <div class="config-box config-rounds">
            <header>
              进行场次
            </header>

            <main>
              <p>不限</p>
            </main>
          </div>
        </aside>

        <section class="room-players">
          <div class="player-box">
            <div class="avatar"></div>
            <div class="player-info">
              <p class="player-name">Gerard</p>
              <p class="player-detail">胜率：56% 积分：6666</p>
            </div>
            <div class="gap"></div>
            <div class="op-exchange"></div>
            <div class="op-friend"></div>
            <div class="op-kick"></div>
          </div>
          <div class="player-box player-box--owner">
            <div class="avatar"></div>
            <div class="player-info">
              <p class="player-name">Rosemarie</p>
              <p class="player-detail">胜率：56% 积分：6666</p>
            </div>
            <div class="gap"></div>
            <div class="op-friend"></div>
            <div class="op-kick"></div>
          </div>
          <div class="player-box">
            <div class="avatar"></div>
            <div class="player-info">
              <p class="player-name">[BOT]Richard</p>
              <p class="player-detail">-</p>
            </div>
            <div class="gap"></div>
            <div class="op-kick"></div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
            <div class="gap"></div>
            <div class="op-ai"></div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
          </div>
          <div class="player-box">
            <div class="avatar avatar-vacancy"></div>
            <div class="player-info">
              <p class="player-name"></p>
              <p class="player-detail"></p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
