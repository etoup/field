var fields = require('../../app/controllers/admin/fields')
var midware = require('../../app/controllers/admin/midware')

module.exports = function(app) {
  app.get('/admin/fields/items', midware.signinRequired,fields.items);
  app.post('/admin/fields/dosave', midware.signinRequired,fields.dosave);
  app.get('/admin/fields/edit/:id', midware.signinRequired,fields.edit);
  app.post('/admin/fields/doedit', midware.signinRequired,fields.doedit);
  app.post('/admin/fields/oc', midware.signinRequired,fields.oc);
  app.get('/admin/fields/index', midware.signinRequired,fields.index);
}