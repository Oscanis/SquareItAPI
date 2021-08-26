// -- Package comments:
// nodemon: for live update test server at localhost
// express: for API
// mongoose: for MongoDB connection
// dotenv: for DB URI encryption, using the .env file
// cors: for cross domain requests, if needed

//Module & route imports
const express = require('express'); //import Express
const mongoose = require('mongoose'); //import Mongoose
const cors = require('cors'); //import Cors
require('dotenv/config'); //import Dotenv package, no need for assign a variable

//Variable setup
const PORT = process.env.PORT || 5000; //setting up port, Heroku needs the $PORT from .env
const app = express(); //start Express on top of the app to have routes

//Middlewares
app.use(cors()); //adding cors, make sure it's above the routes/middlewares
app.use(express.json({ limit: "5mb", extended: true })); //for json parsing, the limit is for the images, if any
app.use(express.urlencoded({ limit: "5mb", extended: true })); //for url parsing, the limit is for the images, if any

//Route setup
const userRoutes = require('./users/user.routes.js'); //importing the custom route file
app.use('/', userRoutes); //using middleware for directing to the routes when '/' is hit

//DB Connection Setup
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connection established");
})
.catch(err => {
    console.log("Database connection error: " + err);
});

//Initializing server
app.listen(PORT, () => {
    try {
        console.log("Server started listening on port " + PORT);
    }
    catch(err) {
        console.log("Server start failed: " + err);
    }
});

//Basic ping route for testing purposes
app.get("/ping", (req, res) => {
    return res.send({
      error: false,
      message: "Server is up and running"
    });
  });