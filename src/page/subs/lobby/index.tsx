import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './lobby.scss';
import Avatar from 'ui/avatar/index';
import RoomInfo from './component/roomInfo';
import Room from 'model/room';

@Component
export default class PageLobby extends Vue {
  public create() {

  }

  public join(room: Room) {

  }

  public render(h) {
    return <div class="page page-lobby">
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
          <RoomInfo
            room={{
              name: '这个是房间名称',
              owner: {},
              players: [],
              mode: '标准模式，3轮',
            }}
            selected={(room) => this.join(room)}></RoomInfo>
        </div>
      </main>

      <aside>
        <input type="text" placeholder="房间名称" />
        <input type="text" placeholder="密码（可选）" />
        <label><input type="radio" />胜者为王</label>
        <label><input type="radio" />赢者通吃</label>
        <label><input type="radio" />大隐于市</label>

        <input type="text" placeholder="最大场次" />
        <input type="text" placeholder="目标分数" />
        <p onClick={() => this.create()}>创建</p>
      </aside>
    </div>;
  }
}
