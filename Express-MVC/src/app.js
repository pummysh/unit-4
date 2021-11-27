const express= require('express');
const connect = require('./configs/db.js');
const app = express();

app.use(express.json());

const studentsController = require('./controllers/student')

app.use('/student', studentsController)

app.listen(2333,async function (){
    await connect();
    console.log("listening on port 2333");
})