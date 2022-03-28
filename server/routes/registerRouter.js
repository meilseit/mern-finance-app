let userModel = require("./models/userModel"); //import the user model to preform crud ops. on database
const router = require("express").Router(); //import a router to set up get and post request
const bcrypt = require("bcrypt"); // import hashing function


//req is the information we want to send to the frontend 
//res is the the response we get from the front end 
router.route("/add").post( async (req, res) => { //set up a post route for calling delivering newly registred users to the database
        let user = req.body; //the data we want to put in data base assuming that the front end sends a body object
        user.password = await bcrypt.hash(user.password, 10); //reset user password to be a hash before storing it

        const newUser = new userModel({ //create a new instance of userModel to save to database
            username: user.username, //populate the model with the information sent by the front end
            email: user.email, 
            passowrd = user.passowrd
        });
        await newUser.save() //asncy function so await save then do the following 
            .then(()=>{
                console.log("New user was successfully entered into database!")
            })
            .catch((err)=>{
                console.log(err)
            })
        res.json({message:"executed register operation"});
});

module.exports = router; //export this router for use in the server