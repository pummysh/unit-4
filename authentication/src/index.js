const express = require('express');

const app = express();

app.use(express.json());

const userController= require("./controllers/user-controller");
const postController=require("./controllers/post-controller")
// app.post('/register',register);
// app.post('/login',login);

app.use("/",userController);
app.use("/posts",postController);
module.exports =app;