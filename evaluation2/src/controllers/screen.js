const express =require("express");
const Screen =require("../models/screen");


const router =express.Router();

router.post("/",async(req,res)=>{
try{
   const screen = await Screen.create(req.body)
   
    return res.status(201).json({screen})
}catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }

});

router.get("/", async (req, res) => {
    const screens = await Screen.find().populate("theatre_id").lean().exec();
  
    return res.send(screens);
  });
  
  module.exports = router;