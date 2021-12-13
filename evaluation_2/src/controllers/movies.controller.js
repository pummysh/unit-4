const express = require('express');
const router =express.Router()
const Movies = require("../models/movies.model")

router.get("" , async (req, res) => {
    const movies = await Movies.find().lean().exec()
    res.send(movies)
})
router.post("", async (req, res) => {
    try{
     
        const movie=await Movies.create(req.body);
     
        return res.send(movie);
    }catch(e){
        return res.status(400).json({status:"Failed",message:e.message});
    }
})


module.exports= router