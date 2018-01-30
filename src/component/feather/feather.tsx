import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

function iconSearch(h) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>;
}

function iconX(h) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}

type iconType = 'search' | 'x';

@Component
export default class Feather extends Vue {
  @Prop()
  icon: iconType;

  public render(h) {
    switch (this.icon) {
      case 'search':
        return iconSearch(h);
      case 'x':
        return iconX(h);
      default:
        return;
    }
  }
}
