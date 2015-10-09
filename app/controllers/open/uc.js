var mongoose = require('mongoose')
var User = mongoose.model('User')

// login
exports.login = function(req, res) {
  var mobile = req.body.mobile
  var password = req.body.password

  User.findOne({mobile:mobile},function(err,user){
    if (err) {
      console.log(err)
    }
    if(!user){
      return res.json({ status:false,info:{msg:'无效用户'}})
    }
    if(password){
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log(err)
        }
        if (isMatch) {
          User.doLogin(user.id,function(err,user){
            if (err) {
              console.log(err)
            }
          })
          return res.json({ status:true,info:{keys:user._id,mobile:user.mobile}})
        }else{
          return res.json({ status:false,info:{msg:'密码错误'}})
        }
      })
    }
  })
}




