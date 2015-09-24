var mongoose = require('mongoose')
var Set = mongoose.model('Set')
var _ = require('underscore')

// index
exports.picture = function(req, res) {
  Set.findByTp(1,function(err,sets){
    if (err) {
      console.log(err)
    }

    var path = req.path;
    return res.render('admin/setting/picture', {
      title: '系统设置-全局设置',
      subtitle:'设置控制',
      path:path,
      sets:sets
    })
  })
  
}
//post picture
exports.dopicture = function(req, res) {
  
  req.check('set.title', '请填写设置标题').notEmpty()
  req.check('set.vals', '请填写设置值').notEmpty()
  var errors = req.validationErrors()
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('picture')
  }
  var _set = req.body.set
  _set.types = 1
  set = new Set(_set)
  set.save(function(err,set){
    if (err) {
      console.log(err)
    }
    req.flash('errors', [{msg:'操作成功'}])
    return res.redirect('picture')
  })
}
//edit
exports.edit = function(req, res) {
  var id = req.params.id
  if (id) {
    Set.findById(id, function(err, set) {
     return res.render('admin/setting/edit', {
       set:set
     })
    })
  }
}
//doedit
exports.doedit = function(req, res) {
  var id = req.body.set._id
  var setObj = req.body.set
  var _set

  if (id) {
    Set.findById(id, function(err, set) {
      if (err) {
        console.log(err)
      }
      console.log(setObj)
      _set = _.extend(set, setObj)
      _set.save(function(err, set) {
        if (err) {
          console.log(err)
        }
        req.flash('errors', [{msg:'操作成功'}])
        return  res.redirect('picture' )
      })
    })
  }
}
exports.oc = function(req, res) {
  var id = req.body._id
  var status = req.body._status
  var _obj
  if(id){
    Set.findById(id, function(err, program) {
      if (err) {
        console.log(err)
      }
      _obj = _.extend(program,{status:status})
      console.log(_obj)
      _obj.save(function(err, program) {
        if (err) {
          console.log(err)
        }
        return  res.json({ msg: 'true' ,backurl:'picture'})
      })
    })
  }
}