var mongoose = require('mongoose')
var Program = mongoose.model('Program')
var User = mongoose.model('User')
var _ = require('underscore')

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

exports.edit = function(req, res) {
  var id = req.params.id
  if(id){
    Program.findById(id,function(err,program){
      if (err) {
        console.log(err)
      }
      return res.render('admin/fields/edit', {
        program: program
      })
    })
  }
}

exports.doedit = function(req, res) {
  var id = req.body.program._id
  var obj= req.body.program
  var _obj
  if (id) {
    Program.findById(id, function(err, program) {
      if (err) {
        console.log(err)
      }
      _obj = _.extend(program, obj)
      _obj.save(function(err, program) {
        if (err) {
          console.log(err)
        }
        req.flash('errors', [{msg:'操作成功'}])
        return  res.redirect('items' )
      })
    })
  }
}

exports.oc = function(req, res) {
  var id = req.body._id
  var status = req.body._status
  var _obj
  if(id){
    Program.findById(id, function(err, program) {
      if (err) {
        console.log(err)
      }
      _obj = _.extend(program,{status:status})
      console.log(_obj)
      _obj.save(function(err, program) {
        if (err) {
          console.log(err)
        }
        return  res.json({ msg: 'true' })
      })
    })
  }
}

exports.index = function(req, res) {
  User.fetch(function(err,users){
    console.log(users)
    if (err) {
      console.log(err)
    }

    var path = req.path;
    return res.render('admin/fields/index', {
      title: '场馆管理',
      subtitle:'场馆控制',
      path:path,
      users:users
    })
  })
  
}
