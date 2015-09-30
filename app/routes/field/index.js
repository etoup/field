var index = require('../../controllers/field/index')
var midware = require('../../controllers/field/midware')

module.exports = function(app) {
  //预处理
  app.use(function(req, res, next) {
    var _field = req.session.field
    app.locals.field = _field
    next()
  })
  // 后台首页
  app.get('/field', midware.signinRequired,index.index);
  
}