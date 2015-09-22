var mongoose = require('mongoose')
var User = mongoose.model('User')

exports.index = function(req, res) {
  User.fetch(function(err,users){
    console.log(users)
    if (err) {
      console.log(err)
    }

    var path = req.path;
    return res.render('admin/users/index', {
      title: '用户管理',
      subtitle:'用户控制',
      path:path,
      users:users
    })
  })
  
}