var admin = require('../app/controllers/admin')
module.exports = function(app) {
  //预处理
  app.use(function(req, res, next) {
    next()
  })
  // 后台首页
  app.get('/admin', admin.index);
  // 后台初始化注册
  app.route('/admin/reg').get(admin.reg).post(admin.doreg);
  // 后台登录
  app.route('/admin/login').get(admin.login).post(admin.dologin);
  // 后台登出
  app.get('/admin/logout', admin.logout);
}