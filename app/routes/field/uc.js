var uc = require('../../controllers/field/uc')

module.exports = function(app) {
  // 后台登录
  app.route('/field/uc/login').get(uc.login).post(uc.dologin);
  // 后台登出
  app.get('/field/uc/logout', uc.logout);
}