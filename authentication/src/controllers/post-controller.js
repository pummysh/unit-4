const express=require('express');
const post = require('../models/post-model');
const router = express.Router();
const authenticate = require("../middleware/authenticate")
router.post("/",async(req,res) => {
   try{
    let posts=await post.create(req.body);
    return res.status(201).send({posts});
   }catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
   }
});

router.get('/',authenticate,async(req, res)=>{
  try{

    let posts=await post.find().lean().exec();
    return res.send({posts});

  }catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
   }
})

module.exports=router;