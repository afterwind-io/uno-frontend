import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './rollingGuest.scss';
import UICard from 'ui/card/index';
import { Card, CardColor, CardSymbol } from 'model/card';

@Component
export default class RollingGuest extends Vue {
  @Prop()
  player;

  render(h) {
    if (this.player === void 0) return;

    const lastDealColor = this.player.lastDeal !== void 0 ? this.player.lastDeal.color : CardColor.None;
    const lastDealSymbol = this.player.lastDeal !== void 0 ? this.player.lastDeal.symbol : CardSymbol.None;

    return (
      <div class="ui-rollingGuest">
        {/* <div class="avatar"></div>
        <p>Hoshimiya Ichigo</p>
        <div class="player-info">
          <UICard card={new Card(CardColor.Red, CardSymbol.c0)} scale={0.6}></UICard>
          <p class="player-remains">{this.player}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <p class="player-points">666</p>
        </div> */}
        <div class="avatar"></div>
        <p>{this.player.name}</p>
        <div class="player-info">
          <UICard card={new Card(lastDealColor, lastDealSymbol)} scale={0.6}></UICard>
          <p class="player-remains">{this.player.remains}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <p class="player-points">{this.player.score}</p>
        </div>
      </div>
    );
  }
}
