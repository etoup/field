var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var GroundSchema = new Schema({
  field: {type: ObjectId, ref: 'Field'},
  program: {type: ObjectId, ref: 'Program'},
  name:String,//场地名称
  business_hours:{
    business_hours_start:String,
    business_hours_end:String
  },//营业时间
  duration:Number,//运动时长
  price:Number,//统一金额
  hidden: Boolean,
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

GroundSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

GroundSchema.statics = {
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

module.exports = GroundSchema