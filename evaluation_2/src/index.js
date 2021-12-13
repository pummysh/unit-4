const express = require('express');

const app = express();
app.use(express.json())

const userController = require('./controllers/user.controller')
const moviesController = require('./controllers/movies.controller')
const TheaterController = require('./controllers/theater.controller')
const screenController = require('./controllers/screen.controller')
const seatController = require('./controllers/seat.controller')
const showController = require('./controllers/shows.controller')
app.use("/users", userController)
app.use("/movies", moviesController)
app.use("/theater", TheaterController)
app.use("/screen", screenController)
app.use("/seats",seatController)
app.use("/show", showController)

module.exports =app