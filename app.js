const express=require('express');

const app = express();

const user=require("./db");

app.get('/',(req, res) => {
    res.send("welcome to Home page");
})

app.get('/users',(req, res) => {
    console.log(user);
    res.send(user);
})


app.listen(2500,()=>{
    console.log("listening on port 3000");
})