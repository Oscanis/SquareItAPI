//imports
const express = require('express'); //importing Express
const User = require("./user.model.js"); //importing the Model

//setup
const router = express.Router(); //pointing to the Router module

//routes

//default route, same as /users for testing purposes
router.get('/', async (req, res) => {
    try {
        const list = await User.find(); //get all the documents without filter
        res.status(200).json(list); //status 200: default response code + the json array
    } catch (error) {
        res.status(404).json({message: error.message }); //status 404: response code + error message
    }
});


//get all users
router.get('/users', async (req, res) => {
    try {
        const list = await User.find(); //get all the documents without filter
        res.status(200).json(list); //status 200: default response code + the json array
    } catch (error) {
        res.status(404).json({message: error.message }); //status 404: response code + error message
    }
});

//get user by id
router.get('/users/:_id', async (req, res) => {
    try {
        console.log(req.params._id);
        const user = await User.find( {_id: req.params._id} ); //get specific user by id
        res.status(200).json(user); //status 200: default Success response code + the json array
    } catch (error) {
        res.status(404).json({message: error.message }); //status 404: Not Found
    }
});

//find user by name
router.get('/name/:userName', async (req, res) => {
    try {
        const user = await User.find( {userName: req.params.userName} ); //get specific user by id
        res.status(200).json(user); //status 200: default Success response code + the json array
    } catch (error) {
        res.status(404).json({message: error.message }); //status 404: Not Found
    }
});

//add new user
router.post('/adduser', async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        highScore: 0
    });
    try {
        //saving the new user to database, waiting for a promise, then the response is the new posted object
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //status 201: Created
    } catch(err) {
        res.status(409).json({ message: err }); //status 409: Conflict
    }
});

//update existing user's password by id
router.patch('/update/:_id', async (req, res) => {
    try{
        const updatedUser = await User.updateOne(
            { _id: req.params._id },
            { $set: {
                password: req.body.password,
                }
            });
        res.status(200).json(updatedUser); //status 200: default Success response code + the json array
    } catch(err) {
        res.status(409).json({ message: err }); //status 409: Conflict
    }
});

//update existing user's score by id
router.patch('/save/:_id', async (req, res) => {
    try{
        const updatedUser = await User.updateOne(
            { _id: req.params._id },
            { $set: {
                highScore: req.body.highScore,
                }
            });
        res.status(200).json(updatedUser); //status 200: default Success response code + the json array
    } catch(err) {
        res.status(409).json({ message: err }); //status 409: Conflict
    }
});

//delete user by id
router.delete('/delete/:_id', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params._id })
        res.status(200).json(removedUser); //status 200: default Success response code + the json array
    } catch(err) {
        res.status(409).json({ message: err }); //status 409: Conflict
    }
});


//exports the router variable so it can be used in app.js
module.exports = router; 