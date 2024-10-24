const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name :{type:String, require:true},
    email :{type:String, require:true, unique:true},
    password:{type:String||Number, require:true},
    tasks:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    projects:[{type:mongoose.Schema.Types.ObjectId, ref:'Project'}]
},{ timestamps: true })

//hash before saving 
UserSchema.pre("save",async function(next){
    if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

module.exports = mongoose.model('User',UserSchema);