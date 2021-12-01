const {Schema,model}=require("mongoose");

const adminSchema=new Schema(
    {
        first_name:{type: String, required: true},
        last_name:{type: String, required: true},
        email:{type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports=model("admin",adminSchema);