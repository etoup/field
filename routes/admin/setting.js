var setting = require('../../app/controllers/setting')
var midware = require('../../app/controllers/midware')

module.exports = function(app) {

  // 系统设置-全局设置
  app.get('/admin/setting/picture', midware.signinRequired,setting.picture);
  
}