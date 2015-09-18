var index = require('../../app/controllers/index')
var midware = require('../../app/controllers/midware')

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
  app.get('/admin', midware.signinRequired,index.index);
  
}