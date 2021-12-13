const express = require('express');

const router =express.Router()

const Show = require("../models/shows.model")

router.get("" , async (req, res) => {
    try{

        const show = await Show.find().lean().exec()
        res.send(show)
    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})

router.post("",async (req, res) => {
    try{
const show = await Show.create(req.body)
return res.status(201).json(show)

    }catch(e){
        return res.status(500).json({message: e.message,status:"failed"})
    }
})


module.exports= router