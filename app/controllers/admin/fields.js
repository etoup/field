var mongoose = require('mongoose')
var Program = mongoose.model('Program')

// items
exports.items = function(req, res) {
  Program.fetch(function(err,programs){
    if (err) {
      console.log(err)
    }
    var path = req.path;
    return res.render('admin/fields/items', {
      title: '运动项目分类',
      subtitle:'运动项目控制',
      path:path,
      items:programs
    })
  })
  
}
exports.oc = function(req, res) {
  Program.fetch(function(err,programs){
    if (err) {
      console.log(err)
    }
    return res.render('admin/fields/oc', {
      items: programs
    })
  })
}

exports.dosave = function(req, res) {
  req.check('program.title', '请填写设置标题').notEmpty()
  req.check('program.icon', '请填写设置图标').notEmpty()
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('items')
  }
  var _program = req.body.program
  program = new Program(_program)
  program.save(function(err,program){
    if (err) {
      console.log(err)
    }
    req.flash('errors', [{msg:'操作成功'}])
    return res.redirect('items')
  })
}
