var fields = require('../../app/controllers/admin/fields')
var midware = require('../../app/controllers/admin/midware')

module.exports = function(app) {
  // 后台首页
  app.get('/admin/fields/items', midware.signinRequired,fields.items);
  
}