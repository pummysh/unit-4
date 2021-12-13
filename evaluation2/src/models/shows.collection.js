const mongoose = require('mongoose');
const movie = require('./movie.model');
const screen=require('./screen');
const showSchema =new mongoose.Schema(
    {
        "timing":{type:String, required:true},
        "movie": {
            type:mongoose.Schema.Types.ObjectId,
            ref:"movie",
            required:true
        },
        "total_seats":{type:String, required:true},
        "screen" :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"screen",
            required:true
        }
    },
    {
        versionKey: false,
        timestamps:true
    }
)

module.exports =mongoose.model("show", showSchema);

