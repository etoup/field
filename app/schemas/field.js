var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var FieldSchema = new Schema({
  name: String,
  mobile: {
    unique: true,
    type: String
  },
  password: String,
  status:{
    type:Number,
    default:0
  },
  role: {
    type: Number,
    default: 50  //50-普通；80-高级
  },
  remark:{
    type:String,
    default:'没有说明内容'
  },
  lastLoginAt:  {
    type: Date,
    default: Date.now()
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
  var field = this;

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(field.password, salt, function(err, hash) {
      if (err) return next(err);

      field.password = hash;
      next();
    })
  })
})

FieldSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err);

      cb(null, isMatch);
    })
  }
}

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
  },
  findByMobile: function(mobile, cb) {
    return this
      .findOne({mobile: mobile})
      .exec(cb);
  },
  doLogin:function(id,cb){
    return this
      .update({_id:id},{lastLoginAt:Date.now()})
      .exec(cb)
  }
}

module.exports = FieldSchema