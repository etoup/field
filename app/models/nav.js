var mongoose = require('mongoose');
var NavSchema = require('../schemas/nav');
var Nav = mongoose.model('Nav', NavSchema);

module.exports = Nav;