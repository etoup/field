var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SetSchema = new Schema({
  title: String,
  vals: String,
  types:Number,//1-全局设置
  tag: {
    unique: true,
    type: String
  },
  status:{
    type:Number,
    default:1
  },
  remark:{
    type:String,
    default:'没有说明内容'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

SetSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

SetSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.createAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  },
  findByTp:function(tp,cb){
    return this
      .find({types:tp})
      .exec(cb)
  }
}

module.exports = SetSchema