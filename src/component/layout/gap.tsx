import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './gap.scss';

@Component
export default class Gap extends Vue {
  public render(h) {
    return <div class="ui-gap"></div>
  }
}
