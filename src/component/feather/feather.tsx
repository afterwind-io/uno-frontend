import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Feather extends Vue {
  @Prop()
  icon: 'search';

  public render(h) {
    switch (this.icon) {
      case 'search':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>
        );
      default:
        return;
    }
  }
}
