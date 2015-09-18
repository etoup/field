var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NavSchema = new Schema({
  title: String,
  url: String,
  types:Number,//10-前台导航；20-会员中心导航；30-场馆中心导航；40-后台导航
  target:{
    type:Boolean,
    default:false
  },
  icon:String,
  style:{
    type:Number,
    default:0
  },
  child:[],
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

NavSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

NavSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
}

module.exports = NavSchema