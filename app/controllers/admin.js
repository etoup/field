var mongoose = require('mongoose')
var User = mongoose.model('User')
var Nav = mongoose.model('Nav')

// index
exports.index = function(req, res) {
  if(user){
    return res.render('admin/index', {
      title: '后台管理'
    })
  }else{
    return res.redirect('/admin/login')
  }
}

// regpage
exports.reg = function(req, res) {
  User.findOne({role:100},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      return res.redirect('login')
    }

    return res.render('admin/reg', {
      title: '后台初始化注册'
    })
  })
}

// reg
exports.doreg= function(req, res) {
  var _user = req.body.user
  req.check('user.email', '请填写邮箱地址').notEmpty()
  req.check('user.email', '请正确填写邮箱地址').isEmail()
  req.check('user.password', '密码长度6-20字符').len(6, 20)
  req.check('user.repassword', '重复密码长度6-20字符').len(6, 20)
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/admin/reg')
  }
  if(_user.password != _user.repassword){
    req.flash('errors', [{msg:'两次密码不一致'}])
    return res.redirect('/admin/reg')
  }
  _user.role = 100
  _user.ip = req.ip
  _user.lastLoginAt = Date.now()
  user = new User(_user)
  user.save(function(err,user){
    if (err) {
      console.log(err)
    }
    req.flash('username', user.email)
    return res.redirect('login')
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
      return res.render('admin/login', {
        title: '后台登录',
        username:username
      })
    }
    return res.render('admin/login', {
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
 
  req.check('email', '请填写邮箱地址').notEmpty()
  req.check('email', '请正确填写邮箱地址').isEmail()
  req.check('password', '密码长度6-20字符').len(6, 20)
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/admin/reg')
  }

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
          return res.redirect('/admin')
        }else{
          req.flash('msg', '密码错误')
          return res.redirect('/admin/login')
        }
      })
    }
  })
}

// logout
exports.logout = function(req,res){
  delete req.session.user
  return res.redirect('/admin/login')
}

// midware for user
exports.doNav = function(req, res, next) {
  var _navs = [
    {
        title: '后台首页',
        url: '/admin',
        types:40
    },
    {
        title: '系统设置',
        url: '/setting',
        types:40,
        child:[
          {
            title: '全局设置',
            url: '/setting/picture',
            target:false
          },
          {
            title: '积分设置',
            url: '/setting/integral',
            target:false
          },
          {
            title: '签到设置',
            url: '/setting/sign',
            target:false
          },
          {
            title: '邀请码设置',
            url: '/setting/invite',
            target:false
          },
          {
            title: '优惠码设置',
            url: '/setting/discount',
            target:false
          }
        ]
    },
    {
        title: '用户管理',
        url: '/users',
        types:40
    },
    {
        title: '场馆管理',
        url: '/fields',
        types:40
    },
    {
        title: '订单管理',
        url: '/orders',
        types:40
    },
    {
        title: '规则管理',
        url: '/rules',
        types:40
    },
    {
        title: '结算管理',
        url: '/balance',
        types:40
    }
  ]

  if (!_navs) {
    return res.redirect('/admin/login')
  }
  for (var i=0;i < _navs.length ;i++) {
    navs = new Nav(_navs[i])
    navs.save(function(err,navs){
      if (err) {
        console.log(err)
      }
    })
  };
  
  req.session.navs = _navs

  next()
}
