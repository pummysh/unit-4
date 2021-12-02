const express=require('express');
const {body,validationResult}=require('express-validator');
const router = express.Router();
const user =require("../models/user-model");
router.post("/",
body("first_name").isLength({min:1, max:20}).withMessage("first_name is required and has to be at least 4 characters and maximum 20 charcters"),
body("last_name").isLength({min:1,max:20}).withMessage("last_name is required and has to be at least 4 characters and maximum 20 charcters"),
// body("email").isEmail().withMessage("email is required"),
body("email").custom(async(value)=>{
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    const list=["gmail.com","yahoo.com"];
    const a=email.split("@")
    if(!list.includes(a[1])){
        throw new Error("we do not accept email of this domain");
    }
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const productByEmail = await user.findOne({ email: value })
      .lean()
      .exec();
    if (productByEmail) {
      throw new Error("Please try with a different email address");
    }
    return true;
}),
body("pincode").isLength({min:6 , max:6}).custom(value=>{
    const isNumber=/^[0-9]*$/.test(value);
    if(!isNumber){
        throw new Error("Age cannot be below 0 and above 100")
    }
    return true;
}),
body("age").custom(value=>{
    const isNumber=/^[0-9]*$/.test(value);
    if(!isNumber || value<=0 || value>100){
        throw new Error("Age cannot be below 0 and above 100")
    }
    return true;
}),
body("gender").custom(value=>{
    console.log(value);
    const g=["Male", "Female","Others"];

    if(!g.includes(value)) {
        throw new Error("gender required and should be either Male, Female or Others");
    }
    return true;
})
,async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let a=errors.array().map(({msg,param,location})=>{
            return {
                [param]:msg,
            }
        })
        return res.status(400).json({errors: a});
    }
    const users= await user.create(req.body);

    return res.status(201).json({users});
})

module.exports = router;