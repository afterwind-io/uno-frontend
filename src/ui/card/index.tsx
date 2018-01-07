import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './card.scss';
import { Card } from 'model/card';

const DEFAULT_WIDTH = 0.5;
const DEFAULT_RATIO = 8 / 5;

@Component
export default class UICard extends Vue {
  @Prop()
  card: Card;

  @Prop({ default: 1 })
  scale: number;

  get style() {
    return {
      width: (DEFAULT_WIDTH * this.scale) + 'rem',
      height: (DEFAULT_WIDTH * DEFAULT_RATIO * this.scale) + 'rem',
    };
  }

  render(h) {
    return (
      <div class="ui-card" style={this.style}>
        {this.card.toAbbr()}
      </div>
    );
  }
}
