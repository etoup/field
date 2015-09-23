var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var FieldSchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  tel: {
    unique: true,
    type: String
  },
  status:{
    type:Number,
    default:0
  },
  from: {type: ObjectId, ref: 'User'},
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

FieldSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

FieldSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({sort:1})
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
}

module.exports = FieldSchema