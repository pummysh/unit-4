const User = require("../model/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const router= express.Router();
const {body,validationResult} =require("express-validator");
require("dotenv").config();

const newToken=(user) => {
    return jwt.sign({user: user},process.env.JWT_ACCESS_KEY);
};

router.post("/register",
body("name").isLength({min:3, max:10}).withMessage("name is required and has to be at least 3 characters"),
body("email").isEmail().withMessage("email is required"),
body("password").isLength({min:8}).withMessage("Password length must be at least 8 characters")
,async(req,res)=>{
    // try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            let a=errors.array().map(({msg,param,location})=>{
                return {
                    [param]:msg
                }
        })
        return res.status(400).json({errors: a});
    }
        // console.log(body("password"));
        let user=await User.findOne({email:req.body.email}).lean().exec();

        if(user){
            return res.status(400).json({
                status:"Failed",
                message:"Please provide a different email address"
            })
        }

        user=await User.create(req.body);

        const token=newToken(user);
        return res.status(201).json({user,token})
    // }catch(e){
    //     return res.status(500).json({ message: e.message, status: "Failed" });
    // }
})

router.post("/login",
body("email").isEmail().withMessage("email is required"),
body("password").isLength({min:8})
,async(req,res)=>{

    // try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            let a=errors.array().map(({msg,param,location})=>{
                return {
                    [param]:msg
                }
            })
            return res.status(400).json({errors: a});
        }
        let user=await User.findOne({email:req.body.email});

        if(!user){
            return res.status(400).json({
                status:"Failed",
                message:"Please provide correct email address and password"
            })
        }

        const match = await user.checkPasswords(req.body.password);

        if(!match){
            return res.status(400).json({
                status:"Failed",
                message:"Please provide correct email address and password"
            })
        }

        const token = newToken(user)
        return res.status(201).json({user,token})
    // }catch(e){
    //     return res.status(500).json({ message: e.message, status: "Failed" });
    // }

})

module.exports=router;