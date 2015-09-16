var mongoose = require('mongoose')
var User = mongoose.model('User')

// index
exports.index = function(req, res) {
  console.log(req.session.user)
  var user = req.session.user
  if(user){
    var flash = req.flash() 
    res.render('admin/index', {
      title: '后台管理',
      user:user,
      flash:flash
    })
  }else{
    res.redirect('/admin/login')
  }
}

// regpage
exports.reg = function(req, res) {
  User.findOne({role:100},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      res.redirect('login')
    }

    res.render('admin/reg', {
      title: '后台初始化注册'
    })
  })
}

// reg
exports.doreg= function(req, res) {
  var _user = req.body.user
  _user.role = 100
  user = new User(_user)
  user.save(function(err,user){
    if (err) {
      console.log(err)
    }
    res.redirect('login')
  })
}

// loginpage
exports.login = function(req, res) {
  User.findOne({role:100},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      var username = req.cookies.username
      res.render('admin/login', {
        title: '后台登录',
        username:username
      })
    }
    res.render('admin/login', {
      title: '后台登录',
      passreg:true
    })
  })
}

// login
exports.dologin = function(req, res) {
  var email = req.body.email
  var password = req.body.password
  var rememberme = req.body.rememberme
 
  User.findOne({email:email},function(err,user){
    if (err) {
      console.log(err)
    }
    if(password){
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log(err)
        }
        if (isMatch) {
          req.session.user = user
          req.flash('msg', '登录成功')
          if(rememberme){
            res.cookie('username', email , { expires: new Date(Date.now() + 900000), httpOnly: true })
          }
          res.redirect('/admin')
        }else{
          req.flash('msg', '用户名或者密码错误')
          res.redirect('/admin/login')
        }
      })
    }
  })
}

// logout
exports.logout = function(req,res){
  delete req.session.user
  res.redirect('/admin/login')
}