var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var OrderSchema = new Schema({
  user: [{type: ObjectId, ref: 'User'}],
  field: [{type: ObjectId, ref: 'Field'}],
  money:Number,
  pay:{
    type:Number,
    default:0 //1-完成支付
  },
  status:{
    type:Number,
    default:0 //1-已使用 8-完成结算
  },
  begin:{
      type: Date,
      default: Date.now()
  },
  end:{
      type: Date,
      default: Date.now()
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

OrderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

OrderSchema.statics = {
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
  }
}

module.exports = OrderSchema