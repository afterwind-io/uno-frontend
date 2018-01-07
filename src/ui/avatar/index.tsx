import Vue, { VNode } from 'vue';
import './avatar.scss';

const h = new Vue().$createElement;

export default function Avatar(placeholder: boolean, anonymous?: boolean, src?: string): VNode {
  const classs = {
    'ui-avatar': true,
    'ui-avatar--placeholder': placeholder,
    'ui-avatar--anonymous': anonymous,
  };

  const style = {
    'background-image': src && `url(${src})`,
  };

  return (
    <div class={classs} style={style}></div>
  );
}
