var index = require('../../controllers/admin/index')
var midware = require('../../controllers/admin/midware')

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