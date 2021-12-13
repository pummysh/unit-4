const express= require('express');
const router = express.Router();
const Movie=require('../models/movie.model');

router.post("",async(req, res)=>{
    try{
     
        const movie=await Movie.create(req.body);
     
        return res.send(movie);
    }catch(e){
        return res.status(400).json({status:"Failed",message:e.message});
    }

})

module.exports=router;