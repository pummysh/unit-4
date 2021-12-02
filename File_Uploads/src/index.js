const express = require('express');

const userController = require("./controllers/user-controller");
const galleryController = require("./controllers/gallery-controllers");

const app = express();

app.use(express.json());

app.use("/",userController);
app.use("/gallery",galleryController);

module.exports=app;