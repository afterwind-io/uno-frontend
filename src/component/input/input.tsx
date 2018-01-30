import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './input.scss';
import { filter } from 'util/common';
import Feather from '../feather/feather';

@Component
export default class UiInput extends Vue {
  @Prop()
  value: string;

  @Prop()
  placeholder: string;

  @Prop()
  type: 'search' | 'password';

  @Prop()
  changed: (value: string) => void;

  get classIconClear() {
    return {
      'feather-x--on': this.value !== '',
    };
  }

  clear() {
    this.changed && this.changed('');
  }

  onInputed({ target }: { target: HTMLInputElement }) {
    this.changed && this.changed(target.value);
  }

  public render(h) {
    return (
      <div class="ui-input">
        <input
          type="text"
          placeholder={this.placeholder}
          value={this.value}
          onInput={this.onInputed} />

        {this.type === 'search' && [
          <Feather icon="search"></Feather>,

          <Feather
            class={this.classIconClear}
            icon="x"
            nativeOnClick={this.clear}></Feather>,
        ]}
      </div>
    );
  }
}
