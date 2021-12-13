const mongoose = require('mongoose');
const bcrypt= require("bcryptjs");
const userSchema =new mongoose.Schema(
    {
        "name":{type:String, required:true},
        "email":{type:String, required:true},
        "password":{type:String, required:true},
        "profile_photo_url":{type:String, required:true},
        "roles":{type:String, required:true},
    },
    {
        versionKey: false,
        timestamps:true
    }
)
userSchema.pre("save",function(next) {
    if(!this.isModified("password"))return next();

    
        bcrypt.hash(this.password, 8, (err, hash)=> {
            // Store hash in your password DB.
            this.password=hash;
            return next();
        });
    
})

userSchema.methods.checkPasswords = function(password){
   return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password,function(err,same) {
            if(err) return reject(err);

            return resolve(same);
        })
   })
}
module.exports =mongoose.model("user", userSchema);

