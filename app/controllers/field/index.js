var mongoose = require('mongoose')
var Program = mongoose.model('Program')
var Field = mongoose.model('Field')

// index
exports.index = function(req, res) {
  Program.fetch(function(err,programs){
    if (err) {
      console.log(err)
    }
    var field = req.session.field
    Field.findById(field._id,function(err,field){
      console.log(field)
      var path = req.path;
      return res.render('field/index', {
        title: '场馆管理首页',
        subtitle:'管理控制',
        path:path,
        items:programs,
        field:field
      })
    })
  })
}


exports.addprogram = function(req, res) {
  req.check('program', '请选择运动项目').notEmpty()
  req.check('setting.business_hours_start', '请填写营业开始时间').notEmpty()
  req.check('setting.business_hours_start', '请填写数字').isInt()
  req.check('setting.business_hours_end', '请填写营业结束时间').notEmpty()
  req.check('setting.business_hours_end', '请填写数字').isInt()
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/field')
  }
  var field = req.session.field 
  Field.findById(field._id,function(err,field){
    var program = req.body.program
    var setting = req.body.setting
    field.program.push(program)
    field.setting.push(setting)
    field.save(function(err,field){
      if (err) {
        console.log(err)
      }
      req.session.field = field
      res.redirect('/field')
    })
  })
}
