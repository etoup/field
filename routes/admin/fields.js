var fields = require('../../app/controllers/admin/fields')
var midware = require('../../app/controllers/admin/midware')

module.exports = function(app) {
  app.get('/admin/fields/items', midware.signinRequired,fields.items);
  app.get('/admin/fields/oc', midware.signinRequired,fields.oc);
  app.post('/admin/fields/dosave', midware.signinRequired,fields.dosave);
}