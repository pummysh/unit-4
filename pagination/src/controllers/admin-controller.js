const express=require('express');

const router = express.Router();

const admin=require("../models/admin");

router.post("",async(req, res)=>{
    try{
        const admins= await admin.create(req.body);
        return res.send(admins);
        
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.get("",async(req, res)=>{
    try{
        const admins= await admin.find().lean().exec();
        return res.send(admins);
    }catch(e){
        return res.status(500).json({ message: e.message, status:"Failed"})
    }
})

module.exports=router;