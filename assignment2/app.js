const express= require('express');

const app = express();

const data = require('./db')

app.use(express.json());

const logger =(req, res,next) => {
    
    req.name={ api_requested_by: "Dhaval Chheda"} ;
    next();
}

app.use(logger);

app.get('/',(req, res) => {
    let a=req.name;
    res.send({a,data});
    // res.send(data.data);
})

app.post('/books',(req, res) => {
    const newdata=[...data.data,req.body];
    let a=req.name;
    res.send({a,newdata});
})

app.get('/books/:id',(req, res) => {
    console.log(req.params.id);
    let a=req.name;
    const id = data.data.filter((a)=>a.id===req.params.id);
    res.send({a,id});
})

app.patch('/books/:id',(req, res) => {
    // console.log(req.params.id);
    let a=req.name;
    const updateData=data.data.map((a)=>{
        if(req.params.id===a.id){
            if(req?.body?.author)a.author=req.body.author;
            if(req?.body?.year)a.year=req.body.year;
            console.log(a);
        }
        return a;
    })
    res.send({a,updateData});
})

app.delete('/books/:id',(req, res)=>{
    const dlt = data.data.filter((a)=>a.id!==req.params.id);
    res.send(dlt);
})

app.listen(3500,function(){
    console.log('listening on port 3500');
});

