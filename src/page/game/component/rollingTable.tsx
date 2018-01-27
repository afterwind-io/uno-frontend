import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import './rollingTable.scss';
import RollingGuest from './rollingGuest';

const DEFAULT_ANGLE = 20;

/**
 * 就那个旋转显示玩家的桌子(?)
 *
 * 注：以下实现基于两个前提假设：
 * 1、guests长度不小于2
 * 2、每次旋转步进1格
 *
 * @export
 * @class RollingTable
 * @extends {Vue}
 */
@Component
export default class RollingTable extends Vue {
  @Prop() pointer: number;

  @Prop() guests: any[];

  @Prop({ default: 1000 })
  speed: number;

  private visibleGuest: any[] = [];
  private delta: number = 0;
  private forceRerender: boolean = false;

  roll(polyfill: any, direction: 1 | -1) {
    const polyfillIndex = direction === 1 ? 4 : 0;

    this.visibleGuest[polyfillIndex] = polyfill;
    this.delta = direction * -1;

    setTimeout(() => {
      this.forceRerender = true;
      this.delta = 0;

      if (direction === 1) {
        this.visibleGuest.shift();
        this.visibleGuest[0] = void 0;
        this.visibleGuest.push(void 0);
      } else {
        this.visibleGuest.pop();
        this.visibleGuest[3] = void 0;
        this.visibleGuest.unshift(void 0);
      }

      Vue.nextTick(() => (this.forceRerender = false));
    }, 1100);
  }

  @Watch('pointer')
  onPointerChanged(now: number, last: number) {
    // return (this.pointer + this.direction * step + this.playerCount) % this.playerCount
    const length = this.guests.length;
    let polyfill;
    let direction;

    if (last === length - 1 && now === 0) {
      polyfill = this.guests[1];
      direction = 1;
    } else if (last === 0 && now === length - 1) {
      polyfill = this.guests[now - 1];
      direction = -1;
    } else if (now > last) {
      polyfill = this.guests[now === this.guests.length - 1 ? 0 : now + 1];
      direction = 1;
    } else if (now < last) {
      polyfill = this.guests[now === 0 ? this.guests.length - 1 : now - 1];
      direction = -1;
    }

    this.roll(polyfill, direction);
  }

  @Watch('guests')
  onGuestsChanged() {
    const merged = [...this.guests, ...this.guests, ...this.guests];
    const pointer = this.guests.length + this.pointer;

    this.visibleGuest = [void 0, ...merged.slice(pointer - 1, pointer + 2), void 0];
  }

  created() {
    this.onGuestsChanged();
  }

  getSeatStyle(index: number) {
    return {
      transform: `rotate(${DEFAULT_ANGLE * (index + this.delta) - 40}deg)`,
      opacity: index + this.delta === 2 ? '1' : void 0,
    };
  }

  getGuestStyle(index: number) {
    return {
      transform: `rotate(${-DEFAULT_ANGLE * (index + this.delta) + 40}deg) scale(${index + this.delta === 2 ? 1.2 : 1})`,
    };
  }

  render() {
    return (
      <div class="ui-rollingTable">
        <div class="guideline" />

        {this.visibleGuest.map((guest, index) => {
          return (
            <div class="seat" style={this.getSeatStyle(index)} key={this.forceRerender ? Math.random() : void 0}>
              <div class="guest" style={this.getGuestStyle(index)}>
                <RollingGuest player={guest} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
