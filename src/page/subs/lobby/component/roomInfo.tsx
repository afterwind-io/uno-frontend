import Vue, { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './roomInfo.scss';
import Room from 'model/room';
import { Player } from 'model/player';
// import Avatar from 'ui/avatar/index';

@Component
export default class RoomInfo extends Vue {
  @Prop()
  room: Room;

  @Prop()
  selected: (room: Room) => void;

  get playerAvatars(): VNode[] {
    return <div></div>
    // return this.room.players
    //   .concat(Array.from({ length: 9 - this.room.players.length }))
    //   .map((player: Player) => {
    //     return player === void 0
    //       ? Avatar(true)
    //       : Avatar(false, player.anonymous, player.avatar)
    //   });
  }

  render() {
    return (
      <div class="roomInfo">
        <header>
          {/* {Avatar(false, this.room.owner.anonymous, this.room.owner.avatar)} */}

          <div class="room-summary">
            <p class="room-name">{this.room.name}</p>
            <p class="room-detail">{'标准模式，3轮'}</p>
          </div>
        </header>

        <main>
          {this.playerAvatars}
        </main>
      </div>
    );
  }
}