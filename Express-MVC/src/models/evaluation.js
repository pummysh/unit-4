const mongoose = require('mongoose');

const evaluationSchema=new mongoose.Schema(
    {
        doe: { type: String, required:true},
        instructor: { type: String, required:true},
        topic:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"topic",
            required:true
        }
    }
)

module.exports=mongoose.model('evaluation',evaluationSchema);