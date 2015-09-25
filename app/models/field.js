var mongoose = require('mongoose');
var FieldSchema = require('../schemas/field');
var Field = mongoose.model('Field', FieldSchema);

module.exports = Field;