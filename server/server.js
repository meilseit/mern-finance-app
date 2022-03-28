const express = require("express"); //import express 
const cors = require("cors"); //import cors 
const mongoose = require("mongoose"); //import mongoose module

require('dotenv').config(); //configer process.env for environment variables 

const app = express(); //instantiate app 
const port = process.env.PORT; //declare local vars form 
const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

app.listen(port, ()=>{console.log(`sever is running on port ${port}`)}); //this line starts the app at the specified port