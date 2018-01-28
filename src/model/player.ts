/**
 * 玩家状态标记
 *
 * @export
 * @enum {number}
 */
export enum PlayerStatus {
  // 空闲
  idle = 'idle',

  // 队列中
  pending = 'pending',

  // 准备完成
  ready = 'ready',

  // 游戏中
  ingame = 'ingame',
}

/**
 * 玩家数据
 *
 * @export
 * @class Player
 */
export interface Player {
  /**
   * 用户id，与对应user一致
   *
   * @type {string}
   * @memberof Player
   */
  uid: string;

  /**
   * 用户账户名称，与对应user一致
   *
   * @type {string}
   * @memberof Player
   */
  name: string;

  /**
   * 用户头像链接，与对应user一致
   *
   * @type {string}
   * @memberof Player
   */
  avatar: string;

  /**
   * 是否为匿名玩家
   *
   * @type {boolean}
   * @memberof Player
   */
  anonymous: boolean;

  /**
   * 玩家类型
   *
   * @type {('human' | 'ai')}
   * @memberof Player
   */
  type: 'human' | 'ai';

  /**
   * 对应socket实例的id
   *
   * @type {string}
   * @memberof Player
   */
  socketId: string;

  /**
   * 玩家状态
   *
   * @type {PlayerStatus}
   * @memberof Player
   */
  status: PlayerStatus;

  /**
   * 玩家所在房间编号
   *
   * @type {string}
   * @memberof Player
   */
  roomId: string;
}

export const DEFUALT_PLAYER: Player = {
  uid: '',
  name: 'Hoshimiya ichigo',
  avatar: '',
  anonymous: false,
  type: 'human',
  socketId: '',
  status: PlayerStatus.idle,
  roomId: '0',
};
