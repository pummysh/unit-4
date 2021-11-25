const express=require('express');
const mongoose=require('mongoose');


const app = express();

app.use(express.json());

const connect=()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/test');
};

const userSchema = new mongoose.Schema({
    movie_name : { type :String, required : true},
    movie_genre : { type :String, required : true},
    production_year : { type :Number, required : true},
    budget : { type :Number, required : true},
})

const Movie=mongoose.model("movie",userSchema);

app.get('/movies',async(req, res)=>{
    try{
        const movie =await Movie.find({}).lean().exec();
        return res.send({movie});
    }catch(e){
        return res.status(200).json({message: e.message,status:"Failed"});
    };
})

app.post('/movies',async(req, res)=>{
    try{
        const movie= await Movie.create(req.body);
        return res.send({movie});
    }catch(e){
        return res.status(200).json({message: e.message,status:"Failed"});
    };
})

app.get('/movies/:id',async(req, res)=>{
    try{
        const movie= await Movie.findById(req.params.id).lean().exec();
        return res.send({movie});
    }catch(e){
        return res.status(200).json({message: e.message,status:"Failed"});
    };
})

app.patch('/movies/:id',async(req, res)=>{
    try{
        const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.send({movie});
    }catch(e){
        return res.status(201).json({message: e.message,status:"Failed"});
    };
    
})

app.delete('/movies/:id',async(req, res)=>{
    try{
        const movie=await Movie.findByIdAndDelete(req.params.id);
        return res.send({movie});
    }catch(e){
        return res.status(201).json({message: e.message,status:"Failed"});
    };
})

const start=async()=>{
    await connect();
    app.listen(2233,()=>{
        console.log('listening on port 2233')
    })
}

start();