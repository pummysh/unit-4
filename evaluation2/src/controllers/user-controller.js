const express=require('express');
const User=require("../models/user.model");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const newToken=(user) => {
    return jwt.sign({user: user},process.env.JWT_ACCESS_KEY);
};
require("dotenv").config();

const router= express.Router();

router.post("/register",async(req,res) => {
    try{

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

    }catch(e){
        return res.status(400).json({status:"Failed",message:e.message});
    }
})

router.post("/login",async(req,res)=>{

    try{
        
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
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

})

module.exports = router;
