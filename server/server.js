const express = require("express"); //import express 
const cors = require("cors"); //import cors 
const mongoose = require("mongoose"); //import mongoose module


require('dotenv').config(); //configer process.env for environment variables 

const app = express(); //instantiate app 

app.use(cors()); //this is middle ware that makes the allows the express app to read POST and GET requests
app.use(express.json()); //this  just allows express to parse request into json 

const port = process.env.PORT; //declare local vars form 
const uri = process.env.ATLAS_URI;

mongoose.connect(uri) //the .connect function is async so we can do a .then and .catch string
    .then((res) => { //only start app when the database is connected
        const registerRouter = require("./routes/registerRouter"); //import route for registration 
        app.use("/register", registerRouter) //tell app to load register Router when we use path /register 

        const loginRouter = require("./routes/loginRouter"); //import route for login
        app.use("/login", loginRouter ) //tell app to use login Router when we use path /login

        const userDataRouter = require("./routes/userDataRouter");
        app.use("/data", userDataRouter);

        app.listen(port, ()=>{console.log(`sever is running on port ${port}`)}); //this line starts the app at the specified port
    
    })
    .catch((err) => {console.log(err)})

const connection = mongoose.connection; //this will generate a mongoose connection object after we try to connect above 
connection.once('open', () =>{ //now we check wether or not the connection is open and sends a message to the console
    console.log("Connection to server established!");
})

const jwtCheck = (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(" ")[1]
}

    


