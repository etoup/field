var mongoose = require('mongoose');
var SetSchema = require('../schemas/set');
var Set = mongoose.model('Set', SetSchema);

module.exports = Set;