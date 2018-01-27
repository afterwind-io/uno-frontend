import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './switch.scss';

@Component
export default class Switch extends Vue {
  @Prop()
  value: boolean;

  @Prop()
  changed: (value: boolean) => void;

  get classWrapper() {
    return {
      'ui-switch': true,
      'ui-switch--on': this.value,
      'ui-switch--off': !this.value,
    };
  }

  get classSwitch() {
    return {
      'switch': true,
      'switch--on': this.value,
      'switch--off': !this.value,
    };
  }

  render(h) {
    return (
      <div class={this.classWrapper}>
        <div class="track" />
        <div class={this.classSwitch} />
      </div>
    );
  }
}
