import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './roomBanner.scss';
import Room, { RoomState } from 'model/room';
import Avatar from 'ui/avatar/avatar';

@Component
export default class RoomBanner extends Vue {
  @Prop()
  room: Room;

  get state(): string {
    return this.room.state === RoomState.idle ? '空闲' : '游戏中';
  }

  get member(): string {
    return `${this.room.players.length} / ${this.room.maxPlayers}`;
  }

  public render(h) {
    return (
      <div class="row-body row-body--available">
        <div class="col-state">
          <div class="indicator indicator--idle"></div>
          <p>{this.state}</p>
        </div>
        <div class="col-name">
          <p>{this.room.name}</p>
        </div>
        <div class="col-owner">
          <div class="avatar">
            <Avatar
              round
              src={this.room.owner.avatar}></Avatar>
          </div>
          <p>{this.room.owner.name}</p>
        </div>
        <div class="col-member">
          <p>{this.member}</p>
        </div>
        <div class="col-private">
          <p>是</p>
        </div>
        <div class="col-mode">
          <p>{this.room.mode}</p>
        </div>
      </div>
    );
  }
}
