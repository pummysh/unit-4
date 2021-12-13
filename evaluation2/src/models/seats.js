const mongoose = require('mongoose');
const show = require('./shows.collection');

const seatSchema =new mongoose.Schema(
    {
       
        "show": {
            type:mongoose.Schema.Types.ObjectId,
            ref:"show",
            required:true
        }
    },
    {
        versionKey: false,
        timestamps:true
    }
)

module.exports =mongoose.model("seat", seatSchema);

