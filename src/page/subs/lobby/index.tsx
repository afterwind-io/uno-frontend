import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './lobby.scss';
import Avatar from 'ui/avatar/index';
import RoomInfo from './component/roomInfo';
import Room from 'model/room';
import UiSwitch from 'component/switch/switch';
import UiInput from 'component/input/input';

@Component
export default class PageLobby extends Vue {
  private filter: string = '';
  private isShowPrivate: boolean = false;
  private isShowFull: boolean = false;
  private isShowIngame: boolean = false;

  public create() { }

  public join(room: Room) { }

  public onFilterChanged(value: string) {
    this.filter = value;
  }

  public render(h) {
    return (
      <div class="page page-lobby">

        <div class="toolbar">
          <UiInput
            type="search"
            placeholder="房间名/玩家名"
            value={this.filter}
            changed={this.onFilterChanged}></UiInput>

          <UiSwitch
            value={this.isShowPrivate}
            changed={(value) => (this.isShowPrivate = value)}>
            私有
          </UiSwitch>

          <UiSwitch
            value={this.isShowFull}
            changed={(value) => (this.isShowFull = value)}>
            满员
          </UiSwitch>

          <UiSwitch
            value={this.isShowIngame}
            changed={(value) => (this.isShowIngame = value)}>
            游戏中
          </UiSwitch>
        </div>

        <div class="room-table">
          <header>
            <div class="col-state">
              <p>状态</p>
            </div>
            <div class="col-name">
              <p>房间名称</p>
            </div>
            <div class="col-owner">
              <p>房主</p>
            </div>
            <div class="col-member">
              <p>玩家</p>
            </div>
            <div class="col-private">
              <p>私有</p>
            </div>
            <div class="col-mode">
              <p>模式</p>
            </div>
          </header>

          <main>
            <div class="row-body row-body--available">
              <div class="col-state">
                <div class="indicator indicator--idle"></div>
                <p>空闲</p>
              </div>
              <div class="col-name">
                <p>A veeeeeeeeeeeeeery long room name</p>
              </div>
              <div class="col-owner">
                <div class="avatar"></div>
                <p>Hoshimiya Ichigo</p>
              </div>
              <div class="col-member">
                <p>8 / 10</p>
              </div>
              <div class="col-private">
                <p>是</p>
              </div>
              <div class="col-mode">
                <p>胜者为王</p>
              </div>
            </div>

            <div class="row-body row-body--available">
              <div class="col-state">
                <div class="indicator indicator--ingame"></div>
                <p>游戏中</p>
              </div>
              <div class="col-name">
                <p>A veeeeeeeeeeeeeery long room name</p>
              </div>
              <div class="col-owner">
                <div class="avatar"></div>
                <p>Hoshimiya Ichigo</p>
              </div>
              <div class="col-member">
                <p>8 / 10</p>
              </div>
              <div class="col-private">
                <p>是</p>
              </div>
              <div class="col-mode">
                <p>胜者为王</p>
              </div>
            </div>

            <div class="row-body row-body--disabled">
              <div class="col-state">
                <div class="indicator indicator--ingame"></div>
                <p>游戏中</p>
              </div>
              <div class="col-name">
                <p>A veeeeeeeeeeeeeery long room name</p>
              </div>
              <div class="col-owner">
                <div class="avatar"></div>
                <p>Hoshimiya Ichigo</p>
              </div>
              <div class="col-member">
                <p>8 / 10</p>
              </div>
              <div class="col-private">
                <p>是</p>
              </div>
              <div class="col-mode">
                <p>胜者为王</p>
              </div>
            </div>

          </main>
        </div>

        {/* <main>
          <div class="room-box room--idle">
            <RoomInfo
              room={{
                name: '这个是房间名称',
                owner: {},
                players: [],
                mode: '标准模式，3轮',
              }}
              selected={(room) => this.join(room)}
            />
          </div>
        </main> */}

        {/* <aside>
          <input type="text" placeholder="房间名称" />
          <input type="text" placeholder="密码（可选）" />
          <label>
            <input type="radio" />胜者为王
          </label>
          <label>
            <input type="radio" />赢者通吃
          </label>
          <label>
            <input type="radio" />大隐于市
          </label>

          <input type="text" placeholder="最大场次" />
          <input type="text" placeholder="目标分数" />
          <p onClick={() => this.create()}>创建</p>
        </aside> */}
      </div>
    );
  }
}
