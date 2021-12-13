const {Schema,model} = require('mongoose');

const moviesSchema = new Schema({
    name:{type:String, required:true},
    actor:{type:String, required:true,unique:true},
    languages:{type:String, required:true},
    director:{type:String, required:false},
    poster_url:[{type:String, required:true}]
},
{
    versionKey:false,
    timestamps:true
});

module.exports = model('movie',moviesSchema);