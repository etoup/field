var mongoose = require('mongoose')
var Field = mongoose.model('Field')

// loginpage
exports.login = function(req, res) {
  var fieldname = req.cookies.fieldname
  return res.render('field/uc/login', {
    title: '场馆登录',
    fieldname:fieldname
  })
}

// login
exports.dologin = function(req, res) {
  var mobile = req.body.mobile
  var password = req.body.password
  var rememberme = req.body.rememberme

  Field.findOne({mobile:mobile},function(err,field){
    if (err) {
      console.log(err)
    }
    if(!field){
      req.flash('errors', [{msg:'无效用户'}])
      return res.redirect('login')
    }
    if(password){
      field.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log(err)
        }
        if (isMatch) {
          req.session.field = field
          req.flash('errors', [{msg:'登录成功'}])
          if(rememberme){
            res.cookie('fieldname', mobile , { expires: new Date(Date.now() + 900000), httpOnly: true })
          }
          Field.doLogin(field.id,function(err,field){
            if (err) {
              console.log(err)
            }
            return res.redirect('/field')
          })
        }else{
          req.flash('errors', [{msg:'密码错误'}])
          return res.redirect('login')
        }
      })
    }
  })
}



// logout
exports.logout = function(req,res){
  delete req.session.field
  return res.redirect('login')
}



