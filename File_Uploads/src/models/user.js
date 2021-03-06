const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true},
        images: { type: String, required: true},
    },
    {
        versionKey: false,
        timestamp: true
    }
)

module.exports = model("user", userSchema);