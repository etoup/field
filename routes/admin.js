var admin = require('../app/controllers/admin')
module.exports = function(app) {
  //预处理
  app.use(function(req, res, next) {
    var _user = req.session.user
    app.locals.user = _user
    var _navs = req.session.navs
    app.locals.navs = _navs
    next()
  })
  // 后台首页
  app.get('/admin', admin.index);
  // 后台初始化注册
  app.route('/admin/reg').get(admin.reg).post(admin.doNav,admin.doreg);
  // 后台登录
  app.route('/admin/login').get(admin.login).post(admin.dologin);
  // 后台登出
  app.get('/admin/logout', admin.logout);
}