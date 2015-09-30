var users = require('../../controllers/admin/users')
var midware = require('../../controllers/admin/midware')

module.exports = function(app) {
  // 用户管理
  app.get('/admin/users', midware.signinRequired,users.index);
  //新增用户
  app.post('/admin/users/doadd', midware.signinRequired,users.doadd);
  //启用禁用用户
  app.post('/admin/users/oc', midware.signinRequired,users.oc);
  //编辑用户页
  app.get('/admin/users/edit/:id', midware.signinRequired,users.edit);
  //编辑用户
  app.post('/admin/users/doedit', midware.signinRequired,users.doedit);
}