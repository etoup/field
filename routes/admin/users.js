var users = require('../../app/controllers/admin/users')
var midware = require('../../app/controllers/admin/midware')

module.exports = function(app) {
  // 用户管理
  app.get('/admin/users', midware.signinRequired,users.index);
  
}