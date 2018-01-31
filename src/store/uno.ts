import Vue from 'vue';
import { Module } from 'vuex';
import { WebsocketService } from 'service';
import { Card, CardColor, CardSymbol } from 'model/card';

type UNOMode = '胜者为王' | '赢者通吃' | '大隐于市';

export interface UnoSnapshot {
  color: CardColor;
  symbol: CardSymbol;
  d2: boolean;
  d4: boolean;
  lastCards: Card[];
  pointer: number;
  penaltyCount: number;
  action: UnoAction;
  turns: number;
  direction: number;
  players: UnoPlayer[];
}

export interface UnoPlayer {
  name: string;
  avatar: string;
  lastDeal: Card;
  remains: number;
  score: number;
}

interface IStoreUno {

  // 当前场次
  round: number;
  // 总共场次
  maxRound: number;

  mode: UNOMode;

  color: CardColor;
  symbol: CardSymbol;
  d2: boolean;
  d4: boolean;

  pointer: number;
  penaltyCount: number;
  action: UnoAction;
  turns: number;
  direction: number;

  players: UnoPlayer[];
  myCards: Card[];
  lastCards: Card[];
}

export const enum UnoAction {
  Continue = 'continue',
  CallColor = 'callColor',
  ReturnPenalty = 'returnPenalty',
  TakePenalty = 'takePenalty',
  Challenge = 'challenge',
  Skipped = 'skipped',
}

// 状态缓冲池
const snapshotCache: UnoSnapshot[] = [];
let snapshotPromise: (snapshot: UnoSnapshot) => void;

/**
 * 缓冲snapshot
 *
 * @export
 * @param {*} snapshot 服务器发送的游戏状态快照
 */
export async function cacheSnapshot(snapshot: any) {
  snapshot.lastCards = snapshot.lastCards.map(
    (card) => new Card(card.color, card.symbol),
  );
  // snapshot.players.foreach(player => player.lastDeal = new Card())

  if (snapshotPromise !== void 0) {
    snapshotPromise(snapshot);
    snapshotPromise = void 0;
  } else {
    snapshotCache.push(snapshot);
  }
}

/**
 * 从缓冲中获取一个状态快照
 *
 * @export
 * @returns {Promise<UnoSnapshot>} 包含状态快照的Promise
 */
export async function nextSnapshot(): Promise<UnoSnapshot> {
  if (snapshotCache.length !== 0) {
    return snapshotCache.shift();
  } else {
    return new Promise<UnoSnapshot>((resolve) => {
      snapshotPromise = resolve;
    });
  }
}

const store: Module<IStoreUno, any> = {
  state: {
    round: 0,
    maxRound: 0,
    mode: '胜者为王',

    color: CardColor.None,
    symbol: CardSymbol.None,
    d2: false,
    d4: false,
    pointer: 0,
    penaltyCount: 0,
    action: UnoAction.Continue,
    turns: 0,
    direction: 1,
    players: [],
    myCards: [],
    lastCards: [],
  },
  getters: {
    color(state): CardColor {
      return state.color;
    },
    symbol(state): CardSymbol {
      return state.symbol;
    },
    d2(state): boolean {
      return state.d2;
    },
    d4(state): boolean {
      return state.d4;
    },
    pointer(state): number {
      return state.pointer;
    },
    penaltyCount(state): number {
      return state.penaltyCount;
    },
    action(state): UnoAction {
      return state.action;
    },
    turns(state): number {
      return state.turns;
    },
    direction(state): number {
      return state.direction;
    },
    currentRound(state): number {
      return state.round;
    },
    players(state): UnoPlayer[] {
      return state.players;
    },
    myCards(state): Card[] {
      return state.myCards;
    },
    lastCards(state): Card[] {
      return state.lastCards;
    },
  },
  mutations: {
    update(state, snapshot: UnoSnapshot) {
      if (snapshot === void 0) { return; }

      state.color = snapshot.color;
      state.symbol = snapshot.symbol;
      state.d2 = snapshot.d2;
      state.d4 = snapshot.d4;
      state.lastCards = snapshot.lastCards;
      state.pointer = snapshot.pointer;
      state.penaltyCount = snapshot.penaltyCount;
      state.action = snapshot.action;
      state.turns = snapshot.turns;
      state.direction = snapshot.direction;

      if (state.players.length === 0) {
        state.players = snapshot.players;
      } else {
        snapshot.players.forEach((player, index) => {
          Object.keys(player).forEach((key) => {
            Vue.set(state.players[index], key, player[key]);
          });
        });
      }
    },
    pick(state, cards: any[]) {
      state.myCards.push(...cards.map((card) => new Card(card.color, card.symbol)));
    },
    toss(state, cards: Card[]) {
      cards.forEach((card) => {
        const index = state.myCards.findIndex((mc) => mc.isSameCard(card));
        state.myCards.splice(index, 1);
      });
    },
  },
  actions: {
    async deal({ commit, rootGetters }, deals: Card[]) {
      const { uid: roomId } = rootGetters.room;

      await WebsocketService.send('game/call', { roomId, deals });
      commit('toss', deals);
    },
    async pass({ rootGetters }) {
      const { uid: roomId } = rootGetters.room;

      await WebsocketService.send('game/deal', { roomId, deals: [Card.Pass] });
    },
    async pickColor({ rootGetters }, color: CardColor) {
      const { uid: roomId } = rootGetters.room;

      await WebsocketService.send('game/deal', { roomId, deals: [Card.PickColor(color)] });
    },
    async skip({ rootGetters }) {
      const { uid: roomId } = rootGetters.room;

      await WebsocketService.send('game/deal', { roomId, deals: [Card.Skip] });
    },
    async takePenalties({ rootGetters }) {
      const { uid: roomId } = rootGetters.room;

      await WebsocketService.send('game/deal', { roomId, deals: [Card.PenaltyOver] });
    },
  },
};

export const uno = store;
