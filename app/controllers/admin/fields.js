var mongoose = require('mongoose')


// items
exports.items = function(req, res) {
  var path = req.path;
  return res.render('admin/fields/items', {
    title: '运动项目分类',
    subtitle:'运动项目控制',
    path:path
  })
}

