var mongoose = require('mongoose')
var User = mongoose.model('User')
var _ = require('underscore')

exports.index = function(req, res) {
  User.fetch(function(err,users){
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

exports.doadd = function(req, res) {
  req.check('user.email', '请填写邮箱地址').notEmpty()
  req.check('user.email', '请正确填写邮箱地址').isEmail()
  req.check('user.mobile', '请填写手机号码').notEmpty()
  req.check('user.password', '密码长度6-20字符').len(6, 20)
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/admin/users')
  }
  var _user = req.body.user
  _user.role = 1
  _user.ip = req.ip
  _user.lastLoginAt = Date.now()
  user = new User(_user)
  user.save(function(err,user){
    if (err) {
      console.log(err)
    }
    return res.redirect('/admin/users')
  })
}

exports.edit = function(req, res) {
  var id = req.params.id
  if (id) {
    User.findById(id, function(err, user) {
     return res.render('admin/users/edit', {
       user:user
     })
    })
  }
}

exports.doedit = function(req, res) {
  req.check('user.email', '请填写邮箱地址').notEmpty()
  req.check('user.email', '请正确填写邮箱地址').isEmail()
  req.check('user.mobile', '请填写手机号码').notEmpty()
  req.check('user.password', '密码长度6-20字符').len(6, 20)
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/admin/users')
  }
  var id = req.body.user._id
  var userObj = req.body.user
  var _user

  if (id) {
    User.findById(id, function(err, user) {
      if (err) {
        console.log(err)
      }
      console.log(userObj)
      _user = _.extend(user, userObj)
      _user.save(function(err, user) {
        if (err) {
          console.log(err)
        }
        req.flash('errors', [{msg:'操作成功'}])
        return  res.redirect('/admin/users' )
      })
    })
  }
}

exports.oc = function(req, res) {
  var id = req.body._id
  var status = req.body._status
  var _obj
  if(id){
    User.findById(id, function(err, program) {
      if (err) {
        console.log(err)
      }
      _obj = _.extend(program,{status:status})
      console.log(_obj)
      _obj.save(function(err, program) {
        if (err) {
          console.log(err)
        }
        return  res.json({ msg: 'true' ,backurl:'/admin/users'})
      })
    })
  }
}