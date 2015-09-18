var mongoose = require('mongoose')
var User = mongoose.model('User')

// index
exports.picture = function(req, res) {
  var path = req.path;
  return res.render('admin/setting/picture', {
    title: '系统设置-全局设置',
    subtitle:'设置控制',
    path:path
  })
}