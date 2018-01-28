import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './switch.scss';

@Component
export default class UiSwitch extends Vue {
  @Prop()
  value: boolean;

  @Prop()
  changed: (value: boolean) => void;

  get classWrapper() {
    return {
      'switch-wrapper': true,
      'switch-wrapper--on': this.value,
      'switch-wrapper--off': !this.value,
    };
  }

  onSwitched() {
    this.changed && this.changed(!this.value);
  }

  render(h) {
    return (
      <div
        class="ui-switch"
        onClick={this.onSwitched}>

        <div class={this.classWrapper}>
          <div class="track" />
          <div class="switch" />
        </div>

        <p class="label">{this.$slots.default}</p>
      </div>
    );
  }
}
