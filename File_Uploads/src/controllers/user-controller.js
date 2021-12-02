const express = require('express');
const fs = require('fs')
const router = express.Router();

const user = require("../models/user");
const upload =require("../middlewares/uploads");
router.post("/:type",upload.single("images"), async (req, res) => {
    try {
      let users=await user.create({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           profile_pic: req.file.path,
       });
       return res.status(201).json({users});

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.get("/user",async (req, res)=>{
    const users= await user.find().lean().exec();
    res.send(users);
})

router.patch("/:type/:id",upload.single("images"),async(req,res)=>{
    try{
        
        if(req.file.path){
            const d= await user.findById(req.params.id);
            const users= await user.findByIdAndUpdate(req.params.id,{$set:{profile_pic:req.file.path}});
            fs.unlinkSync(d.profile_pic);
        }
        if(req.body.first_name){
            const users= await user.findByIdAndUpdate(req.params.id,{$set:{first_name:req.body.first_name}});
        }
        if(req.body.last_name){
            const users= await user.findByIdAndUpdate(req.params.id,{$set:{last_name:req.body.last_name}});
        }
        res.send(await user.findById(req.params.id));
       
        
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/delete/:type/:id",upload.any("images"),async (req, res)=>{
    console.log(req.params.id);
    const d= await user.findById(req.params.id);
    fs.unlinkSync(d.profile_pic);
    console.log(d);
    const users =await user.findByIdAndDelete(req.params.id,{new:true});
    
    
    return res.send({users});
})

module.exports = router;