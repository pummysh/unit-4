const express= require('express');

const userController = require('./controllers/user-controller');

const adminController = require('./controllers/admin-controller');

const app = express();

app.use(express.json());

app.use("/users",userController);
app.use("/admin",adminController);

module.exports=app;