var mongoose = require('mongoose');
var ProgramSchema = require('../schemas/program');
var Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;