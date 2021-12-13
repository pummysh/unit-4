const express = require('express');

const router =express.Router()

const Theater = require("../models/theater.model")

router.get("" , async (req, res) => {
    try{

        const theater = await Theater.find().lean().exec()
        res.send(theater)
    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})

router.post("",async (req, res) => {
    try{
const theater = await Theater.create(req.body)
return res.status(201).json(theater)

    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})


module.exports= router