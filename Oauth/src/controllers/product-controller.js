const express= require('express');
const product= require('../model/products');
const router = express.Router();
const authenticate=require("../middlewares/authenticate");
const authorise=require("../middlewares/authorise");

router.post("",authenticate,authorise(["admin"]),async(req, res)=>{
    try{
        const user=req.user;
        const products=await product.create({
            title: req.body.title,
            user:user.user._id
        })
        return res.status(201).send({products});
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
       }
})

router.patch("/:id",authenticate,authorise(["admin","seller"]),async (req, res)=>{
    try{
        const user = req.user;
    
        let products=await product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(201).json({products});
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/:id",authenticate,authorise(["admin","seller"]),async (req, res)=>{
    try{
        const products=await product.findByIdAndDelete(req.params.id,{new:true});
        res.status(201).json({products});
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.get("",async(res,req)=>{
    const products=await product.find().lean().exec();
    return res.json({products});
})

module.exports = router;