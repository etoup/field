var mongoose = require('mongoose')
var User = mongoose.model('User')

// index
exports.index = function(req, res) {
  console.log(req.session.user)
  var user = req.session.user
  if(user){
    res.render('admin/index', {
      title: '后台管理',
      user:user
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
      res.render('admin/login', {
        title: '后台登录'
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
  var _user = req.body.user
  var email = _user.email
  var password = _user.password
  User.findOne({email:email},function(err,user){
    if (err) {
      console.log(err)
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }
      if (isMatch) {
        req.session.user = user
        req.flash('successMessage', 'You are successfully using req-flash')
        res.redirect('/admin')
      }
    })
  })
}

// logout
exports.logout = function(req,res){
  delete req.session.user
  res.redirect('/admin/login')
}