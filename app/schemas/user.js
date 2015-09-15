var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:  {
    type:String,
    unique: true
  },
  email: {
    type:String,
    unique: true
  },
  mobile:   {
    type:String,
    unique: true
  },
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
});

module.exports = UserSchema;