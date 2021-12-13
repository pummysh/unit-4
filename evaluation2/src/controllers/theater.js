const express= require('express');
const Theater= require('../models/theatre');
const router = express.Router();

router.post('/', async(req, res)=>{
   try{
    const theater=await Theater.create(req.body);
    return res.send(theater)
   }catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
   }
})

module.exports=router;