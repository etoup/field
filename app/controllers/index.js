var mongoose = require('mongoose')


// index
exports.index = function(req, res) {
  var path = req.path;
  return res.render('admin/index', {
    title: '后台管理首页',
    subtitle:'管理控制',
    path:path
  })
}

