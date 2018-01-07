import Vue, { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import Anime from 'animejs';
import './game.scss';
import * as VuexHelper from 'store/util';
import { WebsocketService } from 'service';
import { Card, CardColor, CardSymbol } from 'model/card';
import UICard from 'ui/card';
import RollingTable from './component/rollingTable';
import RollingGuest from './component/rollingGuest';
import { UNOSnapshot, nextStateCache } from 'store/uno';

function timer(timespan: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, timespan);
  });
}

@Component
export default class PageGame extends Vue {
  // private pointer = 1;
  private dealHandler = null;

  get color(): CardColor {
    return this.$store.getters.color;
  }

  get symbol(): CardSymbol {
    return this.$store.getters.symbol;
  }

  get d2(): boolean {
    return this.$store.getters.d2;
  }

  get d4(): boolean {
    return this.$store.getters.d4;
  }

  get pointer(): number {
    return this.$store.getters.pointer;
  }

  get penaltyCount(): number {
    return this.$store.getters.penaltyCount;
  }

  // TODO: 类型
  get action(): string {
    return this.$store.getters.action;
  }

  get turns(): number {
    return this.$store.getters.turns;
  }

  get direction(): number {
    return this.$store.getters.direction;
  }

  get players(): any[] {
    // return [0, 1, 2, 3, 4];
    // return [0, 1];
    return this.$store.getters.players;
  }
  get myCards(): Card[] {
    return this.$store.getters.myCards;
  }

  deal() {
    this.$store.dispatch('deal', {
      roomId: '',
      deals: [],
    });
  }

  async mounted() {
    Anime({
      targets: '#debug',
      translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 }
      ],
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 2000,
      loop: true
    });

    while (this.turns < 1000) {
      const snapshot: UNOSnapshot = nextStateCache();

      if (snapshot === void 0) {
        await timer(2000);
        continue;
      }

      if (this.turns === 0) {
        await timer(2000);
        this.$store.commit('update', snapshot);
      }

      await timer(2000);
      this.$store.commit('update', snapshot);
    }
  }

  public render(h) {
    return (
      <div class="page-game">
        {/* <input
          style="position: absolute; z-index: 2"
          type="number"
          value={this.pointer}
          onInput={(e) => {
            const num = parseInt(e.target.value);
            if (num === this.players.length) {
              this.pointer = 0;
            } else if (num === -1) {
              this.pointer = this.players.length - 1;
            } else {
              this.pointer = num;
            }
          }} /> */}

        <p id="debug" style="position: absolute; z-index: 2; font-size: 0.16rem;">
          color: <span>{this.color}</span>;<br />
          symbol: <span>{this.symbol}</span>;<br />
          d2: <span>{this.d2.toString()}</span>;<br />
          d4: <span>{this.d4.toString()}</span>;<br />
          pointer: <span>{this.pointer}</span>;<br />
          penaltyCount: <span>{this.penaltyCount}</span>;<br />
          action: <span>{this.action}</span>;<br />
          turns: <span>{this.turns}</span>;<br />
          direction: <span>{this.direction}</span>;<br />
        </p>

        <RollingTable guests={this.players} pointer={this.pointer}></RollingTable>

        <footer>
          <div class="cards">
            {this.myCards.map((card) =>
              <div class="card">
                <UICard card={card}></UICard>
              </div>)
            }
            {/* <div class="card">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div>
            <div class="card">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div>
            <div class="card">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div>
            <div class="card">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div>
            <div class="card card--on">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div>
            <div class="card">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div>
            <div class="card">
              <UICard card={new Card(CardColor.Blue, CardSymbol.c6)}></UICard>
            </div> */}
          </div>
        </footer>

        {/* <aside class="player-list">
          <div class="player-box">
            <div class="player player1">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player2 player--current">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player1">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player2">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player1">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player2">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player1">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player2">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player1">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
            <div class="player player2">
              <div class="bg"></div>
              <div class="player-content">
                <p class="player-name">Kitty</p>
                <div class="gap"></div>
                <div class="player-card"></div>
                <p class="player-remains">4</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p class="player-points">666</p>
              </div>
            </div>
          </div>
        </aside> */}

        <aside class="chat">

        </aside>

      </div>
    );
  }
}
