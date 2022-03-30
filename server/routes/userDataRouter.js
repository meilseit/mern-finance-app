const userDataModel = require("../models/userDataModel");
const router = require("express").Router();

/*
The the following route will add one expense to 
the array of sub documents for a particular user
*/
router.route("/addExpense").post((req, res) => {
    const newExpense = req.body; //fetch the body being send 
    const update = { //what the update will add
        color: newExpense.color,
        tag: newExpense.tag,
        expense: newExpense.expense,
        date: new Date(), //fetch the current date 
    }
    userDataModel.findOneAndUpdate({username: newExpense.username}, {$push: {expenses: update}}) //first apply filter based on username then update with push operation
        .then((doc)=> {
            res.json({
                message: "success",
                body: doc
            })
        })
        .catch((err)=>{
            res.json(err)
        })
});

/*
The the following route will add to the pot 
in the user data
*/
router.route("/alterPot").post((req, res) => {
    const data = req.body; // request the body from the front end 
    const username = data.username; //save the data needed
    const potVal = data.potVal

    userDataModel.findOne({username: username}) //find the right userData
        .then((doc)=>{
            doc.potSum = doc.potSum + potVal //alter that data by added new value to it 
            doc.save() //finally save and await the result 
                .then((savedDoc => {
                    res.json({//return the updated doc for inspection
                        message: "succesfully altered the Pot",
                        body:savedDoc
                    }) 
                }))
        })
});

/*
The the following route will update the  
in the user data
*/
router.route("/alterBudget").post((req, res) => {
    const data = req.body; // request the body from the front end 
    const username = data.username; //save the data needed
    const newBudget = data.budget
    const newBudgetDivision = data.budgetDivision

    userDataModel.findOneAndUpdate({username: username},{budget:newBudget, budgetDivision: newBudgetDivision}) //find the right userData and update the budget and division
        .then(()=>{ 
            res.json({message:"Updating the budget was successful"})
        })
        .catch((err) =>{
            res.json({message: err})
        })
});


/*
The the following route will take two dates and a username 
then return the expenses in the following range.
*/
router.route("/dateRange").get( async (req, res) => { //this get oopereation returns a 
    const data = req.body; //request the data from  the body 
    const username = data.username; //exctract all these props. from the object 
    const startDate = data.startDate;
    const endDate = data.endDate;

    const pipline = [ //in a pipline every element is a filter that is excuted in the oder they are added
        {$match:{ username: username }}, //first match all models with the correct username
        {$unwind: "$expenses"}, //uwind all models by expenses into an array of documents
        {$match: { "expenses.date": {$gte: new Date(startDate), $lte: new Date(endDate)}}}, //now match all that fall into date range
        {$group: {_id:"$username", expenses:{ //regroup the needed data to be delivered to the front end
            $push: "$expenses"
            }}
        },
    ]
    userDataModel.aggregate(pipline) //pass the pipline to the query function 
        .then((doc)=>{
            if(doc.length == 0){
                return res.json({
                    message: `failed to find expenses between ${startDate}, and ${endDate}`, //send error message if we find nothing 
                })
            }
            else{
                return res.json({ 
                    message: "success", //send a message and the body containing the the expense information
                    body: doc
                })
            }
        }       
    )}
)



module.exports = router; 