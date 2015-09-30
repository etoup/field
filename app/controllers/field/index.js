var mongoose = require('mongoose')


// index
exports.index = function(req, res) {
  var path = req.path;
  return res.render('field/index', {
    title: '场馆管理首页',
    subtitle:'管理控制',
    path:path
  })
}

