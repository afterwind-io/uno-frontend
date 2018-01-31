import { Player } from './player';

/**
 * 房间状态标记
 *
 * @export
 * @enum {number}
 */
export enum RoomState {
  // 空闲
  idle = 'idle',

  // 游戏中
  ingame = 'ingame',
}

export type UNOMode = '胜者为王' | '赢者通吃' | '大隐于市';

export default interface Room {
  /**
   * 房间uid
   *
   * @type {string}
   * @memberof Room
   */
  uid: string;

  /**
   * 房间名称
   *
   * @type {string}
   * @memberof Room
   */
  name: string;

  /**
   * 房主
   *
   * @type {Player}
   * @memberof Room
   */
  owner: Player;

  /**
   * 玩家列表
   *
   * @type {Player[]}
   * @memberof Room
   */
  players: Player[];

  /**
   * 房间最大人数限制
   *
   * @type {number}
   * @memberof Room
   */
  maxPlayers: number;

  /**
   * 房间状态
   *
   * @type {RoomState}
   * @memberof Room
   */
  state: RoomState;

  /**
   * 游戏模式
   *
   * @type {UNOMode}
   * @memberof Room
   */
  mode: UNOMode;

  /**
   * 最大场次
   *
   * @type {number}
   * @memberof Room
   */
  maxRounds: number;

  /**
   * 最大积分
   *
   * @type {number}
   * @memberof Room
   */
  maxScore: number;

  /**
   * 当前场次
   *
   * @type {number}
   * @memberof Room
   */
  rounds: number;
}
