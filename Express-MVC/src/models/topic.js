const mongoose = require('mongoose');

const topicSchema= new mongoose.Schema(
    {
        topic: { type: String, required:true}
    },
    {
        versionkey: false,
    }
)

module.exports=mongoose.model('topic',topicSchema);