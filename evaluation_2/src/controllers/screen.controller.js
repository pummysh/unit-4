const express = require('express');

const router =express.Router()

const Screen = require("../models/screen.model")

router.get("" , async (req, res) => {
    try{

        const screen = await Screen.find().lean().exec()
        res.send(screen)
    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})

router.post("",async (req, res) => {
    try{
const screen = await Screen.create(req.body)
return res.status(201).json(screen)

    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})


module.exports= router