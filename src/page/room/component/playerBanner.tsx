import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Anime from 'animejs';
import './playerBanner.scss';
import Feather from 'component/feather/feather';
import Gap from 'component/layout/gap';
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

  @Prop({ default: false })
  mock: boolean;

  @Prop()
  onAddBot: () => void;

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

  addBot() {
    this.onAddBot && this.onAddBot();
  }

  public render(h) {
    return (
      <div class={this.classPlayerBanner}>
        <div class="player-avatar">
          <Avatar
            src={this.playerInfo.avatar}
            placeholder={this.placeholder}
            anonymous={this.playerInfo.anonymous}
            mock={this.mock}></Avatar>
        </div>

        <div class="player-info">
          <p class={this.classPlayerName}>{this.playerInfo.name}</p>
          <p class={this.classPlayerDetail}></p>
          {/* <p class={this.classPlayerDetail}>胜率：56% 积分：6666</p> */}
        </div>

        <Gap></Gap>

        {this.placeholder &&
          <div
            class="op"
            title="邀请ai小姐姐"
            onClick={this.addBot}>
            <Feather icon="cpu"></Feather>
          </div>}
        {/* <div class="op-exchange"></div> */}
        {/* <div class="op-kick"></div> */}
      </div>
    );
  }
}
