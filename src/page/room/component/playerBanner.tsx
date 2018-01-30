import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './playerBanner.scss';
import Avatar from 'ui/avatar/avatar';
import { Player } from 'model/player';

@Component
export default class PlayerBanner extends Vue {
  @Prop({ default: false })
  placeholder: boolean;

  @Prop()
  player: Player;

  @Prop()
  owner: boolean;

  get playerInfo(): Partial<Player> {
    if (this.placeholder) { return {}; }

    return this.player || {};
  }

  get classPlayerBanner() {
    return {
      'player-banner': true,
      'player-banner--owner': this.owner,
    };
  }

  get classPlayerName() {
    return {
      'player-name': true,
      'player-name--placeholder': this.placeholder,
    };
  }

  get classPlayerDetail() {
    return {
      'player-detail': true,
      'player-detail--placeholder': this.placeholder,
    };
  }

  public render(h) {
    return (
      <div class={this.classPlayerBanner}>
        <div class="player-avatar">
          <Avatar
            src={this.playerInfo.avatar}
            placeholder={this.placeholder}
            anonymous={this.playerInfo.anonymous}></Avatar>
          {/* mock={!this.placeholder}></Avatar> */}
        </div>

        <div class="player-info">
          <p class={this.classPlayerName}>{this.playerInfo.name}</p>
          <p class={this.classPlayerDetail}>胜率：56% 积分：6666</p>
        </div>

        <div class="gap"></div>
        <div class="op-exchange"></div>
        <div class="op-kick"></div>
      </div>
    );
  }
}
