import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './home.scss';
import { PlayerStatus } from 'model/player';
import Logo from 'component/logo/logo'

@Component
export default class PageHome extends Vue {
  get playerStatus(): PlayerStatus {
    return this.$store.getters.player.status;
  }

  get matchButtonText(): string {
    return this.playerStatus === PlayerStatus.idle
      ? '开始'
      : '匹配中';
  }

  showMatchModes() {
    this.$router.push('play')
  }

  render() {
    return (
      <div class="page page-home">
        <header>
          <div class="logo-box">
            <div class="logo">
              <Logo></Logo>
            </div>
            <p class="version">v1.0.0</p>
            {/* <span class="status">当前在线：589人</span> */}
          </div>

          <div class="route-box">
            <router-link to="news">新闻</router-link>
            <router-link to="lobby">大厅</router-link>

            <div class="button-play" onClick={() => this.showMatchModes()}>
              {this.matchButtonText}

              <div class="pending-status">
                <div class="pending-member"></div>
                <div class="pending-member pending-member--online"></div>
                <div class="pending-member"></div>
                <div class="pending-member pending-member--online"></div>
                <div class="pending-member pending-member--online"></div>
                <div class="pending-member"></div>
              </div>
            </div>

            <router-link to="statistics">统计</router-link>
            <router-link to="about">关于</router-link>
          </div>

          <div class="profile-avatar"></div>

        </header>

        <main>
          <transition name="route" mode="out-in">
            <router-view></router-view>
          </transition>
        </main>
      </div>
    );
  }
}
