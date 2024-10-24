const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name:{type:String, require:true},
    tasks:[{type:mongoose.Schema.Types.ObjectId, ref:'Task'}],

},{timestamps:true});

module.exports = mongoose.model('Project', ProjectSchema);