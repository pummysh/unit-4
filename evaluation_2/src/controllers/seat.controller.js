const express = require('express');

const router =express.Router()

const Seat = require("../models/seat.model")
router.get("" , async (req, res) => {
    try{

        const seat = await Seat.find().lean().exec()
        res.send(seat)
    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})

router.post("",async (req, res) => {
    try{
const seat = await Seat.create(req.body)
return res.status(201).json(seat)

    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})


module.exports= router