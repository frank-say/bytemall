/**
 * 用户相关服务
 */
const request = require('./request.js');
const api = require('../config/api.js');

// 调用微信登录
async function loginByCode() {
	let { code } = await getApp().wxp.login()
	let res = await request(api.AuthLoginByCode, { code }, 'POST')
	wx.setStorageSync('token', res.data.token)
	return res
}

// 判断用户是否登录
async function checkLogin() {
	let res = await getApp().wxp.checkSession()
	
	if(res.errMsg === "checkSession:ok") {
		return true
	} else {
		return false
	}
}

// 获取手机号
async function getPhone(e) {
	let data = {
		iv: e.detail.iv,
		encryptedData: e.detail.encryptedData
	}
	let res = await request(api.AuthBindPhone, data, 'PUT')
	return res.data.phone
}

module.exports = {
	loginByCode,
  getPhone,
	checkLogin
};
