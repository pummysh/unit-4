const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    profile_photo_url:{type:String, required:false},
    roles:{type:String, required:true}
},
{
    versionKey:false,
    timestamps:true
});

module.exports = model('user',userSchema);