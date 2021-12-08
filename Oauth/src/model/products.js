const mongoose = require('mongoose');
// const user = require("./user");
const productSchema = mongoose.Schema(
    {
        title:{ type: String, required: true},
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        versionkey:false,
        timestamp: true
    }
);

module.exports= mongoose.model("product",productSchema);