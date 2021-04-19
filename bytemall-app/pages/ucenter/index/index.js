const {
  checkLogin,
  getPhone
} = require('../../../utils/user')
const util = require('../../../utils/util.js');

Page({
  data: {
    
  },

  onLoad() {
    
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
  },
  bindPhoneNumber: function(e) {
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      // 拒绝授权
      return;
    }

    // 上传加密数据，获取手机号
    checkLogin().then((res) => {
      if(res) {
        getPhone(e)
          .then(() => {
            wx.showToast({
              title: '绑定手机号成功',
              icon: 'success',
              duration: 2000
            });
          })
          .catch(() => loginByCode().then(() => util.showErrorToast('失败，请重试')))
      } else {
        loginByCode().then(() => util.showErrorToast('失败，请重试'))
      }
    })
  }
})