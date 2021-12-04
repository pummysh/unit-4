const app=require('./index');

const connect= require('./configs/db');

app.listen(2357,async(req,res)=>{
    await connect();
    console.log('listening on port 2357');
})