var admin = require('../app/controllers/admin')
module.exports = function(app) {
  //预处理
  app.use(function(req, res, next) {
    next()
  })
  // 后台首页
  app.get('/admin', admin.index);
  // 后台登录
  app.get('/admin/login', function(req, res, next) {
    res.render('admin/login', { title: '后台登录' });
  });
  // 后台注册
  app.get('/admin/reg', function(req, res, next) {
    res.render('admin/reg', { title: '后台初始化注册' });
  });
}