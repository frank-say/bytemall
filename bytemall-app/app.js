import { wxp } from './utils/wxp';
import { BtApp } from '@beautywe/core/index.js';
import status from '@beautywe/plugin-status/index.js';
import event from '@beautywe/plugin-event/index.js';

import { updateManager } from './utils/util'
import { loginByCode } from './utils/user'

// 构建 BtApp 实例
const app = new BtApp({
  wxp, // promise后的api挂载到App实例上

  onLaunch() {
    // 版本更新提示
    updateManager()

    // 登录
    this.login()
  },
  login() {
    loginByCode()
      .then(() => this.status.get('login').success())
      .catch(err => this.status.get('login').fail())
  },

  globalData: {
    userInfo: null
  }
});

// status 插件依赖于 beautywe-plugin-event
app.use(event());
 
// 使用 status 插件
app.use(status({
  statuses: [
    'login'
  ],
}));

// 使用原生的 App 方法
App(app);
