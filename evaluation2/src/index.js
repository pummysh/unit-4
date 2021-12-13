const express=require('express');

const app = express();

app.use(express.json());


const userController=require("./controllers/user-controller");
const movieController=require("./controllers/movie.controller");
const theaterController=require("./controllers/theater");
const screenController=require("./controllers/screen");

app.use("/user",userController);
app.use("/movies",movieController);
app.use("/theater",theaterController);
app.use("/screen",screenController);

module.exports=app;