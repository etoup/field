var index = require('../../app/controllers/admin/index')
var midware = require('../../app/controllers/admin/midware')

module.exports = function(app) {
  //预处理
  app.use(function(req, res, next) {
    var _user = req.session.user
    app.locals.user = _user
    next()
  })
  // 后台首页
  app.get('/admin', midware.signinRequired,index.index);
  
}