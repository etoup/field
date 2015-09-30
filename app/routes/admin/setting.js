var setting = require('../../controllers/admin/setting')
var midware = require('../../controllers/admin/midware')

module.exports = function(app) {

  // 系统设置-全局设置
  app.get('/admin/setting/picture', midware.signinRequired,setting.picture);
  app.post('/admin/setting/dopicture', midware.signinRequired,setting.dopicture);
  app.get('/admin/setting/edit/:id', midware.signinRequired,setting.edit);
  app.post('/admin/setting/doedit', midware.signinRequired,setting.doedit);
  app.post('/admin/setting/oc', midware.signinRequired,setting.oc);
}