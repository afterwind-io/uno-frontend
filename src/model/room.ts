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
  status: RoomState;
}
