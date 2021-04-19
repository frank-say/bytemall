const { loginByCode } = require('./user')

function request(url, data = {}, method = "GET") {
  return new Promise(async (resolve, reject) => {
    let options = {
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Bytemall-Token': wx.getStorageSync('token')
      }
    }
    let res = await getApp().wxp.request(options)

    if (res.statusCode == 200) {
      if (res.data.errCode == 0) {
        resolve(res.data)
      } else {
        if(res.data.errCode == 501) {
          wx.removeStorageSync('token');
          loginByCode().then(() => wx.showToast({ title: '网络出小差了，请重试', icon: 'none' }))
        } else {
          reject(res.data)
        }
      }
    } else {
      reject(res.errMsg);
    }
    
  });
}

module.exports = request