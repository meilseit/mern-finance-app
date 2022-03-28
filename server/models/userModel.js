const mongoose = require("mongoose"); //import mongoose

const userSchema = new mongoose.Schema({ // set up how we want are model to look in the data base
    username: {
        type: String, 
        required: true,
    },
    email:{
        type: String, 
        required: true,
    },
    password:{
        type: String, 
        required: true,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema); //asign the schema to a type mongoose model and name the model in the 

module.exports = User; //export model for mongoose to use in the server