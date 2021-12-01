const express = require('express');

const router = express.Router();

const sendMail = require('../utils/sendMail')

const admin=require("../models/admin");

const user=require("../models/user")

router.post("/register",async(req,res) => {
    try{
        const users=await user.create(req.body);
        
        const admins = await admin.find().lean().exec();

        for(let i=0;i<admins.length;i++){
            sendMail("pummy@gmail.com",`${admins[i].email}`,`${req.body.first_name} ${req.body.last_name} has registered with us`, `Please Welcome ${req.body.first_name} ${req.body.last_name}`,`<h1>Please Welcome ${req.body.first_name} ${req.body.last_name} <h1>`);
        }

       sendMail("pummy@gmail.com",`${req.body.email}`,`Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`, `Hi ${req.body.first_name} ${req.body.last_name}, Please confirm your email address `,`<h1>Hi ${req.body.first_name} ${req.body.last_name}, Please confirm your email address <h1>`);
        return res.status(201).json({users});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})

router.get("/", async (req, res) => {
    try {
        const page=+req.query.page || 1;
        const size=+req.query.size || 2;
        
        
        const skip=(page-1)*size;

        const users = await user.find().lean().skip(skip).limit(size).exec();

        const totalPages =Math.ceil((await user.find().countDocuments())/size)

        return res.json({users,totalPages} );

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

module.exports=router;