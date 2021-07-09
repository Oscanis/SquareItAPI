const mongoose = require('mongoose'); //importing Mongoose for the Model

//User schema setup
const userSchema = mongoose.Schema(
    {
        userName: String,
        password: String,
        highScore: Number
    }
);

//connecting to the specific database and transforming the schema to a model
module.exports = mongoose.model("User", userSchema, 'db_users');