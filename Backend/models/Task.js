const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name:{type:String, require:true},
    description:{type:String, require:true},
    date: { type: Date, default: Date.now },
    isToday: { type: Boolean, default: false },

},{ timestamps: true });

module.exports = mongoose.model('Task',TaskSchema);