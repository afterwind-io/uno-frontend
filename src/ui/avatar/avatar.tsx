import Vue, { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './avatar.scss';
import { avatarHost } from 'config';

@Component
export default class Avatar extends Vue {
  @Prop()
  src: string;

  @Prop({ default: false })
  placeholder: boolean;

  @Prop({ default: false })
  anonymous: boolean;

  @Prop({ default: false })
  round: boolean;

  @Prop()
  mock: string;

  get staticSrc(): string {
    return this.placeholder || this.mock
      ? ''
      : avatarHost + this.src || '';
  }

  get classAvatar() {
    return {
      'ui-avatar': true,
      'ui-avatar--placeholder': this.placeholder,
      'ui-avatar--anonymous': this.anonymous,
      'ui-avatar--round': this.round,
      [`ui-avatar--mock-${Math.floor(Math.random() * 2)}`]: this.mock,
    };
  }

  public render(h) {
    return (
      (this.placeholder || this.mock)
        ? <div class={this.classAvatar}></div>
        : <img class={this.classAvatar} src={this.staticSrc} />
    );
  }
}
