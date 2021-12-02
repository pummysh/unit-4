const express = require('express');
const fs= require('fs');
const router = express.Router();

const gallery=require("../models/gallery");
const upload =require("../middlewares/uploads");

router.post("/:type",upload.any("images"),async(req,res)=>{
    const filePaths =req.files.map(file=>file.path)
    try{
        galleries=await gallery.create({

        pictures:filePaths,
        user_id:req.body.user_id,

        })
        return res.status(201).json({galleries})
    }catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/delete-gallery/:type/:id",upload.any("images"),async (req, res)=>{
   
    const d= await gallery.findById(req.params.id);
    let dlt=d.pictures;
    console.log(dlt);
    
    dlt.forEach((a)=>{
        fs.unlinkSync(a);
    })

    const g =await gallery.findByIdAndDelete(req.params.id,{new:true});
    
    
    return res.send({g});
})

module.exports =router;