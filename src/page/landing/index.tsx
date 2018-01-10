import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import './landing.scss';
import { WebsocketService } from 'service';

@Component
export default class PageLanding extends Vue {
  private loginAction: '登录' | '注册' = '登录';
  private username: string = 'doge';
  private password: string = '123456';

  get loginActionDescription(): string {
    return this.loginAction === '登录'
      ? '注册一个新账号'
      : '登录你的账号';
  }

  switchLoginAction() {
    this.loginAction = this.loginAction === '登录' ? '注册' : '登录';
  }

  go() {
    WebsocketService.connect();

    this.loginAction === '登录'
      ? this.login()
      : this.register();
  }

  async anonymousLogin() {
    // this.$alert.warn({
    //   title: '即将隐身...',
    //   msg: '以匿名模式登录后，你将无法加入匹配，同时所有聊天功能也将被禁用，是否继续？',
    // });
    this.login(true);
  }

  async login(anonymous: boolean = false) {
    try {
      await this.$store.dispatch('login', {
        anonymous,
        username: this.username,
        password: this.password,
      });

      this.$router.push('play');
    } catch (error) {
      // TODO
      WebsocketService.disconnect();
    }
  }

  async register() {
    try {
      await this.$store.dispatch('register', {
        username: this.username,
        password: this.password,
      });

      this.$router.push('play');
    } catch (error) {
      // TODO
      WebsocketService.disconnect();
    }
  }

  render(h) {
    return (
      <div class="page page-landing">
        <main>
          <div class="content-wrapper">
            <p class="logo">UNO</p>
            <p class="logo-sub">v1.0.0</p>
            <p class="logo-summary">一个实验性的多人卡牌游戏</p>
            <div class="login-box">
              {/* <Input
                value={this.username}
                label="昵称"
                placeholder="请输入游戏内昵称，新的昵称将会被自动注册"
                changed={(value) => this.username = value}></Input>
              <Input
                value={this.password}
                label="密码"
                placeholder="请输入密码"
                changed={(value) => this.password = value}></Input> */}

              <div class="input">
                <div class="label">昵称</div>
                <input type="text" value={this.username} />
                <div class="hint">请输入游戏内昵称，新的昵称将会被自动注册</div>
              </div>
              <div class="input">
                <div class="label">密码</div>
                <input type="text" value={this.password} />
                <div class="hint">至少6位，数字字母符号什么的随便了</div>
              </div>

              <div class="action-box">
                <div
                  class="button"
                  onClick={() => this.go()}>{this.loginAction}</div>
              </div>

              <p class="alt-text">
                感觉打开方式不对？没关系，你可以发动
                <span
                  class="alt-link"
                  onClick={() => this.anonymousLogin()}>秘技！阿卡林～</span>
                或者
                <span
                  class="alt-link"
                  onClick={() => this.switchLoginAction()}>{this.loginActionDescription}</span>
                。
              </p>

            </div>
          </div>
        </main>

        <footer>
          <p>
            <span>
              <svg class="octicon octicon-mark-github" version="1.1" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </span>
            本
            <a target="blank" href="">项目</a>
            由
            <a target="blank" href="https://github.com/afterwind-io">Afterwind</a>
            用心呈献。
            使用最新的Firefox/Chrome浏览器并开启全屏模式以获取最佳体验。
            </p>
        </footer>
      </div>
    );
  }
}
