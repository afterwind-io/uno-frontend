import Vue, { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './game.scss';
import { UnoSnapshot, nextSnapshot, UnoAction, UnoPlayer } from 'store/uno';
import * as VuexHelper from 'store/util';
import { WebsocketService } from 'service';
import { Card, CardColor, CardSymbol } from 'model/card';
import UICard from 'ui/card';
import RollingTable from './component/rollingTable';
import RollingGuest from './component/rollingGuest';
import * as Animation from './animation';

function sleep(timespan: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timespan));
}

@Component
export default class PageGame extends Vue {
  // private pointer = 1;
  private dealHandler = null;
  private selectedCards: Card[] = [];
  private lastCard: Card = new Card(CardColor.None, CardSymbol.None);
  private lastCardCount: number = 1;
  private isShowColorSelector: boolean = false;

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

  get players(): UnoPlayer[] {
    // return [0, 1, 2, 3, 4];
    // return [0, 1];
    return this.$store.getters.players;
  }

  get myCards(): Card[] {
    return this.$store.getters.myCards;
  }

  isMyTurn(pointer: number): boolean {
    const playerName = this.players[pointer].name;
    return playerName === this.$store.getters.user.name;
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCards.includes(card);
  }

  switchSelection(card: Card) {
    if (this.selectedCards.includes(card)) {
      const index = this.selectedCards.findIndex((selected) => selected.isSameCard(card));
      this.selectedCards.splice(index, 1);
    } else {
      this.selectedCards.push(card);
    }
  }

  async deal() {
    await this.$store.dispatch('deal', this.selectedCards);
    this.selectedCards = [];
  }

  async pass() {
    await this.$store.dispatch('pass');
  }

  async takePenalties() {
    await this.$store.dispatch('takePenalties');
  }

  async pickColor(color: CardColor) {
    await this.$store.dispatch('pickColor', color);

    this.isShowColorSelector = false;
  }

  async skipped() {
    await this.$store.dispatch('skip');
  }

  async mounted() {
    while (this.turns < 1000) {
      // TODO: 显示思考动画

      // 获取下一个状态快照
      const snapshot: UnoSnapshot = await nextSnapshot();

      // TODO: 关闭思考动画

      if (this.turns === 0) {
        this.$store.commit('update', snapshot);
        await sleep(2000);
        continue;
      }

      if (this.isMyTurn(snapshot.pointer)) {
        switch (snapshot.action) {
          case UnoAction.Continue:
            const legalCards = this.myCards.filter((card) => card.isLegal(
              snapshot.color, snapshot.symbol, snapshot.d2, snapshot.d4,
            ));

            if (legalCards.length === 0) {
              await this.pass();
            } else {

            }

            break;

          case UnoAction.CallColor:
            this.isShowColorSelector = true;
            break;

          case UnoAction.TakePenalty:
            /**
             * TODO
             *
             * 判断是否可以返回罚牌，
             * 如果可以提示是否出牌，
             * 否则自动跳过
             */
            await this.takePenalties();
            break;

          case UnoAction.ReturnPenalty:
            break;

          case UnoAction.Skipped:
            /**
             * TODO
             *
             * 如果有合法的Skip提示是否出牌，
             * 否则显示被跳过的动画
             */
            await this.skipped();
            break;

          case UnoAction.Challenge:
            break;

          default:
            break;
        }
      } else {
        switch (snapshot.action) {
          case UnoAction.TakePenalty:
            this.lastCard = Card.Blank;
            await Animation.takeCard();
            break;

          case UnoAction.Continue:
            this.lastCard = snapshot.lastCards[0];
            this.lastCardCount = snapshot.lastCards.length;
            await Animation.dealCard();
            break;

          default:
            break;
        }
      }

      this.$store.commit('update', snapshot);
      await sleep(2000);
    }
  }

  calCardClass(card: Card) {
    return {
      'card': true,
      'card--on': this.isCardSelected(card),
    };
  }

  get calPageClass() {
    return {
      'page-game': true,
      'page-game--red': this.color === CardColor.Red,
      'page-game--yellow': this.color === CardColor.Yellow,
      'page-game--green': this.color === CardColor.Green,
      'page-game--blue': this.color === CardColor.Blue,
    };
  }

  public render(h) {
    return (
      <div class={this.calPageClass}>

        <p id="debug" style="position: absolute; z-index: 2; font-size: 0.12rem; bottom: 0;">
          color: <span>{this.color}</span>;<br />
          symbol: <span>{this.symbol}</span>;<br />
          d2: <span>{this.d2.toString()}</span>;<br />
          d4: <span>{this.d4.toString()}</span>;<br />
          pointer: <span>{this.pointer}</span>;<br />
          penaltyCount: <span>{this.penaltyCount}</span>;<br />
          action: <span>{this.action}</span>;<br />
          turns: <span>{this.turns}</span>;<br />
          direction: <span>{this.direction}</span>;<br />
          <br />
          selectedCards: <span>{this.selectedCards.reduce((str, card) => str + ' ' + card.toAbbr(), '')}</span>
        </p>

        <UICard
          id="spirit-last-deal"
          card={this.lastCard}></UICard>

        <RollingTable guests={this.players} pointer={this.pointer}></RollingTable>

        <footer>
          {this.isMyTurn &&
            <p onClick={() => this.deal()} style="position: absolute; left: -0.50rem; font-size: 0.24rem;">DEAL</p>
          }
          {this.isMyTurn &&
            <p onClick={() => this.pass()} style="position: absolute; left: -0.50rem; top: 0.24rem; font-size: 0.24rem;">PASS</p>
          }

          {this.isShowColorSelector && <div class="colors">
            <p onClick={() => this.pickColor(CardColor.Red)}>红色</p>
            <p onClick={() => this.pickColor(CardColor.Yellow)}>黄色</p>
            <p onClick={() => this.pickColor(CardColor.Green)}>绿色</p>
            <p onClick={() => this.pickColor(CardColor.Blue)}>蓝色</p>
          </div>}

          <div class="cards">
            {this.myCards.map((card) =>
              <div
                class={this.calCardClass(card)}
                onClick={() => this.switchSelection(card)}>

                <UICard card={card}></UICard>
              </div>)
            }
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
