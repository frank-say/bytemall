// 以下是业务服务器API地址
var WxApiRoot = 'https://bytemall-api.0-1-byte.com/';

// 局域网测试使用
// var WxApiRoot = 'http://10.20.14.115:8080/';

module.exports = {
  AuthLoginByCode: WxApiRoot + 'api/user/login', //登录
  AuthBindPhone: WxApiRoot + 'api/user/updateMobile', //绑定微信手机号
};