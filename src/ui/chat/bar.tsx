import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class ChatBar extends Vue {
  public render(h) {
    return <div class="chat-bar">
      <h1>chat-bar</h1>
    </div>;
  }
}
