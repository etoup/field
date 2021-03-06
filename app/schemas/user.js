var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
  name: String,
  email: String,
  mobile: {
    unique: true,
    type: String
  },
  password: String,
  ip: String,
  lastLoginAt:  {
      type: Date,
      default: Date.now()
    },
  status:{
    type:Number,
    default:1
  },
  // 0: nomal user
  // 1: verified user
  // 2: professonal user
  // 100: super admin
  role: {
    type: Number,
    default: 0
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

UserSchema.pre('save', function(next) {
  var user = this;

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  })
})

UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err);

      cb(null, isMatch);
    })
  }
}

UserSchema.statics = {
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
  findByMobile: function(mobile, cb) {
    return this
      .findOne({mobile: mobile})
      .exec(cb);
  },
  findByRole: function(role, cb) {
    return this
      .find({role: role})
      .sort('meta.createAt')
      .exec(cb);
  },
  findByFields: function(cb) {
    return this
      .find({role: 50})
      .populate('field','name') 
      .sort('meta.createAt')
      .exec(cb);
  },
  doLogin:function(id,cb){
    return this
      .update({_id:id},{lastLoginAt:Date.now()})
      .exec(cb)
  }
}

module.exports = UserSchema