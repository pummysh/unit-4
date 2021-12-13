const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const express = require('express');

const router = express.Router();

const newToken = (user)=>{
    return jwt.sign({user:user},process.env.JWT_ACCESS_KEY);
}

router.post('/register',async(req,res)=>{
    let user = await User.findOne({
        email:req.body.email
    }).lean().exec();

    if(user){
        return res.status(400).json({
            message:"Please provide different email",
            status:"Failed"
        });
    }

    user = awaitUser.create(req.body);

    const token = newToken(user);
    

    return res.status(201).json({user,token})

});

router.post('login', async(req,res)=>{

    let user = await User.findOne({
        email:req.body.email
    }).lean().exec();

    if(!user){
        return res.status(400).json({
            message:"Please provide different email and password",
            status:"Failed"
        });
    }

    const match = await user.checkPassword(req.body.password);

    if(!match){
        return res.status(400).json({
            status:"Failed",
            message:"Please provide different email and password"
        })
    }

    const token = newToken(user);

    return res.status(201).json({user,token})

});

module.exports = router;