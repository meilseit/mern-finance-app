let userModel = require("../models/userModel"); //import the user model to preform crud ops. on database
const router = require("express").Router(); //import a router to set up get and post request
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/add").post((req, res) => {
    let userLogging = req.body; //get the current user credentials form body of request before verifying them 
    userModel.findOne({username: userLogging.username})
        .then((dbUser) => { //use the returned query object (dbUser) to validate the login 
            if(!dbUser){ //if user object is undefined or null
                return res.json({message: "Username invalid"}) //return this message to the frontend
            }
            bcrypt.compare(userLogging.password, dbUser.password) //asycn function that compares the the plain text to the hash password
                .then((bool) => { //then with the returned boolean we want to tell the front end that this user is approved or not
                    if(bool){//if approved worry about jwt token
                        const payload = { //this payload will be the information that the JWT token will contain
                            id: dbUser._id,
                            username: dbUser.username,
                            email: dbUser.email
                        }
                        jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {expiresIN: 84600}, //this will create the secret token
                        (err, token) => { //here we want to take the token and return it. note token is type string
                            if(err){ //if there is an error signing return an message to front end 
                                return res.json({message: "There was an Error in the JWT signing process"});
                            }
                            return res.json({ //fall through option is to send a message and token to front end
                                message: "JWT signed",
                                token: "Bearer " + token //Bearer specifies that we're using token based authentication
                            })
                        });
                    }
                    else{
                        return res.json({message: "Invalid password or username"}); //return this message to the front end if bool is false
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })

        })
        .catch((err) => {console.log(err)})
    
});

module.exports = router;