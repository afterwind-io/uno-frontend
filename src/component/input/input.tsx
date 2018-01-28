import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './input.scss';
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

        {this.type === 'search' && <Feather icon="search"></Feather>}
      </div>
    );
  }
}
