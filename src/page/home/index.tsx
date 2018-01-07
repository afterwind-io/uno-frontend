import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './home.scss';

@Component
export default class PageHome extends Vue {
  private selectedTab: string = 'play';

  nav(tab: string) {
    this.$router.push(tab);
    this.selectedTab = tab;
  }

  calMenuItemClass(tab: string) {
    return {
      'menu-item': true,
      'menu-item--focused': tab === this.selectedTab,
    };
  }

  mounted() {
    this.selectedTab = this.$route.name;
  }

  render() {
    return <div class="page page-home">
      <header>
        <div class="menu-bar">
          <p
            class={this.calMenuItemClass('play')}
            onClick={() => this.nav('play')}>开始</p>
          <p
            class={this.calMenuItemClass('news')}
            onClick={() => this.nav('news')}>新闻</p>
          <p
            class={this.calMenuItemClass('lobby')}
            onClick={() => this.nav('lobby')}>大厅</p>
          <p
            class={this.calMenuItemClass('statistics')}
            onClick={() => this.nav('statistics')}>统计</p>
          <p
            class={this.calMenuItemClass('about')}
            onClick={() => this.nav('about')}>关于</p>
          <p
            class={this.calMenuItemClass('profile')}
            onClick={() => this.nav('profile')}>个人主页</p>
        </div>
      </header>

      <main>
        <router-view></router-view>
      </main>

      <footer>

      </footer>
    </div>;
  }
}
