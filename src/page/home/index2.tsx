import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './home.scss';
import ChatBar from '../../ui/chat/bar';

enum Status {
  idle,
  pending,
}

@Component
export default class PageLobby extends Vue {
  private status: Status = Status.idle;

  get buttonActionName(): string {
    return this.status === Status.idle
      ? '开始'
      : '队列中';
  }

  public render() {
    return <div class="page-lobby">
      <router-view></router-view>

      <header>
        <div class="logoBox">
          UNO
          <span class="version">v1.0.0</span>
          <span class="status">当前在线：589人</span>
        </div>
        <div class="gap"></div>
        <div class="profile-avatar"></div>

        <div class="button-play" onClick={() => this.startMatch()}>
          {this.buttonActionName}

          <div class="pending-status">
            <div class="pending-member"></div>
            <div class="pending-member pending-member--online"></div>
            <div class="pending-member"></div>
            <div class="pending-member pending-member--online"></div>
            <div class="pending-member pending-member--online"></div>
            <div class="pending-member"></div>
          </div>
        </div>
      </header>

      <main>

        <div class="pane-news">
          <header>
            新闻
          </header>
          <main>
            <div class="news-box">
              <header>
                <h1>beta版本正式发布！</h1>
                <h2>Afterwind @ 2018-01-10</h2>
              </header>

              <main>
                <p>示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字</p>
                <p>示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字</p>
              </main>

              <footer>
                <p>阅读全文</p>
              </footer>
            </div>
            <div class="news-box">
              <header>
                <h1>alpha0.17.8发布！beta在即</h1>
                <h2>Afterwind @ 2017-12-10</h2>
              </header>

              <main>
                <p>示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字</p>
                <p>示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字</p>
              </main>

              <footer>
                <p>阅读全文</p>
              </footer>
            </div>
          </main>
        </div>

        <div class="pane-rank">
          <header>排行榜</header>

          <main>
            <header class="rank-entry">
              <div class="col-name">名称</div>
              <div class="col-wins">胜场</div>
              <div class="col-score">积分</div>
            </header>
            {Array.from({ length: 8 }).map(() =>
              <li class="rank-entry">
                <div class="col-avatar"></div>
                <div class="col-name">Doge</div>
                <div class="col-wins">10</div>
                <div class="col-score">456</div>
              </li>)}
          </main>
        </div>

        <div class="pane-lobby">
          <header>房间</header>

          <section>
            <input type="text" placeholder="房间名/玩家名" />
            <label>
              <input type="checkbox" />
              私有
            </label>
            <label>
              <input type="checkbox" />
              满员
            </label>
            <label>
              <input type="checkbox" />
              游戏中
            </label>
          </section>

          <main>
            <div class="room-box room--idle">
              <header>这个是房间名称</header>
              <section>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
              </section>
            </div>
            <div class="room-box room--private">
              <header>这个是房间名称</header>
              <section>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
              </section>
            </div>
            <div class="room-box room--busy">
              <header>这个是房间名称</header>
              <section>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
                <div class="room-member room-vacancy"></div>
              </section>
            </div>
          </main>
        </div>
      </main>

      <footer>
        <ChatBar></ChatBar>
      </footer>

    </div>;
  }

  private startMatch() {
    this.status = Status.pending;
  }
}
