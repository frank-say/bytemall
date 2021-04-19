function updateManager() {
  const updateManager = wx.getUpdateManager();
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
}

function showErrorToast (msg) {
  wx.showToast({
    title: msg,
    image: '/static/imgs/icon_error.png'
  })
}

module.exports = {
  updateManager,
  showErrorToast
}
