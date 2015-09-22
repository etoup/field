var uc = require('../../app/controllers/admin/uc')

module.exports = function(app) {
  // 后台登录
  app.route('/admin/uc/login').get(uc.login).post(uc.dologin);
  // 后台初始化注册
  app.route('/admin/uc/reg').get(uc.reg).post(uc.doNav,uc.doreg);
  // 后台登出
  app.get('/admin/uc/logout', uc.logout);
}